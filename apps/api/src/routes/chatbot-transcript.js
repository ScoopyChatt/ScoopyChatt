import express from 'express';
import logger from '../utils/logger.js';
import pb from '../utils/pocketbaseClient.js';
const router = express.Router();
router.post('/', async (req, res) => {
  const { messages, customerInfo, conversationStartTime } = req.body;
  if (!messages || !Array.isArray(messages)) return res.status(400).json({ error: 'messages array is required' });
  if (!customerInfo || typeof customerInfo !== 'object') return res.status(400).json({ error: 'customerInfo object is required' });
  const { name, email } = customerInfo;
  if (!name || !email) return res.status(400).json({ error: 'customerInfo must include name and email' });
  await pb.send('brandon@scoopychatt.com', { subject: 'New Chatbot Inquiry - Scoopy Doo', html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Messages: ${messages.length}</p>` });
  res.status(200).json({ success: true });
});
export default router;