// ...código baseado em ResultPage.tsx, removendo lógica de resultado e mantendo apenas a estrutura visual de introdução...
import React from 'react';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';
import { Header } from '@/components/result/Header';
import BuildInfo from '@/components/BuildInfo';

const QuizIntro2: React.FC = () => {
  const { globalStyles } = useGlobalStyles();

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      backgroundColor: globalStyles.backgroundColor || '#fffaf7',
      color: globalStyles.textColor || '#432818',
      fontFamily: globalStyles.fontFamily || 'inherit'
    }}>
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#B89B7A]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-[#aa6b5d]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      {/* Cabeçalho */}
      <Header logo={globalStyles.logo} logoHeight={globalStyles.logoHeight} logoAlt={globalStyles.logoAlt} />

      {/* Conteúdo principal de introdução */}
      <div className="container mx-auto px-4 py-16 max-w-2xl text-center z-10">
        <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-6 text-[#aa6b5d]">Descubra Seu Estilo Predominante</h1>
        <p className="text-lg text-[#432818] mb-8">Em poucos minutos, conheça o seu estilo predominante e aprenda a montar looks que realmente refletem sua essência, com praticidade e confiança.</p>
        <img
          src="https://res.cloudinary.com/dqljyf76t/image/upload/v1745193439/9a20446f-e01f-48f4-96d0-f4b37cc06625_ebd68o.jpg"
          alt="Mulher elegante com roupas estilosas"
          className="w-full max-w-xs mx-auto rounded-lg shadow-md mb-8"
          width={320}
          height={427}
        />
        <p className="text-base text-[#8F7A6A]">Prepare-se para transformar sua imagem e se vestir com autenticidade!</p>
      </div>

      <BuildInfo />
    </div>
  );
};

export default QuizIntro2;
