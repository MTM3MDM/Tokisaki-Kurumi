import { useState } from 'react';
import { Chat } from './components/ui/Chat';

function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto p-4">
        <Chat isLoading={isLoading} setIsLoading={setIsLoading} />
      </main>
    </div>
  );
}

export default App; 