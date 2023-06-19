const request = require("supertest");
const app = require("../server");

describe("Server", () => {
  test("GET / should return status code 200", async () => {
    const response = await request(app).get("*");
    expect(response.statusCode).toBe(200);
  });

  test("POST /upload-csv should return status code 200", async () => {
    const response = await request(app).post("/upload-csv");
    expect(response.statusCode).toBe(200);
  });
});
