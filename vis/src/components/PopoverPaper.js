import { Typography } from "@mui/material"

const buttonExamples = {
    '∃': {
        operatorName: 'EXISTS',
        example:  '<span style="color:purple">v</span> ⊨ <b>∃</b>x. <span style="color:green">φ</span> ⟺ <span style="color:purple">v</span>(x↦<span style="color:blue">c</span>) ⊨ <span style="color:green">φ</span> for some <span style="color:blue">c</span> ∈ 𝔻<hr width="100%" size="2"><b>∃</b> a, b. T(a, b, c)'
    },
    '∀': {
        operatorName: 'FORALL',
        example:  '<span style="color:purple">v</span> ⊨ <b>∀</b>x. <span style="color:green">φ</span> ⟺ <span style="color:purple">v</span>(x↦<span style="color:blue">c</span>) ⊨ <span style="color:green">φ</span> for all <span style="color:blue">c</span> ∈ 𝔻<hr width="100%" size="2"><b>∀</b> a, b. T(a, b, c)'
    },
    '∧': {
        operatorName: 'AND',
        example:  '<span style="color:purple">v</span> ⊨ <span style="color:green">φ</span> <b>∧</b> <span style="color:green">ψ</span> ⟺ <span style="color:purple">v</span> ⊨ <span style="color:green">φ</span> and <span style="color:purple">v</span> ⊨ <span style="color:green">ψ</span><hr width="100%" size="2">T(a, b) <b>∧</b> P(b, c)'
    },
    '∨': {
        operatorName: 'OR',
        example:  '<span style="color:purple">v</span> ⊨ <span style="color:green">φ</span> <b>∨</b> <span style="color:green">ψ</span> ⟺ <span style="color:purple">v</span> ⊨ <span style="color:green">φ</span> or <span style="color:purple">v</span> ⊨ <span style="color:green">ψ</span><hr width="100%" size="2">T(a, b) <b>∨</b> P(b, c)'
    },
    '⇒': {
        operatorName: 'IMPLIES',
        example:  '<span style="color:green">φ</span> <strong>⇒</strong> <span style="color:green">ψ</span> := (¬<span style="color:green">φ</span>) ∨ <span style="color:green">ψ</span><hr width="100%" size="2">(∃ <i>lecturer</i>, <i>course</i> . teaches(<i>lecturer</i>, <i>course</i>))<br /> <b>⇒</b> ∃ <i>student</i>. attends(<i>student</i>, <i>course</i>)'
    },
    '¬': {
        operatorName: 'NOT',
        example:  '<span style="color:purple">v</span> ⊨ <b>¬</b> <span style="color:green">φ</span> ⟺ <span style="color:purple">v</span> ⊭ <span style="color:green">φ</span><hr width="100%" size="2">∃ a. T(a, b) ∧ <b>¬</b> b = 10'
    },
    '≈': {
        operatorName: 'EQUALS',
        example:  '<span style="color:purple">v</span> ⊨ <span style="color:#00aadd">t<sub>1</sub></span> ≈ <span style="color:#00aadd">t<sub>2</sub></span> ⟺ <span style="color:purple">v</span>(<span style="color:#00aadd">t<sub>1</sub></span>) <b>≈</b> <span style="color:purple">v</span>(<span style="color:#00aadd">t<sub>2</sub></span>)<hr width="100%" size="2">∃ a, b. T(a, b, c) ∧ a <b>≈</b> 10'
    },
    '<': {
        operatorName: 'LESS THAN',
        example:  '<span style="color:purple">v</span> ⊨ <span style="color:#00aadd">t<sub>1</sub></span> < <span style="color:#00aadd">t<sub>2</sub></span> ⟺ <span style="color:purple">v</span>(<span style="color:#00aadd">t<sub>1</sub></span>) <b><</b> <span style="color:purple">v</span>(<span style="color:#00aadd">t<sub>2</sub></span>)<hr width="100%" size="2">∃ a, b. T(a, b, c) ∧ a <b><</b> 10'
    },
    '>': {
        operatorName: 'GREATER THAN',
        example:  '<span style="color:purple">v</span> ⊨ <span style="color:#00aadd">t<sub>1</sub></span> > <span style="color:#00aadd">t<sub>2</sub></span> ⟺ <span style="color:purple">v</span>(<span style="color:#00aadd">t<sub>1</sub></span>) <b>></b> <span style="color:purple">v</span>(<span style="color:#00aadd">t<sub>2</sub></span>)<hr width="100%" size="2">∃ a, b. T(a, b, c) ∧ a <b>></b> 10'
    },
    'AVG': {
        operatorName: 'AVERAGE',
        example:  `<span style="color:purple">v</span> ⊨ y &larr; <b>AVG</b>(<span style="color:#00aadd">t</span>; <span style="text-decoration:underline; text-underline-offset: -11px;">&#103;</span>) <span style="color:green">φ</span> ⟺ <span style="color:purple">v</span>(y) = <b>AVG</b>(<i>M</i>)<br />
                    &emsp;where <i>M</i> = <span style="font-size:30px">&uplus;</span><sub><span style="text-decoration:underline; text-underline-offset: -12px;">d</span> &isin; &#8517;<sup>|<span style="text-decoration:underline; text-underline-offset: -9px;">z</span>|</sup></sub>{|u(t)| u ⊨ <span style="color:green">φ</span>, where u = <span style="color:purple">v</span>[<span style="text-decoration:underline; text-underline-offset: -11px;">z</span> &rarr; <span style="text-decoration:underline; text-underline-offset: -13px;">d</span>]} and <span style="text-decoration:underline; text-underline-offset: -11px;">z</span> = <i>fv</i>(<span style="color:green">φ</span>)\\<span style="text-decoration:underline; text-underline-offset: -11px;">g</span>
                    <hr width="100%" size="2"><i>avg_speed</i> &larr; <b>AVG</b> <i>speed</i> PC(_, <i>speed</i>, _, _, _)`
    },
    'MED': {
        operatorName: 'MEDIAN',
        example:  `<span style="color:purple">v</span> ⊨ y &larr; <b>MED</b>(<span style="color:#00aadd">t</span>; <span style="text-decoration:underline; text-underline-offset: -11px;">&#103;</span>) <span style="color:green">φ</span> ⟺ <span style="color:purple">v</span>(y) = <b>MED</b>(<i>M</i>)<br />
                    &emsp;where <i>M</i> = <span style="font-size:30px">&uplus;</span><sub><span style="text-decoration:underline; text-underline-offset: -12px;">d</span> &isin; &#8517;<sup>|<span style="text-decoration:underline; text-underline-offset: -9px;">z</span>|</sup></sub>{|u(t)| u ⊨ <span style="color:green">φ</span>, where u = <span style="color:purple">v</span>[<span style="text-decoration:underline; text-underline-offset: -11px;">z</span> &rarr; <span style="text-decoration:underline; text-underline-offset: -13px;">d</span>]} and <span style="text-decoration:underline; text-underline-offset: -11px;">z</span> = <i>fv</i>(<span style="color:green">φ</span>)\\<span style="text-decoration:underline; text-underline-offset: -11px;">g</span>
                    <hr width="100%" size="2"><i>median_speed</i> &larr; <b>MED</b> <i>speed</i> PC(_, <i>speed</i>, _, _, _)`
    },
    'MAX': {
        operatorName: 'MAXIUMUM',
        example:  `<span style="color:purple">v</span> ⊨ y &larr; <b>MAX</b>(<span style="color:#00aadd">t</span>; <span style="text-decoration:underline; text-underline-offset: -11px;">&#103;</span>) <span style="color:green">φ</span> ⟺ <span style="color:purple">v</span>(y) = <b>MAX</b>(<i>M</i>)<br />
                    &emsp;where <i>M</i> = <span style="font-size:30px">&uplus;</span><sub><span style="text-decoration:underline; text-underline-offset: -12px;">d</span> &isin; &#8517;<sup>|<span style="text-decoration:underline; text-underline-offset: -9px;">z</span>|</sup></sub>{|u(t)| u ⊨ <span style="color:green">φ</span>, where u = <span style="color:purple">v</span>[<span style="text-decoration:underline; text-underline-offset: -11px;">z</span> &rarr; <span style="text-decoration:underline; text-underline-offset: -13px;">d</span>]} and <span style="text-decoration:underline; text-underline-offset: -11px;">z</span> = <i>fv</i>(<span style="color:green">φ</span>)\\<span style="text-decoration:underline; text-underline-offset: -11px;">g</span>
                    <hr width="100%" size="2"><i>max_speed</i> &larr; <b>MAX</b> <i>speed</i> PC(_, <i>speed</i>, _, _, <i>price</i>) AND <i>price</i> < 500`
    },
    'MIN': {
        operatorName: 'MINIMUM',
        example:  `<span style="color:purple">v</span> ⊨ y &larr; <b>MIN</b>(<span style="color:#00aadd">t</span>; <span style="text-decoration:underline; text-underline-offset: -11px;">&#103;</span>) <span style="color:green">φ</span> ⟺ <span style="color:purple">v</span>(y) = <b>MIN</b>(<i>M</i>)<br />
                    &emsp;where <i>M</i> = <span style="font-size:30px">&uplus;</span><sub><span style="text-decoration:underline; text-underline-offset: -12px;">d</span> &isin; &#8517;<sup>|<span style="text-decoration:underline; text-underline-offset: -9px;">z</span>|</sup></sub>{|u(t)| u ⊨ <span style="color:green">φ</span>, where u = <span style="color:purple">v</span>[<span style="text-decoration:underline; text-underline-offset: -11px;">z</span> &rarr; <span style="text-decoration:underline; text-underline-offset: -13px;">d</span>]} and <span style="text-decoration:underline; text-underline-offset: -11px;">z</span> = <i>fv</i>(<span style="color:green">φ</span>)\\<span style="text-decoration:underline; text-underline-offset: -11px;">g</span>
                    <hr width="100%" size="2"><i>min_speed</i> &larr; <b>MIN</b> <i>speed</i>; <i>ram</i> PC(_, <i>speed</i>, <i>ram</i>, _, _)`
    },
    'CNT': {
        operatorName: 'COUNT',
        example:  `<span style="color:purple">v</span> ⊨ y &larr; <b>CNT</b>(<span style="color:#00aadd">t</span>; <span style="text-decoration:underline; text-underline-offset: -11px;">&#103;</span>) <span style="color:green">φ</span> ⟺ <span style="color:purple">v</span>(y) = <b>CNT</b>(<i>M</i>)<br />
                    &emsp;where <i>M</i> = <span style="font-size:30px">&uplus;</span><sub><span style="text-decoration:underline; text-underline-offset: -12px;">d</span> &isin; &#8517;<sup>|<span style="text-decoration:underline; text-underline-offset: -9px;">z</span>|</sup></sub>{|u(t)| u ⊨ <span style="color:green">φ</span>, where u = <span style="color:purple">v</span>[<span style="text-decoration:underline; text-underline-offset: -11px;">z</span> &rarr; <span style="text-decoration:underline; text-underline-offset: -13px;">d</span>]} and <span style="text-decoration:underline; text-underline-offset: -11px;">z</span> = <i>fv</i>(<span style="color:green">φ</span>)\\<span style="text-decoration:underline; text-underline-offset: -11px;">g</span>
                    <hr width="100%" size="2"><i>num_employees</i> &larr; <b>CNT</b> <i>ssn</i> Employees(<i>ssn</i>, <i>name</i>, <i>lot</i>)`
    },
    'SUM': {
        operatorName: 'SUM',
        example:  `<span style="color:purple">v</span> ⊨ y &larr; <b>SUM</b>(<span style="color:#00aadd">t</span>; <span style="text-decoration:underline; text-underline-offset: -11px;">&#103;</span>) <span style="color:green">φ</span> ⟺ <span style="color:purple">v</span>(y) = <b>SUM</b>(<i>M</i>)<br />
                    &emsp;where <i>M</i> = <span style="font-size:30px">&uplus;</span><sub><span style="text-decoration:underline; text-underline-offset: -12px;">d</span> &isin; &#8517;<sup>|<span style="text-decoration:underline; text-underline-offset: -9px;">z</span>|</sup></sub>{|u(t)| u ⊨ <span style="color:green">φ</span>, where u = <span style="color:purple">v</span>[<span style="text-decoration:underline; text-underline-offset: -11px;">z</span> &rarr; <span style="text-decoration:underline; text-underline-offset: -13px;">d</span>]} and <span style="text-decoration:underline; text-underline-offset: -11px;">z</span> = <i>fv</i>(<span style="color:green">φ</span>)\\<span style="text-decoration:underline; text-underline-offset: -11px;">g</span>
                    <hr width="100%" size="2"><i>total_price</i> &larr; <b>SUM</b> <i>price</i> Laptop(<i>2003</i>, _, _, _, _, <i>price</i>) ∨ Printer(<i>3004</i>, _, _, <i>price</i>)`
    },
    'LET': {
        operatorName: 'LET',
        example:  `DB, <span style="color:purple">v</span> ⊨ <b>LET</b> P(<span style="text-decoration:underline; text-underline-offset: -11px;">x</span>) = <span style="color:green">φ</span> <b>IN</b> <span style="color:green">ψ</span> ⟺ <br />&emsp;DB(P ⇒ [<span style="color:purple">w</span>(<span style="text-decoration:underline; text-underline-offset: -11px;">x</span>) | DB, <span style="color:purple">w</span> ⊨ <span style="color:green">φ</span>], <span style="color:purple">v</span> ⊨ <span style="color:green">ψ</span>)<hr width="100%" size="2">
        <b>LET</b> DIS(<i>lecturer</i>, <i>student</i>) =<br />&emsp;teaches(<i>lecturer</i>,<i>"DIS"</i>) ∧ attends(<i>student</i>,<i>"DIS"</i>)<br /><b>IN</b> DIS(<i>lecturer</i>, <i>student</i>)`
    },
    'IN': {
        operatorName: 'IN',
        example:  `DB, <span style="color:purple">v</span> ⊨ <b>LET</b> P(<span style="text-decoration:underline; text-underline-offset: -11px;">x</span>) = <span style="color:green">φ</span> <b>IN</b> <span style="color:green">ψ</span> ⟺ <br />&emsp;DB(P ⇒ [<span style="color:purple">w</span>(<span style="text-decoration:underline; text-underline-offset: -11px;">x</span>) | DB, <span style="color:purple">w</span> ⊨ <span style="color:green">φ</span>], <span style="color:purple">v</span> ⊨ <span style="color:green">ψ</span>)<hr width="100%" size="2">
        <b>LET</b> DIS(<i>lecturer</i>, <i>student</i>) =<br />&emsp;teaches(<i>lecturer</i>,<i>"DIS"</i>) ∧ attends(<i>student</i>,<i>"DIS"</i>)<br /><b>IN</b> DIS(<i>lecturer</i>, <i>student</i>)`
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