import React, { useState } from "react";
import Papa from "papaparse";

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
    const { data, meta } = Papa.parse(csvData, { header: true });

    if (!data.length) {
      // Handle empty CSV file
      return "No data found in the CSV file.";
    }

    const templateHeaders = [
      "PO_NUMBER",
      "FREIGHT_TRACKING",
      "SO_NUMBER",
      "FIRST_NAME",
      "LAST_NAME",
      "ADDRESS1",
      "ADDRESS2",
      "CITY",
      "STATE",
      "ZIP",
      "PHONE1",
      "PHONE2",
      "EMAIL",
      "ITEM_SKU",
      "ITEM_SERIAL_NUMBER",
      "ITEM_DESCRIPTION",
      "ITEM_CATEGORY",
      "WEIGHT",
      "CUBE",
      "LENGTH",
      "WIDTH",
      "HEIGHT",
      "COMMODITY_TYPE",
      "RETAIL_VALUE",
      "INSURANCE_COVERAGE_AMOUNT",
      "QUANTITY",
      "LINKS",
      "VENDOR",
      "NOTES",
      "DRIVER_NOTES",
      "SERVICE_LEVEL",
      "PICKUP_ADDRESS1",
      "PICKUP_ADDRESS2",
      "PICKUP_CITY",
      "PICKUP_STATE",
      "PICKUP_ZIP",
      "PICKUP_COMPANY",
      "PICKUP_CONTACT_NAME",
      "PICKUP_CONTACT_PHONE",
      "PICKUP_CONTACT_EMAIL",
      "STOP_TYPE",
      "MASK_CUSTOMER_INFORMATION",
    ];

    const mappedData = data.map((row) => {
      const mappedRow = {};

      templateHeaders.forEach((header) => {
        mappedRow[header] = row[header] || "";
      });

      return mappedRow;
    });

    return JSON.stringify(mappedData, null, 2);
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
