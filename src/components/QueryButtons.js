import React, { useState, useEffect, useRef } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import { createTheme } from '@mui/material/styles';
import { purple, red } from '@mui/material/colors';
// import { Button as MuiButton } from "@mui/material";
import { styled } from "@mui/system";



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
