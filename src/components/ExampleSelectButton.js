import React, { useState, useEffect, forwardRef } from 'react';
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
import employees1 from '../examples/employees1.fo';
import employees2 from '../examples/employees2.fo';
import employees3 from '../examples/employees3.fo';


const exampleImports = [employeesDb, employeesFo, employeesSig, 
                      platonicDb, platonicFo, platonicSig, 
                      productDb, productFo, productSig,
                      reviewsDb, reviewsFo, reviewsSig,
                      shipsDb, shipsFo, shipsSig];

const exampleQueryImports = {
                        '': [],
                        Employees: [employees1, employees2, employees3],
                        Platonic: [],
                        Product: [],
                        Reviews: [],
                        Ships: [] 
                    }

const examples = [{ name: '', query: '', schema: '', db: '', ex: [{ exName: '', query: '' }] }];

const exampleNames = ["Employees", "Platonic", "Product", "Reviews", "Ships"];
const exampleExt = ['db', 'query', 'schema']

const readExampleFiles = (index, i) => {
  return fetch(exampleImports[index*3 + i]).then(r => r.text())
}

const readExampleFilesQuery = (arr,i) => {
  return fetch(arr[i]).then(r => r.text())
}


const ExampleSelectButton = forwardRef(({ setFormState, setFocusState }, ref) => {
  
  const [example, setExample] = useState('');
  const [queryExample, setQueryExample] = useState('')

  useEffect(() => {
    for (const [index, element] of exampleNames.entries()) {
      examples.push({ name: element })
      for (let i = 0; i < 3; i++) {
        readExampleFiles(index, i)
          .then(text => {
            examples[index+1][exampleExt[i]] = text;
          })
      }

      examples[index+1]['ex'] = [{ exName: '', query: '' }];

      for (let j = 0; j < exampleQueryImports[element].length; j++) {
        readExampleFilesQuery(exampleQueryImports[element], j)
        .then(text => {
          examples[index+1].ex.push({ exName: element+j, query: text });
        })
      }
    }
  }, [])

  // console.log("HI")

  const handleChange = (event) => {
    setExample(event.target.value);
    setFocusState(prevState => { return {...prevState, state: 'example'}});
    findAndSetExample(event.target.value);
    ref.current.focus();
  };

  const handleChangeQuery = (event) => {
    setQueryExample(event.target.value);
    setFocusState(prevState => { return {...prevState, state: 'example'}});
    findAndSetExampleQuery(event.target.value);
    ref.current.focus();
  };

  const findAndSetExample = (val) => {
    const result = examples.find( element => element.name === val );
    if (result !== undefined) {
      setFormState({ type: 'setFormulaAndTraceAndSig', query: result.query, db: result.db, schema: result.schema });
    }
  }

  const findAndSetExampleQuery = (val) => {
    const result = examples.find( element => element.name === example );
    const currQueryExample = result.ex.find( element => element.exName === val);
    if (result !== undefined && currQueryExample !== undefined) {
      setFormState({ type: 'setQuery', query: currQueryExample.query });
    }
  }

  const queriesFound = examples.find( element => element.name === example );
  const queries = queriesFound !== undefined ? queriesFound : examples.find( element => element.name === '' );

  return (
    <>
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
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { width: '100%' },
        mt: "10px"
      }}
      noValidate
      autoComplete="off"
      >
        <div>
          <FormControl fullWidth>
            <InputLabel id="query-select-label">Query Examples</InputLabel>
            <Select
              id="query-select"
              label="Query Examples"
              value={queryExample}
              onChange={handleChangeQuery}
            >
             { queries.ex.map((elem, idx) => 
              (idx <= exampleQueryImports[example].length) && <MenuItem value={elem.exName}>{elem.exName === '' ? "None" : elem.exName}</MenuItem>
            ) } 
            </Select>
          </FormControl>
        </div>
      </Box>
    </>
  );
});

export default ExampleSelectButton;