import React from 'react';
import Footer from '../components/footer'; // Adjust the path based on your project structure
import './Contacts.css'; // Import your custom CSS
import Image from 'next/image';
import Xicon from "../public/Xicon.png"
import Mail from "../public/Mail-icon.png"

const Contacts = () => {
  return (
    <div className="contact-container">
      <section className="contact-header">
        <h1>CONTACT US</h1>
      </section>

      <section className="contact-content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <div className="contact-icons">
        <Image
            src={Xicon} // Path to the image
            alt="X"
            width={60} // Size of the cart icon
            height={60}
          />
            <Image
            src={Mail} // Path to the image
            alt="X"
            width={100} // Size of the cart icon
            height={60}
          />
        </div>
      </section>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default Contacts;
