
import { useState, useEffect, useCallback } from 'react';
import { ResultPageConfig } from '@/types/resultPageConfig';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { set, get } from 'lodash';

const LOCAL_STORAGE_KEY = 'result_page_configs';

// Default configuration for a style
const createDefaultConfig = (styleType: string): ResultPageConfig => ({
  styleType,
  header: {
    visible: true,
    content: {
      title: 'Olá, {{userName}}, seu Estilo Predominante é:',
      showLogo: true
    },
    appearance: {
      textColor: '#432818',
      fontSize: 'lg'
    }
  },
  mainContent: {
    visible: true,
    content: {
      description: 'Características principais do seu estilo {{primaryStyle}}:',
      showStyleImage: true,
      showPercentage: true
    },
    appearance: {
      backgroundColor: 'white',
      textColor: '#1A1818',
      borderColor: '#B89B7A'
    }
  },
  secondaryStyles: {
    visible: true,
    content: {
      title: 'Seus Estilos Complementares',
      showImages: true,
      maxStyles: 2
    },
    appearance: {
      backgroundColor: '#f9f9f9',
      textColor: '#1A1818',
      compact: false
    }
  },
  offer: {
    hero: {
      visible: true,
      content: {
        title: 'VOCÊ DESCOBRIU SEU ESTILO',
        subtitle: 'Agora é hora de aplicar com clareza — e se vestir de você',
        image1: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp',
        image2: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744921536/Sem_nome_1080_x_1000_px_z0chuv.webp'
      },
      appearance: {
        textColor: '#aa6b5d',
        backgroundColor: '#fffaf7',
        showImages: true
      }
    },
    products: {
      visible: true,
      content: {
        title: 'Transforme seu Estilo',
        productImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_14_oxegnd.webp',
        benefitTitle1: 'Guia de Estilo e Imagem',
        benefitItems1: 'Descubra seu estilo com precisão,Aprenda a criar looks autênticos,Técnicas de composição visual',
        benefitTitle2: 'Bônus Exclusivos',
        benefitItems2: 'Visagismo Facial Estratégico,Peças-Chave do Guarda-Roupa,Consultoria em Grupo'
      },
      appearance: {
        textColor: '#aa6b5d',
        backgroundColor: 'white',
        showImages: true
      }
    },
    pricing: {
      visible: true,
      content: {
        regularPrice: '175,00',
        salePrice: '39,00',
        buttonText: 'Quero Transformar Meu Estilo Agora',
        checkoutUrl: 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912',
        limitedTimeText: 'Oferta por tempo limitado'
      },
      appearance: {
        backgroundColor: 'white',
        accentColor: '#aa6b5d',
        textColor: '#3a3a3a',
        buttonSize: 'large'
      }
    },
    benefits: {
      visible: true,
      content: {
        title1: 'O que você vai aprender:',
        benefits1: 'Aplicar seus estilos com autenticidade,Montar looks práticos para o dia a dia, trabalho e eventos,Usar cores e modelagens que valorizam quem você é,Parar de errar nas compras e economizar tempo',
        title2: 'Bônus Exclusivos:',
        benefits2: 'Visagismo Facial Estratégico: descubra cortes, acessórios e formatos que valorizam seu rosto,Peças-Chave do Guarda-Roupa: construa um armário funcional com o que você já tem'
      },
      appearance: {
        backgroundColor: 'white',
        textColor: '#3a3a3a',
        accentColor: '#aa6b5d',
        iconColor: '#aa6b5d'
      }
    },
    testimonials: {
      visible: true,
      content: {
        title: 'O que as alunas estão dizendo',
        showAvatars: true,
        maxTestimonials: 3
      },
      appearance: {
        backgroundColor: '#f9ede8',
        cardBackgroundColor: 'white',
        textColor: '#3a3a3a',
        accentColor: '#aa6b5d'
      }
    },
    guarantee: {
      visible: true,
      content: {
        text: '✨ Oferta exclusiva por tempo limitado. Depois desta página, o valor pode voltar ao original!',
        image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744916216/C%C3%B3pia_de_01._P%C3%A1gina_-_Produto_de_Entrada_2_hamaox.webp'
      },
      appearance: {
        backgroundColor: '#ffefec',
        borderColor: '#aa6b5d',
        borderStyle: 'dashed',
        textColor: '#3a3a3a'
      }
    }
  }
});

export const useResultPageConfig = (styleType: string) => {
  const [resultPageConfig, setResultPageConfig] = useState<ResultPageConfig>(createDefaultConfig(styleType));
  const [loading, setLoading] = useState(true);

  // Load the configuration for the given style
  useEffect(() => {
    const loadConfig = async () => {
      setLoading(true);
      try {
        // Try to load from Supabase if available
        if (supabase) {
          const { data, error } = await supabase
            .from('result_page_configs')
            .select('*')
            .eq('style_type', styleType)
            .single();
          
          if (!error && data) {
            setResultPageConfig(data.config);
            setLoading(false);
            return;
          }
        }
        
        // If Supabase fails or is not available, try localStorage
        const configsJson = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (configsJson) {
          const configs = JSON.parse(configsJson);
          if (configs[styleType]) {
            setResultPageConfig(configs[styleType]);
            setLoading(false);
            return;
          }
        }
        
        // If no configuration found, use default
        setResultPageConfig(createDefaultConfig(styleType));
      } catch (error) {
        console.error('Error loading result page config:', error);
        toast({
          title: 'Erro ao carregar configuração',
          description: 'Não foi possível carregar a configuração da página de resultados',
          variant: 'destructive'
        });
        setResultPageConfig(createDefaultConfig(styleType));
      } finally {
        setLoading(false);
      }
    };
    
    loadConfig();
  }, [styleType]);

  // Update a section in the configuration
  const updateSection = useCallback((path: string, newSection: any) => {
    setResultPageConfig(prevConfig => {
      const newConfig = { ...prevConfig };
      set(newConfig, path, newSection);
      return newConfig;
    });
  }, []);

  // Reset the configuration to default
  const resetConfig = useCallback((styleType: string) => {
    setResultPageConfig(createDefaultConfig(styleType));
  }, []);

  // Save the configuration
  const saveConfig = useCallback(async () => {
    try {
      // Try to save to Supabase if available
      if (supabase) {
        const { error } = await supabase
          .from('result_page_configs')
          .upsert({
            style_type: resultPageConfig.styleType,
            config: resultPageConfig,
            updated_at: new Date().toISOString()
          });
        
        if (error) {
          throw error;
        }
      }
      
      // Also save to localStorage as fallback
      const configsJson = localStorage.getItem(LOCAL_STORAGE_KEY);
      let configs = {};
      
      if (configsJson) {
        configs = JSON.parse(configsJson);
      }
      
      configs = {
        ...configs,
        [resultPageConfig.styleType]: resultPageConfig
      };
      
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(configs));
      return true;
    } catch (error) {
      console.error('Error saving result page config:', error);
      toast({
        title: 'Erro ao salvar configuração',
        description: 'Não foi possível salvar a configuração da página de resultados',
        variant: 'destructive'
      });
      return false;
    }
  }, [resultPageConfig]);

  return {
    resultPageConfig,
    updateSection,
    resetConfig,
    saveConfig,
    loading
  };
};
