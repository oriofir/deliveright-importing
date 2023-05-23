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
        ADDRESS1: null,
        ADDRESS2: null,
        CITY: null,
        STATE: null,
        ZIP: null,
        PHONE1: null,
        PHONE2: null,
        EMAIL: null,
        ITEM_SKU: null,
        ITEM_SERIAL_NUMBER: null,
        ITEM_DESCRIPTION: null,
        ITEM_CATEGORY: null,
        WEIGHT: null,
        CUBE: null,
        LENGTH: null,
        WIDTH: null,
        HEIGHT: null,
        COMMODITY_TYPE: null,
        RETAIL_VALUE: null,
        INSURANCE_COVERAGE_AMOUNT: null,
        QUANTITY: null,
        LINKS: null,
        VENDOR: null,
        NOTES: null,
        DRIVER_NOTES: null,
        SERVICE_LEVEL: null,
        PICKUP_ADDRESS1: null,
        PICKUP_ADDRESS2: null,
        PICKUP_CITY: null,
        PICKUP_STATE: null,
        PICKUP_ZIP: null,
        PICKUP_COMPANY: null,
        PICKUP_CONTACT_NAME: null,
        PICKUP_CONTACT_PHONE: null,
        PICKUP_CONTACT_EMAIL: null,
        STOP_TYPE: null,
        MASK_CUSTOMER_INFORMATION: null,
      };

      const headers = data[0];
      const mappedData = data.slice(1).map((row) => {
        const mappedRow = {};

        for (let i = 0; i < row.length; i++) {
          const cellValue = row[i];
          const header = headers[i];

          const matchedKey = Object.keys(template).find((key) =>
            new RegExp(key, "i").test(header)
          );

          if (matchedKey) {
            mappedRow[matchedKey] = cellValue;
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
