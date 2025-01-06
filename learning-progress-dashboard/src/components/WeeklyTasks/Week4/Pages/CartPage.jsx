import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../Redux/cartSlice";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <h1>Shopping Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      <ul className="cart-items">
        {cartItems.map((item) => (
          <li key={item.id} className="cart-item">
            <div className="item-info">
              <span>{item.title}</span>
              <span>${item.price}</span>
              <span>Quantity: {item.quantity}</span>
            </div>
            <button
              className="remove-btn"
              onClick={() => dispatch(removeFromCart(item))}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="cart-actions">
        <button className="clear-cart-btn" onClick={() => dispatch(clearCart())}>
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default CartPage;
