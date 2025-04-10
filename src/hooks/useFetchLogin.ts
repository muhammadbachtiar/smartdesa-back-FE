import { useEffect, useCallback} from 'react';
import { useDispatch } from 'react-redux';
import { StateContext } from '../types/app.type';
import { useSelector } from 'react-redux';
import { setLoading } from '../context/features/appSlice';
import { ResponseLoginType } from '../types/response.type';
import { login } from '../api/auth';
import { LoginRequestDTO } from '../types/auth.type';
import { setData, setLoginStatus } from '../context/features/userSlice';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { UserData } from '../types/userManagement.type';


const useFetchLogin = (FormData: LoginRequestDTO | null) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { login: setToken } = useContext(AuthContext)!;
  const  userData = useSelector((state : StateContext) => state.user);
  const fetchData = useCallback(async () => {
    try{
      if (!FormData) return;
      dispatch(setLoading(true));
      const response = await login(FormData) as ResponseLoginType<{data:{ token: string | undefined, user: UserData}}, {data:{data:undefined, message:string}}>
      console.log(FormData, response) ; 
      if (response.status === 200) {
          console.log("Received token from API:", response.data?.data.token);   
          if (response.data?.data.token) {
              dispatch(setLoginStatus(true));
              dispatch(setData(response.data?.data.user));
              setToken(response.data?.data.token); 
          } else {
              console.error("Token is undefined");
          }
          dispatch(setLoading(false));
          setTimeout(() => {
            navigate("/dashboard");
          }, 0);
        } else {
            const errorMessage = [
              response.response?.data?.message,
              response.response?.data?.data
                ? Object.entries(response.response.data.data)
                    .map(([field, errors]) => {
                      if (Array.isArray(errors)) {
                        return `${field}: ${errors.join(", ")}`;
                      }
                      return `${field}: [Unknown error format]`;
                    })
                    .join("\n")
                : null,
            ]
              .filter(Boolean)
              .join("\n");
              dispatch(setLoading(false));     
            
            Swal.fire({
              icon: 'error',
              title: response.message,
              text: errorMessage,
              showConfirmButton: true,
              confirmButtonText: 'Close',
            });
        }
  
     }catch (error) {
      console.error(error);
      throw error
    } finally {
      dispatch(setLoading(false));
    }
    
  }, [dispatch, FormData, setToken, navigate])
  
  useEffect(() => {
    fetchData();
  },[FormData, userData]);
};

export default useFetchLogin;
