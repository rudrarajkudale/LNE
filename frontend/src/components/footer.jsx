import { FaInstagram, FaLinkedin, FaYoutube, FaEnvelope, FaPhoneAlt, FaFacebook } from "react-icons/fa";
import "../styles/Footer.css";
import Logo from "../assets/Logo.png"; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section social">
          <img src={Logo} alt="Logo" width="100" />
          <p>Let's connect with our socials</p>
          <div className="footer-icons">
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedin /></a>
            <a href="#"><FaYoutube /></a>
            <a href="#"><FaFacebook /></a>
          </div>
        </div>

        <div className="footer-section">
          <h2>COMPANY</h2>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Support</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms and Conditions</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h2>Get In Touch</h2>
          <p><FaPhoneAlt /> +91 9307103123</p>
          <p><FaEnvelope /> work4rudrakudale@gmail.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
