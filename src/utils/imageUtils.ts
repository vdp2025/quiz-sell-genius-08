
import { StyleCategory } from '@/types/quizBuilder';

export const getFallbackImage = (styleCategory: StyleCategory) => {
  // Use Cloudinary URLs for consistent image delivery
  const baseUrl = 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/';
  
  // Map each style category to a specific fallback image
  const fallbacks: Record<StyleCategory, string> = {
    'Natural': '2_ziffwx.webp',   // Visual leve, despojado e natural
    'Clássico': '3_asaunw.webp',  // Visual clássico e tradicional
    'Contemporâneo': '4_snhaym.webp', // Praticidade com um toque de estilo atual
    'Elegante': '5_dhrgpf.webp',  // Visual refinado e imponente
    'Romântico': '6_gnoxfg.webp', // Visual romântico, feminino e delicado
    'Sexy': '7_ynez1z.webp',      // Visual sensual, com saia justa e decote
    'Dramático': '8_yqu3hw.webp', // Visual marcante e urbano
    'Criativo': '9_x6so6a.webp'   // Visual criativo, colorido e ousado
  };
  
  return baseUrl + fallbacks[styleCategory];
};

export const verifyImageUrl = (url: string, styleCategory: StyleCategory): string => {
  if (!url || url === '') {
    return getFallbackImage(styleCategory);
  }
  
  // Check if URL is already on Cloudinary
  if (url.includes('cloudinary.com')) {
    return url;
  }
  
  // For local development URLs, use fallbacks
  if (url.startsWith('blob:') || url.startsWith('data:')) {
    console.warn('Using fallback image for local URL:', url);
    return getFallbackImage(styleCategory);
  }
  
  return url;
};

// Function to help with preloading
export const preloadImages = (images: string[]) => {
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
};

// Get style-based background color for fallbacks
export const getFallbackStyle = (styleCategory: string) => {
  // Map each style to a specific background color for fallbacks
  const colors: Record<string, { bg: string, text: string }> = {
    'Natural': { bg: '#F5F5DC', text: '#654321' },     // Beige/Brown
    'Clássico': { bg: '#F0F0F0', text: '#000080' },    // Light Gray/Navy
    'Contemporâneo': { bg: '#E0E0E0', text: '#4682B4' }, // Silver/Steel Blue
    'Elegante': { bg: '#FFF8DC', text: '#800020' },    // Cream/Burgundy
    'Romântico': { bg: '#FFF0F5', text: '#FF69B4' },   // Lavender/Pink
    'Sexy': { bg: '#FFE4E1', text: '#8B0000' },        // Misty Rose/Dark Red
    'Dramático': { bg: '#E6E6FA', text: '#4B0082' },   // Lavender/Indigo
    'Criativo': { bg: '#F0FFF0', text: '#2E8B57' }     // Honeydew/Sea Green
  };

  const style = colors[styleCategory] || colors['Natural'];
  
  return {
    backgroundColor: style.bg,
    color: style.text,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    borderRadius: '0.375rem',
    fontWeight: 500,
    fontSize: '0.875rem'
  };
};
