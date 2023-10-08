import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function ResultsTextField({ result }) {
    const [localResult, setLocalResult] = useState("");

    const handleChange = (event) => {
      setLocalResult(event.target.value);
    };

    useEffect(() => {
      setLocalResult(result);
    }, [result, setLocalResult]);

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
              label="Result"
              value={localResult}
              onChange={handleChange}
              minRows={10}
              maxRows={10}
              InputProps={{ style: { minHeight: '40vh',
                               fontSize: 14 } }}
            />
          </div>
        </Box>
    );
}