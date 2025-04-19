
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Block } from '@/types/editor';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface CustomCodeBlockEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

const CustomCodeBlockEditor: React.FC<CustomCodeBlockEditorProps> = ({ block, onUpdate }) => {
  const { content = {} } = block;
  
  return (
    <div className="space-y-6">
      <Alert variant="warning" className="mb-4">
        <AlertTriangle className="h-4 w-4 mr-2" />
        <AlertDescription>
          O código HTML personalizado permite adicionar conteúdo avançado à sua página. 
          Use com cuidado, pois código incorreto pode afetar a visualização.
        </AlertDescription>
      </Alert>
      
      <Card className="p-4 bg-[#1e1e1e] text-white">
        <div className="space-y-2">
          <Label htmlFor="custom-code" className="text-white">HTML Personalizado</Label>
          <Textarea
            id="custom-code"
            value={content.code || ''}
            onChange={(e) => onUpdate({ ...content, code: e.target.value })}
            placeholder="<!-- Adicione seu código HTML aqui -->"
            className="min-h-[300px] font-mono text-sm bg-[#1e1e1e] text-white border-gray-700"
          />
        </div>
      </Card>
      
      <div className="text-sm text-gray-500 space-y-2">
        <p>Dicas:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Certifique-se de que seu HTML é válido e está corretamente formatado</li>
          <li>Você pode incluir código CSS interno usando tags &lt;style&gt;</li>
          <li>Elementos JavaScript podem não funcionar como esperado</li>
          <li>Use esse recurso apenas quando outros blocos não atenderem suas necessidades</li>
        </ul>
      </div>
    </div>
  );
};

export default CustomCodeBlockEditor;
