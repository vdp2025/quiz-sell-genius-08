import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface QuizIntroProps {
  onStart: (name: string) => void;
}

export const QuizIntro: React.FC<QuizIntroProps> = ({ onStart }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF9F7] px-4 py-10">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-6 md:p-10 flex flex-col items-center">
        <img
          src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.webp"
          alt="Mulher perdida com guarda-roupa bagunçado"
          className="w-full rounded-xl mb-6 object-cover object-center max-h-[320px]"
        />

        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-[#aa6b5d] text-center mb-4 leading-tight">
          Teste de Estilo Pessoal
        </h1>

        <p className="text-lg md:text-xl text-[#432818] text-center mb-6">
          Descubra qual estilo traduz sua essência<br /> e organize seu guarda-roupa com propósito.
        </p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <Input
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full"
            autoFocus
          />

          <Button
            type="submit"
            className="w-full bg-[#B89B7A] hover:bg-[#aa6b5d] text-white py-5 text-lg rounded-full shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!name.trim()}
          >
            Começar agora
          </Button>
        </form>
      </div>
    </div>
  );
};

export default QuizIntro;
