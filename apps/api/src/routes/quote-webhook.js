import express from 'express';
import logger from '../utils/logger.js';
import pb from '../utils/pocketbaseClient.js';

const router = express.Router();
const REQUIRED_FIELDS = ['name', 'email', 'phone', 'serviceZipCode', 'serviceType', 'numberOfDogs'];
const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/3191509/ujiqrzz/';

router.post('/', async (req, res) => {
  const { name, email, phone, serviceZipCode, serviceType, numberOfDogs, additionalNotes } = req.body;
  const missingFields = REQUIRED_FIELDS.filter(field => !req.body[field]);
  if (missingFields.length > 0) return res.status(400).json({ error: 'Missing required fields', missingFields });
  const payload = { name, email, phone, serviceZipCode, serviceType, numberOfDogs, additionalNotes: additionalNotes || '' };
  const zapierResponse = await fetch(ZAPIER_WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  if (!zapierResponse.ok) throw new Error('Zapier error: ' + zapierResponse.status);
  const createdRecord = await pb.collection('quote_requests').create({ name, email, phone, serviceZipCode, serviceType, numberOfDogs: parseInt(numberOfDogs, 10), additionalNotes: additionalNotes || '' });
  res.status(201).json({ success: true, record: createdRecord });
});

export default router;