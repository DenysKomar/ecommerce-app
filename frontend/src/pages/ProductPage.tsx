import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { Badge, Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ErrorBox from "../components/ErrorBox";
import Loading from "../components/Loading";
import Rating from "../components/Rating";
import { addToCart } from "../store/cartSlice/cartSlice";
import { fetchError, fetchSuccess } from "../store/productSlice/productSlice";
import { RootState } from "../store/store";

const ProductPage = () => {
  const params = useParams();
  const { slug } = params;
  const { loading, product, error } = useSelector(
    (state: RootState) => state.product
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get(`/api/products/slug/${slug}`).then((response) => {
          dispatch(fetchSuccess(response.data));
        });
      } catch (error) {
        if (error instanceof Error) {
          dispatch(fetchError(error.message));
        }
      }
    };
    fetchData();
  }, [slug]);

  return loading ? (
    <Loading />
  ) : error ? (
    <ErrorBox variant="danger">{error}</ErrorBox>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img src={product.image} alt={product.name} className="img-large" />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h1>{product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                rating={product.rating}
                numReviews={product.numReviews}
              ></Rating>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>Price: ${product.price}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              Description:
              <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg="success">in stack</Badge>
                      ) : (
                        <Badge bg="danger">Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button
                        variant="primary"
                        onClick={() => dispatch(addToCart(product))}
                      >
                        {" "}
                        Add to Curt
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductPage;
