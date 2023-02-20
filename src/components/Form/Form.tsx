import { FC, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Formik, Field, Form, FormikHelpers } from "formik";
import "react-toastify/dist/ReactToastify.css";
export interface Values {
  username: string;
  password: string;
  token?: string | null;
  logedIn?: boolean;
}

interface IProps {
  handleSubmit: (values: Values, help: FormikHelpers<Values>) => void;
}

const MyForm: FC<IProps> = ({ handleSubmit }) => {
  const [values, setValues] = useState<Values>({
    username: "",
    password: "",
  });
  const handleChange = (event: any) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <div>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={handleSubmit}
      >
        <Form
          onChange={(e) => handleChange(e)}
          className="flex flex-col text-green-500 font-bold w-full h-full"
        >
          <label htmlFor="username">Username</label>
          <Field
            className="text-black rounded-xl px-3 mt-1 py-2"
            id="username"
            name="username"
            placeholder="John"
          />

          <label className="mt-2" htmlFor="password">
            Password
          </label>
          <Field
            className="text-black rounded-xl mt-1 px-3 py-2"
            id="password"
            name="password"
            type="password"
          />

          <button
            className="w-30 h-12 bg-gray-800 hover:text-white hover:bg-green-500 rounded-3xl hover:rounded-xl transition-all ease-in mt-7"
            type="submit"
          >
            Submit
          </button>
        </Form>
      </Formik>
      <ToastContainer
        limit={3}
        toastClassName={"max-[320px]:text-sm max-[320px]:w-44"}
        position="bottom-center"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default MyForm;
