import React from "react";
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RcEval from './RcEval';
import Help from "./Help";
import About from "./About";
import NavBar from "./components/NavBar";

const lightTheme = createTheme({
  palette: {
    contrastThreshold: 4.5,
    mode: 'light',
    primary: {
      main: '#231426', 
    },
    secondary: {
      main: '#345254'
    },
    text: {
      secondary: '#F3E283'
    },
    info: {
      main: '#F3E283',
      secondary: '#3393FF'
    }
  },
  typography: {
    button: {
      textTransform: 'none'
    }
  }
});

function App() {
  return (
    // <RcEval />
    <ThemeProvider theme={lightTheme}>
      <Box>
        <BrowserRouter basename="/rc-eval">
          <NavBar />
          <Routes>
            <Route path="/" element={<RcEval />} />
            <Route path="/help" element={<Help />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;