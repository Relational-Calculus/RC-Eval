import {parser} from "./syntax.grammar"
import {LRLanguage, LanguageSupport, indentNodeProp, foldInside, delimitedIndent} from "@codemirror/language"
import {styleTags, tags as t} from "@lezer/highlight"

export const RCLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Application: delimitedIndent({closing: ")", align: false})
      }),
      styleTags({
        // identifier: t.string,
        "AND ∧ OR ∨ IMPLIES ⇒ EXISTS ∃ FORALL ∀ NOT ¬ CNT SUM MAX MIN AVG MED": t.operatorKeyword,
        "LET IN": t.modifier,
        TableName: t.definitionKeyword,
        Identifier: t.variableName,
        String: t.string,
        "( )": t.paren
      })
    ]
  })
})

export function RC() {
  return new LanguageSupport(RCLanguage)
}
