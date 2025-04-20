
import { useState, useCallback, useEffect } from 'react';
import { QuizComponentType, QuizComponentData } from '@/types/quizBuilder';
import { toast } from '@/components/ui/use-toast';

// Chave para armazenamento no localStorage
const STORAGE_KEY = 'quiz_builder_components';

export const useQuizBuilder = () => {
  const [components, setComponents] = useState<QuizComponentData[]>([]);
  const [loading, setLoading] = useState(true);

  // Carregar componentes do localStorage na inicialização
  useEffect(() => {
    const loadComponents = () => {
      setLoading(true);
      try {
        const savedComponents = localStorage.getItem(STORAGE_KEY);
        if (savedComponents) {
          setComponents(JSON.parse(savedComponents));
        } else {
          // Se não houver componentes salvos, criar um componente de cabeçalho padrão
          const defaultHeader: QuizComponentData = {
            id: `component-${Date.now()}`,
            type: 'header',
            order: 0,
            data: { 
              title: 'Descubra Seu Estilo Pessoal', 
              subtitle: 'Responda às perguntas e descubra qual estilo combina mais com você' 
            },
            style: {
              paddingY: '32',
              paddingX: '16',
              backgroundColor: '',
              textColor: '',
              borderRadius: 0
            }
          };
          setComponents([defaultHeader]);
        }
      } catch (error) {
        console.error('Erro ao carregar componentes do quiz:', error);
        // Iniciar com array vazio em caso de erro
        setComponents([]);
      } finally {
        setLoading(false);
      }
    };

    loadComponents();
  }, []);

  // Salvar componentes no localStorage sempre que houver mudanças
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(components));
      } catch (error) {
        console.error('Erro ao salvar componentes do quiz:', error);
        toast({
          title: "Erro ao salvar",
          description: "Não foi possível salvar as alterações do quiz.",
          variant: "destructive",
        });
      }
    }
  }, [components, loading]);

  const getDefaultData = (type: QuizComponentType): any => {
    switch (type) {
      case 'header':
        return { title: 'Título do Quiz', subtitle: 'Responda às perguntas e descubra seu resultado' };
      case 'headline':
        return { title: 'Título da Seção', subtitle: 'Subtítulo opcional' };
      case 'text':
        return { text: 'Insira seu texto aqui...' };
      case 'image':
        return { imageUrl: '', alt: 'Descrição da imagem' };
      case 'multipleChoice':
        return { 
          question: 'Sua pergunta aqui?', 
          options: ['Opção 1', 'Opção 2', 'Opção 3'],
          required: true,
          multiSelect: 1 
        };
      case 'singleChoice':
        return { 
          question: 'Sua pergunta aqui?', 
          options: ['Opção 1', 'Opção 2', 'Opção 3'],
          required: true
        };
      case 'scale':
        return { 
          question: 'Em uma escala de 1 a 5, como você avalia...?', 
          min: 1, 
          max: 5, 
          minLabel: 'Discordo Totalmente', 
          maxLabel: 'Concordo Totalmente',
          required: true
        };
      default:
        return {};
    }
  };

  const addComponent = useCallback((type: QuizComponentType): string => {
    const newComponent: QuizComponentData = {
      id: `component-${Date.now()}`,
      type,
      order: components.length,
      data: getDefaultData(type),
      style: {
        paddingY: '16',
        paddingX: '16',
        backgroundColor: '',
        textColor: '',
        borderRadius: 0
      }
    };

    setComponents(prev => [...prev, newComponent]);
    return newComponent.id;
  }, [components]);

  const updateComponent = useCallback((id: string, updates: Partial<QuizComponentData>) => {
    setComponents(prev => 
      prev.map(component => 
        component.id === id 
          ? { 
              ...component, 
              ...updates,
              data: updates.data ? { ...component.data, ...updates.data } : component.data,
              style: updates.style ? { ...component.style, ...updates.style } : component.style
            } 
          : component
      )
    );
  }, []);

  const deleteComponent = useCallback((id: string) => {
    setComponents(prev => 
      prev.filter(component => component.id !== id)
        .map((component, index) => ({ ...component, order: index }))
    );
  }, []);

  const moveComponent = useCallback((draggedId: string, targetId: string) => {
    setComponents(prev => {
      const draggedIndex = prev.findIndex(c => c.id === draggedId);
      const targetIndex = prev.findIndex(c => c.id === targetId);
      
      if (draggedIndex === -1 || targetIndex === -1) return prev;
      
      const newComponents = [...prev];
      const [draggedComponent] = newComponents.splice(draggedIndex, 1);
      newComponents.splice(targetIndex, 0, draggedComponent);
      
      return newComponents.map((component, index) => ({
        ...component,
        order: index
      }));
    });
  }, []);

  return {
    components,
    addComponent,
    updateComponent,
    deleteComponent,
    moveComponent,
    loading
  };
};
