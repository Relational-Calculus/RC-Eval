import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HelpIcon from '@mui/icons-material/Help';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button sx={{ color: "text.secondary" }}>
                <Typography variant="h4" component="div">
                RC-Evaluator <font size={3}> Evaluating Relational Calculus Queries</font>
                </Typography>
              </Button>
            </Link>
          </Typography>
            <Link to="/help" style={{ textDecoration: 'none' }}>
              <Button sx={{ color: "text.secondary" }} startIcon={<HelpIcon />}>
                <Typography variant="button" component="div" >
                  help
                </Typography>
              </Button>
            </Link>
            <Link to="/about" style={{ textDecoration: 'none' }}>
              <Button sx={{ color: "text.secondary" }} startIcon={<InfoIcon />}>
                <Typography variant="button" component="div">
                about
                </Typography>
              </Button>
            </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}