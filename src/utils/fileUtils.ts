
import { toast } from '@/components/ui/use-toast';

export const downloadJSON = (data: any, fileName: string = 'download') => {
  try {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = href;
    link.download = `${fileName}.json`;
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  } catch (error) {
    console.error('Error downloading JSON:', error);
    throw error;
  }
};

export const uploadJSON = <T = any>(): Promise<T> => {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,application/json';
    
    input.onchange = (event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      
      if (!file) {
        reject(new Error('No file selected'));
        return;
      }
      
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const parsed = JSON.parse(content);
          resolve(parsed);
        } catch (error) {
          console.error('Error parsing JSON:', error);
          toast({
            title: "Erro ao importar",
            description: "O arquivo não contém um JSON válido",
            variant: "destructive"
          });
          reject(error);
        }
      };
      
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
        reject(error);
      };
      
      reader.readAsText(file);
    };
    
    input.click();
  });
};
