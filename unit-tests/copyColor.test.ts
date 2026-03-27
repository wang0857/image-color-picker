import { describe, it, expect, vi } from 'vitest';
import { copyToClipboard } from '../src/utils/helpers/copyColor';

describe('copyToClipboard', () => {
  it('should return true on success', async () => {
    Object.assign(navigator, { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } });
    const result = await copyToClipboard('#fff');
    expect(result).toBe(true);
  });

  it('should return false on failure', async () => {
    Object.assign(navigator, { clipboard: { writeText: vi.fn().mockRejectedValue(new Error()) } });
    const result = await copyToClipboard('#fff');
    expect(result).toBe(false);
  });
});