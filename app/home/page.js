/*import React from "react";
import image from 'next/image'
const Home = () => {
  return (
    <div style={styles.container}>
      <image
        src="/images/stepupdeck.jpg"
        alt="Description of image"
        style={styles.image}
      />
      <div style={styles.text}>
        <h1 style={styles.title}>Your Title</h1>
        <p style={styles.paragraph}>This is some text that will be displayed on the right side of the image.</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    padding: "20px",
  },
  image: {
    width: "50%", // Image takes 50% of the container's width
    height: "auto",
  },
  text: {
    flex: "1 1 50%", // Text takes the other 50%
    paddingLeft: "20px", // Adds spacing between the image and text
    backgroundColor: "#D8B4FE", // Light purple background color
    padding: "20px", // Adds padding inside the text container
    borderRadius: "8px", // Optional: adds rounded corners
  },
  title: {
    fontSize: "2rem", // Adjust title text size (2rem = 32px)
    margin: "0", // Remove default margin
  },
  paragraph: {
    fontSize: "1rem", // Adjust paragraph text size (1rem = 16px)
    margin: "0", // Remove default margin
  },
};

export default Home;*/

// home/page.js
// pages/home.tsx
// pages/home.tsx
import React from 'react';
import Navbar from '../components/navigation/navbar';
import Footer from '../components/footer';
import Image from 'next/image';
import Hero from '../public/picture1.jpg'
import Keyboard from "../public/keyboard.jpg"
import Mouse from "../public/mouse.jpg"
import Monitor from "../public/monitor.webp"
import Headgear from "../public/headgear.jpg"

const HomePage = () => {
  return (
    <div className="home">
      <Navbar />
      <section className="hero">
        <div className="hero-text">
          <h1>Find the Right <span>Gaming Gear</span> for You</h1>
        </div>
        <Image
        alt="Hero"
        // Importing an image will
        // automatically set the width and height
        src={Hero}
        sizes="100vw"
        // Make the image display full width
        style={{
          width: '50%',
          height: 'auto',
        }}
      />
      </section>
      <section className="products">
        <div className="product-grid">
          <div className="product-card">
            <Image
              src={Keyboard} // Path to the product image
              alt="Keyboard"
              width={150} // Adjust size according to design
              height={150}
            />
            <p>Keyboard</p>
          </div>
          <div className="product-card">
            <Image
              src={Mouse} // Path to the product image
              alt="Mouse"
              width={150}
              height={150}
            />
            <p>Mouse</p>
          </div>
          <div className="product-card">
            <Image
              src={Monitor} // Path to the product image
              alt="Monitor"
              width={150}
              height={150}
            />
            <p>Monitor</p>
          </div>
          <div className="product-card">
            <Image
              src={Headgear} // Path to the product image
              alt="Headset"
              width={150}
              height={150}
            />
            <p>Headset</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;



