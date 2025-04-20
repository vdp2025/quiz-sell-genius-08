
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Image, Upload, X, Link as LinkIcon } from 'lucide-react';

interface ImageUploaderProps {
  imageUrl?: string;
  onImageUpload: (url: string) => void;
  onImageRemove: () => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  imageUrl,
  onImageUpload,
  onImageRemove
}) => {
  const [urlInput, setUrlInput] = useState('');
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const file = event.target.files?.[0];
    
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      setUploadError('O arquivo selecionado não é uma imagem.');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onImageUpload(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };
  
  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      onImageUpload(urlInput.trim());
      setUrlInput('');
    }
  };

  if (imageUrl) {
    return (
      <div className="relative">
        <img
          src={imageUrl}
          alt="Preview"
          className="w-full h-48 object-cover rounded-lg"
        />
        <Button
          variant="destructive"
          size="icon"
          className="absolute top-2 right-2"
          onClick={onImageRemove}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload" className="flex items-center gap-1">
            <Upload className="h-4 w-4" />
            <span>Upload</span>
          </TabsTrigger>
          <TabsTrigger value="url" className="flex items-center gap-1">
            <LinkIcon className="h-4 w-4" />
            <span>URL</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="pt-4">
          <div className="border-2 border-dashed border-[#B89B7A]/30 rounded-lg p-6 text-center">
            <label className="cursor-pointer flex flex-col items-center gap-3">
              <Image className="h-8 w-8 text-[#B89B7A]" />
              <span className="text-sm text-[#8F7A6A]">
                Clique para fazer upload
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            {uploadError && (
              <p className="mt-2 text-sm text-red-500">{uploadError}</p>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="url" className="pt-4">
          <form onSubmit={handleUrlSubmit} className="space-y-4">
            <div className="flex items-center gap-2">
              <Input
                type="url"
                placeholder="https://exemplo.com/imagem.jpg"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
              />
              <Button type="submit" variant="secondary">
                Adicionar
              </Button>
            </div>
            <p className="text-xs text-[#8F7A6A]">
              Cole a URL de uma imagem da web
            </p>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};
