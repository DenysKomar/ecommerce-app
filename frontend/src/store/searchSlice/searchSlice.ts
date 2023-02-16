import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductData } from "../../interfaces/data";

interface ISearchState {
  products: IProductData[];
  page: string;
  pages: string;
  countProducts: number;
  loading: boolean;
  error: string;
}

const initialState: ISearchState = {
  products: [],
  page: "",
  pages: "",
  countProducts: 0,
  loading: true,
  error: "",
};
export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    fetchSearchRequest: (state: ISearchState): void => {
      state.loading = true;
    },
    fetchSearchError: (
      state: ISearchState,
      action: PayloadAction<string>
    ): void => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchSearchSuccess: (
      state: ISearchState,
      action: PayloadAction<ISearchState>
    ): void => {
      state.products = action.payload.products;
      state.page = action.payload.page;
      state.pages = action.payload.pages;
      state.countProducts = action.payload.countProducts;
      state.loading = false;
    },
  },
});

export const { fetchSearchRequest, fetchSearchError, fetchSearchSuccess } =
  searchSlice.actions;
export default searchSlice.reducer;
