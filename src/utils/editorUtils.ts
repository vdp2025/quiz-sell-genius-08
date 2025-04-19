
import React from 'react';
import { ResultPageConfig } from '@/types/resultPageConfig';
import { get } from 'lodash';

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
) => {
  // This function would contain all the specific editors for each section type
  // We're returning a placeholder for now
  return (
    <div className="p-4">
      <p className="text-gray-500 text-sm">
        Editor para {getEditorTitle(sectionPath)}
      </p>
    </div>
  );
};
