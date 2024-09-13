"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Logo from '../public/logo2.png'; // Make sure the path to your logo is correct

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
  }, []);

  const handleRemoveItem = (index) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0).toFixed(2);
  };

  const handleCheckout = () => {
    // Show popup message
    setShowPopup(true);

    // Clear cart after a short delay
    setTimeout(() => {
      setCartItems([]);
      localStorage.removeItem('cart');
    }, 2000); // Delay to clear the cart after 2 seconds
  };

  return (
    <div className="cart-page">
      <h1 className="cart-title">YOUR SHOPPING CART</h1>
      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <p>{item.name}</p>
              <p>Price: ${Number(item.price).toFixed(2)}</p>
              <button onClick={() => handleRemoveItem(index)}>🗑️</button>
            </div>
          ))
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="cart-summary">
          <p>Total: ${calculateTotal()}</p>
          <button className="checkout-btn" onClick={handleCheckout}>
            Check out
          </button>
        </div>
      )}

      {/* Pop-up modal */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <Image src={Logo} alt="Logo" width={250} height={250} /> {/* Logo size increased */}
            <h2 className="popup-text">Thank you for your purchase!</h2>
            <p className="popup-text">Your order has been placed successfully.</p>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}

      {/* CSS for the pop-up modal */}
      <style jsx>{`
        .popup {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .popup-content {
          background: white;
          padding: 20px;
          text-align: center;
          border-radius: 10px;
        }
        .popup-text {
          color: purple; /* Make the text purple */
          margin-bottom: 10px;
        }
        .popup-content h2 {
          margin-bottom: 10px;
        }
        .popup-content button {
          margin-top: 20px;
          padding: 10px 20px;
          background-color: purple;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default CartPage;
