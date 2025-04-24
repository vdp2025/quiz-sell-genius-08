
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Upload, Plus } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface ImageGalleryProps {
  onSelectImage: (url: string) => void;
}

const PLACEHOLDER_IMAGES = [
  { id: 1, url: "/lovable-uploads/24f7dc2c-ab37-41ba-a154-786b0626ae04.png", name: "Natural Style" },
  { id: 2, url: "/lovable-uploads/0fb54364-9c71-4373-b6e7-500e6f9a2732.png", name: "Classic Style" },
  { id: 3, url: "/lovable-uploads/22d18ed7-b1fc-4fb4-9538-f0ab93fe5c75.png", name: "Contemporary Style" },
  { id: 4, url: "/lovable-uploads/e779494d-0c8d-408d-b034-1964a3b76469.png", name: "Elegant Style" },
  { id: 5, url: "/lovable-uploads/94638e1c-0180-4cfd-80be-26db97a1e58f.png", name: "Romantic Style" },
  { id: 6, url: "/lovable-uploads/919b184d-940d-4a4f-b53c-36792cbd6114.png", name: "Sexy Style" },
  { id: 7, url: "/lovable-uploads/84341867-0bff-402e-a89f-be5747b706ba.png", name: "Dramatic Style" },
  { id: 8, url: "/lovable-uploads/d633e490-d0f2-4429-998e-bceeeda790f8.png", name: "Creative Style" },
];

const ImageGallery: React.FC<ImageGalleryProps> = ({ onSelectImage }) => {
  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <Label className="text-sm font-medium">Galeria de Imagens</Label>
        <Button variant="outline" size="sm">
          <Upload className="w-4 h-4 mr-1" />
          <span>Upload</span>
        </Button>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="grid grid-cols-2 gap-2">
          {PLACEHOLDER_IMAGES.map((image) => (
            <div
              key={image.id}
              className="border rounded-md overflow-hidden cursor-pointer hover:border-[#B89B7A] transition-colors"
              onClick={() => onSelectImage(image.url)}
            >
              <div className="aspect-square w-full relative">
                <img
                  src={image.url}
                  alt={image.name}
                  className="object-cover h-full w-full"
                />
              </div>
              <div className="p-1 text-xs truncate text-center bg-[#F9F6F2]">
                {image.name}
              </div>
            </div>
          ))}
          
          <Button
            variant="ghost"
            className="border border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center h-32 hover:border-[#B89B7A] hover:bg-[#F9F6F2]"
          >
            <Plus className="w-8 h-8 text-gray-400" />
            <span className="text-xs text-gray-500 mt-1">Adicionar Imagem</span>
          </Button>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ImageGallery;
