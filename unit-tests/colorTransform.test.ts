// ./utils/helpers/colorTransform.test.ts
import { describe, it, expect } from 'vitest'; // or 'jest'
import { hexToRgb } from '../src/utils/helpers/colorTransform';

describe('hexToRgb', () => {
  it('should convert a standard 6-character hex with a leading #', () => {
    expect(hexToRgb('#ffffff')).toEqual({ r: 255, g: 255, b: 255 });
    expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
    expect(hexToRgb('#ff5733')).toEqual({ r: 255, g: 87, b: 51 });
  });

  it('should convert a 6-character hex without a leading #', () => {
    expect(hexToRgb('ff5733')).toEqual({ r: 255, g: 87, b: 51 });
  });

  it('should expand and convert a 3-character short hex', () => {
    expect(hexToRgb('#f00')).toEqual({ r: 255, g: 0, b: 0 });
    expect(hexToRgb('0f0')).toEqual({ r: 0, g: 255, b: 0 });
  });

  it('should throw an error if the hex length is invalid', () => {
    // Wrap the function call in an anonymous function so the test runner can catch the throw
    expect(() => hexToRgb('#ff')).toThrow('Invalid HEX color.');
    expect(() => hexToRgb('#ffffffff')).toThrow('Invalid HEX color.');
  });
});