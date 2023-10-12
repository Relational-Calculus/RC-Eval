import React, { useEffect, useReducer } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SchemaTextField from './components/SchemaTextField';
import QueryTextField from './components/QueryTextField';
import DbTextField from './components/DbTextField';
import ExampleSelectButton from './components/ExampleSelectButton';
import ReactVirtualizedTable from './components/DatabaseTable';
import OperatorButton from './components/QueryButtons';
import ButtonGroup from '@mui/material/ButtonGroup';

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
    return { ...evalState, 
            query: {fv: [], err_msg: error[1], correct: false}};
  }
}

function evalDb(evalState, action) {
  try {
    const dbResult = window.checkDb(action.db);
    const regEx = /\w+/g
    console.log(dbResult, dbResult.match(regEx))
    return { ...evalState,
            db: {result: dbResult.match(regEx), correct: true}};
  } catch (error) {
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
             query: action.query,
             cursor: action.cursor };
  case 'setDb':
    return { ...formState,
             db: action.db };
  case 'setSchema':
    return { ...formState,
             schema: action.schema };
  case 'setCursor':
    return {...formState,
              cursor: action.cursor}
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

  const [formState, setFormState] = useReducer(formStateReducer, { query: "", db: "", schema: "", result: "", cursor: "" });
  const [evalState, setEvalState] = useReducer(evalStateReducer, 
                                                                {
                                                                  schema: {result: "", err_msg: "", correct: false},
                                                                  query: {fv: [], err_msg: "", correct: false},
                                                                  db: {result: "", err_msg: "", correct: false}
                                                                })

  useEffect(() => {
    let action = { type: "queryEval", 
                   query: formState.query, 
                   db: formState.db, 
                   schema: formState.schema };

    setEvalState(action);

  }, [formState.schema, formState.query, formState.result])

  return (
    <Box style={{ height: '100vh', margin: 10, padding: 10 }}>
      <h1>RC-eval <font size={3}> Evaluating Relational Calculus Queries</font></h1>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <ExampleSelectButton setFormState={setFormState} />
        </Grid>
        <Grid item xs={9}>
          <ButtonGroup variant="outlined" size="large" spacing={2}>
            <OperatorButton query={formState.query} setFormState={setFormState} icon={"∧"} cursorPosition={formState.cursor}/>
            <OperatorButton query={formState.query} setFormState={setFormState} icon={"∨"} cursorPosition={formState.cursor}/>
            <OperatorButton query={formState.query} setFormState={setFormState} icon={"∃"} cursorPosition={formState.cursor}/>
            <OperatorButton query={formState.query} setFormState={setFormState} icon={"¬"} cursorPosition={formState.cursor}/>
            <OperatorButton query={formState.query} setFormState={setFormState} icon={"⇒"} cursorPosition={formState.cursor}/> 
            <OperatorButton query={formState.query} setFormState={setFormState} icon={"∀"} cursorPosition={formState.cursor}/>
            <OperatorButton query={formState.query} setFormState={setFormState} icon={"="} cursorPosition={formState.cursor}/>
          </ButtonGroup>
          <QueryTextField query={formState.query} setFormState={setFormState} />
        </Grid>
        <Grid item xs={3}>
          <SchemaTextField schema={formState.schema} setFormState={setFormState} />
        </Grid>
        <Grid item xs={9}>
          { evalState.schema.correct && evalState.query.correct && evalState.db.correct &&
          <ReactVirtualizedTable fv={evalState.query.fv} results={evalState.db.result} />
          }
        </Grid>
      </Grid>
    </Box>
  );
}