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

        {/* Logo */}
        <img
          src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp"
          alt="Logo Gisele Galvão"
          className="w-40 md:w-48 h-auto mb-2"
        />

        {/* Barra dourada do tamanho da imagem */}
        <div className="h-1 bg-[#b29670] rounded-full mb-6 w-full max-w-lg"></div>

        {/* Título */}
        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-[#b29670] text-center mb-4 leading-tight">
          Chega de um guarda-roupa lotado<br className="hidden md:block" /> e da sensação de que nada combina com você.
        </h1>

        {/* Imagem principal */}
        <img
          src="https://res.cloudinary.com/dqljyf76t/image/upload/v1745193445/4fb35a75-02dd-40b9-adae-854e90228675_ibkrmt.webp"
          alt="Mulher estilosa"
          className="w-full max-w-lg h-auto object-contain mb-6"
        />

        {/* Subtítulo */}
        <p className="text-lg md:text-xl text-[#e9b875] text-center mb-8">
          Em poucos minutos, descubra seu <span className="font-semibold text-[#B89B7A]">Estilo Predominante</span> — 
          e aprenda a montar looks que realmente refletem sua essência, com praticidade e confiança.
          <br /><br />
          <span className="font-medium text-[#aa6b5d]">Comece agora sua evolução de estilo.</span>
        </p>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <label htmlFor="name" className="text-sm font-semibold text-[#432818]">NOME *</label>
          <Input
            id="name"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full"
            autoFocus
          />

          <Button
            type="submit"
            className="
              w-full 
              bg-[#B89B7A] 
              hover:bg-[#aa6b5d] 
              text-white 
              py-5 
              text-lg 
              rounded-full 
              shadow 
              transition-all 
              duration-300 
              ease-in-out 
              transform 
              hover:-translate-y-1 
              hover:shadow-lg 
              active:scale-95 
              disabled:opacity-50 
              disabled:cursor-not-allowed
            "
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
