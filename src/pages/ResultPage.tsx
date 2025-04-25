import React, { useEffect, useState } from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';
import { Header } from '@/components/result/Header';
import { styleConfig } from '@/config/styleConfig';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Shield, CheckCircle } from 'lucide-react';
import SecondaryStylesSection from '@/components/quiz-result/SecondaryStylesSection';

const ResultPage: React.FC = () => {
  // 1. Estado para dados editados
  const [editedResult, setEditedResult] = useState(null);

  // 2. Hooks originais
  const { primaryStyle, secondaryStyles, quizResult } = useQuiz();
  const { globalStyles } = useGlobalStyles();

  // 3. Carregar do localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("quizData") || "null");
    if (saved && saved.resultado && saved.resultado.titulo) {
      setEditedResult(saved.resultado);
    }
    window.scrollTo(0, 0);
    console.log("ResultPage mounted. Quiz result:", quizResult);
  }, [quizResult]);

  // 4. Se não houver resultado, mostra mensagem padrão
  if (!primaryStyle && !editedResult) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-playfair text-[#432818] mb-4">
            Resultados não encontrados
          </h1>
          <p className="text-[#8F7A6A] mb-6">
            Parece que você ainda não completou o quiz.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-[#B89B7A] hover:bg-[#8F7A6A] text-white rounded-md transition-colors"
          >
            Fazer o Quiz
          </a>
        </div>
      </div>
    );
  }

  // 5. Se houver resultado editado, renderiza ele
  if (editedResult) {
    return (
      <div
        className="min-h-screen bg-[#fffaf7]"
        style={{
          backgroundColor: globalStyles.backgroundColor || '#fffaf7',
          color: globalStyles.textColor || '#432818',
          fontFamily: globalStyles.fontFamily || 'inherit',
        }}
      >
        <Header
          primaryStyle={primaryStyle}
          logoHeight={globalStyles.logoHeight}
          logo={globalStyles.logo}
          logoAlt={globalStyles.logoAlt}
        />

        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-2">
                  {editedResult.titulo}
                </h2>
                <p className="text-[#432818] leading-relaxed">{editedResult.descricao}</p>
                {editedResult.oferta && (
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-[#B89B7A]/10">
                    <h3 className="text-lg font-medium text-[#432818] mb-2">
                      Oferta Especial
                    </h3>
                    <p>{editedResult.oferta}</p>
                  </div>
                )}
              </div>
              <div>
                {editedResult.imagem && (
                  <img
                    src={editedResult.imagem}
                    alt="Imagem do resultado"
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // 6. Se não houver edição, renderiza o fluxo padrão
  const { category } = primaryStyle;
  const { image, guideImage, description } = styleConfig[category] || {
    image: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp",
    guideImage: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.webp",
    description: "Descrição não disponível para este estilo."
  };

  return (
    // ... (todo o seu código original permanece aqui)
    // ... existing code ...
  );
};

export default ResultPage;