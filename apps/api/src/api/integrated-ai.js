import { GoogleGenerativeAI } from '@google/generative-ai';
import { Readable } from 'stream';
import logger from '../utils/logger.js';

export const ContentBlockType = { Text: 'text', Image: 'image' };

export async function stream({ userId, systemPrompt, userMessage, requestId }) {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) throw new Error('GOOGLE_GENERATIVE_AI_API_KEY not configured');
  
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-1.5-flash',
    systemInstruction: systemPrompt 
  });
  
  const parts = (Array.isArray(userMessage) ? userMessage : [{ type: 'text', text: userMessage }])
    .filter(msg => msg.type === 'text')
    .map(msg => ({ text: msg.text }));
  
  const result = await model.generateContentStream({ 
    contents: [{ role: 'user', parts }] 
  });
  
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

export async function uploadImagesToPocketBase({ images }) {
  return [];
}
