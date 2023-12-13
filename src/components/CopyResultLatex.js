import { Button } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from '@mui/material/Tooltip';
import { check_string_for_special_character } from '../utils';

export default function CopyResultLatex({ fv, query, results }) {
    const headerLength = fv !== null ? fv.length : 0;
    const rows = results; 
    const rowsLength = rows !== null ? rows.length : 0;
    const latexQuery = check_string_for_special_character(query);
    var latexTableBegining = ["\\begin{table}[]","\\centering","\\begin{tabular}","{|","\\hline"];  //[3] = amount of free variables, [5] = free variables
    const latexTableEnd = ["\\end{tabular}", "\\caption{}", "\\label{tab:my-table}", "\\end{table}"]

<<<<<<< HEAD
=======
    const header = fv.join(" ")
        .replaceAll(/[_]/g, "\\_")
        .split(" ");

    //Add number of rows
>>>>>>> ad684f3a859f867366d961fc8d7950cb7b7e36fe
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

    for (let i = 0; i < rowsLength; i+=headerLength) {
        for (let j = 0; j < headerLength; j++) {
                latexTableBegining.push(rows[i+j])
                latexTableBegining.push("&")
        }
    latexTableBegining.pop()
    latexTableBegining.push("\\\\ \\hline")
        
    }

    const latexTable = latexTableBegining.concat(latexTableEnd);
    const latexJoined = latexTable.join(' ');

    const handleClickTable = () => {
        navigator.clipboard.writeText(latexJoined);
    }

    const handleClickQuery = () => {
        navigator.clipboard.writeText(latexQuery);
    }

    return (
        <div className='tooltip' style={{display: 'flex', justifyContent: 'flex-end'}}>
            <Tooltip title="Copy Table To LaTeꞳ">
                <Button component="label" color='primary' size='large' onClick={handleClickTable} endIcon={<ContentCopyIcon />}>
                    Table
                </Button>
            </Tooltip>
            <Tooltip title="Copy Query To LaTeꞳ">
                <Button component="label" color='primary' size='large' onClick={handleClickQuery} endIcon={<ContentCopyIcon />}>
                    Query
                </Button>
            </Tooltip>
        </div>
    )
}