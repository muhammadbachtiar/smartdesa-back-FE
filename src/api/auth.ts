import axios from "axios";
import { LoginRequestDTO } from "../types/auth.type";
import HandleRespondError from "../services/utils/handleRespondError";
import { ResponseLoginType, ResponseType } from "../types/response.type";
import { UserData } from "../types/userManagement.type";

const BASE_API = import.meta.env.VITE_API_AUTH_URL

export const login = async (data:LoginRequestDTO): Promise<ResponseLoginType<{ data: { token: string | undefined; }; }, { data: { data: undefined; message: string; }; }>> => {
  try {
      const response: ResponseLoginType<{data:{ token: string | undefined}}, {data:{data:undefined, message:string}}> = await axios.post(
        `${BASE_API}/api/v1/login`,
        data,
        {
          timeout: 15000,
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
//   return {
//     "success": true,
//     "message": "Data success to data",
//     "status": 200,
//     "data": {
//         "data": {
//           "token": 'Kode Token'
//         }
//     }
// }
} 

export const auth = async (): Promise<ResponseType<{ data?: UserData | undefined; }>> => {
//   return {
//     "success": true,
//     "message": "Data success to data",
//     "code": 200,
//     "data": {
//         "id": 2,
//         "name": "Bahtiar",
//         "email": "bachtiar@gmail.com",
//         "email_verified_at": null,
//         "deleted_at": null,
//         "created_at": "2025-03-19T07:36:59.000000Z",
//         "updated_at": "2025-03-19T07:36:59.000000Z",
//         "avatar": null,
//         "roles": [
//             {
//                 "id": 2,
//                 "nama": "Admin",
//                 "created_at": "2025-03-19T07:36:11.000000Z",
//                 "updated_at": "2025-03-19T07:36:11.000000Z",
//                 "pivot": {
//                     "user_id": 2,
//                     "roles_id": 2
//                 },
//                 "permission": [
//                     {
//                         "id": 1,
//                         "function": "add-user",
//                         "apps": "core",
//                         "created_at": "2025-03-18T22:45:08.000000Z",
//                         "updated_at": "2025-03-18T22:45:08.000000Z",
//                         "pivot": {
//                             "roles_id": 2,
//                             "permission_id": 1
//                         }
//                     },
//                     {
//                         "id": 2,
//                         "function": "edit-user",
//                         "apps": "core",
//                         "created_at": "2025-03-18T22:45:08.000000Z",
//                         "updated_at": "2025-03-18T22:45:08.000000Z",
//                         "pivot": {
//                             "roles_id": 2,
//                             "permission_id": 2
//                         }
//                     },
//                     {
//                         "id": 3,
//                         "function": "delete-user",
//                         "apps": "core",
//                         "created_at": "2025-03-18T22:45:08.000000Z",
//                         "updated_at": "2025-03-18T22:45:08.000000Z",
//                         "pivot": {
//                             "roles_id": 2,
//                             "permission_id": 3
//                         }
//                     },
//                     {
//                         "id": 4,
//                         "function": "view-user",
//                         "apps": "core",
//                         "created_at": "2025-03-18T22:45:08.000000Z",
//                         "updated_at": "2025-03-18T22:45:08.000000Z",
//                         "pivot": {
//                             "roles_id": 2,
//                             "permission_id": 4
//                         }
//                     }
//                 ]
//             }
//         ]
//     }
// }
  const token = localStorage.getItem('token');
  try {
    const response: ResponseType<{ data?: UserData | undefined; }> = await axios.get(
      `${BASE_API}/api/v1/auth?with=roles.permission`,
      {
        timeout: 15000,
        headers: { 
            'ngrok-skip-browser-warning' : true,
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