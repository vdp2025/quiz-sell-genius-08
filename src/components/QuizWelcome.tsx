
import { useState } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useAuth } from '../context/AuthContext';

interface QuizWelcomeProps {
  onStart: () => void;
}

export const QuizWelcome = ({ onStart }: QuizWelcomeProps) => {
  const [name, setName] = useState('');
  const { login } = useAuth();

  const handleStart = () => {
    if (name.trim()) {
      login(name.trim());
      onStart();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF9F7] p-4">
      <Card className="w-full max-w-2xl p-8 space-y-6 bg-white shadow-md">
        <div className="text-center space-y-4">
          <img
            src="/lovable-uploads/ce883c46-80e0-4171-9c2d-9288f44f88eb.png"
            alt="Logo Gisele Galvão"
            className="h-16 mx-auto mb-8"
          />
          <h1 className="font-playfair text-4xl font-semibold text-[#432818]">
            Teste de Estilo Pessoal
          </h1>
          <p className="text-lg text-[#1A1818]/80">
            Descubra seu estilo único e aprenda a se vestir com mais confiança
          </p>
        </div>
        <div className="space-y-4">
          <Input
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full text-lg p-4 bg-white border-[#B89B7A]/30"
          />
          <Button
            onClick={handleStart}
            disabled={!name.trim()}
            className="w-full bg-[#B89B7A] hover:bg-[#B89B7A]/90 text-white py-6 text-lg rounded-full"
          >
            Começar
          </Button>
        </div>
      </Card>
    </div>
  );
};
