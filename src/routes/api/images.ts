import express from "express";
import { processImage } from "../../modules/imageProcessor";

const images = express.Router();

images.get("/", async (req: express.Request, res: express.Response) => {
  const filename = req.query.filename as string;
  const widthParam = req.query.width as string;
  const heightParam = req.query.width as string;

  if (!filename) {
    return res.status(400).send("Filename is required");
  }
  // Check if filename has a valid extension
  if (
    !filename.includes(".") ||
    (!filename.endsWith(".jpg") &&
      !filename.endsWith(".jpeg") &&
      !filename.endsWith(".png"))
  ) {
    return res
      .status(400)
      .send(
        "Invalid filename. Please provide a valid image file (jpg, jpeg, png)",
      );
  }
  // Validate width parameter
  if (!widthParam) {
    return res.status(400).send("Width is required");
  }

  const width = parseInt(widthParam, 10);

  // Check if width is a valid number
  if (isNaN(width)) {
    return res.status(400).send("Invalid width. Please provide a valid number");
  }

  // Check if width is positive
  if (width <= 0) {
    return res.status(400).send("Width must be a positive number");
  }

  // Validate height parameter
  if (!heightParam) {
    return res.status(400).send("Height is required");
  }

  const height = parseInt(heightParam, 10);

  // Check if height is a valid number
  if (isNaN(height)) {
    return res
      .status(400)
      .send("Invalid height. Please provide a valid number");
  }

  // Check if height is positive
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
