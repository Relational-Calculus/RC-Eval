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
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

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

export default function ExamineDialog({ pinf, pfin }) {
    const [openDialog, setOpenDialog] = useState(false);

    const handleClick = () => {
        setOpenDialog(true);
    };
  
    const handleClose = () => {
        setOpenDialog(false); 
    };

    const pinfFittedTxt = pinf !== undefined ? fitStringOnScreen(pinf) : "";
    const pfinFittedTxt = pfin !== undefined ? fitStringOnScreen(pfin) : "";

    const notemptypinf = pinfFittedTxt !== "[]"

    return (
        <>
            <Tooltip title="Examine the evaluation of your query">
                <Button sx={{color: 'info.main'}} onClick={handleClick}>Evaluation</Button>
            </Tooltip>
            <Dialog 
                open={openDialog}
                onClose={(handleClose)}
                scroll={'body'}
                PaperComponent={PaperComponent}
                aria-labelledby= "draggable-dialog-title"
                fullWidth
                >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">Evaluation</DialogTitle>
                <DialogContent>
                    <DialogContentText id="draggable-dialog-title"></DialogContentText>
                    <Grid container direction={'column'} spacing={2}>
                    <Grid item sx={{margin: "5px", color: "text.primary"}}>
                        <Typography variant="body1" sx={{textDecoration: 'underline'}}>
                            Safe-range infinite query
                        </Typography>
                        <Typography variant="subtitle2" sx={{mb: '10px'}}>
                            <i>If this evaluates to true, then the finite part is not necessarily valid</i>
                        </Typography>
                        {notemptypinf ? 
                            <CodeMirror 
                                maxWidth="550px"
                                theme={myTheme}
                                extensions={extensions}
                                value={pinfFittedTxt}
                                readOnly={true}
                                basicSetup={{ lineNumbers: false }}
                            />
                            :                             
                            <CodeMirror 
                                maxWidth="550px"
                                theme={myTheme}
                                extensions={extensions}
                                value={""}
                                readOnly={true}
                                basicSetup={{ lineNumbers: false }}
                            /> }
                        </Grid>
                        <Grid item sx={{margin: "5px", color: "text.primary"}}>
                            <Typography variant="body1" sx={{textDecoration: 'underline'}}>
                                Safe-range finite query
                            </Typography>
                            <Typography variant="subtitle2" sx={{mb: '10px'}}>
                                <i>This is how the query is evaluated</i>
                            </Typography>
                            <CodeMirror 
                                maxWidth="550px"
                                theme={myTheme}
                                extensions={extensions}
                                value={pfinFittedTxt}
                                readOnly={true}
                                basicSetup={{ lineNumbers: false }}
                            />
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