import React, { useState, useEffect, useRef } from "react";
import { useCodeMirror } from '@uiw/react-codemirror';
import { RC } from '../lang-rc/dist/index.js';
import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';
import {syntaxTree} from "@codemirror/language"
import {linter, lintGutter} from "@codemirror/lint"


const placeholderStr = "Write Your Query Here\n\nTry using one of the examples to get started.\n"
// Define the extensions outside the component for the best performance.
// If you need dynamic extensions, use React.useMemo to minimize reference changes
// which cause costly re-renders.


const myTheme = createTheme({
  theme: 'light',
  settings: {
    background: '#ffffff',
    foreground: '#292a2b',
    caret: '#5d00ff',
    selection: '#036dd626',
    selectionMatch: '#036dd626',
    lineHighlight: '#8a91991a',
    gutterBackground: '#fff',
    gutterForeground: '#8a919966',
    fontFamily: 'OCR A Std, monospace'
  },
  styles: [
    { tag: t.comment, color: '#787b8099', fontStyle: "italic" },
    { tag: t.variableName, color: '#42f56c' },
    { tag: t.string, color: '#0971d9' },
    { tag: t.operator, color: '#f54248' },
    { tag: t.paren, color: '#292a2b' },
  ],
});

const operatorLinter = linter(view => {
  let diagnostics = []
  syntaxTree(view.state).cursor().iterate(node => {
    if (node.name == "Operator") diagnostics.push({
      from: node.from,
      to: node.to,
      severity: "warning",
      message: "THIS IS AN OPERATOR"
    })
  })
  return diagnostics
})

const extensions = [RC(), lintGutter(), operatorLinter];

export default function CodeEditor({ query, setFormState }) {

  const operators = ['∃', '∀', '=', '∧', '∨', '⇒', '¬'];

  const [localQuery, setLocalQuery] = useState("");
  
  const onChange = (value) => {
    setLocalQuery(value);
  };

  useEffect(() => {
    setLocalQuery(query);
  }, [query, setLocalQuery]);

  useEffect(() => {
    setFormState({ type: 'setQuery', query: localQuery });
  }, [localQuery, setFormState]);



  const editor = useRef();
  const { state, view, setContainer } = useCodeMirror({
    container: editor.current,
    placeholder: placeholderStr,
    onChange: onChange,
    minHeight: "200px",
    theme: myTheme,
    autoFocus: true,
    extensions: extensions,
    value: localQuery,
  });

  useEffect(() => {
    if (editor.current) {
      setContainer(editor.current);
    }
  }, [editor.current, setContainer]);

  const setIcon = (icon) => {
    const cursorPosFrom = view.state.selection.main.from;
    const cursorPosTo = view.state.selection.main.to;
    setLocalQuery(localQuery.slice(0, cursorPosFrom) + icon + localQuery.slice(cursorPosTo));
    setFormState({type: "setQuery", query: localQuery});

    const timer = setInterval(() => {
      view.focus();
      view.dispatch({
        selection: {anchor: cursorPosFrom+1}
      })
      if(view.hasFocus) clearInterval(timer);
    }, 100);
  }

  const frameStyle = {
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: "2px",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
  }

  const ButtonframeStyle = {
    backgroundColor: "rgba(96, 86, 91, 0.4)",
    padding: "1em",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
  }

  return(
          <div className="editor-frame" style={frameStyle}>
            <div className="button-frame" style={ButtonframeStyle}>
              {operators.map(op => <button type="button" key={op} title={op} onClick={() => setIcon(op)}>{op}</button>)}
            </div>
            <div ref={editor} />
          </div>
    );
}