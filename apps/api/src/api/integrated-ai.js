import { GoogleGenerativeAI } from '@google/generative-ai';
import { Readable } from 'stream';
import logger from '../utils/logger.js';
import pb from '../utils/pocketbaseClient.js';

export const ContentBlockType = { Text: 'text', Image: 'image' };

export async function stream({ userId, systemPrompt, userMessage, requestId }) {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATVE_AI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash', systemInstruction: systemPrompt });
  const parts = (Array.isArray(userMessage) ? userMessage : [{ type: 'text', text: userMessage }])
    .map(msg => msg.type === 'text' ? { text: msg.text } : { inlineData: { mimeType: 'image/jpeg', data: msg.image } });
  const result = await model.generateContentStream({ contents: [{ role: 'user', parts }] });
  const readable = new Readable({ read() {} });
  (async () => {
    try {
      for await (const chunk of result.stream) {
        const text = chunk.text();
        if (text) readable.push(`data: ${JSON.stringify({ type: 'text', content: text })}\n\n`);
      }
      readable.push(`data: ${JSON.stringify({ type: 'done' })}\n\n`);
      readable.push(null);
    } catch (err) {
      readable.push(`data: ${JSON.stringify({ type: 'error', error: err.message })}\n\n`);
      readable.push(null);
    }
  })();
  return readable;
}

export async function uploadImagesToPocketBase({ images }) {
  const urls = [];
  for (const image of images) {
    const formData = new FormData();
    formData.append('file', new Blob([image.buffer], { type: image.mimetype }), image.originalname);
    const record = await pb.collection('integrated_ai_images').create(formData);
    urls.push(pb.getFileUrl(record, record.file));
  }
  return urls;
}