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


    let display = localSchema.replace(")", ")\n")


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
              required
              id="outlined-multiline-required"
              label="Schema"
              value={localSchema}
              onChange={handleChange}
              onBlur={handleBlur}
              InputProps={{ style: { minHeight: '20vh',
                               fontSize: 14 } }}
            />
          </div>
        </Box>
    );
}