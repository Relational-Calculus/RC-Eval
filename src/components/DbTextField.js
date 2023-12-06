import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from "@mui/material";

// dbLegit is evalState.db.correct : Boolean
// if dbLegit = false then mark the textField

export default function DbTextField({ db, dbLegit, setFormState}) {
    const [localDb, setLocalDb] = useState("");

    const handleChange = (event) => {
      setLocalDb(event.target.value);
    };

    const handleBlur = () => {
      setFormState({ type: 'setDb', db: localDb });
    };

    useEffect(() => {
      setLocalDb(db);
    }, [db, setLocalDb]);
  
    // const theme = createTheme({
    //   components: {
    //     // Name of the component
    //     MuiTextField: {
    //       styleOverrides: {
    //         root: ({ ownerState }) => ({
    //           ...(ownerState.variant === 'outlined' &&
    //             ownerState.color === 'primary' && {
    //               backgroundColor: 'pink',
    //               color: 'blue',
    //               outlineColor: 'red', 
    //             }),
    //         }),
    //       },
    //     },
    //   },
    // });
  
    return (
/*       <Box
      component="form"
      sx={{
      '& .MuiTextField-root': { width: '100%' },
      }}
      noValidate
      autoComplete="off"
     > */
        <div>
          <TextField
            multiline
            fullWidth
            variant="outlined"
            id="outlined-required"
            label="Db"
            value={localDb}
            onChange={handleChange}
            onBlur={handleBlur}
            minRows={10}
            maxRows={10}
            InputProps={{ style: { minHeight: '40vh',
                                   fontSize: 14, align: 'top' } }}
          />
    </div>
    // </Box>
    );
  } 
