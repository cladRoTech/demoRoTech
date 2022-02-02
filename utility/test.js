const request = require("supertest")("http://localhost:8080/api");
const expect = require("chai").expect;

describe("GET /reports/subscription/606c2c20a04cc373dad1f676", function () {
  it("return one report from reconcilian report", async function () {
    const response = await request.get("/reports/subscription/606c2c20a04cc373dad1f676");

    expect(response.status).to.eql(200);
    expect(response.body.data.length).to.eql(30);
  });
});