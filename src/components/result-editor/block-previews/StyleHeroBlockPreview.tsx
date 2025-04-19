
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface StyleHeroBlockPreviewProps {
  content: {
    title?: string;
    subtitle?: string;
    description?: string;
    mainImage?: string;
    style?: any;
  };
  styleType: string;
}

const StyleHeroBlockPreview: React.FC<StyleHeroBlockPreviewProps> = ({ content, styleType }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#fff7f3] to-white rounded-2xl p-8 md:p-12" style={content.style}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-[#aa6b5d]"
            >
              {content.title || `Descubra seu Estilo ${styleType}`}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-[#1A1818]/80"
            >
              {content.subtitle || "Transforme sua imagem e expresse sua verdadeira essência"}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="inline-flex items-center text-[#aa6b5d] font-medium hover:text-[#8f574a] transition-colors"
            >
              <span>Descubra mais</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.div>
          </div>
          
          {content.mainImage && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <img
                src={content.mainImage}
                alt={`Estilo ${styleType}`}
                className="w-full rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default StyleHeroBlockPreview;
