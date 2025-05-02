
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StyleResult } from '@/types/quiz';
import { useResultPageEditor } from '@/hooks/useResultPageEditor';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { CSS } from '@dnd-kit/utilities';
import { Eye, EyeOff, Save, Trash2, GripVertical, Plus, Settings, MoveUp, MoveDown } from 'lucide-react';
import { BlockType, ResultPageBlock } from '@/types/resultPageTypes';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BlockPropertiesPanel } from './BlockPropertiesPanel';

interface ResultPageEditorPanelProps {
  primaryStyle: StyleResult;
  isPreviewing: boolean;
}

export const ResultPageEditorPanel: React.FC<ResultPageEditorPanelProps> = ({ 
  primaryStyle, 
  isPreviewing 
}) => {
  const {
    blocks,
    selectedBlockId,
    selectBlock,
    actions,
  } = useResultPageEditor(primaryStyle.category);
  
  const [activeTab, setActiveTab] = useState<'blocks' | 'properties'>('blocks');
  const [isAddBlockMenuOpen, setIsAddBlockMenuOpen] = useState(false);
  
  // Setup DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  
  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      const oldIndex = blocks.findIndex((block) => block.id === active.id);
      const newIndex = blocks.findIndex((block) => block.id === over.id);
      
      actions.handleReorderBlocks(oldIndex, newIndex);
    }
  };
  
  const blockTypes: {id: BlockType, name: string, icon: string}[] = [
    { id: 'headline', name: 'Cabeçalho', icon: 'Heading' },
    { id: 'text', name: 'Texto', icon: 'Text' },
    { id: 'image', name: 'Imagem', icon: 'Image' },
    { id: 'primaryStyle', name: 'Estilo Principal', icon: 'Star' },
    { id: 'secondaryStyles', name: 'Estilos Secundários', icon: 'Stars' },
    { id: 'offer', name: 'Oferta', icon: 'Tag' },
    { id: 'testimonial', name: 'Depoimento', icon: 'MessageSquare' },
    { id: 'beforeAfter', name: 'Antes e Depois', icon: 'SplitSquareVertical' },
    { id: 'cta', name: 'Botão de Ação', icon: 'MousePointer' },
  ];
  
  if (isPreviewing) {
    return null;
  }
  
  return (
    <div className="flex flex-col h-full border-r border-border">
      <div className="border-b p-4 bg-background flex items-center justify-between">
        <h2 className="text-lg font-medium">Editor da Página de Resultado</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={actions.handleSave}
        >
          <Save className="h-4 w-4 mr-2" />
          Salvar
        </Button>
      </div>
      
      <Tabs 
        value={activeTab} 
        onValueChange={(value) => setActiveTab(value as 'blocks' | 'properties')}
        className="flex-1 flex flex-col"
      >
        <TabsList className="grid grid-cols-2 mx-4 mt-2">
          <TabsTrigger value="blocks">Blocos</TabsTrigger>
          <TabsTrigger value="properties">Propriedades</TabsTrigger>
        </TabsList>
        
        <TabsContent value="blocks" className="flex-1 flex flex-col p-0 m-0">
          <div className="p-4 border-b">
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => setIsAddBlockMenuOpen(!isAddBlockMenuOpen)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Bloco
            </Button>
            
            {isAddBlockMenuOpen && (
              <Card className="mt-2">
                <CardContent className="p-2 grid grid-cols-2 gap-2">
                  {blockTypes.map((blockType) => (
                    <Button
                      key={blockType.id}
                      variant="ghost"
                      className="justify-start text-sm h-auto py-2"
                      onClick={() => {
                        actions.handleAddBlock(blockType.id);
                        setIsAddBlockMenuOpen(false);
                      }}
                    >
                      {blockType.name}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
          
          <ScrollArea className="flex-1">
            <div className="p-4">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis]}
              >
                <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
                  {blocks.map((block) => (
                    <SortableBlockItem
                      key={block.id}
                      block={block}
                      isSelected={block.id === selectedBlockId}
                      onSelect={() => selectBlock(block.id)}
                      onDelete={() => actions.handleDeleteBlock(block.id)}
                      onMoveUp={() => {
                        const index = blocks.findIndex((b) => b.id === block.id);
                        if (index > 0) {
                          actions.handleReorderBlocks(index, index - 1);
                        }
                      }}
                      onMoveDown={() => {
                        const index = blocks.findIndex((b) => b.id === block.id);
                        if (index < blocks.length - 1) {
                          actions.handleReorderBlocks(index, index + 1);
                        }
                      }}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="properties" className="flex-1 overflow-hidden p-0 m-0">
          <ScrollArea className="h-full">
            <BlockPropertiesPanel
              selectedBlockId={selectedBlockId}
              blocks={blocks}
              onUpdateBlock={actions.handleUpdateBlock}
              onSelectionChange={selectBlock}
            />
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Sortable block item component
interface SortableBlockItemProps {
  block: ResultPageBlock;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

const SortableBlockItem = ({ 
  block, 
  isSelected, 
  onSelect,
  onDelete,
  onMoveUp,
  onMoveDown
}: SortableBlockItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: block.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getBlockTypeName = (type: BlockType) => {
    const blockTypeNames = {
      'headline': 'Cabeçalho',
      'text': 'Texto',
      'image': 'Imagem',
      'primaryStyle': 'Estilo Principal',
      'secondaryStyles': 'Estilos Secundários',
      'offer': 'Oferta',
      'testimonial': 'Depoimento',
      'beforeAfter': 'Antes e Depois',
      'cta': 'Botão de Ação',
    };
    
    return blockTypeNames[type] || type;
  };
  
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`mb-2 border rounded-md ${isSelected ? 'border-primary' : 'border-border'}`}
    >
      <div 
        className={`p-3 flex items-center gap-2 ${isSelected ? 'bg-primary/10' : 'bg-background'}`} 
        onClick={onSelect}
      >
        <div {...attributes} {...listeners} className="cursor-move">
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </div>
        
        <div className="flex-1">
          <span className="text-sm font-medium">{getBlockTypeName(block.type)}</span>
          {block.content?.title && (
            <p className="text-xs text-muted-foreground truncate">{block.content.title}</p>
          )}
        </div>
        
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={onMoveUp} className="h-7 w-7">
            <MoveUp className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onMoveDown} className="h-7 w-7">
            <MoveDown className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onDelete} className="text-destructive h-7 w-7">
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
