Welcome to RC-Evaluator: A tool for evaluation RC queries.  

RC-Evaluator depends on MonPoly which can be found here: https://bitbucket.org/monpoly/monpoly/src/master/ and on React found here: https://react.dev/

If you just want to run RC-Evaluator locally and have node.js installed just 
1) Clone the git repository
2) Go to the vis directory
3) Run
   ``` 
   npm install
   npm start
   ```

If you want to build and make changes to RC-Evaluator you will need an OCaml compiler. If you don't already have one installed we recommend using OPAM: https://opam.ocaml.org/doc/Install.html to install. 

You will also need the MonPoly library: [https://bitbucket.org/jshs/monpoly/src/master/](https://bitbucket.org/jshs/monpoly/src/rc-eval/)

To build RC-Evaluator on your local machine follow these steps: 
1) Clone the monpoly directory 
2) Git clone RC-Evaluator
3) Copy the rcEval.ml file from RC-Eval/bin into monpoly/js.
4) From monpoly run:
   ```
   eval $(opam env)
   dune build
   ```
5) Copy the rcEval.bc.js file located at monpoly/_build/default/js/rcEval.bc.js into RC-Eval/vis/public
6) From RC-Eval/vis run:
   ``` 
   npm install
   npm start
   ```

Every time you make a change to the monpoly library you will have to repeat step 4-6 (you only have to run npm install once)

