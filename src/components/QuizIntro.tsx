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
    <div className="min-h-screen flex items-center justify-center bg-[#FAF9F7] px-4 py-12">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-6 md:p-10 flex flex-col items-center">

        {/* Logo */}
        <img
          src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp"
          alt="Logo Gisele Galvão"
          className="w-36 md:w-44 h-auto mb-2"
        />

        {/* Barra dourada estilo carregamento */}
        <div className="relative w-full max-w-md h-[6px] bg-[#f1e8db] rounded-full overflow-hidden mb-8">
          <div className="absolute inset-0 w-1/3 bg-[#b29670] animate-loading-bar rounded-full"></div>
        </div>

        {/* Título */}
        <h1 className="font-playfair text-2xl md:text-3xl font-bold text-black text-center mb-4 leading-snug">
          Chega de um guarda-roupa lotado<br className="hidden md:block" /> e da sensação de que nada combina com você.
        </h1>

        {/* Imagem principal */}
        <img
          src="https://res.cloudinary.com/dqljyf76t/image/upload/v1745193445/4fb35a75-02dd-40b9-adae-854e90228675_ibkrmt.webp"
          alt="Mulher estilosa"
          className="w-full max-w-md h-auto object-contain mb-6"
        />

        {/* Subtítulo com destaques */}
        <p className="text-base md:text-lg text-black text-center mb-8 px-2">
          Em poucos minutos, descubra seu <span className="font-semibold text-[#B89B7A]">Estilo Predominante</span> — 
          e aprenda a montar looks que realmente refletem sua <span className="font-semibold text-[#b29670]">essência</span>, com praticidade e <span className="font-semibold text-[#aa6b5d]">confiança</span>.
        </p>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-3">
          <label htmlFor="name" className="text-sm font-semibold text-[#432818]">NOME *</label>
          <Input
            id="name"
            placeholder="Digite seu nome aqui..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full"
            autoFocus
          />

          {/* Botão com efeito aprimorado */}
          <Button
            type="submit"
            className="
              w-full 
              bg-[#B89B7A] 
              hover:bg-[#aa6b5d] 
              text-white 
              py-4 
              text-base 
              rounded-full 
              shadow-md 
              hover:shadow-xl 
              transition-all 
              duration-300 
              ease-in-out 
              transform 
              hover:-translate-y-[2px] 
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
