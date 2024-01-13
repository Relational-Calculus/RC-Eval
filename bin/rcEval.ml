open Js_of_ocaml
open Libmonpoly
open Predicate
open MFOTL

let schema = ref []
let result = ref ""
let query = ref (None : (formula option * formula * string list) option)

let apply2 f (x, y) = (f x, f y)

let exists vs f =
  let open Librc2sql.FO.FO in
  List.fold_right (fun x f' -> if List.mem x (fv_fmla f') then Exists (x, f') else f') vs f
let forall vs f =
  let open Librc2sql.FO.FO in
  Neg (List.fold_right (fun x f' -> if List.mem x (fv_fmla f') then Exists (x, f') else f') vs (Neg f))

let mfotl_to_fo_term = function
  | Var x -> Librc2sql.FO.FO.Var x
  | Cst t -> Librc2sql.FO.FO.Const t
  | t -> failwith ("mfotl_to_fo: unsupported subterm " ^ string_of_term t)

let rec fo_to_mfotl_term = function
  | Librc2sql.FO.FO.Var x -> Var x
  | Librc2sql.FO.FO.Const t -> Cst t
  | Librc2sql.FO.FO.Mult (t, u) -> Mult (fo_to_mfotl_term t, fo_to_mfotl_term u)

let rec mfotl_to_fo = function
  | Equal (Cst c, Cst d) -> if c = d then Librc2sql.FO.FO.True else Librc2sql.FO.FO.False
  | Equal (Var x, t) -> Eq (x, mfotl_to_fo_term t)
  | Equal (t, Var x) -> mfotl_to_fo (Equal (Var x, t))
  | Pred (p, _, ts) -> Librc2sql.FO.FO.Pred (p, List.map mfotl_to_fo_term ts)
  | Neg f -> Librc2sql.FO.FO.Neg (mfotl_to_fo f)
  | And (f, g) -> Librc2sql.FO.FO.Conj (mfotl_to_fo f, mfotl_to_fo g)
  | Or (f, g) -> Librc2sql.FO.FO.Disj (mfotl_to_fo f, mfotl_to_fo g)
  | Implies (f, g) -> Librc2sql.FO.FO.Disj (Librc2sql.FO.FO.Neg (mfotl_to_fo f), mfotl_to_fo g)
  | Equiv (f, g) -> Librc2sql.FO.FO.Disj (Librc2sql.FO.FO.Conj (mfotl_to_fo f, mfotl_to_fo g),
    Librc2sql.FO.FO.Conj (Librc2sql.FO.FO.Neg (mfotl_to_fo f), Librc2sql.FO.FO.Neg (mfotl_to_fo g)))
  | Exists (xs, f) -> exists xs (mfotl_to_fo f)
  | ForAll (xs, f) -> forall xs (mfotl_to_fo f)
  | f -> failwith ("mfotl_to_fo: unsupported subformula " ^ string_of_formula "" f)
let rec fo_to_mfotl = function
  | Librc2sql.FO.FO.False -> Equal (Cst (Int Z.zero), Cst (Int Z.one))
  | Librc2sql.FO.FO.True -> Equal (Cst (Int Z.zero), Cst (Int Z.zero))
  | Librc2sql.FO.FO.Eq (x, t) -> Equal (Var x, fo_to_mfotl_term t)
  | Librc2sql.FO.FO.Pred (p, ts) -> Pred (p, List.length ts, List.map fo_to_mfotl_term ts)
  | Librc2sql.FO.FO.Neg f -> Neg (fo_to_mfotl f)
  | Librc2sql.FO.FO.Conj (f,g) -> And (fo_to_mfotl f, fo_to_mfotl g)
  | Librc2sql.FO.FO.Disj (f,g) -> Or (fo_to_mfotl f, fo_to_mfotl g)
  | Librc2sql.FO.FO.Exists (x,f) -> Exists ([x], fo_to_mfotl f)
  | Librc2sql.FO.FO.Cnt (x,gs,f) -> let f = fo_to_mfotl f in Aggreg(TCst TInt, x, Cnt, List.hd (free_vars f), gs, f)

type state = BREAK | STRING

let check_schema schema_str =
  try
    schema := Log_parser.parse_signature schema_str;
  with e ->
    schema := [];
    raise e
    

let subQueries = ref []
let check_query query_str =
  try
    let f = Formula_parser.formula Formula_lexer.token
      (Lexing.from_string (query_str)) in
    Misc.checkf := true;
    let is_mon, pf, vartypes = try Rewriting.check_formula !schema f 
    with e ->  
      false, f, List.map (fun x -> x, TInt) (MFOTL.free_vars f)
    in
    Misc.checkf := false;
    if is_mon then
      query := Some (None, pf, List.map fst vartypes)
    else
      let trans f = apply2 fo_to_mfotl (Librc2sql.FO.FO.rtrans (fun x -> 1) (mfotl_to_fo f)) in
      let (fin, inf) = trans f in
      Misc.checkf := true;
      let _, pinf, _ = Rewriting.check_formula !schema inf in
      let _, pfin, _ = Rewriting.check_formula !schema fin in
      Misc.checkf := false;
      query := Some (Some pinf, pfin, List.map fst vartypes);
  with e ->
    query := None;
    raise e



let append_string s = result := (!result) ^ s; Printf.eprintf "%s\n" !result
let _ = Sys_js.set_channel_flusher stdout append_string

let check_db dbStr =
  result := "";
  match !query with
  | None -> !result
  | Some (inf, fin, vs) ->
    try
      result := "";
      let monitor = Algorithm.monitor_string in
      let postprocess s =
        if s = "" then "" else
        let s = String.sub s 19 (String.length s - 20)
        in snd (String.fold_right (fun c (st, s) -> 
          match st with 
          | BREAK -> if c = ' ' then (st, "\n" ^ s)
            else if c = '"' then (STRING, String.make 1 c ^ s)
            else (st, String.make 1 c ^ s)
          | STRING -> ((if c = '"' then BREAK else st), String.make 1 c ^ s)) s (BREAK, "")) in
      let postprocess s = let s = postprocess s in if s = "true" then "()" else s in
      (match inf with
      | None -> 
        (monitor !schema ("@0 " ^ dbStr ^ "\n") vs fin;
        result := postprocess (!result);)
      | Some inf ->
        (monitor !schema ("@0 " ^ dbStr ^ "\n") [] inf;
        if !result <> "" then
          (result := "INF";)
        else
          (monitor !schema ("@0 " ^ dbStr ^ "\n") vs fin;
          result := postprocess (!result);)));
      !result
    with e ->
      raise e


let string_of_tcst t =
  match t with
  | TInt -> "int"
  | TStr -> "string"
  | TFloat -> "float"
  | TRegexp -> "regexp"

let schema_to_string (name, attr_list) =
  let name1 = Predicate.string_of_var name in
  let open Misc in
  let name2 = Misc.string_of_list
    (fun (v, t) ->
      v ^ ":" ^ string_of_tcst t
    )
    attr_list in
  name1 ^ name2 ^ "\n"
  

let table_to_string =
  let rec table_to_string_aux acc = function
    | [] -> acc
    | h :: t -> table_to_string_aux (schema_to_string h ^ acc) t
  in table_to_string_aux ""


let eat s t = s ^ String.trim t
let list_to_string = function
  | [] -> "[]"
  | [h] -> "[" ^ h ^ "]"
  | h :: t -> List.fold_left (fun acc elem -> acc ^ "," ^ elem) ("[" ^ h) t ^ "]"


(** Returns a string of the schema, that's being checked *)
let check_schema_js (js_schema: Js.js_string Js.t) =
  let str_s = Js_of_ocaml.Js.to_string js_schema in
  check_schema str_s;
  let checked_s = table_to_string !schema in
  if checked_s <> "" then
      Js.string (String.sub checked_s 38 ((String.length checked_s) - 38))
  else
      Js.string ""

      
let check_query_js (js_query: Js.js_string Js.t) =
  let resultArr = Array.make 3 "" in
  let str_q = Js_of_ocaml.Js.to_string js_query in
  check_query str_q;
  match !query with
  | None -> 
    Array.fill resultArr 0 3 "[]";
    Js_of_ocaml.Js.array resultArr
  | Some (pinf, pfin, s) -> 
    Array.set resultArr 0 (list_to_string s);
    Array.set resultArr 1 (string_of_formula "" pfin);
    match pinf with
    | Some pinf -> 
      Array.set resultArr 2 (string_of_formula "" pinf);
      Js_of_ocaml.Js.array resultArr
    | _ -> 
      Array.set resultArr 2 "[]";
      Js_of_ocaml.Js.array resultArr



let check_query_ismon_js (js_query: Js.js_string Js.t) =
  let resultArr = Array.make 2 "" in
  let str_q = Js_of_ocaml.Js.to_string js_query in 
  let is_mon,f = try Rewriting.is_monitorable (Formula_parser.formula Formula_lexer.token
  (Lexing.from_string (str_q))) 
with e ->  
  false, Some (Formula_parser.formula Formula_lexer.token
  (Lexing.from_string (str_q)), "")
in
  match f with 
  | None -> 
    Array.set resultArr 0 "[]";
    Js_of_ocaml.Js.array resultArr 
  | Some (f1, msg) -> 
    Array.set resultArr 0 (string_of_formula "" f1);
    Array.set resultArr 1 msg;
    Js_of_ocaml.Js.array resultArr 
    

(** [check_db_js] runs with the previously checked schema & query.
    It is the callers responibility to call check_schema & check_query,
    if the caller wants to make sure the database is run on the current schema & query  *)
let check_db_js (js_db: Js.js_string Js.t) = 
  let str_d = Js_of_ocaml.Js.to_string js_db in
  let _ = check_db str_d in
  Js.string (!result)


let (_: unit) =
    Js.export_all
      (object%js
        method checkSchema (js_schema: Js.js_string Js.t) = check_schema_js js_schema
        method checkQuery (js_query: Js.js_string Js.t) = check_query_js js_query
        method checkDb (js_db: Js.js_string Js.t) = check_db_js js_db
        method checkQueryIsMon (js_query: Js.js_string Js.t) = check_query_ismon_js js_query
      end)