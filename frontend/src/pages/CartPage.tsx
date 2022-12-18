import React from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ErrorBox from "../components/ErrorBox";
import { RootState } from "../store/store";
import { BsTrashFill } from "@react-icons/all-files/bs/BsTrashFill";
import { BsFillPlusCircleFill } from "@react-icons/all-files/bs/BsFillPlusCircleFill";
import { BsDashCircleFill } from "@react-icons/all-files/bs/BsDashCircleFill";
import {
  addToCart,
  removeFromCart,
  removeItemFromCart,
} from "../store/cartSlice/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state: RootState) => state.cart);
  console.log(cartItems);
  return (
    <div>
      <Helmet>
        <title>Shop Cart</title>
      </Helmet>
      <h1>Shop Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length < 0 ? (
            <ErrorBox>
              {" "}
              Cart is empty. <Link to="/">Go to Shop</Link>
            </ErrorBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        variant="light"
                        disabled={item.quantity === 1}
                        onClick={() => dispatch(removeFromCart(item))}
                      >
                        <BsDashCircleFill className="fas fa-minus-circle" />
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        variant="light"
                        disabled={item.quantity === item.countInStock}
                        onClick={() => dispatch(addToCart(item))}
                      >
                        <BsFillPlusCircleFill className="fas fa-plus-circle" />
                      </Button>
                    </Col>
                    <Col md={3}>${item.price}</Col>
                    <Col md={2}>
                      <Button
                        variant="light"
                        onClick={() => dispatch(removeItemFromCart(item))}
                      >
                        <BsTrashFill className="fas fa-trash" />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal: ({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                    items) : $
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      disabled={cartItems.length === 0}
                    >
                      Proceed to checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CartPage;
