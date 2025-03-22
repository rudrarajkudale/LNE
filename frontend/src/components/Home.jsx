import React from "react";
import "../styles/Home.css";
import Footer from "./Footer";
import { FaSearch, FaBullhorn, FaUsers, FaEllipsisH } from "react-icons/fa";
import heroImg from "../assets/BrainStorming.gif";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="container d-flex flex-column flex-md-row align-items-center justify-content-between py-5" style={{ marginTop: "100px" }}>
        <div className="col-md-6 text-left">
          <h1 className="display-4 fw-bold text-dark">
            We Are <span className="text-warning">Creative</span> Design Agency
          </h1>
          <p className="text-muted mt-3">
            At <b>LNE (Last Night Engineering)</b>, we bring late-night hustle to life! Whether it's building powerful websites, providing hands-on web development training, or offering top-quality notes, we make learning and innovation accessible to everyone. Join us to code, create, and succeed!
          </p>
          <div className="mt-4 d-flex gap-3">
            <button className="custom-btn primary-btn">Get Started</button>
            <button className="custom-btn secondary-btn">Explore More</button>
          </div>
        </div>
        <div className="col-md-6 d-flex justify-content-center mt-4 mt-md-0">
          <img src={heroImg} alt="Illustration" className="" />
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section text-center py-5">
  <div className="container">
    <h2 className="fw-bold">
      We Provide The Best <span className="text-warning">Services</span>
    </h2>
    <p className="text-muted mb-4">
      Let us unleash the full potential of your business with our data-driven strategies.
    </p>
    
    <div className="row">
      {[
        { icon: <FaSearch />, title: "Website Development", desc: "Build & Maintain Professional Websites.", color: "bg-warning" },
        { icon: <FaBullhorn />, title: "Teaching & Training", desc: "Expert Guidance for Better Learning.", color: "bg-success" },
        { icon: <FaUsers />, title: "Notes & Study Materials", desc: "Well-Structured Resources for Students.", color: "bg-primary" },
        { icon: <FaEllipsisH />, title: "Tech Support", desc: "Keep Your Website Running Smoothly.", color: "bg-danger" }
      ].map((service, index) => (
        <div key={index} className="col-lg-3 col-md-6 mb-4">
          <div className="service-card p-4 shadow-sm rounded text-center transition-effect">
            <div className={`icon-box ${service.color} text-white p-3 rounded-circle d-inline-flex align-items-center justify-content-center mb-3`} style={{ fontSize: "1.8rem" }}>
              {service.icon}
            </div>
            <h5 className="fw-semibold">{service.title}</h5>
            <p className="text-muted">{service.desc}</p>
          </div>
        </div>
      ))}
    </div>

    <button className="custom-btn primary-btn">Explore More</button>

  </div>
</section>


      <Footer />
    </>
  );
};

export default Home;