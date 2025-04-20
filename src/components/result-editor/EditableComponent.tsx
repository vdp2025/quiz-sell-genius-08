
import React, { useState } from 'react';
import { StyleResult } from '@/types/quiz';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import ResultHeader from '../quiz-result/ResultHeader';
import PrimaryStyleCard from '../quiz-result/PrimaryStyleCard';
import SecondaryStylesSection from '../quiz-result/SecondaryStylesSection';
import OfferCard from '../quiz-result/OfferCard';
import { EditSectionOverlay } from './EditSectionOverlay';

interface EditableComponentProps {
  components: {
    primaryStyle: StyleResult;
    secondaryStyles: StyleResult[];
    config: any;
  };
  onUpdate: (sectionKey: string, data: any) => void;
}

const EditableComponent: React.FC<EditableComponentProps> = ({
  components: { primaryStyle, secondaryStyles, config },
  onUpdate
}) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('Visitante');
  
  // When user clicks to edit a section
  const handleEditSection = (sectionKey: string) => {
    setActiveSection(sectionKey);
  };
  
  // Save section changes
  const handleSaveSection = (sectionKey: string, data: any) => {
    onUpdate(sectionKey, data);
    setActiveSection(null);
  };
  
  // Load section configuration or use defaults
  const headerConfig = config.header?.content || {};
  const primaryStyleConfig = config.mainContent?.content || {};
  const offerConfig = config.offer?.hero?.content || {};

  return (
    <ScrollArea className="h-[calc(100vh-80px)]">
      <div className="relative max-w-4xl mx-auto p-6">
        <div className={activeSection ? "opacity-50 pointer-events-none transition-opacity" : "transition-opacity"}>
          {/* Header Section - Editable */}
          <div 
            className="relative py-6 group cursor-pointer"
            onClick={() => handleEditSection('header.content')}
          >
            <div className="absolute inset-0 border-2 border-dashed border-transparent group-hover:border-[#B89B7A] rounded-lg opacity-0 group-hover:opacity-100" />
            <div className="absolute top-0 right-0 bg-[#B89B7A] text-white px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100">
              Editar cabeçalho
            </div>
            
            <ResultHeader 
              userName={userName} 
              customTitle={headerConfig.title} 
            />
          </div>
          
          {/* Primary Style Section - Editable */}
          <Card className="p-6 bg-white shadow-md border border-[#B89B7A]/20 mb-8 relative group cursor-pointer"
                onClick={() => handleEditSection('mainContent.content')}>
            <div className="absolute inset-0 border-2 border-dashed border-transparent group-hover:border-[#B89B7A] rounded-lg opacity-0 group-hover:opacity-100" />
            <div className="absolute top-0 right-0 bg-[#B89B7A] text-white px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100">
              Editar estilo primário
            </div>
            
            <PrimaryStyleCard 
              primaryStyle={primaryStyle} 
              customDescription={primaryStyleConfig.description}
              customImage={primaryStyleConfig.customImage}
            />
            <SecondaryStylesSection secondaryStyles={secondaryStyles} />
          </Card>

          {/* Offer Section - Editable */}
          <div 
            className="relative group cursor-pointer" 
            onClick={() => handleEditSection('offer.hero.content')}
          >
            <div className="absolute inset-0 border-2 border-dashed border-transparent group-hover:border-[#B89B7A] rounded-lg opacity-0 group-hover:opacity-100" />
            <div className="absolute top-0 right-0 bg-[#B89B7A] text-white px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100">
              Editar oferta
            </div>
            
            <OfferCard 
              primaryStyle={primaryStyle} 
              config={offerConfig} 
            />
          </div>
        </div>
        
        {/* Edit overlay */}
        {activeSection && (
          <EditSectionOverlay
            section={activeSection}
            data={getSectionData(config, activeSection)}
            onSave={(data) => handleSaveSection(activeSection, data)}
            onCancel={() => setActiveSection(null)}
          />
        )}
      </div>
    </ScrollArea>
  );
};

// Helper function to get data from a section by path
function getSectionData(config: any, path: string): any {
  const parts = path.split('.');
  let current: any = config;
  
  for (const part of parts) {
    if (current[part] === undefined) {
      return {};
    }
    current = current[part];
  }
  
  return current || {};
}

export default EditableComponent;
