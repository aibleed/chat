import { lazy, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router";
import { useAppDispatch } from "./hooks/hooks";
import { authMe, chatActions } from "./redux/slices/chatSlice";
import PrivateRoutes from "./components/PrivateRoutes/PrivateRoutes";
const ChatPage = lazy(() => import("./pages/ChatPage"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(authMe()).then((data) => {
      if (data.payload.token) {
        navigate("/home");
      }
    });
    return () => {
      dispatch(chatActions.disconnect());
    };
  }, []);
  return (
    <Routes>
      <Route path="/signup" element={<Register />} />
      <Route path="/" element={<Login />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<ChatPage />} />
      </Route>
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;
