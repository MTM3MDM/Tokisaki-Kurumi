import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { Groq } from 'groq';

dotenv.config();

const app = express();
app.use(express.json());

const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  console.error("GROQ_API_KEY not found in environment variables");
  process.exit(1); // API 키 없으면 서버 시작 안 함
}

const groq = new Groq({
  apiKey: apiKey,
});

// API 라우트
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      console.warn('Received empty or invalid messages array', messages);
      return res.status(400).json({ error: '유효한 메시지 기록이 없습니다.' });
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

    const response = completion.choices[0]?.message?.content || '응답을 생성할 수 없습니다.';
    console.log(`Sent response.`);

    res.status(200).json({ response });
  } catch (error) {
    console.error('Error processing chat message:', error);
    if (error instanceof Error) {
        res.status(500).json({ error: `서버 오류: ${error.message}` });
    } else {
        res.status(500).json({ error: '알 수 없는 서버 오류가 발생했습니다.' });
    }
  }
});

// 클라이언트 정적 파일 서빙 (클라이언트 빌드 후 dist 폴더 생성)
const FE_BUILD_PATH = path.join(__dirname, 'dist');
app.use(express.static(FE_BUILD_PATH));

// 모든 나머지 요청은 클라이언트 앱의 index.html로 리다이렉트 (클라이언트 라우팅 처리)
app.get('*', (req, res) => {
  res.sendFile(path.join(FE_BUILD_PATH, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Groq API Key loaded: ${apiKey ? 'Yes' : 'No'}`);
}); 