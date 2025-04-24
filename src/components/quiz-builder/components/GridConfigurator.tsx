
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';

interface GridConfiguratorProps {
  columns: number;
  direction: 'vertical' | 'horizontal';
  gap: number;
  onChangeColumns: (columns: number) => void;
  onChangeDirection: (direction: 'vertical' | 'horizontal') => void;
  onChangeGap: (gap: number) => void;
}

const GridConfigurator: React.FC<GridConfiguratorProps> = ({
  columns,
  direction,
  gap,
  onChangeColumns,
  onChangeDirection,
  onChangeGap
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className="text-sm font-medium">Configuração do Grid</Label>
        
        <Tabs defaultValue="columns" className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="columns">Colunas</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
          </TabsList>
          
          <TabsContent value="columns" className="pt-4">
            <div className="space-y-4">
              <RadioGroup 
                value={columns.toString()} 
                onValueChange={(value) => onChangeColumns(Number(value))}
                className="grid grid-cols-4 gap-2"
              >
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="flex flex-col items-center">
                    <div className="flex items-center justify-center h-16 w-full border rounded-md mb-1 relative">
                      <div className="grid gap-1" style={{ 
                        gridTemplateColumns: `repeat(${num}, 1fr)`,
                        width: '80%',
                        height: '80%'
                      }}>
                        {Array(num).fill(0).map((_, i) => (
                          <div key={i} className="bg-[#B89B7A]/40 h-full rounded"></div>
                        ))}
                      </div>
                      <RadioGroupItem
                        value={num.toString()}
                        id={`col-${num}`}
                        className="absolute opacity-0"
                      />
                    </div>
                    <Label htmlFor={`col-${num}`} className="text-xs">
                      {num} {num === 1 ? 'Coluna' : 'Colunas'}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-xs">Espaçamento</Label>
                  <span className="text-xs text-gray-500">{gap}px</span>
                </div>
                <Slider
                  value={[gap]}
                  min={0}
                  max={24}
                  step={2}
                  onValueChange={(value) => onChangeGap(value[0])}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="layout" className="pt-4">
            <RadioGroup 
              value={direction} 
              onValueChange={(value: 'vertical' | 'horizontal') => onChangeDirection(value)}
              className="grid grid-cols-2 gap-2"
            >
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-full border rounded-md mb-1 relative">
                  <div className="flex flex-col gap-1 w-4/5 h-4/5">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="bg-[#B89B7A]/40 w-full h-full rounded"></div>
                    ))}
                  </div>
                  <RadioGroupItem
                    value="vertical"
                    id="vertical"
                    className="absolute opacity-0"
                  />
                </div>
                <Label htmlFor="vertical" className="text-xs">Vertical</Label>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-full border rounded-md mb-1 relative">
                  <div className="flex flex-row gap-1 w-4/5 h-4/5">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="bg-[#B89B7A]/40 w-full h-full rounded"></div>
                    ))}
                  </div>
                  <RadioGroupItem
                    value="horizontal"
                    id="horizontal"
                    className="absolute opacity-0"
                  />
                </div>
                <Label htmlFor="horizontal" className="text-xs">Horizontal</Label>
              </div>
            </RadioGroup>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GridConfigurator;
