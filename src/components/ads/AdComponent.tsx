import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface AdComponentProps {
  adUnitId: string;
  className?: string;
  format?: 'banner' | 'rectangle' | 'native';
}

const AdComponent: React.FC<AdComponentProps> = ({
  adUnitId,
  className = '',
  format = 'rectangle'
}) => {
  const [isAdLoaded, setIsAdLoaded] = useState(false);
  const adRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  useEffect(() => {
    // Só carrega o anúncio quando estiver próximo de entrar na viewport
    if (inView && !isAdLoaded) {
      // Aqui você pode integrar com sua plataforma de anúncios
      // Por exemplo, Google AdSense, Facebook Audience Network, etc.
      
      // Simulação de carregamento de anúncio
      const timer = setTimeout(() => {
        setIsAdLoaded(true);
        console.log(`Ad ${adUnitId} loaded`);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [inView, adUnitId, isAdLoaded]);
  
  const formatClasses = {
    banner: 'h-16 md:h-20',
    rectangle: 'h-60 md:h-80',
    native: 'h-auto'
  };
  
  return (
    <div 
      ref={ref} 
      className={`w-full ${formatClasses[format]} bg-gray-100 rounded-lg overflow-hidden ${className}`}
    >
      {inView ? (
        <div ref={adRef} id={`ad-container-${adUnitId}`} className="w-full h-full">
          {!isAdLoaded && (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-sm text-gray-400">Carregando anúncio...</p>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-sm text-gray-400">Espaço reservado para anúncio</p>
        </div>
      )}
    </div>
  );
};

export default AdComponent;