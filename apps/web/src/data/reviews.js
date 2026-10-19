// Google review stats, read by both React and the build tools (tools/*.cjs).
// When the count changes, edit reviewStats.json only. reviewCount is the exact
// number for schema; the phrase stays "100+" until we pass 200.
import stats from './reviewStats.json';

export const REVIEW_COUNT = stats.reviewCount;
export const REVIEW_PHRASE = stats.phrase;
export const REVIEW_PHRASE_TITLE = stats.phraseTitle;
