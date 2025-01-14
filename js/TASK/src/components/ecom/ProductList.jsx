import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../redux/ecom/productSlice";
import { addToCart } from "../redux/ecom/cartSlice";
import { useNavigate } from "react-router-dom";
import Button from "../reusable/Button";

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p >Error: {error}</p>;
  }

  return (
    <div >
      <h1 >Product List</h1>
      <ul >
        {products.map((product) => (
          <li key={product.id} >
            <div >
              <span >{product.title}</span>
              <span >${product.price}</span>
            </div>
            <div >
              <Button
                label="View Details"
                onClick={() => navigate(`details/${product.id}`)}
              />
              <Button
                label="Add to Cart"
                onClick={() => dispatch(addToCart(product))}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
