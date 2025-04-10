import axios  from "axios";
import { RoleForm,  UserForm } from "../types/form.type";
import { DetailUserData, RoleData } from "../types/userManagement.type";
import { UserData } from "../types/userManagement.type";
import { ResponseType } from "../types/response.type";
import { MetaType } from "../types/app.type";
import { ResponseCreateDataType } from "../types/response.type";
import HandleRespondError from "../services/utils/handleRespondError";

const BASE_API = import.meta.env.VITE_API_AUTH_URL
const token = localStorage.getItem('token');

export async function getPermissions(page: number) {
    try {
        const response = await axios.get(
            `${BASE_API}/api/v1/permission?page=${page}&page_size=10`,
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

export async function getRoles(page: string, search?: string): Promise<ResponseType<{ data: RoleData[]; meta: MetaType; }>> {
    try {
        const response: ResponseType<{ data: RoleData[]; meta: MetaType; }> = await axios.get(
            `${BASE_API}/api/v1/roles?search=${search || ''}&page=${page}&page_size=10&with=permission`,
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

export async function getRolebyId(id: string | undefined) {
    try {
        const response = await axios.get(
            `${BASE_API}/api/v1/roles/${id}?with=permission&only=permission.id`,
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

export async function createRole(data: RoleForm): Promise<ResponseCreateDataType<{ data: RoleData; }, { data: { message: string; data: string[]; }; }>> {
    try {
        const response: ResponseCreateDataType<{ data: RoleData; }, { data: { message: string; data: string[]; }; }> = await axios.post(
            `${BASE_API}/api/v1/roles`,
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

export async function updateRole(data:RoleForm, id:string | undefined): Promise<ResponseCreateDataType<{ data: RoleData; }, { data: { message: string; data: string[]; }; }>> {
    try {
        const response: ResponseCreateDataType<{ data: RoleData; }, { data: { message: string; data: string[]; }; }> = await axios.put(
          `${BASE_API}/api/v1/roles/${id}`,
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

export async function deleteRole(id: number): Promise<ResponseCreateDataType<{ data: RoleData; }, { data: { message: string; data: string[]; }; }>> {
    try {
        const response: ResponseCreateDataType<{ data: RoleData; }, { data: { message: string; data: string[]; }; }> = await axios.delete(
            `${BASE_API}/api/v1/roles/${id}`,
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

export async function getUsers(page: string, search?: string): Promise<ResponseType<{ data: UserData[]; meta: MetaType; }>> {
    try {
        const response: ResponseType<{ data: UserData[]; meta: MetaType; }> = await axios.get(
            `${BASE_API}/api/v1/user?search=${search}&page=${page}&page_size=10&with=roles`,
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

export async function getUserbyId(id: string | undefined) {
    try {
        const response = await axios.get(
            `${BASE_API}/api/v1/user/${id}?with=roles&only=roles.id`,
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

export async function createUser(data: UserForm): Promise<ResponseCreateDataType<{ data: UserData; }, { data: { message: string; data: string[]; }; }>> {
    try {
        const response: ResponseCreateDataType<{ data: UserData; }, { data: { message: string; data: string[]; }; }> = await axios.post(
            `${BASE_API}/api/v1/user`,
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

export async function updateUser(data:UserForm, id:string | undefined): Promise<ResponseCreateDataType<{ data: DetailUserData; }, { data: { message: string; data: string[]; }; }>> {
    try {
        const response: ResponseCreateDataType<{ data: DetailUserData; }, { data: { message: string; data: string[]; }; }> = await axios.put(
          `${BASE_API}/api/v1/user/${id}`,
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

export async function deleteUser(id: number): Promise<ResponseCreateDataType<{ data: UserData; }, { data: { message: string; data: string[]; }; }>> {
    try {
        const response: ResponseCreateDataType<{ data: UserData; }, { data: { message: string; data: string[]; }; }> = await axios.delete(
            `${BASE_API}/api/v1/user/${id}`,
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

export async function uploadFile(data: FormData): Promise<ResponseCreateDataType<{ data: { url: string}; }, { data: { message: string; data: string[]; }; }>> {
    try {
        const response: ResponseCreateDataType<{ data: { url: string}; }, { data: { message: string; data: string[]; }; }> = await axios.post(
            `${BASE_API}/api/v1/upload`,
            data,
            {
                timeout: 15000,
                headers: {
                    'ngrok-skip-browser-warning': true,
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
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