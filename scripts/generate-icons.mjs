import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Lily Protocol brand colors
const primaryColor = '#1a1a2e'; // Dark navy from design
const accentColor = '#00d4aa';  // Teal accent

// Create a simple Lily Protocol SVG icon
const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${primaryColor};stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0f0f1a;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="32" height="32" rx="6" fill="url(#grad)"/>
  <path d="M16 6 L16 26" stroke="${accentColor}" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M11 16 L21 16" stroke="${accentColor}" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="16" cy="16" r="3" fill="${accentColor}"/>
</svg>`;

const publicDir = path.join(process.cwd(), 'public');
const appDir = path.join(process.cwd(), 'src/app');

// Ensure directories exist
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
if (!fs.existsSync(appDir)) fs.mkdirSync(appDir, { recursive: true });

// Write SVG icon
fs.writeFileSync(path.join(appDir, 'icon.svg'), svgIcon);
console.log('Created src/app/icon.svg');

// Generate PNG variants from SVG
const sizes = [
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'apple-touch-icon-152x152.png', size: 152 },
  { name: 'apple-touch-icon-167x167.png', size: 167 },
  { name: 'apple-touch-icon-180x180.png', size: 180 },
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
];

async function generatePNGs() {
  const svgBuffer = Buffer.from(svgIcon);
  
  for (const { name, size } of sizes) {
    await sharp(svgBuffer)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(publicDir, name));
    console.log(`Created public/${name} (${size}x${size})`);
  }
  
  // Generate PNG fallbacks for favicon at different sizes
  const icoSizes = [16, 32, 48];
  for (const size of icoSizes) {
    await sharp(svgBuffer)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(publicDir, `favicon-${size}x${size}.png`));
    console.log(`Created public/favicon-${size}x${size}.png`);
  }
  
  // Also create a 32x32 favicon.png as fallback
  await sharp(svgBuffer)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'favicon.png'));
  console.log('Created public/favicon.png (32x32)');
}

generatePNGs().catch(console.error);