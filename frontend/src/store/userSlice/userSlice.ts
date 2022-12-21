import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserData } from "../../interfaces/data";
interface IUserSlice {
  userInfo: IUserData | null;
}
const initialState: IUserSlice = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") || "{}")
    : null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInUser: (state: IUserSlice, action: PayloadAction<IUserData>) => {
      console.log(action.payload);
      state.userInfo = action.payload;
    },
    signOutUser: (state: IUserSlice) => {
      state.userInfo = null;
    },
  },
});

export const { signInUser, signOutUser } = userSlice.actions;
export default userSlice.reducer;
