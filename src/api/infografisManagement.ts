import axios  from "axios";
import { ResponseCreateDataType, ResponseType } from "../types/response.type";
import { MetaType } from "../types/app.type";
import HandleRespondError from "../services/utils/handleRespondError";
import { InfografisData } from "../types/infografisManagement.type";
import { InfografisForm } from "../types/infografisForm.type";

const BASE_API = import.meta.env.VITE_API_AUTH_URL
const token = localStorage.getItem('token');

export async function getInfografis(page: string, search?: string): Promise<ResponseType<{ data: InfografisData[]; meta: MetaType; }>> {
    try {
        const response: ResponseType<{ data: InfografisData[]; meta: MetaType; }> = await axios.get(
            `${BASE_API}/api/v1/infografis?search=${search || ''}&page=${page}&page_size=10`,
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

export async function updateInfografis(data:InfografisForm, id:string | undefined): Promise<ResponseCreateDataType<{ data: InfografisData; }, { data: { message: string; data: string[]; }; }>> {
    try {
        const response: ResponseCreateDataType<{ data: InfografisData; }, { data: { message: string; data: string[]; }; }> = await axios.put(
          `${BASE_API}/api/v1/infografis/${id}`,
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

  export async function getInfografisbyId(id: string | undefined) {
    try {
        const response = await axios.get(
            `${BASE_API}/api/v1/infografis/${id}`,
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

export async function createInfografis(data: InfografisForm): Promise<ResponseCreateDataType<{ data: InfografisData; }, { data: { message: string; data: string[]; }; }>> {
    try {
        const response: ResponseCreateDataType<{ data: InfografisData; }, { data: { message: string; data: string[]; }; }> = await axios.post(
            `${BASE_API}/api/v1/infografis`,
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

export async function deleteInfografis(id: number): Promise<ResponseCreateDataType<{ data: InfografisData; }, { data: { message: string; data: string[]; }; }>> {
    try {
        const response: ResponseCreateDataType<{ data: InfografisData; }, { data: { message: string; data: string[]; }; }> = await axios.delete(
            `${BASE_API}/api/v1/infografis/${id}`,
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