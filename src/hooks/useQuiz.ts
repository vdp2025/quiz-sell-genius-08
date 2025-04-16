
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { saveParticipant, saveAnswers, saveResults } from '@/services/quizService';
import { QuizResult } from '@/types/quiz';

export const useQuiz = () => {
  const [participantId, setParticipantId] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const startQuiz = async (name: string, email: string, quizId: string) => {
    try {
      const participant = await saveParticipant(name, email, quizId);
      setParticipantId(participant.id);
      return participant;
    } catch (error) {
      toast({
        title: "Erro ao iniciar o quiz",
        description: "Por favor, tente novamente.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const submitAnswers = async (
    answers: Array<{ questionId: string; optionId: string; points: number }>
  ) => {
    if (!participantId) {
      throw new Error('Participant ID not found');
    }

    try {
      await saveAnswers(participantId, answers);
    } catch (error) {
      toast({
        title: "Erro ao salvar respostas",
        description: "Por favor, tente novamente.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const submitResults = async (results: QuizResult) => {
    if (!participantId) {
      throw new Error('Participant ID not found');
    }

    try {
      await saveResults(participantId, [results.primaryStyle, ...results.secondaryStyles]);
      navigate('/resultado');
    } catch (error) {
      toast({
        title: "Erro ao salvar resultados",
        description: "Por favor, tente novamente.",
        variant: "destructive",
      });
      throw error;
    }
  };

  return {
    startQuiz,
    submitAnswers,
    submitResults,
  };
};
