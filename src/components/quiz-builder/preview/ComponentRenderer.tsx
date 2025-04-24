
import React from 'react';
import { QuizComponentData } from '@/types/quizBuilder';
import { cn } from '@/lib/utils';
import HeaderComponent from '../components/HeaderComponent';
import TextComponent from '../components/TextComponent';
import ImageComponent from '../components/ImageComponent';
import MultipleChoiceComponent from '../components/MultipleChoiceComponent';
import QuizResultComponent from '../components/QuizResultComponent';
import BenefitsListComponent from '../components/BenefitsListComponent';
import SingleChoiceComponent from '../components/SingleChoiceComponent';

interface ComponentRendererProps {
  component: QuizComponentData;
  isEditing: boolean;
  isSelected: boolean;
}

const ComponentRenderer: React.FC<ComponentRendererProps> = ({
  component,
  isEditing,
  isSelected
}) => {
  const renderComponent = () => {
    const props = {
      data: component.data,
      style: component.style,
      isEditing,
      isSelected,
    };

    switch (component.type) {
      case 'header':
        return <HeaderComponent {...props} />;
      case 'text':
        return <TextComponent {...props} />;
      case 'headline':
        return <TextComponent {...props} isHeadline={true} />;
      case 'image':
        return <ImageComponent {...props} />;
      case 'multipleChoice':
        return <MultipleChoiceComponent {...props} />;
      case 'singleChoice':
        return <SingleChoiceComponent {...props} />;
      case 'quizResult':
        return <QuizResultComponent {...props} />;
      case 'benefitsList':
        return <BenefitsListComponent {...props} />;
      default:
        return (
          <div className="p-4 bg-gray-100 text-center">
            Componente não reconhecido: {component.type}
          </div>
        );
    }
  };

  const containerStyles = {
    backgroundColor: component.style?.backgroundColor || 'transparent',
    color: component.style?.textColor || 'inherit',
    borderRadius: component.style?.borderRadius ? `var(--radius-${component.style.borderRadius})` : '0',
    padding: `${component.style?.paddingY ? `${parseInt(component.style.paddingY) * 0.25}rem` : '1rem'} ${component.style?.paddingX ? `${parseInt(component.style.paddingX) * 0.25}rem` : '1rem'}`
  };

  return (
    <div
      style={containerStyles}
      className={cn(
        "w-full",
        isEditing && "transition-colors",
        isSelected && "outline-dashed outline-1 outline-offset-2 outline-[#9b87f5]"
      )}
    >
      {renderComponent()}
    </div>
  );
};

export default ComponentRenderer;
