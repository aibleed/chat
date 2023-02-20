import { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router";
import { useAppDispatch } from "./hooks/hooks";
import { authMe, chatActions } from "./redux/slices/chatSlice";
import PrivateRoutes from "./components/PrivateRoutes/PrivateRoutes";
import Spinner from "./components/Spinner/Spinner";
const ChatPage = lazy(() => import("./pages/ChatPage"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
let didInit = false;
function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!didInit) {
      didInit = true;
      dispatch(authMe());
    }
    return () => {
      dispatch(chatActions.disconnect());
    };
  }, []);
  return (
    <main className="h-screen overflow-hidden">
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/signup" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<ChatPage />} />
          </Route>
          <Route path="*" element={<Login />} />
        </Routes>
      </Suspense>
    </main>
  );
}

export default App;
