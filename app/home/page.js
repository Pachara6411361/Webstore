import React from 'react';
import Link from 'next/link';
import Navbar from '../components/navigation/navbar';
import Footer from '../components/footer';
import Image from 'next/image';
import Hero from '../public/picture1.jpg';
import Keyboard from '../public/keyboard.jpg';
import Mouse from '../public/mouse.jpg';
import Monitor from '../public/monitor.webp';
import Headgear from '../public/headgear.jpg';

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
          src={Hero}
          sizes="100vw"
          style={{
            width: '50%',
            height: 'auto',
          }}
        />
      </section>

      <section className="products">
        <div className="product-grid">
          {/* Keyboard Product */}
          <Link href="/keyboard">
            <div className="product-card">
              <Image
                src={Keyboard}
                alt="Keyboard"
                width={150}
                height={150}
              />
              <p>Keyboard</p>
            </div>
          </Link>

          {/* Mouse Product */}
          <Link href="/mouse">
            <div className="product-card">
              <Image
                src={Mouse}
                alt="Mouse"
                width={150}
                height={150}
              />
              <p>Mouse</p>
            </div>
          </Link>

          {/* Monitor Product */}
          <Link href="/monitor">
            <div className="product-card">
              <Image
                src={Monitor}
                alt="Monitor"
                width={150}
                height={150}
              />
              <p>Monitor</p>
            </div>
          </Link>

          {/* Headset Product */}
          <Link href="/headset">
            <div className="product-card">
              <Image
                src={Headgear}
                alt="Headset"
                width={150}
                height={150}
              />
              <p>Headset</p>
            </div>
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
