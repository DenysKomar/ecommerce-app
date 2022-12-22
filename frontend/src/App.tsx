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
    navigate("/");
  };
  return (
    <div className="d-flex flex-column site-container">
      <ToastContainer position="bottom-center" limit={1} />
      <header>
        <Navbar bg="dark" variant="dark">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>shop </Navbar.Brand>
            </LinkContainer>
            <Nav className="me-auto">
              <Link to="/cart" className="nav-link">
                Cart
                {cart.value > 0 && (
                  <Badge pill bg="danger">
                    {cart.value}
                  </Badge>
                )}
              </Link>
              {user.userInfo ? (
                <NavDropdown title={user.userInfo.name} id="basic-nav-dropdown">
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
