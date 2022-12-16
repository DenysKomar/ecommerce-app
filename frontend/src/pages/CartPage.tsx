import React from "react";
import { Button, Col, ListGroup, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ErrorBox from "../components/ErrorBox";
import { RootState } from "../store/store";
import { BsTrashFill } from "@react-icons/all-files/bs/BsTrashFill";
import { BsFillPlusCircleFill } from "@react-icons/all-files/bs/BsFillPlusCircleFill";
import { BsDashCircleFill } from "@react-icons/all-files/bs/BsDashCircleFill";

const CartPage = () => {
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
                      <Button variant="light" disabled={item.quantity === 1}>
                        <BsDashCircleFill className="fas fa-minus-circle" />
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        variant="light"
                        disabled={item.quantity === item.countInStock}
                      >
                        <BsFillPlusCircleFill className="fas fa-plus-circle" />
                      </Button>
                    </Col>
                    <Col md={3}>${item.price}</Col>
                    <Col md={2}>
                      <Button variant="light">
                        <BsTrashFill className="fas fa-trash" />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}></Col>
      </Row>
    </div>
  );
};

export default CartPage;
