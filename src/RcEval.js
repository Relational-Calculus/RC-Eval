import React, { useEffect, useReducer } from "react";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import SchemaTextField from './components/SchemaTextField';
import ExampleSelectButton from './components/ExampleSelectButton';
import EvalButton from './components/EvalButton';
import ReactVirtualizedTable from './components/DatabaseTable';
import CodeEditor from './components/CodeEditor';


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
    const regEx = /[\w. ]+/g
    return { ...evalState,
            db: {quickresult: dbResult, result: dbResult.match(regEx), correct: true}};
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

  // const handleEval = (event) => {
  //   let action = { type: "queryEval", 
  //                  query: formState.query, 
  //                  db: formState.db, 
  //                  schema: formState.schema };

  //   setEvalState(action);
  // }

  useEffect(() => {
    const action = { type: "queryEval", 
                   query: formState.query, 
                   db: formState.db, 
                   schema: formState.schema };
                   
    setEvalState(action);

  }, [formState.schema, formState.query, formState.db])

  return (
    <Container>
      <h1>RC-eval <font size={3}> Evaluating Relational Calculus Queries</font></h1>
      <Grid container spacing={2}>
        <Grid container item xs={12} md={6} spacing={2}>
          <Grid item xs={12} md={12}>
            <ExampleSelectButton setFormState={setFormState} />
          </Grid>
        </Grid>
        <Grid item xs={9}>
          <CodeEditor query={formState.query} setFormState={setFormState} />
        </Grid>
        <Grid item xs={3}>
          <SchemaTextField schema={formState.schema} setFormState={setFormState} />
        </Grid>
        <Grid item xs={9}>
          { evalState.schema.correct && evalState.query.correct && evalState.db.correct &&
          <Grid item xs={12}>
            <Result fv={evalState.query.fv} results={evalState.db.result} quickresult={evalState.db.quickresult} />
          </Grid>
          }
        </Grid>
      </Grid>
    </Container>
  );
}