import { configureStore } from "@reduxjs/toolkit";
import chatMiddleware from "../../middleware/chatMiddleware";
import crashMiddleware from "../../middleware/crashMiddleware";
import loggerMiddleware from "../../middleware/loggerMiddleware";
import chatSlice from "../slices/chatSlice";
const store = configureStore({
	reducer: { chatSlice },
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			// crashMiddleware,
			// loggerMiddleware,
			chatMiddleware
		),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
