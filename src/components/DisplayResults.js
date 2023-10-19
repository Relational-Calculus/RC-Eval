import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ReactVirtualizedTable from './DatabaseTable'
import infinity from './inf.svg'


export default function Result({fv, results, quickresult}) {

    /* const regEx = /\w+/g
    console.log(results)
    let matchedResults = results.match(regEx)
    console.log(matchedResults) */
    if (quickresult == "INF") {
   /*      return (
            <Box
                component="form"
                sx={{
                '& .MuiTextField-root': { width: '100%' },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    multiline
                    id="outlined-read-only-input"
                    label="Result"
                    value={"∞"}
                    minRows={10}
                    maxRows={10}
                    InputProps={{ style: { minHeight: '40vh',
                                     fontSize: 14 } }}
                  />
                </div>
              </Box>
          ); */
          return (
          <div>
            <img style={{ width: 500, height: 600 }} src={infinity} alt="inf" />;
            </div>
          );
          } 
    else if (quickresult == "()") {
            return (
                <Box
                    component="form"
                    sx={{
                    '& .MuiTextField-root': { width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <div>
                      <TextField
                        multiline
                        id="outlined-read-only-input"
                        label="Result"
                        value={"True"}
                        minRows={10}
                        maxRows={10}
                        InputProps={{ style: { minHeight: '40vh',
                                         fontSize: 14 } }}
                      />
                    </div>
                  </Box>
              );
              }
    else if (quickresult == "") {
                return (
                    <Box
                        component="form"
                        sx={{
                        '& .MuiTextField-root': { width: '100%' },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <div>
                          <TextField
                            multiline
                            id="outlined-read-only-input"
                            label="Result"
                            value={"No results"}
                            minRows={10}
                            maxRows={10}
                            InputProps={{ style: { minHeight: '40vh',
                                             fontSize: 14 } }}
                          />
                        </div>
                      </Box>
                  );
                  }
    else {
        return (
            ReactVirtualizedTable({fv, results})
        )
    } 
}