import { syntaxTree } from "@codemirror/language"

function getCompletionList(context) {
    const operators = ['∃', '∀', '∧', '∨', '⇒', '¬', '≈']
    let simpleMethods = "EXISTS FORALL AND OR IMPLIES NOT EQUALS"
        .split(" ")
        .map((kw, idx) => ({ label: kw, type: "method", apply: operators[idx] }));
    
    let aggMethod = "AVG MED MAX MIN CNT SUM LET IN"
        .split(" ")
        .map((kw) => ({ label: kw, type: "method" }));
    
    let identifiers = ""
    const docStr = context.state.doc.toString();

    const tree = syntaxTree(context.state)
    tree.cursor().iterate(node => {
      if (node.matchContext(["varList"]) && node.name === 'Identifier') {
        identifiers = identifiers.concat(' ', docStr.substring(node.from, node.to));
      }
    })


    identifiers = identifiers
        .split(" ")
        .map((kw) => ({ label: kw, type: "variable" }));
    
    const allKeywords = simpleMethods.concat(aggMethod, identifiers)

    return allKeywords
}

export default function myCompletions(context) {
    let word = context.matchBefore(/\w*/)
  
    // Create function that gives a list of completion words context.state.doc.toString() gets the text in the editor.
    // We could probably use the syntax tree within this function to get the tablenames added dynamically to the autocompletions
    const completions = getCompletionList(context);
  
    if (word.from === word.to && !context.explicit)
      return null
    return {
      from: word.from,
      options: completions,
      validFor: /^\w*$/
    }
  }