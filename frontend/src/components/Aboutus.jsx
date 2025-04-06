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
    <div className="about-container">
      <div style={{height: '100vh', width: '100%'}} className="d-flex align-items-center">
        <Container className="business-banner py-5" style={{width: '100%'}}>
          <Row className="align-items-center">
            <Col md={6} className="text-section">
              <h1 className="title">About <span className="text-warning">LNE</span></h1>
              <br />
              <p className="description">
                Founded in 2020, LNE began as a passion project in a small home office. Today, we've grown into a 
                full-fledged digital solutions agency serving clients across 5 countries. Our journey from freelancing 
                to a trusted development partner reflects our commitment to excellence and innovation in every project we undertake.
              </p>
              <p className="description">
                We specialize in creating high-performance web applications that not only meet but exceed client expectations. 
                Our team of 15+ skilled developers, designers, and strategists work collaboratively to deliver solutions that 
                drive real business results and digital transformation.
              </p>
              <Button 
                variant="warning" 
                className="mt-3 project-btn"
                onClick={() => navigate("/contact")}
              >
                Get In Touch
              </Button>
            </Col>
            <Col md={6} className="image-section d-flex justify-content-end">
              <div className="image-wrapper">
                <img src={aboutImg} alt="Business" className="img-fluid" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Second Page - Services with aligned icons */}
      <Container className="text-center my-5 py-5">
        <h2 className="fw-bold">Save time managing your business with our services</h2>
        <p className="text-muted">
          In today's fast-paced digital world, efficiency is key. Our comprehensive suite of services is designed to 
          streamline your operations, enhance your online presence, and ultimately save you valuable time and resources. 
          Let us handle the technical details while you focus on growing your business.
        </p>
        
        <Row className="mt-4 g-4">
          <Col md={4}>
            <Card className="service-card web-design h-100">
              <Card.Body className="d-flex flex-column">
                <div className="d-flex align-items-center mb-3">
                  <FaLaptopCode size={30} className="icon me-3" />
                  <Card.Title className="mb-0">Web Design</Card.Title>
                </div>
                <Card.Text>
                  Our web design services combine aesthetic appeal with functional excellence. We create responsive, 
                  intuitive interfaces that captivate visitors and drive engagement. From minimalist portfolios to 
                  complex e-commerce platforms, our designs are tailored to reflect your brand identity while 
                  optimizing user experience and conversion rates.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4}>
            <Card className="service-card development h-100">
              <Card.Body className="d-flex flex-column">
                <div className="d-flex align-items-center mb-3">
                  <FaCode size={30} className="icon me-3" />
                  <Card.Title className="mb-0">Development</Card.Title>
                </div>
                <Card.Text>
                  Leveraging cutting-edge technologies like React, Node.js, and Python, we build robust, scalable 
                  applications that grow with your business. Our development process emphasizes clean code, 
                  security best practices, and performance optimization. Whether you need a custom CRM, SaaS platform, 
                  or mobile-responsive web app, we've got you covered.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4}>
            <Card className="service-card ecommerce h-100">
              <Card.Body className="d-flex flex-column">
                <div className="d-flex align-items-center mb-3">
                  <FaShoppingCart size={30} className="icon me-3" />
                  <Card.Title className="mb-0">Teaching & Notes</Card.Title>
                </div>
                <Card.Text>
                  Education is at the heart of what we do. Our comprehensive teaching resources and meticulously 
                  crafted notes help students and professionals master web technologies. Covering everything from 
                  HTML basics to advanced JavaScript frameworks, our materials are perfect for self-paced learning 
                  or classroom instruction.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Third Page - Why Us with image border and aligned icons */}
      <Container className="about-us-section my-5 py-5">
        <Row className="align-items-center">
          <Col md={6}>
            <img 
              src={aboutImg1} 
              alt="About Us" 
              className="img-fluid about-img" 
              style={{border: "5px solid #f5b820"}} 
            />
          </Col>
          <Col md={6}>
            <h2 className="fw-bold mb-4">
              <strong>Why Choose Us?</strong>
            </h2>
            <p className="mb-4">
              With countless agencies and freelancers available, what makes LNE stand out? Our unique combination of 
              technical expertise, creative vision, and unwavering commitment to client success sets us apart in the 
              competitive digital landscape.
            </p>
            <div className="about-details mb-4">
              <div className="d-flex align-items-center">
                <FaClock size={24} className="icon me-3" />
                <h3 className="mb-0">Timely Delivery</h3>
              </div>
              <p className="mt-2 ms-5">
                We understand that time is money. Our project management methodology ensures we deliver quality work 
                on schedule, every time. Over 95% of our projects are completed by the agreed deadline without 
                compromising on quality.
              </p>
            </div>
            <div className="about-details mb-4">
              <div className="d-flex align-items-center">
                <FaUsers size={24} className="icon me-3" />
                <h3 className="mb-0">Client-Centric Approach</h3>
              </div>
              <p className="mt-2 ms-5">
                Your success is our success. We take time to understand your business objectives, target audience, 
                and competitive landscape. This deep understanding allows us to create solutions that truly move 
                the needle for your organization.
              </p>
            </div>
            <div className="about-details">
              <div className="d-flex align-items-center">
                <FaHeadset size={24} className="icon me-3" />
                <h3 className="mb-0">24/7 Support</h3>
              </div>
              <p className="mt-2 ms-5">
                Technical issues don't keep business hours, and neither do we. Our support team is available 
                around the clock to address any concerns or questions you may have. From minor tweaks to urgent 
                troubleshooting, we're here when you need us.
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Fourth Page - Projects without image */}
      <Container className="projects-section py-5 my-5">
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <h2 className="section-title mb-4">Explore Our Projects</h2>
            <p className="section-text mb-4">
              Our portfolio showcases the breadth and depth of our capabilities. From sleek corporate websites to 
              complex web applications, each project represents our dedication to quality, innovation, and client 
              satisfaction. We've helped startups establish their digital presence and enterprises transform their 
              operations through custom solutions.
            </p>
            <p className="section-text mb-4">
              Recent highlights include an e-learning platform with 50,000+ active users, a healthcare portal 
              serving 200+ clinics nationwide, and a custom inventory management system that reduced operational 
              costs by 30% for our client. Every project presents unique challenges that we embrace as opportunities 
              to push boundaries and deliver exceptional value.
            </p>
            <p className="section-text mb-5">
              We invite you to explore our work and imagine what we could create together. Whether you have detailed 
              specifications or just a rough idea, our team can help refine your vision and bring it to life with 
              technical precision and creative flair.
            </p>
            <Button
              className="project-btn"
              onClick={() => navigate("/projects")}
            >
              View All Projects
            </Button>
          </Col>
        </Row>
      </Container>

      <FloatingIcons/>
      <Footer/>
    </div>
  );
};

export default AboutUs;