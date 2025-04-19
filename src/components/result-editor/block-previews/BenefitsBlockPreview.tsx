
import React from 'react';
import { Check, CheckCircle, CircleCheck, BadgeCheck, Star, Award, Shield, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface BenefitsBlockPreviewProps {
  content: {
    title?: string;
    items?: string[];
    useIcons?: boolean;
    icon?: string;
    iconColor?: string;
    style?: any;
  };
}

const BenefitsBlockPreview: React.FC<BenefitsBlockPreviewProps> = ({ content }) => {
  const renderIcon = (iconName: string) => {
    const iconColor = content.iconColor || '#aa6b5d';
    const iconProps = { size: 24, color: iconColor };
    
    switch (iconName) {
      case 'check-circle':
        return <CheckCircle {...iconProps} />;
      case 'circle-check':
        return <CircleCheck {...iconProps} />;
      case 'badge-check':
        return <BadgeCheck {...iconProps} />;
      case 'star':
        return <Star {...iconProps} />;
      case 'award':
        return <Award {...iconProps} />;
      case 'shield':
        return <Shield {...iconProps} />;
      case 'sparkles':
        return <Sparkles {...iconProps} />;
      case 'check':
      default:
        return <Check {...iconProps} />;
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div
      className="max-w-4xl mx-auto p-8 rounded-2xl bg-gradient-to-br from-[#fff7f3] to-white"
      style={content.style}
    >
      <h3 className="text-2xl md:text-3xl font-playfair font-bold text-[#aa6b5d] text-center mb-8">
        {content.title || 'Benefícios'}
      </h3>
      
      <motion.div 
        className="grid md:grid-cols-2 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {(content.items || [
          'Aplicar seus estilos com autenticidade',
          'Montar looks práticos para o dia a dia',
          'Usar cores e modelagens que valorizam você',
          'Parar de errar nas compras e economizar'
        ]).map((item, index) => (
          <motion.div
            key={index}
            className="flex items-start gap-4 p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
            variants={itemVariant}
          >
            <div className="flex-shrink-0 mt-1">
              {content.useIcons !== false ? (
                renderIcon(content.icon || 'check')
              ) : (
                <span className="text-[#aa6b5d] text-2xl">✓</span>
              )}
            </div>
            <p className="text-[#1A1818]/80 text-lg">{item}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default BenefitsBlockPreview;
