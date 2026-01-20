import express from "express";
import { processImage } from "../../modules/imageProcessor";

const VALID_EXTENSIONS = [".jpg", ".jpeg", ".png"];
const IS_NUMERIC = /^\d+$/;

const images = express.Router();

images.get("/", async (req: express.Request, res: express.Response) => {
  const filename = req.query.filename as string;
  const widthParam = req.query.width as string;
  const heightParam = req.query.height as string;

  // Validate filename
  if (!filename) {
    return res.status(400).send("Filename is required");
  }

  if (filename.trim().length === 0) {
    return res.status(400).send("Filename cannot be empty");
  }

  if (!filename.includes(".")) {
    return res
      .status(400)
      .send(
        `Invalid filename: "${filename}". Missing file extension. Example: fjord.jpg`,
      );
  }

  const fileExtension = filename
    .toLowerCase()
    .substring(filename.lastIndexOf("."));
  const fileNameWithoutExt = filename.substring(0, filename.lastIndexOf("."));

  if (fileNameWithoutExt.length === 0) {
    return res
      .status(400)
      .send("Invalid filename. Filename cannot start with a dot");
  }

  if (!VALID_EXTENSIONS.includes(fileExtension)) {
    return res
      .status(400)
      .send(
        `Invalid file extension: "${fileExtension}". Supported formats: jpg, jpeg, png`,
      );
  }
  // Validate width
  if (!widthParam) {
    return res.status(400).send("Width is required");
  }

  if (!IS_NUMERIC.test(widthParam)) {
    return res
      .status(400)
      .send(
        `Invalid width: "${widthParam}". Width must be a valid number (only digits allowed)`,
      );
  }

  const width = parseInt(widthParam, 10);

  if (isNaN(width)) {
    return res.status(400).send("Invalid width. Please provide a valid number");
  }

  if (width <= 0) {
    return res.status(400).send("Width must be a positive number");
  }

  // Validate height
  if (!heightParam) {
    return res.status(400).send("Height is required");
  }

  if (!IS_NUMERIC.test(heightParam)) {
    return res
      .status(400)
      .send(
        `Invalid height: "${heightParam}". Height must be a valid number (only digits allowed)`,
      );
  }

  const height = parseInt(heightParam, 10);

  if (isNaN(height)) {
    return res
      .status(400)
      .send("Invalid height. Please provide a valid number");
  }

  if (height <= 0) {
    return res.status(400).send("Height must be a positive number");
  }

  try {
    const outputPath = await processImage(filename, width, height);
    res.sendFile(outputPath);
  } catch (error) {
    console.error(error);
    if (
      error instanceof Error &&
      error.message === "Original image not found"
    ) {
      return res.status(404).send("original picture not found");
    }
    res.status(500).send(" error resizing image");
  }
});

export default images;
