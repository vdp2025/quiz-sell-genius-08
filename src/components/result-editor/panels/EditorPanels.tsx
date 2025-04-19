
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import StyleEditor from '../StyleEditor';
import GlobalStyleEditor from '../GlobalStyleEditor';
import { ResultPageConfig } from '@/types/resultPageConfig';

// Local utility function to get editor title
function getEditorTitle(sectionPath: string): string {
  const map: Record<string, string> = {
    'header': 'Cabeçalho',
    'mainContent': 'Estilo Principal',
    'secondaryStyles': 'Estilos Secundários',
    'offer.hero': 'Oferta Principal',
    'offer.products': 'Produtos e Bônus',
    'offer.benefits': 'Benefícios',
    'offer.pricing': 'Preço e Botão de Compra',
    'offer.testimonials': 'Depoimentos',
    'offer.guarantee': 'Garantia'
  };
  
  return map[sectionPath] || sectionPath;
}

// Local utility function to get section style
function getSectionStyle(sectionPath: string, config: ResultPageConfig): any {
  const pathParts = sectionPath.split('.');
  let current: any = { ...config };
  
  for (const part of pathParts) {
    if (current[part]) {
      current = current[part];
    }
  }
  
  return current.style || {};
}

export const EditorPanels: React.FC<EditorPanelsProps> = ({
  editingSection,
  editingStyles,
  resultPageConfig,
  globalStylesOpen,
  updateSection,
  setEditingSection,
  setEditingStyles,
  setGlobalStylesOpen
}) => {
  return (
    <>
      {/* Content Editor Sheet */}
      <Sheet 
        open={!!editingSection && !editingStyles} 
        onOpenChange={() => setEditingSection(null)}
      >
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>
              Editar {getEditorTitle(editingSection || '')}
            </SheetTitle>
          </SheetHeader>
          <div className="py-6">
            {editingSection && renderContentEditor(
              editingSection, 
              resultPageConfig, 
              updateSection
            )}
          </div>
        </SheetContent>
      </Sheet>
      
      {/* Style Editor Sheet */}
      <Sheet 
        open={!!editingSection && editingStyles} 
        onOpenChange={() => {
          setEditingSection(null);
          setEditingStyles(false);
        }}
      >
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>
              Editar Estilos: {getEditorTitle(editingSection || '')}
            </SheetTitle>
          </SheetHeader>
          <div className="py-6">
            {editingSection && (
              <StyleEditor 
                style={getSectionStyle(editingSection, resultPageConfig)}
                onUpdate={(style) => {
                  updateSection(`${editingSection}.style`, style);
                }}
              />
            )}
          </div>
        </SheetContent>
      </Sheet>
      
      {/* Global Styles Sheet */}
      <Sheet open={globalStylesOpen} onOpenChange={setGlobalStylesOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Estilos Globais</SheetTitle>
          </SheetHeader>
          <div className="py-6">
            <GlobalStyleEditor 
              globalStyles={resultPageConfig.globalStyles || {}}
              onUpdate={(styles) => {
                updateSection('globalStyles', styles);
              }}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

