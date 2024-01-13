// import { useState } from 'react';
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

export default function InputFileUpload({type, setFormState}) {
  // const [selectedFile, setSelectedFile] = useState();

  const typeExt = type === 'schema' ? '.sig' : '.db';

  const fileHandler = (event) => {
    const file = event.target.files[0]
    let reader = new FileReader();

    const filenameLength = file.name.length;
    const fileExt = (filenameLength < typeExt.length) ? '' : file.name.substring(file.name.length - typeExt.length);

    if(fileExt !== typeExt) {
        alert("The uploaded file has to be a database file\n\nRequired extention: .db");
        return;
    }

    reader.onload = (e) => {
        const file = e.target.result;
        if (type === 'database') {
          setFormState({ type: 'setDb', db: file });
        } else {
          setFormState({ type: 'setSchema', schema: file });
        }
    };
 
    reader.onerror = (e) => alert(e.target.error.name);

    reader.readAsText(file);

  };


  return (
    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
      Upload file
      <VisuallyHiddenInput onChange={fileHandler} type='file' />
    </Button>
  );
}
