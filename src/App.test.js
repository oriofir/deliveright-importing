import React from "react";
import App from "./App";

const { render } = require("@testing-library/react");

test("renders page", () => {
  render(<App />);
});
