import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// For maskable icons, we need to ensure the important content is within the safe zone
// The safe zone is 40% padding around the image
async function generateMaskableIcon() {
  const sourceIcon = path.join(__dirname, '../public/icons/icon-192x192.png');
  const outputPath = path.join(__dirname, '../public/icons/icon-192x192-maskable.png');
  
  // Create a white background of 192x192
  const background = await sharp({
    create: {
      width: 192,
      height: 192,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  }).png().toBuffer();

  // Resize the original icon to 80% of the size (to account for safe zone)
  await sharp(sourceIcon)
    .resize(154, 154) // 80% of 192
    .extend({
      top: 19,
      bottom: 19,
      left: 19,
      right: 19,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    })
    .composite([
      {
        input: background,
        blend: 'over'
      }
    ])
    .toFile(outputPath);

  console.log('Generated maskable icon');
}

generateMaskableIcon().catch(console.error); 