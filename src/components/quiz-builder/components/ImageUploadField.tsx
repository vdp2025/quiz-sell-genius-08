
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Image, Upload, X, ExternalLink } from 'lucide-react';

interface ImageUploadFieldProps {
  label?: string;
  value?: string;
  onChange: (url: string) => void;
  placeholder?: string;
  className?: string;
  previewSize?: 'small' | 'medium' | 'large'; 
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label = 'Imagem',
  value = '',
  onChange,
  placeholder = 'URL da imagem',
  className = '',
  previewSize = 'medium'
}) => {
  const [activeTab, setActiveTab] = useState<string>('url');
  const [previewError, setPreviewError] = useState<boolean>(false);
  
  // Gallery images for demo purposes
  const galleryImages = [
    'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
    'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    'https://images.unsplash.com/photo-1518005020951-eccb494ad742',
    'https://images.unsplash.com/photo-1582562124811-c09040d0a901'
  ];

  const handleImageLoad = () => {
    setPreviewError(false);
  };

  const handleImageError = () => {
    setPreviewError(true);
  };

  const getPreviewSizeClass = () => {
    switch (previewSize) {
      case 'small': return 'max-h-20';
      case 'large': return 'max-h-60';
      default: return 'max-h-40';
    }
  };

  const clearImage = () => {
    onChange('');
  };
  
  return (
    <div className={className}>
      {label && <Label className="mb-1.5 block">{label}</Label>}
      
      <Tabs 
        defaultValue="url" 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="url">URL</TabsTrigger>
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="gallery">Galeria</TabsTrigger>
        </TabsList>
        
        <TabsContent value="url" className="pt-3 space-y-3">
          <div className="flex items-start gap-2">
            <Input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="flex-1"
            />
            {value && (
              <Button 
                type="button" 
                variant="outline" 
                size="icon"
                onClick={clearImage}
                className="shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          {value && (
            <div className="relative mt-2">
              <div className="flex items-center justify-center p-2 border rounded-md bg-gray-50">
                {previewError ? (
                  <div className="text-center text-sm text-gray-500 py-4">
                    <Image className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    Erro ao carregar imagem
                  </div>
                ) : (
                  <div className="relative group">
                    <img 
                      src={value} 
                      alt="Preview"
                      className={`${getPreviewSizeClass()} object-contain mx-auto`}
                      onLoad={handleImageLoad}
                      onError={handleImageError}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => window.open(value, '_blank')}
                        className="bg-white/80 hover:bg-white"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" /> Ver
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="upload" className="pt-3">
          <Card className="border border-dashed p-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-8 w-8 text-gray-400" />
              <p className="text-sm text-gray-500">
                Arraste uma imagem ou clique para fazer upload
              </p>
              <Button className="mt-2" size="sm">
                Selecionar arquivo
              </Button>
            </div>
            <Input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              id="image-upload"
              onChange={(e) => {
                // In a real implementation, this would upload to a service
                console.log("Upload file:", e.target.files?.[0]);
                // For demo purposes, we can use a fake URL
                if (e.target.files && e.target.files[0]) {
                  const fakeUrl = URL.createObjectURL(e.target.files[0]);
                  onChange(fakeUrl);
                  setActiveTab('url');
                }
              }}
            />
          </Card>
        </TabsContent>
        
        <TabsContent value="gallery" className="pt-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {galleryImages.map((img, idx) => (
              <div 
                key={idx} 
                className="aspect-square bg-gray-100 rounded cursor-pointer hover:ring-2 hover:ring-[#B89B7A] overflow-hidden"
                onClick={() => {
                  onChange(img);
                  setActiveTab('url');
                }}
              >
                <img 
                  src={img} 
                  alt={`Gallery image ${idx + 1}`} 
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ImageUploadField;
