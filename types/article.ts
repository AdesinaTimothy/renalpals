export type IoniconName = React.ComponentProps<typeof import('@expo/vector-icons').Ionicons>['name'];


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
 icon: IoniconName;
 description: string;
};

export type ArticleStore = {
  articles: Article[];
  setArticles: (articles: Article[]) => void;
};
