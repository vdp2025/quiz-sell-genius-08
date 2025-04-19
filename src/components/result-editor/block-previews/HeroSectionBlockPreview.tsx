
import React from 'react';
import { StyleResult } from '@/types/quiz';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface HeroSectionBlockPreviewProps {
  content: {
    title?: string;
    subtitle?: string;
    heroImage?: string;
    heroImage2?: string;
    style?: any;
  };
  primaryStyle: StyleResult;
}

const HeroSectionBlockPreview: React.FC<HeroSectionBlockPreviewProps> = ({ content, primaryStyle }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#fff7f3] to-white rounded-2xl" style={content.style}>
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#aa6b5d]/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
      
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 p-8 md:p-12 items-center">
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-[#aa6b5d]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {content.title || 'VOCÊ DESCOBRIU SEU ESTILO'}
          </motion.h2>
          
          <motion.p 
            className="text-xl text-[#1A1818]/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {content.subtitle || 'Agora é hora de aplicar com clareza — e se vestir de você'}
          </motion.p>
          
          <motion.div
            className="bg-white p-4 rounded-lg inline-block shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-2 text-[#aa6b5d]">
              <span>Seu estilo predominante é</span>
              <span className="font-semibold">{primaryStyle.category}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {content.heroImage ? (
            <img
              src={content.heroImage}
              alt="Estilo"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          ) : (
            <div className="bg-gray-100 h-48 flex items-center justify-center rounded-lg">
              <p className="text-gray-400">Adicione uma imagem principal</p>
            </div>
          )}
          
          {content.heroImage2 && (
            <motion.img
              src={content.heroImage2}
              alt="Gisele Galvão"
              className="absolute -bottom-4 -right-4 w-2/3 rounded-lg shadow-xl"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSectionBlockPreview;
