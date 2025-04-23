
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
    <div className="min-h-screen flex items-center justify-center bg-[#FAF9F7] px-4 py-8">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-4 md:p-8 flex flex-col items-center">
        {/* Logo */}
        <img
          src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp"
          alt="Logo Gisele Galvão"
          className="w-32 md:w-40 h-auto mb-2"
        />

        {/* Barra de carregamento dourada animada */}
        <div className="relative w-full max-w-md h-[4px] bg-[#f1e8db] rounded-full overflow-hidden mb-6">
          <div className="absolute inset-0 w-1/3 bg-[#b29670] animate-loading-bar rounded-full"></div>
        </div>

        {/* Título */}
        <h1 className="font-playfair text-xl md:text-2xl font-bold text-[#b29670] text-center mb-4 leading-snug">
          Chega de um guarda-roupa lotado<br className="hidden md:block" /> e da sensação de que nada combina com você.
        </h1>

        {/* Imagem principal - Antes e Depois */}
        <div className="w-full max-w-md mb-6 relative">
          <img
            src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446"
            alt="Transformação de estilo: antes e depois"
            className="w-full h-auto object-cover rounded-lg shadow-sm"
          />
          <div className="absolute top-2 left-2 bg-[#b29670] text-white px-3 py-1 rounded-full text-sm">
            Antes & Depois
          </div>
        </div>

        {/* Subtítulo com destaque */}
        <p className="text-sm md:text-base text-black text-center mb-6 max-w-lg">
          Em poucos minutos, descubra seu <span className="font-semibold text-[#B89B7A]">Estilo Predominante</span> — 
          e aprenda a montar looks que realmente refletem sua <span className="font-semibold text-[#b29670]">essência</span>, com praticidade e <span className="font-semibold text-[#aa6b5d]">confiança</span>.
        </p>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-3">
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
              py-4 
              text-base 
              rounded-md 
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
