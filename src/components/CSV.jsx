import React from 'react';

const FileUploader = ({ onFileUpload }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const csvData = event.target.result;
      const jsonData = convertCSVtoJSON(csvData);
      onFileUpload(jsonData);
    };

    reader.readAsText(file);
  };

  const convertCSVtoJSON = (csvData) => {
    return convertCSVtoJSONLogic(csvData)
  }

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
    </div>
  );
};

export default FileUploader;