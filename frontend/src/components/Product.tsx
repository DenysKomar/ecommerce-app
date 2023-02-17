import { Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { IProductData } from "../interfaces/data";
import { addToCart } from "../store/cartSlice/cartSlice";
import Rating from "./Rating";

interface IProduct {
  product: IProductData;
}

const Product = ({ product }: IProduct) => {
  const dispatch = useDispatch();
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
        {product.countInStock === 0 ? (
          <Button disabled variant="light">
            {" "}
            Out of Stock
          </Button>
        ) : (
          <Button onClick={() => dispatch(addToCart(product))}>
            Add to cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default Product;
