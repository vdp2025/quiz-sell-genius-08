import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Copy, Trash2, Edit, ArrowRight } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { QuizTemplatePreview } from '@/types/quizTemplate';
import { 
  getAllTemplates, 
  createTemplate, 
  deleteTemplate, 
  duplicateTemplate 
} from '@/services/templates/templateService';
import { toast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useNavigate } from 'react-router-dom';

interface TemplateSelectorProps {
  onSelectTemplate: (templateId: string) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelectTemplate }) => {
  const [templates, setTemplates] = useState<QuizTemplatePreview[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTemplateName, setNewTemplateName] = useState('');
  const [newTemplateDescription, setNewTemplateDescription] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadTemplates = async () => {
      setLoading(true);
      try {
        const fetchedTemplates = await getAllTemplates();
        
        // Transform the templates to the QuizTemplatePreview format
        const templatePreviews: QuizTemplatePreview[] = fetchedTemplates.map(template => ({
          id: template.id,
          name: template.name,
          description: template.description,
          questionCount: template.questions.length,
          createdAt: template.createdAt,
          updatedAt: template.updatedAt,
          isDefault: template.id === 'style-quiz-1'
        }));
        
        setTemplates(templatePreviews);
        
        // Set the default template as selected if available
        const defaultTemplate = templatePreviews.find(t => t.isDefault);
        if (defaultTemplate) {
          setSelectedTemplateId(defaultTemplate.id);
        } else if (templatePreviews.length > 0) {
          setSelectedTemplateId(templatePreviews[0].id);
        }
      } catch (error) {
        console.error("Error loading templates:", error);
        toast({
          title: "Erro ao carregar modelos",
          description: "Não foi possível carregar os modelos de quiz",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadTemplates();
  }, []);

  const handleCreateTemplate = async () => {
    if (!newTemplateName.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, forneça um nome para o novo modelo",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // Create a blank builder state
      const emptyBuilderState = {
        components: [],
        stages: []
      };
      
      const newTemplate = await createTemplate(
        newTemplateName.trim(),
        newTemplateDescription.trim(),
        emptyBuilderState
      );
      
      // Reset form
      setNewTemplateName('');
      setNewTemplateDescription('');
      
      // Add to local state
      setTemplates(prev => [...prev, {
        id: newTemplate.id,
        name: newTemplate.name,
        description: newTemplate.description,
        questionCount: 0,
        createdAt: newTemplate.createdAt,
        updatedAt: newTemplate.updatedAt
      }]);
      
      toast({
        title: "Modelo criado",
        description: "Novo modelo de quiz criado com sucesso",
      });
    } catch (error) {
      console.error("Error creating template:", error);
      toast({
        title: "Erro ao criar modelo",
        description: "Não foi possível criar o novo modelo",
        variant: "destructive"
      });
    }
  };

  const handleDuplicateTemplate = async (templateId: string) => {
    try {
      const duplicate = await duplicateTemplate(templateId);
      if (duplicate) {
        setTemplates(prev => [...prev, {
          id: duplicate.id,
          name: duplicate.name,
          description: duplicate.description,
          questionCount: duplicate.questions.length,
          createdAt: duplicate.createdAt,
          updatedAt: duplicate.updatedAt
        }]);
        
        toast({
          title: "Modelo duplicado",
          description: "Modelo duplicado com sucesso",
        });
      }
    } catch (error) {
      console.error("Error duplicating template:", error);
      toast({
        title: "Erro ao duplicar modelo",
        description: "Não foi possível duplicar o modelo",
        variant: "destructive"
      });
    }
  };

  const handleDeleteTemplate = async (templateId: string) => {
    try {
      const success = await deleteTemplate(templateId);
      if (success) {
        setTemplates(prev => prev.filter(t => t.id !== templateId));
        
        // If the deleted template was selected, select another one
        if (selectedTemplateId === templateId) {
          const remainingTemplates = templates.filter(t => t.id !== templateId);
          if (remainingTemplates.length > 0) {
            setSelectedTemplateId(remainingTemplates[0].id);
          } else {
            setSelectedTemplateId(null);
          }
        }
        
        toast({
          title: "Modelo excluído",
          description: "Modelo excluído com sucesso",
        });
      }
    } catch (error) {
      console.error("Error deleting template:", error);
      toast({
        title: "Erro ao excluir modelo",
        description: "Não foi possível excluir o modelo",
        variant: "destructive"
      });
    }
  };

  const handleSelectTemplateForEdit = () => {
    if (selectedTemplateId) {
      navigate(`/admin/quiz-editor/${selectedTemplateId}`);
    } else {
      toast({
        title: "Selecione um modelo",
        description: "Por favor, selecione um modelo para continuar",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Carregando modelos...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-playfair text-[#432818]">Modelos de Quiz</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#B89B7A] hover:bg-[#A38A69]">
              <Plus className="w-4 h-4 mr-2" />
              Novo Modelo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Novo Modelo</DialogTitle>
              <DialogDescription>
                Crie um novo modelo de quiz em branco para personalizar completamente.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Nome do Modelo</label>
                <Input
                  id="name"
                  value={newTemplateName}
                  onChange={(e) => setNewTemplateName(e.target.value)}
                  placeholder="Ex: Quiz de Estilo Primavera/Verão"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">Descrição</label>
                <Textarea
                  id="description"
                  value={newTemplateDescription}
                  onChange={(e) => setNewTemplateDescription(e.target.value)}
                  placeholder="Descreva o propósito deste modelo de quiz"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button className="bg-[#B89B7A] hover:bg-[#A38A69]" onClick={handleCreateTemplate}>
                  Criar Modelo
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card 
            key={template.id} 
            className={`cursor-pointer transition-all ${
              selectedTemplateId === template.id 
                ? 'border-[#B89B7A] ring-2 ring-[#B89B7A]/50' 
                : 'hover:border-[#B89B7A]/50'
            }`}
            onClick={() => setSelectedTemplateId(template.id)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-[#432818] flex items-center gap-2">
                {template.name}
                {template.isDefault && (
                  <span className="text-xs font-normal bg-[#B89B7A]/20 text-[#B89B7A] px-2 py-0.5 rounded">
                    Padrão
                  </span>
                )}
              </CardTitle>
              <CardDescription className="text-sm text-[#1A1818]/70">
                {template.description || "Sem descrição"}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-[#1A1818]/80">
                {template.questionCount} pergunta{template.questionCount !== 1 ? 's' : ''}
              </p>
              <p className="text-xs text-[#1A1818]/60 mt-1">
                Atualizado em {new Date(template.updatedAt).toLocaleDateString()}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDuplicateTemplate(template.id);
                  }}
                  title="Duplicar modelo"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={(e) => e.stopPropagation()}
                      disabled={template.isDefault}
                      title={template.isDefault ? "Não é possível excluir o modelo padrão" : "Excluir modelo"}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Excluir modelo?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação não pode ser desfeita. O modelo será permanentemente removido.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => handleDeleteTemplate(template.id)}
                        className="bg-red-500 hover:bg-red-600"
                      >
                        Excluir
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="border-[#B89B7A] text-[#B89B7A]"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectTemplateForEdit();
                }}
              >
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex justify-end mt-8">
        <Button 
          size="lg"
          className="bg-[#B89B7A] hover:bg-[#A38A69]"
          onClick={handleSelectTemplateForEdit}
          disabled={!selectedTemplateId}
        >
          Editar Modelo Selecionado
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TemplateSelector;
