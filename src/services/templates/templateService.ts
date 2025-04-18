
import { QuizTemplate, QuizTemplatePreview } from '@/types/quizTemplate';
import { QuizQuestion } from '@/types/quiz';
import { generateId } from '@/utils/idGenerator';
import { supabase } from '@/integrations/supabase/client';
import { styleQuizTemplate } from './styleQuizTemplate';
import { toast } from '@/components/ui/use-toast';

const LOCAL_STORAGE_KEY = 'quiz_templates';

// Get templates from local storage or initialize with default
export const getTemplates = async (): Promise<QuizTemplatePreview[]> => {
  try {
    // Try to get from Supabase if available
    if (supabase) {
      const { data, error } = await supabase
        .from('quiz_templates')
        .select('id, name, description, created_at, updated_at, is_default');
      
      if (!error && data?.length) {
        return data.map(template => ({
          id: template.id,
          name: template.name,
          description: template.description,
          questionCount: 0, // We'll need to fetch this separately or store it
          createdAt: template.created_at,
          updatedAt: template.updated_at,
          isDefault: template.is_default
        }));
      }
    }
    
    // Fallback to local storage
    const templatesJson = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (templatesJson) {
      const templates = JSON.parse(templatesJson) as QuizTemplate[];
      return templates.map(template => ({
        id: template.id,
        name: template.name,
        description: template.description,
        questionCount: template.questions.length,
        createdAt: template.createdAt,
        updatedAt: template.updatedAt,
        isDefault: template.isDefault
      }));
    }
    
    // If no templates found, initialize with default
    const defaultTemplate = createDefaultTemplate();
    saveTemplateToLocalStorage(defaultTemplate);
    
    return [{
      id: defaultTemplate.id,
      name: defaultTemplate.name,
      description: defaultTemplate.description,
      questionCount: defaultTemplate.questions.length,
      createdAt: defaultTemplate.createdAt,
      updatedAt: defaultTemplate.updatedAt,
      isDefault: true
    }];
  } catch (error) {
    console.error('Error getting templates:', error);
    toast({
      title: 'Erro ao carregar modelos',
      description: 'Não foi possível carregar os modelos de quiz',
      variant: 'destructive'
    });
    return [];
  }
};

export const getTemplateById = async (id: string): Promise<QuizTemplate | null> => {
  try {
    // Try to get from Supabase if available
    if (supabase) {
      const { data, error } = await supabase
        .from('quiz_templates')
        .select('*')
        .eq('id', id)
        .single();
      
      if (!error && data) {
        return {
          id: data.id,
          name: data.name,
          description: data.description,
          questions: data.questions,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
          isDefault: data.is_default
        };
      }
    }
    
    // Fallback to local storage
    const templatesJson = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (templatesJson) {
      const templates = JSON.parse(templatesJson) as QuizTemplate[];
      return templates.find(template => template.id === id) || null;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting template by ID:', error);
    toast({
      title: 'Erro ao carregar modelo',
      description: 'Não foi possível carregar o modelo de quiz',
      variant: 'destructive'
    });
    return null;
  }
};

export const saveTemplate = async (template: QuizTemplate): Promise<boolean> => {
  try {
    // Try to save to Supabase if available
    if (supabase) {
      const { error } = await supabase
        .from('quiz_templates')
        .upsert({
          id: template.id,
          name: template.name,
          description: template.description,
          questions: template.questions,
          created_at: template.createdAt,
          updated_at: new Date().toISOString(),
          is_default: template.isDefault || false
        });
      
      if (error) {
        throw error;
      }
      
      return true;
    }
    
    // Fallback to local storage
    const templatesJson = localStorage.getItem(LOCAL_STORAGE_KEY);
    let templates: QuizTemplate[] = [];
    
    if (templatesJson) {
      templates = JSON.parse(templatesJson);
      const index = templates.findIndex(t => t.id === template.id);
      
      if (index >= 0) {
        // Update existing template
        templates[index] = {
          ...template,
          updatedAt: new Date().toISOString()
        };
      } else {
        // Add new template
        templates.push({
          ...template,
          updatedAt: new Date().toISOString()
        });
      }
    } else {
      // First template
      templates = [{
        ...template,
        updatedAt: new Date().toISOString()
      }];
    }
    
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(templates));
    return true;
  } catch (error) {
    console.error('Error saving template:', error);
    toast({
      title: 'Erro ao salvar modelo',
      description: 'Não foi possível salvar o modelo de quiz',
      variant: 'destructive'
    });
    return false;
  }
};

export const deleteTemplate = async (id: string): Promise<boolean> => {
  try {
    // Try to delete from Supabase if available
    if (supabase) {
      const { error } = await supabase
        .from('quiz_templates')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      return true;
    }
    
    // Fallback to local storage
    const templatesJson = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (templatesJson) {
      let templates = JSON.parse(templatesJson) as QuizTemplate[];
      
      // Check if this is the only template or if it's the default
      const template = templates.find(t => t.id === id);
      if (template?.isDefault && templates.length === 1) {
        toast({
          title: 'Não é possível excluir',
          description: 'Não é possível excluir o único modelo padrão',
          variant: 'destructive'
        });
        return false;
      }
      
      templates = templates.filter(template => template.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(templates));
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error deleting template:', error);
    toast({
      title: 'Erro ao excluir modelo',
      description: 'Não foi possível excluir o modelo de quiz',
      variant: 'destructive'
    });
    return false;
  }
};

export const createNewTemplate = (name: string, description: string, questions: QuizQuestion[] = []): QuizTemplate => {
  const now = new Date().toISOString();
  return {
    id: generateId(),
    name,
    description,
    questions,
    createdAt: now,
    updatedAt: now
  };
};

export const duplicateTemplate = async (id: string, newName?: string): Promise<QuizTemplate | null> => {
  const template = await getTemplateById(id);
  if (!template) {
    return null;
  }
  
  const duplicatedTemplate: QuizTemplate = {
    ...template,
    id: generateId(),
    name: newName || `${template.name} (cópia)`,
    isDefault: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  const success = await saveTemplate(duplicatedTemplate);
  return success ? duplicatedTemplate : null;
};

// Helper function to create the default template
const createDefaultTemplate = (): QuizTemplate => {
  const now = new Date().toISOString();
  return {
    id: generateId(),
    name: 'Quiz de Estilo Pessoal',
    description: 'Teste padrão para descobrir o estilo pessoal',
    questions: styleQuizTemplate,
    createdAt: now,
    updatedAt: now,
    isDefault: true
  };
};

// Helper function to save template to local storage
const saveTemplateToLocalStorage = (template: QuizTemplate) => {
  const templatesJson = localStorage.getItem(LOCAL_STORAGE_KEY);
  let templates: QuizTemplate[] = [];
  
  if (templatesJson) {
    templates = JSON.parse(templatesJson);
    const index = templates.findIndex(t => t.id === template.id);
    
    if (index >= 0) {
      templates[index] = template;
    } else {
      templates.push(template);
    }
  } else {
    templates = [template];
  }
  
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(templates));
};
