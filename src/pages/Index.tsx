
import { useState } from 'react';
import { QuizWelcome } from '../components/QuizWelcome';

const Index = () => {
  const [userName, setUserName] = useState('');
  const [started, setStarted] = useState(false);

  const handleStart = (name: string) => {
    setUserName(name);
    setStarted(true);
  };

  if (!started) {
    return <QuizWelcome onStart={handleStart} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Quiz content will be implemented in the next step */}
    </div>
  );
};

export default Index;
