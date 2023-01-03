import { Route, Router, Routes, useNavigate } from "react-router-dom";
import { IProductData } from "./interfaces/data";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import { Link } from "react-router-dom";
import { Badge, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { ToastContainer } from "react-toastify";
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

function App() {
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
    navigate("/");
    window.location.href = "/signin";
  };
  return (
    <div className="d-flex flex-column site-container">
      <ToastContainer position="bottom-center" limit={1} />
      <header>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>shop </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
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
                      to="#sighout"
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
      <main>
        <Container className="mt-3">
          <Routes>
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/payment" element={<PaymentMethodsPage />} />
            <Route path="/placeorder" element={<PlaceOrderPage />} />
            <Route path="/order/:id" element={<OrderPage />} />
            <Route path="/orderhistory" element={<OrderHistoryPage />} />
            <Route path="/profile" element={<ProfilePage />} />
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
