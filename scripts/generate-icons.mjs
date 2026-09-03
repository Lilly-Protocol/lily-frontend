import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const globalsCssPath = path.join(projectRoot, 'src/app/globals.css');
const publicDir = path.join(projectRoot, 'public');
const iconsDir = path.join(publicDir, 'icons');

// Derive brand colors from src/app/globals.css tokens
function getBrandTokens() {
  const css = fs.readFileSync(globalsCssPath, 'utf-8');
  const accent = css.match(/--color-accent:\s*([^;]+);/)?.[1]?.trim() || '#0f766e';
  const surface = css.match(/--color-surface:\s*([^;]+);/)?.[1]?.trim() || '#f7f7f5';
  const ink = css.match(/--color-ink:\s*([^;]+);/)?.[1]?.trim() || '#111827';
  const line = css.match(/--color-line:\s*([^;]+);/)?.[1]?.trim() || '#d1d5db';
  return { accent, surface, ink, line };
}

const tokens = getBrandTokens();

// SVGs matching design tokens and existing committed assets
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="${tokens.accent}"/><text x="16" y="22" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle" fill="${tokens.surface}">L</text></svg>
`;

const appleTouchIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180"><circle cx="90" cy="90" r="80" fill="${tokens.accent}"/><text x="90" y="120" font-family="Arial" font-size="100" font-weight="bold" text-anchor="middle" fill="${tokens.surface}">L</text></svg>
`;

const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <rect width="64" height="64" rx="14" fill="${tokens.ink}"/>
  <path d="M20 18h8v20h12v8H20V18z" fill="${tokens.surface}"/>
  <circle cx="44" cy="22" r="4" fill="${tokens.accent}"/>
</svg>
`;

const lilyIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" aria-label="Lily Protocol app icon">
  <rect width="512" height="512" rx="104" fill="${tokens.surface}" />
  <circle cx="256" cy="256" r="168" fill="#ffffff" stroke="${tokens.line}" stroke-width="20" />
  <path
    d="M256 122c49 47 89 98 89 154 0 55-40 98-89 98s-89-43-89-98c0-56 40-107 89-154Z"
    fill="${tokens.accent}"
  />
  <path
    d="M256 154c-31 38-54 78-54 119 0 35 23 61 54 61s54-26 54-61c0-41-23-81-54-119Z"
    fill="${tokens.surface}"
    opacity=".94"
  />
  <path d="M256 236v146" stroke="${tokens.accent}" stroke-width="24" stroke-linecap="round" />
</svg>
`;

const lilyMaskableIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" aria-label="Lily Protocol maskable app icon">
  <rect width="512" height="512" fill="${tokens.surface}" />
  <circle cx="256" cy="256" r="182" fill="#ffffff" stroke="${tokens.line}" stroke-width="18" />
  <path
    d="M256 112c53 50 96 105 96 166 0 59-43 106-96 106s-96-47-96-106c0-61 43-116 96-166Z"
    fill="${tokens.accent}"
  />
  <path
    d="M256 150c-34 41-59 84-59 128 0 38 26 66 59 66s59-28 59-66c0-44-25-87-59-128Z"
    fill="${tokens.surface}"
    opacity=".94"
  />
  <path d="M256 235v158" stroke="${tokens.accent}" stroke-width="24" stroke-linecap="round" />
</svg>
`;

// Ensure directories exist
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
if (!fs.existsSync(iconsDir)) fs.mkdirSync(iconsDir, { recursive: true });

async function generateAll() {
  console.log(`Generating icons using tokens: accent=${tokens.accent}, surface=${tokens.surface}, ink=${tokens.ink}`);

  // Write SVGs
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSvg);
  console.log('Created public/favicon.svg');

  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.svg'), appleTouchIconSvg);
  console.log('Created public/apple-touch-icon.svg');

  fs.writeFileSync(path.join(publicDir, 'icon.svg'), iconSvg);
  console.log('Created public/icon.svg');

  fs.writeFileSync(path.join(iconsDir, 'lily-icon.svg'), lilyIconSvg);
  console.log('Created public/icons/lily-icon.svg');

  fs.writeFileSync(path.join(iconsDir, 'lily-maskable-icon.svg'), lilyMaskableIconSvg);
  console.log('Created public/icons/lily-maskable-icon.svg');

  // Generate PNGs from SVGs
  const lilyBuffer = Buffer.from(lilyIconSvg);
  const appleTouchBuffer = Buffer.from(appleTouchIconSvg);

  await sharp(appleTouchBuffer)
    .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'apple-icon.png'));
  console.log('Created public/apple-icon.png (180x180)');

  const pngConfigs = [
    { target: path.join(publicDir, 'icon-192.png'), size: 192 },
    { target: path.join(publicDir, 'icon-512.png'), size: 512 },
    { target: path.join(iconsDir, 'icon-192.png'), size: 192 },
    { target: path.join(iconsDir, 'icon-512.png'), size: 512 },
  ];

  for (const { target, size } of pngConfigs) {
    await sharp(lilyBuffer)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(target);
    console.log(`Created ${path.relative(projectRoot, target)} (${size}x${size})`);
  }
}

generateAll().catch(console.error);