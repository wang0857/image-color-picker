type ColorFormat = 'hex' | 'rgba';

export function useColorTransform(
  from: ColorFormat,
  to: ColorFormat,
  value: string
): string {
  if (from === to) return value;

  if (from === 'rgba' && to === 'hex') return rgbaStringToHex(value);
  if (from === 'hex' && to === 'rgba') return hexToRgba(value);

  return '';
}

// RGBA to HEX (string input: 'rgba(255, 87, 51, 0.5)')
function rgbaStringToHex(rgba: string): string {
  const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (!match) return '';

  const [, r, g, b, a = '1'] = match;

  const toHex = (val: number) =>
    Math.round(val).toString(16).padStart(2, '0');

  const alpha = Math.round(parseFloat(a) * 255);

  return (
    '#' +
    toHex(+r) +
    toHex(+g) +
    toHex(+b) +
    (alpha < 255 ? toHex(alpha) : '')
  );
}

// HEX to RGBA (string input: '#ff573380' or '#fff')
function hexToRgba(hex: string): string {
  let cleanHex = hex.replace('#', '');

  if (cleanHex.length === 3 || cleanHex.length === 4) {
    cleanHex = cleanHex
      .split('')
      .map((c) => c + c)
      .join('');
  }

  const hasAlpha = cleanHex.length === 8;

  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);
  const a = hasAlpha ? parseInt(cleanHex.slice(6, 8), 16) / 255 : 1;

  return `rgba(${r}, ${g}, ${b}, ${parseFloat(a.toFixed(3))})`;
}
