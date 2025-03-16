import React from "react";
import "../styles/Home.css";
import Footer from "./footer";

const Home = () => {
  return (
    <>
    
    <div className="home-container">
      <h1>Welcome to Our Platform</h1>
      <p>Explore our services and enjoy an amazing experience.</p>
      <button className="explore-btn">Explore Now</button>
    </div>
    <Footer />
    </>
  );
};

export default Home;
