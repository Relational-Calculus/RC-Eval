import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload() {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false); 

  const changeHandler = (event) => {
    const file = event.target.files[0]
    let reader = new FileReader();

    if(file.type.substring(0,5)) {
        alert("You have uploaded a image");
        return;
    }
    console.log(file)

    reader.onload = (e) => {
        const file = e.target.result;
 
        // This is a regular expression to identify carriage 
        // Returns and line breaks
        const lines = file.split(/\r\n|\n/);
        setSelectedFile(lines.join('\n'));
 
    };
 
    reader.onerror = (e) => alert(e.target.error.name);

    reader.readAsText(file); 
    

  };

  console.log(selectedFile)


  return (
    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
      Upload file
      <VisuallyHiddenInput onChange={changeHandler} type="file" />
    </Button>
  );
}
