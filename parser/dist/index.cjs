'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var lr = require('@lezer/lr');
var language = require('@codemirror/language');
var highlight = require('@lezer/highlight');

// This file was generated by lezer-generator. You probably shouldn't edit it.
const spec_word = {__proto__:null,CNT:24, AVG:26, MED:28, MAX:30, MIN:32, SUM:34, "∧":40, AND:42, "∨":44, OR:46, "⇒":48, IMPLIES:50, SUBSTRING:54, "∃":58, EXISTS:60, "∀":64, FORALL:66, "¬":68, NOT:70, LET:72, IN:74};
const parser = lr.LRParser.deserialize({
  version: 14,
  states: "+pQVQPOOO}QPO'#C_O!]OQO'#C`O!kOSO'#C`O!yQPO'#C^O#RQPO'#C^O#WQPO'#CcOOQO'#DZ'#DZOVQPO'#DZQ#]QPOOOVQPO'#DZO#qQPO'#CxOOQO'#Cx'#CxO#vQPO'#DZOOOO'#DS'#DSO$nOQO,58zOOQO,58z,58zOOOO'#DT'#DTO$|OSO,58zO%[QPO,58xO%mQPO,59RO&RQPO,58}O&aQPO,59uOVQPO,59uOOQO'#Co'#CoO&nQPO,59uOOQO'#C_'#C_O&uQPO'#CnO'sQPO,59dO'xQWO,59uOOOO-E7Q-E7QOOQO1G.f1G.fOOOO-E7R-E7RO(hQPO1G.dO(uQPO1G.dO#qQPO1G.mO)TQPO'#CfO)]QPO1G.iO)bQPO'#C^O)mQPO'#C^OOQO1G/a1G/aO#qQPO'#DVO)uQPO,59YOOQO1G/O1G/OO*sQWO,59uOVQPO1G/aO*zQPO7+$OO+hQPO7+$OO+uQPO7+$XO,pQPO'#DUO-OQPO,59QOOQO7+$T7+$TO-WQPO,59bOOQO,59q,59qOOQO-E7T-E7TO-cQWO1G.dO-jQPO7+${OOQO<<Gj<<GjO-qQPO<<GjO#qQPO<<GsOOQO,59p,59pOOQO-E7S-E7SOOQO1G.|1G.|O-vQWO7+$OOVQPO<<HgOOQOAN=UAN=UOOQOAN=_AN=_O-}QPOAN>RO.[QWOAN>RO#vQPO'#DZO.cQPO,58xO#vQPO,59uO.tQPO1G.dO/SQPO'#C^O/_QPO'#C^O#vQPO<<HgO/VQPO'#C^O/bQPO'#C^O/gQPO7+${OVQPO1G/aO/nQWO,59uO#vQPO'#DZ",
  stateData: "/u~O|OS~OXYOmZOnZOpZOqZOr[Os[Ot]O!OPO!PQO!SRO!UTO~OXWX!VRX!YRXkRX~OT^O!P`O!Q^O!R`O~OTaO!R`O!S`O!TaO~O!VcO!YdO~O!VcO~OXeO~OdhOehOfhOghOhhOihO~O!OjO~OXYOmZOnZOpZOqZOr[Os[Ot!sO!OPO!PQO!SRO!U!oO~OT^O!PoO!Q^O!RoO~OTaO!RoO!SoO!TaO~O!OjO!PQO!SRO!UqO!VrO~O[sO]sO^sO_sO`sOasO~O!OjO!PQO!SRO!UtO~Oz}aU}au}a~P#]OUxO~P#]O!XyOobXXbXmbXnbXpbXqbXrbXsbXtbX!ObX!PbX!SbX!UbX~Oo{O~O![}O~P#]O!W!OOdQieQifQigQihQiiQi~OzQiUQiuQi~P(PO!OjO!PQO!SRO!U!PO~O!X!ROUYX~OU!TO~Ok!UO!VcO!YdO~Ok!UO!VcO~O!XyOobaXbambanbapbaqbarbasbatba!Oba!Pba!Sba!Uba~O![}a~P#]O!U!ZO~O!W![OdQqeQqfQqgQqhQqiQq~OzQqUQquQq~P+PO!Z!]OXZqmZqnZqpZqqZqrZqsZqtZq!OZq!PZq!SZq!UZq~O!OjO!PQO!SRO!U!^O~O!X!ROUYa~O!OjO!PQO!SRO~O![Qi~P(POu!bO~P#]O!U!cO~O![Qq~P+POz}!RU}!Ru}!R~P#]O![}!R~P#]O!OjO!PQO!SRO!U!XO!V!jO~O!OjO!PQO!SRO!U!aO~Ok!UO!V!hO!YdO~Ok!UO!V!hO~Ou!mO~P#]O![!qO~P#]O",
  goto: "&v!OPP!P!_#dPP!P$_P$m$pPPPPPP%Q%WPPPPPP%fP$pPPPPPPPPP%j%p%v%|PPP&SiVOWY]g}!b!g!i!m!q!s[SOWY}!b!qSkZ!]QqcQteQvgQ!PrQ!QsQ!VyQ!X!hQ!^!RQ!`!UQ!a!jQ!k!iX!n]!g!m!s[TOWY}!b!qQqcQteQwgQ!PrQ!X!hQ!^!RQ!`!UQ!a!jQ!l!iX!o]!g!m!siUOWY]g}!b!g!i!m!q!sRue^WOWYg}!b!qZ!g]!g!i!m!sQlZR!d!][gXfi!Y!e!pX!im|!f!rTxg!iQ_QRn_QbRRpbQ!StR!_!SQzkR!WzQXOQfWQiYQm]Sxg!iQ|!gQ!Y}Q!e!bQ!f!mQ!p!qR!r!s",
  nodeNames: "⚠ Program EqualsExpression Identifier String Escape ) TableExpression TableName ( varList AggregateExpression CNT AVG MED MAX MIN SUM varList InfixExpression ∧ AND ∨ OR ⇒ IMPLIES SubstringExpression SUBSTRING PrefixExpression ∃ EXISTS . ∀ FORALL ¬ NOT LET IN",
  maxTerm: 58,
  skippedNodes: [0],
  repeatNodeCount: 4,
  tokenData: "5n~R!ROX$[XY&bYZ'{Z]$[]^&b^p$[pq&bqr$[rs(`sw$[wx(yxy)dyz*Yz{+O{|+O|}+t}!O+O!O!P,j!P!Q$[!Q![-`![!]$[!]!^/^!^!_0S!_!`1t!`!a2l!a!c$[!c!}3b!}#O$[#O#P5i#P#R$[#R#S3b#S#T$[#T#o3b#o$r$[$r$s3b$s%%Y$[%%Y%%Z3b%%Z%&Y$[%&Y%&Z3b%&Z%&]$[%&]%&^3b%&^%'R$[%'R%'S3b%'S%'T3b%'T%'t$[%'t%'u2l%'u;'S$[;'S;=`&[<%lO$[U$cX!QQ!TSOY$[Zr$[rs%Osw$[wx%mx#O$[#P;'S$[;'S;=`&[<%lO$[S%TU!TSOY%OZw%Ox#O%O#P;'S%O;'S;=`%g<%lO%OS%jP;=`<%l%OQ%rU!QQOY%mZr%ms#O%m#P;'S%m;'S;=`&U<%lO%mQ&XP;=`<%l%mU&_P;=`<%l$[_&k_|X!QQ!TSOX$[XY&bYZ'jZ]$[]^&b^p$[pq&bqr$[rs%Osw$[wx%mx#O$[#P;'S$[;'S;=`&[<%lO$[X'oS|XXY'jYZ'j]^'jpq'j_(SS!RU|XXY'jYZ'j]^'jpq'jV(gU!PR!TSOY%OZw%Ox#O%O#P;'S%O;'S;=`%g<%lO%OV)QU!ST!QQOY%mZr%ms#O%m#P;'S%m;'S;=`&U<%lO%mV)mXXP!QQ!TSOY$[Zr$[rs%Osw$[wx%mx#O$[#P;'S$[;'S;=`&[<%lO$[V*cXUP!QQ!TSOY$[Zr$[rs%Osw$[wx%mx#O$[#P;'S$[;'S;=`&[<%lO$[_+XX!WX!QQ!TSOY$[Zr$[rs%Osw$[wx%mx#O$[#P;'S$[;'S;=`&[<%lO$[V+}X!XP!QQ!TSOY$[Zr$[rs%Osw$[wx%mx#O$[#P;'S$[;'S;=`&[<%lO$[V,sXoP!QQ!TSOY$[Zr$[rs%Osw$[wx%mx#O$[#P;'S$[;'S;=`&[<%lO$[V-i]!UP!QQ!TSOY$[Zr$[rs%Osw$[wx%mx!O$[!O!P.b!P!Q$[!Q![-`![#O$[#P;'S$[;'S;=`&[<%lO$[V.kZ!UP!QQ!TSOY$[Zr$[rs%Osw$[wx%mx!Q$[!Q![.b![#O$[#P;'S$[;'S;=`&[<%lO$[V/gX!ZP!QQ!TSOY$[Zr$[rs%Osw$[wx%mx#O$[#P;'S$[;'S;=`&[<%lO$[V0]Z!VP!QQ!TSOY$[Zr$[rs%Osw$[wx%mx}$[}!O1O!O#O$[#P;'S$[;'S;=`&[<%lO$[V1XX!YP!QQ!TSOY$[Zr$[rs%Osw$[wx%mx#O$[#P;'S$[;'S;=`&[<%lO$[_2PX![W!VP!QQ!TSOY$[Zr$[rs%Osw$[wx%mx#O$[#P;'S$[;'S;=`&[<%lO$[V2uX!VP!QQ!TSOY$[Zr$[rs%Osw$[wx%mx#O$[#P;'S$[;'S;=`&[<%lO$[_3kn!QQ!TS!OXOY$[Zr$[rs%Osw$[wx%mx}$[}!O3b!O!Q$[!Q![3b![!c$[!c!}3b!}#O$[#P#R$[#R#S3b#S#T$[#T#o3b#o$r$[$r$s3b$s%%Y$[%%Y%%Z3b%%Z%&Y$[%&Y%&Z3b%&Z%&]$[%&]%&^3b%&^%'R$[%'R%'S3b%'S%'T3b%'T;'S$[;'S;=`&[<%lO$[~5nOT~",
  tokenizers: [0, 1, 2, 3],
  topRules: {"Program":[0,1]},
  specialized: [{term: 46, get: (value) => spec_word[value] || -1}],
  tokenPrec: 0
});

const RCLanguage = language.LRLanguage.define({
    parser: parser.configure({
        props: [
            language.indentNodeProp.add({
                Application: language.delimitedIndent({ closing: ")", align: false })
            }),
            highlight.styleTags({
                // identifier: t.string,
                "AND ∧ OR ∨ IMPLIES ⇒ EXISTS ∃ FORALL ∀ NOT ¬ CNT SUM MAX MIN AVG MED": highlight.tags.operatorKeyword,
                "LET IN": highlight.tags.modifier,
                TableName: highlight.tags.definitionKeyword,
                Identifier: highlight.tags.variableName,
                String: highlight.tags.string,
                "( )": highlight.tags.paren
            })
        ]
    })
});
function RC() {
    return new language.LanguageSupport(RCLanguage);
}

exports.RC = RC;
exports.RCLanguage = RCLanguage;
