
import { StyleCategory } from "@/types/quiz";

export function getStyleDescription(style: StyleCategory): string {
  const descriptions: Record<StyleCategory, string> = {
    'Natural': 'Seu estilo é caracterizado pelo conforto e praticidade, com uma estética descontraída e autêntica. Você valoriza a simplicidade, a funcionalidade e a liberdade de movimento nas roupas. Tecidos naturais e texturas orgânicas combinam perfeitamente com sua personalidade espontânea e despretenciosa.',
    'Clássico': 'Seu estilo é sofisticado, atemporal e impecável. Você aprecia peças de alta qualidade e cortes tradicionais que não passam com as tendências. Sua imagem transmite seriedade, confiabilidade e um senso estético refinado, sempre com discrição e elegância contida.',
    'Contemporâneo': 'Você equilibra o clássico e o moderno, valorizando peças versáteis e atuais sem cair em modismos. Seu visual é clean, funcional e adaptável, refletindo sua personalidade prática e conectada com o presente. Você aprecia linhas simples e um estilo que funciona em diversos ambientes.',
    'Elegante': 'Seu estilo é marcado pelo refinamento e sofisticação, com grande atenção aos detalhes. Você valoriza tecidos nobres, acabamentos perfeitos e um caimento impecável. Sua imagem transmite distinção, exclusividade e um senso estético apurado, sempre com uma elegância natural e discreta.',
    'Romântico': 'Seu estilo é delicado, feminino e cheio de suavidade. Você aprecia detalhes como rendas, babados e estampas florais que expressam sensibilidade e doçura. Tecidos fluidos e cores suaves complementam sua personalidade gentil, afetuosa e sonhadora.',
    'Sexy': 'Seu estilo é marcado pela sensualidade e confiança. Você não tem medo de valorizar suas curvas com roupas que acentuam o corpo. Cores vibrantes, tecidos com brilho ou transparência são suas escolhas naturais, refletindo sua personalidade magnética e autoconfiante.',
    'Dramático': 'Seu estilo é arrojado, impactante e estruturado. Você aprecia peças com caimento definido, linhas arquitetônicas e um visual que não passa despercebido. Sua imagem reflete ousadia, determinação e uma personalidade forte que não teme se destacar.',
    'Criativo': 'Seu estilo é único, expressivo e autêntico. Você combina elementos inesperados, cores vibrantes e peças originais para criar um visual que é uma verdadeira expressão artística. Sua imagem reflete sua personalidade inventiva, independente e seu pensamento fora da caixa.'
  };
  
  return descriptions[style];
}

export function getStyleImage(style: StyleCategory): string {
  const images: Record<StyleCategory, string> = {
    'Natural': '/lovable-uploads/1ac66423-7712-4c33-9c28-13e8b6fe3170.png',
    'Clássico': '/lovable-uploads/169fe8d0-8afd-4447-a9cc-79d917967e64.png',
    'Contemporâneo': '/lovable-uploads/0530ff81-b41d-45eb-8b47-ef88f75f7d93.png',
    'Elegante': '/lovable-uploads/d9da05d3-6fdd-46d0-afea-42417af058c5.png',
    'Romântico': '/lovable-uploads/5b819e5d-ca43-465a-906e-353764bdb2ec.png',
    'Sexy': '/lovable-uploads/54671bc8-ed46-4e5d-a347-5c8e8fe45f8b.png',
    'Dramático': '/lovable-uploads/e30cb887-b027-40ab-b112-fe8c2244d789.png',
    'Criativo': '/lovable-uploads/fc8f4066-6f40-4ff8-bc55-460da133b6c2.png'
  };
  
  return images[style];
}

export function getStyleKey(category: StyleCategory): string {
  return category.toLowerCase();
}

export function getStyleColor(style: StyleCategory): string {
  const colors: Record<StyleCategory, string> = {
    'Natural': '#A8B892',
    'Clássico': '#1A3A52',
    'Contemporâneo': '#8FB4D7',
    'Elegante': '#592C31',
    'Romântico': '#D999B9',
    'Sexy': '#9D2235',
    'Dramático': '#2C2C32',
    'Criativo': '#EF7D00'
  };
  
  return colors[style];
}
