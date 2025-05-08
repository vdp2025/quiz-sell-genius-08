'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import OptimizedImage from './ui/OptimizedImage';
interface QuizIntroProps {
  onStart: (nome: string) => void;
}
export const QuizIntro: React.FC<QuizIntroProps> = ({
  onStart
}) => {
  const [nome, setNome] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Reduced loading time from 1000ms to 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Preload critical images
  useEffect(() => {
    const logoImg = new Image();
    const mainImg = new Image();
    let loadedCount = 0;
    const totalImages = 2;
    const handleImageLoad = () => {
      loadedCount += 1;
      if (loadedCount === totalImages) {
        setImagesLoaded(true);
      }
    };
    logoImg.onload = handleImageLoad;
    mainImg.onload = handleImageLoad;

    // Preload most important images
    logoImg.src = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp";
    mainImg.src = "https://res.cloudinary.com/dqljyf76t/image/upload/v1745193439/9a20446f-e01f-48f4-96d0-f4b37cc06625_ebd68o.jpg";
  }, []);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nome.trim()) {
      onStart(nome);
    }
  };
  return <div className="min-h-screen flex items-center justify-center bg-[#FEFEFE] px-4 py-0">
      <div className={`w-full max-w-3xl bg-[#FEFEFE] shadow-lg rounded-2xl p-4 md:p-8 flex flex-col items-center transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Logotipo */}
        <OptimizedImage src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp" alt="Logo Gisele Galvão" className="w-32 md:w-40 h-auto mb-2" width={160} height={80} priority={true} />

        {/* Barra de carregamento dourada animada */}
        <div className="relative w-full max-w-md h-[4px] bg-[#f1e8db] rounded-full overflow-hidden mb-6">
          <div className="absolute inset-0 w-1/3 bg-[#b29670] animate-loading-bar rounded-full"></div>
        </div>

        {/* Título */}
        <h1 className="font-playfair text-xl md:text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6 leading-normal text-[#432818]">
          Chega de um guarda-roupa lotado
          <br className="hidden md:block" />
          e da sensação de que nada combina com você.
        </h1>

        {/* Imagem principal com OptimizedImage */}
        <OptimizedImage src="https://res.cloudinary.com/dqljyf76t/image/upload/v1745193439/9a20446f-e01f-48f4-96d0-f4b37cc06625_ebd68o.jpg" alt="Mulher elegante com roupas estilosas" className="w-full max-w-xs h-auto mb-6 rounded-lg shadow-sm" width={320} height={427} objectFit="cover" priority={true} />

        {/* Subtítulo */}
        <p className="text-sm md:text-base text-[#433830] text-center mb-6 max-w-lg lg:text-lg my-[22px]">
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
          <Input id="name" placeholder="Digite seu nome" value={nome} onChange={e => setNome(e.target.value)} autoFocus aria-required="true" className="w-full p-2 border-[#b29670] focus:border-[#a1835d] focus:ring-[#a1835d] bg-[#FEFEFE]" />
          <Button type="submit" disabled={!nome.trim()} className="w-full bg-[#b29670] hover:bg-[#a1835d] text-white py-4 shadow-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#b29670] focus:ring-offset-2 mt-2 text-sm font-semibold rounded-md">
            Quero Descobrir meu Estilo Agora!
          </Button>
          <p className="text-center text-gray-500 mt-2 text-xs">
            Ao clicar, você concorda com nossa política de privacidade
          </p>
        </form>
      </div>
    </div>;
};
export default QuizIntro;