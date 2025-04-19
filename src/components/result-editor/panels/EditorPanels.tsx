
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import StyleEditor from '../StyleEditor';
import GlobalStyleEditor from '../GlobalStyleEditor';
import { ResultPageConfig } from '@/types/resultPageConfig';
import { getEditorTitle, getSectionStyle, renderContentEditor } from '@/utils/editorHelpers';

interface EditorPanelsProps {
  editingSection: string | null;
  editingStyles: boolean;
  resultPageConfig: ResultPageConfig;
  globalStylesOpen: boolean;
  updateSection: (path: string, content: any) => void;
  setEditingSection: (section: string | null) => void;
  setEditingStyles: (editing: boolean) => void;
  setGlobalStylesOpen: (open: boolean) => void;
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
