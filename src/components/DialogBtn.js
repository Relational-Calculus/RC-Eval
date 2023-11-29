import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Grid from '@mui/material/Grid';
import DialogTitle from '@mui/material/DialogTitle';
import InputFileUpload from './InputFileUpload';
import React from 'react';


export default function DialogBtn({textField, btnName, setFormState, correct=true}) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false); 
    }; 

    const color = correct ? "info" : "red" 

    

    return ( 
        <div>
        <Button sx={{ color: color }} onClick={handleClickOpen}>{btnName.toUpperCase()}</Button>
        <Dialog 
            open={open}
            onClose={(handleClose)}
            scroll={'body'}
            aria-labelledby= "Loaded database"
            fullWidth
            >
            <DialogTitle color={color} id="scroll-dialod-title" >Current {btnName}</DialogTitle>
            <DialogContent >
                <DialogContentText color={color} id="scroll-dialog-description"></DialogContentText>
                <Grid container direction={'column'} spacing={2}>
                    <Grid item sx={{margin: "5px", color: "text.primary"}}>
                        {textField}
                    </Grid>
                    <Grid item>
                        <InputFileUpload type={btnName.toLowerCase()} setFormState={setFormState} />
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