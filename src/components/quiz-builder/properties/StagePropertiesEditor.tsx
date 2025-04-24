
import React from 'react';
import { QuizStage } from '@/types/quizBuilder';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface StagePropertiesEditorProps {
  stage: QuizStage;
  onUpdate: (updates: Partial<QuizStage>) => void;
}

const StagePropertiesEditor: React.FC<StagePropertiesEditorProps> = ({
  stage,
  onUpdate
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-white">Título da Etapa</Label>
        <Input 
          value={stage.title || ''} 
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="Título da etapa"
          className="bg-[#262939] border-[#333333] text-white"
        />
      </div>
      
      <div className="space-y-2">
        <Label className="text-white">Tipo</Label>
        <Select 
          value={stage.type} 
          onValueChange={(value) => onUpdate({ type: value as QuizStage['type'] })}
        >
          <SelectTrigger className="bg-[#262939] border-[#333333] text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#262939] border-[#333333] text-white">
            <SelectItem value="cover">Capa</SelectItem>
            <SelectItem value="question">Questão</SelectItem>
            <SelectItem value="result">Resultado</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {stage.type === 'question' && (
        <div className="p-3 border border-[#333333] rounded-md bg-[#1d212e]">
          <p className="text-sm text-gray-400 mb-2">Configurações de Questão</p>
          <div className="space-y-2">
            <Label className="text-sm text-white">Seleções Requeridas</Label>
            <Select
              value={stage.data?.requiredSelections?.toString() || '3'}
              onValueChange={(value) => onUpdate({ 
                data: { 
                  ...(stage.data || {}), 
                  requiredSelections: parseInt(value)
                }
              })}
            >
              <SelectTrigger className="bg-[#262939] border-[#333333] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#262939] border-[#333333] text-white">
                <SelectItem value="1">1 seleção</SelectItem>
                <SelectItem value="2">2 seleções</SelectItem>
                <SelectItem value="3">3 seleções</SelectItem>
                <SelectItem value="4">4 seleções</SelectItem>
                <SelectItem value="5">5 seleções</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
};

export default StagePropertiesEditor;
