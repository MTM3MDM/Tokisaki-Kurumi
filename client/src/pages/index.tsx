import { Chat } from '../components/Chat';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">한국어 AI 동반자</h1>
        <Chat />
      </div>
    </main>
  );
} 