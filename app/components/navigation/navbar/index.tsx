/*import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import Button from "./Button";

const Navbar = ({ toggle }: { toggle: () => void }) => {
  return (
    <>
      <div className="w-full h-20 bg-purple-800 sticky top-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <Logo />
            <button
              type="button"
              className="inline-flex items-center md:hidden"
              onClick={toggle}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#D8B4FE"  // Light purple for the mobile menu icon
                  d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z"
                />
              </svg>
            </button>
            <ul className="hidden md:flex gap-x-6 text-purple-100">  
              <li>
                <Link href="/home">
                  <p>HOME</p>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <p>PRODUCT</p>
                </Link>
              </li>
              <li>
                <Link href="/contacts">
                  <p>CONTACTS</p>
                </Link>
              </li>
            </ul>
            <div className="hidden md:block">
              <Button />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;*/


// navbar/index.tsx
// components/navigation/navbar.tsx
// components/navigation/navbar.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from './image/logo2.png';
import cart from "./image/cart.svg"

const Navbar = () => {
  return (
    <nav className="navbar">
      

      {/* Navigation Links */}
      <ul className="nav-links">
        <li><Link href="/home">Home</Link></li>
        <li><Link href="/products">Products</Link></li>
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
    </nav>
  );
};

export default Navbar;


