"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Keyboard from "../public/keyboard.jpg";
import Image from "next/image";
import { jwtDecode } from "jwt-decode";

const KeyboardPage = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products?category=keyboard");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
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

  // Handle adding the product to the cart
  const handleAddToCart = async (product) => {
    const userId = getUserId();

    if (!quantities[product.id]) {
      alert("Please specify quantity to add");
      return;
    }

    // Prepare the product data to be sent to the cart API
    const productData = {
      productId: product.id,
      quantity: quantities[product.id] || 1, // You can modify this based on your app logic (e.g., allow user to select quantity)
    };

    try {
      const response = await axios.post(`/api/carts/${userId}`, productData);

      console.log("Product added to cart:", product);
      if (response.status === 200) {
        router.push("/cart"); // Redirect to the cart page after adding the product
      }
    } catch (error) {
      alert("Error adding product to cart:", error);
    }
  };

  // Handle quantity change
  const handleQuantityChange = (productId, change) => {
    setQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[productId] || 0;
      const newQuantity = Math.max(currentQuantity + change, 0); // Ensure quantity doesn't go below 0
      return {
        ...prevQuantities,
        [productId]: newQuantity,
      };
    });
  };

  return (
    <div className="product-page">
      <h1 className="product-title">KEYBOARDS</h1>

      <div className="product-grid">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            {product.image ? (
              <img
                src={product.image} // Provide a default image if the URL is missing
                alt={product.name}
                width={150}
                height={300}
              />
            ) : (
              <Image src={Keyboard} alt={product.name} width={150} height={300} />
            )}

            <p>{product.name}</p>
            <p>Type: {product.specs.type}</p>
            <p>Size: {product.specs.size}</p>
            <p>Price: ${product.price.toFixed(2)}</p>

            {/* Quantity Input */}
            <div className="quantity-control">
              <button onClick={() => handleQuantityChange(product.id, -1)}>
                -
              </button>
              <span>{quantities[product.id] || 0}</span>
              <button onClick={() => handleQuantityChange(product.id, 1)}>
                +
              </button>
            </div>

            <button
              className="add-to-cart"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyboardPage;
