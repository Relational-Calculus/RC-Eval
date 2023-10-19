import React, { useState, useEffect, useRef } from "react";
import { useCodeMirror } from '@uiw/react-codemirror';


const placeholderStr = "Write Your Query Here\n\nTry using one of the examples to get started.\n"
// Define the extensions outside the component for the best performance.
// If you need dynamic extensions, use React.useMemo to minimize reference changes
// which cause costly re-renders.
// const extensions = [javascript()];

export default function CodeEditor({ query, setFormState }) {

  const operators = ['∃', '∀', '=', '∧', '∨', '⇒', '¬'];

  const [localQuery, setLocalQuery] = useState("");
  
  const onChange = (value) => {
    setLocalQuery(value);
  };

  useEffect(() => {
    setLocalQuery(query);
  }, [query, setLocalQuery]);

  useEffect(() => {
    setFormState({ type: 'setQuery', query: localQuery });
  }, [localQuery]);


  const editor = useRef();
  const { view, setContainer } = useCodeMirror({
    container: editor.current,
    placeholder: placeholderStr,
    onChange: onChange,
    minHeight: "200px",
    theme: 'light', 
    autoFocus: true,
    basicSetup: true,
    value: localQuery
  });

  useEffect(() => {
    if (editor.current) {
      setContainer(editor.current);
    }
  }, [editor.current]);

  const setIcon = (icon) => {
    const cursorPosFrom = view.state.selection.main.from;
    const cursorPosTo = view.state.selection.main.to;
    setLocalQuery(localQuery.slice(0, cursorPosFrom) + icon + localQuery.slice(cursorPosTo));
    setFormState({type: "setQuery", query: localQuery});

    const timer = setInterval(() => {
      view.focus();
      view.dispatch({
        selection: {anchor: cursorPosFrom+1}
      })
      if(view.hasFocus) clearInterval(timer);
    }, 50);
  }

  const frameStyle = {
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: "2px",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
  }

  const ButtonframeStyle = {
    backgroundColor: "rgba(96, 86, 91, 0.4)",
    padding: "1em",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
  }

  return(
          <div className="editor-frame" style={frameStyle}>
            <div className="button-frame" style={ButtonframeStyle}>
              {operators.map(op => <button type="button" onClick={() => setIcon(op)}>{op}</button>)}
            </div>
            <div ref={editor} />
          </div>
    );
}