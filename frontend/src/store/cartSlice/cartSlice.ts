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
  value: localStorage.getItem("cartItems")
    ? Number(JSON.parse(localStorage.getItem("value") || "{}"))
    : 0,
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems") || "{}")
    : [],
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
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("value", JSON.stringify(state.value));
    },
    removeFromCart: (state: CartState, action: PayloadAction<IProductData>) => {
      const existItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );

      state.cartItems = existItem
        ? state.cartItems.map((item) =>
            item._id === existItem._id
              ? { ...action.payload, quantity: item.quantity - 1 }
              : item
          )
        : [...state.cartItems, { ...action.payload, quantity: 1 }];
      state.value = state.value - 1;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("value", JSON.stringify(state.value));
    },
    removeItemFromCart: (
      state: CartState,
      action: PayloadAction<IProductData>
    ) => {
      let value = 0;
      const cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      cartItems.forEach((item) => {
        value += item.quantity;
      });
      state.cartItems = cartItems;
      state.value = value;
      localStorage.removeItem("cartItems");
      localStorage.setItem("value", JSON.stringify(state.value));
    },
    clearCart: (state: CartState) => {
      state.cartItems = [];
      state.value = 0;
    },
  },
});

export const { addToCart, removeFromCart, removeItemFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
