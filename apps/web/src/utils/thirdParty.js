// Third-party widgets (Elfsight reviews, the GHL chat) wait for the visitor's first scroll,
// tap or keypress, or 10s after load, so they do not compete with the first paint on mobile.
// The signal comes from the inline loader in index.html, which sets window.__scoopyInteracted
// and fires 'scoopy:interact'. Returns an unsubscribe for useEffect cleanups.
export function afterInteraction(cb) {
  if (typeof window === 'undefined') return () => {};
  if (window.__scoopyInteracted) { cb(); return () => {}; }
  const run = () => cb();
  window.addEventListener('scoopy:interact', run, { once: true });
  return () => window.removeEventListener('scoopy:interact', run);
}

export const ELFSIGHT_SRC = 'https://elfsightcdn.com/platform.js';

// Adds the Elfsight platform script once, after interaction. onLoad runs when it is ready,
// including when an earlier call already loaded it.
export function loadElfsight({ onLoad, onError } = {}) {
  return afterInteraction(() => {
    const existing = document.querySelector('script[src="' + ELFSIGHT_SRC + '"]');
    if (existing) {
      if (window.ELFSight) onLoad?.();
      else existing.addEventListener('load', () => onLoad?.(), { once: true });
      return;
    }
    const script = document.createElement('script');
    script.src = ELFSIGHT_SRC;
    script.async = true;
    script.onload = () => onLoad?.();
    script.onerror = (err) => onError?.(err);
    document.body.appendChild(script);
  });
}
