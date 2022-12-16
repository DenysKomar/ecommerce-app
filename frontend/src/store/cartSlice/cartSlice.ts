import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductData } from "../../interfaces/data";

interface IProductItem extends IProductData {
  quantity: number;
}

interface CartState {
  value: number;
  cartItems: IProductItem[];
}
const initialState: CartState = {
  value: 0,
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state: CartState, action: PayloadAction<IProductData>) => {
      const existItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );

      state.cartItems = existItem
        ? state.cartItems.map((item) =>
            item._id === existItem._id
              ? { ...action.payload, quantity: item.quantity + 1 }
              : item
          )
        : [...state.cartItems, { ...action.payload, quantity: 1 }];
      state.value = state.value + 1;
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
