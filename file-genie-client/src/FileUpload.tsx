import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

import styles from "./styles/file.module.scss";
import { API_HOST_URL } from "./util/constants";
import { Button, Spinner } from "@fluentui/react-components";

const fileTypes = ["JPEG", "CSV", "PDF"];
 export interface IFileUploadProps {
  onUpload: () => void;
 }
export default function FileUpload(props: IFileUploadProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [files, setFiles] = useState<File[]>([]);
  const [saving, setSaving] = useState<boolean>(false);
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
    setSaving(true);
    try {
      await fetch(`${API_HOST_URL}/storage/container/myfiles/upload`, {
        method: 'POST',
        body: formData
      });
    } catch (error) {
      console.log(error); 
    } finally {
      await props.onUpload();
      setSaving(false);
    }
    
  }

  return (
    <div className={styles.upload}>
      {saving ? <Spinner labelPosition="below" label="Uploading..." />: <>
      <h1>Drag & Drop Files</h1>
      <FileUploader
        multiple={true}
        handleChange={handleChange}
        name="uploaded_files"
        types={fileTypes}
        classes="target"
      />
        <Button appearance="primary" onClick={uploadFile} style={{marginTop:"1rem"}}>Upload</Button>
        </>}
    </div>
  );
}