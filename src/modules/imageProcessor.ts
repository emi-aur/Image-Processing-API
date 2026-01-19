import sharp from "sharp";
import fs from "fs";
import path from "path";

const assetsPath = fs.existsSync(path.join(__dirname, "../../assets/full"))
  ? path.join(__dirname, "../../assets")
  : path.join(__dirname, "../../src/assets");

export async function processImage(
  filename: string,
  width: number,
  height: number
): Promise<string> {
  const inputPath = path.join(assetsPath, "full", filename);
  const thumbDir = path.join(assetsPath, "thumb");
  const outputPath = path.join(thumbDir, `${width}x${height}_${filename}`);

  // Check if the original image exists
  if (!fs.existsSync(inputPath)) {
    throw new Error("Original image not found");
  }

  // Check if cached thumbnail already exists (CACHING)
  if (fs.existsSync(outputPath)) {
    return outputPath;
  }

  // Ensure thumbnail directory exists
  if (!fs.existsSync(thumbDir)) {
    fs.mkdirSync(thumbDir, { recursive: true });
  }

  // Process the image
  await sharp(inputPath).resize(width, height).toFile(outputPath);

  return outputPath;
}