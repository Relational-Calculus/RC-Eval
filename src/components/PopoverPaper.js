import { Typography } from "@mui/material"

const buttonExamples = {
    '∃': {
        operatorName: 'EXISTS',
        example:  '<span style="color:purple">v</span> ⊨ <b>∃</b>x. <span style="color:green">φ</span> ⟺ <span style="color:purple">v</span>(x↦<span style="color:blue">c</span>) ⊨ <span style="color:green">φ</span> for some <span style="color:blue">c</span> ∈ 𝔻<br />∃ a, b. T()'
    },
    '∀': {
        operatorName: 'FORALL',
        example:  '<span style="color:purple">v</span> ⊨ <b>∀</b>x. <span style="color:green">φ</span> ⟺ <span style="color:purple">v</span>(x↦<span style="color:blue">c</span>) ⊨ <span style="color:green">φ</span> for all <span style="color:blue">c</span> ∈ 𝔻<br/>∀ a, b. T()'
    },
    '∧': {
        operatorName: 'AND',
        example:  '<span style="color:purple">v</span> ⊨ <span style="color:green">φ</span> <b>∧</b> <span style="color:green">ψ</span> ⟺ <span style="color:purple">v</span> ⊨ <span style="color:green">φ</span> and <span style="color:purple">v</span> ⊨ <span style="color:green">ψ</span><br />T() ∧ P()'
    },
    '∨': {
        operatorName: 'OR',
        example:  '<span style="color:purple">v</span> ⊨ <span style="color:green">φ</span> <b>∨</b> <span style="color:green">ψ</span> ⟺ <span style="color:purple">v</span> ⊨ <span style="color:green">φ</span> or <span style="color:purple">v</span> ⊨ <span style="color:green">ψ</span><br />T() ∨ P()'
    },
    '⇒': {
        operatorName: 'IMPLIES',
        example:  '<span style="color:green">φ</span> <strong>⇒</strong> <span style="color:green">ψ</span> := (¬<span style="color:green">φ</span>) ∨ <span style="color:green">ψ</span><br />EKS. på implies'
    },
    '¬': {
        operatorName: 'NOT',
        example:  '<span style="color:purple">v</span> ⊨ <b>¬</b> <span style="color:green">φ</span> ⟺ <span style="color:purple">v</span> ⊭ <span style="color:green">φ</span><br />∃ a. T(a, b) ∧ P(b, c)'
    },
    '=': {
        operatorName: 'EQUALS',
        example:  '<span style="color:purple">v</span> ⊨ <span style="color:#00aadd">t1</span> ≈ <span style="color:#00aadd">t2</span> ⟺ <span style="color:purple">v</span>(<span style="color:#00aadd">t1</span>) <b>=</b> <span style="color:purple">v</span>(<span style="color:#00aadd">t1</span>)<br />∃ a, b. T(a, b, c) ∧ a=10'
    },
    '<': {
        operatorName: 'LESS THAN',
        example:  '<span style="color:purple">v</span> ⊨ <span style="color:#00aadd">t1</span> ≈ <span style="color:#00aadd">t2</span> ⟺ <span style="color:purple">v</span>(<span style="color:#00aadd">t1</span>) <b>=</b> <span style="color:purple">v</span>(<span style="color:#00aadd">t1</span>)<br />∃ a, b. T(a, b, c) ∧ a=10'
    },
    '>': {
        operatorName: 'GREATER THAN',
        example:  '<span style="color:purple">v</span> ⊨ <span style="color:#00aadd">t1</span> ≈ <span style="color:#00aadd">t2</span> ⟺ <span style="color:purple">v</span>(<span style="color:#00aadd">t1</span>) <b>=</b> <span style="color:purple">v</span>(<span style="color:#00aadd">t1</span>)<br />∃ a, b. T(a, b, c) ∧ a=10'
    },
    'AVG': {
        operatorName: 'AVERAGE',
        example:  'avg_speed <- <b>AVG</b> speed PC(_, speed, _, _, _)'
    },
    'MAX': {
        operatorName: 'MAXIUMUM',
        example:  'max_speed <- MAX speed PC(_, speed, _, _, price) AND price < 500'
    },
    'MIN': {
        operatorName: 'MINIMUM',
        example:  'min_speed <- <b>MIN</b> speed; ram PC(_, speed, ram, _, _)'
    },
    'CNT': {
        operatorName: 'COUNT',
        example:  'num_employees <- <b>CNT</b> ssn Employees(ssn, name, lot)'
    },
    'SUM': {
        operatorName: 'SUM',
        example:  'total_price <- <b>SUM</b> price Laptop(2003, _, _, _, _, price) ∨ Printer(3004, _, _, price)'
    },
    'LET': {
        operatorName: 'LET',
        example:  'LET DIS(lecturer, student) =<br />&emsp;teaches(lecturer,"DIS") AND attends(student,"DIS")<br />&emsp;IN DIS(lecturer, student)'
    },
    'IN': {
        operatorName: 'IN',
        example:  'LET DIS(lecturer, student) =<br />&emsp;teaches(lecturer,"DIS") AND attends(student,"DIS")<br />&emsp;IN DIS(lecturer, student)'
    }
}

export default function PopoverPaper({ content }) {
    const name = buttonExamples[content].operatorName;
    const example = buttonExamples[content].example;

    return (
        <div style={{pointerEvents: "auto"}}>
            <div className="arrow-up" style={{
                width: 0,
                height: 0,
                margin: "0 auto",
                borderLeft: "10px solid transparent",
                borderRight: "10px solid transparent",
                borderBottom: "10px solid lightgray"
            }}>
            </div>
            <Typography sx={{
                backgroundColor: "lightgray", 
                p: "5px",
                textAlign: "center", 
                borderTopLeftRadius: "5px",
                borderTopRightRadius: "5px"
                }}>
                {name}
            </Typography>
            <Typography paragraph sx={{ 
                p: 2, backgroundColor: "white", 
                textAlign: "left", 
                border: "2px solid lightgray", 
                borderBottomLeftRadius: "5px", 
                borderBottomRightRadius: "5px"
                }}
                dangerouslySetInnerHTML={{__html: example}}>
            </Typography>
        </div>
    )
}