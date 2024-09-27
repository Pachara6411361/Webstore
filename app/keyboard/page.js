"use client";
import React, { useState, useEffect } from "react";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios'; // Import axios for making API requests

const KeyboardPage = () => {
  const [allKeyboardProducts, setAllKeyboardProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [brandFilters, setBrandFilters] = useState([]);
  const [sizeFilter, setSizeFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const router = useRouter();

  // Fetch keyboard products from MongoDB on component mount
  useEffect(() => {
    const fetchKeyboardProducts = async () => {
      try {
        const response = await axios.get('/api/keyboards');
        setAllKeyboardProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching keyboard products:", error);
      }
    };

    fetchKeyboardProducts();
  }, []);

  // Handle adding the product to the cart
  const handleAddToCart = (product) => {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    const productToAdd = {
      ...product,
      price: parseFloat(product.price),
    };
    currentCart.push(productToAdd);
    localStorage.setItem('cart', JSON.stringify(currentCart));
    router.push('/cart');
  };

  // Apply filters to the product list
  const applyFilters = () => {
    let filtered = allKeyboardProducts;

    if (brandFilters.length > 0) {
      filtered = filtered.filter((product) => brandFilters.includes(product.brand));
    }

    if (sizeFilter) {
      filtered = filtered.filter((product) => product.size === sizeFilter);
    }

    if (typeFilter) {
      filtered = filtered.filter((product) => product.type === typeFilter);
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="product-page">
      <h1 className="product-title">KEYBOARDS</h1>
      <div className="product-filter">
        <div className="filter-group">
          <h3 className="text-purple-500">Brand:</h3>
          <label>
            <input
              type="checkbox"
              value="Akko"
              onChange={(e) => setBrandFilters([...brandFilters, e.target.value])}
            />
            Akko
          </label>
          <label>
            <input
              type="checkbox"
              value="Keychron"
              onChange={(e) => setBrandFilters([...brandFilters, e.target.value])}
            />
            Keychron
          </label>
          <label>
            <input
              type="checkbox"
              value="Varmilo"
              onChange={(e) => setBrandFilters([...brandFilters, e.target.value])}
            />
            Varmilo
          </label>
        </div>

        <div className="filter-group">
          <h3 className="text-purple-500">Size:</h3>
          <label>
            <input
              type="radio"
              value="60%"
              name="size"
              onChange={(e) => setSizeFilter(e.target.value)}
            />
            60%
          </label>
          <label>
            <input
              type="radio"
              value="75%"
              name="size"
              onChange={(e) => setSizeFilter(e.target.value)}
            />
            75%
          </label>
          <label>
            <input
              type="radio"
              value="TKL"
              name="size"
              onChange={(e) => setSizeFilter(e.target.value)}
            />
            TKL
          </label>
          <label>
            <input
              type="radio"
              value="Full"
              name="size"
              onChange={(e) => setSizeFilter(e.target.value)}
            />
            Full
          </label>
        </div>

        <div className="filter-group">
          <h3 className="text-purple-500">Type:</h3>
          <label>
            <input
              type="radio"
              value="Hall Effect"
              name="type"
              onChange={(e) => setTypeFilter(e.target.value)}
            />
            Hall Effect
          </label>
          <label>
            <input
              type="radio"
              value="Mechanical"
              name="type"
              onChange={(e) => setTypeFilter(e.target.value)}
            />
            Mechanical
          </label>
        </div>

        <button className="apply-filters" onClick={applyFilters}>
          Apply Filters
        </button>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product, index) => (
          <div key={index} className="product-card">
            <Image
              src={product.image || "/default-image.jpg"} // Provide a default image if the URL is missing
              alt={product.name}
              width={150}
              height={300}
            />
            <p>{product.name}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            <button className="add-to-cart" onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyboardPage;
