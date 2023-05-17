import React, { useState } from "react";

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
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        style={{ width: "300px", height: "300px", border: "2px dashed gray" }}
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
