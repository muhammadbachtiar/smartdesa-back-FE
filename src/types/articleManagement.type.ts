import { CategoryData } from "./categoryManagement.type";

export type ArticleData = {
    id: number;
    user_id: number,
    category_id: string; 
    title: string; 
    slug: string;
    content: string; 
    published_at: string | null;
    views: number,
    thumbnail: string | null;
    meta: {
      key: string; 
      value: string; 
    }[]; 
    created_at: string
    updated_at: string
    category: CategoryData
  };  