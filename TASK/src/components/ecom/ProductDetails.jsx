import React from "react";
import { useSelector, useDispatch } from "react-redux"; 
import { useParams } from "react-router-dom";
import { addToCart } from "../redux/ecom/cartSlice";
import Button from "../reusable/Button";

const ProductDetails = () => {
  const { productId } = useParams(); 
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const product = products.find((p) => p.id.toString() === productId); 

  if (!product) {
    return <p >No product found</p>;
  }

  return (
    <div >
      <h1 >{product.title}</h1>
      <img 
        src={product.images[0]} 
        alt={product.title} 
      />
      <p >{product.description}</p>
      <p >
        <strong>Price:</strong> ${product.price}
      </p>

    
      <Button
        label="Add to Cart"
        onClick={() => dispatch(addToCart(product))} 
      />
    </div>
  );
};

export default ProductDetails;
