import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IProductData } from "../interfaces/data";
import Rating from "./Rating";

interface IProduct {
  product: IProductData;
}

const Product = ({ product }: IProduct) => {
  return (
    <Card className="product">
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} alt={product.name} className="card-img-top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating
          className="rating"
          rating={product.rating}
          numReviews={product.numReviews}
        />
        <Card.Text>${product.price}</Card.Text>
        <Button>Add to cart</Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
