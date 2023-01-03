import { FC, useCallback, useMemo, Dispatch, SetStateAction } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { chatActions } from "../../redux/slices/chatSlice";
import Loader from "../Loader/Loader";
import ProfileIcon from "../ProfileIcon/ProfileIcon";

interface IProps {
	active: boolean;
	setActive: Dispatch<SetStateAction<boolean>>;
}

const FriendsList: FC<IProps> = ({ active, setActive }) => {
	const { friends, status } = useAppSelector((state) => state.chatSlice);
	const dispatch = useAppDispatch();
	const handleClick = useCallback(
		function(e: React.MouseEvent) {
			dispatch(
				chatActions.setActiveFriend(
					e.currentTarget.getAttribute("data-name") || ""
				)
			);
			setActive(false);
		},
		[friends]
	);
	const onRestoreFriendList = useCallback(() => {
		dispatch(chatActions.setActiveFriend(""));
	}, []);
	const classList =
		(active ? "" : "translate-x-[-36rem] invisible absolute opacity-0 ") +
		"overflow-y-scroll friend_list justify-start w-full items-center sm:opacity-100 sm:relative sm:visible sm:justify-start sm:items-start sm:w-80 transition-all duration-500 ease-in-out flex px-5 gap-5 border-l border-l-gray-600 flex-col h-screen bg-primary text-secondary";

	const content = useMemo(() => {
		return friends.map((friend) => {
			return (
				<div
					onClick={handleClick}
					data-name={`${friend.username}`}
					key={friend._id}
					className="chat__item sm:text-sm"
				>
					<ProfileIcon
						img="https://i.pinimg.com/736x/59/6c/33/596c33eebd7a5d213541fcd56d88440d.jpg"
						alt="profile_icon"
					/>
					<div className="flex justify-between">
						<h5 className="chat__item_title capitalize font-semibold">
							{friend.username}
						</h5>
						<div className="chat__item_time">
							{friend.connected === "true"
								? ""
								: friend?.logoutTime.slice(0, 5)}
						</div>
					</div>
					<p className="chat__item_text">
						{friend.connected === "true" ? "online" : "offline"}
					</p>
				</div>
			);
		});
	}, [friends]);
	const loading = status === "loading" ? <Loader /> : "";
	return (
		<aside className={classList}>
			<h2
				onClick={onRestoreFriendList}
				className="text-3xl font-semibold cursor-pointer pt-3"
			>
				Chat
			</h2>
			<div className="chat_pinned flex flex-col gap-y-4">
				<div className="chat__title">
					<h3>Pinned</h3>
				</div>

				{loading}
				{content}
			</div>
			{/* <div className="chat_recent flex flex-col gap-y-4"> */}
			{/* 	<div className="chat__title"> */}
			{/* 		<h3>Recent</h3> */}
			{/* 	</div> */}
			{/* 	{items.map((item) => { */}
			{/* 		return ( */}
			{/* 			<div className="chat__item"> */}
			{/* 				<ProfileIcon img={item.img} alt="profile_icon" /> */}
			{/* 				<div className="flex justify-between"> */}
			{/* 					<h5 className="chat__item_title">{item.name}</h5> */}
			{/* 					<div className="chat__item_time">{item.time}</div> */}
			{/* 				</div> */}
			{/* 				<p className="chat__item_text">{item.text}</p> */}
			{/* 			</div> */}
			{/* 		); */}
			{/* 	})} */}
			{/* </div> */}
		</aside>
	);
};
export default FriendsList;
