import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckOutBar from "../components/CheckOutBar";
import { RootState } from "../store/store";
import { saveAddress } from "../store/userSlice/userSlice";

const ShippingPage = () => {
  const navigate = useNavigate();
  const { addressInfo, userInfo } = useSelector(
    (state: RootState) => state.user
  );
  const [fullName, setFullName] = useState(
    addressInfo ? addressInfo.fullName : ""
  );
  const [address, setAddress] = useState(
    addressInfo ? addressInfo.address : ""
  );
  const [city, setCity] = useState(addressInfo ? addressInfo.city : "");
  const [code, setCode] = useState(addressInfo ? addressInfo.code : "");
  const [country, setCountry] = useState(
    addressInfo ? addressInfo.country : ""
  );
  const dispatch = useDispatch();
  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(saveAddress({ fullName, address, city, code, country }));
    localStorage.setItem(
      "addressInfo",
      JSON.stringify({ fullName, address, city, code, country })
    );
    navigate("/payment");
  };
  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  }, [userInfo]);
  return (
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <CheckOutBar step1 step2></CheckOutBar>
      <div className="container small-container">
        <h1 className="my-3">Shipping address</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Country</Form.Label>
            <Form.Control
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </Form.Group>
          <div className="mb-3">
            <Button variant="primary" type="submit">
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ShippingPage;
