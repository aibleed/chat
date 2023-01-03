import ProfileIcon from "../ProfileIcon/ProfileIcon";
import { Formik, FormikHelpers, Form, Field } from "formik";
import { chatActions, getFilteredMessages } from "../../redux/slices/chatSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import ChatMessage from "../../models/chatMessage";
import { useMemo } from "react";

const Dialogue = () => {
	const dispatch = useAppDispatch();
	const isFriendSelected = useAppSelector(
		(state) => state.chatSlice.activeFriend
	);
	const filteredMessages = useAppSelector(getFilteredMessages);
	const myClassList =
		"Dialogue__myMessage bg-blue-100 font-semibold w-max max-w-sm h-max py-2 px-4 self-end justify-self-end text-black rounded-lg break-words col-start-2";
	const friendClassList =
		"Dialogue__friendMessage relative bg-gray-700 font-semibold max-w-sm text-white w-max col-start-1 rounded-lg h-max py-2 px-4 break-words";

	const sendMessage = async (
		values: ChatMessage,
		actions: FormikHelpers<ChatMessage>
	) => {
		if (values.message.length > 0) {
			values.to = isFriendSelected;
			values._id = (+new Date()).toString(16);
			values.date = new Date().toLocaleString().slice(11, -3);
			dispatch(chatActions.submitMessage(values));
			actions.setSubmitting(false);
			actions.resetForm();
		} else {
			console.log("!!!!");
		}
	};
	const initialValues: ChatMessage = {
		message: "",
		to: isFriendSelected,
		from: "",
		_id: "",
		date: "",
	};

	return (
		<div className="w-full h-screen justify-between flex flex-col sm:gap-y-8 gap-y-0 bg-primary md:px-20 px-5 relative overflow-hidden ">
			<div className="w-full h-full sm:mt-4 mt-2 flex-shrink overflow-y-scroll scrollDialogue flex flex-col gap-4">
				{filteredMessages.map((message) => (
					<div
						key={message._id}
						className={
							message.to === isFriendSelected ? myClassList : friendClassList
						}
					>
						{message.message}
						<span className="font-thin text-xs ml-2">{message.date}</span>
					</div>
				))}
			</div>
			{isFriendSelected ? (
				<Formik initialValues={initialValues} onSubmit={sendMessage}>
					<Form className="flex mt-3 sm:gap-x-4 gap-x-2">
						<Field
							className="w-full sm:h-16 h-9 rounded-xl sm:px-4 sm:py-6 py-3 px-2"
							id="message"
							name="message"
							placeholder="Message..."
						/>
						<button
							className="bg-gray-800 text-center transition-all ease-in sm:text-xl text-sm text-green-500 font-semibold rounded-xl sm:w-40 w-32 sm:h-16 h-9 hover:rounded-md hover:text-white hover:bg-green-600 "
							type="submit"
						>
							Send
						</button>
					</Form>
				</Formik>
			) : (
				""
			)}
		</div>
	);
};

export default Dialogue;
