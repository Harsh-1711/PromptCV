import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateScreenshots() {
  // Desktop screenshot (1280x720)
  await sharp({
    create: {
      width: 1280,
      height: 720,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  })
  .composite([
    {
      input: Buffer.from(
        '<svg><text x="50%" y="50%" font-family="Arial" font-size="40" fill="black" text-anchor="middle">PromptCV Desktop Screenshot</text></svg>'
      ),
      top: 340,
      left: 640
    }
  ])
  .png()
  .toFile(path.join(__dirname, '../public/screenshots/screenshot-desktop.png'));

  // Mobile screenshot (360x640)
  await sharp({
    create: {
      width: 360,
      height: 640,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  })
  .composite([
    {
      input: Buffer.from(
        '<svg><text x="50%" y="50%" font-family="Arial" font-size="20" fill="black" text-anchor="middle">PromptCV Mobile Screenshot</text></svg>'
      ),
      top: 310,
      left: 180
    }
  ])
  .png()
  .toFile(path.join(__dirname, '../public/screenshots/screenshot-mobile.png'));

  console.log('Generated screenshots');
}

generateScreenshots().catch(console.error); 