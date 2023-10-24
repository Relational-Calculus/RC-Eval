import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ReactVirtualizedTable from './DatabaseTable'
import ExtractNames from './SchemaTextField'

/* function createDatabaseTable({schema, db}){
    let fst = ExtractNames(schema)[0]
    let snd = ExtractNames(schema)[1]
    let dbReady = db
    console.log(fst)
/*     for (let type=0; type < fst.length; type++){
        dbReady = " ".join(dbReady.split(fst))
    } */


export default function DbDialog({schema, db}) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
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
                {/* {createDatabaseTable(db={db}, schema={schema})} */}
                </DialogContentText>
                
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}> Close </Button>
            </DialogActions>
         </Dialog>
    </div>
    );
} 
