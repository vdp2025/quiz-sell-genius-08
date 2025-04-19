
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Block } from '@/types/editor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TwoColumnBlockEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

const TwoColumnBlockEditor: React.FC<TwoColumnBlockEditorProps> = ({ block, onUpdate }) => {
  const content = block.content;
  
  const updateLeftColumn = (data: any) => {
    onUpdate({
      leftColumn: {
        ...content.leftColumn,
        ...data
      }
    });
  };
  
  const updateRightColumn = (data: any) => {
    onUpdate({
      rightColumn: {
        ...content.rightColumn,
        ...data
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Tamanho das Colunas</Label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-xs">Esquerda</Label>
            <Input
              value={(content.leftColumn?.width || '50%')}
              onChange={(e) => updateLeftColumn({ width: e.target.value })}
              placeholder="50%"
            />
          </div>
          <div>
            <Label className="text-xs">Direita</Label>
            <Input
              value={(content.rightColumn?.width || '50%')}
              onChange={(e) => updateRightColumn({ width: e.target.value })}
              placeholder="50%"
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="columnGap">Espaçamento Entre Colunas</Label>
        <Input
          id="columnGap"
          value={content.columnGap || '20px'}
          onChange={(e) => onUpdate({ columnGap: e.target.value })}
          placeholder="20px"
        />
      </div>
      
      <Tabs defaultValue="left">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="left">Coluna Esquerda</TabsTrigger>
          <TabsTrigger value="right">Coluna Direita</TabsTrigger>
        </TabsList>
        
        <TabsContent value="left" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="leftColumnContent">Conteúdo</Label>
            <Textarea
              id="leftColumnContent"
              rows={5}
              value={(content.leftColumn?.content || '')}
              onChange={(e) => updateLeftColumn({ content: e.target.value })}
              placeholder="Conteúdo da coluna esquerda"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="right" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="rightColumnContent">Conteúdo</Label>
            <Textarea
              id="rightColumnContent"
              rows={5}
              value={(content.rightColumn?.content || '')}
              onChange={(e) => updateRightColumn({ content: e.target.value })}
              placeholder="Conteúdo da coluna direita"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TwoColumnBlockEditor;
