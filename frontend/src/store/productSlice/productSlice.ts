import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductData } from "../../interfaces/data";

interface IProductState {
  loading: boolean;
  product: IProductData;
  error: string;
}
const initialState: IProductState = {
  loading: true,
  product: {} as IProductData,
  error: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    fetchSuccess: (
      state: IProductState,
      action: PayloadAction<IProductData>
    ) => {
      state.loading = false;
      state.product = action.payload;
    },
    fetchError: (state: IProductState, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchSuccess, fetchError } = productSlice.actions;
export default productSlice.reducer;
