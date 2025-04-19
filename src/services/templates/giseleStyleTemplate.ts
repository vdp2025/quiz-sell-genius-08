
import { Block } from '@/types/editor';

export const giseleStyleTemplate: Block[] = [
  {
    id: "logo-gisele",
    type: "image",
    content: {
      imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp",
      imageAlt: "Logo Gisele Galvão"
    },
    order: 0
  },
  {
    id: "headline-transformadora",
    type: "headline",
    content: {
      title: "Seu estilo foi revelado. Agora é hora da transformação.",
      subtitle: "Descubra como aplicar seu estilo com confiança, leveza e autenticidade.",
      textColor: "#aa6b5d",
      alignment: "center"
    },
    order: 1
  },
  {
    id: "copy-central",
    type: "text",
    content: {
      text: "Você acabou de dar um passo essencial: descobrir o seu estilo predominante. Mas o verdadeiro poder dessa descoberta não está no resultado em si — e sim no que você faz com ele.\n\nSaber o que te representa é libertador. Mas viver esse estilo com intenção é o que transforma a forma como você se vê, se veste e se posiciona no mundo."
    },
    order: 2
  },
  {
    id: "benefits-guia",
    type: "benefits",
    content: {
      title: "Você vai aprender a:",
      items: [
        "Identificar e aplicar seus estilos com confiança",
        "Montar looks para o dia a dia, trabalho e eventos",
        "Usar cores, tecidos e modelagens que realçam quem você é",
        "Transmitir sua essência com estratégia, leveza e presença",
        "Fazer compras mais conscientes e parar de errar nas escolhas"
      ]
    },
    order: 3
  },
  {
    id: "bonus-inclusos",
    type: "bonus",
    content: {
      text: "🎁 Bônus 1: Visagismo Facial Estratégico\nAprenda a usar seu formato de rosto com inteligência estética.\n\n🎁 Bônus 2: Peças-Chave do Guarda-Roupa\nLooks funcionais com o que você já tem, com praticidade e estilo."
    },
    order: 4
  },
  {
    id: "pricing-calltoaction",
    type: "pricing",
    content: {
      regularPrice: "175,00",
      salePrice: "39,00",
      buttonText: "Quero meu Guia + Bônus",
      checkoutUrl: "https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912",
      urgencyText: "Oferta exclusiva por tempo limitado"
    },
    order: 5
  },
  {
    id: "bloco-depoimentos",
    type: "testimonials",
    content: {
      title: "Transformações reais:",
      text: "Renata C. (41 anos): \"Comprei menos, combinei mais e finalmente entendi o que comunica quem eu sou.\"\n\nTatiane M. (34 anos): \"O visagismo foi revelador! Cortei o cabelo certo, acertei nos brincos e estou sendo notada.\"\n\nLuciana D. (38 anos): \"Me sinto mais leve, elegante e segura ao me posicionar.\""
    },
    order: 6
  },
  {
    id: "urgency-banner",
    type: "urgency",
    content: {
      text: "✨ Essa oferta especial é exclusiva para quem concluiu o teste de estilo. Aproveite antes que o valor volte ao normal!"
    },
    order: 7
  },
  {
    id: "cta-final",
    type: "cta",
    content: {
      title: "Garanta seu acesso agora mesmo",
      buttonText: "Quero meu Guia + Bônus",
      url: "https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912",
      alignment: "center"
    },
    order: 8
  }
];
