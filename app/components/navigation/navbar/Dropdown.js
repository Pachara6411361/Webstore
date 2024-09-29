"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { title: "Keyboards", route: "/keyboard" },
    { title: "Mouse", route: "/mouse" },
    { title: "Monitor", route: "/monitor" },
    { title: "Headset", route: "/headset" },
    
    
  ];

  return (
    <div 
      className="relative" 
      onMouseEnter={() => setIsOpen(true)} 
      onMouseLeave={() => setIsOpen(false)} 
      style={{ position: "relative", display: "inline-block" }} // Ensure it doesn't disrupt layout
    >
      <Link href="#" className="hover:text-white px-4 py-2">
        Products ▼ {/* Adding a dropdown arrow similar to the image */}
      </Link>
      {isOpen && (
        <div 
          className="absolute top-full mt-2 left-0 z-30 w-[200px] bg-white text-black rounded-md shadow-lg"
          style={{ borderRadius: '4px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} // Shadow for a subtle effect
        >
          {menuItems.map(item => (
            <Link 
              key={item.route} 
              href={item.route} 
              className="block px-4 py-2 hover:bg-gray-100" // Block display and padding for dropdown links
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
