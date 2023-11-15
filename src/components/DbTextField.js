import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputFileUpload from './InputFileUpload';

export default function DbTextFields({ db, setFormState }) {
    const [localDb, setLocalDb] = useState("");

    const handleChange = (event) => {
      setLocalDb(event.target.value);
    };

    const handleBlur = () => {
      setFormState({ type: 'setDb', db: localDb });
    };

    useEffect(() => {
      setLocalDb(db);
    }, [db, setLocalDb]);



    const [open, setOpen] = useState(false);
  
    const handleClickOpen = () => {
        setOpen(true);
    };
  
    const handleClose = () => {
      setFormState({ type: 'setDb', db: localDb });
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
                <DialogContentText
                id="scroll-dialog-description"
                >
                </DialogContentText>
            <TextField
            multiline
            fullWidth
            id="outlined-required"
            label="Db"
            value={localDb}
            onChange={handleChange}
            onBlur={handleBlur}
            minRows={10}
            maxRows={10}
            InputProps={{ style: { minHeight: '40vh',
                             fontSize: 14, align: 'top' } }}
          />
            <InputFileUpload />  
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={handleClose}> Close </Button>
            </DialogActions>
         </Dialog>
    </div>
    );
  } 
