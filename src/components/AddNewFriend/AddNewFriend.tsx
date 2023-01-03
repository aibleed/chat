import { Formik, Form, Field, FormikHelpers } from "formik";
import { FC, useCallback, memo, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { chatActions } from "../../redux/slices/chatSlice";
import { toastOptions } from "../../utils/toastOptions";
interface IValues {
  username: string;
}
interface IProps {
  modal: boolean;
  setModal: (a: boolean) => void;
}

const AddNewFriend: FC<IProps> = memo(({ modal, setModal }) => {
  const dispatch = useAppDispatch();
  const errorMessages = useAppSelector(
    (state) => state.chatSlice.errorsMessages
  );
  const customId = "custom-id-yes";
  const handleValidation = (values: { username: string }) => {
    const { username } = values;
    if (username === "" || username.length < 3) {
      toast.error("Username less than 3 words", {
        ...toastOptions,
        toastId: customId,
      });
      return false;
    }
    return true;
  };
  useEffect(() => {
    if (errorMessages) {
      toast.error(errorMessages, toastOptions);
    }
  }, [errorMessages]);

  const handleSubmit = (values: IValues, help: FormikHelpers<IValues>) => {
    if (handleValidation(values)) {
      help.resetForm();
      dispatch(chatActions.setNewFriend(values));
    }
    help.setSubmitting(false);
    setModal(false);
  };
  const onClose = useCallback(() => {
    setModal(false);
  }, [modal]);
  const wrapperClassList =
    (modal
      ? "transition-all ease-in-out duration-500 visible opacity-100"
      : "invisible opacity-0") +
    " transition-all ease-in-out duration-500 absolute left-0 top-0 z-10 w-full h-screen backdrop-blur-sm";
  const classList =
    (modal
      ? "transition-all duration-500 visible ease-in-out opacity-100"
      : "invisible opacity-0") +
    " transition-all ease-in-out duration-500 absolute left-1/2 right-1/2 top-1/2 translate-y-[-50%] translate-x-[-50%] sm:w-96 sm:h-72 w-60 h-60 p-5 bg-gray-800 rounded-2xl z-30";
  return (
    <>
      <div className={classList}>
        <h3 className="text-white text-2xl text-center mb-6 font-semibold">
          Add friend
        </h3>

        <span
          onClick={onClose}
          className="absolute top-[-28px] cursor-pointer text-3xl font-extrabold text-green-500 right-[-38px]"
        >
          &#x2715;
        </span>
        <Formik
          initialValues={{
            username: "",
          }}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col text-green-500 font-bold w-full h-full">
            <label htmlFor="username">Username</label>
            <Field
              className="text-black rounded-xl px-3 mt-1 py-2"
              id="username"
              name="username"
              placeholder="John"
            />

            <button
              className="w-30 h-12 bg-gray-700 hover:text-white hover:bg-green-500 rounded-3xl hover:rounded-xl transition-all ease-in mt-7"
              type="submit"
            >
              Submit
            </button>
          </Form>
        </Formik>
      </div>
      <ToastContainer
        position="top-left"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="dark"
      />

      <div onClick={onClose} className={wrapperClassList}></div>
    </>
  );
});

export default AddNewFriend;
