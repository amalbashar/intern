import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../redux/ecom/cartSlice";
import Button from "../reusable/Button";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  if (cartItems.length === 0) {
    return (
      <div >
        <h1>Shopping Cart</h1>
        <p >Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 >Shopping Cart</h1>
      <ul >
        {cartItems.map((item) => (
          <li key={item.id} >
            <div>
              <span >{item.title}</span>
              <span >${item.price}</span>
              <span >Quantity: {item.quantity}</span>
            </div>
        
          <Button
            label="Remove"
            onClick={() => dispatch(removeFromCart(item))}
          />
          </li>
        ))}
      </ul>
      <div >
        <Button
        label="Clear Cart"
        onClick={() => dispatch(clearCart())}
      />
      </div>
    </div>
  );
};

export default CartPage;
