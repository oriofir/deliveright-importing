module.exports = {
  projects: [
    {
      displayName: "Server tests",
      testEnvironment: "node",
      testMatch: ["<rootDir>/test/server.test.js"],
      maxWorkers: 1,
    },
    {
      displayName: "Client tests",
      testEnvironment: "jsdom",
      roots: ["<rootDir>/src"],
      testMatch: ["<rootDir>/src/App.test.js"],
      moduleNameMapper: {
        "\\.(css|less)$": "<rootDir>/test/styleMock.js",
      },
    },
  ],
  testPathIgnorePatterns: ["/node_modules/", "/build/"],

  moduleFileExtensions: ["js", "jsx", "json", "node"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
    "\\.(css|less)$": "jest-transform-stub",
  },
};
