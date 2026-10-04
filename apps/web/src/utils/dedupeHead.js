// The prerendered HTML already carries one title/description/canonical/og/twitter tag
// per page, and react-helmet-async then ADDS its own beside them instead of replacing
// them. After load (and after every client-side navigation) the DOM ends up with two
// descriptions and a stale homepage og:title next to the real one. Wherever Helmet has
// supplied a tag, drop the unmanaged static copy of the same tag. Pages Helmet does not
// touch keep their prerendered tags.
const KEYED = ['meta[name]', 'meta[property]', 'link[rel="canonical"]'];

function keyOf(el) {
  if (el.tagName === 'LINK') return 'link:canonical';
  return 'meta:' + (el.getAttribute('name') || el.getAttribute('property'));
}

export function dedupeHead() {
  const groups = new Map();
  document.head.querySelectorAll(KEYED.join(',')).forEach((el) => {
    const k = keyOf(el);
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push(el);
  });
  groups.forEach((els) => {
    if (els.length < 2) return;
    const managed = els.filter((el) => el.hasAttribute('data-rh'));
    if (!managed.length) return;
    els.filter((el) => !el.hasAttribute('data-rh')).forEach((el) => el.remove());
  });
}

export function watchHead() {
  let queued = false;
  new MutationObserver(() => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; dedupeHead(); });
  }).observe(document.head, { childList: true });
  dedupeHead();
}
