export type InfografisForm = {
    link: string | undefined; 
    title: string;
    description: string,    
    published_at: string | null;
    meta: {
      key: string; 
      value: string; 
    }[];
};
