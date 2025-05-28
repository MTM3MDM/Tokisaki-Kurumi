# 토키사키 쿠루미 - 한국어 AI 대화 도우미

## 주요 기능
- 실시간 AI 대화 인터페이스
- 한국어/영어 번역 기능
- 대화 기록 저장 및 관리
- 다국어 지원 (한국어/영어)

## 기술 스택
- Frontend: React, TypeScript, TailwindCSS
- Backend: Node.js, Express
- Database: Neon (PostgreSQL)
- AI: Groq API

## 설치 및 실행
1. 저장소 클론
```bash
git clone https://github.com/MTM3MDM/Tokisaki-Kurumi.git
cd Tokisaki-Kurumi
```

2. 의존성 설치
```bash
cd client
npm install
```

3. 환경 변수 설정
- `.env.example` 파일을 `.env`로 복사
- 필요한 API 키와 설정값 입력

4. 개발 서버 실행
```bash
npm run dev
```

## 배포
- Cloudtype을 통한 자동 배포
- GitHub Actions를 통한 CI/CD

## 기여하기
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 라이선스
MIT License 