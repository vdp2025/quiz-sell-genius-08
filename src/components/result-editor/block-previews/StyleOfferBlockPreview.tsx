
import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Award, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StyleOfferBlockPreviewProps {
  content: {
    title?: string;
    subtitle?: string;
    price?: string;
    regularPrice?: string;
    ctaText?: string;
    ctaUrl?: string;
    features?: string[];
    bonuses?: string[];
    productImage?: string;
    urgencyText?: string;
    style?: any;
  };
}

const StyleOfferBlockPreview: React.FC<StyleOfferBlockPreviewProps> = ({ content }) => {
  const defaultFeatures = [
    "Descubra seu estilo único e autêntico",
    "Aprenda a criar looks impactantes",
    "Aumente sua autoestima e confiança",
    "Economize tempo e dinheiro"
  ];

  const defaultBonuses = [
    "Guia de Visagismo Digital",
    "Cartela de Cores Personalizada",
    "Acesso ao Grupo VIP"
  ];

  return (
    <div className="bg-gradient-to-br from-[#fff7f3] to-white rounded-2xl p-8 md:p-12 shadow-xl" style={content.style}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        {content.urgencyText && (
          <div className="bg-[#aa6b5d] text-white px-4 py-2 rounded-full flex items-center justify-center gap-2 mb-8 animate-pulse">
            <Timer className="w-4 h-4" />
            <p className="text-sm font-medium">{content.urgencyText}</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-[#aa6b5d]">
                {content.title || "Transforme Seu Estilo Hoje"}
              </h2>
              <p className="text-xl text-[#1A1818]/80">
                {content.subtitle || "Descubra o poder de um visual autêntico e impactante"}
              </p>
            </div>

            <div className="space-y-4">
              {(content.features || defaultFeatures).map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <Star className="w-5 h-5 text-[#aa6b5d] flex-shrink-0 mt-1" />
                  <p className="text-[#1A1818]/80">{feature}</p>
                </motion.div>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#aa6b5d] flex items-center gap-2">
                <Award className="w-5 h-5" />
                Bônus Exclusivos
              </h3>
              {(content.bonuses || defaultBonuses).map((bonus, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 rounded-full bg-[#aa6b5d]" />
                  <p className="text-[#1A1818]/80">{bonus}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            {content.productImage && (
              <motion.img
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                src={content.productImage}
                alt="Produto"
                className="w-full rounded-lg shadow-xl mb-8"
              />
            )}

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-center space-y-4 mb-6">
                <p className="text-sm text-[#1A1818]/60">
                  <span className="line-through">R$ {content.regularPrice || "197,00"}</span>
                </p>
                <div className="flex items-baseline justify-center">
                  <span className="text-sm text-[#aa6b5d]">R$</span>
                  <p className="text-4xl font-bold text-[#aa6b5d] mx-1">
                    {content.price || "97"}
                  </p>
                  <span className="text-sm text-[#aa6b5d]">,00</span>
                </div>
                <p className="text-sm text-[#1A1818]/60">
                  ou 12x de R$ {((Number(content.price || "97") / 12)).toFixed(2)}
                </p>
              </div>

              <Button 
                className="w-full bg-[#aa6b5d] hover:bg-[#8f574a] text-white py-6 rounded-xl text-lg shadow-lg transition-all duration-300 hover:scale-105"
                onClick={() => content.ctaUrl && window.open(content.ctaUrl, '_blank')}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {content.ctaText || "Quero Transformar Meu Estilo"}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StyleOfferBlockPreview;
