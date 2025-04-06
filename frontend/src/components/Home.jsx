import React, { useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Home.css";
import Footer from "./footer";
import { 
  FaSearch, FaBullhorn, FaUsers, FaEllipsisH,  FaBuilding, FaEnvelope,
  FaClock, FaUser, FaLightbulb, FaTrophy 
} from "react-icons/fa";
import heroImg from "../assets/homeImg.gif";
import missionImg from "../assets/mission.png";
import { Container, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";

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
  const handleGetStartedClick = useCallback(() => {
    servicesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="home-container">
      <section className="hero-section container d-flex flex-column flex-md-row align-items-center justify-content-between py-5">
        <motion.div 
          className="col-md-6 pe-md-5"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="display-4 fw-bold text-dark mb-4 ">
            We Are <span className="text-gradient">Creative</span> Design Agency
          </h1>
          <p className="hero-text text-muted mb-4">
            At <b>LNE (Last Night Engineering)</b>, we bring late-night hustle to life! From building powerful websites to top-quality web development training, we make learning and innovation accessible to everyone. Join us to code, create, and succeed!
          </p>
          <div className="mt-4 d-flex gap-3 hero-btns">
            <motion.button 
              className="custom-btn primary-btn" 
              onClick={handleGetStartedClick} 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
            <motion.button 
              className="custom-btn secondary-btn" 
              onClick={() => navigate('/about')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>

        <motion.div 
          className="col-md-6 d-flex justify-content-center mt-4 mt-md-0"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img src={heroImg} alt="Creative brainstorming illustration" className="hero-image img-fluid rounded-3 shadow" />
        </motion.div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="services-section text-center py-5">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="fw-bold section-title mb-3">
              We Provide The Best <span className="text-gradient">Services</span>
            </h2>
            <p className="section-subtitle text-muted mb-5">
              Unleash the full potential of your business with our expert digital strategies.
            </p>
          </motion.div>
          
          <Row className="g-4">
            {services.map((service, index) => (
              <Col key={index} lg={3} md={6}>
                <motion.div 
                  className="service-card p-4 h-100"
                  whileHover={{ y: -10 }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className={`icon-box ${service.color} text-white p-3 rounded-circle mb-4 mx-auto`}>
                    {service.icon}
                  </div>
                  <h5 className="fw-semibold mb-3">{service.title}</h5>
                  <p className="text-muted mb-0">{service.desc}</p>
                </motion.div>
              </Col>
            ))}
          </Row>

          <motion.button 
            className="custom-btn primary-btn mt-5" 
            onClick={() => navigate('/projects')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore More
          </motion.button>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="mission-section py-5">
        <Container>
          <Row className="align-items-center text-center">
            <Col lg={6} className="mb-5 mb-lg-0">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="mission-title mb-4 text-center">
                  Our <span className="highlight">Mission</span>
                </h2>
                <p className="mission-text mb-4">
                  At <b>LNE (Last Night Engineering)</b>, we empower businesses with innovative digital solutions. Our mission is to transform ideas into reality through technology, ensuring seamless growth and success.
                </p>
                <p className="mission-text mb-5">
                  With a focus on quality, creativity, and customer satisfaction, we aim to be a trusted partner for businesses striving in the digital era.
                </p>
                <img 
                  src={missionImg} 
                  alt="Mission statement illustration" 
                  className="img-fluid rounded-3 shadow" 
                  style={{ maxWidth: "80%" }} 
                />
              </motion.div>
            </Col>

            <Col lg={6}>
              {missionPoints.map((info, index) => (
                <motion.div 
                  key={index} 
                  className="mb-4"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="info-card h-100 border-0">
                    <Card.Body className="p-4">
                      <div className="icon mb-3">{info.icon}</div>
                      <Card.Title className="mb-3 fw-bold">{info.title}</Card.Title>
                      <Card.Text className="text-muted">{info.text}</Card.Text>
                    </Card.Body>
                  </Card>
                </motion.div>
              ))}
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section py-5 bg-light">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-5"
          >
            <h2 className="fw-bold section-title mb-3">
              Why Choose <span className="text-gradient">Us</span>
            </h2>
            <p className="section-subtitle text-muted">
              We combine innovation with expertise to deliver exceptional results
            </p>
          </motion.div>
          
          <Row className="g-4">
            {features.map((feature, index) => (
              <Col key={index} md={6} lg={3}>
                <motion.div
                  className="feature-card p-4 h-100 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="feature-icon mb-3 text-warning">
                    {feature.icon}
                  </div>
                  <h5 className="fw-bold mb-3">{feature.title}</h5>
                  <p className="text-muted mb-0">{feature.desc}</p>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5 bg-dark text-white">
        <Container className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="fw-bold mb-4">Ready to Transform Your Digital Presence?</h2>
            <p className="mb-5 mx-auto" style={{ maxWidth: "600px" }}>
              Let's discuss how we can help your business grow with our tailored digital solutions.
            </p>
            <Link to="/contactus" className="custom-btn primary-btn">
              Get In Touch
            </Link>
          </motion.div>
        </Container>
      </section>

      <Footer />
    </div>
  );
};

export default Home;