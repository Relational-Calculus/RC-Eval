import React from "react";
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RcEval from './RcEval';

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
      <RcEval />
    // <ThemeProvider theme={theme}>
    //   <Box>
    //     {/*<BrowserRouter> basename="/explanator2" */}
    //     <BrowserRouter basename="/vis"> 
    //       <Routes>
    //         <Route path="/" element={<RcEval />} />
    //       </Routes>
    //     </BrowserRouter>
    //   </Box>
    // </ThemeProvider>
  );
}

export default App;