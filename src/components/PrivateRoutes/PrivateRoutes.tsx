import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";

const useAuth = () => {
  const { loggedIn, token } = useAppSelector((state) => state.chatSlice.user);
  const isAuth = loggedIn && token;

  return isAuth;
};

const PrivateRoutes = () => {
  const isAuth = useAuth();

  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
