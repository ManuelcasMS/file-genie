import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

import styles from "./styles/file.module.scss";
import { API_HOST_URL } from "./util/constants";

const fileTypes = ["JPEG", "CSV", "PDF"];

export default function FileUpload() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [files, setFiles] = useState<File[]>([]);
  const handleChange = (file: File[]) => {
    setFiles(file);
    console.log(file);
  };

  
   const uploadFile = async () =>  {
    const formData  = new FormData();
    const input_file = document.querySelector('input[type="file"]')

    Array.from(input_file?.files).forEach((f: any) => {
        formData.append('image[]', f)
    })
        
    const response = await fetch(`${API_HOST_URL}/storage/container/file-genie/upload`, {
      method: 'POST',
      body: formData
    });

    console.log(response);
  }


  return (
    <div className={styles.upload}>
      <h1>Drag & Drop Files</h1>
      <FileUploader
        multiple={true}
        handleChange={handleChange}
        name="uploaded_files"
        types={fileTypes}
      />
        <button onClick={uploadFile}>Upload</button>
    </div>
  );
}