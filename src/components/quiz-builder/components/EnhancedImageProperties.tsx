
import React, { useState } from 'react';
import { QuizComponentData } from '@/types/quizBuilder';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Upload, Image as ImageIcon } from 'lucide-react';
import ImageGallery from './ImageGallery';

interface ImagePropertiesProps {
  data: QuizComponentData['data'];
  onUpdate: (data: any) => void;
}

const EnhancedImageProperties: React.FC<ImagePropertiesProps> = ({ data, onUpdate }) => {
  const [activeTab, setActiveTab] = useState<string>("url");

  const handleSelectImage = (imageUrl: string) => {
    onUpdate({ ...data, imageUrl });
  };
  
  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="url">URL</TabsTrigger>
          <TabsTrigger value="gallery">Galeria</TabsTrigger>
        </TabsList>
        
        <TabsContent value="url" className="pt-4">
          <div className="space-y-2">
            <Label htmlFor="imageUrl">URL da Imagem</Label>
            <Input
              id="imageUrl"
              value={data.imageUrl || ''}
              onChange={(e) => onUpdate({ ...data, imageUrl: e.target.value })}
              placeholder="https://exemplo.com/imagem.jpg"
            />
            
            <div className="mt-2">
              <Button 
                variant="outline" 
                className="w-full h-24 border-dashed flex flex-col gap-2"
              >
                <Upload className="w-5 h-5" />
                <span className="text-xs">Upload de Imagem</span>
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="gallery" className="pt-4 h-[300px]">
          <ScrollArea className="h-full">
            <ImageGallery onSelectImage={handleSelectImage} />
          </ScrollArea>
        </TabsContent>
      </Tabs>
      
      {data.imageUrl && (
        <div className="mt-4 border rounded-md p-2">
          <p className="text-xs text-gray-500 mb-1">Preview:</p>
          <div className="flex justify-center bg-[#F9F6F2] rounded-md p-2">
            <img 
              src={data.imageUrl} 
              alt={data.alt || 'Preview'} 
              className="max-h-32 object-contain"
            />
          </div>
        </div>
      )}
      
      <div className="space-y-2 mt-4 pt-4 border-t">
        <Label htmlFor="imageSize">Tamanho da Imagem</Label>
        <div className="grid grid-cols-3 gap-2">
          {['small', 'medium', 'large'].map((size) => (
            <Button
              key={size}
              type="button"
              variant={data.imageSize === size ? "default" : "outline"}
              onClick={() => onUpdate({ ...data, imageSize: size })}
              className={data.imageSize === size ? "bg-[#B89B7A] text-white" : ""}
            >
              <ImageIcon className="w-4 h-4 mr-1" />
              <span className="capitalize">{size}</span>
            </Button>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="alt">Texto Alternativo</Label>
        <Input
          id="alt"
          value={data.alt || ''}
          onChange={(e) => onUpdate({ ...data, alt: e.target.value })}
          placeholder="Descrição da imagem"
        />
        <p className="text-xs text-gray-500 mt-1">
          Forneça uma descrição da imagem para acessibilidade
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="caption">Legenda</Label>
        <Input
          id="caption"
          value={data.caption || ''}
          onChange={(e) => onUpdate({ ...data, caption: e.target.value })}
          placeholder="Legenda da imagem"
        />
      </div>
    </div>
  );
};

export default EnhancedImageProperties;
