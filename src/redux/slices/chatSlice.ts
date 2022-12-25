import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ChatMessage from '../../models/chatMessage';
export interface ChatState {
	messages: ChatMessage[];
	isEstablishingConnection: boolean;
	isConnected: boolean;
}
const initialState: ChatState = {
	messages: [],
	isEstablishingConnection: false,
	isConnected: false,
};
const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		startConnecting: (state) => {
			state.isEstablishingConnection = true;
		},
		connectionEstablished: (state) => {
			state.isConnected = true;
			state.isEstablishingConnection = true;
		},
		receiveAllMessages: (
			state,
			action: PayloadAction<{
				messages: ChatMessage[];
			}>
		) => {
			state.messages = action.payload.messages;
		},
		receiveMessage: (state, action: PayloadAction<ChatMessage>) => {
			state.messages.push(action.payload);
		},
		submitMessage: (
			state,
			action: PayloadAction<{
				content: ChatMessage;
			}>
		) => {
			return;
		},
	},
});
export const chatActions = chatSlice.actions;
export default chatSlice.reducer;
