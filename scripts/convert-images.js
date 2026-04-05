/**
 * convert-images.js
 * Convierte todos los PNGs de /public/proyectsPhotos/ a WebP.
 * Mantiene el original PNG como fallback.
 * Uso: npm run convert-images
 */
import sharp from "sharp";
import { readdir } from "fs/promises";
import { join, extname, basename } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const INPUT_DIR = join(__dirname, "../public/proyectsPhotos");

const files = await readdir(INPUT_DIR);
const pngs = files.filter((f) => extname(f).toLowerCase() === ".png");

if (pngs.length === 0) {
  console.log("No hay PNGs que convertir.");
  process.exit(0);
}

let converted = 0;
for (const file of pngs) {
  const input = join(INPUT_DIR, file);
  const output = join(INPUT_DIR, basename(file, ".png") + ".webp");
  try {
    await sharp(input).webp({ quality: 82 }).toFile(output);
    console.log(`✓ ${file} → ${basename(output)}`);
    converted++;
  } catch (err) {
    console.error(`✗ ${file}: ${err.message}`);
  }
}

console.log(`\nConvertidos: ${converted}/${pngs.length}`);
