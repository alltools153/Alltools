/**
 * Safe Browser/Client-side Utilities
 * Prevents unhandled runtime errors in SSR, clipboard access, and audio synthesis
 */

export function safeCopyToClipboard(text: string): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(false);
  
  try {
    if (navigator?.clipboard?.writeText) {
      return navigator.clipboard
        .writeText(text)
        .then(() => true)
        .catch(() => fallbackCopy(text));
    }
    return Promise.resolve(fallbackCopy(text));
  } catch {
    return Promise.resolve(fallbackCopy(text));
  }
}

function fallbackCopy(text: string): boolean {
  if (typeof document === 'undefined') return false;
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch {
    return false;
  }
}
