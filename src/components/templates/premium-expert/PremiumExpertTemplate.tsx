
import React from 'react';
import { StyleResult } from '@/types/quiz';
import { HeroSection } from './sections/HeroSection';
import { ExpertiseSection } from './sections/ExpertiseSection';
import { MethodologySection } from './sections/MethodologySection';

interface PremiumExpertTemplateProps {
  primaryStyle: StyleResult;
  secondaryStyles: StyleResult[];
}

const PremiumExpertTemplate: React.FC<PremiumExpertTemplateProps> = ({
  primaryStyle,
  secondaryStyles
}) => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection primaryStyle={primaryStyle} />
      <ExpertiseSection primaryStyle={primaryStyle} />
      <MethodologySection />
    </div>
  );
};

export default PremiumExpertTemplate;
