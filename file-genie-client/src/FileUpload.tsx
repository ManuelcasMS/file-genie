/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

import styles from "./styles/file.module.scss";

const fileTypes = ["JPEG", "CSV", "PDF"];

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };
  return (
    <div className={styles.upload}>
      <h1>Drag & Drop Files</h1>
      <FileUploader
        multiple={true}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
      />
      <p>{file ? `File name: ${file[0].name}` : "no files uploaded yet"}</p>
    </div>
  );
}