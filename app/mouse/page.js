"use client";
import React, { useState } from "react";

const MousePage = () => {
  const allMouseProducts = [
    { name: "Logitech Pro X Superlight 2", brand: "Logitech", wireless: "Yes", price: "$159.99" },
    { name: "Razer Viper V3 Pro", brand: "Razer", wireless: "Yes", price: "$159.99" },
    { name: "Akko Mouse", brand: "Akko", wireless: "No", price: "$49.99" },
    { name: "HyperX Mouse", brand: "HyperX", wireless: "Yes", price: "$69.99" },
  ];

  const [filteredProducts, setFilteredProducts] = useState(allMouseProducts);
  const [brandFilters, setBrandFilters] = useState([]);
  const [wirelessFilter, setWirelessFilter] = useState("");

  // Handle filter by brand
  const handleBrandChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setBrandFilters([...brandFilters, value]);
    } else {
      setBrandFilters(brandFilters.filter((brand) => brand !== value));
    }
  };

  // Handle filter by wireless
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
      <div className="product-filter">
        <div className="filter-group">
          <h3>Brand:</h3>
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
          <h3>Wireless:</h3>
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

      <div className="product-grid">
        {filteredProducts.map((product, index) => (
          <div key={index} className="product-card">
            <img src={`/images/mouse-${index + 1}.jpg`} alt={product.name} />
            <p>{product.name}</p>
            <p>Brand: {product.brand}</p>
            <p>Wireless: {product.wireless}</p>
            <p>Price: {product.price}</p>
            <button className="add-to-cart">+</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MousePage;
