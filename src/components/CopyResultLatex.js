import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function CopyResultLatex({ fv, results }) {
    const header = fv;
    const headerLength = header !== null ? header.length : 0;
    const rows = results; 
    const rowsLength = rows !== null ? rows.length : 0;
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

    const handleClick = () => {
        navigator.clipboard.writeText(latexJoined);
    }

    return (
        <div className='tooltip' style={{display: 'flex', justifyContent: 'flex-end'}}>
            <IconButton aria-label="copy" size="large" onClick={handleClick}>
                <ContentCopyIcon fontSize="inherit" />
            </IconButton>
        </div>
    )
}