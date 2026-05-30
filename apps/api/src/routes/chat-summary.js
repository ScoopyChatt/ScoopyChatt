import express from 'express';
import logger from '../utils/logger.js';
import pb from '../utils/pocketbaseClient.js';

const router = express.Router();

router.post('/send-summary', async (req, res) => {
  const { userId, conversationMessages, userEmail, userName, businessOwnerEmail } = req.body;
  if (!userId) return res.status(400).json({ error: 'userId is required' });
  if (!conversationMessages || !Array.isArray(conversationMessages)) return res.status(400).json({ error: 'conversationMessages array is required' });
  if (!userEmail) return res.status(400).json({ error: 'userEmail is required' });
  const summaryRecord = await pb.collection('chat_summaries').create({ userId, userEmail, userName: userName || 'Customer', messageCount: conversationMessages.length, sentAt: new Date().toISOString() });
  res.status(200).json({ success: true, summaryId: summaryRecord.id });
});

router.post('/', async (req, res) => {
  const { userEmail, userName, messages, conversationStartTime } = req.body;
  if (!userEmail) return res.status(400).json({ error: 'userEmail is required' });
  if (!messages || !Array.isArray(messages)) return res.status(400).json({ error: 'messages array is required' });
  res.status(200).json({ success: true, message: 'Chat summary received' });
});

export default router;