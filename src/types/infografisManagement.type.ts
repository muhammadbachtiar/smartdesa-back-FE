export type InfografisData = {
    id: number;
    user_id: number,    
    title: string; 
    slug: string;
    link: string; 
    published_at: string;
    description: string,
    views: number,
    meta: {
      key: string; 
      value: string; 
    }[]; 
    created_at: string
    updated_at: string
  }; 