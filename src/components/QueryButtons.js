import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';

export default function OpperatorButton ({query, setFormState, icon, cursorPosition}) {

    const [localQuery, setLocalQuery] = useState("");

    const [localCursor, setLocalCursor] = useState("");


    const onClick= (event) => {
        setLocalQuery(localQuery.slice(0, cursorPosition) + icon + localQuery.slice(cursorPosition));
        setLocalCursor(cursorPosition+icon.length)
        setFormState({type: "setQuery", query: localQuery})
        setFormState({type: "setCursor", cursor: localCursor})
      }

      useEffect(() => {
        setLocalQuery(query);
      }, [query, setLocalQuery]);


    return (
        <Button variant="outlined" style={{size:"small", width:"5%"}}
        onClick={onClick}
        >
        {icon}
        </Button>
      );

      
     }
