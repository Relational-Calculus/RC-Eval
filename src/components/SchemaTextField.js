import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function SchemaTextFields({ schema, setFormState }) {
    const [localSchema, setLocalSchema] = useState("");

    const handleChange = (event) => {
      setLocalSchema(event.target.value);
    };

    const handleBlur = (event) => {
      setFormState({ type: 'setSchema', schema: localSchema });
    };

    useEffect(() => {
      setLocalSchema(schema);
    }, [schema, setLocalSchema]);

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
              required
              id="outlined-required"
              label="Schema"
              value={localSchema}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
        </Box>
    );
}