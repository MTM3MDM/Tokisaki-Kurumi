import { Groq } from 'groq';

// 환경 변수는 Vercel에서 자동으로 로드됩니다.
// process.env.GROQ_API_KEY 사용 가능

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Vercel 서버리스 함수 엔트리 포인트
export default async (req, res) => {
  // POST 요청만 처리
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { message } = req.body; // 클라이언트에서는 message 필드만 보냅니다.
    
    if (!message || typeof message !== 'string') {
      console.warn('Received empty or invalid message', req.body);
      return res.status(400).json({ error: '유효한 메시지가 없습니다.' });
    }

    console.log(`Received message for chat completion: ${message}`);

    const messagesWithPersona = [
        { role: 'system', content: 'You are Tokisaki Kurumi, a helpful and friendly AI companion. You should respond as Tokisaki Kurumi. Respond in Korean unless the user asks otherwise.' },
        { role: 'user', content: message } // 단일 메시지만 처리
    ];

    const completion = await groq.chat.completions.create({
      messages: messagesWithPersona,
      model: 'mixtral-8x7b-32768',
      temperature: 0.7,
      max_tokens: 1024,
    });

    const responseContent = completion.choices[0]?.message?.content || '응답을 생성할 수 없습니다.';
    console.log(`Sent response.`);

    res.status(200).json({ message: responseContent }); // 클라이언트에서 message 필드를 기대합니다.
  } catch (error) {
    console.error('Error processing chat message:', error);
    if (error instanceof Error) {
        res.status(500).json({ error: `서버 오류: ${error.message}` });
    } else {
        res.status(500).json({ error: '알 수 없는 서버 오류가 발생했습니다.' });
    }
  }
}; 