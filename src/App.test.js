import React from "react";

const { render } = require("@testing-library/react");

const { App } = require("./App");

test("renders page", () => {
  render(<App />);
});
