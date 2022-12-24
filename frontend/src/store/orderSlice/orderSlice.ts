import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface OrderItem {
  slug: string;
  name: string;
  quantity: number;
  image: string;
  price: number;
  product: string;
  _id: string;
}

export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  code: string;
  country: string;
}

export interface IOrder {
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  user: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface RootObject {
  message: string;
  order: IOrder;
}
interface IOrderSlice {
  order: IOrder;
  loading: boolean;
  error: string;
}
const initialState: IOrderSlice = {
  loading: true,
  order: {} as IOrder,
  error: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    fetchOrderSuccess: (state: any, action: PayloadAction<IOrder>) => {
      state.loading = false;
      state.order = action.payload;
    },
    fetchOrderError: (state: any, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchOrderSuccess, fetchOrderError } = orderSlice.actions;
export default orderSlice.reducer;
