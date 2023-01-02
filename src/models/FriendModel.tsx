export interface IFriend {
  username: string;
  _id: string;
  connected: "true" | "false";
  logoutTime: string;
}

export interface IErrorFriend {
  done: string;
  errorMsg: string;
  newFriend: IFriend;
}
