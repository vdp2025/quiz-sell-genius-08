
import { Block } from '@/types/editor';
import { generateId } from '@/utils/idGenerator';
import { salesConfig } from '@/config/salesConfig';
import { createHeadlineBlock, createBenefitsBlock, createTestimonialsBlock } from './commonBlocks';
import { createStyleHeroBlock, createStyleResultBlock } from './styleBlocks';

export class BlockFactory {
  static createBlock(type: Block['type'], order: number, styleType: string = 'Natural'): Block {
    return {
      id: generateId(),
      type,
      content: {},
      order
    };
  }

  static createDefaultBlocks(styleType: string): Block[] {
    return [
      createStyleHeroBlock(styleType, 0),
      createHeadlineBlock(1),
      createStyleResultBlock(styleType, 2),
      createBenefitsBlock(3),
      createTestimonialsBlock(4)
    ];
  }

  static createSalesPageBlocks(styleType: string): Block[] {
    const style = styleType.toLowerCase();
    const config = salesConfig;
    const styleSpecificBenefits = config.styleSpecificContent[style]?.benefits || config.defaultBlocks[2].content.items;
    const styleGuideImage = config.images.capas[style];

    return [
      // Hero Section Block
      {
        id: generateId(),
        type: 'hero-section',
        order: 0,
        content: {
          title: "VOCÊ DESCOBRIU SEU ESTILO",
          subtitle: "Agora é hora de aplicar com clareza — e se vestir de você",
          heroImage: styleGuideImage,
          heroImage2: config.images.gisele,
          style: {
            backgroundColor: "#fff7f3"
          }
        }
      },
      
      // Style Hero Block
      {
        id: generateId(),
        type: 'style-hero',
        order: 1,
        content: {
          title: `Seu Guia de Estilo ${styleType}`,
          subtitle: "Conhecimento é clareza. E clareza muda o jeito que você se vê, se escolhe, se posiciona.",
          description: "Mas é na ação que a verdadeira transformação acontece. É quando você aplica o que aprendeu… que o espelho começa a contar uma nova história.",
          mainImage: config.images.mockups.tablet,
          style: {
            backgroundColor: "#ffffff",
            padding: "2rem",
            borderRadius: "1rem",
            margin: "2rem 0 0 0"
          }
        }
      },

      // Benefits Block
      {
        id: generateId(),
        type: 'benefits',
        order: 2,
        content: {
          title: "O que você vai descobrir no seu Guia de Estilo:",
          items: styleSpecificBenefits,
          style: {
            backgroundColor: "#ffffff",
            padding: "2rem",
            borderRadius: "1rem",
            margin: "2rem 0 0 0"
          }
        }
      },

      // Offer Block with Images
      {
        id: generateId(),
        type: 'offer',
        order: 3,
        content: {
          title: "Receba agora seu Guia Completo:",
          subtitle: "Transforme seu guarda-roupa com sabedoria",
          price: "39,00",
          regularPrice: "175,00",
          ctaText: "Quero meu Guia + Bônus por R$39,00",
          ctaUrl: "https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912",
          productImage: config.images.mockups.todos,
          style: {
            backgroundColor: "#ffffff",
            padding: "2rem",
            borderRadius: "1rem",
            margin: "2rem 0 0 0"
          }
        }
      },

      // Testimonials Block
      {
        id: generateId(),
        type: 'testimonials',
        order: 4,
        content: {
          title: "O que dizem as alunas",
          testimonials: [
            {
              text: "O guia mudou completamente minha relação com a moda. Agora sei exatamente o que combina comigo!",
              author: "Maria Silva",
              location: "São Paulo"
            },
            {
              text: "Finalmente entendi meu estilo e parei de gastar dinheiro com roupas que não uso.",
              author: "Ana Costa",
              location: "Rio de Janeiro"
            }
          ],
          style: {
            backgroundColor: "#ffffff",
            padding: "2rem",
            borderRadius: "1rem",
            margin: "2rem 0 0 0"
          }
        }
      },

      // Guarantee Block
      {
        id: generateId(),
        type: 'guarantee',
        order: 5,
        content: {
          title: "Garantia de 7 dias",
          text: "Se você não ficar 100% satisfeita com o conteúdo nos primeiros 7 dias, devolvemos seu dinheiro integralmente, sem burocracia.",
          image: config.images.garantia,
          style: {
            backgroundColor: "#ffffff",
            padding: "2rem",
            borderRadius: "1rem",
            margin: "2rem 0 0 0"
          }
        }
      },

      // Final CTA Block
      {
        id: generateId(),
        type: 'cta',
        order: 6,
        content: {
          title: "Transforme seu estilo agora",
          buttonText: "Quero o Guia + Bônus por R$39,00",
          ctaUrl: "https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912",
          style: {
            backgroundColor: "#fff7f3",
            padding: "2rem",
            borderRadius: "1rem",
            margin: "2rem 0 0 0"
          }
        }
      }
    ];
  }
}
