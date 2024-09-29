"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Monitor from "../public/monitor.webp";
import Image from "next/image";
import { jwtDecode } from "jwt-decode";
import EditProductForm from "../components/navigation/navbar/EditProductForms";

const MonitorPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [selectedEditProduct, setSelectedEditProduct] = useState({});
  const router = useRouter();

  // Functions to handle opening and closing the form modal
  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/products?category=monitor");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

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

  const handleEditProduct = (product) => {
    setSelectedEditProduct(product);
    handleOpenForm();
  };

  const handleDeleteProduct = async (productId) => {
    try {
      // Call API to delete the product
      await axios.delete(`/api/products/${productId}`);
      // Optionally, update the UI by removing the product from the state
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  return (
    <div className="product-page">
      <h1 className="product-title">MONITORS</h1>

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
              <Image
                src={Monitor}
                alt={product.name}
                width={150}
                height={300}
              />
            )}

            <p>{product.name}</p>
            <p>Refresh Rate: {product.specs.refreshRate}</p>
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

            {/* Edit and Delete Buttons */}
            <div className="product-actions">
              {/* Edit Icon/Button */}
              <button
                onClick={() => handleEditProduct(product)}
                className="edit-button"
              >
                ✏️ Edit
              </button>

              {/* Delete Icon/Button */}
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="delete-button"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for the Edit Product Form */}
      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseForm}>
              &times;
            </span>
            {/* Pass handleCloseForm to EditProductForm as closeForm prop */}
            <EditProductForm
              product={selectedEditProduct}
              closeForm={handleCloseForm}
              onSuccess={fetchProducts}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MonitorPage;
