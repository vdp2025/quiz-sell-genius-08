
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Clock, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface PricingBlockPreviewProps {
  content: {
    regularPrice?: string;
    salePrice?: string;
    buttonText?: string;
    ctaUrl?: string;
    urgencyText?: string;
    installments?: {
      number: number;
      value: string;
    };
    paymentMethods?: string;
    guaranteeText?: string;
    style?: any;
  };
}

const PricingBlockPreview: React.FC<PricingBlockPreviewProps> = ({ content }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn(
        "max-w-2xl mx-auto relative overflow-hidden rounded-2xl",
        "bg-gradient-to-br from-[#fff7f3] to-white",
        "border-2 border-[#aa6b5d] shadow-lg"
      )}
      style={content.style}
    >
      <AnimatePresence>
        {content.urgencyText && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-[#aa6b5d] text-white px-4 py-2 flex items-center justify-center gap-2"
          >
            <Clock className="w-4 h-4 animate-pulse" />
            <p className="text-sm font-medium">{content.urgencyText}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-8 space-y-6">
        <motion.div 
          className="text-center space-y-2"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {content.regularPrice && (
            <motion.div 
              className="opacity-75"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-sm text-[#666]">De</p>
              <p className="text-xl line-through text-[#666]">
                R$ {content.regularPrice}
              </p>
            </motion.div>
          )}
          
          {content.salePrice && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
            >
              <p className="text-sm text-[#aa6b5d] font-medium">Por apenas</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-sm">R$</span>
                <p className="text-5xl font-bold text-[#aa6b5d]">
                  {content.salePrice.split(',')[0]}
                </p>
                <span className="text-xl">,{content.salePrice.split(',')[1] || '00'}</span>
              </div>
            </motion.div>
          )}

          {content.installments && (
            <motion.p 
              className="text-sm text-[#666]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              ou {content.installments.number}x de R$ {content.installments.value}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            className="w-full bg-[#aa6b5d] hover:bg-[#8f574a] text-white p-6 text-lg rounded-xl shadow-lg transition-all duration-300"
            onClick={() => content.ctaUrl && window.open(content.ctaUrl, '_blank')}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            {content.buttonText || 'Comprar Agora'}
          </Button>
        </motion.div>

        {content.paymentMethods && (
          <motion.p 
            className="text-center text-sm text-[#666]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {content.paymentMethods}
          </motion.p>
        )}

        {content.guaranteeText && (
          <motion.div 
            className="flex items-center justify-center gap-2 text-[#666]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <Shield className="w-4 h-4" />
            <p className="text-sm">{content.guaranteeText}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default PricingBlockPreview;
