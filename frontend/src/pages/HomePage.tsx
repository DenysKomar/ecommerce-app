import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Product from "../components/Product";
import { IProductData } from "../data";

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAILURE":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const HomePage = () => {
  //   const [products, setProducts] = useState([]);

  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    products: [],
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const httpLink = "http://localhost:5000";
        await axios.get(httpLink + "/api/products").then((response) => {
          dispatch({ type: "FETCH_SUCCESS", payload: response.data });
          console.log(response.data);
        });
      } catch (error) {
        if (error instanceof Error) {
          dispatch({ type: "FETCH_FAILURE", payload: error.message });
          console.log(error);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Featured Products</h1>
      <div className="products">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : error ? (
          <div>Error</div>
        ) : (
          <Row>
            {products.map((product: IProductData) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default HomePage;
