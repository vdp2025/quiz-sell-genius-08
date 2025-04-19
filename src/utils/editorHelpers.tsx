
import React from 'react';
import HeaderEditor from '@/components/result-editor/editors/HeaderEditor';
import MainContentEditor from '@/components/result-editor/editors/MainContentEditor';
import OfferHeroEditor from '@/components/result-editor/editors/OfferHeroEditor';
import PricingEditor from '@/components/result-editor/editors/PricingEditor';
import { ResultPageConfig, Section, OfferSection } from '@/types/resultPageConfig';

type SectionTitle = {
  [key: string]: string;
};

export function getEditorTitle(sectionPath: string): string {
  const map: SectionTitle = {
    'header': 'Cabeçalho',
    'mainContent': 'Estilo Principal',
    'secondaryStyles': 'Estilos Secundários',
    'offer.hero': 'Oferta Principal',
    'offer.products': 'Produtos e Bônus',
    'offer.benefits': 'Benefícios',
    'offer.pricing': 'Preço e Botão de Compra',
    'offer.testimonials': 'Depoimentos',
    'offer.guarantee': 'Garantia',
    'result': 'RESULTADO'
  };
  
  return map[sectionPath] || sectionPath;
}

interface SectionData {
  content: any;
  style?: Record<string, any>;
}

// Helper function to get the correct section data from config
function getSectionData(config: ResultPageConfig, sectionPath: string): SectionData {
  const pathParts = sectionPath.split('.');
  
  if (pathParts.length === 1) {
    // Direct section like 'header', 'mainContent'
    const section = config[pathParts[0] as keyof ResultPageConfig] as Section;
    return {
      content: section?.content || {},
      style: section?.style || {}
    };
  } else if (pathParts.length === 2 && pathParts[0] === 'offer') {
    // Nested section like 'offer.hero', 'offer.pricing'
    const offerSection = config.offer as OfferSection;
    const subSection = offerSection[pathParts[1] as keyof OfferSection] as Section;
    return {
      content: subSection?.content || {},
      style: subSection?.style || {}
    };
  }
  
  // Default empty section data
  return { content: {}, style: {} };
}

export function renderContentEditor(
  sectionPath: string,
  config: ResultPageConfig,
  updateSection: (path: string, content: any) => void
): React.ReactNode {
  // Get the content for the section
  const sectionData = getSectionData(config, sectionPath);
  
  switch(sectionPath) {
    case 'header':
      return (
        <HeaderEditor 
          content={sectionData.content}
          onUpdate={(content) => updateSection(`${sectionPath}.content`, content)}
        />
      );
    
    case 'mainContent':
      return (
        <MainContentEditor 
          content={sectionData.content}
          onUpdate={(content) => updateSection(`${sectionPath}.content`, content)}
        />
      );
    
    case 'offer.hero':
      return (
        <OfferHeroEditor 
          content={sectionData.content}
          onUpdate={(content) => updateSection(`${sectionPath}.content`, content)}
        />
      );
    
    case 'offer.pricing':
      return (
        <PricingEditor 
          content={sectionData.content}
          onUpdate={(content) => updateSection(`${sectionPath}.content`, content)}
        />
      );
    
    default:
      return (
        <div className="space-y-4">
          {Object.entries(sectionData.content || {}).map(([key, value]) => {
            if (typeof value === 'string') {
              return (
                <div key={key} className="space-y-2">
                  <label htmlFor={key} className="text-sm font-medium capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  {value.length > 100 ? (
                    <textarea
                      id={key}
                      value={value}
                      onChange={(e) => updateSection(`${sectionPath}.content.${key}`, e.target.value)}
                      className="w-full min-h-[100px] p-2 border rounded-md"
                    />
                  ) : (
                    <input
                      id={key}
                      type="text"
                      value={value}
                      onChange={(e) => updateSection(`${sectionPath}.content.${key}`, e.target.value)}
                      className="w-full p-2 border rounded-md"
                    />
                  )}
                </div>
              );
            }
            return null;
          })}
        </div>
      );
  }
}

export function getSectionStyle(sectionPath: string, config: ResultPageConfig): Record<string, any> {
  const sectionData = getSectionData(config, sectionPath);
  return sectionData.style || {};
}
