import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';

// type = 0 for database; type = 1 for schema
export default function GenericTextField({ text, textLegit, setFormState, type }) {
    const [localText, setLocalText] = useState("");

    const handleChange = (event) => {
        setLocalText(event.target.value);
    };

    const handleBlur = (event) => {
        if (type === 1) {
            setFormState({ type: 'setSchema', schema: localText });
        } else {
            setFormState({ type: 'setDb', db: localText });
        }
    };

    useEffect(() => {
        setLocalText(text);
    }, [text, setLocalText]);

    
    return (
          <div>
            <TextField
              multiline
              fullWidth
              variant="outlined"
              id="outlined-required"
              label=""
              error={!textLegit}
              value={localText}
              onChange={handleChange}
              onBlur={handleBlur}
              maxRows={20}
              InputProps={{ style: { minHeight: '20vh',
                                     fontSize: 14,
                                     align: 'top' 
                                    } }}
            />
          </div>
    );
}