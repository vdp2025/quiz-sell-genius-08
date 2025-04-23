import React from 'react';
import { Card } from '@/components/ui/card';
import Logo from '../ui/logo';
import { StyleResult } from '@/types/quiz';
import { styleConfig } from '@/config/styleConfig';
import { motion } from 'framer-motion';

interface HeaderProps {
  logo?: string;
  logoAlt?: string;
  title?: string;
  primaryStyle?: StyleResult;
  logoHeight?: number;
}

export const Header: React.FC<HeaderProps> = ({
  logo = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp",
  logoAlt = "Logo Gisele Galvão",
  title = "Olá, seu Estilo Predominante é:",
  primaryStyle,
  logoHeight = 56
}) => {
  const style = primaryStyle?.category ? styleConfig[primaryStyle.category] : null;

  return (
    <Card className="bg-white shadow-sm p-4 mb-4">
      <div className="flex flex-col items-center gap-2">
        <Logo className={`h-[${logoHeight}px]`} style={{ height: `${logoHeight}px` }} />
        
        <div className="text-center mt-2">
          <h1 className="text-xl md:text-2xl font-playfair text-[#432818]">
            {title}
          </h1>

          {primaryStyle && (
            <motion.h2
              className="text-xl font-bold text-[#B89B7A] mt-2"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {primaryStyle.category}
            </motion.h2>
          )}
        </div>

        {style && (
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-4">
            <motion.img 
              src={style.image}
              alt={`Visual do Estilo ${primaryStyle?.category}`}
              className="w-40 h-auto rounded-lg shadow-md"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            />
            <motion.img 
              src={style.guideImage}
              alt={`Guia do Estilo ${primaryStyle?.category}`}
              className="w-40 h-auto rounded-lg shadow-md"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
          </div>
        )}
      </div>
    </Card>
  );
};

export default Header;
