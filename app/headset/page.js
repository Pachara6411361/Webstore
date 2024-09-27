"use client";
import React, { useState, useEffect } from "react";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios'; // Import axios for making API requests

const HeadsetPage = () => {
  const [allHeadsetProducts, setAllHeadsetProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [brandFilters, setBrandFilters] = useState([]);
  const [wirelessFilter, setWirelessFilter] = useState("");
  const [surroundSoundFilter, setSurroundSoundFilter] = useState("");
  const router = useRouter();

  // Fetch headset products from MongoDB on component mount
  useEffect(() => {
    const fetchHeadsetProducts = async () => {
      try {
        const response = await axios.get('/api/headsets');
        setAllHeadsetProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching headset products:", error);
      }
    };

    fetchHeadsetProducts();
  }, []);

  // Handle adding the product to the cart
  const handleAddToCart = (product) => {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    const productToAdd = { ...product, price: parseFloat(product.price) };
    currentCart.push(productToAdd);
    localStorage.setItem('cart', JSON.stringify(currentCart));
    router.push('/cart');
  };

  // Handle brand filters
  const handleBrandChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setBrandFilters([...brandFilters, value]);
    } else {
      setBrandFilters(brandFilters.filter((brand) => brand !== value));
    }
  };

  // Handle wireless filter
  const handleWirelessChange = (e) => {
    setWirelessFilter(e.target.value);
  };

  // Handle surround sound filter
  const handleSurroundSoundChange = (e) => {
    setSurroundSoundFilter(e.target.value);
  };

  // Apply filters to the product list
  const applyFilters = () => {
    let filtered = allHeadsetProducts;

    if (brandFilters.length > 0) {
      filtered = filtered.filter((product) => brandFilters.includes(product.brand));
    }

    if (wirelessFilter) {
      filtered = filtered.filter((product) => product.wireless === wirelessFilter);
    }

    if (surroundSoundFilter) {
      filtered = filtered.filter((product) => product.surroundSound === surroundSoundFilter);
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="product-page">
      <h1 className="product-title">HEADSETS</h1>

      {/* Filter section */}
      <div className="product-filter">
        <div className="filter-group">
          <h3 className="text-purple-500">Brand:</h3>
          <label>
            <input type="checkbox" value="SteelSeries" onChange={handleBrandChange} />
            SteelSeries
          </label>
          <label>
            <input type="checkbox" value="Razer" onChange={handleBrandChange} />
            Razer
          </label>
          <label>
            <input type="checkbox" value="Logitech" onChange={handleBrandChange} />
            Logitech
          </label>
          <label>
            <input type="checkbox" value="Corsair" onChange={handleBrandChange} />
            Corsair
          </label>
        </div>

        <div className="filter-group">
          <h3 className="text-purple-500">Wireless:</h3>
          <label>
            <input type="radio" value="Yes" name="wireless" onChange={handleWirelessChange} />
            Yes
          </label>
          <label>
            <input type="radio" value="No" name="wireless" onChange={handleWirelessChange} />
            No
          </label>
        </div>

        <div className="filter-group">
          <h3 className="text-purple-500">Surround Sound:</h3>
          <label>
            <input type="radio" value="7.1" name="surroundSound" onChange={handleSurroundSoundChange} />
            7.1 Surround
          </label>
          <label>
            <input type="radio" value="Stereo" name="surroundSound" onChange={handleSurroundSoundChange} />
            Stereo
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
              src={product.image || "/default-image.jpg"} // Provide a default image path if image URL is missing
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

export default HeadsetPage;
