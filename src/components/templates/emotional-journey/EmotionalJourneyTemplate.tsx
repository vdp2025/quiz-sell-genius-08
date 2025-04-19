
import React from 'react';
import { StyleResult } from '@/types/quiz';
import { HeroSection } from './sections/HeroSection';
import { StorySection } from './sections/StorySection';
import { TransformationSection } from './sections/TransformationSection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { Card } from '@/components/ui/card';

interface EmotionalJourneyTemplateProps {
  primaryStyle: StyleResult;
  secondaryStyles: StyleResult[];
}

const EmotionalJourneyTemplate: React.FC<EmotionalJourneyTemplateProps> = ({
  primaryStyle,
  secondaryStyles
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F2FCE2] to-[#E5DEFF]">
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-16">
        <HeroSection primaryStyle={primaryStyle} />
        <StorySection primaryStyle={primaryStyle} />
        <TransformationSection />
        <TestimonialsSection />
      </div>
    </div>
  );
};

export default EmotionalJourneyTemplate;
