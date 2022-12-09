import { Route, Router, Routes } from "react-router-dom";
import data, { IProductData } from "./data";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header>
        <Link to={"/"}>shop</Link>
      </header>
      <main>
        <Routes>
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
