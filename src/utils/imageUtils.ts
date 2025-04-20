
import { StyleCategory } from '@/types/quizBuilder';

export const getFallbackImage = (styleCategory: StyleCategory) => {
  const baseUrl = '/lovable-uploads/';
  const fallbacks: Record<StyleCategory, string> = {
    'Natural': '24f7dc2c-ab37-41ba-a154-786b0626ae04.png',
    'Clássico': '0fb54364-9c71-4373-b6e7-500e6f9a2732.png',
    'Contemporâneo': '22d18ed7-b1fc-4fb4-9538-f0ab93fe5c75.png',
    'Elegante': 'e779494d-0c8d-408d-b034-1964a3b76469.png',
    'Romântico': '94638e1c-0180-4cfd-80be-26db97a1e58f.png',
    'Sexy': '919b184d-940d-4a4f-b53c-36792cbd6114.png',
    'Dramático': '84341867-0bff-402e-a89f-be5747b706ba.png',
    'Criativo': 'd633e490-d0f2-4429-998e-bceeeda790f8.png'
  };
  
  return baseUrl + fallbacks[styleCategory];
};

export const verifyImageUrl = (url: string, styleCategory: StyleCategory) => {
  if (!url || !url.startsWith('/lovable-uploads/')) {
    return getFallbackImage(styleCategory);
  }
  return url;
};
