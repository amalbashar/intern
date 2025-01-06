import React from "react";
import { useSelector } from "react-redux";

const ProductDetails = ({ productId }) => {
  const products = useSelector((state) => state.products.items);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return <p>No product found</p>;
  }

  return (
    <div className="product-details">
      <h1>{product.title}</h1>
      <img 
        src={product.images[0]} 
        alt={product.title} 
        style={{ width: "300px", borderRadius: "8px", marginBottom: "16px" }} 
      />
      <p>{product.description}</p>
      <p><strong>Price:</strong> ${product.price}</p>
    </div>
  );
};

export default ProductDetails;
