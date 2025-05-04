import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const iconDirectory = path.join(__dirname, '../public/icons');

// Create icons directory if it doesn't exist
await fs.mkdir(iconDirectory, { recursive: true });

// Base icon should be at least 512x512
const sourceIcon = path.join(__dirname, '../public/favicon.png');

for (const size of sizes) {
  try {
    await sharp(sourceIcon)
      .resize(size, size)
      .toFile(path.join(iconDirectory, `icon-${size}x${size}.png`));
    console.log(`Generated ${size}x${size} icon`);
  } catch (err) {
    console.error(`Error generating ${size}x${size} icon:`, err);
  }
} 