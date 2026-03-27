/**
 * Copies a string to the system clipboard.
 * Returns true if successful, false otherwise.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    console.log(`Copied to clipboard: ${text}`);
    return true;
  } catch (err) {
    console.error('Clipboard write failed:', err);
    return false;
  }
}