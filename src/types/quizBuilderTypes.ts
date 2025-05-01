
export interface QuizQuestion {
  id: string;
  title: string;
  description?: string;
  type: 'multiple-choice' | 'single-choice' | 'scale';
  answers: QuizAnswer[];
  required: boolean;
  order: number;
}

export interface QuizAnswer {
  id: string;
  text: string;
  value: string;
  styleScores?: Record<string, number>;
  required: boolean;
  order: number;
}

export interface QuizImportData {
  questions: any[];
  title?: string;
  subtitle?: string;
  resultTitle?: string;
}
