import { configureStore } from '@reduxjs/toolkit';
import chatMiddleware from '../../middleware/chatMiddleware';
import crashMiddleware from '../../middleware/crashMiddleware';
import loggerMiddleware from '../../middleware/loggerMiddleware';
import sidebarSlice from '../slices/sidebarSlice';
import chatSlice from '../slices/chatSlice';
const store = configureStore({
	reducer: { sidebarSlice, chatSlice },
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat([loggerMiddleware, crashMiddleware, chatMiddleware]);
	},
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
