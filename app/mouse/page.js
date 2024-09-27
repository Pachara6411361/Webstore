"use client";
import React, { useState, useEffect } from "react";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const MousePage = () => {
  const [allMouseProducts, setAllMouseProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [brandFilters, setBrandFilters] = useState([]);
  const [wirelessFilter, setWirelessFilter] = useState("");
  const router = useRouter();

  // Fetch mouse products from MongoDB when the component mounts
  useEffect(() => {
    const fetchMouseProducts = async () => {
      try {
        const response = await axios.get('/api/mice'); // API route to fetch data from MongoDB
        setAllMouseProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching mouse products:", error);
      }
    };

    fetchMouseProducts();
  }, []);

  // Handle adding the product to the cart
  const handleAddToCart = (product) => {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    const productToAdd = {
      ...product,
      price: parseFloat(product.price), // Ensure price is a number
    };
    currentCart.push(productToAdd);
    localStorage.setItem('cart', JSON.stringify(currentCart));
    router.push('/cart'); // Redirect to the cart page
  };

  // Handle brand filter change
  const handleBrandChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setBrandFilters([...brandFilters, value]);
    } else {
      setBrandFilters(brandFilters.filter((brand) => brand !== value));
    }
  };

  // Handle wireless filter change
  const handleWirelessChange = (e) => {
    setWirelessFilter(e.target.value);
  };

  // Apply filters to the product list
  const applyFilters = () => {
    let filtered = allMouseProducts;

    if (brandFilters.length > 0) {
      filtered = filtered.filter((product) => brandFilters.includes(product.brand));
    }

    if (wirelessFilter) {
      filtered = filtered.filter((product) => product.wireless === wirelessFilter);
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="product-page">
      <h1 className="product-title">MOUSE</h1>

      {/* Filter section */}
      <div className="product-filter">
        <div className="filter-group">
          <h3 className="text-purple-500">Brand:</h3>
          <label>
            <input
              type="checkbox"
              value="Logitech"
              onChange={handleBrandChange}
            />
            Logitech
          </label>
          <label>
            <input
              type="checkbox"
              value="Razer"
              onChange={handleBrandChange}
            />
            Razer
          </label>
          <label>
            <input
              type="checkbox"
              value="Akko"
              onChange={handleBrandChange}
            />
            Akko
          </label>
          <label>
            <input
              type="checkbox"
              value="HyperX"
              onChange={handleBrandChange}
            />
            HyperX
          </label>
        </div>

        <div className="filter-group">
          <h3 className="text-purple-500">Wireless:</h3>
          <label>
            <input
              type="radio"
              value="Yes"
              name="wireless"
              onChange={handleWirelessChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              value="No"
              name="wireless"
              onChange={handleWirelessChange}
            />
            No
          </label>
        </div>

        <button className="apply-filters" onClick={applyFilters}>
          Apply Filters
        </button>
      </div>

      {/* Product listing */}
      <div className="product-grid">
        {filteredProducts.map((product, index) => (
          <div key={index} className="product-card">
            <Image
              src={product.image}
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

export default MousePage;
