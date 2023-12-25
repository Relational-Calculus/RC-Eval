import Box from '@mui/material/Box';
import ReactVirtualizedTable from './DatabaseTable'
import AllInclusiveOutlinedIcon from '@mui/icons-material/AllInclusiveOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CopyResultLatex from './CopyResultLatex';

const childDivStyle = {
  height: '250px', 
  fontSize: '200px', 
  position: 'relative',
  m: '0',
  mt: 2,
  p: '0'
}

const iconStyle = {
  position: 'absolute', 
  top: '50%', 
  left: '50%', 
  m: '-125px 0 0 -125px'
}


export default function Result({fv, query, results, quickresult}) {
  const isInf = quickresult === "INF";
  const isTrue = quickresult === ":\ntrue";
  const isFalse = quickresult === "" && fv === null;

  return(
    <div>
      <Box component="div" sx={{ px: 0, mt: 2, border: '1px solid lightgray', borderRadius: '5px' }}>
        {   isInf ? <Box component="div" sx={childDivStyle}> <AllInclusiveOutlinedIcon fontSize='inherit' sx={iconStyle} /> </Box>
          : isTrue ? <Box component="div" sx={childDivStyle}> <CheckOutlinedIcon color='success' fontSize='inherit' sx={iconStyle} /> </Box>
          : isFalse ? <Box component="div" sx={childDivStyle}> <CloseOutlinedIcon color='error' fontSize='inherit' sx={iconStyle} /> </Box>
          : <> { ReactVirtualizedTable({fv, results}) } </> 
        }
      </Box>
        { !(isFalse || isTrue || isInf) && CopyResultLatex({fv, query, results}) }
    </div>
  )
};