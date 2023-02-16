import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ErrorBox from "../components/ErrorBox";
import Loading from "../components/Loading";
import Product from "../components/Product";
import Rating from "../components/Rating";
import { IProductData } from "../interfaces/data";
import {
  fetchSearchError,
  fetchSearchSuccess,
} from "../store/searchSlice/searchSlice";
import { RootState } from "../store/store";
interface IFilter {
  query?: string;
  price?: string;
  category?: string;
  rating?: string;
  order?: string;
  page?: number;
}

const SearchPage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const category = sp.get("category") || "all";
  const query = sp.get("query") || "all";
  const price = sp.get("price") || "all";
  const rating = sp.get("rating") || "all";
  const order = sp.get("order") || "newest";
  const page = sp.get("page") || 1;

  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);

  const { products, pages, loading, error, countProducts } = useSelector(
    (state: RootState) => state.search
  );
  const getFilterUrl = (filter: IFilter): string => {
    const filterPage = filter.page || page;
    const sortOrder = filter.order || order;
    const filterQuery = filter.query || query;
    const filterRating = filter.rating || rating;
    const filterPrice = filter.price || price;
    const filterCategory = filter.category || category;
    return `/search?page=${filterPage}&query=${filterQuery}&category=${filterCategory}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}`;
  };

  const prices = [
    {
      name: "$1 to $50",
      value: "1-50",
    },
    { name: "$51 to $200", value: "51-200" },
    { name: "$201 to $1000", value: "201-1000" },
  ];
  const ratings = [
    {
      name: "5 starts",
      rating: 5,
    },
    {
      name: "4 starts & up",
      rating: 4,
    },
    {
      name: "3 starts & up",
      rating: 3,
    },
    {
      name: "2 starts & up",
      rating: 2,
    },
    {
      name: "1 starts & up",
      rating: 1,
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
        );
        dispatch(fetchSearchSuccess(data));
      } catch (err) {
        if (typeof err === "string") {
          dispatch(fetchSearchError(err));
        }
      }
    };
    fetchData();
  }, [category, error, pages, page, price, query, rating]);
  return (
    <div>
      <Helmet>
        <title>Search Products</title>
      </Helmet>
      <Row>
        <Col md={3}>
          <h3>Department</h3>
          <div>
            <ul>
              <li>
                <Link
                  className={"all" === category ? "text-bold" : ""}
                  to={getFilterUrl({ category: "all" })}
                >
                  Any
                </Link>
              </li>
              {categories.map((c: any) => (
                <li key={c}>
                  <Link
                    className={c === category ? "text-bold" : ""}
                    to={getFilterUrl({ category: c })}
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Price</h3>
            <ul>
              <li>
                <Link
                  className={"all" === price ? "text-bold" : ""}
                  to={getFilterUrl({ price: "all" })}
                >
                  Any
                </Link>
              </li>
              {prices.map((p: any) => (
                <li key={p.value}>
                  <Link
                    className={p.value === price ? "text-bold" : ""}
                    to={getFilterUrl({ category: p.value })}
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Customers Review</h3>
            <ul>
              {ratings.map((r: any) => (
                <li key={r.name}>
                  <Link
                    className={r.rating === rating ? "text-bold" : ""}
                    to={getFilterUrl({ rating: r.rating })}
                  >
                    <Rating rating={r.rating} />
                  </Link>
                </li>
              ))}
              <Link
                className={rating === "all" ? "text-bold" : ""}
                to={getFilterUrl({ rating: rating })}
              >
                <Rating rating={0} />
              </Link>
            </ul>
          </div>
        </Col>
        <Col md={9}>
          {loading ? (
            <Loading></Loading>
          ) : error ? (
            <ErrorBox>{error}</ErrorBox>
          ) : (
            <>
              <Row className="justify-content-between mb-3">
                <Col md={6}>
                  <div>
                    {countProducts === 0 ? "No" : countProducts} Results
                    {query !== "all" && " : " + query}
                    {category !== "all" && " : " + category}
                    {price !== "all" && " : " + price}
                    {rating !== "all" && " : " + rating}
                    {query !== "all" ||
                    category !== "all" ||
                    rating !== "all" ||
                    price !== "all" ? (
                      <Button
                        variant="light"
                        onClick={() => navigate("/search")}
                      >
                        <i className="fas fa-times-circle"></i>
                      </Button>
                    ) : null}
                  </div>
                </Col>
                <Col className="text-end"></Col>
                Sort by
                <select
                  value={order}
                  onChange={(e) => {
                    navigate(getFilterUrl({ order: e.target.value }));
                  }}
                >
                  <option value="newest">Newest Arrivals</option>
                  <option value="lowest">Price: Low to High</option>
                  <option value="highest">Price:High to Low</option>
                  <option value="toprated">Customer Reviews</option>
                </select>
              </Row>
              {products.length === 0 && <ErrorBox>No Product Found</ErrorBox>}
              <Row>
                {products.map((product) => (
                  <Col sm={6} lg={4} className="mb-3" key={product._id}>
                    <Product product={product}></Product>
                  </Col>
                ))}
              </Row>
              <div>
                {[...Array(pages).keys()].map((x) => (
                  <LinkContainer
                    key={x + 1}
                    className="mx-1"
                    to={getFilterUrl({ page: x + 1 })}
                  >
                    <Button
                      className={Number(page) === x + 1 ? "text-bold" : ""}
                      variant="light"
                    >
                      {x + 1}
                    </Button>
                  </LinkContainer>
                ))}
              </div>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default SearchPage;
