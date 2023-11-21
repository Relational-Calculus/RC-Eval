import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import employeesDb from '../examples/employees.db'
import employeesFo from '../examples/employees.fo'
import employeesSig from '../examples/employees.sig'
import platonicDb from '../examples/platonic.db'
import platonicFo from '../examples/platonic.fo'
import platonicSig from '../examples/platonic.sig'
import productDb from '../examples/product.db'
import productFo from '../examples/product.fo'
import productSig from '../examples/product.sig'
import reviewsDb from '../examples/reviews.db'
import reviewsFo from '../examples/reviews.fo'
import reviewsSig from '../examples/reviews.sig'
import shipsDb from '../examples/ships.db'
import shipsFo from '../examples/ships.fo'
import shipsSig from '../examples/ships.sig'


const exampleImports = [employeesDb, employeesFo, employeesSig, 
                      platonicDb, platonicFo, platonicSig, 
                      productDb, productFo, productSig,
                      reviewsDb, reviewsFo, reviewsSig,
                      shipsDb, shipsFo, shipsSig];

const exampleNames = ["Employees", "Platonic", "Product", "Reviews", "Ships"];
const exampleExt = ['db', 'query', 'schema']

const examples = [{
  name: '',
  query: '',
  schema: '',
  db: ''
}]

const readExampleFiles = (index, i) => {
  return fetch(exampleImports[index*3 + i]).then(r => r.text())
}

export default function ExampleSelectButton ({ setFormState }) {
  
  const [example, setExample] = useState('');

  useEffect(() => {
    for (const [index, element] of exampleNames.entries()) {
      examples.push({ name: element })
      for (let i = 0; i < 3; i++) {
        readExampleFiles(index, i)
          .then(text => {
            examples[index+1][exampleExt[i]] = text;
          })
      }
    }
  }, [])

  const handleChange = (event) => {
    setExample(event.target.value);
    findAndSetExample(event.target.value);
  };

  const findAndSetExample = (example) => {
    const result = examples.find( element => element.name === example );
    if (result !== undefined) {
      setFormState({ type: 'setFormulaAndTraceAndSig', query: result.query, db: result.db, schema: result.schema });
    }
  }


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
        <FormControl fullWidth>
          <InputLabel id="example-select-label">Example</InputLabel>
          <Select
            id="example-select"
            label="Example"
            value={example}
            onChange={handleChange}
          >
            <MenuItem value={""}>None</MenuItem>
            <MenuItem value={"Employees"}>Employees</MenuItem>
            <MenuItem value={"Platonic"}>Platonic Triangles</MenuItem>
            <MenuItem value={"Product"}>Computer Shop</MenuItem>
            <MenuItem value={"Reviews"}>Suspicious Reviews</MenuItem>
            <MenuItem value={"Ships"}>Battleships</MenuItem>
          </Select>
        </FormControl>
      </div>
    </Box>
  );
}