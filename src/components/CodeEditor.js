import { useState, useEffect, forwardRef } from "react";
import { useCodeMirror } from '@uiw/react-codemirror';
import { RC } from '../lang-rc/index.js';
import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';
import { lintGutter } from "@codemirror/lint"
import { RCLinter } from "../error_handling.js";
import "./CodeEditor.css";
import Popover from '@mui/material/Popover';
import PopoverPaper from "./PopoverPaper.js";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { autocompletion, completeFromList, ifNotIn } from "@codemirror/autocomplete";
import myCompletions from "../autocompletion.js";
import ExamineDialog from "./ExamineDialog.js";
import { schema_to_completion_list } from '../utils.js'
import RANFDialog from "./RANFdialog.js";


// Define the extensions outside the component for the best performance.
// If you need dynamic extensions, use React.useMemo to minimize reference changes
// which cause costly re-renders.

// Constants
// const extensions = [RC(), lintGutter(), RCLinter, autocompletion({ override: [myCompletions]})];
const operators = ['∃', '∀', '∧', '∨', '⇒', '¬', '≈'];
const expertOperators = ['∃', '∀', '∧', '∨', '⇒', '¬', '≈', '<', '>', 'AVG', 'MAX', 'MIN', 'CNT','SUM', 'LET', 'IN'];
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
    { tag: t.modifier, color: '#f2912d' },
    { tag: t.string, color: '#0971d9' },
    { tag: t.operatorKeyword, color: '#de3c10' },
    { tag: t.paren, color: '#10c210' },
  ],
});

const CodeEditor = forwardRef(({ query, schema, setFormState, focusState, setFocusState, pinf, pfin, f }, ref) => {
  const [localQuery, setLocalQuery] = useState("");
  const [expertMode, setExpertMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const handleChange = (value) => { setLocalQuery(value) };

  // Get dynamic completion list for current tablenames
  const tableNames = schema_to_completion_list(schema);
  const tablenameCompletion = tableNames.length === 0 ? "" : ifNotIn(["TableExpression", "PrefixExpression"], completeFromList([...tableNames]))
  // Setting the extensions for the text editor
  const extensions = tableNames.length === 0 ? [RC(), lintGutter(), RCLinter, autocompletion({ override: [myCompletions]})]
                                             : [RC(), lintGutter(), RCLinter, autocompletion({ override: [myCompletions, tablenameCompletion]})]


  const { view } = useCodeMirror({
    container: ref.current,
    placeholder: placeholderStr,
    onChange: handleChange,
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


  const handleFocus = () => {
    if (focusState.state === 'example') {
      const timer = setTimeout(() => {
        view.dispatch({
          selection: {anchor: view.docView.length}
        })
        if (view.hasFocus) clearTimeout(timer);
      }, 100);
      setFocusState(prevState => { return { state: '' }})
    } else if (focusState.state === 'schema') {
      const cursorPosFrom = view.state.selection.main.from;
      const cursorPosTo = view.state.selection.main.to;
      const timer = setTimeout(() => {
        view.dispatch({
          changes: {from: cursorPosFrom, to: cursorPosTo, insert: focusState.schemaBtnText},
          selection: {anchor: cursorPosFrom+focusState.schemaBtnText.length}
        })
        if (view.hasFocus) clearTimeout(timer);
      }, 100);
      setFocusState(prevState => { return { state: '', schemaBtnText: '' }})
    } else {
      const timer = setTimeout(() => {
        view.focus();
        if (view.hasFocus) clearTimeout(timer);
      }, 100);
    }
  }


  const popoverID = open ? "mouse-over-popover" : undefined;
  const popoverContent = open ? anchorEl.innerText : undefined;

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
                  <RANFDialog query={localQuery} f={f} expertMode={expertMode} msg="test" />
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