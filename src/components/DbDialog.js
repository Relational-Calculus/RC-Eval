import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Grid from '@mui/material/Grid';
import DialogTitle from '@mui/material/DialogTitle';
import DbTextField from './DbTextField';
import SchemaTextField from "./SchemaTextField";
import InputFileUpload from './InputFileUpload';


export default function DbDialog({schema, db, setFormState}) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false); 
    }; 


    return (
        <div>
        <Button color="secondary" onClick={handleClickOpen}>DATABASE</Button>
        <Dialog 
            open={open}
            onClose={handleClose}
            scroll={'body'}
            aria-labelledby= "Loaded database"
            fullWidth
            >
            <DialogTitle id="scroll-dialod-title">Current Database</DialogTitle>
            <DialogContent>
                <DialogContentText id="scroll-dialog-description"></DialogContentText>
                <Grid container direction={'column'} spacing={4}>
                    <Grid item sm={8}>
                        <DbTextField db={db} setFormState={setFormState} />
                        <InputFileUpload /> 
                    </Grid>
                    <Grid item sm={4}>
                        <SchemaTextField schema={schema} setFormState={setFormState} />
                        <InputFileUpload />
                    </Grid> 
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={handleClose}> Close </Button>
            </DialogActions>
         </Dialog>
    </div>
    );
} 
