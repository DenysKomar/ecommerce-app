import axios from "axios";
import { userInfo } from "os";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CheckOutBar from "../components/CheckOutBar";
import Loading from "../components/Loading";
import { clearCart } from "../store/cartSlice/cartSlice";
import { RootState } from "../store/store";

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, cart } = useSelector((state: RootState) => state);
  const [loading, setLoading] = useState<boolean>(false);
  const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100;
  const [itemPrice, setItemPrice] = useState<number>(
    round2(cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0))
  );
  const [shippingPrice, setShippingPrice] = useState(
    itemPrice > 100 ? round2(0) : round2(10)
  );
  const [taxPrice, setTaxPrice] = useState(round2(0.15 * itemPrice));
  const [totalPrice, setTotalPrice] = useState(
    itemPrice + shippingPrice + taxPrice
  );

  const placeOrderHandler = async () => {
    try {
      setLoading(true);

      console.log(user.addressInfo);
      const { data } = await axios.post(
        "http://localhost:5000" + "/api/orders",
        {
          orderItems: cart.cartItems,
          shippingAddress: user.addressInfo,
          paymentMethod: user.paymentMethodName,
          itemsPrice: itemPrice,
          shippingPrice: shippingPrice,
          taxPrice: taxPrice,
          totalPrice: totalPrice,
        },
        { headers: { authorization: `Bearer ${user.userInfo!.token}` } }
      );

      setLoading(false);
      dispatch(clearCart);
      localStorage.removeItem("cartItems");
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      if (err instanceof Error) {
        setLoading(false);
        toast.error(err.message);
      }
    }
  };

  useEffect(() => {
    if (!user.paymentMethodName) {
      navigate("/payment");
    }
  }, [cart, navigate]);

  return (
    <div>
      <CheckOutBar step1 step2 step3 step4 />
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <h1 className="my-3">Preview Order</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name:</strong>
                {user.addressInfo?.fullName}
                <br /> <strong>Adress:</strong>
                {user.addressInfo?.address} {user.addressInfo?.city}{" "}
                {user.addressInfo?.code} {user.addressInfo?.country}
              </Card.Text>
              <Link to="/shipping">Edit</Link>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method:</strong>
                {user.paymentMethodName}
              </Card.Text>
              <Link to="/payment">Edit</Link>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {cart.cartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        ></img>
                        <Link to={`/product/${item.slug}`}> {item.name}</Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}> ${item.price}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${itemPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Order total</Col>
                    <Col>${totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button onClick={placeOrderHandler}>Place Order</Button>
                  </div>
                  {loading && <Loading></Loading>}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrderPage;
