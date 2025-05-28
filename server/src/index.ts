import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Groq } from 'groq';
import { ChatCompletionMessageParam } from 'groq/types/chat/completions';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  console.error("GROQ_API_KEY not found in environment variables");
  // 애플리케이션 시작 전에 필수 환경 변수 확인
  process.exit(1);
}

const groq = new Groq({
  apiKey: apiKey,
});

app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { messages } = req.body as { messages: ChatCompletionMessageParam[] };
    
    // 입력 유효성 검사 강화
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      console.warn('Received empty or invalid messages array', messages);
      return res.status(400).json({ error: '유효한 메시지 기록이 없습니다.' });
    }

    // 메시지 배열 내 각 메시지 형식 확인 (선택 사항이지만 안정성 향상)
    const isValid = messages.every(msg => 
      typeof msg === 'object' && msg !== null &&
      ('role' in msg && (msg.role === 'user' || msg.role === 'assistant' || msg.role === 'system')) &&
      ('content' in msg && typeof msg.content === 'string' && msg.content.trim().length > 0)
    );

    if (!isValid) {
        console.warn('Received messages array with invalid message format', messages);
        return res.status(400).json({ error: '메시지 기록 형식이 올바르지 않습니다.' });
    }

    console.log(`Received message from user: ${messages[messages.length - 1].content}`); // 수신 메시지 로깅

    // Groq API 호출 시 시스템 메시지를 추가하여 페르소나 설정
    const messagesWithPersona: ChatCompletionMessageParam[] = [
        { role: 'system', content: 'You are Tokisaki Kurumi, a helpful and friendly AI companion. You should respond as Tokisaki Kurumi.' },
        ...messages
    ];

    const completion = await groq.chat.completions.create({
      messages: messagesWithPersona, // 시스템 메시지가 추가된 메시지 배열 사용
      model: 'mixtral-8x7b-32768',
      temperature: 0.7,
      max_tokens: 1024,
    });

    const response = completion.choices[0]?.message?.content || '응답을 생성할 수 없습니다.';
    console.log(`Sent response: ${response.substring(0, 100)}...`); // 응답 로깅 (길면 자름)

    res.json({ response });
  } catch (error) {
    console.error('Error processing chat message:', error); // 상세 에러 로깅
    // 에러 유형에 따라 다른 응답을 줄 수도 있습니다.
    if (error instanceof Error) {
        res.status(500).json({ error: `서버 오류: ${error.message}` });
    } else {
        res.status(500).json({ error: '알 수 없는 서버 오류가 발생했습니다.' });
    }
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Groq API Key loaded: ${apiKey ? 'Yes' : 'No'}`); // API 키 로드 확인 로깅
}); 