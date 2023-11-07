import React from "react";
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RcEval from './RcEval';
import Help from "./Help";
import About from "./About";
import NavBar from "./components/NavBar";

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#222222',
    },
    secondary: {
      main: '#fdd835',
    },
  },
});

function App() {
  return (
    // <RcEval />
    <ThemeProvider theme={theme}>
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