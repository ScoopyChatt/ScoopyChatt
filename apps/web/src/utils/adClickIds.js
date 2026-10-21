// Google Ads click IDs (gclid / gbraid / wbraid) arrive on the landing URL when someone
// clicks an ad. We keep them for 90 days (Google's max click-through window) so a lead who
// browses a few pages, or comes back later, still carries the ID into the quote form.
// Downstream (GHL / Jobber) stores it, which lets closed customers be uploaded back to
// Google Ads as offline conversions.

const STORAGE_KEY = 'scoopy_ad_click';
const MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000;
const PARAMS = ['gclid', 'gbraid', 'wbraid'];

export const captureAdClickIds = () => {
  if (typeof window === 'undefined') return;
  try {
    const params = new URLSearchParams(window.location.search);
    const found = {};
    PARAMS.forEach((p) => {
      const v = params.get(p);
      if (v) found[p] = v;
    });
    if (Object.keys(found).length === 0) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...found, ts: Date.now() }));
  } catch (e) {
    // Storage blocked (private mode etc.) - tracking is best-effort, never break the page.
  }
};

// click_captured_at = when the visitor landed with the click ID (UTC ISO 8601). The
// Google offline-conversion uploader uses it to check the 90-day import window, so it is
// only sent when a click ID is present.
export const getAdClickIds = () => {
  const empty = { gclid: '', gbraid: '', wbraid: '', click_captured_at: '' };
  if (typeof window === 'undefined') return empty;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty;
    const saved = JSON.parse(raw);
    if (!saved.ts || Date.now() - saved.ts > MAX_AGE_MS) return empty;
    return {
      gclid: saved.gclid || '',
      gbraid: saved.gbraid || '',
      wbraid: saved.wbraid || '',
      click_captured_at: new Date(saved.ts).toISOString(),
    };
  } catch (e) {
    return empty;
  }
};
