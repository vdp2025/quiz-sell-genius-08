
import React from 'react';
import EditableSection from '../EditableSection';
import { ResultPageConfig } from '@/types/resultPageConfig';
import { StyleResult } from '@/types/quiz';

interface EditableSectionsListProps {
  resultPageConfig: ResultPageConfig;
  previewMode: boolean;
  toggleSection: (sectionPath: string) => void;
  setEditingSection: (section: string | null) => void;
  setEditingStyles: (editing: boolean) => void;
  primaryStyle: StyleResult;
  secondaryStyles?: StyleResult[];
}

export const EditableSectionsList: React.FC<EditableSectionsListProps> = ({
  resultPageConfig,
  previewMode,
  toggleSection,
  setEditingSection,
  setEditingStyles,
  primaryStyle,
  secondaryStyles
}) => {
  return (
    <div className={`transition-all duration-300 ${previewMode ? '' : 'border-2 border-dashed border-gray-300 p-4 rounded-lg'}`}>
      {/* Header Section */}
      <EditableSection
        title="Cabeçalho"
        sectionPath="header"
        content={resultPageConfig.header.content}
        style={resultPageConfig.header.style}
        visible={resultPageConfig.header.visible}
        isPreview={previewMode}
        onEdit={() => setEditingSection('header')}
        onToggleVisibility={() => toggleSection('header')}
        onStyleEdit={() => {
          setEditingStyles(true);
          setEditingSection('header');
        }}
        primaryStyle={primaryStyle}
      />
      
      {/* Main Content Section */}
      <EditableSection
        title="Estilo Principal"
        sectionPath="mainContent"
        content={resultPageConfig.mainContent.content}
        style={resultPageConfig.mainContent.style}
        visible={resultPageConfig.mainContent.visible}
        isPreview={previewMode}
        onEdit={() => setEditingSection('mainContent')}
        onToggleVisibility={() => toggleSection('mainContent')}
        onStyleEdit={() => {
          setEditingStyles(true);
          setEditingSection('mainContent');
        }}
        primaryStyle={primaryStyle}
      />
      
      {/* Secondary Styles Section */}
      <EditableSection
        title="Estilos Secundários"
        sectionPath="secondaryStyles"
        content={resultPageConfig.secondaryStyles.content}
        style={resultPageConfig.secondaryStyles.style}
        visible={resultPageConfig.secondaryStyles.visible}
        isPreview={previewMode}
        onEdit={() => setEditingSection('secondaryStyles')}
        onToggleVisibility={() => toggleSection('secondaryStyles')}
        onStyleEdit={() => {
          setEditingStyles(true);
          setEditingSection('secondaryStyles');
        }}
        primaryStyle={primaryStyle}
        secondaryStyles={secondaryStyles}
      />
      
      {/* Offer Section */}
      <EditableSection
        title="Oferta Principal"
        sectionPath="offer.hero"
        content={resultPageConfig.offer.hero.content}
        style={resultPageConfig.offer.hero.style}
        visible={resultPageConfig.offer.hero.visible}
        isPreview={previewMode}
        onEdit={() => setEditingSection('offer.hero')}
        onToggleVisibility={() => toggleSection('offer.hero')}
        onStyleEdit={() => {
          setEditingStyles(true);
          setEditingSection('offer.hero');
        }}
        primaryStyle={primaryStyle}
      />
      
      {/* Products Section */}
      <EditableSection
        title="Produtos e Bônus"
        sectionPath="offer.products"
        content={resultPageConfig.offer.products.content}
        style={resultPageConfig.offer.products.style}
        visible={resultPageConfig.offer.products.visible}
        isPreview={previewMode}
        onEdit={() => setEditingSection('offer.products')}
        onToggleVisibility={() => toggleSection('offer.products')}
        onStyleEdit={() => {
          setEditingStyles(true);
          setEditingSection('offer.products');
        }}
        primaryStyle={primaryStyle}
      />
      
      {/* Benefits Section */}
      <EditableSection
        title="Benefícios"
        sectionPath="offer.benefits"
        content={resultPageConfig.offer.benefits.content}
        style={resultPageConfig.offer.benefits.style}
        visible={resultPageConfig.offer.benefits.visible}
        isPreview={previewMode}
        onEdit={() => setEditingSection('offer.benefits')}
        onToggleVisibility={() => toggleSection('offer.benefits')}
        onStyleEdit={() => {
          setEditingStyles(true);
          setEditingSection('offer.benefits');
        }}
        primaryStyle={primaryStyle}
      />
      
      {/* Pricing Section */}
      <EditableSection
        title="Preço e Botão de Compra"
        sectionPath="offer.pricing"
        content={resultPageConfig.offer.pricing.content}
        style={resultPageConfig.offer.pricing.style}
        visible={resultPageConfig.offer.pricing.visible}
        isPreview={previewMode}
        onEdit={() => setEditingSection('offer.pricing')}
        onToggleVisibility={() => toggleSection('offer.pricing')}
        onStyleEdit={() => {
          setEditingStyles(true);
          setEditingSection('offer.pricing');
        }}
        primaryStyle={primaryStyle}
      />
      
      {/* Testimonials Section */}
      <EditableSection
        title="Depoimentos"
        sectionPath="offer.testimonials"
        content={resultPageConfig.offer.testimonials.content}
        style={resultPageConfig.offer.testimonials.style}
        visible={resultPageConfig.offer.testimonials.visible}
        isPreview={previewMode}
        onEdit={() => setEditingSection('offer.testimonials')}
        onToggleVisibility={() => toggleSection('offer.testimonials')}
        onStyleEdit={() => {
          setEditingStyles(true);
          setEditingSection('offer.testimonials');
        }}
        primaryStyle={primaryStyle}
      />
      
      {/* Guarantee Section */}
      <EditableSection
        title="Garantia"
        sectionPath="offer.guarantee"
        content={resultPageConfig.offer.guarantee.content}
        style={resultPageConfig.offer.guarantee.style}
        visible={resultPageConfig.offer.guarantee.visible}
        isPreview={previewMode}
        onEdit={() => setEditingSection('offer.guarantee')}
        onToggleVisibility={() => toggleSection('offer.guarantee')}
        onStyleEdit={() => {
          setEditingStyles(true);
          setEditingSection('offer.guarantee');
        }}
        primaryStyle={primaryStyle}
      />
    </div>
  );
};

