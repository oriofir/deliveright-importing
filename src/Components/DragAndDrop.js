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
        const variationsMapping = {
          "First Name": "FIRST_NAME",
          "Last Name": "LAST_NAME",
          "Phone Number": "PHONE1",
          Phone: "PHONE1",
          "Phone Number 2": "PHONE2",
          "Phone 2": "PHONE2",
          "Address Line 1": "ADDRESS1",
          "Address 1": "ADDRESS1",
          "Ship To Address 1": "ADDRESS1",
          "Street Addess": "ADDRESS1",
          "Address Line 2": "ADDRESS2",
          "Ship To Address 2": "ADDRESS2",
          "Address 2": "ADDRESS2",
          "Ship To City": "CITY",
          "Ship To State": "STATE",
          "Ship To Zip": "ZIP",
          "SKU Number": "ITEM_SKU",
          SKU: "ITEM_SKU",
          "SKU Description": "ITEM_DESCRIPTION",
          "Product Description": "ITEM_DESCRIPTION",
          Description: "ITEM_DESCRIPTION",
          "Product Category": "ITEM_CATEGORY",
        };
        const mappedRow = { ...template };

        for (let i = 0; i < row.length; i++) {
          const cellValue = row[i];
          const header = headers[i];

          let matchedKey = Object.keys(template).find((key) =>
            new RegExp(key, "i").test(header)
          );

          if (!matchedKey) {
            for (const variation in variationsMapping) {
              if (new RegExp(variation, "i").test(header)) {
                matchedKey = variationsMapping[variation];
                break;
              }
            }
          }

          if (matchedKey) {
            mappedRow[matchedKey] = cellValue;
          }

          //   for (const templateKey in template) {
          //     if (new RegExp(templateKey, "i").test(header.toLowerCase())) {
          //       matchedKey = templateKey;
          //       break;
          //     }
          //   }

          //   if (matchedKey) {
          //     mappedRow[matchedKey] = cellValue;
          //   } else {
          //     mappedRow[header] = cellValue;
          //   }

          //   // Handle different name variations
          if (/(first name|given name)/i.test(header)) {
            mappedRow["First Name"] = cellValue;
          } else if (/(last name|surname)/i.test(header)) {
            mappedRow["Last Name"] = cellValue;
          } else if (/(full name|name)/i.test(header)) {
            const [firstName, lastName] = cellValue.split(" ");
            mappedRow["First Name"] = firstName;
            mappedRow["Last Name"] = lastName;
          }
          //     // Handle other keys based on template
          //     const matchedKey = Object.keys(template).find((key) =>
          //       new RegExp(key, "i").test(header)
          //     );

          //     if (matchedKey) {
          //       mappedRow[matchedKey] = cellValue;
          //     }
          //   }
          //   if (/phone/i.test(header)) {
          //     if (/1/i.test(header)) {
          //       mappedRow["PHONE1"] = cellValue;
          //     } else if (/2/i.test(header)) {
          //       mappedRow["PHONE2"] = cellValue;
          //     } else if (/contact/i.test(header)) {
          //       mappedRow["CONTACT_PHONE"] = cellValue;
          //     } else if (/mobile/i.test(header)) {
          //       mappedRow["MOBILE"] = cellValue;
          //     } else if (/tel/i.test(header)) {
          //       mappedRow["TEL"] = cellValue;
          //     } else if (/telephone/i.test(header)) {
          //       mappedRow["TELEPHONE"] = cellValue;
          //     }
          //   }
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
