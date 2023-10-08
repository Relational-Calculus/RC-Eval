import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';

export default function EvalButton ({ handleEval }) {
  return (
    <Button
      variant="contained"
      size="large"
      sx={{
        width: '100%'
      }}
      onClick={handleEval}
    >
      <Box pt={1}>
        <AccessibleForwardIcon color="blue" />
      </Box>
    </Button>
  );
}