"use client"; 
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import cart from './image/cart2.png'; // Make sure the path to the image is correct
import Dropdown from './Dropdown'; // Ensure this path is correct
import AddProductForm from '../navbar/addproductform'; // Adjust the path as necessary

const Navbar = () => {
  const [showForm, setShowForm] = useState(false);

  // Functions to handle opening and closing the form modal
  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  return (
    <>
      <nav className="navbar">
        {/* Navigation Links */}
        <ul className="nav-links">
          <li><Link href="/home">Home</Link></li>
          {/* Use the Dropdown component for Products */}
          <li><Dropdown /></li>
          <li><Link href="/contacts">Contact</Link></li>
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
            <span className="close" onClick={handleCloseForm}>&times;</span>
            {/* Pass handleCloseForm to AddProductForm as closeForm prop */}
            <AddProductForm closeForm={handleCloseForm} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
