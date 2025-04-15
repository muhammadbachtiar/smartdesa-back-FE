
export type RoleForm = {
    nama: string,
    permissions: number[]
}

export type CategoryForm = {
    name: string,
    description: string
}

export type ArticleForm = {
    title: string;
    content: string;
    category_id: string; 
    published_at?: string | null;
    thumbnail: string | undefined; 
    description: string
    meta: {
      key: string; 
      value: string | string[]; 
    }[];
};

export type UserForm = {
    avatar?: string | null
    email: string
    name: string
    roles: number[]
    password?: string
}

export type uploadForm = {
    upload: File
}