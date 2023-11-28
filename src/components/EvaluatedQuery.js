import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Draggable from 'react-draggable';


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

export default function WhatEvaluates({pfin, pinf }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false); 
    }; 


    return (
        <div>
        <Button variant="outlined" sx={{ color: "info" }} onClick={handleClickOpen}>How is the query evaluated?</Button>
        <Dialog 
            open={open}
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
    </div>
    );
  } 
