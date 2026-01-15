// Allow TypeScript to accept any valid Ionicons name string
export type IoniconName = React.ComponentProps<typeof import('@expo/vector-icons').Ionicons>['name'];



export type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
  category_id: number;
  created_at: string;
};

export type QuizCategory = {
  id: number;
  title: string;        // ✅ used in UI
  description?: string;
  icon: IoniconName;
  color: string;        // ✅ background color
  questions?: QuizQuestion[];
};

export type QuizCategoryStore = {
  quizCategories: QuizCategory[];
  setQuizCategories: (quizCategories: QuizCategory[]) => void;
};

