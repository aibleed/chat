import React from "react";

const Chat = () => {
	return (
		<div className="chat flex px-5 gap-5 border-l border-l-gray-600 flex-col h-screen w-80 bg-primary text-secondary">
			<h2 className="text-3xl pt-3">Chat</h2>
			<div className="chat_pinned flex flex-col gap-y-4">
				<div className="chat__title">
					<h3>Pinned</h3>
				</div>

				<div className="chat__item">
					<div className="chat__item_img">
						<img
							src="https://cdn-icons-png.flaticon.com/512/3135/3135823.png"
							alt="profile_icon"
						/>
					</div>
					<div className="flex justify-between">
						<h5 className="chat__item_title">Annushka</h5>
						<div className="chat__item_time">2:25PM</div>
					</div>
					<p className="chat__item_text">Lorem ipsum dolor</p>
				</div>
				<div className="chat__item">
					<div className="chat__item_img">
						<img
							src="https://cdn-icons-png.flaticon.com/512/3135/3135823.png"
							alt="profile_icon"
						/>
					</div>
					<div className="flex justify-between">
						<h5 className="chat__item_title">Annushka</h5>
						<div className="chat__item_time">2:25PM</div>
					</div>
					<p className="chat__item_text">Lorem ipsum dolor</p>
				</div>
				<div className="chat__item">
					<div className="chat__item_img">
						<img
							src="https://cdn-icons-png.flaticon.com/512/3135/3135823.png"
							alt="profile_icon"
						/>
					</div>
					<div className="flex justify-between">
						<h5 className="chat__item_title">Annushka</h5>
						<div className="chat__item_time">2:25PM</div>
					</div>
					<p className="chat__item_text">Lorem ipsum dolor</p>
				</div>
			</div>
			<div className="chat_recent flex flex-col gap-y-4 w-full h-full">
				<div className="chat__title">
					<h3>Recent</h3>
				</div>
				<div className="chat__item">
					<div className="chat__item_img">
						<img
							src="https://cdn-icons-png.flaticon.com/512/3135/3135823.png"
							alt="profile_icon"
						/>
					</div>
					<div className="flex justify-between">
						<h5 className="chat__item_title">Annushka</h5>
						<div className="chat__item_time">2:25PM</div>
					</div>
					<p className="chat__item_text">Lorem ipsum dolor</p>
				</div>
				<div className="chat__item">
					<div className="chat__item_img">
						<img
							src="https://cdn-icons-png.flaticon.com/512/3135/3135823.png"
							alt="profile_icon"
						/>
					</div>
					<div className="flex justify-between">
						<h5 className="chat__item_title">Annushka</h5>
						<div className="chat__item_time">2:25PM</div>
					</div>
					<p className="chat__item_text">Lorem ipsum dolor</p>
				</div>
				<div className="chat__item">
					<div className="chat__item_img">
						<img
							src="https://cdn-icons-png.flaticon.com/512/3135/3135823.png"
							alt="profile_icon"
						/>
					</div>
					<div className="flex justify-between">
						<h5 className="chat__item_title">Annushka</h5>
						<div className="chat__item_time">2:25PM</div>
					</div>
					<p className="chat__item_text">Lorem ipsum dolor</p>
				</div>
			</div>
		</div>
	);
};
export default Chat;
