import { Groq } from 'groq';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  throw new Error('GROQ_API_KEY not found in environment variables');
}

const groq = new Groq({
  apiKey: apiKey,
});

export const onRequestPost = async ({ request }) => {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      console.warn('Received empty or invalid messages array', messages);
      return new Response(JSON.stringify({ error: '유효한 메시지 기록이 없습니다.' }), { status: 400 });
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

    return new Response(JSON.stringify({ response: chatResponse }), { status: 200 });
  } catch (error) {
    console.error('Error processing chat message:', error);
    const errorMessage = error instanceof Error ? error.message : '알 수 없는 서버 오류가 발생했습니다.';
    return new Response(JSON.stringify({ error: `서버 오류: ${errorMessage}` }), { status: 500 });
  }
}; 