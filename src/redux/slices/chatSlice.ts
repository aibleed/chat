import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import ChatMessage from "../../models/chatMessage";
import axios from "axios";
import { Values } from "../../components/Form/Form";
import { IFriend } from "../../models/FriendModel";
import { RootState } from "../store/store";
import { IResponse } from "../../models/RegisterResponse";
export interface ChatState {
  messages: ChatMessage[];
  isEstablishingConnection: boolean;
  isConnected: boolean;
  friends: IFriend[];
  activeFriend: string;
  user: {
    loggedIn: boolean;
    token: string;
  };
  status: "loading" | "loaded" | "error" | "";
  errorsMessages: string;
}
const initialState: ChatState = {
  user: {
    loggedIn: false,
    token: "",
  },
  messages: [],
  isEstablishingConnection: false,
  isConnected: false,
  status: "",
  errorsMessages: "",
  friends: [],
  activeFriend: "",
};

export const fetchAuth = createAsyncThunk(
  "auth/fetchAuth",
  async (params: Values) => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/auth/login`,
      params
    );
    return data;
  }
);

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params: Values) => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/auth/signup`,
      params
    );
    return data;
  }
);
export const authMe = createAsyncThunk("/auth/me", async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_APP_API_URL}/auth/login`,
    {
      withCredentials: true,
      headers: {
        authorization: `Bearer ` + localStorage.getItem("token"),
      },
    }
  );
  return data as { loggedIn: boolean; token: string };
});

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    startConnecting: (state) => {
      state.isEstablishingConnection = true;
    },
    setErrorMsg: (state, action: PayloadAction<string>) => {
      state.errorsMessages = action.payload;
    },
    connectionEstablished: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
      state.isEstablishingConnection = action.payload;
    },
    receiveAllMessages: (state, action: PayloadAction<ChatMessage[]>) => {
      state.messages = action.payload;
    },
    changeFriendStatus: (
      state,
      action: PayloadAction<{
        status: "true" | "false";
        username: string;
        logoutTime: string;
      }>
    ) => {
      state.friends = state.friends.map((friend) => {
        if (friend.username === action.payload.username) {
          friend.connected = action.payload.status;
          friend.logoutTime = action.payload.logoutTime;
        }
        return friend;
      });
    },
    setFriends: (state, action: PayloadAction<IFriend[]>) => {
      state.friends = action.payload;
    },
    setNewFriend: (state, action: PayloadAction<string>) => {
      state.errorsMessages = "";
      return;
    },
    disconnect: (state) => {
      state.user = { token: "", loggedIn: false };
      return;
    },
    setActiveFriend: (state, action: PayloadAction<string>) => {
      state.activeFriend = action.payload;
    },
    sumbitNewFriend: (state, action: PayloadAction<IFriend>) => {
      state.friends.push(action.payload);
    },
    receiveMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload);
    },
    submitMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages = [...state.messages, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      fetchAuth.fulfilled,
      (state, action: PayloadAction<IResponse>) => {
        state.status = "loaded";
        state.user = {
          loggedIn: action.payload.loggedIn,
          token: action.payload.token,
        };
      }
    );
    builder.addCase(fetchAuth.rejected, (state) => {
      state.status = "error";
      state.user = { token: "", loggedIn: false };
    });
    builder.addCase(fetchRegister.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      fetchRegister.fulfilled,
      (state, action: PayloadAction<IResponse>) => {
        state.status = "loaded";
        state.user = {
          loggedIn: action.payload.loggedIn,
          token: action.payload.token,
        };
      }
    );
    builder.addCase(fetchRegister.rejected, (state) => {
      state.status = "error";

      state.user = { token: "", loggedIn: false };
    });

    builder.addCase(
      authMe.fulfilled,
      (state, action: PayloadAction<{ token: string; loggedIn: boolean }>) => {
        state.status = "loaded";
        state.user = {
          loggedIn: action.payload.loggedIn,
          token: action.payload.token,
        };
      }
    );
    builder.addCase(authMe.rejected, (state) => {
      state.status = "error";
      state.user = { token: "", loggedIn: false };
    });
  },
});

const messages = (state: RootState) => state.chatSlice.messages;
const currentFriend = (state: RootState) => state.chatSlice.activeFriend;
const friendsList = (state: RootState) => state.chatSlice.friends;

export const getFilteredMessages = createSelector(
  messages,
  currentFriend,
  (message, currFriend) => {
    const content = message.filter(
      (msg) => msg.to === currFriend || msg.from === currFriend
    );
    return content;
  }
);

export const getFriends = createSelector(
  friendsList,
  currentFriend,
  (friends, active) => {
    return friends.filter((friend) => friend.username === active)[0];
  }
);

export const chatActions = chatSlice.actions;
export default chatSlice.reducer;
