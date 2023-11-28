import { Padding } from "@mui/icons-material";
import { Typography } from "@mui/material"

const buttonExamples = {
    '∃': {
        operatorName: 'Exists',
        example:  '∃ a, b. T()\nEXISTS a, b. T()'
    },
    '∀': {
        operatorName: 'For All',
        example:  '∀ a, b. T()\nFORALL a, b. T()'
    },
    '∧': {
        operatorName: 'And',
        example:  '∃ a, b. T()\nEXISTS a, b. T()'
    },
    '∨': {
        operatorName: 'Or',
        example:  '∃ a, b. T()\nEXISTS a, b. T()'
    },
    '⇒': {
        operatorName: 'Implies',
        example:  '∃ a, b. T()\nEXISTS a, b. T()'
    },
    '¬': {
        operatorName: 'Not',
        example:  '∃ a, b. T()\nEXISTS a, b. T()'
    },
    '=': {
        operatorName: 'Equals',
        example:  '∃ a, b. T()\nEXISTS a, b. T()'
    },
}

export default function PopoverPaper({ content }) {
    const name = buttonExamples[content].operatorName;
    const example = buttonExamples[content].example;

    return (
        <>
            <div class="arrow-up" style={{
                width: 0,
                height: 0,
                margin: "0 auto",
                borderLeft: "10px solid transparent",
                borderRight: "10px solid transparent",
                borderBottom: "10px solid gray"
            }}>
            </div>
            <Typography sx={{
                backgroundColor: "gray", 
                p: "5px",
                borderTopLeftRadius: "5px",
                borderTopRightRadius: "5px"
                }}>
                {name}
            </Typography>
            <Typography paragraph sx={{ 
                p: 2, backgroundColor: "white", 
                textAlign: "left", 
                border: "2px solid gray", 
                borderBottomLeftRadius: "5px", 
                borderBottomRightRadius: "5px",
                whiteSpace: "pre-wrap"
                }}>
                {example}
            </Typography>
        </>
    )
}