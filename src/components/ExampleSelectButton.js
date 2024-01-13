import { useState, forwardRef } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import './ExampleSelectButton.css';

import employeesDb from '../examples/employees.db'
import employeesSig from '../examples/employees.sig'
import employees1 from '../examples/employees1.fo'
import employees2 from '../examples/employees2.fo';
import employees3 from '../examples/employees3.fo';
import employees4 from '../examples/employees4.fo';

import platonicDb from '../examples/platonic.db'
import platonicSig from '../examples/platonic.sig'
import platonic1 from '../examples/platonic1.fo'
import platonic2 from '../examples/platonic2.fo'
import platonic3 from '../examples/platonic3.fo'

import productDb from '../examples/product.db'
import productSig from '../examples/product.sig'
import product1 from '../examples/product1.fo'
import product2 from '../examples/product2.fo'
import product3 from '../examples/product3.fo'
import product4 from '../examples/product4.fo'

import reviewsDb from '../examples/reviews.db'
import reviewsSig from '../examples/reviews.sig'
import reviews1 from '../examples/reviews1.fo'
import reviews2 from '../examples/reviews2.fo';

import moviesDb from '../examples/movies.db'
import moviesSig from '../examples/movies.sig'
import movies1 from '../examples/movies1.fo'
import movies2 from '../examples/movies2.fo'

import shipsDb from '../examples/ships.db'
import shipsSig from '../examples/ships.sig'
import ships1 from '../examples/ships1.fo';
import ships2 from '../examples/ships2.fo';
import ships3 from '../examples/ships3.fo';
import ships4 from '../examples/ships4.fo'

const examples = [ 
  { 
    name: '', 
    schema: '', 
    db: '', 
    queries: [
      { queryName: '', query: '' }
    ]
  },
  { 
    name: 'Employees', 
    schema: employeesSig, 
    db: employeesDb, 
    queries: [
      { queryName: '', query: '' }, 
      { queryName: 'Example 1', query: employees1 },
      { queryName: 'Example 2', query: employees2 },
      { queryName: 'Example 3', query: employees3 },
      { queryName: 'Example 4', query: employees4 }
    ]
  },
  { 
    name: 'Platonic', 
    schema: platonicSig,  
    db: platonicDb, 
    queries: [
      { queryName: '', query: '' }, 
      { queryName: 'Example 1', query: platonic1 },
      { queryName: 'Example 2', query: platonic2 },
      { queryName: 'Example 3', query: platonic3 }
    ]
  },
  {
    name: 'Product', 
    schema: productSig, 
    db: productDb, 
    queries: [
      { queryName: '', query: '' }, 
      { queryName: 'Example 1', query: product1 },
      { queryName: 'Example 2', query: product2 },
      { queryName: 'Example 3', query: product3 },
      { queryName: 'Example 4', query: product4 }
    ]
  },
  {
    name: 'Reviews', 
    schema: reviewsSig, 
    db: reviewsDb, 
    queries: [
      { queryName: '', query: '' }, 
      { queryName: 'Example 1', query: reviews1 },
      { queryName: 'Example 2', query: reviews2 }
    ]
  },
  { 
    name: 'Ships', 
    schema: shipsSig, 
    db: shipsDb, 
    queries: [
      { queryName: '', query: '' }, 
      { queryName: 'Example 1', query: ships1 },
      { queryName: 'Example 2', query: ships2 },
      { queryName: 'Example 3', query: ships3 },
      { queryName: 'Example 4', query: ships4 }
    ]
  },
  {
    name: 'Movies', 
    schema: moviesSig, 
    db: moviesDb, 
    queries: [
      { queryName: '', query: '' }, 
      { queryName: 'Example 1', query: movies1 },
      { queryName: 'Example 2', query: movies2 }
    ]
  },
 ];


const ExampleSelectButton = forwardRef(({ setFormState, setFocusState }, ref) => {
  
  const [example, setExample] = useState('');
  const [queryExample, setQueryExample] = useState('')

  const handleChange = (event) => {
    setExample(event.target.value);
    setQueryExample('');
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
      setFormState({ type: 'setFormulaAndTraceAndSig', query: '', db: result.db, schema: result.schema });
    }
  }

  const findAndSetExampleQuery = (val) => {
    const result = examples.find( element => element.name === example );
    const currQueryExample = result.queries.find( element => element.queryName === val);
    if (result !== undefined && currQueryExample !== undefined) {
      setFormState({ type: 'setQuery', query: currQueryExample.query });
    }
  }

  const q = examples.find( element => element.name === example ).queries;

  return (
    <div className='wrapper'>
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
            <InputLabel sx={{color: 'text.primary'}} id="example-select-label"><em>Example</em></InputLabel>
            <Select
              id="example-select"
              label="Example"
              value={example}
              onChange={handleChange}
              sx={{
                color: 'text.primary', 
              }}
            >
              <MenuItem sx={{color: 'text.primary'}} value={""}>None</MenuItem>
              <MenuItem sx={{color: 'text.primary'}} value={"Employees"}>Employees</MenuItem>
              <MenuItem sx={{color: 'text.primary'}} value={"Platonic"}>Platonic Triangles</MenuItem>
              <MenuItem sx={{color: 'text.primary'}} value={"Product"}>Computer Shop</MenuItem>
              <MenuItem sx={{color: 'text.primary'}} value={"Reviews"}>Suspicious Reviews</MenuItem>
              <MenuItem sx={{color: 'text.primary'}} value={"Ships"}>Battleships</MenuItem>
              <MenuItem sx={{color: 'text.primary'}} value={"Movies"}>Movies</MenuItem>
            </Select>
          </FormControl>
        </div>
      </Box>
      { example !== "" && 
      <Box
      className='queryBox'
      component="form"
      sx={{
        '& .MuiTextField-root': { width: '100%' },
        mt: "10px"
      }}
      noValidate
      autoComplete="off"
      >
        <div>
          <FormControl className='queryExamples' fullWidth size="small">
            <InputLabel sx={{color: 'text.primary', fontSize: "14px"}} id="query-select-label"><em>Query Examples</em></InputLabel>
            <Select
              id="query-select"
              label="Query Examples"
              value={queryExample}
              onChange={handleChangeQuery}
              sx={{
                color: 'text.primary',
              }}
            >
             { q.map((elem) => 
              <MenuItem sx={{color: 'text.primary'}} value={elem.queryName}>{elem.queryName === '' ? "None" : elem.queryName}</MenuItem>
            ) } 
            </Select>
          </FormControl>
        </div>
      </Box>}
    </div>
  );
});

export default ExampleSelectButton;