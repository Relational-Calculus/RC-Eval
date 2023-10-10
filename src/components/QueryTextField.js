import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function QueryTextFields({ query, setFormState }) {
    const [localQuery, setLocalQuery] = useState("");

    const handleChange = (event) => {
      setLocalQuery(event.target.value);
    };

    const handleBlur = (event) => {
      setFormState({ type: 'setQuery', query: localQuery});
      setFormState({type: 'setCursor', cursor: event.target.selectionStart});
    };

    useEffect(() => {
      setLocalQuery(query);
    }, [query, setLocalQuery]);

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
              label="Query"
              value={localQuery}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
        </Box>
    );
}