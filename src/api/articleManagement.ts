import axios  from "axios";
import { ArticleForm, CategoryForm } from "../types/form.type";
import { ResponseType } from "../types/response.type";
import { MetaType } from "../types/app.type";
import { ResponseCreateDataType } from "../types/response.type";
import HandleRespondError from "../services/utils/handleRespondError";
import { ArticleData, CategoryData } from "../types/articleManagement.type";

const BASE_API = import.meta.env.VITE_API_AUTH_URL
const token = localStorage.getItem('token');


export async function getCategories(page: string, search?: string): Promise<ResponseType<{ data: CategoryData[]; meta: MetaType; }>> {
    try {
        const response: ResponseType<{ data: CategoryData[]; meta: MetaType; }> = await axios.get(
            `${BASE_API}/api/v1/category-article?search=${search || ''}&page=${page}&page_size=10`,
            {
                timeout: 15000,
                headers: {
                    'ngrok-skip-browser-warning': true,
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            HandleRespondError(error);
        } else {
            console.error('Unexpected error type:', error);
        }
        throw error; 
    }
}

export async function createCategory(data: CategoryForm): Promise<ResponseCreateDataType<{ data: CategoryData; }, { data: { message: string; data: string[]; }; }>> {
    try {
        const response: ResponseCreateDataType<{ data: CategoryData; }, { data: { message: string; data: string[]; }; }> = await axios.post(
            `${BASE_API}/api/v1/category-article`,
            data,
            {
                timeout: 15000,
                headers: {
                    'ngrok-skip-browser-warning': true,
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            HandleRespondError(error);
        } else {
            console.error('Unexpected error type:', error);
        }
        throw error; 
    }
}

export async function updateCategory(data:CategoryForm, id:string | undefined): Promise<ResponseCreateDataType<{ data: CategoryData; }, { data: { message: string; data: string[]; }; }>> {
    try {
        const response: ResponseCreateDataType<{ data: CategoryData; }, { data: { message: string; data: string[]; }; }> = await axios.put(
          `${BASE_API}/api/v1/category-article/${id}`,
          data,
          {
            timeout: 15000,
            headers: {
                'ngrok-skip-browser-warning': true,
                'Authorization': `Bearer ${token}`
            }
          }
        );
        return response
      } catch (error) {
        if (axios.isAxiosError(error)) {
            HandleRespondError(error);
        } else {
            console.error('Unexpected error type:', error);
        }
        throw error; 
    }
  
} 

export async function deleteCategory(id: number): Promise<ResponseCreateDataType<{ data: CategoryData; }, { data: { message: string; data: string[]; }; }>> {
    try {
        const response: ResponseCreateDataType<{ data: CategoryData; }, { data: { message: string; data: string[]; }; }> = await axios.delete(
            `${BASE_API}/api/v1/category-article/${id}`,
            {
                timeout: 15000,
                headers: {
                    'ngrok-skip-browser-warning': true,
                    'Authorization': `Bearer ${token}`
                }
            }
        );
      
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            HandleRespondError(error);
        } else {
            console.error('Unexpected error type:', error);
        }
        throw error; 
    }
}

export async function getCategorybyId(id: string | undefined) {
    try {
        const response = await axios.get(
            `${BASE_API}/api/v1/category-article/${id}`,
            {
                timeout: 15000,
                headers: {
                    'ngrok-skip-browser-warning': true,
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            HandleRespondError(error);
        } else {
            console.error('Unexpected error type:', error);
        }
        throw error; 
    }
}

export async function getArticles(page: string, search?: string): Promise<ResponseType<{ data: ArticleData[]; meta: MetaType; }>> {
    try {
        const response: ResponseType<{ data: ArticleData[]; meta: MetaType; }> = await axios.get(
            `${BASE_API}/api/v1/article?search=${search || ''}&page=${page}&page_size=10`,
            {
                timeout: 15000,
                headers: {
                    'ngrok-skip-browser-warning': true,
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            HandleRespondError(error);
        } else {
            console.error('Unexpected error type:', error);
        }
        throw error; 
    }
}

export async function getArticlebyId(id: string | undefined) {
    try {
        const response = await axios.get(
            `${BASE_API}/api/v1/article/${id}?with=category`,
            {
                timeout: 15000,
                headers: {
                    'ngrok-skip-browser-warning': true,
                    'Authorization': `Bearer ${token}`
                }
            }
            
        );

        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            HandleRespondError(error);
        } else {
            console.error('Unexpected error type:', error);
        }
        throw error; 
    }
}

export async function createArticle(data: ArticleForm): Promise<ResponseCreateDataType<{ data: ArticleData; }, { data: { message: string; data: string[]; }; }>> {
    try {
        const response: ResponseCreateDataType<{ data: ArticleData; }, { data: { message: string; data: string[]; }; }> = await axios.post(
            `${BASE_API}/api/v1/article`,
            data,
            {
                timeout: 15000,
                headers: {
                    'ngrok-skip-browser-warning': true,
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            HandleRespondError(error);
        } else {
            console.error('Unexpected error type:', error);
        }
        throw error; ; 
    }
}

export async function updateArticle(data:ArticleForm, id:string | undefined): Promise<ResponseCreateDataType<{ data: ArticleData; }, { data: { message: string; data: string[]; }; }>> {
    try {
        const response: ResponseCreateDataType<{ data: ArticleData; }, { data: { message: string; data: string[]; }; }> = await axios.put(
          `${BASE_API}/api/v1/article/${id}`,
          data,
          {
            timeout: 15000,
            headers: {
                'ngrok-skip-browser-warning': true,
                'Authorization': `Bearer ${token}`
            }
          }
        );
        return response
      } catch (error) {
        if (axios.isAxiosError(error)) {
            HandleRespondError(error);
          } else {
            console.error('Unexpected error type:', error);
          }
          throw error; 
    }
  
  } 

export async function deleteArticle(id: number): Promise<ResponseCreateDataType<{ data: ArticleData; }, { data: { message: string; data: string[]; }; }>> {
    try {
        const response: ResponseCreateDataType<{ data: ArticleData; }, { data: { message: string; data: string[]; }; }> = await axios.delete(
            `${BASE_API}/api/v1/article/${id}`,
            {
                timeout: 15000,
                headers: {
                    'ngrok-skip-browser-warning': true,
                    'Authorization': `Bearer ${token}`
                }
            }
        );
      
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            HandleRespondError(error);
        } else {
            console.error('Unexpected error type:', error);
        }
        throw error; 
    }
}