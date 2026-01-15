
export interface ArticleSection {
  title: string;
  content: string;
  keyPoints?: string[];
}

export interface ArticleContent {
  introduction: string;
  sections: ArticleSection[];
}

export type Article = {
  id: string;
  title: string;
  color: string; 
  content: ArticleContent; 
  summary?: string;
  topic_id?: number;
  created_at?: string;
};

export type ArticleStore = {
  articles: Article[];
  setArticles: (articles: Article[]) => void;
};
