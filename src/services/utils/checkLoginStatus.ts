import { useEffect } from "react";
import { setData, setPermissions, clearUser, setLoginStatus } from '../../context/features/userSlice';
import { useDispatch } from 'react-redux';
import { auth } from "../../api/auth";
import { ResponseType } from "../../types/response.type";
import { UserData } from "../../types/auth.type";
import HandleShowAlert from "./handleShowAlert";
import { setLoading } from "../../context/features/appSlice";

const CheckLoginStatus: React.FC = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const checkLoginStatus = async () => {
     try {
      if (!token) {
        dispatch(setLoginStatus(false));
        dispatch(clearUser());
        return;
      }
      const response = await auth() as ResponseType<{ data?: UserData | undefined }>;
      if (response.status === 200) {
        const userData = response.data?.data;
        dispatch(setLoginStatus(true));
        dispatch(setPermissions(userData?.roles?.[0].permission));
        delete userData?.roles;
        dispatch(setData(userData));
      } else if (String(response.status).startsWith('4')) {
        dispatch(setLoginStatus(false));
        HandleShowAlert('info', 'Oops...', '', '<p>Something went wrong!</p> <p>Your session has expired or your token may be invalid.</p> <p>Please log in again.</p>');
        dispatch(clearUser());
      }else {
        dispatch(setLoginStatus(false));
        HandleShowAlert('error', 'Oops...', '', '<p>Something went wrong!</p> <p>Server is busy, please try again later</p>');
        dispatch(clearUser());
      }
     }finally {
      dispatch(setLoading(false))
     }
    };
    checkLoginStatus();
  }, [dispatch, token]);

  return null; 
};

export default CheckLoginStatus;
