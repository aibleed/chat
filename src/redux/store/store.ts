import { configureStore } from "@reduxjs/toolkit";
import sidebarSlice from "../slices/sidebarSlice";
const store = configureStore({
  reducer: { sidebarSlice },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
