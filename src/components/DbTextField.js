import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

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

    return (
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
    );
}