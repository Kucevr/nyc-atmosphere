import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const itemsDir = path.join(__dirname, 'public', 'items');

if (!fs.existsSync(itemsDir)) {
  console.error('Directory not found:', itemsDir);
  process.exit(1);
}

const files = fs.readdirSync(itemsDir);

files.forEach(async (file) => {
  const ext = path.extname(file).toLowerCase();
  if (['.jpg', '.jpeg', '.png'].includes(ext)) {
    const filePath = path.join(itemsDir, file);
    const baseName = path.parse(file).name;

    // Convert to WebP
    await sharp(filePath)
      .webp({ quality: 75 })
      .toFile(path.join(itemsDir, `${baseName}.webp`));
    
    // Convert to AVIF
    await sharp(filePath)
      .avif({ quality: 50, effort: 4 })
      .toFile(path.join(itemsDir, `${baseName}.avif`));

    // Create 20px thumbnail for blur-up (WebP for size)
    await sharp(filePath)
      .resize(20)
      .webp({ quality: 20 })
      .toFile(path.join(itemsDir, `${baseName}-thumb.webp`));

    console.log(`Converted ${file} to WebP, AVIF and created thumbnail (WebP).`);
  }
});