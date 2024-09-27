"use client";
import React, { useState, useEffect } from "react";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios'; // Import axios for making API requests

const MonitorPage = () => {
  const [allMonitorProducts, setAllMonitorProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [brandFilters, setBrandFilters] = useState([]);
  const [sizeFilter, setSizeFilter] = useState("");
  const [refreshRateFilter, setRefreshRateFilter] = useState("");
  const router = useRouter();

  // Fetch monitor products from MongoDB when the component mounts
  useEffect(() => {
    const fetchMonitorProducts = async () => {
      try {
        const response = await axios.get('/api/monitors');
        setAllMonitorProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching monitor products:", error);
      }
    };

    fetchMonitorProducts();
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

  // Handle size filter
  const handleSizeChange = (e) => {
    setSizeFilter(e.target.value);
  };

  // Handle refresh rate filter
  const handleRefreshRateChange = (e) => {
    setRefreshRateFilter(e.target.value);
  };

  // Apply filters to the product list
  const applyFilters = () => {
    let filtered = allMonitorProducts;

    if (brandFilters.length > 0) {
      filtered = filtered.filter((product) => brandFilters.includes(product.brand));
    }

    if (sizeFilter) {
      filtered = filtered.filter((product) => product.size === sizeFilter);
    }

    if (refreshRateFilter) {
      filtered = filtered.filter((product) => product.refreshRate === refreshRateFilter);
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="product-page">
      <h1 className="product-title">MONITORS</h1>

      {/* Filter section */}
      <div className="product-filter">
        <div className="filter-group">
          <h3 className="text-purple-500">Brand:</h3>
          <label>
            <input type="checkbox" value="Dell" onChange={handleBrandChange} />
            Dell
          </label>
          <label>
            <input type="checkbox" value="Samsung" onChange={handleBrandChange} />
            Samsung
          </label>
          <label>
            <input type="checkbox" value="LG" onChange={handleBrandChange} />
            LG
          </label>
          <label>
            <input type="checkbox" value="ASUS" onChange={handleBrandChange} />
            ASUS
          </label>
        </div>

        <div className="filter-group">
          <h3 className="text-purple-500">Size:</h3>
          <label>
            <input type="radio" value='24"' name="size" onChange={handleSizeChange} />
            24"
          </label>
          <label>
            <input type="radio" value='27"' name="size" onChange={handleSizeChange} />
            27"
          </label>
          <label>
            <input type="radio" value='34"' name="size" onChange={handleSizeChange} />
            34"
          </label>
          <label>
            <input type="radio" value='49"' name="size" onChange={handleSizeChange} />
            49"
          </label>
        </div>

        <div className="filter-group">
          <h3 className="text-purple-500">Refresh Rate:</h3>
          <label>
            <input type="radio" value="60Hz" name="refreshRate" onChange={handleRefreshRateChange} />
            60Hz
          </label>
          <label>
            <input type="radio" value="144Hz" name="refreshRate" onChange={handleRefreshRateChange} />
            144Hz
          </label>
          <label>
            <input type="radio" value="165Hz" name="refreshRate" onChange={handleRefreshRateChange} />
            165Hz
          </label>
          <label>
            <input type="radio" value="240Hz" name="refreshRate" onChange={handleRefreshRateChange} />
            240Hz
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
            <Image src={product.image || "/default-image.jpg"} alt={product.name} width={150} height={300} />
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

export default MonitorPage;
