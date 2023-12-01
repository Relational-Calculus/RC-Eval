import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// dbLegit is evalState.db.correct : Boolean
// if dbLegit = false then mark the textField

export default function DbTextField({ db, dbLegit, setFormState, color='red'}) {
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
        <div>
        {/* <ThemeProvider theme={theme}> */}
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
            color="text"
            InputProps={{ style: { minHeight: '40vh',
                                   fontSize: 14, align: 'top' } }}
          />
          {/* </ThemeProvider> */}
    </div>
    );
  } 
