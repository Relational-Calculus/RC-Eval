// IMPLEMENTING THE LINTER FOR codeMirror text editor + POTENTIALLY ERROR HANDLING FOR ERRORS FROM Ocaml
import {syntaxTree} from "@codemirror/language"
import {linter} from "@codemirror/lint"

export const RCLinter = linter(view => {
    let diagnostics = []
    const {state} = view
    const tree = syntaxTree(state)
    tree.cursor().iterate(node => {
      // console.log(`Node ${node.name} from ${node.from} to ${node.to} is Error ${node.type.isError}`)
      if (node.type.isError) diagnostics.push({
        from: node.from,
        to: node.to,
        severity: "warning",
        message: "Something Went Wrong"
      })
    })
    return diagnostics
  })
  