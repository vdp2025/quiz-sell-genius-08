import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface QuizIntroProps {
  onStart: (nome: string) => void;
}

export const QuizIntro: React.FC<QuizIntroProps> = ({ onStart }) => {
  const [nome, setNome] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nome.trim()) {
      onStart(nome);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4 py-8">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-4 md:p-8 flex flex-col items-center">
        {/* Logotipo */}
        <img
          loading="lazy"
          src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp"
          alt="Logo Gisele Galvão"
          className="w-32 md:w-40 h-auto mb-2"
        />

        {/* Barra de carregamento dourada animada */}
        <div className="relative w-full max-w-md h-[4px] bg-[#f1e8db] rounded-full overflow-hidden mb-6">
          <div className="absolute inset-0 w-1/3 bg-[#b29670] animate-loading-bar rounded-full"></div>
        </div>

        {/* Título */}
        <h1 className="font-playfair text-xl md:text-2xl font-bold text-center mb-6 leading-normal text-gray-950">
          Chega de um guarda-roupa lotado
          <br className="hidden md:block" />
          e da sensação de que nada combina com você.
        </h1>

        {/* Imagem principal */}
        <img
          loading="lazy"
          alt="Mulher elegante com roupas estilosas"
          className="w-full max-w-xs h-auto object-cover mb-6 rounded-lg shadow-sm"
          src="https://res.cloudinary.com/dqljyf76t/image/upload/v1745193439/9a20446f-e01f-48f4-96d0-f4b37cc06625_ebd68o.jpg"
        />

        {/* Subtítulo */}
        <p className="text-sm md:text-base text-black text-center mb-6 max-w-lg">
          Em poucos minutos, descubra seu{' '}
          <span className="font-semibold text-[#B89B7A]">Estilo Predominante</span> — e aprenda a montar
          looks que realmente refletem sua <span className="font-semibold text-[#b29670]">essência</span>, com
          praticidade e <span className="font-semibold text-[#aa6b5d]">confiança</span>.
        </p>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-3" aria-live="polite">
          <label htmlFor="name" className="text-sm font-semibold text-[#432818]">
            NOME *
          </label>
          <Input
            id="name"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full"
            autoFocus
          />
          <Button
            type="submit"
            className="w-full bg-[#b29670] hover:bg-[#a1835d] text-white py-4 text-base rounded-md shadow transition-all duration-500 ease-in-out animate-pulse focus:outline-none focus:ring-2 focus:ring-[#b29670] focus:ring-offset-2"
            disabled={!nome.trim()}
          >
            Quero descobrir meu estilo agora
          </Button>
        </form>
      </div>
    </div>
  );
};

export default QuizIntro;
