import React from "react";
import "../styles/Home.css";
import Footer from "./footer";
import { FaSearch, FaBullhorn, FaUsers, FaEllipsisH } from "react-icons/fa";
import agencyImg from '../assets/agency.png'
import contactGuideImg from '../assets/contactguide.png'
import heroImg from '../assets/BrainStorming.gif'
const Home = () => {
  return (
    <>
  <section className="container d-flex flex-column flex-md-row align-items-center justify-content-between py-5" style={{marginTop:"100px"}}>
      <div className="col-md-6 text-left">
        <h1 className="display-4 fw-bold text-dark">
          We Are <span className="text-warning">Creative</span> Design Agency
        </h1>
        <p className="text-muted mt-3">
        At <b>LNE (Last Night Engineering)</b>, we bring late-night hustle to life! Whether it's building powerful websites,
         providing hands-on web development training, or offering top-quality notes, we make learning and innovation 
         accessible to everyone. Join us to code, create, and succeed!
        </p>
        <div className="mt-4 d-flex gap-3">
  <button className="custom-btn primary-btn">
    Get Started
  </button>
  <button className="custom-btn secondary-btn">
    Explore More
  </button>
</div>

      </div>
      <div className="col-md-6 d-flex justify-content-center mt-4 mt-md-0">
        <img
        // <a href="https://storyset.com/work">Work illustrations by Storyset</a>
          src={heroImg}
          alt="Illustration"
          // className="img-fluid"
        />
      </div>
    </section>

    <section className="services-section text-center py-5">
      <h2 className="fw-bold">
        We Provide The Best <span className="text-warning">Services</span>
      </h2>
      <p className="text-muted">
        Let us unleash the full potential of your business with our data-driven strategies.
      </p>

      <div className="container">
        <div className="row">
          {/* Service Card 1 */}
          <div className="col-lg-3 col-md-6">
            <div className="service-card">
              <div className="icon-box bg-warning">
                <FaSearch />
              </div>
              <h5>Website Development</h5>
              <p className="text-muted">Build & Maintain Professional Websites.</p>
            </div>
          </div>

          {/* Service Card 2 */}
          <div className="col-lg-3 col-md-6">
            <div className="service-card">
              <div className="icon-box bg-success">
                <FaBullhorn />
              </div>
              <h5>Teaching & Training</h5>
              <p className="text-muted">Expert Guidance for Better Learning.</p>
            </div>
          </div>

          {/* Service Card 3 */}
          <div className="col-lg-3 col-md-6">
            <div className="service-card">
              <div className="icon-box bg-primary">
                <FaUsers />
              </div>
              <h5>Notes & Study Materials</h5>
              <p className="text-muted">Well-Structured Resources for Students.</p>
            </div>
          </div>

          {/* Service Card 4 */}
          <div className="col-lg-3 col-md-6">
            <div className="service-card">
              <div className="icon-box bg-danger">
                <FaEllipsisH />
              </div>
              <h5>Tech Support & Maintenance</h5>
              <p className="text-muted">Keep Your Website Running Smoothly.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

   

    <section className="hero-section container">
      <div className="row align-items-center">
        {/* Left Side Content */}
        <div className="col-md-6">
          <h2 className="hero-title">
            Our <span className="text-warning">Agency</span>
          </h2>
          <p className="hero-text">
          <b>We believe in the power of innovation.</b> Our expertise-driven
           approach allows us to create high-quality websites, provide structured 
           teaching, deliver insightful notes, and ensure seamless website maintenance.
            We craft solutions that empower businesses and learners alike. Let’s build, educate, 
            and maintain with excellence.<b>Tailored solutions for your growth.</b>🚀
          </p>
          <button className="custom-btn primary-btn">Read more</button>
        </div>

        {/* Right Side Illustration */}
        <div className="col-md-6 text-center">
          <div className="illustration">
            <img src={agencyImg} alt="Person at Computer" className="person-img" />
           
          </div>
        </div>
      </div>
    </section>
    {/* <Footer /> */}
    </>
  );
};

export default Home;
