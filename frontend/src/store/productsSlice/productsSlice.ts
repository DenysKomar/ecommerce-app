import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductData } from "../../interfaces/data";

interface IProductState {
  loading: boolean;
  products?: IProductData[];
  error?: string;
}

const initialState: IProductState = {
  loading: true,
  products: [],
  error: "",
};

export const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    fetchProductsRequest: (state: IProductState) => {
      state.loading = true;
    },
    fetchProductsSuccess: (
      state: IProductState,
      action: PayloadAction<IProductData[]>
    ) => {
      state.loading = false;
      state.products = action.payload;
    },
    fetchProductsError: (
      state: IProductState,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsError,
} = productsSlice.actions;
export default productsSlice.reducer;
