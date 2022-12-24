import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";

interface IState {
  chatIsActive: boolean;
}

const initialState: IState = {
  chatIsActive: true,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    chatHandler: (state) => {
      state.chatIsActive = !state.chatIsActive;
    },
  },
});

export const { chatHandler } = sidebarSlice.actions;
export default sidebarSlice.reducer;
