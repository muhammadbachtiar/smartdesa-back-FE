import { Outlet, Navigate } from "react-router";
import { useSelector } from "react-redux";
import { StateContext } from "../../types/app.type";
import { useDispatch } from "react-redux";
import { setLoading } from "../../context/features/appSlice";
import { useEffect } from "react";

const PublicRoutes = () => {
  const isLogedIn = useSelector((state: StateContext) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogedIn === null) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isLogedIn, dispatch]);

  return isLogedIn ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicRoutes;
