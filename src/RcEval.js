import { useEffect, useReducer, useRef, useState } from "react";
import Grid from '@mui/material/Grid';
import Schemabuttons from "./components/SchemaButtons";
import ExampleSelectButton from './components/ExampleSelectButton';
import CodeEditor from './components/CodeEditor';
import Result from "./components/DisplayResults";
import DialogBtn from "./components/DialogBtn";
import GenericTextField from "./components/GenericTextField";
import './RcEval.css';


function evalSchema(evalState, action) {
  try {
    const schemaResult = window.checkSchema(action.schema);
    return { ...evalState,
            schema: {result: schemaResult, correct: true}};
  } catch (error) {
    console.log(error);
    return { ...evalState, 
            schema: {err_msg: error[2], correct: false}};
  }
}

function evalQuery(evalState, action) {
  try {
    const queryResults = window.checkQuery(action.query);
    const freeVariables = queryResults[0];
    const pfin = queryResults[1];
    const pinf = queryResults[2];

    const f = window.checkQueryIsMon(action.query);
    const f1 = f[0];
    const msg1 = f[1]; 
    
    const regEx = /[\w.-]+/g
    return { ...evalState,
            query: {fv: freeVariables.match(regEx), correct: true, pfin:pfin, pinf:pinf, f1:f1, msg1:msg1}};
  } catch (error) {
    try {
      const f = window.checkQueryIsMon(action.query);
      const f1 = f[0];
      const msg1 = f[1]; 

      return { ...evalState, 
        query: {fv: [], err_msg: error[1], correct: false, f1:f1, msg1:msg1}};

    } catch (error) {
      console.log(error);
      return { ...evalState, 
        query: {fv: [], err_msg: error[1], correct: false}};
    }
  }
}

function evalDb(evalState, action) {
  try {
    const dbResult = window.checkDb(action.db);
    const regEx = /[/\w. '-]+/g
    return { ...evalState,
            db: {quickresult: dbResult, result: dbResult.match(regEx), correct: true}};
  } catch (error) {
    console.log(error)
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

  const [formState, setFormState] = useReducer(formStateReducer, { query: "", db: "", schema: "" });
  const [evalState, setEvalState] = useReducer(evalStateReducer, 
                                                                {
                                                                  schema: {result: "", err_msg: "", correct: false},
                                                                  query: {fv: [], err_msg: "", correct: false, pfin: "", pinf: "", f1: "", msg1:""},
                                                                  db: {quickresult: "", result: "", err_msg: "", correct: true}
                                                                })
  const [focusState, setFocusState] = useState({ state: '', schemaBtnText: '' });
  const textEditorRef = useRef(null);

  useEffect(() => {
    const action = { type: "queryEval", 
                   query: formState.query, 
                   db: formState.db, 
                   schema: formState.schema };
                   
    setEvalState(action);

  }, [formState.schema, formState.query, formState.db])

  
  return (
    <div style={{margin: "100px 0", padding: 0}}>
      <Grid className="outerContainer" container spacing={4}>
        <Grid item md={0} lg={1}></Grid>
        <Grid item md={3} lg={2}>
          <Grid className="databaseBtn" container direction={'row'}>
            <DialogBtn 
              textField={<GenericTextField text={formState.schema} textLegit={evalState.schema.correct} setFormState={setFormState} type={1} />} 
              btnName={"Schema"} 
              setFormState={setFormState} 
              correct={evalState.schema.correct} 
            />
            <DialogBtn 
              textField={<GenericTextField text={formState.db} textLegit={evalState.db.correct} setFormState={setFormState} type={0} />} 
              btnName={"Database"} 
              setFormState={setFormState} 
              correct={evalState.db.correct}
            />
          </Grid>
          <ExampleSelectButton 
            setFormState={setFormState} 
            setFocusState={setFocusState} 
            ref={textEditorRef} 
          />
          <Schemabuttons 
            ref={textEditorRef} 
            schema={formState.schema} 
            setFocusState={setFocusState} 
          />
        </Grid>
        <Grid item xs={12} md={8} lg={8}>
          <CodeEditor 
            ref={textEditorRef} 
            query={formState.query}
            schema={formState.schema} 
            setFormState={setFormState} 
            focusState={focusState} 
            setFocusState={setFocusState} 
            pfin={evalState.query.pfin} 
            pinf={evalState.query.pinf}
            f1 = {evalState.query.f1}
            msg1 = {evalState.query.msg1}
          />
          { evalState.schema.correct && evalState.query.correct && evalState.db.correct &&
            <div>
              <Result 
                fv={evalState.query.fv}
                query={formState.query}
                results={evalState.db.result} 
                quickresult={evalState.db.quickresult} 
              />
            </div>
          }
        </Grid>
        <Grid item md={0} lg={1}></Grid>
      </Grid>
    </div>
  );
}