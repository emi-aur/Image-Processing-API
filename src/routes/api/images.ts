import express from "express";
import { processImage } from "../../modules/imageProcessor";

const images = express.Router();


images.get("/", async (req: express.Request, res: express.Response) => {
  const filename = req.query.filename as string;
  const width = parseInt(req.query.width as string) || 200;
  const height = parseInt(req.query.height as string) || 200;

  if (!filename) {
    return res.status(400).send("Filename is required");
  }

  try {
    const outputPath = await processImage(filename, width, height);
    res.sendFile(outputPath);
    } catch (error) {
    console.error(error);
    if (error instanceof Error && error.message === "Original image not found") {
      return res.status(404).send("original picture not found");
    }
    res.status(500).send(" error resizing image");
  }
});

export default images;
