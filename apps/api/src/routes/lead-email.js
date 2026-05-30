import express from 'express';
import logger from '../utils/logger.js';
import pb from '../utils/pocketbaseClient.js';
const router = express.Router();
router.post('/', async (req, res) => {
  const { name, email, phone, address } = req.body;
  if (!name) return res.status(400).json({ error: 'name is required' });
  if (!email) return res.status(400).json({ error: 'email is required' });
  if (!phone) return res.status(400).json({ error: 'phone is required' });
  if (!address) return res.status(400).json({ error: 'address is required' });
  await pb.send('brandon@scoopychatt.com', { subject: `New Lead: ${name}`, html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Phone: ${phone}</p><p>Address: ${address}</p>` });
  const record = await pb.collection('leads').create({ name, email, phone, address });
  res.status(200).json({ success: true, recordId: record.id });
});
export default router;