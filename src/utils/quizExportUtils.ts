
import { v4 as uuidv4 } from 'uuid';
import { loadQuizResultConfig } from '@/services/quizBuilderService';

// Função para exportar os dados do quiz atual para o formato de builder
export const exportCurrentQuizToBuilderFormat = () => {
  // Etapa 1: Criar as etapas (stages)
  const stages = [];
  const components = [];
  
  // Adicionar etapa de capa
  const coverStageId = `stage-${uuidv4().substring(0, 8)}`;
  stages.push({
    id: coverStageId,
    title: 'Etapa 1: Capa do Quiz',
    order: 0,
    type: 'cover'
  });
  
  // Adicionar componente de capa
  const coverComponentId = `component-${uuidv4().substring(0, 8)}`;
  components.push({
    id: coverComponentId,
    type: 'stageCover',
    order: 0,
    stageId: coverStageId,
    data: {
      stageTitle: 'Capa do Quiz',
      headline: 'Descubra seu Estilo Pessoal',
      subheadline: 'Responda às perguntas a seguir para revelar seu estilo predominante',
      buttonText: 'Começar',
      backgroundColor: '#FAF9F7',
      textColor: '#432818'
    },
    style: {
      backgroundColor: '#FAF9F7',
      textColor: '#432818',
      paddingY: '32',
      paddingX: '16',
      borderRadius: '0'
    }
  });
  
  return {
    stages,
    components
  };
};

// Função para exportar a configuração de página de resultado para o builder
export const exportResultPageToBuilderFormat = (styleType) => {
  try {
    // Carregar configuração de página de resultado
    const resultConfig = loadQuizResultConfig(styleType);
    if (!resultConfig) {
      console.error(`Nenhuma configuração encontrada para o estilo: ${styleType}`);
      return null;
    }
    
    // Criar uma etapa de resultado
    const resultStageId = `stage-${uuidv4().substring(0, 8)}`;
    const stages = [
      {
        id: resultStageId,
        title: 'Página de Resultado',
        order: 0,
        type: 'result'
      }
    ];
    
    // Criar componentes baseados na configuração
    const components = [];
    
    return {
      stages,
      components
    };
  } catch (error) {
    console.error('Erro ao exportar configuração da página de resultado:', error);
    return null;
  }
};
