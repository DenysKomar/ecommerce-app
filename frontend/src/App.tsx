import { Route, Router, Routes } from "react-router-dom";
import { IProductData } from "./interfaces/data";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import { Link } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function App() {
  return (
    <div className="d-flex flex-column site-container">
      <header>
        <Navbar bg="dark" variant="dark">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>shop </Navbar.Brand>
            </LinkContainer>
          </Container>
        </Navbar>
      </header>
      <main>
        <Container className="mt-3">
          <Routes>
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="/" element={<HomePage />} />
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
