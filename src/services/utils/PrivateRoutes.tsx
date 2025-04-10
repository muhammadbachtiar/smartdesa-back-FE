import { Outlet, Navigate } from "react-router";
import { useSelector } from "react-redux";
import { StateContext } from "../../types/app.type";
import { useDispatch } from "react-redux";
import { setLoading } from "../../context/features/appSlice";
import { useEffect } from "react";

const PrivateRoutes = () => {
  const isLogedIn = useSelector((state: StateContext) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogedIn === null) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isLogedIn, dispatch]); 
  return isLogedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;


