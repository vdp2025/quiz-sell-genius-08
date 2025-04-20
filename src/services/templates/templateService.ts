
import { styleQuizTemplate } from './styleQuizTemplate';
import { styleQuizTemplate2 } from './styleQuizTemplate2';
import { QuizTemplate, QuizTemplatePreview } from '@/types/quizTemplate';
import { QuizBuilderState } from '@/types/quizBuilder';
import { generateId } from '@/utils/idGenerator';

// Predefined templates
const templates: Record<string, QuizTemplate> = {
  'style-quiz-1': {
    id: 'style-quiz-1',
    name: 'Quiz de Estilo Pessoal',
    description: 'Template padrão com perguntas sobre preferências de estilo e personalidade.',
    questions: [],
    builderState: styleQuizTemplate,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  'style-quiz-2': {
    id: 'style-quiz-2',
    name: 'Quiz de Estilo Avançado',
    description: 'Template com questões de múltipla escolha e imagens para análise de estilo detalhada.',
    questions: [],
    builderState: styleQuizTemplate2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
};

// Local storage key
const TEMPLATES_STORAGE_KEY = 'quiz_templates';

// Load templates from local storage
const loadTemplates = (): Record<string, QuizTemplate> => {
  try {
    const savedTemplates = localStorage.getItem(TEMPLATES_STORAGE_KEY);
    if (savedTemplates) {
      return JSON.parse(savedTemplates);
    }
    
    // Initialize with predefined templates
    saveTemplatesLocal(templates);
    return templates;
  } catch (error) {
    console.error('Error loading templates:', error);
    return templates;
  }
};

// Save templates to local storage
const saveTemplatesLocal = (templatesData: Record<string, QuizTemplate>): void => {
  try {
    localStorage.setItem(TEMPLATES_STORAGE_KEY, JSON.stringify(templatesData));
  } catch (error) {
    console.error('Error saving templates:', error);
  }
};

// Get template by ID
export const getTemplateById = async (id: string): Promise<QuizTemplate | null> => {
  const templatesData = loadTemplates();
  return templatesData[id] || null;
};

// Get all templates
export const getAllTemplates = async (): Promise<QuizTemplate[]> => {
  const templatesData = loadTemplates();
  return Object.values(templatesData);
};

// Save template
export const saveTemplate = async (template: QuizTemplate): Promise<boolean> => {
  try {
    const templatesData = loadTemplates();
    templatesData[template.id] = {
      ...template,
      updatedAt: new Date().toISOString()
    };
    saveTemplatesLocal(templatesData);
    return true;
  } catch (error) {
    console.error('Error saving template:', error);
    return false;
  }
};

// Create a new template
export const createTemplate = async (
  name: string, 
  description: string, 
  builderState: QuizBuilderState
): Promise<QuizTemplate> => {
  const id = `template-${Date.now()}`;
  const newTemplate: QuizTemplate = {
    id,
    name,
    description,
    questions: [],
    builderState,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  const templatesData = loadTemplates();
  templatesData[id] = newTemplate;
  saveTemplatesLocal(templatesData);
  
  return newTemplate;
};

// Duplicate template
export const duplicateTemplate = async (id: string): Promise<QuizTemplate | null> => {
  try {
    const templatesData = loadTemplates();
    const template = templatesData[id];
    
    if (!template) {
      return null;
    }
    
    const newId = `template-${Date.now()}`;
    const duplicatedTemplate: QuizTemplate = {
      ...template,
      id: newId,
      name: `${template.name} (cópia)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    templatesData[newId] = duplicatedTemplate;
    saveTemplatesLocal(templatesData);
    
    return duplicatedTemplate;
  } catch (error) {
    console.error('Error duplicating template:', error);
    return null;
  }
};

// Delete template
export const deleteTemplate = async (id: string): Promise<boolean> => {
  try {
    const templatesData = loadTemplates();
    if (!templatesData[id]) {
      return false;
    }
    
    delete templatesData[id];
    saveTemplatesLocal(templatesData);
    return true;
  } catch (error) {
    console.error('Error deleting template:', error);
    return false;
  }
};

// Convert builder state to template
export const convertBuilderStateToTemplate = async (
  name: string,
  description: string,
  builderState: QuizBuilderState
): Promise<QuizTemplate> => {
  return createTemplate(name, description, builderState);
};

// Convert template to builder state
export const convertTemplateToBuilderState = async (
  template: QuizTemplate
): Promise<QuizBuilderState> => {
  return template.builderState;
};

// Function to get a clean list of templates for preview display
export const getTemplates = async (): Promise<QuizTemplatePreview[]> => {
  const templates = await getAllTemplates();
  
  return templates.map(template => ({
    id: template.id,
    name: template.name,
    description: template.description,
    questionCount: template.questions.length,
    createdAt: template.createdAt,
    updatedAt: template.updatedAt,
    isDefault: template.id === 'style-quiz-1'
  }));
};

// Function to create a new template with default structure
export const createNewTemplate = (name: string, description: string): QuizTemplate => {
  // Create a minimal builder state
  const builderState: QuizBuilderState = {
    components: [],
    stages: []
  };
  
  const id = `template-${Date.now()}`;
  const newTemplate: QuizTemplate = {
    id,
    name,
    description,
    questions: [],
    builderState,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  const templatesData = loadTemplates();
  templatesData[id] = newTemplate;
  saveTemplatesLocal(templatesData);
  
  return newTemplate;
};
