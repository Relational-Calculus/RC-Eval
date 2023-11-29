import { useState, useEffect, forwardRef, Children } from "react";
import { useCodeMirror } from '@uiw/react-codemirror';
import { RC } from '../lang-rc/index.js';
import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';
import { lintGutter } from "@codemirror/lint"
import { RCLinter } from "../error_handling.js";
import "./CodeEditor.css";
import Popover from '@mui/material/Popover';
import PopoverPaper from "./PopoverPaper.js";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Draggable from 'react-draggable';
import WhatEvaluates from "./EvaluatedQuery.js";
// import { makeStyles } from '@material-ui/core/styles';

// Define the extensions outside the component for the best performance.
// If you need dynamic extensions, use React.useMemo to minimize reference changes
// which cause costly re-renders.

// Constants
const extensions = [RC(), lintGutter(), RCLinter];
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
    // { tag: t.variableName, color: '#dea112' },
    { tag: t.string, color: '#0971d9' },
    { tag: t.operatorKeyword, color: '#de3c10' },
    { tag: t.paren, color: '#10c210' },
  ],
});

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const CodeEditor = forwardRef(({ query, setFormState, focusState, setFocusState, pinf, pfin }, ref) => {
  const [localQuery, setLocalQuery] = useState("");
  const [expertMode, setExpertMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const handleChange = (value) => { setLocalQuery(value) };

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpen = () => {
      setOpenDialog(true);
  };

  const handleClose = () => {
      setOpenDialog(false); 
  }; 

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
    console.log(focusState.schemaBtnText)
    if (focusState.state === 'example') {
      const timer = setTimeout(() => {
        view.focus();
        view.dispatch({
          selection: {anchor: view.docView.length}
        })
        if (view.hasFocus) clearTimeout(timer);
      }, 100);
      setFocusState(prevState => { return { state: '' }})
    } else if (focusState.state === 'schema') {
      const cursorPosFrom = view.state.selection.main.from;
      const cursorPosTo = view.state.selection.main.to;
      // const textLength = focusState.schemaBtnText.length;
      const timer = setTimeout(() => {
        view.focus();
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
              <label className="mode" htmlFor="expertMode">Expert Mode<input type="checkbox" className="mode" id="expertMode" onClick={handleClick}></input></label>
              {expertMode && 
                <div>
                <Button onClick={handleClickOpen}>Examine evaluation?</Button>
                <Dialog 
                    open={openDialog}
                    onClose={(handleClose)}
                    scroll={'body'}
                    PaperComponent={PaperComponent}
                    aria-labelledby= "Examine Query"
                    fullWidth
                    >
                    <DialogTitle id="scroll-dialod-title">Evaluation</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="draggable-dialog-title"></DialogContentText>
                        <Grid container direction={'column'} spacing={2}>
                        <Grid item sx={{margin: "5px", color: "text.primary"}}>
                                <Grid>
                                This is the safe-range infinit query. If this holds, then the finite part is not necessarily valid:
                                </Grid>
                                {pinf}
                            </Grid>
                            <Grid item sx={{margin: "5px", color: "text.primary"}}>
                                <Grid>
                                This is the finite query. It is rewritten to be safe-range and evaluable. This is how the query is evaluated:   
                                </Grid>
                                {pfin}
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button sx={{ color: "error" }} onClick={handleClose}> Close </Button>
                    </DialogActions>
                  </Dialog>
            </div>}
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
                // PaperProps={{
                //   style: {
                //     backgroundColor: "transparent",
                //     boxShadow: "none",
                //     borderRadius: 0,
                //     // pointerEvents: "auto"
                //   }
                // }}
                slotProps={{
                  paper: {
                    style: {
                      backgroundColor: "transparent",
                      boxShadow: "none",
                      borderRadius: 0
                    }
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