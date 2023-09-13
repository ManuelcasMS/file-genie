import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

import styles from "./styles/file.module.scss";
import { API_HOST_URL } from "./util/constants";

const fileTypes = ["JPEG", "CSV", "PDF"];

export default function FileUpload() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [files, setFiles] = useState<File[]>([]);
  const handleChange = (file: File[]) => {
    setFiles([...file]);
  };
  
  const uploadFile = async () =>  {
    const formData  = new FormData();
    if(files.length)
    {
      for(const f of files){
        formData.append('uploaded_files', f)
      }
    }
        
    await fetch(`${API_HOST_URL}/storage/container/myfile/upload`, {
      method: 'POST',
      body: formData
    });
  }

  return (
    <div className={styles.upload}>
      <h1>Drag & Drop Files</h1>
      <FileUploader
        multiple={true}
        handleChange={handleChange}
        name="uploaded_files"
        types={fileTypes}
        classes="target"
      />
        <button onClick={uploadFile}>Upload</button>
    </div>
  );
}