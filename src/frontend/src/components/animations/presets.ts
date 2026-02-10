import type { ColorPalette } from '../../backend';

type PresetRenderer = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  palette: ColorPalette,
  isCoarsePointer: boolean
) => void;

// Helper to parse color strings
function parseColor(color: string): { r: number; g: number; b: number } {
  // Simple hex parser
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
    };
  }
  return { r: 255, g: 255, b: 255 };
}

// Energy Waves
const energyWaves: PresetRenderer = (ctx, width, height, time, palette) => {
  ctx.clearRect(0, 0, width, height);
  const color = parseColor(palette.primary);

  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    for (let x = 0; x < width; x += 10) {
      const y =
        height / 2 +
        Math.sin((x + time * 50 + i * 100) * 0.01) * 80 +
        Math.cos((x + time * 30) * 0.005) * 40;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${0.3 - i * 0.05})`;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
};

// Particle Field
const particleField: PresetRenderer = (ctx, width, height, time, palette, isCoarsePointer) => {
  ctx.clearRect(0, 0, width, height);
  const color = parseColor(palette.accent);
  const count = isCoarsePointer ? 30 : 60;

  for (let i = 0; i < count; i++) {
    const x = ((i * 137.5 + time * 20) % width);
    const y = ((i * 73.3 + time * 15) % height);
    const size = Math.sin(time + i) * 2 + 3;

    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.4)`;
    ctx.fill();
  }
};

// Ink Splash
const inkSplash: PresetRenderer = (ctx, width, height, time, palette) => {
  ctx.clearRect(0, 0, width, height);
  const color = parseColor(palette.secondary);

  for (let i = 0; i < 8; i++) {
    const angle = (time + i) * 0.5;
    const radius = 100 + Math.sin(time * 2 + i) * 50;
    const x = width / 2 + Math.cos(angle) * radius;
    const y = height / 2 + Math.sin(angle) * radius;

    const gradient = ctx.createRadialGradient(x, y, 0, x, y, 80);
    gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0.3)`);
    gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);

    ctx.fillStyle = gradient;
    ctx.fillRect(x - 80, y - 80, 160, 160);
  }
};

// Glitch Distortion
const glitchDistortion: PresetRenderer = (ctx, width, height, time, palette) => {
  ctx.clearRect(0, 0, width, height);
  const color = parseColor(palette.primary);

  if (Math.random() > 0.95) {
    for (let i = 0; i < 5; i++) {
      const y = Math.random() * height;
      const h = Math.random() * 50 + 10;
      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.2)`;
      ctx.fillRect(0, y, width, h);
    }
  }

  // Scan lines
  for (let y = 0; y < height; y += 4) {
    ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.05)`;
    ctx.fillRect(0, y, width, 1);
  }
};

// Liquid Gradients
const liquidGradients: PresetRenderer = (ctx, width, height, time, palette) => {
  ctx.clearRect(0, 0, width, height);
  const color1 = parseColor(palette.primary);
  const color2 = parseColor(palette.secondary);

  const x1 = width / 2 + Math.cos(time) * 200;
  const y1 = height / 2 + Math.sin(time) * 200;
  const x2 = width / 2 + Math.cos(time + Math.PI) * 200;
  const y2 = height / 2 + Math.sin(time + Math.PI) * 200;

  const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
  gradient.addColorStop(0, `rgba(${color1.r}, ${color1.g}, ${color1.b}, 0.3)`);
  gradient.addColorStop(0.5, `rgba(${color2.r}, ${color2.g}, ${color2.b}, 0.2)`);
  gradient.addColorStop(1, `rgba(${color1.r}, ${color1.g}, ${color1.b}, 0.3)`);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
};

// Light Streaks
const lightStreaks: PresetRenderer = (ctx, width, height, time, palette) => {
  ctx.clearRect(0, 0, width, height);
  const color = parseColor(palette.accent);

  for (let i = 0; i < 10; i++) {
    const x = ((time * 100 + i * 150) % (width + 200)) - 100;
    const y = (i * height) / 10;

    const gradient = ctx.createLinearGradient(x, y, x + 100, y);
    gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
    gradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, 0.4)`);
    gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);

    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, 100, 2);
  }
};

// Default fallback
const defaultPreset: PresetRenderer = (ctx, width, height, time, palette) => {
  energyWaves(ctx, width, height, time, palette, false);
};

const presets: Record<string, PresetRenderer> = {
  action: energyWaves,
  adventure: particleField,
  romance: liquidGradients,
  'sci-fi': glitchDistortion,
  fantasy: inkSplash,
  comedy: particleField,
  mystery: glitchDistortion,
  horror: inkSplash,
  supernatural: energyWaves,
  sports: lightStreaks,
  mecha: glitchDistortion,
  drama: liquidGradients,
  'magical girl': liquidGradients,
  family: particleField,
};

export function getPresetRenderer(preset: string): PresetRenderer {
  return presets[preset.toLowerCase()] || defaultPreset;
}
