import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckOutBar from "../components/CheckOutBar";
import { RootState } from "../store/store";
import { savePaymentMethod } from "../store/userSlice/userSlice";

const PaymentMethodsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addressInfo, paymentMethodName } = useSelector(
    (state: RootState) => state.user
  );
  const [paymentMethod, setPaymentMethod] = useState(
    paymentMethodName || "PayPal"
  );
  useEffect(() => {
    if (!addressInfo?.address) {
      navigate("/shipping");
    }
  });
  const submitHandler = (e: any) => {
    dispatch(savePaymentMethod(paymentMethod));
    localStorage.setItem("paymentMethod", JSON.stringify(paymentMethod));
    navigate("/placeorder");
  };
  return (
    <div>
      <CheckOutBar step1 step2 step3></CheckOutBar>
      <div className="container small-container">
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="paypal"
              label="PayPal"
              value="PayPal"
              checked={paymentMethod === "PayPal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="stripe"
              label="Stripe"
              value="Stripe"
              checked={paymentMethod === "Stripe"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default PaymentMethodsPage;
