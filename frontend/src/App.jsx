
import { useEffect } from "react";

import ProductForm from "./components/ProductForm.jsx";
import ProductList from "./components/ProductList.jsx";
import axios from "axios";

function App() {
  const getProducts = async () => {
    const response = await axios.get("http://localhost:4000/api/driss");
    // setProducts(response.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ProductForm getProducts={getProducts} />
      <ProductList getProducts={getProducts} />
    </div>
  );
}

export default App;