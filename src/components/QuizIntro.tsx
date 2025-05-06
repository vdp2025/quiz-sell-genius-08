'use client';
'use client';
import React, { useEffect, useState } from 'react';

export const QuizIntro: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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
    logoImg.src = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp";
    mainImg.src = "https://res.cloudinary.com/dqljyf76t/image/upload/v1745193439/9a20446f-e01f-48f4-96d0-f4b37cc06625_ebd68o.jpg";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4 py-8">
      <div className={`w-full max-w-3xl bg-white shadow-xl rounded-2xl p-4 md:p-8 flex flex-col items-center transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Logotipo */}
        <img
          loading="lazy"
          src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp"
          alt="Logo Gisele Galvão"
          className="w-32 md:w-40 h-auto mb-2"
          width={160}
          height={80}
        />
        {/* Barra de carregamento dourada animada */}
        <div className="relative w-full max-w-md h-[4px] bg-[#f1e8db] rounded-full overflow-hidden mb-6">
          <div className="absolute inset-0 w-1/3 bg-[#b29670] animate-loading-bar rounded-full"></div>
        </div>
        {/* Título */}
        <h1 className="font-playfair text-xl md:text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6 leading-normal text-gray-950">
          Chega de um guarda-roupa lotado
          <br className="hidden md:block" />
          e da sensação de que nada combina com você.
        </h1>
        {/* Imagem principal com fallback durante carregamento */}
        <div className="relative w-full max-w-xs mb-6">
          {!imagesLoaded && (
            <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg animate-pulse"></div>
          )}
          <img
            loading="lazy"
            alt="Mulher elegante com roupas estilosas"
            className={`w-full max-w-xs h-auto object-cover rounded-lg shadow-sm transition-opacity duration-300 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}
            src="https://res.cloudinary.com/dqljyf76t/image/upload/v1745193439/9a20446f-e01f-48f4-96d0-f4b37cc06625_ebd68o.jpg"
            width={320}
            height={427}
          />
        </div>
        {/* Subtítulo */}
        <p className="text-sm md:text-base lg:text-lg text-black text-center mb-6 max-w-lg">
          Em poucos minutos, descubra seu{' '}
          <span className="font-semibold text-[#B89B7A]">Estilo Predominante</span> — e aprenda a montar
          looks que realmente refletem sua <span className="font-semibold text-[#b29670]">essência</span>, com
          praticidade e <span className="font-semibold text-[#aa6b5d]">confiança</span>.
        </p>
      </div>
    </div>
  );
};

export default QuizIntro;
