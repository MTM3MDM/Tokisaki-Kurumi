import express from 'express';
import path from 'path';

// 환경 변수는 Vercel에서 관리하므로 여기서 dotenv 로드 안 함

const app = express();
// app.use(express.json()); // API 처리는 chat.js에서 담당

// API 키 체크 로직 삭제 (Vercel에서 환경 변수 부재 시 빌드 실패)

// Groq 인스턴스 생성 및 API 라우트 삭제 (chat.js로 이동)

// 클라이언트 정적 파일 서빙 (클라이언트 빌드 후 dist 폴더 생성)
const FE_BUILD_PATH = path.join(__dirname, 'dist');
app.use(express.static(FE_BUILD_PATH));

// 모든 나머지 요청은 클라이언트 앱의 index.html로 리다이렉트 (클라이언트 라우팅 처리)
app.get('*', (req, res) => {
  res.sendFile(path.join(FE_BUILD_PATH, 'index.html'));
});

// 로컬 실행을 위한 포트 설정 (Vercel에서는 사용되지 않음)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // console.log(`Groq API Key loaded: ${process.env.GROQ_API_KEY ? 'Yes' : 'No'}`); // 로컬 실행 시 필요하면 주석 해제
}); 