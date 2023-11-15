import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';

export default function DbTextField({ db, setFormState }) {
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
    );
  } 
