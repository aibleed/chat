import { Outlet, Navigate } from "react-router-dom";

const useAuth = () => {
  const token = localStorage.getItem("token");
  const isAuth = token ? true : false;
  return isAuth;
};

const PrivateRoutes = () => {
  const isAuth = useAuth();

  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
