
import React, { useState } from 'react';
import { StyleResult } from '@/types/quiz';
import { Card } from '@/components/ui/card';
import QuizResult from '../QuizResult';
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
  components,
  onUpdate
}) => {
  const { primaryStyle, secondaryStyles, config } = components;
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  // Quando o usuário clica para editar uma seção
  const handleEditSection = (sectionKey: string) => {
    setActiveSection(sectionKey);
  };
  
  // Quando o usuário termina de editar uma seção
  const handleSaveSection = (sectionKey: string, data: any) => {
    onUpdate(sectionKey, data);
    setActiveSection(null);
  };
  
  // Quando o usuário cancela a edição
  const handleCancelEdit = () => {
    setActiveSection(null);
  };

  return (
    <div className="relative">
      {/* Renderiza a página de resultados real, mas com funcionalidade de edição */}
      <div className={activeSection ? "opacity-40 pointer-events-none" : ""}>
        <div className="max-w-4xl mx-auto">
          {/* Seção do cabeçalho */}
          <div 
            className="relative py-6 group cursor-pointer"
            onClick={() => handleEditSection('header')}
          >
            <div className="absolute inset-0 border-2 border-dashed border-transparent group-hover:border-[#B89B7A] rounded-lg opacity-0 group-hover:opacity-100" />
            <div className="absolute top-0 right-0 bg-[#B89B7A] text-white px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100">
              Editar cabeçalho
            </div>
            
            {/* Renderiza o componente real de cabeçalho com os dados do config se disponíveis */}
            <div className="text-center space-y-3">
              <h1 className="font-playfair text-lg md:text-2xl font-semibold text-[#432818] px-2">
                {config?.header?.title || `Olá, seu Estilo Predominante é:`}
              </h1>
            </div>
          </div>
          
          {/* Seção do estilo primário */}
          <Card className="p-6 bg-white shadow-md border border-[#B89B7A]/20 mb-8 relative group cursor-pointer"
                onClick={() => handleEditSection('primaryStyle')}>
            <div className="absolute inset-0 border-2 border-dashed border-transparent group-hover:border-[#B89B7A] rounded-lg opacity-0 group-hover:opacity-100" />
            <div className="absolute top-0 right-0 bg-[#B89B7A] text-white px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100">
              Editar estilo primário
            </div>
            
            {/* Renderiza os componentes reais, mas com dados configuráveis */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-playfair text-[#B89B7A]">
                    {primaryStyle.category}
                  </h2>
                  <span className="text-sm font-medium">{primaryStyle.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                  <div className="bg-[#B89B7A] h-1.5 rounded-full transition-all duration-300 ease-in-out" 
                       style={{ width: `${primaryStyle.percentage}%` }} />
                </div>
                <p className="text-[#1A1818]/80 text-sm mt-2">
                  {config?.primaryStyle?.description || "Descrição do estilo predominante."}
                </p>
              </div>
            </div>
          </Card>

          {/* Seção de oferta */}
          <div 
            className="relative group cursor-pointer" 
            onClick={() => handleEditSection('offer')}
          >
            <div className="absolute inset-0 border-2 border-dashed border-transparent group-hover:border-[#B89B7A] rounded-lg opacity-0 group-hover:opacity-100" />
            <div className="absolute top-0 right-0 bg-[#B89B7A] text-white px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100">
              Editar oferta
            </div>
            
            {/* Esta é uma versão simplificada, você deve manter a estrutura original do OfferCard */}
            <div className="space-y-12 bg-[#fffaf7] px-4 py-8 rounded-lg">
              <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-playfair text-[#aa6b5d] mb-3">
                  {config?.offer?.title || "VOCÊ DESCOBRIU SEU ESTILO"}
                </h1>
                <p className="text-xl md:text-2xl font-playfair text-[#3a3a3a] mb-6">
                  {config?.offer?.subtitle || "Agora é hora de aplicar com clareza — e se vestir de você"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Overlay de edição que aparece quando uma seção está selecionada */}
      {activeSection && (
        <EditSectionOverlay
          section={activeSection}
          data={config[activeSection]}
          onSave={(data) => handleSaveSection(activeSection, data)}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
};

export default EditableComponent;
