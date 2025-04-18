
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

interface ResultConfig {
  [key: string]: any;
}

// Função para obter a config do localStorage
const getStoredConfig = (styleType: string): ResultConfig | null => {
  try {
    const stored = localStorage.getItem(`quiz_result_config_${styleType}`);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Erro ao carregar configuração:', error);
    return null;
  }
};

// Função para salvar a config no localStorage
const saveStoredConfig = (styleType: string, config: ResultConfig): boolean => {
  try {
    localStorage.setItem(`quiz_result_config_${styleType}`, JSON.stringify(config));
    return true;
  } catch (error) {
    console.error('Erro ao salvar configuração:', error);
    return false;
  }
};

export const useQuizResultConfig = (styleType: string) => {
  const [config, setConfig] = useState<ResultConfig>({});
  const [loading, setLoading] = useState(true);

  // Carrega a configuração ao inicializar
  useEffect(() => {
    const storedConfig = getStoredConfig(styleType);
    if (storedConfig) {
      setConfig(storedConfig);
    } else {
      // Configuração padrão se não existir
      setConfig({
        header: {
          title: `Olá, seu Estilo Predominante é:`,
        },
        primaryStyle: {
          description: getDefaultDescription(styleType),
        },
        offer: {
          title: "VOCÊ DESCOBRIU SEU ESTILO",
          subtitle: "Agora é hora de aplicar com clareza — e se vestir de você",
          price: "39,00",
          regularPrice: "175,00",
          ctaText: "Quero meu Guia + Bônus",
          ctaUrl: "https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912"
        }
      });
    }
    setLoading(false);
  }, [styleType]);

  // Atualiza uma seção da configuração
  const updateConfig = (sectionKey: string, data: any) => {
    setConfig(prev => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        ...data
      }
    }));
  };

  // Salva a configuração atual
  const saveConfig = async (): Promise<boolean> => {
    const success = saveStoredConfig(styleType, config);
    if (success) {
      return true;
    } else {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as configurações.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    config,
    updateConfig,
    saveConfig,
    loading
  };
};

// Descrições padrão baseadas no tipo de estilo
function getDefaultDescription(styleType: string): string {
  switch (styleType) {
    case 'Natural':
      return "Você valoriza o conforto e a praticidade. Seu estilo é descontraído e casual, com peças fáceis de usar no dia a dia.";
    case 'Clássico':
      return "Você aprecia roupas atemporais e elegantes. Seu estilo é refinado e tradicional, com peças de qualidade que nunca saem de moda.";
    case 'Contemporâneo':
      return "Você gosta de estar atualizado e seguir as tendências. Seu estilo é moderno e versátil, combinando o clássico com o atual.";
    case 'Elegante':
      return "Você valoriza a sofisticação e o requinte. Seu estilo é polido e imponente, com peças de alta qualidade e acabamento impecável.";
    case 'Romântico':
      return "Você aprecia detalhes delicados e femininos. Seu estilo é suave e gracioso, com elementos como rendas, babados e estampas florais.";
    case 'Sexy':
      return "Você gosta de valorizar suas curvas. Seu estilo é sensual e marcante, com peças que destacam seu corpo e sua confiança.";
    case 'Dramático':
      return "Você busca impactar e chamar atenção. Seu estilo é arrojado e marcante, com peças estruturadas e de design diferenciado.";
    case 'Criativo':
      return "Você adora expressar sua individualidade. Seu estilo é único e original, combinando cores, texturas e elementos de forma não convencional.";
    default:
      return "Seu estilo pessoal reflete sua personalidade e preferências únicas.";
  }
}
