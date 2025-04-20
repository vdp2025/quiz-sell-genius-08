
import { QuizTemplate, QuizTemplatePreview } from '@/types/quizTemplate';
import { StyleCategory } from '@/types/quizBuilder';
import { toast } from '@/components/ui/use-toast';
import { generateId } from '@/utils/idGenerator';

// In-memory templates storage for now
// In a real app, this would be saved to a database or local storage
const templates: Record<string, QuizTemplate> = {};

// Sample template ID
const DEFAULT_TEMPLATE_ID = 'style-quiz-template-1';

// Add a default template if not exists
if (!templates[DEFAULT_TEMPLATE_ID]) {
  templates[DEFAULT_TEMPLATE_ID] = {
    id: DEFAULT_TEMPLATE_ID,
    name: 'Quiz de Estilo Pessoal',
    description: 'Descubra seu estilo pessoal e receba recomendações personalizadas',
    questions: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

// Get all templates
export const getAllTemplates = async (): Promise<QuizTemplate[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return Object.values(templates);
};

// Get all templates as previews
export const getTemplates = async (): Promise<QuizTemplatePreview[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // First check localStorage for all templates
  const storedTemplateKeys = Object.keys(localStorage)
    .filter(key => key.startsWith('template_'));
  
  const templatePreviews: QuizTemplatePreview[] = [];
  
  // Add templates from localStorage
  for (const key of storedTemplateKeys) {
    try {
      const templateId = key.replace('template_', '');
      const storedTemplate = localStorage.getItem(key);
      if (storedTemplate) {
        const template = JSON.parse(storedTemplate) as QuizTemplate;
        templatePreviews.push({
          id: template.id,
          name: template.name,
          description: template.description,
          questionCount: template.questions.length,
          createdAt: template.createdAt,
          updatedAt: template.updatedAt,
          isDefault: templateId === DEFAULT_TEMPLATE_ID
        });
      }
    } catch (error) {
      console.error('Error parsing stored template:', error);
    }
  }
  
  // Add memory-only templates that aren't in localStorage
  for (const id in templates) {
    if (!templatePreviews.some(p => p.id === id)) {
      const template = templates[id];
      templatePreviews.push({
        id: template.id,
        name: template.name,
        description: template.description,
        questionCount: template.questions.length,
        createdAt: template.createdAt,
        updatedAt: template.updatedAt,
        isDefault: id === DEFAULT_TEMPLATE_ID
      });
    }
  }
  
  return templatePreviews;
};

// Get template by ID
export const getTemplateById = async (id: string): Promise<QuizTemplate | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // First check localStorage
  const storedTemplate = localStorage.getItem(`template_${id}`);
  if (storedTemplate) {
    try {
      return JSON.parse(storedTemplate);
    } catch (error) {
      console.error('Error parsing stored template:', error);
    }
  }
  
  // If not in localStorage, check memory
  return templates[id] || null;
};

// Create a new template
export const createNewTemplate = (name: string, description: string = ''): QuizTemplate => {
  const id = `template_${generateId()}`;
  const now = new Date().toISOString();
  
  const newTemplate: QuizTemplate = {
    id,
    name,
    description,
    questions: [],
    createdAt: now,
    updatedAt: now
  };
  
  // Save to localStorage for persistence
  localStorage.setItem(`template_${id}`, JSON.stringify(newTemplate));
  
  // Also update in-memory store
  templates[id] = newTemplate;
  
  return newTemplate;
};

// Duplicate a template
export const duplicateTemplate = async (templateId: string): Promise<QuizTemplate | null> => {
  try {
    const sourceTemplate = await getTemplateById(templateId);
    if (!sourceTemplate) return null;
    
    const id = `template_${generateId()}`;
    const now = new Date().toISOString();
    
    const duplicatedTemplate: QuizTemplate = {
      id,
      name: `${sourceTemplate.name} (Cópia)`,
      description: sourceTemplate.description,
      questions: JSON.parse(JSON.stringify(sourceTemplate.questions)), // Deep clone
      createdAt: now,
      updatedAt: now,
      settings: sourceTemplate.settings ? JSON.parse(JSON.stringify(sourceTemplate.settings)) : undefined
    };
    
    // Save to localStorage for persistence
    localStorage.setItem(`template_${id}`, JSON.stringify(duplicatedTemplate));
    
    // Also update in-memory store
    templates[id] = duplicatedTemplate;
    
    return duplicatedTemplate;
  } catch (error) {
    console.error('Error duplicating template:', error);
    return null;
  }
};

// Save template
export const saveTemplate = async (template: QuizTemplate): Promise<boolean> => {
  try {
    // Update timestamp
    template.updatedAt = new Date().toISOString();
    
    // Save to localStorage for persistence
    localStorage.setItem(`template_${template.id}`, JSON.stringify(template));
    
    // Also update in-memory store
    templates[template.id] = template;
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Log in console for debugging
    console.log('Template saved successfully:', template.id);
    
    return true;
  } catch (error) {
    console.error('Error saving template:', error);
    return false;
  }
};

// Delete template
export const deleteTemplate = async (id: string): Promise<boolean> => {
  try {
    // Remove from localStorage
    localStorage.removeItem(`template_${id}`);
    
    // Remove from in-memory store
    delete templates[id];
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return true;
  } catch (error) {
    console.error('Error deleting template:', error);
    return false;
  }
};

// Verify the save status periodically (for auto-save feature)
export const verifySaveStatus = async (templateId: string): Promise<{ isSaved: boolean, lastSaved?: string }> => {
  try {
    const storedTemplate = localStorage.getItem(`template_${templateId}`);
    if (!storedTemplate) {
      return { isSaved: false };
    }
    
    const template = JSON.parse(storedTemplate);
    return { 
      isSaved: true, 
      lastSaved: template.updatedAt 
    };
  } catch (error) {
    console.error('Error verifying save status:', error);
    return { isSaved: false };
  }
};

// Get default style categories for new questions
export const getDefaultStyleCategories = (): StyleCategory[] => {
  return [
    'Natural',
    'Clássico',
    'Contemporâneo',
    'Elegante',
    'Romântico',
    'Sexy',
    'Dramático',
    'Criativo'
  ];
};
