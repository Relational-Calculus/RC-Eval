import { useState, useEffect, forwardRef, useRef } from "react";
import { RC } from '../lang-rc/index.js';
import { EditorState } from "@codemirror/state";
import { basicSetup, EditorView } from "codemirror"
import { keymap, placeholder } from "@codemirror/view";
import { tags as t } from '@lezer/highlight';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { lintGutter } from "@codemirror/lint"
import { indentWithTab } from "@codemirror/commands";
import { RCLinter } from "../error_handling.js";
import { autocompletion, completeFromList, ifNotIn } from "@codemirror/autocomplete";
import myCompletions from "../autocompletion.js";
import { schema_to_completion_list } from '../utils.js'

// import { createTheme } from '@uiw/codemirror-themes';
// import { useCodeMirror } from '@uiw/react-codemirror';
import "./CodeEditor.css";
import Popover from '@mui/material/Popover';
import PopoverPaper from "./PopoverPaper.js";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import ExamineDialog from "./ExamineDialog.js";
import RANFDialog from "./RANFdialog.js";


// Define the extensions outside the component for the best performance.
// If you need dynamic extensions, use React.useMemo to minimize reference changes
// which cause costly re-renders.

// Constants
const operators = ['∃', '∀', '∧', '∨', '⇒', '¬', '≈'];
const expertOperators = ['∃', '∀', '∧', '∨', '⇒', '¬', '≈', '<', '>', 'AVG', 'MED', 'MAX', 'MIN', 'CNT', 'SUM', 'LET', 'IN'];
const placeholderStr = "Write Your Query Here\n\nTry using one of the examples to get started.\n"


let myTheme = EditorView.theme({
  "&": {
    color: "#292a2b",
    fontSize: "12.0pt",
    backgroundColor: "#ffffff"
  },
  ".cm-content": {
    fontFamily: "OCR A Std, monospace",
    caretColor: "#5d00ff"
  },
  ".cm-content, .cm-gutter": {
    minHeight: "200px"
  },
  "&.cm-focused .cm-cursor": {
    borderLeftColor: "#0e9"
  },
  "&.cm-focused .cm-selectionBackground, ::selection": {
    backgroundColor: "#036dd626"
  },
  ".cm-gutters": {
    backgroundColor: "#fff",
    color: "#8a919966",
    border: "none"
  }
}, {dark: false})

// const myTheme = createTheme({
//   theme: 'light',
//   settings: {
//     background: '#ffffff',
//     foreground: '#292a2b',
//     caret: '#5d00ff',
//     selection: '#036dd626',
//     selectionMatch: '#036dd616',
//     lineHighlight: '#8a91991a',
//     gutterBackground: '#fff',
//     gutterForeground: '#8a919966',
//     fontFamily: 'OCR A Std, monospace'
//   },
//   styles: [
//     { tag: t.definitionKeyword, color: '#aa5bc2' },
//     { tag: t.modifier, color: '#f2912d' },
//     { tag: t.string, color: '#0971d9' },
//     { tag: t.operatorKeyword, color: '#de3c10' },
//     { tag: t.paren, color: '#10c210' },
//   ],
// });

const myHighlightstyle = HighlightStyle.define([
  { tag: t.definitionKeyword, color: '#aa5bc2' },
  { tag: t.modifier, color: '#f2912d' },
  { tag: t.string, color: '#0971d9' },
  { tag: t.operatorKeyword, color: '#de3c10' },
  { tag: t.paren, color: '#10c210' }
])


const CodeEditor = forwardRef(({ query, schema, onChange, not_ranf_fun, not_ranf_msg, pinf, pfin, focusState, setFocusState }, ref) => {
  const [expertMode, setExpertMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  // Get dynamic completion list for current tablenames
  const tableNames = schema_to_completion_list(schema);
  const tablenameCompletion = tableNames.length === 0 ? "" : ifNotIn(["TableExpression", "PrefixExpression"], completeFromList([...tableNames]))
  // Setting the extensions for the text editor
  const customExtensions = tableNames.length === 0 ? [RC(), lintGutter(), RCLinter, autocompletion({ override: [myCompletions]})]
                                             : [RC(), lintGutter(), RCLinter, autocompletion({ override: [myCompletions, tablenameCompletion]})]


  const view = useRef();

  useEffect(() => {
    view.current = new EditorView({
      state: EditorState.create({
        doc: query,
        extensions: [
          basicSetup,
          placeholder(placeholderStr),
          EditorView.updateListener.of(({ state }) => {
            onChange({ target: { value: state.doc.toString() } });
          }),
          keymap.of([ indentWithTab ]),
          syntaxHighlighting(myHighlightstyle),
          myTheme,
          ...customExtensions
        ]
      }),
      parent: ref.current
    });

    return () => {
      view.current.destroy();
      view.current = null;
    };
  }, [schema]);

  useEffect(() => {
    if (view.current && view.current.state.doc.toString() !== query) {
      view.current.focus();
      view.current.dispatch({
        changes: { from: 0, to: view.current.state.doc.length, insert: query },
        selection: {anchor: query.length}
      });
    }
  }, [query]);


  const setIcon = (icon) => {
    const cursorPosFrom = view.current.state.selection.main.from;
    const cursorPosTo = view.current.state.selection.main.to;
    
    view.current.focus();
    view.current.dispatch({
      changes: {from: cursorPosFrom, to: cursorPosTo, insert: icon},
      selection: {anchor: cursorPosFrom+icon.length}
    })

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


  const handleFocus = () => {
    if (focusState.state === 'schema') {
      const cursorPosFrom = view.current.state.selection.main.from;
      const cursorPosTo = view.current.state.selection.main.to;

      const timer = setInterval(() => {
        view.current.dispatch({
          changes: {from: cursorPosFrom, to: cursorPosTo, insert: focusState.schemaBtnText},
          selection: {anchor: cursorPosFrom+focusState.schemaBtnText.length}
        })
        if(view.current.hasFocus) clearInterval(timer);
      }, 100);
      setFocusState(prevState => { return { state: '', schemaBtnText: '' }})
    } else {
      const timer = setInterval(() => {
        view.current.focus();
        if(view.current.hasFocus) clearInterval(timer);
      }, 100)
    }
  }

  const popoverID = open ? "mouse-over-popover" : undefined;
  const popoverContent = open ? anchorEl.innerText : undefined;

  const currentState = view.current !== undefined ? view.current.state.doc.toString() : "";

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
              <div className="expertFrame">
                <FormControlLabel 
                  className="mode" 
                  label="Expert Mode" 
                  labelPlacement="end"
                  control={<Checkbox className="mode" id="expertMode" label="Expert Mode" onClick={handleClick} color="info" sx={{color: "info.main", padding: "0 5px 0 0"}} />} 
                />
                <div className="infoChild"> 
                  <RANFDialog query={currentState} f1={not_ranf_fun} expertMode={expertMode} msg1={not_ranf_msg} />
                  { expertMode && <ExamineDialog pinf={pinf} pfin={pfin} /> }
                </div> 
              </div>
            </div>
            <div tabIndex={"0"} onFocus={handleFocus} ref={ref} />
            <Popover
                id={popoverID}
                sx={{ pointerEvents: 'none', }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
                transformOrigin={{ vertical: 'top', horizontal: 'center', }}
                slotProps={{
                  paper: {
                    style: {
                      backgroundColor: "transparent",
                      boxShadow: "none",
                      borderRadius: 0,
                    },
                  }
                }}
                onClose={handlePopoverClose}
                disableAutoFocus={true}
                disableEnforceFocus={true}
            >
              {open && <PopoverPaper content={popoverContent} />}
            </Popover>
          </div>
    );
});

export default CodeEditor;