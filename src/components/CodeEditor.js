import React, { useState, useEffect, useRef } from "react";
import { useCodeMirror } from '@uiw/react-codemirror';
import { RC } from '../lang-rc/index.js';
import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';
import { lintGutter } from "@codemirror/lint"
import { RCLinter } from "../error_handling.js";
import "./CodeEditor.css";

// Define the extensions outside the component for the best performance.
// If you need dynamic extensions, use React.useMemo to minimize reference changes
// which cause costly re-renders.

// Constants
const extensions = [RC(), lintGutter(), RCLinter];
const operators = ['∃', '∀', '∧', '∨', '⇒', '¬', '='];
const expertOperators = ['∃', '∀', '∧', '∨', '⇒', '¬', '=', '<', '>', 'AVG', 'MAX', 'MIN', 'CNT','SUM', 'LET', 'IN'];
const placeholderStr = "Write Your Query Here\n\nTry using one of the examples to get started.\n"

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
    { tag: t.comment, color: '#ecfc08', fontStyle: "italic" },
    { tag: t.variableName, color: '#42f56c' },
    { tag: t.string, color: '#0971d9' },
    { tag: t.operatorKeyword, color: '#f54248' },
    { tag: t.paren, color: '#292a2b' },
  ],
});

export default function CodeEditor({ query, setFormState }) {
  const [localQuery, setLocalQuery] = useState("");
  const [expertMode, setExpertMode] = useState(false);
  
  const onChange = (value) => { setLocalQuery(value) };

  const editor = useRef();
  const { view } = useCodeMirror({
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
    setLocalQuery(query);
  }, [query]);

  useEffect(() => {
    setFormState({ type: 'setQuery', query: localQuery });
  }, [localQuery]);

  const setIcon = (icon) => {
    const cursorPosFrom = view.state.selection.main.from;
    const cursorPosTo = view.state.selection.main.to;

    const timer = setInterval(() => {
      view.focus();
      view.dispatch({
        changes: {from: cursorPosFrom, to: cursorPosTo, insert: icon},
        selection: {anchor: cursorPosFrom+1}
      })
      if(view.hasFocus) clearInterval(timer);
    }, 50);
  }

  const handleClick = (e) => {
    if (e.target.checked) {
      setExpertMode(true)
    } else {
       setExpertMode(false)
    }
  }


  return(
          <div className="editorFrame" >
            <div className="buttonFrame">
              {!expertMode && operators.map(op => <button type="button" key={op} title={op} onClick={() => setIcon(op)}>{op}</button>)}
              { expertMode && expertOperators.map(op =>
                <div className="btnContainer">
                  <button type="button" key={op} title={op} onClick={() => setIcon(op)}>{op}</button> 
                  {/* <div className="overlay">
                    <div className="text">HELLO</div>
                  </div>  */}
                </div>) }
              <label className="mode" htmlFor="expertMode">Expert Mode<input type="checkbox" className="mode" id="expertMode" onClick={handleClick}></input></label>
            </div>
            <div ref={editor} />
          </div>
    );
}