
import React from 'react';
import { ResultPageConfig } from '@/types/resultPageConfig';
import { get } from 'lodash';
import HeaderEditor from '@/components/result-editor/editors/HeaderEditor';
import MainContentEditor from '@/components/result-editor/editors/MainContentEditor';
import OfferHeroEditor from '@/components/result-editor/editors/OfferHeroEditor';
import PricingEditor from '@/components/result-editor/editors/PricingEditor';
import OfferEditor from '@/components/result-editor/editors/OfferEditor';

// Function to get the style for a section
export const getSectionStyle = (sectionPath: string, config: ResultPageConfig) => {
  return get(config, `${sectionPath}.style`, {});
};

// Function to get the title for the editor based on the section path
export const getEditorTitle = (path: string): string => {
  const pathSegments = path.split('.');
  const lastSegment = pathSegments[pathSegments.length - 1];
  
  const titles: Record<string, string> = {
    header: 'Cabeçalho',
    mainContent: 'Conteúdo Principal',
    secondaryStyles: 'Estilos Secundários',
    hero: 'Seção Hero',
    products: 'Produtos',
    pricing: 'Preços',
    benefits: 'Benefícios',
    testimonials: 'Depoimentos',
    guarantee: 'Garantia',
    content: 'Conteúdo',
    style: 'Estilos',
    globalStyles: 'Estilos Globais'
  };
  
  return titles[lastSegment] || 'Seção';
};

// Function to render content editor based on section path
export const renderContentEditor = (
  sectionPath: string, 
  config: ResultPageConfig,
  updateSection: (path: string, content: any) => void
): React.ReactNode => {
  // Determine which editor to render based on the section path
  if (sectionPath === 'header') {
    return (
      <HeaderEditor 
        content={config.header.content} 
        onUpdate={(content) => updateSection(`${sectionPath}.content`, content)} 
      />
    );
  } else if (sectionPath === 'mainContent') {
    return (
      <MainContentEditor 
        content={config.mainContent.content} 
        onUpdate={(content) => updateSection(`${sectionPath}.content`, content)}
      />
    );
  } else if (sectionPath === 'offer.hero') {
    return (
      <OfferHeroEditor 
        content={config.offer.hero.content} 
        onUpdate={(content) => updateSection(`${sectionPath}.content`, content)}
      />
    );
  } else if (sectionPath === 'offer.pricing') {
    return (
      <PricingEditor 
        content={config.offer.pricing.content} 
        onUpdate={(content) => updateSection(`${sectionPath}.content`, content)}
      />
    );
  } else if (sectionPath === 'offer') {
    return (
      <OfferEditor 
        content={config.offer.content} 
        onUpdate={(content) => updateSection(`${sectionPath}.content`, content)}
      />
    );
  }
  
  // Default placeholder editor
  return (
    <div className="p-4">
      <p className="text-gray-500 text-sm">
        Editor para {getEditorTitle(sectionPath)}
      </p>
    </div>
  );
};
