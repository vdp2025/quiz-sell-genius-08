
import React, { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ImagePlus, Upload, Link } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';

interface ImagePickerProps {
  value: string;
  onChange: (url: string) => void;
  className?: string;
}

export const ImagePicker: React.FC<ImagePickerProps> = ({
  value,
  onChange,
  className,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'url' | 'upload'>('url');
  const [imageUrl, setImageUrl] = useState(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // For demonstration purposes - in a real app, this would upload to a server
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // This is just a placeholder for the real upload functionality
    // In reality, you'd want to upload the file to your server or a service like Cloudinary
    const fakeUploadedUrl = URL.createObjectURL(file);
    setImageUrl(fakeUploadedUrl);
    onChange(fakeUploadedUrl);
    setIsDialogOpen(false);
  };

  const confirmImageUrl = () => {
    onChange(imageUrl);
    setIsDialogOpen(false);
  };

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="URL da imagem..."
          className="flex-1"
        />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <ImagePlus className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Selecionar Imagem</DialogTitle>
            </DialogHeader>
            
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'url' | 'upload')}>
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="url">URL</TabsTrigger>
                <TabsTrigger value="upload">Upload</TabsTrigger>
              </TabsList>
              
              <TabsContent value="url" className="space-y-4 mt-4">
                <Input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://exemplo.com/imagem.jpg"
                />
                <Button onClick={confirmImageUrl} className="w-full">
                  <Link className="h-4 w-4 mr-2" />
                  Confirmar URL
                </Button>
              </TabsContent>
              
              <TabsContent value="upload" className="space-y-4 mt-4">
                <Card className="flex flex-col items-center justify-center p-6 border-dashed border-2 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Clique para fazer upload ou arraste uma imagem
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />
                </Card>
              </TabsContent>
            </Tabs>

            {imageUrl && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Pré-visualização:</p>
                <div className="border rounded-md overflow-hidden">
                  <img 
                    src={imageUrl} 
                    alt="Preview" 
                    className="w-full h-auto object-contain max-h-40"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/300x150?text=Imagem+Inválida';
                    }}
                  />
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {value && (
        <div className="mt-2 border rounded-md overflow-hidden">
          <img 
            src={value} 
            alt="Preview" 
            className="w-full h-auto object-contain max-h-32" 
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/300x150?text=Imagem+Inválida';
            }}
          />
        </div>
      )}
    </div>
  );
};
