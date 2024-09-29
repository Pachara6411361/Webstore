"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import Logo from "../public/logo2.png";
import { jwtDecode } from "jwt-decode";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchCartItems = async () => {
      const userId = getUserId();

      try {
        const response = await axios.get(`/api/carts/${userId}`);
        setCartItems(response.data.items);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchProducts();
    fetchCartItems();
  }, []);

  const getUserId = () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      router.push("/login");
      return;
    }

    // Decode the token to get the user ID
    const { id: userId } = jwtDecode(authToken);

    return userId;
  };

  const handleRemoveItem = async (index) => {
    try {
      const userId = getUserId();

      await axios.delete(`/api/carts/${userId}`, {
        data: { productId: cartItems[index].product },
      });

      const newCart = [...cartItems];
      newCart.splice(index, 1);
      setCartItems(newCart);
    } catch (error) {
      alert("Error removing cart item:", error);
    }
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((acc, item) => {
        const product =
          products.find((product) => product.id == item.product) ?? {};
        return acc + parseFloat(product.price) * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const handleCheckout = async () => {
    try {
      const userId = getUserId();

      for (const index in cartItems) {
        await axios.delete(`/api/carts/${userId}`, {
          data: { productId: cartItems[index].product },
        });
      }

      setCartItems([]);
      setShowPopup(true);
    } catch (error) {
      alert("Error checking out:", error);
    }
  };

  return (
    <div className="cart-page">
      <h1 className="cart-title">YOUR SHOPPING CART</h1>
      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => {
                const product =
                  products.find((product) => product.id == item.product) ?? {};

                return (
                  <tr key={index}>
                    <td>{product?.name}</td>
                    <td>${Number(product?.price).toFixed(2)}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <button onClick={() => handleRemoveItem(index)}>
                        🗑️
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
            <Image src={Logo} alt="Logo" width={250} height={250} />{" "}
            {/* Logo size increased */}
            <h2 className="popup-text">Thank you for your purchase!</h2>
            <p className="popup-text">
              Your order has been placed successfully.
            </p>
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
