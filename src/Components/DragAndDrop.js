import React, { useState } from "react";
import Papa from "papaparse";

const DragAndDrop = () => {
  const [jsonData, setJsonData] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const csvData = reader.result;
      const { data } = Papa.parse(csvData);

      if (!data.length) {
        // Handle empty CSV file
        return "No data found in the CSV file.";
      }

      const template = {
        PO_NUMBER: null,
        FREIGHT_TRACKING: null,
        SO_NUMBER: null,
        FIRST_NAME: null,
        LAST_NAME: null,
        ADDRESS_1: null,
        ADDRESS_2: null,
        CITY: null,
        STATE: null,
        ZIP: null,
        PHONE1: null,
        PHONE2: null,
        EMAIL: null,
        ITEM_SKU: null,
        // ... continue with the rest of the template keys
      };

      const headers = data[0];
      const mappedData = data.slice(1).map((row) => {
        const mappedRow = { ...template };

        for (let i = 0; i < row.length; i++) {
          const cellValue = row[i];
          const header = headers[i];

          for (const key in mappedRow) {
            const regex = new RegExp(key, "i");
            if (regex.test(header)) {
              mappedRow[key] = cellValue;
              break;
            }
          }
        }

        return mappedRow;
      });

      const jsonData = JSON.stringify(mappedData, null, 2);
      setJsonData(jsonData);
    };

    reader.readAsText(file);
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

export default DragAndDrop;
