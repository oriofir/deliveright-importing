import React, { useState } from "react";
import "./App.css";

const DragAndDropCSVApp = () => {
  const [csvData, setCSVData] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const data = reader.result;
      setCSVData(data);
    };

    reader.readAsText(file);
  };

  return (
    <div className="dragBox">
      <div
        className="dottedBox"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        style={{}}
      >
        Drop CSV file here
      </div>

      {csvData && (
        <div>
          <h3>CSV Data:</h3>
          <pre>{csvData}</pre>
        </div>
      )}
    </div>
  );
};

export default DragAndDropCSVApp;
