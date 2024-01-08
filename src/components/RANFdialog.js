import { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Draggable from 'react-draggable';
import CodeMirror from '@uiw/react-codemirror';
import { RC } from '../lang-rc/index.js';
import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';
import Box from '@mui/material/Box';
import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';

const extensions = [RC()];

const myTheme = createTheme({
    theme: 'light',
    settings: {
      background: '#ffffff',
      foreground: '#292a2b',
      caret: '#5d00ff',
      selection: '#036dd616',
      selectionMatch: '#036dd616',
      lineHighlight: '#ffffff1a',
      gutterBackground: '#fff',
      gutterForeground: '#8a919966',
    },
    styles: [
      { tag: t.definitionKeyword, color: '#aa5bc2' },
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

const MAXCHAR = 74;

// Copied from Examine Dialog button
// Split the strings s.t. they fit in the dialog box
function fitStringOnScreen(queryStr) {
    const strArray = queryStr.split(' ');
    const arrLength = strArray.length;
    let cnt = 0;

    for (let i = 0; i < arrLength; i++) {
        cnt += strArray[i].length+1;
        if (cnt > MAXCHAR) {
            const wordWithNewline = strArray[i].padStart(strArray[i].length+1, '\n');
            strArray.splice(i, 1, wordWithNewline);
            cnt = wordWithNewline.length;
        }
    }
    return strArray.join(' ');
}

export default function RANFDialog({ query, f1 , expertMode, msg1}) {
    const [openDialog, setOpenDialog] = useState(false);

    const reImplies = /(IMPLIES | ⇒)/g
    const reForAll = /(∀ | FORALL)/g
    const isMon = f1 === "[]"

    var containsForAll = reForAll.test(query) 
    var containsImplies = reImplies.test(query)

    const handleClick = () => {
        setOpenDialog(true);
        containsImplies = reImplies.test(query) 
        containsForAll = reForAll.test(query) 
    };
  
    const handleClose = () => {
        setOpenDialog(false); 
    };

    const fFittedTxt = f1 !== undefined ? fitStringOnScreen(f1) : "";


    return (
        <>
            <Tooltip title="Is your query in Relational Algebra Normal Form?">
                <Button sx={{color: 'info.main'}} onClick={handleClick}>RANF</Button>
            </Tooltip>
            <Dialog 
                open={openDialog}
                onClose={(handleClose)}
                scroll={'body'}
                PaperComponent={PaperComponent}
                aria-labelledby= "draggable-dialog-title"
                fullWidth
                >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">Is your query RANF?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="draggable-dialog-title"></DialogContentText>
                    <Grid container direction={'column'} spacing={2}>
                    <Grid item sx={{margin: "5px", color: "text.primary"}}>
                    {  isMon ? <Box component="div" ><CheckIcon color='success' /> Your query is RANF </Box>
                    : containsForAll ? <Box component="div" > Your query is <b>not</b> RANF as it contains "FORALL"<br /><br />Try rewriting this to: ¬ ∃ <span style={{color: 'green'}}>φ</span> ¬ <span style={{color: 'green'}}>ψ</span></Box>
                    : containsImplies ? <Box component="div" > Your query is <b>not</b>  RANF as it contains "IMPLIES"<br /><br />Try rewriting this to: (¬<span style={{color: 'green'}}>φ</span>) ∨ <span style={{color: 'green'}}>ψ</span></Box>
                    : <Box component="div" > 
                        <Grid item sx={{margin: "5px", color: "text.primary"}}>
                            <Typography variant="body2" sx={{mb: '10px'}}>
                                Your query is <b>not</b> RANF because of the subquery:
                            </Typography>
                            <CodeMirror 
                                maxWidth="550px"
                                theme={myTheme}
                                extensions={extensions}
                                value={fFittedTxt}
                                readOnly={true}
                                basicSetup={{ lineNumbers: false }}
                            />
                            </Grid>
                            { expertMode && 
                                <Alert icon={false} sx={{mt: '25px'}} severity="warning">
                                    <AlertTitle>The reason is that:</AlertTitle>
                                    {msg1}
                                </Alert> 
                            } 
                        </Box>}
                    </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ color: "error" }} autoFocus onClick={handleClose}> Close </Button>
                </DialogActions>
              </Dialog>
        </>
    )
}