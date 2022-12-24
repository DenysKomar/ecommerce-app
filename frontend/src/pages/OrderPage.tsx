import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import ErrorBox from "../components/ErrorBox";
import Loading from "../components/Loading";
import {
  fetchOrderError,
  fetchOrderSuccess,
} from "../store/orderSlice/orderSlice";
import { RootState } from "../store/store";

const OrderPage = () => {
  const { user, order } = useSelector((state: RootState) => state);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  console.log(order.order);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000" + `/api/orders/${params.id}`,
          {
            headers: {
              authorization: `Bearer ${user.userInfo!.token}`,
            },
          }
        );
        dispatch(fetchOrderSuccess(data));
      } catch (err) {
        if (err instanceof Error) {
          dispatch(fetchOrderError(err.message));
        }
      }
    };

    if (!user.userInfo) {
      return navigate("/login");
    }
    if (
      !order.order._id ||
      (order.order._id && order.order._id !== params.id)
    ) {
      fetchOrder();
    }
  }, [order, user.userInfo, params.id, navigate]);
  console.log(order.loading);
  return order.loading ? (
    <Loading></Loading>
  ) : order.error ? (
    <ErrorBox>{order.error}</ErrorBox>
  ) : (
    <div>
      <Helmet>
        <title>Order {params.id}</title>
      </Helmet>
      <h1 className="my-3">Order {params.id}</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name:</strong>
                {order.order.shippingAddress.fullName} <br />
                <strong>Address:</strong>
                {order.order.shippingAddress.address}
                {order.order.shippingAddress.city}
                {order.order.shippingAddress.code}
                {order.order.shippingAddress.country}
              </Card.Text>
              {order.order.isDelivered ? (
                <ErrorBox variant="success">
                  Delivered at {order.order.createdAt}
                </ErrorBox>
              ) : (
                <ErrorBox variant="danger">Not Delivered</ErrorBox>
              )}
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method:</strong>
                {order.order.paymentMethod}
              </Card.Text>
              {order.order.isPaid ? (
                <ErrorBox variant="success">
                  Paid at {order.order.isPaid}
                </ErrorBox>
              ) : (
                <ErrorBox variant="danger">Not Paid</ErrorBox>
              )}
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {order.order.orderItems.map((item) => (
                  <ListGroup.Item>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded ,img-thumbnail"
                        ></img>
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </Col>
                      <Col md={3}>
                        {" "}
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>${item.price}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.order.itemsPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.order.shippingPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.order.taxPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Order total</Col>
                  <Col>${order.order.totalPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderPage;
