
import React, { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { StyleResult } from '../types/quiz';
import { useAuth } from '../context/AuthContext';
import ResultHeader from './quiz-result/ResultHeader';
import PrimaryStyleCard from './quiz-result/PrimaryStyleCard';
import SecondaryStylesSection from './quiz-result/SecondaryStylesSection';
import OfferCard from './quiz-result/OfferCard';
import { ResultPageConfig, OfferContent } from '@/types/resultPageConfig';

interface QuizResultProps {
  primaryStyle: StyleResult;
  secondaryStyles: StyleResult[];
  config?: any; // Added config prop that was missing
  previewMode?: boolean; // Added previewMode prop that was missing
}

const QuizResult: React.FC<QuizResultProps> = ({
  primaryStyle,
  secondaryStyles,
  config: externalConfig,
  previewMode = false
}) => {
  const { user } = useAuth();
  const [userName, setUserName] = useState<string>('Visitante');
  const [config, setConfig] = useState<ResultPageConfig | null>(null);
  
  // Load personalized settings or use provided external config
  useEffect(() => {
    try {
      if (externalConfig) {
        setConfig(externalConfig);
      } else {
        const configKey = `quiz_result_config_${primaryStyle.category}`;
        const savedConfig = localStorage.getItem(configKey);
        
        if (savedConfig) {
          setConfig(JSON.parse(savedConfig));
          console.log("Loaded config from localStorage:", configKey);
        } else {
          console.log("No saved config found for:", primaryStyle.category);
          setConfig(null);
        }
      }
    } catch (error) {
      console.error('Error loading custom settings:', error);
      setConfig(null);
    }
  }, [primaryStyle.category, externalConfig]);

  useEffect(() => {
    if (user && user.userName) {
      setUserName(user.userName);
    } else {
      const storedName = localStorage.getItem('userName');
      if (storedName) {
        setUserName(storedName);
      }
    }
  }, [user]);

  // Apply global styles if available
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
    console.error('Missing required props:', { primaryStyle, secondaryStyles });
    return <div>Erro ao carregar os resultados. Por favor, refaça o quiz.</div>;
  }

  // If configuration hasn't loaded yet, show default version
  if (!config) {
    return (
      <div className={`min-h-screen bg-[#fffaf7] ${previewMode ? 'max-h-screen overflow-auto' : ''}`}>
        <div className="max-w-4xl mx-auto p-6">
          <ResultHeader userName={userName} />
          
          <Card className="p-6 bg-white shadow-md border border-[#B89B7A]/20 mb-8">
            <PrimaryStyleCard primaryStyle={primaryStyle} />
            <SecondaryStylesSection secondaryStyles={secondaryStyles} />
          </Card>

          <OfferCard 
            primaryStyle={primaryStyle} 
            config={{}}
          />
        </div>
      </div>
    );
  }

  // Version with custom configurations
  return (
    <div 
      className={`min-h-screen ${previewMode ? 'max-h-screen overflow-auto' : ''}`}
      style={{
        ...applyGlobalStyles(),
        backgroundColor: 'var(--background-color)',
        color: 'var(--text-color)',
        fontFamily: 'var(--font-family)',
      }}
    >
      <div className="max-w-4xl mx-auto p-6">
        {config.header?.visible !== false && (
          <div style={config.header?.style}>
            <ResultHeader 
              userName={userName}
              customTitle={config.header?.content?.title} 
            />
          </div>
        )}
        
        {config.mainContent?.visible !== false && (
          <Card 
            className="mb-8"
            style={{
              ...config.mainContent?.style,
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
          >
            <PrimaryStyleCard 
              primaryStyle={primaryStyle} 
              customDescription={config.mainContent?.content?.description}
              customImage={config.mainContent?.content?.customImage}
            />
            
            {config.secondaryStyles?.visible !== false && (
              <div style={config.secondaryStyles?.style}>
                <SecondaryStylesSection 
                  secondaryStyles={secondaryStyles} 
                />
              </div>
            )}
          </Card>
        )}

        {config.offer?.hero?.visible !== false && (
          <OfferCard 
            primaryStyle={primaryStyle} 
            config={config.offer?.hero?.content as OfferContent || {}} 
          />
        )}
      </div>
    </div>
  );
};

export default QuizResult;
