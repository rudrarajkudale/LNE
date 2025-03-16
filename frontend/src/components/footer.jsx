import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaEnvelope, FaPhone } from "react-icons/fa";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section">
          <h2>About Us</h2>
          <p>
          Welcome to LNE, where learning meets innovation! We provide programming courses, industry-ready projects, and well-structured notes to help you excel in the tech world. Whether you're a beginner or an experienced coder, LNE is your go-to platform for mastering skills and building a strong foundation. Join us and take your coding journey to the next level! 🚀
          </p>
        </div>

        {/* Contact Section with Icons */}
        <div className="footer-section">
          <h2>Contact</h2>
          <p><FaEnvelope className="icon" /> work4rudrakudale@gmail.com</p>
          <p><FaPhone className="icon" /> +123 456 7890</p>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/faqs">FAQs</a></li>
            <li><a href="/support">Support</a></li>
            <li><a href="/pp">Privacy Policy</a></li>
          </ul>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="footer-icons">
        <a href="#"><FaFacebook /></a>
        <a href="#"><FaTwitter /></a>
        <a href="#"><FaInstagram /></a>
        <a href="#"><FaLinkedin /></a>
        <a href="#"><FaYoutube /></a>
      </div>

      {/* Footer Bottom Text */}
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} LNE | All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
