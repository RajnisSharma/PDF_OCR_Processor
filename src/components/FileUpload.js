import React from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload = ({ onUpload }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'application/pdf',
    multiple: true,
    onDrop: acceptedFiles => onUpload(acceptedFiles)
  });

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      <div className="dropzone-content">
        {isDragActive ? (
          <p>Drop PDF files here...</p>
        ) : (
          <>
            <p>Drag & drop PDF files here</p>
            <p className="small">or click to browse</p>
            <p className="small">(Supports multiple files)</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;