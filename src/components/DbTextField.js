import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';

// dbLegit is evalState.db.correct : Boolean
// if dbLegit = false then mark the textField

export default function DbTextField({ db, dbLegit, setFormState}) {
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
  
    return (
        <div>
          <TextField
            multiline
            fullWidth
            variant="outlined"
            id="outlined-required"
            label=""
            value={localDb}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!dbLegit}
            minRows={10}
            maxRows={10}
            InputProps={{ style: { minHeight: '40vh',
                                   fontSize: 14, 
                                   align: 'top' } }}
          />
    </div>
    );
  } 
