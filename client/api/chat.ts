import { VercelRequest, VercelResponse } from '@vercel/node';
import { Groq } from 'groq';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  // Vercel 환경에서는 이 오류가 빌드/배포 시 감지됩니다.
  throw new Error('GROQ_API_KEY not found in environment variables');
}

const groq = new Groq({
  apiKey: apiKey,
});

export default async (request, response) => {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { messages } = request.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      console.warn('Received empty or invalid messages array', messages);
      return response.status(400).json({ error: '유효한 메시지 기록이 없습니다.' });
    }

    console.log(`Received message for chat completion.`);

    const messagesWithPersona = [
        { role: 'system', content: 'You are Tokisaki Kurumi, a helpful and friendly AI companion. You should respond as Tokisaki Kurumi.' },
        ...messages
    ];

    const completion = await groq.chat.completions.create({
      messages: messagesWithPersona,
      model: 'mixtral-8x7b-32768',
      temperature: 0.7,
      max_tokens: 1024,
    });

    const chatResponse = completion.choices[0]?.message?.content || '응답을 생성할 수 없습니다.';
    console.log(`Sent response.`);

    response.status(200).json({ response: chatResponse });
  } catch (error) {
    console.error('Error processing chat message:', error);
    if (error instanceof Error) {
        response.status(500).json({ error: `서버 오류: ${error.message}` });
    } else {
        response.status(500).json({ error: '알 수 없는 서버 오류가 발생했습니다.' });
    }
  }
}; 