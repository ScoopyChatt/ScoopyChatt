import express from 'express';
import logger from '../utils/logger.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { code, realmId } = req.body;
  if (!code) return res.status(400).json({ error: 'code is required' });
  if (!realmId) return res.status(400).json({ error: 'realmId is required' });

  const clientId = process.env.QB_CLIENT_ID;
  const clientSecret = process.env.QB_CLIENT_SECRET;
  const redirectUri = process.env.QB_REDIRECT_URI;
  if (!clientId || !clientSecret) {
    logger.error('QuickBooks OAuth is not configured (QB_CLIENT_ID / QB_CLIENT_SECRET missing)');
    return res.status(500).json({ error: 'QuickBooks OAuth is not configured' });
  }

  const params = { grant_type: 'authorization_code', code };
  if (redirectUri) params.redirect_uri = redirectUri;

  // Intuit expects the client credentials as HTTP Basic auth, not form fields.
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const tokenResponse = await fetch('https://oauth.platform.intuit.com/oauth2/tokens/bearer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
      Authorization: `Basic ${basic}`,
    },
    body: new URLSearchParams(params).toString(),
  });

  if (!tokenResponse.ok) {
    logger.error('QuickBooks token exchange failed', { status: tokenResponse.status });
    return res.status(502).json({ error: `QuickBooks token exchange failed (${tokenResponse.status})` });
  }

  const tokenData = await tokenResponse.json();
  logger.info('QuickBooks token exchange succeeded', { realmId });
  res.json(tokenData);
});

export default router;
