
import React from 'react';
import HeaderEditor from '@/components/result-editor/editors/HeaderEditor';
import MainContentEditor from '@/components/result-editor/editors/MainContentEditor';
import OfferHeroEditor from '@/components/result-editor/editors/OfferHeroEditor';
import PricingEditor from '@/components/result-editor/editors/PricingEditor';
import { ResultPageConfig } from '@/types/resultPageConfig';

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

export function renderContentEditor(
  sectionPath: string,
  config: ResultPageConfig,
  updateSection: (path: string, content: any) => void
): React.ReactNode {
  const pathParts = sectionPath.split('.');
  let current = { ...config };
  let currentPath = '';
  
  for (const part of pathParts) {
    currentPath = currentPath ? `${currentPath}.${part}` : part;
    if (current[part as keyof typeof current]) {
      current = current[part as keyof typeof current] as any;
    }
  }
  
  switch(sectionPath) {
    case 'header':
      return (
        <HeaderEditor 
          content={current.content}
          onUpdate={(content) => updateSection(`${sectionPath}.content`, content)}
        />
      );
    
    case 'mainContent':
      return (
        <MainContentEditor 
          content={current.content}
          onUpdate={(content) => updateSection(`${sectionPath}.content`, content)}
        />
      );
    
    case 'offer.hero':
      return (
        <OfferHeroEditor 
          content={current.content}
          onUpdate={(content) => updateSection(`${sectionPath}.content`, content)}
        />
      );
    
    case 'offer.pricing':
      return (
        <PricingEditor 
          content={current.content}
          onUpdate={(content) => updateSection(`${sectionPath}.content`, content)}
        />
      );
    
    default:
      return (
        <div className="space-y-4">
          {Object.entries(current.content || {}).map(([key, value]) => {
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
  const pathParts = sectionPath.split('.');
  let current = { ...config };
  
  for (const part of pathParts) {
    if (current[part as keyof typeof current]) {
      current = current[part as keyof typeof current] as any;
    }
  }
  
  return current.style || {};
}
