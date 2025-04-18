import React, { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { StyleResult } from '../types/quiz';
import { useAuth } from '../context/AuthContext';
import ResultHeader from './quiz-result/ResultHeader';
import PrimaryStyleCard from './quiz-result/PrimaryStyleCard';
import SecondaryStylesSection from './quiz-result/SecondaryStylesSection';
import OfferCard from './quiz-result/sales/OfferCard';
import { resultPageStorage } from '@/services/resultPageStorage';
import { ResultPageConfig } from '@/types/resultPageConfig';

interface QuizResultProps {
  primaryStyle: StyleResult;
  secondaryStyles: StyleResult[];
}

const QuizResult: React.FC<QuizResultProps> = ({
  primaryStyle,
  secondaryStyles
}) => {
  console.log('Rendering QuizResult with:', {
    primaryStyle,
    secondaryStyles
  });
  
  const { user } = useAuth();
  const [userName, setUserName] = useState<string>('Visitante');
  const [config, setConfig] = useState<ResultPageConfig | null>(null);
  
  // Carregar configurações personalizadas
  useEffect(() => {
    try {
      const savedConfig = resultPageStorage.load(primaryStyle.category);
      if (savedConfig) {
        setConfig(savedConfig);
      }
    } catch (error) {
      console.error('Erro ao carregar configurações personalizadas:', error);
      setConfig(null);
    }
  }, [primaryStyle.category]);

  useEffect(() => {
    if (user && user.userName) {
      setUserName(user.userName);
      console.log("Setting name from auth context:", user.userName);
    } else {
      const storedName = localStorage.getItem('userName');
      if (storedName) {
        setUserName(storedName);
        console.log("Setting name from localStorage:", storedName);
      }
    }
  }, [user]);

  // Get offer config from local storage or use default
  const [offerConfig, setOfferConfig] = useState(() => {
    try {
      const saved = localStorage.getItem(`offer_config_${primaryStyle.category}`);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Error loading offer config:', error);
      return null;
    }
  });

  // Aplicar estilos globais se disponíveis
  const applyGlobalStyles = () => {
    if (config?.globalStyles) {
      const styles = {
        '--primary-color': config.globalStyles.primaryColor || '#aa6b5d',
        '--secondary-color': config.globalStyles.secondaryColor || '#432818',
        '--text-color': config.globalStyles.textColor || '#1A1818',
        '--background-color': config.globalStyles.backgroundColor || '#fffaf7',
        '--font-family': config.globalStyles.fontFamily || "'Playfair Display', serif",
      } as React.CSSProperties;
      
      return styles;
    }
    return {};
  };

  if (!primaryStyle || !secondaryStyles) {
    console.error('Missing required props:', {
      primaryStyle,
      secondaryStyles
    });
    return <div>Erro ao carregar os resultados. Por favor, refaça o quiz.</div>;
  }

  // Se ainda não carregou as configurações, mostra versão padrão
  if (!config) {
    return (
      <div className="min-h-screen bg-[#fffaf7]">
        <div className="max-w-4xl mx-auto">
          <ResultHeader userName={userName} />
          
          <Card className="p-6 bg-white shadow-md border border-[#B89B7A]/20 mb-8">
            <PrimaryStyleCard primaryStyle={primaryStyle} />
            <SecondaryStylesSection secondaryStyles={secondaryStyles} />
          </Card>

          <OfferCard 
            primaryStyle={primaryStyle} 
            config={offerConfig}
          />
        </div>
      </div>
    );
  }

  // Versão com configurações personalizadas
  return (
    <div 
      className="min-h-screen" 
      style={{
        ...applyGlobalStyles(),
        backgroundColor: 'var(--background-color)',
        color: 'var(--text-color)',
        fontFamily: 'var(--font-family)',
      }}
    >
      <div className="max-w-4xl mx-auto">
        {config.header.visible && (
          <div style={config.header.style}>
            <ResultHeader 
              userName={userName}
              customTitle={config.header.content.title} 
            />
          </div>
        )}
        
        {config.mainContent.visible && (
          <Card 
            className="mb-8"
            style={{
              ...config.mainContent.style,
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
          >
            <PrimaryStyleCard 
              primaryStyle={primaryStyle} 
              customDescription={config.mainContent.content.description}
              customImage={config.mainContent.content.customImage}
            />
            
            {config.secondaryStyles.visible && (
              <div style={config.secondaryStyles.style}>
                <SecondaryStylesSection 
                  secondaryStyles={secondaryStyles} 
                />
              </div>
            )}
          </Card>
        )}

        <OfferCard 
          primaryStyle={primaryStyle} 
          config={config.offer.hero.content} 
        />
      </div>
    </div>
  );
};

export default QuizResult;
