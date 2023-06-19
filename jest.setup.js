import "@testing-library/jest-dom"; // For DOM-specific assertions

jest.mock("./path/to/mockModule"); // Mocking a module

// Global configuration
jest.setTimeout(5000); // Set a timeout for test execution

process.env.PORT = "3001";
