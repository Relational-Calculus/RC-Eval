import React, { useEffect, useReducer } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import SchemaTextField from './components/SchemaTextField';
import Schemabuttons from "./components/SchemaButtons";
import ExampleSelectButton from './components/ExampleSelectButton';
import CodeEditor from './components/CodeEditor';
import Result from "./components/DisplayResults";
import DbTextFields from "./components/DbTextField";
// import DbDialog from "./components/DbDialog";


function evalSchema(evalState, action) {
  try {
    const schemaResult = window.checkSchema(action.schema);
    return { ...evalState,
            schema: {result: schemaResult, correct: true}};
  } catch (error) {
    return { ...evalState, 
            schema: {err_msg: error[2], correct: false}};
  }
}

function evalQuery(evalState, action) {
  try {
    const freeVariables = window.checkQuery(action.query);
    const regEx = /\w+/g
    return { ...evalState,
            query: {fv: freeVariables.match(regEx), correct: true}};
  } catch (error) {
      console.log(error)
    return { ...evalState, 
            query: {fv: [], err_msg: error[1], correct: false}};
  }
}

function evalDb(evalState, action) {
  try {
    const dbResult = window.checkDb(action.db);
    const regEx = /[\w. ]+/g
    return { ...evalState,
            db: {quickresult: dbResult, result: dbResult.match(regEx), correct: true}};
  } catch (error) {
    console.log(error[1][1])
    return { ...evalState,
            db: {err_msg: error[1][1]}, correct: false};
  }
}


function evaluateQuery(evalState, action) {

  const stateAfterSchemaEval = evalSchema(evalState, action);
  if (!stateAfterSchemaEval.schema.correct) {
    return { ...stateAfterSchemaEval };
  }

  const stateAfterQueryEval = evalQuery(stateAfterSchemaEval, action);
  if (!stateAfterQueryEval.query.correct) {
    return { ...stateAfterQueryEval };
  }
  
  const stateAfterDbEval = evalDb(stateAfterQueryEval, action);
  return { ...stateAfterDbEval };
}


function formStateReducer(formState, action) {
  switch (action.type) {
  case 'setQuery':
    return { ...formState,
             query: action.query };
  case 'setDb':
    return { ...formState,
             db: action.db };
  case 'setSchema':
    return { ...formState,
             schema: action.schema };
  case 'setFormulaAndTraceAndSig':
    return { query: action.query,
             db: action.db,
             schema: action.schema };
  default:
    return formState;
    }
}


function evalStateReducer(evalState, action) {
  switch(action.type) {
    case 'checkSchema':
      return evalSchema(evalState, action);
    case 'checkQuery':
      return evalQuery(evalState, action);
    case 'checkDb':
      return evalDb(evalState, action);
    case 'queryEval':
      return evaluateQuery(evalState, action);
    default:
      return evalState;
  }
}

export default function RcEval() {

  const [formState, setFormState] = useReducer(formStateReducer, { query: "", db: "", schema: "", result: ""});
  const [evalState, setEvalState] = useReducer(evalStateReducer, 
                                                                {
                                                                  schema: {result: "", err_msg: "", correct: false},
                                                                  query: {fv: [], err_msg: "", correct: false},
                                                                  db: {quickresult: "", result: "", err_msg: "", correct: false}
                                                                })

  useEffect(() => {
    const action = { type: "queryEval", 
                   query: formState.query, 
                   db: formState.db, 
                   schema: formState.schema };
                   
    setEvalState(action);

  }, [formState.schema, formState.query, formState.db])

  return (
    <Box style={{ height: '100vh', margin: 100, padding: 15 }}>
      <Grid container spacing={4}>
        <Grid item xs={0}></Grid>
        <Grid item xs={3}>
          <DbTextFields db={formState.db} setFormState={setFormState}/> 
          <ExampleSelectButton setFormState={setFormState} />
          <Schemabuttons schema={formState.schema} />
        </Grid>
        <Grid item xs={8}>
          <CodeEditor query={formState.query} setFormState={setFormState} />
          { evalState.schema.correct && evalState.query.correct && evalState.db.correct &&
            <Result fv={evalState.query.fv} results={evalState.db.result} quickresult={evalState.db.quickresult} />
          }
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </Box>
  );
}