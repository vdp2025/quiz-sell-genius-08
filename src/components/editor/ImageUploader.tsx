
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Image as ImageIcon, Link } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ImageUploaderProps {
  currentImageUrl: string;
  onImageChange: (url: string) => void;
  imageAlt?: string;
  onAltChange?: (alt: string) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  currentImageUrl,
  onImageChange,
  imageAlt = '',
  onAltChange
}) => {
  const [tab, setTab] = useState<string>(currentImageUrl ? 'url' : 'upload');
  const [imageUrl, setImageUrl] = useState<string>(currentImageUrl || '');
  const [alt, setAlt] = useState<string>(imageAlt || '');

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
  };

  const handleUrlSubmit = () => {
    onImageChange(imageUrl);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Create a FormData object to hold the file
      const formData = new FormData();
      formData.append('file', file);
      
      // Mock file upload - in a real app, you'd upload to a server
      // For now, we'll use a simple URL.createObjectURL
      const imageUrl = URL.createObjectURL(file);
      onImageChange(imageUrl);
      setImageUrl(imageUrl);
      setTab('url'); // Switch to URL tab to show preview
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleAltChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAlt = e.target.value;
    setAlt(newAlt);
    if (onAltChange) {
      onAltChange(newAlt);
    }
  };

  return (
    <div className="space-y-4">
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="url">URL da imagem</TabsTrigger>
          <TabsTrigger value="upload">Upload</TabsTrigger>
        </TabsList>
        
        <TabsContent value="url" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="image-url">URL da imagem</Label>
            <div className="flex space-x-2">
              <Input
                id="image-url"
                value={imageUrl}
                onChange={handleUrlChange}
                placeholder="https://exemplo.com/imagem.jpg"
              />
              <Button type="button" onClick={handleUrlSubmit} size="sm">
                <Link className="h-4 w-4 mr-2" />
                Aplicar
              </Button>
            </div>
          </div>
          
          {imageUrl && (
            <div className="mt-2 p-2 bg-gray-50 rounded border">
              <img 
                src={imageUrl} 
                alt={alt || "Preview da imagem"} 
                className="max-h-40 mx-auto object-contain" 
              />
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="upload" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="image-upload">Carregar imagem</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center">
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-2">Arraste uma imagem ou clique para selecionar</p>
              <Input
                id="image-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              <Button onClick={() => document.getElementById('image-upload')?.click()}>
                Selecionar arquivo
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="space-y-2">
        <Label htmlFor="image-alt">Texto alternativo</Label>
        <Input
          id="image-alt"
          value={alt}
          onChange={handleAltChange}
          placeholder="Descrição da imagem para acessibilidade"
        />
        <p className="text-xs text-gray-500">
          Descreva o conteúdo da imagem para melhorar a acessibilidade
        </p>
      </div>
    </div>
  );
};
