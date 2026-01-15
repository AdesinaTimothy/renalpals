
import { QuizCategory, QuizCategoryStore } from "@/types/quiz";
import { create } from "zustand";



export const useQuizCategoryStore = create<QuizCategoryStore>((set) => ({
  quizCategories: [],
  setQuizCategories: (quizCategories: QuizCategory[]) => set({ quizCategories}),
}));