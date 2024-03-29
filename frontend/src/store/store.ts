import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice/cartSlice";
import productReducer from "./productSlice/productSlice";
import userReducer from "./userSlice/userSlice";
import productsReducer from "./productsSlice/productsSlice";
import orderReducer from "./orderSlice/orderSlice";
import searchReducer from "./searchSlice/searchSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    user: userReducer,
    products: productsReducer,
    order: orderReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
