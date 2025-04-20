
import { QuizTemplate } from '@/types/quizTemplate';
import { StyleCategory } from '@/types/quizBuilder';
import { toast } from '@/components/ui/use-toast';

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
