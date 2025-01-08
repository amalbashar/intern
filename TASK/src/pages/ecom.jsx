import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/reusable/Button";
import ProductList from "../components/ecom/ProductList";

const Ecom = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>E-Commerce</h1>

      <div >
      <Button
          label="Go to Cart"
          onClick={() => navigate("cart")}
        />
        <Button
          label="Go to Manage Products"
          onClick={() => navigate("management")}
        />
        <ProductList />
        
      </div>
    </div>
  );
};

export default Ecom;
