import supertest from "supertest";
import app from "../index";

const request = supertest(app);

describe("Image API Endpoint", () => {
  it("should return 200 for valid request", async () => {
    const response = await request
      .get("/api/images")
      .query({ filename: "icelandwaterfall.jpg", width: 200, height: 200 });

    console.log("Status:", response.status);
    console.log("Body:", response.text);

    expect(response.status).toBe(200);
  });
});

describe("GET /api/images", () => {
  it("should return resized image for valid parameters", async () => {
    const response = await request
      .get("/api/images")
      .query({ filename: "icelandwaterfall.jpg", width: 100, height: 100 });
    expect(response.status).toBe(200);

    // Zweiter Request (sollte aus Cache kommen)
    const response2 = await request
      .get("/api/images")
      .query({ filename: "palmtunnel.jpg", width: 300, height: 300 });

    expect(response2.status).toBe(200);
  });

  it("should return 404 for non-existent file", async () => {
    const response = await request
      .get("/api/images")
      .query({ filename: "doesnotexist.jpg", width: 200, height: 200 });

    expect(response.status).toBe(404);
  });
});
