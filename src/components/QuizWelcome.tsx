
import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Logo from './ui/logo';

interface QuizWelcomeProps {
  onStart: () => void;
}

export const QuizWelcome = ({ onStart }: QuizWelcomeProps) => {
  const [name, setName] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleStart = () => {
    if (name.trim()) {
      login(name.trim());
      localStorage.setItem('userName', name.trim());
      onStart();
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7] flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
        {/* Logo and Progress Bars */}
        <div className="w-full flex flex-col items-center pt-8 px-6">
          <Logo className="h-12 mb-4" />
          <div className="w-24 h-1 rounded bg-brand-gold mb-2" />
          <div className="w-full h-1 bg-[#E5E2DE] rounded">
            <div className="w-1/5 h-1 bg-brand-gold rounded" />
          </div>
        </div>

        {/* Title */}
        <h1 className="font-playfair text-2xl font-bold text-brand-coffee text-center mt-6 mb-4 px-6">
          Teste de Estilo Pessoal
        </h1>

        {/* Main Image - Properly framed */}
        <div className="w-full px-0">
          <img
            src="/lovable-uploads/9f029fbb-cabe-48ef-9877-aad214e94c60.png"
            alt="Mulheres estilosas"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Form */}
        <div className="p-6">
          <form
            onSubmit={e => { e.preventDefault(); handleStart(); }}
            className="w-full flex flex-col items-center"
          >
            <label
              className="block text-brand-coffee text-sm font-medium mb-2 w-full text-left"
              htmlFor="nome"
            >
              NOME <span className="text-brand-gold">*</span>
            </label>
            <Input
              id="nome"
              placeholder="Digite seu nome aqui..."
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full mb-6 bg-[#FAF9F7] border-none focus:ring-2 focus:ring-brand-gold rounded-md placeholder:text-[#8E9196]"
            />
            <Button
              type="submit"
              className="w-full py-3 rounded-md font-medium bg-brand-gold hover:bg-[#aa6b5d] transition-colors text-white"
              disabled={!name.trim()}
            >
              Continuar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
