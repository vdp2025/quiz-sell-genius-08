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
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-6 md:p-10 flex flex-col items-center">
        
        {/* Logo */}
        <img
          src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp"
          alt="Logo Gisele Galvão"
          className="w-40 md:w-48 h-auto mb-2"
        />

        {/* Barra dourada abaixo da logo */}
        <div className="w-24 md:w-32 h-1 bg-[#bb9a65] rounded-full mb-6"></div>

        {/* Título */}
        <h1 className="font-playfair text-2xl md:text-4xl font-bold text-[#432818] text-center mb-4 leading-snug md:leading-tight">
          Teste de Estilo Pessoal
        </h1>

        {/* Imagem com mulheres estilosas */}
        <img
          src="https://res.cloudinary.com/dqljyf76t/image/upload/v1745193445/4fb35a75-02dd-40b9-adae-854e90228675_ibkrmt.webp"
          alt="Mulheres estilosas"
          className="w-full max-w-lg h-auto object-contain mb-6"
        />

        {/* Subtítulo */}
        <p className="text-base md:text-lg text-[#432818] text-center mb-8">
          Em poucos minutos, descubra seu <span className="font-semibold text-[#B89B7A]">Estilo Predominante</span> — 
          e aprenda a montar looks que realmente refletem sua essência, com praticidade e confiança.
        </p>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <label htmlFor="name" className="text-sm font-semibold text-[#432818]">NOME *</label>
          <Input
            id="name"
            placeholder="Digite seu nome aqui..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full"
            autoFocus
          />

          <Button
            type="submit"
            className="w-full bg-[#B89B7A] hover:bg-[#aa6b5d] text-white py-4 text-base md:text-lg rounded-full shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!name.trim()}
          >
            Continuar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default QuizIntro;
