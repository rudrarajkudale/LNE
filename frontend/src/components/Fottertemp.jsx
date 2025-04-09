import { FaInstagram, FaLinkedin, FaYoutube, FaEnvelope, FaPhoneAlt, FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import "../styles/Footer.css";
import Logo from "../assets/Logo.png"; 

const Footer = () => {
  const phoneNumber = import.meta.env.VITE_PhoneNumber || "+91 9307103123";
  const email = import.meta.env.VITE_Email || "work4rudrakudale@gmail.com";
  const navigate = useNavigate();

  const handleContactClick = (e) => {
    e.preventDefault();
    if (localStorage.getItem("isLoggedIn") !== "true") {
      toast.error('You must be logged in to access this feature', {
        className: 'toast-custom-error',
        icon: false
      });
      navigate('/login');
    } else {
      navigate('/contactus');
      toast.success('📩 Let\'s get in touch!', {
        className: 'toast-custom',
        icon: false
      });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section social">
          <Link to="/">
            <img src={Logo} alt="Company Logo" className="footer-logo" />
          </Link>
          <p className="footer-connect-text">Let's connect with our socials</p>
          <div className="footer-icons">
            <a href="https://www.instagram.com/last_night_engineering" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://www.linkedin.com/in/lastnightengineering/" aria-label="LinkedIn"><FaLinkedin /></a>
            <a href="https://www.youtube.com/@LastNightEngineering" aria-label="YouTube"><FaYoutube /></a>
            <a href="https://www.facebook.com/share/1N8YQkmpKM/" aria-label="Facebook"><FaFacebook /></a>
          </div>
        </div>

        <div className="footer-section company-links">
          <h2 className="footer-heading">COMPANY</h2>
          <ul className="footer-links-list">
            <li><Link to="/aboutus">About Us</Link></li>
            <li><Link to="/">Home</Link></li>
            <li>
              <Link 
                to="/contactus" 
                className="footer-contact-link"
                onClick={handleContactClick}
              >
                Get In Touch
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-section contact-info">
          <h2 className="footer-heading">Get In Touch</h2>
          <p className="contact-item">
            <FaPhoneAlt className="contact-icon" /> {phoneNumber}
          </p>
          <p className="contact-item">
            <FaEnvelope className="contact-icon" /> {email}
          </p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Last Night Engineering. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;