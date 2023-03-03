import { Middleware } from 'redux';
import { io, Socket } from 'socket.io-client';
import { chatActions } from '../redux/slices/chatSlice';
import ChatMessage from '../models/chatMessage';
import { IErrorFriend, IFriend } from '../models/FriendModel';
const chatMiddleware: Middleware = (store) => {
	let socket: Socket;
	return (next) => (action) => {
		const isConnectionEstablished = socket && store.getState().chatSlice.isConnected;
		if (chatActions.startConnecting.match(action)) {
			socket = io(import.meta.env.VITE_APP_API_URL || '', {
				withCredentials: true,
				auth: {
					token: localStorage.getItem('token') || '',
				},
				autoConnect: false,
			});
			socket.connect();
			socket.on('connect', () => {
				store.dispatch(chatActions.connectionEstablished(true));
				// socket.emit(ChatEvent.RequestAllMessages);
			});

			socket.on('friendConnected', (status: 'true' | 'false', user: string, logoutTime: string) => {
				store.dispatch(
					chatActions.changeFriendStatus({
						status,
						username: user,
						logoutTime,
					})
				);
			});

			socket.on('friends', (friends: IFriend[]) => {
				store.dispatch(chatActions.setFriends(friends));
			});

			socket.on('dm', (message: ChatMessage) => {
				store.dispatch(chatActions.receiveMessage(message));
			});
			socket.on('messages', (message: ChatMessage[]) => {
				store.dispatch(chatActions.receiveAllMessages(message));
			});
		}
		if (chatActions.submitMessage.match(action) && isConnectionEstablished) {
			socket.emit('dm', action.payload);
		}
		if (chatActions.disconnect.match(action)) {
			store.dispatch(chatActions.connectionEstablished(false));
			socket.disconnect();
		}

		if (chatActions.setNewFriend.match(action) && isConnectionEstablished) {
			socket.emit('add_friend', action.payload.username, ({ errorMsg, done, newFriend }: IErrorFriend) => {
				if (done) {
					store.dispatch(chatActions.sumbitNewFriend(newFriend));
					return;
				}
				store.dispatch(chatActions.setErrorMsg(errorMsg));
			});
		}
		next(action);
	};
};
export default chatMiddleware;
