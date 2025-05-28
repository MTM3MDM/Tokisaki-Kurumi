# 토키사키 쿠루미 - 한국어 AI 대화 도우미

토키사키 쿠루미는 한국어와 영어 간의 번역 및 대화 기능을 제공하는 AI 대화 도우미 애플리케이션입니다.

## 주요 기능

- **대화 인터페이스**: 사용자와 AI 간의 자연스러운 대화
- **번역 기능**: 한국어-영어 간 정확한 번역
- **학습 시스템**: 사용자 피드백을 통한 AI 학습
- **대화 기록**: 이전 대화 저장 및 조회
- **분석 대시보드**: 번역 정확도, 학습 진행 상황 등 분석

## 기술 스택

- **프론트엔드**: React, TypeScript, TailwindCSS, Shadcn UI
- **백엔드**: Express.js
- **데이터베이스**: PostgreSQL (Drizzle ORM)
- **AI**: Groq API

## 설치 및 실행

### 필수 요구사항

- Node.js 18 이상
- PostgreSQL 데이터베이스

### 환경 설정

1. 저장소 클론
   ```bash
   git clone https://github.com/yourusername/korean-ai-companion.git
   cd korean-ai-companion
   ```

2. 의존성 설치
   ```bash
   npm install
   ```

3. 환경 변수 설정
   `.env.example` 파일을 `.env`로 복사하고 필요한 값을 설정합니다.
   ```bash
   cp .env.example .env
   ```

4. 데이터베이스 마이그레이션
   ```bash
   npm run db:push
   ```

5. 개발 서버 실행
   ```bash
   npm run dev
   ```

## 프로젝트 구조

```
KoreanAiCompanion/
├── client/               # 클라이언트 코드
│   ├── src/
│   │   ├── components/   # UI 컴포넌트
│   │   ├── hooks/        # 커스텀 훅
│   │   ├── lib/          # 유틸리티 및 API 클라이언트
│   │   └── pages/        # 페이지 컴포넌트
├── server/               # 서버 코드
├── shared/               # 공유 코드 (스키마 등)
└── migrations/           # 데이터베이스 마이그레이션
```

## 개선 계획

1. **다국어 지원**: 더 많은 언어 지원 추가
2. **음성 인터페이스**: 음성 입력 및 출력 기능
3. **모바일 앱**: 네이티브 모바일 앱 개발
4. **오프라인 모드**: 제한된 기능의 오프라인 지원

## 라이센스

MIT