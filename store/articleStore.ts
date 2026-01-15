import { Article, ArticleStore } from "@/types/article";
import { create } from "zustand";


export const useArticleStore = create<ArticleStore>((set) => ({
  articles: [],
  setArticles: (articles: Article[]) => set({ articles }),
}));
