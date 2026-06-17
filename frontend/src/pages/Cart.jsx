import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, addToCart } from '../redux/cartSlice';
import '../styles/cart.css';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Debug log - see what's in cart
  useEffect(() => {
    console.log("=== CART DEBUG ===");
    console.log("Full cartItems:", JSON.stringify(cartItems, null, 2));
    if (cartItems.length > 0) {
      console.log("First item keys:", Object.keys(cartItems[0]));
      console.log("First item:", cartItems[0]);
    }
  }, [cartItems]);

  const handleRemove = (id) => {
    console.log("Removing item with id:", id);
    dispatch(removeFromCart(id));
  };

  const handleUpdateQty = (item, qty) => {
    if (qty > 0) {
      dispatch(addToCart({ ...item, qty }));
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link to="/shop">Go Shopping</Link></p>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p>₹{item.price}</p>
                  <div className="qty-controls">
                    <button onClick={() => handleUpdateQty(item, item.qty - 1)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => handleUpdateQty(item, item.qty + 1)}>+</button>
                  </div>
                  <button onClick={() => handleRemove(item._id)} className="btn-remove">Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Total: ₹{totalPrice.toFixed(2)}</h3>
            <button onClick={() => navigate('/checkout')} className="btn btn-checkout">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;