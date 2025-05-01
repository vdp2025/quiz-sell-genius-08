import React, { useState } from 'react';

interface UnifiedEditorProps {
  initialData?: any;
}

const UnifiedEditor: React.FC<UnifiedEditorProps> = ({ initialData }) => {
  const [activeSection, setActiveSection] = useState('result');

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between p-4 bg-[#FAF9F7]">
        <h2 className="text-2xl font-bold text-[#432818]">Editor Unificado</h2>
        <div className="flex gap-4">
          <button 
            className={`px-4 py-2 rounded ${
              activeSection === 'result' ? 'bg-[#B89B7A] text-white' : 'bg-white text-[#8F7A6A]'
            }`}
            onClick={() => setActiveSection('result')}
          >
            Página de Resultado
          </button>
          <button 
            className={`px-4 py-2 rounded ${
              activeSection === 'offer' ? 'bg-[#B89B7A] text-white' : 'bg-white text-[#8F7A6A]'
            }`}
            onClick={() => setActiveSection('offer')}
          >
            Página de Oferta
          </button>
        </div>
      </div>
      
      <div className="flex-1 p-6">
        {/* Conteúdo do editor será renderizado aqui */}
      </div>
    </div>
  );
};

export default UnifiedEditor;