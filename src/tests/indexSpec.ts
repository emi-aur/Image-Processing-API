import supertest from "supertest";
import app from "../index";
import { processImage } from "../modules/imageProcessor";  
import fs from "fs";                                        
import path from "path";  

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



describe("Image Processing Function", () => {
  
  it("should successfully process an image", async () => {
    const testFilename = "icelandwaterfall.jpg";
    const testWidth = 250;
    const testHeight = 250;

    const outputPath = await processImage(testFilename, testWidth, testHeight);

    expect(outputPath).toBeDefined();
    expect(typeof outputPath).toBe("string");
    expect(fs.existsSync(outputPath)).toBe(true);
  });

  it("should not throw an error for valid inputs", async () => {
    const testFilename = "palmtunnel.jpg";
    const testWidth = 150;
    const testHeight = 150;

    await expectAsync(
      processImage(testFilename, testWidth, testHeight)
    ).toBeResolved();
  });

  it("should throw an error for non-existent file", async () => {
    const testFilename = "doesnotexist.jpg";
    const testWidth = 200;
    const testHeight = 200;

    await expectAsync(
      processImage(testFilename, testWidth, testHeight)
    ).toBeRejectedWithError("Original image not found");
  });

  it("should use cached image on second call", async () => {
    const testFilename = "santamonica.jpg";
    const testWidth = 300;
    const testHeight = 300;

    const outputPath1 = await processImage(testFilename, testWidth, testHeight);
    const firstCallTime = fs.statSync(outputPath1).mtime;

    await new Promise(resolve => setTimeout(resolve, 100));

    const outputPath2 = await processImage(testFilename, testWidth, testHeight);
    const secondCallTime = fs.statSync(outputPath2).mtime;

    expect(outputPath1).toBe(outputPath2);
    expect(firstCallTime).toEqual(secondCallTime);
  });

  it("should create image with correct dimensions", async () => {
    const testFilename = "icelandwaterfall.jpg";
    const testWidth = 100;
    const testHeight = 100;

    const outputPath = await processImage(testFilename, testWidth, testHeight);

    const sharp = require("sharp");
    const metadata = await sharp(outputPath).metadata();

    expect(metadata.width).toBe(testWidth);
    expect(metadata.height).toBe(testHeight);
  });

});
