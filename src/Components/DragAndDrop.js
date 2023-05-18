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
    const lines = csvData.split("\n");
    const result = [];

    const headers = lines[0].split(",");
    for (let i = 1; i < lines.length; i++) {
      const obj = {
        PO_NUMBER: "<vendor po #>",
        FREIGHT_TRACKING: "[Optional] - e.g: FedEx tracking",
        SO_NUMBER: "[OPTIONAL] - Sales Order number",
        FIRST_NAME: "Customer first name",
        LAST_NAME: "Customer last name",
        ADDRESS1: "Delivery address",
        ADDRESS2: "Optional",
        CITY: "Required",
        STATE: "Required",
        ZIP: "Required",
        PHONE1: "Required",
        PHONE2: "Optional",
        EMAIL: "Optional",
        ITEM_SKU: "Required",
        ITEM_SERIAL_NUMBER: "[optional] Item's serial number",
        ITEM_DESCRIPTION: "Required",
        ITEM_CATEGORY: "[optional] - Desk, Chair, Sofa, etc.",
        WEIGHT: "[Required] - weight per item",
        CUBE: "[Optional] - cube per item",
        LENGTH: "[optional - item length]",
        WIDTH: "[optional - item width]",
        HEIGHT: "[optional - item heigh]",
        COMMODITY_TYPE: "optional - cg/uph",
        RETAIL_VALUE: "Optional - retailer value per item",
        INSURANCE_COVERAGE_AMOUNT:
          "Optional - amount of insurance coverage to be applied on this line item (if quantity >1, this amount will applied on each item)",
        QUANTITY: "Optional - total quantity",
        LINKS:
          "[Optional. Example: https://mysite.com/image1,  https://mysite.com/image2, https://mysite.com/image3",
        VENDOR: "The manufacturer/vendor of the item",
        NOTES: "[optional] customer service notes",
        DRIVER_NOTES: "[optional] driver notes",
        SERVICE_LEVEL:
          "Blanket Wrap [use: blnk], White Glove [wg], Room of Choice + Assembly [rocpa], Room of choice + Debris [rocp], Room of Choice [roc], Threshold [thr], Curb [curb], Parcel [prcl], Unattended [unattended],  Will Call [willcall], B2B [b2b], Blanket Wrap [blnk], Express [exp]",
        PICKUP_ADDRESS1: "[Optional, empty=>FOB]",
        PICKUP_ADDRESS2: "",
        PICKUP_CITY: "[Optional if FOB]",
        PICKUP_STATE: "[Optional if FOB]",
        PICKUP_ZIP: "[Optional if FOB]",
        PICKUP_COMPANY: "[Optional if FOB]",
        PICKUP_CONTACT_NAME: "[Optional if FOB]",
        PICKUP_CONTACT_PHONE: "[Optional if FOB]",
        PICKUP_CONTACT_EMAIL: "[Optional if FOB]",
        STOP_TYPE: "1-delivery (default), 2-return [empty default to delivery]",
        MASK_CUSTOMER_INFORMATION:
          "0  / empty (default), 1- hide customer information from the tracking page",
      };
      const currentLine = lines[i].split(",");

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentLine[j];
      }

      result.push(obj);
    }

    return JSON.stringify(result, null, 2);
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

      {jsonData && (
        <div>
          <h3>JSON Output:</h3>
          <pre>{jsonData}</pre>
        </div>
      )}
    </div>
  );
};

export default dragAndDrop;
