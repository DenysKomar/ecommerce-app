import axios from "axios";
import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ErrorBox from "../components/ErrorBox";
import Loading from "../components/Loading";
import {
  fetchAllOrdersSuccess,
  fetchOrderError,
  fetchOrderSuccess,
} from "../store/orderSlice/orderSlice";
import { RootState } from "../store/store";

const OrderHistoryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, order } = useSelector((state: RootState) => state);
  const { loading, error, allOrders } = order;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000" + "/api/orders/mine",
          {
            headers: { authorization: `Bearer ${user.userInfo!.token}` },
          }
        );
        dispatch(fetchAllOrdersSuccess(data));
      } catch (err) {
        if (err instanceof Error) {
          dispatch(fetchOrderError(err.message));
        }
      }
    };
    fetchData();
  }, [user]);
  return (
    <div>
      <Helmet>
        <title>Order History</title>
      </Helmet>
      <h1>Order History</h1>
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <ErrorBox></ErrorBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : "no"}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : "no"}
                </td>
                <td>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => {
                      navigate(`order/${order._id}`);
                    }}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderHistoryPage;
