import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Aboutus.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import aboutImg from "../assets/aboutusImg.png";
import aboutImg1 from "../assets/aboutusImg1.png";
import Footer from './footer'
import { FaLaptopCode, FaCode, FaShoppingCart, FaClock, FaUsers, FaHeadset } from "react-icons/fa";
import FloatingIcons from "./FloatingIcons";


const AboutUs = () => {
  const navigate=useNavigate()
  return (
    <>
      <Container className="business-banner py-5">
        <Row className="align-items-center">
          <Col md={6} className="text-section">
            <h1 className="title">About <span className="text-warning">LNE</span></h1>
            <br />
            <p className="description">
            Started as a passion-driven freelancing journey,
             we are now growing into a full-fledged software
              development agency. We build high-performance web applications, ensuring top-notch quality and client satisfaction.
            </p>
          </Col>
          <Col md={6} className="image-section d-flex justify-content-end">
            <div className="image-wrapper">
              <img src={aboutImg} alt="Business" className="img-fluid" />
            </div>
          </Col>
        </Row>
      </Container>
      <Container className="text-center my-5">
      <h2 className="fw-bold">Save time managing your business with our services</h2>
      <p className="text-muted">Effortless business management with our expert services—save time and boost productivity!</p>
      
      <Row className="mt-4">
        <Col md={4}>
          <Card className="service-card web-design">
            <Card.Body>
              <FaLaptopCode size={40} className="icon" />
              <Card.Title>Web Design</Card.Title>
              <Card.Text>
              We create visually appealing and user-friendly web designs that enhance user experience and engagement
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="service-card development">
            <Card.Body>
              <FaCode size={40} className="icon" />
              <Card.Title>Development</Card.Title>
              <Card.Text>
              Our development services ensure robust, scalable, and high-performance solutions tailored to your business needs
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="service-card ecommerce">
            <Card.Body>
              <FaShoppingCart size={40} className="icon" />
              <Card.Title>Teaching & Notes</Card.Title>
              <Card.Text>
              Providing high-quality educational resources and notes to make learning more accessible and effective
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    <Container className="about-us-section my-5">
  <Row className="align-items-center">
    <Col md={6}>
      <img src={aboutImg1} alt="About Us" className="img-fluid about-img" />
    </Col>
    <Col md={6}>
      <h2 className="fw-bold">
        <strong>Why us?</strong>
      </h2>
      <div className="about-details">
        <h3>
          <FaClock className="icon" /> Timely Delivery
        </h3>
        <p>We prioritize deadlines and ensure on-time project completion.</p>
      </div>
      <div className="about-details">
        <h3>
          <FaUsers className="icon" /> Client-Centric Approach
        </h3>
        <p>Your goals are our priority; we work closely to achieve them.</p>
      </div>
      <div className="about-details">
        <h3>
          <FaHeadset className="icon" /> 24/7 Support
        </h3>
        <p>Always available whenever you need assistance.</p>
      </div>
    </Col>
  </Row>
</Container>
    <Container className="projects-section py-5">
  <Row className="align-items-center">
    <Col md={6} className="text-center text-md-start">
      <h2 className="section-title">Explore Our Projects</h2>
      <p className="section-text">
        Discover how we bring ideas to life with innovative web solutions. Every project reflects our dedication to quality, creativity, and performance.
      </p>
      <Button
  className="btn btn-warning btn-sm"
  style={{width:"150px"}}
  onClick={() => navigate("/projects")}
>
  View All Projects 
</Button>

    </Col>

    <Col md={6} className="d-flex justify-content-center">
      <Card className="project-card shadow-lg">
        <Card.Img
          className="project-img"
          onClick={() => navigate("/projects")}
          variant="top"
          src="https://media2.dev.to/dynamic/image/width=1600,height=900,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fiefnhlbmi622fae8avqg.png"
          alt="Project"
        />
        <Card.Body className="text-center">
          <span className="badge project-badge">Web Design</span>
          <Card.Title className="mt-2">Creative Web Solutions</Card.Title>
          <Card.Text>
            Transforming concepts into high-quality, interactive, and scalable web applications.
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  </Row>
</Container>
<FloatingIcons/>

 <Footer/>
    </>
  );
};

export default AboutUs;