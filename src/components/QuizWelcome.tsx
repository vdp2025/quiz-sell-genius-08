
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

  const goToQuizEditor = () => {
    navigate('/admin/quiz-editor');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7] flex items-center justify-center py-6 md:py-12">
      <div className="w-full max-w-xl mx-auto bg-white shadow-none flex flex-col items-center px-0">
        {/* Logo */}
        <div className="w-full flex flex-col items-center pt-4 pb-2">
          <Logo className="h-14 mb-2" />
          <div className="w-32 h-1 rounded bg-[#B89B7A] mb-2" />
          <div className="w-full h-1 bg-[#E5E2DE] rounded">
            <div className="w-1/4 h-1 bg-[#B89B7A] rounded" />
          </div>
        </div>
        {/* Título */}
        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-[#432818] text-center mt-6 mb-8">
          Teste de Estilo Pessoal
        </h1>
        {/* Imagem central estilosa */}
        <img
          src="/lovable-uploads/9f029fbb-cabe-48ef-9877-aad214e94c60.png"
          alt="Mulheres estilosas"
          className="w-full max-w-lg object-contain mb-10"
          style={{ maxHeight: 180 }}
        />
        {/* Formulário nome */}
        <form
          onSubmit={e => { e.preventDefault(); handleStart(); }}
          className="w-full px-4 flex flex-col items-center"
        >
          <label
            className="block text-[#432818] text-base font-medium mb-1"
            htmlFor="nome"
            style={{ letterSpacing: 0.2 }}
          >
            NOME <span className="text-[#B89B7A]">*</span>
          </label>
          <Input
            id="nome"
            placeholder="Digite seu nome aqui..."
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full mb-5 text-lg p-3 bg-[#ECEAE6] border-none focus:ring-2 focus:ring-[#B89B7A] rounded-md placeholder:text-[#8E9196]"
          />
          <Button
            type="submit"
            className="w-full py-4 text-lg rounded-md font-semibold bg-[#B89B7A] hover:bg-[#aa6b5d] transition-colors text-white shadow"
            disabled={!name.trim()}
          >
            Continuar
          </Button>
          <div className="pt-5 w-full text-center">
            <Button
              onClick={goToQuizEditor}
              variant="outline"
              className="w-full border-[#B89B7A] text-[#B89B7A] hover:bg-[#FAF9F7] mt-2"
              type="button"
            >
              Acessar Editor de Quiz
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

