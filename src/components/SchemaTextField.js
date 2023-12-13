import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';


export default function SchemaTextField({ schema, schemaLegit, setFormState }) {
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
          <div>
            <TextField
              multiline
              fullWidth
              variant="outlined"
              id="outlined-required"
              label=""
              error={!schemaLegit}
              value={localSchema}
              onChange={handleChange}
              onBlur={handleBlur}
              InputProps={{ style: { minHeight: '20vh',
                               fontSize: 14 } }}
            />
          </div>
    );
}