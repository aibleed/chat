import MyForm, { Values } from "../components/Form/Form";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { toastOptions } from "../utils/toastOptions";
import { toast } from "react-toastify";
import { FormikHelpers } from "formik";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchAuth } from "../redux/slices/chatSlice";
const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const status = useAppSelector((state) => state.chatSlice.status);
  const user = useAppSelector((state) => state.chatSlice.user);
  if (status === "loading") {
    toast.loading("Loading...", toastOptions);
  } else {
    toast.dismiss();
  }
  if (user && user.loggedIn) {
    return <Navigate to="/home" replace={true} />;
    // {user && user.loggedIn && <Navigate to="/home" replace={true} />}
  }

  const handleValidation = (values: Values) => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };
  const handleSubmit = async (
    values: Values,
    { setSubmitting, resetForm }: FormikHelpers<Values>
  ) => {
    if (handleValidation(values)) {
      resetForm();
      const data = await dispatch(fetchAuth(values));

      if (!data.payload) {
        return toast.error("Something goes wrong", toastOptions);
      }
      if (data.payload.status) {
        return toast.error(data.payload.status, toastOptions);
      }

      localStorage.setItem("token", JSON.stringify(data.payload.token));
      navigate("/home");
      setSubmitting(false);
    }
  };

  return (
    <section className="max-[320px]:text-sm sm:py-3 bg-primary max-w-screen min-h-screen h-auto flex justify-center flex-col items-center">
      <h2 className="sm:mb-4 text-3xl mb-7 text-white ">Login</h2>
      <MyForm handleSubmit={handleSubmit} />
      <div className="text-gray-200 mt-6 w-max h-max rounded-xl py-1 px-3">
        <span>Don't have an account?</span>
        <Link
          className="bg-gray-800 text-green-500 font-bold px-3 py-2 ml-3 rounded-xl hover:text-white hover:bg-green-500 transition-all ease-in"
          to="/signup"
        >
          Create one!
        </Link>
      </div>
    </section>
  );
};

export default Login;
