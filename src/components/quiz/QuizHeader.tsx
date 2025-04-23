
import React from 'react';
import { Card } from '@/components/ui/card';
import Logo from '../ui/logo';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

interface QuizHeaderProps {
  progress: number;
  userName?: string;
  logo?: string;
  logoAlt?: string;
  logoHeight?: number;
}

const QuizHeader: React.FC<QuizHeaderProps> = ({
  progress,
  userName = '',
  logo = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp",
  logoAlt = "Logo Gisele Galvão",
  logoHeight = 56
}) => {
  return (
    <Card className="bg-white shadow-sm p-4 mb-4">
      <div className="flex flex-col items-center gap-2">
        <Logo 
          className={`h-[${logoHeight}px]`}
          style={{ height: `${logoHeight}px` }}
        />
        
        <div className="w-full mt-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-[#432818]/70">Progresso</span>
            <span className="text-xs font-medium text-[#432818]/70">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        {userName && (
          <motion.p 
            className="text-sm text-[#432818] mt-2"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Olá, <span className="font-medium">{userName}</span>!
          </motion.p>
        )}
      </div>
    </Card>
  );
};

export default QuizHeader;
