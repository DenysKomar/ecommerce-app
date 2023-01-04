import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Root } from "react-dom/client";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ErrorBox from "../components/ErrorBox";
import Loading from "../components/Loading";
import Product from "../components/Product";
import { IProductData } from "../interfaces/data";
import {
  fetchProductsError,
  fetchProductsRequest,
  fetchProductsSuccess,
} from "../store/productsSlice/productsSlice";
import { RootState } from "../store/store";

const HomePage = () => {
  const { loading, error, products } = useSelector(
    (state: RootState) => state.products
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchProductsRequest());
      try {
        await axios.get("/api/products").then((response) => {
          dispatch(fetchProductsSuccess(response.data));
        });
      } catch (error) {
        if (error instanceof Error) {
          dispatch(fetchProductsError(error.message));
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <h1>Featured Products</h1>
      <div className="products">
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorBox variant="danger">{error}</ErrorBox>
        ) : (
          <Row>
            {products &&
              products.map((product: IProductData) => (
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
