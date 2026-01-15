// app/types/article.ts

export type Article = {
  id: number;
  title: string;
  content: string;
  summary?: string;
  topic_id?: number;
  created_at?: string;
};

export type ArticleStore = {
  articles: Article[];
  setArticles: (articles: Article[]) => void;
};
