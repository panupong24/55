import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Create vibrant SVG icon
const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
    <linearGradient id="rainbow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff2a6d"/>
      <stop offset="20%" stop-color="#ff6200"/>
      <stop offset="40%" stop-color="#ffb800"/>
      <stop offset="60%" stop-color="#00e676"/>
      <stop offset="80%" stop-color="#00b0ff"/>
      <stop offset="100%" stop-color="#9d00ff"/>
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fde047"/>
      <stop offset="100%" stop-color="#eab308"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="16" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Background rounded squircle -->
  <rect width="512" height="512" rx="112" fill="url(#bg)"/>

  <!-- Rainbow outer glowing ring -->
  <circle cx="256" cy="256" r="190" fill="none" stroke="url(#rainbow)" stroke-width="24" filter="url(#glow)" opacity="0.6"/>
  <circle cx="256" cy="256" r="190" fill="none" stroke="url(#rainbow)" stroke-width="20"/>

  <!-- Center Heart & Crown Symbol -->
  <!-- Heart -->
  <path d="M256 385 C220 340 140 280 140 200 C140 140 185 110 230 110 C245 110 256 120 256 120 C256 120 267 110 282 110 C327 110 372 140 372 200 C372 280 292 340 256 385 Z" fill="url(#rainbow)"/>

  <!-- Sparkle / Crown atop -->
  <path d="M210 130 L256 80 L302 130 L275 145 L256 110 L237 145 Z" fill="url(#gold)"/>
  <circle cx="256" cy="70" r="12" fill="#fff"/>
  <circle cx="200" cy="115" r="9" fill="#fde047"/>
  <circle cx="312" cy="115" r="9" fill="#fde047"/>
</svg>`;

// Maskable version with safe-zone margin (padding around icon)
const svgMaskable = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e1b4b"/>
      <stop offset="50%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
    <linearGradient id="rainbow2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff2a6d"/>
      <stop offset="20%" stop-color="#ff6200"/>
      <stop offset="40%" stop-color="#ffb800"/>
      <stop offset="60%" stop-color="#00e676"/>
      <stop offset="80%" stop-color="#00b0ff"/>
      <stop offset="100%" stop-color="#9d00ff"/>
    </linearGradient>
    <linearGradient id="gold2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fde047"/>
      <stop offset="100%" stop-color="#eab308"/>
    </linearGradient>
  </defs>

  <!-- Full Bleed Background -->
  <rect width="512" height="512" fill="url(#bg2)"/>

  <!-- Scaled content to stay within safe zone (80% circle) -->
  <g transform="translate(51.2, 51.2) scale(0.8)">
    <circle cx="256" cy="256" r="190" fill="none" stroke="url(#rainbow2)" stroke-width="22"/>
    <path d="M256 385 C220 340 140 280 140 200 C140 140 185 110 230 110 C245 110 256 120 256 120 C256 120 267 110 282 110 C327 110 372 140 372 200 C372 280 292 340 256 385 Z" fill="url(#rainbow2)"/>
    <path d="M210 130 L256 80 L302 130 L275 145 L256 110 L237 145 Z" fill="url(#gold2)"/>
    <circle cx="256" cy="70" r="12" fill="#fff"/>
    <circle cx="200" cy="115" r="9" fill="#fde047"/>
    <circle cx="312" cy="115" r="9" fill="#fde047"/>
  </g>
</svg>`;

async function run() {
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgIcon, 'utf8');
  console.log('Saved public/icon.svg');

  const svgBuffer = Buffer.from(svgIcon);
  const svgMaskableBuffer = Buffer.from(svgMaskable);

  // 192x192
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'pwa-192x192.png'));
  console.log('Saved public/pwa-192x192.png');

  // 512x512
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'pwa-512x512.png'));
  console.log('Saved public/pwa-512x512.png');

  // 512x512 Maskable
  await sharp(svgMaskableBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'pwa-maskable-512x512.png'));
  console.log('Saved public/pwa-maskable-512x512.png');

  // Apple touch icon 180x180
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('Saved public/apple-touch-icon.png');

  // Social share image: exactly 1200x630 JPEG (matches og:image:width/height)
  const heroSrc = path.resolve('src/assets/images/hero_rainbow_quiz_1790434208133.webp');
  // The hero source is only 800px wide now, so keep the committed 1200x630 og-image.jpg
  // instead of upscaling it. Delete public/og-image.jpg to force regeneration.
  if (fs.existsSync(heroSrc) && !fs.existsSync(path.join(publicDir, 'og-image.jpg'))) {
    await sharp(heroSrc)
      .resize(1200, 630, { fit: 'cover' })
      .jpeg({ quality: 82, progressive: true })
      .toFile(path.join(publicDir, 'og-image.jpg'));
    console.log('Saved public/og-image.jpg (1200x630)');
  }

  console.log('All public assets successfully created!');
}

run().catch(console.error);
