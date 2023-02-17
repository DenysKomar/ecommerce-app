import { Route, Routes, useNavigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import { Link } from "react-router-dom";
import {
  Badge,
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux/es/exports";
import { RootState } from "./store/store";
import CartPage from "./pages/CartPage";
import SignInPage from "./pages/SignInPage";
import { signOutUser } from "./store/userSlice/userSlice";
import "react-toastify/dist/ReactToastify.css";
import ShippingPage from "./pages/ShippingPage";
import { clearCart } from "./store/cartSlice/cartSlice";
import SignUpPage from "./pages/SignUpPage";
import PaymentMethodsPage from "./pages/PaymentMethodsPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderPage from "./pages/OrderPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import ProfilePage from "./pages/ProfilePage";
import axios from "axios";
import NotFound from "./pages/NotFound";
import { useState, useEffect } from "react";

import SearchBox from "./components/SearchBox";
import SearchPage from "./pages/SearchPage";
import apiLink from "./api/api";

function App() {
  axios.defaults.baseURL = apiLink;
  const [sidebarIsOpen, setSideBarIsOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState<string[]>([]);
  const navigate = useNavigate();
  const { cart, user } = useSelector((state: RootState) => state);
  const signOutHandler = () => {
    signOutUser();
    clearCart();
    localStorage.removeItem("userInfo");
    localStorage.removeItem("addressInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("value");
    localStorage.removeItem("paymentMethods");
    location.reload();
    navigate("/");
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/api/products/categories");
        setCategories(data);
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message);
        }
      }
    };
    fetchCategories();
  }, []);
  return (
    <div
      className={
        sidebarIsOpen
          ? "d-flex flex-column site-container active-cont"
          : "d-flex flex-column site-container"
      }
    >
      <ToastContainer position="bottom-center" limit={1} />
      <header>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Button
              variant="dark"
              onClick={() => setSideBarIsOpen(!sidebarIsOpen)}
            >
              <i className="fa fa-bars" />
            </Button>
            <LinkContainer to="/">
              <Navbar.Brand>Shop </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <SearchBox />
              <Nav className="me-auto justify-content-end w-100">
                <Link to="/cart" className="nav-link">
                  Cart
                  {cart.value > 0 && (
                    <Badge pill bg="danger">
                      {cart.value}
                    </Badge>
                  )}
                </Link>
                {user.userInfo ? (
                  <NavDropdown
                    title={user.userInfo.name}
                    id="basic-nav-dropdown"
                  >
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <Link
                      className="dropdown-item"
                      to="/signin"
                      onClick={signOutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/signin">
                    Sign in
                  </Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <div
        className={
          sidebarIsOpen
            ? "active-nav side-navbar d-flex justify-content-between flex-wrap flex-column"
            : "side-navbar d-flex justify-content-between flex-wrap flex-column"
        }
      >
        <Nav className="flex-column text-white w-100 p-2">
          <>
            <Nav.Item>
              <strong>Categories</strong>
            </Nav.Item>
            {categories.map((category) => {
              <Nav.Item key={category}>
                <LinkContainer
                  to={`/search?category=${category}`}
                  onClick={() => setSideBarIsOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>;
            })}
          </>
        </Nav>
      </div>
      <main>
        <Container className="mt-3">
          <Routes>
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/payment" element={<PaymentMethodsPage />} />
            <Route path="/placeorder" element={<PlaceOrderPage />} />
            <Route path="/order/:id" element={<OrderPage />} />
            <Route path="/orderhistory" element={<OrderHistoryPage />} />
            <Route path="/orderhistory/order/:id" element={<OrderPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </main>
      <footer>
        <div className="text-center">All rights reserved</div>
      </footer>
    </div>
  );
}

export default App;
