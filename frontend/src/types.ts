export type QuestionType = 'choice' | 'text' | 'group';

export interface SubQuestion {
  id: string;
  content: string;
  correctAnswer: boolean;
}

export interface Question {
  id: number;
  type: QuestionType;
  section?: string;
  question: string;
  options?: string[];
  answer?: string;
  subQuestions?: SubQuestion[];
}

export interface StudentResult {
  id: string;
  name: string;
  className: string;
  score: number;
  total: number;
  date: string;
  timeSpent: number;
  violations: number;
  counts: { correct: number; wrong: number; empty: number; };
  answers: any;
}

export interface ExamConfig {
  id: string;
  code: string;
  securityCode: string;
  title: string;
  className: string;
  duration: number;
  allowHints: boolean;
  allowReview: boolean;
  questions: Question[];
  results: StudentResult[];
  createdAt: string;
}
