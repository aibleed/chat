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
	// const friendContent = friendFilteredMessages.map((message) => (
	// 	<div
	// 		key={message._id}
	// 		className="Dialogue__friendMessage relative bg-gray-700 max-w-sm text-white w-max col-start-1 rounded-lg h-max py-2 px-4 break-words"
	// 	>
	// 		<ProfileIcon
	// 			style={{
	// 				position: "absolute",
	// 				left: "-60px",
	// 				top: "0px",
	// 			}}
	// 			img="https://png.pngitem.com/pimgs/s/192-1926160_transparent-ajax-png-anime-profile-png-download.png"
	// 			alt="icon"
	// 		/>
	//
	// 		<div>{message.message}</div>
	// 	</div>
	// ));
	//
	// const myContent = myFilteredMessages.map((message) => (
	// 	<div
	// 		key={message._id}
	// 		className="Dialogue__myMessage bg-blue-100 w-max max-w-sm h-max py-2 px-4 self-end justify-self-end text-black rounded-lg break-words col-start-2"
	// 	>
	// 		{message.message}
	// 	</div>
	// ));
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
	};

	const messageDate = useMemo(() => {
		return new Date().toLocaleString().slice(11, 17);
	}, [filteredMessages]);
	return (
		<div className="w-full h-full bg-primary px-20 relative overflow-hidden ">
			<h6 className="Dialogue__data text-gray-400 font-thin capitalize text-center my-3">
				{/* Today, 9:00 AM */}
			</h6>
			<div className="h-4/6 overflow-y-scroll scrollDialogue flex flex-col gap-4">
				{/* {isFriendSelected ? myContent : ""} */}
				{/* {isFriendSelected ? friendContent : ""} */}
				{filteredMessages.map((message) => (
					<div
						key={message._id}
						className={
							message.to === isFriendSelected ? myClassList : friendClassList
						}
					>
						{message.message}
						<span className="font-thin text-xs ml-2">{messageDate}</span>
					</div>
				))}
			</div>
			<div className="w-full h-full mt-8">
				{isFriendSelected ? (
					<Formik initialValues={initialValues} onSubmit={sendMessage}>
						<Form className="flex gap-x-8">
							<Field
								className="w-full h-16 rounded-xl px-4 py-6"
								id="message"
								name="message"
								placeholder="Message..."
							/>
							<button
								className="bg-gray-800 text-center transition-all ease-in text-xl text-green-500 font-semibold rounded-xl w-40 h-16 hover:rounded-md hover:text-white hover:bg-green-600 "
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
		</div>
	);
};

export default Dialogue;
