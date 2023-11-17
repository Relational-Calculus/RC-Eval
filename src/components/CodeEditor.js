import { useState, useEffect, useRef } from "react";
import { useCodeMirror } from '@uiw/react-codemirror';
import { RC } from '../lang-rc/index.js';
import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';
import { lintGutter } from "@codemirror/lint"
import { RCLinter } from "../error_handling.js";
import "./CodeEditor.css";
import Popover from '@mui/material/Popover';

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
    selectionMatch: '#036dd616',
    lineHighlight: '#8a91991a',
    gutterBackground: '#fff',
    gutterForeground: '#8a919966',
    fontFamily: 'OCR A Std, monospace'
  },
  styles: [
    { tag: t.definitionKeyword, color: '#aa5bc2' },
    // { tag: t.variableName, color: '#dea112' },
    { tag: t.string, color: '#0971d9' },
    { tag: t.operatorKeyword, color: '#de3c10' },
    { tag: t.paren, color: '#10c210' },
  ],
});

export default function CodeEditor({ query, setFormState }) {
  const [localQuery, setLocalQuery] = useState("");
  const [expertMode, setExpertMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
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
  }, [localQuery, setFormState]);

  const setIcon = (icon) => {
    const cursorPosFrom = view.state.selection.main.from;
    const cursorPosTo = view.state.selection.main.to;

    const timer = setTimeout(() => {
      view.focus();
      view.dispatch({
        changes: {from: cursorPosFrom, to: cursorPosTo, insert: icon},
        selection: {anchor: cursorPosFrom+icon.length}
      })
      if (view.hasFocus) clearTimeout(timer);
    }, 50);
  }

  const handleClick = (e) => {
    if (e.target.checked) {
      setExpertMode(true)
    } else {
      setExpertMode(false)
    }
  }

  const handlePopoverOpen = (e) => {
    setAnchorEl(e.currentTarget);
  }

  const handlePopoverClose = () => {
    setAnchorEl(null);
  }



  return(
          <div className="editorFrame" >
            <div className="buttonFrame">
              { !expertMode && operators.map((op, idx) => 
              <button
                type="button" 
                key={op}
                className={`operatorBtnClass${idx}`}
                id={`operatorBtnId${idx}`}
                onClick={() => setIcon(op)}
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
              >
                {op}
              </button> 
              )}
              { expertMode && expertOperators.map((op, idx) =>
              <button 
                type="button" 
                key={op}
                className={`operatorBtnClass${idx}`}
                id={`operatorBtnId${idx}`}
                onClick={() => setIcon(op)}
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
              >
                {op}
              </button> 
              )}
              <label className="mode" htmlFor="expertMode">Expert Mode<input type="checkbox" className="mode" id="expertMode" onClick={handleClick}></input></label>
            </div>
            <div ref={editor} />
            <Popover
                id="mouse-over-popover"
                sx={{
                  pointerEvents: 'none',
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                onClose={handlePopoverClose}
                disableAutoFocus={true}
                disableEnforceFocus={true}
            >
                <p>HELLO</p>
            </Popover>
          </div>
    );
}