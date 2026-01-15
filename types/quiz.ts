// Allow TypeScript to accept any valid Ionicons name string
export type IoniconName = React.ComponentProps<typeof import('@expo/vector-icons').Ionicons>['name'];



export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  category_id: string;
  created_at: string;
};

export type QuizCategory = {
  id: string;
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

