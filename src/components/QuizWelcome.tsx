
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
    <div className="min-h-screen bg-[#FAF9F7] flex items-center justify-center py-6 md:py-12">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-lg flex flex-col items-center px-6 py-8">
        {/* Logo and Progress Bars */}
        <div className="w-full flex flex-col items-center mb-8">
          <Logo className="h-14 mb-4" />
          <div className="w-32 h-1 rounded bg-brand-gold mb-2" />
          <div className="w-full h-1 bg-[#E5E2DE] rounded">
            <div className="w-1/4 h-1 bg-brand-gold rounded" />
          </div>
        </div>

        {/* Title */}
        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-brand-coffee text-center mb-8">
          Teste de Estilo Pessoal
        </h1>

        {/* Main Image */}
        <div className="w-full mb-10">
          <img
            src="/lovable-uploads/9f029fbb-cabe-48ef-9877-aad214e94c60.png"
            alt="Mulheres estilosas"
            className="w-full object-contain rounded-lg"
          />
        </div>

        {/* Form */}
        <form
          onSubmit={e => { e.preventDefault(); handleStart(); }}
          className="w-full max-w-md flex flex-col items-center"
        >
          <label
            className="block text-brand-coffee text-base font-medium mb-2"
            htmlFor="nome"
          >
            NOME <span className="text-brand-gold">*</span>
          </label>
          <Input
            id="nome"
            placeholder="Digite seu nome aqui..."
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full mb-6 text-lg p-3 bg-[#FAF9F7] border-none focus:ring-2 focus:ring-brand-gold rounded-md placeholder:text-[#8E9196]"
          />
          <Button
            type="submit"
            className="w-full py-4 text-lg rounded-md font-semibold bg-brand-gold hover:bg-[#aa6b5d] transition-colors text-white shadow-md"
            disabled={!name.trim()}
          >
            Continuar
          </Button>
        </form>
      </div>
    </div>
  );
};

