
import React from 'react';
import { Card } from '@/components/ui/card';
import { AlertCircle, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface JsonApplyInstructionsProps {
  onClose: () => void;
}

export const JsonApplyInstructions: React.FC<JsonApplyInstructionsProps> = ({ onClose }) => {
  return (
    <Card className="p-6 bg-white shadow-lg border border-amber-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-[#432818] flex items-center">
          <AlertCircle className="mr-2 text-amber-500" size={20} />
          Como aplicar o JSON corretamente
        </h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          Entendi
        </Button>
      </div>
      
      <div className="space-y-4 text-[#8F7A6A]">
        <p>
          Para aplicar corretamente o JSON no editor, siga estes passos:
        </p>
        
        <ol className="space-y-3 pl-6 list-decimal">
          <li>
            <span className="font-medium text-[#432818]">Abra o Editor JSON</span>: 
            Clique no botão "Editor JSON" na barra de ferramentas do editor.
          </li>
          <li>
            <span className="font-medium text-[#432818]">Cole seu JSON</span>: 
            Substitua todo o conteúdo atual pelo seu novo JSON. Certifique-se de que é um JSON válido.
          </li>
          <li>
            <span className="font-medium text-[#432818]">Clique em "Aplicar"</span>: 
            O botão "Aplicar" deve ser clicado para processar as alterações.
          </li>
          <li>
            <span className="font-medium text-[#432818]">Salve as alterações</span>: 
            Após aplicar o JSON, clique no botão "Salvar" para persistir as mudanças.
          </li>
        </ol>
        
        <div className="bg-amber-50 p-3 rounded-md border border-amber-200">
          <p className="text-amber-700 font-medium">Dicas importantes:</p>
          <ul className="mt-2 space-y-1">
            <li className="flex">
              <Check size={16} className="text-green-500 mt-1 mr-2 shrink-0" />
              <span>Verifique se o JSON está bem formatado antes de aplicar</span>
            </li>
            <li className="flex">
              <Check size={16} className="text-green-500 mt-1 mr-2 shrink-0" />
              <span>O botão "Aplicar" processa o JSON, mas não salva permanentemente</span>
            </li>
            <li className="flex">
              <Check size={16} className="text-green-500 mt-1 mr-2 shrink-0" />
              <span>Sempre clique em "Salvar" após aplicar o JSON para persistir as mudanças</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <Button 
          onClick={onClose}
          className="bg-[#B89B7A] hover:bg-[#8F7A6A]"
        >
          <Check className="mr-2" size={16} />
          Entendi, vou tentar
        </Button>
      </div>
    </Card>
  );
};

export default JsonApplyInstructions;
