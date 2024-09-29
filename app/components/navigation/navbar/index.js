"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import cart from "./image/cart2.png";
import Dropdown from "./Dropdown";
import AddProductForm from "./AddProductForm";

const Navbar = () => {
  const [showForm, setShowForm] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  // Functions to handle opening and closing the form modal
  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token from local storage
    setIsAuthenticated(false); // Update authentication state
  };

  return (
    <>
      <nav className="navbar">
        {/* Navigation Links */}
        <ul className="nav-links">
          <li>
            <Link href="/home">Home</Link>
          </li>
          <li>
            <Dropdown />
          </li>{" "}
          {/* Dropdown component for Products */}
          <li>
            <Link href="/contacts">Contact</Link>
          </li>
          {!isAuthenticated ? ( // Only show these links if not authenticated
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/register">Register</Link>
              </li>
            </>
          ) : (
            // Show logout button if authenticated
            <li>
              <Link href="/" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          )}
        </ul>

        {/* Cart Section */}
        <div className="cart">
          <Link href="/cart">
            <Image
              src={cart} // Path to the image
              alt="Cart"
              width={24} // Size of the cart icon
              height={24}
            />
          </Link>
        </div>

        {/* Button to open the Add Product Form modal */}
        <button className="add-product-btn" onClick={handleOpenForm}>
          Add Product
        </button>
      </nav>

      {/* Modal for the Add Product Form */}
      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseForm}>
              &times;
            </span>
            {/* Pass handleCloseForm to AddProductForm as closeForm prop */}
            <AddProductForm closeForm={handleCloseForm} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
