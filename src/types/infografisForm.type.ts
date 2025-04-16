import { Meta } from "./app.type";

export type InfografisForm = {
    link: string | undefined; 
    title: string;
    description: string,    
    published_at?: string | null ;
    meta: Meta[];
};
