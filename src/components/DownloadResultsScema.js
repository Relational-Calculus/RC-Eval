import ReactVirtualizedTable from "./DatabaseTable";
import { createData, fv_to_columns } from '../utils'
import { FixedHeaderContent } from "react-virtuoso";
import { TextField } from "@mui/material";



export default function JStable2latex(fv, result) {
    const header = fv.fv;
    const headerLength = header.length
    const rows = fv.result; 
    var latexTableBegining = ["\\begin{table}[]","\\centering","\\begin{tabular}","{|","\\hline"];  //[3] = amount of free variables, [5] = free variables
    const latexTableEnd = ["\\end{tabular}", "\\caption{}", "\\label{tab:my-table}", "\\end{table}"]
    //Add number of rows
    for (let i = 0; i < headerLength; i++) {
        latexTableBegining[3] += "l|"
    }
    latexTableBegining[3] += "}"
    
    //Add header
    for (let i = 0; i < headerLength; i++) {
        latexTableBegining.push("\\textbf{"+header[i]+"}")
        latexTableBegining.push("&") 
    }
    latexTableBegining.pop()
    latexTableBegining.push("\\\\ \\hline")

    for (let i = 0; i < rows.length; i+=headerLength) {
        for (let j = 0; j < headerLength; j++) {
                latexTableBegining.push(rows[i+j])
                latexTableBegining.push("&")
        }
    latexTableBegining.pop()
    latexTableBegining.push("\\\\ \\hline")
        
    }

    const latexTable = latexTableBegining.concat(latexTableEnd)
    const latexJoined = latexTable.join(' ') 
    // const latexJoined = latexTable.join("") 
    //console.log(fv)
    //console.log(header)
    //console.log(result)
    console.log(latexJoined)

    return (
        <div>
        {/* <ThemeProvider theme={theme}> */}
          <TextField
            multiline
            fullWidth
            variant="outlined"
            id="outlined-required"
            label="Latex"
            value={latexJoined}
            minRows={10}
            maxRows={10}
            InputProps={{ style: { minHeight: '40vh',
                                   fontSize: 14, align: 'top' } }}
          />
          {/* </ThemeProvider> */}
    </div>
    );
}
