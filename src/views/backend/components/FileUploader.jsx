import React from "react";
import { MuiFileInput } from "mui-file-input";

function FileUploader() {
  const [file, setFile] = React.useState(null);

  const handleChange = (newFile) => {
    setFile(newFile);
  };

  return <MuiFileInput value={file} onChange={handleChange} />;
}

export default FileUploader;
