import { useAppSelector } from "../../hooks/hooks";
import ProfileIcon from "../ProfileIcon/ProfileIcon";

interface IMessages {
	name: string;
	img: string;
	time: string;
	text: string;
}

const Chat = () => {
	const isActive = useAppSelector((state) => state.sidebarSlice.chatIsActive);

	const items: IMessages[] = [
		{
			name: "Annushka",
			img: "https://cdn-icons-png.flaticon.com/512/3135/3135823.png",
			time: "2:25PM",
			text: "Lorem ipsum dolor",
		},
		{
			name: "Annushka",
			img: "https://cdn-icons-png.flaticon.com/512/3135/3135823.png",
			time: "2:25PM",
			text: "Lorem ipsum dolor",
		},
		{
			name: "Annushka",
			img: "https://cdn-icons-png.flaticon.com/512/3135/3135823.png",
			time: "2:25PM",
			text: "Lorem ipsum dolor",
		},
		{
			name: "Annushka",
			img: "https://cdn-icons-png.flaticon.com/512/3135/3135823.png",
			time: "2:25PM",
			text: "Lorem ipsum dolor",
		},
	];

	const classList =
		(isActive
			? ""
			: "translate-x-[-36rem] transition-all duration-500 ease-in-out absolute l-0 invisible ") +
		"chat transition-all duration-500 ease-in-out flex px-5 gap-5 border-l border-l-gray-600 flex-col h-screen w-80 bg-primary text-secondary";

	return (
		<div className={classList}>
			<h2 className="text-3xl pt-3">Chat</h2>
			<div className="chat_pinned flex flex-col gap-y-4">
				<div className="chat__title">
					<h3>Pinned</h3>
				</div>

				{items.map((item) => {
					return (
						<div className="chat__item">
							<ProfileIcon img={item.img} alt="profile_icon" />
							<div className="flex justify-between">
								<h5 className="chat__item_title">{item.name}</h5>
								<div className="chat__item_time">{item.time}</div>
							</div>
							<p className="chat__item_text">{item.text}</p>
						</div>
					);
				})}
			</div>
			<div className="chat_recent flex flex-col gap-y-4">
				<div className="chat__title">
					<h3>Recent</h3>
				</div>
				{items.map((item) => {
					return (
						<div className="chat__item">
							<ProfileIcon img={item.img} alt="profile_icon" />
							<div className="flex justify-between">
								<h5 className="chat__item_title">{item.name}</h5>
								<div className="chat__item_time">{item.time}</div>
							</div>
							<p className="chat__item_text">{item.text}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};
export default Chat;
