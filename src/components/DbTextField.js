import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DbTextFields({ db, setFormState }) {
    const [localDb, setLocalDb] = useState("");

    const handleChange = (event) => {
      setLocalDb(event.target.value);
    };

    const handleBlur = (event) => {
      setFormState({ type: 'setDb', db: localDb });
    };

    useEffect(() => {
      setLocalDb(db);
    }, [db, setLocalDb]);



    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
        setOpen(true);
    };
  
    const handleClose = () => {
      setFormState({ type: 'setDb', db: localDb });
      setOpen(false); 
    }; 
  
    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = db;
    }
  }, [open]);
  
      // createDatabaseTable(schema={schema}, db={db})
  
    return (
        <div>
        <Button onClick={handleClickOpen} >Database </Button>
        <Dialog 
            open={open}
            onClose={handleClose}
            scroll={'body'}
            aria-labelledby= "Loaded database"
            >
            <DialogTitle id="scroll-dialod-title">Loaded Database</DialogTitle>
            <DialogContent>
                <DialogContentText
                id="scroll-dialog-description"
                >
                Current database
                {/* {createDatabaseTable(db={db}, schema={schema})} */}
                </DialogContentText>
            <TextField
            multiline
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
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}> Close </Button>
            </DialogActions>
         </Dialog>
    </div>
    );
  } 

  /*   return (
        <Box
          component="form"
          sx={{
          '& .MuiTextField-root': { width: '100%' },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              multiline
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
          </div>
        </Box>
    ); */
