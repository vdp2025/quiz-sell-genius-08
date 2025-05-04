import React, { useEffect, useState } from 'react';
import { StyleResult } from '../types/quiz';
import { useAuth } from '../context/AuthContext';
import { ContentContainer } from './shared/ContentContainer';
import { GridLayout } from './shared/GridLayout';
import ResultHeader from './quiz-result/ResultHeader';
import PrimaryStyleCard from './quiz-result/PrimaryStyleCard';
import SecondaryStylesSection from './quiz-result/SecondaryStylesSection';
import OfferCard from './quiz-result/OfferCard';
import { sharedStyles } from '@/styles/sharedStyles';
import { ResultPageConfig } from '@/types/resultPageConfig';
import { cn } from '@/lib/utils';

interface QuizResultProps {
  primaryStyle: StyleResult;
  secondaryStyles: StyleResult[];
  config?: ResultPageConfig;
  previewMode?: boolean;
  onReset?: () => void;
}

const QuizResult: React.FC<QuizResultProps> = ({
  primaryStyle,
  secondaryStyles,
  config: externalConfig,
  previewMode = false,
  onReset
}) => {
  const { user } = useAuth();
  const [userName, setUserName] = useState<string>('Visitante');
  
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

  const [config, setConfig] = useState<ResultPageConfig | null>(null);
  
  useEffect(() => {
    try {
      if (externalConfig) {
        setConfig(externalConfig);
      } else {
        const defaultConfig = {
          primaryStyle: {
            image: styleConfig[primaryStyle.type].image,
            guideImage: styleConfig[primaryStyle.type].guideImage,
            description: styleConfig[primaryStyle.type].description
          },
          secondaryStyles: secondaryStyles.map(style => ({
            image: styleConfig[style.type].image,
            guideImage: styleConfig[style.type].guideImage,
            description: styleConfig[style.type].description
          }))
        };
        setConfig(defaultConfig);
      }
    } catch (error) {
      console.error('Erro ao carregar configuração:', error);
    }
  }, [externalConfig, primaryStyle, secondaryStyles]);

  return (
    <ContentContainer>
      <GridLayout>
        <ResultHeader userName={userName} />
        <PrimaryStyleCard style={config?.primaryStyle} />
        <SecondaryStylesSection styles={config?.secondaryStyles} />
        <OfferCard />
      </GridLayout>
    </ContentContainer>
  );
};

export default QuizResult;