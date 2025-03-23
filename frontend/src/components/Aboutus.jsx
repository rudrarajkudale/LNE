import React from "react";
import "../styles/Aboutus.css";
import aboutusImg1 from '../assets/aboutusImg1.png';
import aboutusImg2 from '../assets/aboutusImg2.png';

const AboutUs = () => {
  return (
    <div className="container about-us">
      <div className="text-center mt-5">
        <h2 className="fw-bold">
          About <span className="text-warning"> LNE</span>
        </h2>
        <p className="text-muted">
          At <b>Last Night Engineering</b>, we turn late-night ideas into digital success. 
          Whether it's web development, UI/UX, or innovative tech solutions, we bring 
          your vision to life with creativity and precision.
        </p>
      </div>

      <div className="row mt-4 align-items-center">
        <div className="col-md-6">
          <img
            src={aboutusImg1}
            alt="LNE Team Collaborating"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <img
            src={aboutusImg2}
            alt="LNE Team Celebrating Success"
            className="img-fluid rounded shadow"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
