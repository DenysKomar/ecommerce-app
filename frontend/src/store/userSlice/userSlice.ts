import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserData } from "../../interfaces/data";
interface IAddressData {
  fullName: string;
  address: string;
  city: string;
  code: string;
  country: string;
}
interface IUserSlice {
  userInfo: IUserData | null;
  addressInfo: IAddressData | null;
  paymentMethodName: string;
}
const initialState: IUserSlice = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") || "{}")
    : null,
  addressInfo: localStorage.getItem("addressInfo")
    ? JSON.parse(localStorage.getItem("addressInfo") || "{}")
    : null,
  paymentMethodName: localStorage.getItem("paymentMethod")
    ? JSON.parse(localStorage.getItem("paymentMethod") || "")
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
      state.addressInfo = null;
      state.paymentMethodName = "";
    },
    saveAddress: (state: IUserSlice, action: PayloadAction<IAddressData>) => {
      state.addressInfo = action.payload;
      localStorage.setItem("addressInfo", JSON.stringify(action.payload));
    },
    savePaymentMethod: (state: IUserSlice, action: PayloadAction<string>) => {
      state.paymentMethodName = action.payload;
    },
  },
});

export const { signInUser, signOutUser, saveAddress, savePaymentMethod } =
  userSlice.actions;
export default userSlice.reducer;
