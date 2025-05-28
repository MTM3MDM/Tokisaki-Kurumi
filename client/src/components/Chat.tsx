import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import ReactMarkdown from 'react-markdown';
import React from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// 임시 프로필 사진 경로 (실제 이미지 경로로 변경 필요)
const BOT_PROFILE_IMAGE_URL = '/tokisaki_kurumi.jpg'; // client/public 폴더에 이미지를 넣었다면 이렇게 사용 가능

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Vercel 배포에 맞춰 상대 경로 사용
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [...messages, { role: 'user', content: userMessage }] }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: '오류가 발생했습니다: ' + (data.error || response.statusText) }]);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: '서버와 통신 중 오류가 발생했습니다.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto p-6 bg-gray-900 text-gray-100 shadow-lg rounded-xl">
      <div className="h-[600px] flex flex-col">
        <div className="flex-1 overflow-y-auto mb-6 space-y-6 pr-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start items-start'}`}
            >
              {message.role === 'assistant' && (
                <img 
                  src={BOT_PROFILE_IMAGE_URL} 
                  alt="Bot Profile" 
                  className="w-8 h-8 rounded-full mr-3"
                />
              )}
              <div
                className={`max-w-[75%] rounded-xl p-4 ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white ml-10'
                    : 'bg-gray-800 text-gray-100 mr-10'
                }`}
              >
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start items-start">
               <img 
                src={BOT_PROFILE_IMAGE_URL} 
                alt="Bot Profile" 
                className="w-8 h-8 rounded-full mr-3"
              />
              <div className="max-w-[75%] rounded-xl p-4 bg-gray-800 text-gray-100 mr-10">
                봇이 입력 중...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="flex gap-4 pt-4 border-t border-gray-700">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="메시지를 입력하세요..."
            disabled={isLoading}
            className="flex-1 p-3 rounded-lg bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
          />
          <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6">
            {isLoading ? '전송 중...' : '전송'}
          </Button>
        </form>
      </div>
    </Card>
  );
} 