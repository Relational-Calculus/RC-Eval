import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


/* function ExtractsNames({schema, db}){
  let namesArray = schema.split("\n")
  let newArrName = []
  let newArrElement = []
  const regEx = /?=\(


  for (let i=0; i < namesArray.length; i++){
    newArrName.push(namesArray[i].substr(0, namesArray[i].indexOf('(')))
    let elements = namesArray[i].substr(namesArray[i].indexOf("(") + 1, namesArray[i].indexOf(")"));
    console.log(elements)
    newArrElement.push(elements.slice(0,-1));
  }

  console.log(newArrName, newArrElement)
  const deconstructed = [newArrName, newArrElement]

  let dbReady = db
  
  for (let type=0; type < newArrName.length; type++){
        dbReady = " ".join(dbReady.split(type))
    }
  console.log(dbReady)
} */


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
    // console.log(ExtractsNames(localSchema))
    
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