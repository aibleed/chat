import { useState, useEffect } from "react";
import FriendsList from "../components/FriendsList/FriendsList";
import MainChat from "../components/MainChat/MainChat";
import Sidebar from "../components/Sidebar/Sidebar";
import { useAppDispatch } from "../hooks/hooks";
import { chatActions } from "../redux/slices/chatSlice";
const ChatPage = () => {
	const [active, setActive] = useState<boolean>(true);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(chatActions.startConnecting());
	}, []);
	return (
		<div className="App scroll-smooth box-border">
			<div className="flex box-border bg-primary">
				<Sidebar setActive={setActive} />
				<FriendsList active={active} />
				<MainChat />
			</div>
		</div>
	);
};

export default ChatPage;
