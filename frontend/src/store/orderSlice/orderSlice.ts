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
  createdAt: string;
  updatedAt: string;
  __v: number;
  paidAt: string;
  deliveredAt: string;
}

export interface RootObject {
  message: string;
  order: IOrder;
}
interface IOrderSlice {
  order: IOrder;
  loading: boolean;
  error: string;
  loadingPay: boolean;
  successPay: boolean;
  errorPay: string;
  allOrders: IOrder[];
}
const initialState: IOrderSlice = {
  loading: true,
  loadingPay: false,
  successPay: false,
  order: {} as IOrder,
  allOrders: [],
  error: "",
  errorPay: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    fetchAllOrdersSuccess: (
      state: IOrderSlice,
      action: PayloadAction<IOrder[]>
    ) => {
      state.loading = false;
      state.allOrders = action.payload;
    },
    fetchOrderSuccess: (state: IOrderSlice, action: PayloadAction<IOrder>) => {
      state.loading = false;
      state.order = action.payload;
    },
    fetchOrderError: (state: IOrderSlice, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    payRequest: (state: IOrderSlice) => {
      state.loadingPay = true;
    },
    paySuccess: (state: IOrderSlice) => {
      state.loadingPay = false;
      state.successPay = true;
    },
    payFail: (state: IOrderSlice, action: PayloadAction<string>) => {
      state.loadingPay = false;
      state.errorPay = action.payload;
    },
    payReset: (state: IOrderSlice) => {
      state.loadingPay = false;
      state.successPay = false;
    },
  },
});

export const {
  fetchOrderSuccess,
  fetchOrderError,
  payRequest,
  paySuccess,
  payFail,
  payReset,
  fetchAllOrdersSuccess,
} = orderSlice.actions;
export default orderSlice.reducer;
