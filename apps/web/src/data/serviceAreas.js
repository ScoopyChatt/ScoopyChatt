import { locations } from '@/data/locations.js';

// Built from locations.js so the area tiles (near-me, service pages) always match
// the /service-areas hub and the /service/:slug pages. Add a new area there, not here.
export const serviceAreas = locations.map(({ name, slug }) => ({ name, slug }));
