import { GoogleGenerativeAI } from '@google/generative-ai';
import { Readable } from 'stream';
import logger from '../utils/logger.js';

export const ContentBlockType = { Text: 'text', Image: 'image' };

export async function stream({ userId, systemPrompt, userMessage, requestId }) {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) throw new Error('GOOGLE_GENERATIVE_AI_API_KEY not configured');
  
  const genAI = new GoogleGenerativeAI(apiKey);
  // Use gemini-pro - widely supported stable model
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  const parts = (Array.isArray(userMessage) ? userMessage : [{ type: 'text', text: String(userMessage) }])
    .filter(msg => msg && msg.type === 'text' && msg.text)
    .map(msg => ({ text: msg.text }));
  
  if (parts.length === 0) parts.push({ text: 'Hello' });
  
  // Add system prompt as first user message if provided
  const contents = [];
  if (systemPrompt) {
    contents.push({ role: 'user', parts: [{ text: 'System: ' + systemPrompt }] });
    contents.push({ role: 'model', parts: [{ text: 'Understood. I will follow these instructions.' }] });
  }
  contents.push({ role: 'user', parts });
  
  const result = await model.generateContentStream({ contents });
  
  const readable = new Readable({ read() {} });
  (async () => {
    try {
      for await (const chunk of result.stream) {
        const text = chunk.text();
        if (text) readable.push('data: ' + JSON.stringify({ type: 'text', content: text }) + '\n\n');
      }
      readable.push('data: ' + JSON.stringify({ type: 'done' }) + '\n\n');
      readable.push(null);
    } catch (err) {
      logger.error('Stream error', { error: err.message });
      readable.push('data: ' + JSON.stringify({ type: 'error', error: err.message }) + '\n\n');
      readable.push(null);
    }
  })();
  return readable;
}

export async function uploadImagesToPocketBase({ images }) { return []; }
