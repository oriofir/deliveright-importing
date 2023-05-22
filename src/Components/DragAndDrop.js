import React, { useState } from "react";

const dragAndDrop = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [jsonData, setJsonData] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const csvData = reader.result;
      const jsonData = convertCSVtoJSON(csvData);
      setJsonData(jsonData);
    };

    reader.readAsText(file);
  };

  const convertCSVtoJSON = (csvData) => {
    const newLine = csvData.split("\n");
    const rows = [];

    const headers = newLine[0].split(",");
    for (let i = 1; i < newLine.length; i++) {
      const obj = {};
      const currentLine = newLine[i].split(",");

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentLine[j];
      }

      rows.push(obj);
    }

    return JSON.stringify(rows, null, 2);
  };

  return (
    <div className="dragBox">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="dottedBox"
      >
        Drop CSV file here
      </div>

      {jsonData && (
        <div className="jsonData">
          <h3>JSON Output:</h3>
          <pre>{jsonData}</pre>
        </div>
      )}
    </div>
  );
};

export default dragAndDrop;
