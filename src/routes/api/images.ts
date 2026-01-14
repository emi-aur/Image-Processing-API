import express from "express";
import fs from "fs";
import sharp from "sharp";
import path from "path";

const images = express.Router();

// Determine the correct assets path (works for both src and dist)
const assetsPath = fs.existsSync(path.join(__dirname, "../../assets/full"))
  ? path.join(__dirname, "../../assets")
  : path.join(__dirname, "../../../src/assets");

images.get("/", async (req, res) => {
  const filename = req.query.filename as string;
  const width = parseInt(req.query.width as string) || 200;
  const height = parseInt(req.query.height as string) || 200;

  const inputPath = path.join(assetsPath, "full", filename);
  const thumbDir = path.join(assetsPath, "thumb");
  const outputPath = path.join(thumbDir, `${width}x${height}_${filename}`);

  try {
    // 1. CACHING-CHECK: Existiert das Bild schon?
    if (fs.existsSync(outputPath)) {
      return res.sendFile(outputPath);
    }

    // 2. SICHERHEIT: Existiert der Thumb-Ordner?
    if (!fs.existsSync(thumbDir)) {
      fs.mkdirSync(thumbDir, { recursive: true });
    }

    // 3. VERARBEITUNG: Bild existiert noch nicht -> Erstellen
    if (!fs.existsSync(inputPath)) {
      return res.status(404).send("Originalbild nicht gefunden");
    }
    await sharp(inputPath).resize(width, height).toFile(outputPath);

    res.sendFile(outputPath);
  } catch (error) {
    console.error(error);
    res.status(500).send("Fehler beim Resizen");
  }
});

export default images;
