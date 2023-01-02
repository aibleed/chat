import MyForm, { Values } from "../components/Form/Form";
import { useNavigate, Link } from "react-router-dom";
import { toastOptions } from "../utils/toastOptions";
import { toast } from "react-toastify";
import { FormikHelpers } from "formik";
import { IResponse } from "../models/RegisterResponse";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchRegister } from "../redux/slices/chatSlice";
const Register = () => {
  const navigate = useNavigate();
  const { isConnected, status } = useAppSelector((state) => state.chatSlice);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isConnected) {
      navigate("/home");
    }
  }, []);
  const handleValidation = (values: Values) => {
    const { password, username } = values;
    if (username!.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password!.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    }
    return true;
  };
  if (status === "loading") {
    toast.loading("Loading...", toastOptions);
  } else if (status === "loaded") {
    toast.dismiss();
  }
  const handleSubmit = async (
    values: Values,
    { setSubmitting, resetForm }: FormikHelpers<Values>
  ) => {
    if (handleValidation(values)) {
      resetForm();
      const data = await dispatch(fetchRegister(values));
      if (!data.payload) {
        toast.dismiss();
        return toast.error("Something goes wrong", toastOptions);
      }
      if (data.payload.status) {
        toast.dismiss();
        return toast.error(data.payload.status, toastOptions);
      }
      localStorage.setItem("token", JSON.stringify(data.payload.token));
      navigate("/home");
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-primary w-screen h-screen flex justify-center flex-col items-center">
      <h2 className="text-3xl mb-7 text-white ">Signup</h2>
      <MyForm handleSubmit={handleSubmit} />
      <div className="text-gray-200 mt-6 w-max h-max rounded-xl py-1 px-3">
        <span>Already have an account?</span>
        <Link
          className="bg-gray-800 text-green-500 font-bold px-3 py-2 ml-3 rounded-xl hover:text-white hover:bg-green-500 transition-all ease-in"
          to="/login"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
