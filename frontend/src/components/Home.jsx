import React, { useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Home.css";
import Footer from "./footer";
import { 
  FaSearch, FaBullhorn, FaUsers, FaEllipsisH, 
  FaWhatsapp, FaPhone, FaBuilding, FaEnvelope ,
  FaClock, FaUser, FaLightbulb, FaTrophy 
} from "react-icons/fa";
import heroImg from "../assets/homeImg.gif";
import missionImg from "../assets/mission.png";
import { Container, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import FloatingIcons from "./FloatingIcons";

const whatsappNumber = "YOUR_WHATSAPP_NUMBER";
const phoneNumber = "+YOUR_PHONE_NUMBER";

const services = [
  { icon: <FaSearch />, title: "Website Development", desc: "Build & maintain professional websites.", color: "bg-warning" },
  { icon: <FaBullhorn />, title: "Teaching & Training", desc: "Expert guidance for better learning.", color: "bg-success" },
  { icon: <FaUsers />, title: "Notes & Study Materials", desc: "Well-structured resources for students.", color: "bg-primary" },
  { icon: <FaEllipsisH />, title: "Tech Support", desc: "Keep your website running smoothly.", color: "bg-danger" }
];

const missionPoints = [
  { icon: <FaUsers />, title: "Expert Team", text: "Our skilled team crafts exceptional digital solutions." },
  { icon: <FaBuilding />, title: "Scaling Startups", text: "Empowering businesses with innovative technology." },
  { icon: <FaEnvelope />, title: "24/7 Support", text: "Dedicated, round-the-clock customer service." }
];

const features = [
  { icon: <FaClock size={24} />, title: "Time Efficient", desc: "On-time project delivery." },
  { icon: <FaUser size={24} />, title: "User Friendly", desc: "Focused on user experience." },
  { icon: <FaLightbulb size={24} />, title: "Creative Designs", desc: "Innovative, captivating design solutions." },
  { icon: <FaTrophy size={24} />, title: "Achievements", desc: "Recognized for outstanding achievements." },
];

const Home = () => {
  const navigate = useNavigate();
  const servicesRef = useRef(null);

  // Scroll to services section
  const handleGetStartedClick = useCallback(() => {
    servicesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="container d-flex flex-column flex-md-row align-items-center justify-content-between py-5" style={{ marginTop: "100px" }}>
        <motion.div 
          className="col-md-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="display-4 fw-bold text-dark">
            We Are <span className="text-warning">Creative</span> Design Agency
          </h1>
          <p className="text-muted mt-3">
            At <b>LNE (Last Night Engineering)</b>, we bring late-night hustle to life! From building powerful websites to top-quality web development training, we make learning and innovation accessible to everyone. Join us to code, create, and succeed!
          </p>
          <div className="mt-4 d-flex gap-3">
            <motion.button 
              className="custom-btn primary-btn" 
              onClick={handleGetStartedClick} 
              whileHover={{ scale: 1.05 }}
            >
              Get Started
            </motion.button>
          </div>
        </motion.div>

        <motion.div 
          className="col-md-6 d-flex justify-content-center mt-4 mt-md-0"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img src={heroImg} alt="Creative brainstorming illustration" className="img-fluid" />
        </motion.div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="services-section text-center py-5">
        <Container>
          <h2 className="fw-bold">
            We Provide The Best <span className="text-warning">Services</span>
          </h2>
          <p className="text-muted mb-4">
            Unleash the full potential of your business with our expert digital strategies.
          </p>
          
          <Row>
            {services.map((service, index) => (
              <Col key={index} lg={3} md={6} className="mb-4">
                <motion.div 
                  className="service-card p-4 shadow-sm rounded text-center" 
                  whileHover={{ scale: 1.05 }}
                >
                  <div className={`icon-box ${service.color} text-white p-3 rounded-circle mb-3`} style={{ fontSize: "1.8rem" }}>
                    {service.icon}
                  </div>
                  <h5 className="fw-semibold">{service.title}</h5>
                  <p className="text-muted">{service.desc}</p>
                </motion.div>
              </Col>
            ))}
          </Row>

          <motion.button 
            className="custom-btn primary-btn mt-3" 
            onClick={() => navigate('/projects')} 
            whileHover={{ scale: 1.05 }}
          >
            Explore More
          </motion.button>
        </Container>
      </section>
      <FloatingIcons/>

      {/* Mission Section */}
      <Container className="mission-section my-5">
        <Row>
          <Col md={6}>
            <h2 className="mission-title">
              Our <span className="highlight">Mission</span>
            </h2>
            <p className="mission-text">
              At <b>LNE (Last Night Engineering)</b>, we empower businesses with innovative digital solutions. Our mission is to transform ideas into reality through technology, ensuring seamless growth and success.
            </p>
            <p className="mission-text">
              With a focus on quality, creativity, and customer satisfaction, we aim to be a trusted partner for businesses striving in the digital era.
            </p>
            <img src={missionImg} alt="Mission statement illustration" className="img-fluid mx-auto d-block" style={{ maxWidth: "55%" }} />
          </Col>

          <Col md={6}>
            {missionPoints.map((info, index) => (
              <motion.div key={index} whileHover={{ scale: 1.05 }}>
                <Card className="info-card mb-3">
                  <Card.Body>
                    <div className="icon">{info.icon}</div>
                    <Card.Title>{info.title}</Card.Title>
                    <Card.Text>{info.text}</Card.Text>
                  </Card.Body>
                </Card>
              </motion.div>
            ))}
          </Col>
        </Row>
      </Container>

      {/* Contact Us Button */}
      <div className="text-center mt-4 mb-5">
        <Link to="/contactus" className="custom-btn primary-btn">
          Contact Us
        </Link>
      </div>

      

      <Footer />
    </>
  );
};

export default Home;
