import React from "react";
import { FaWhatsapp, FaPhone } from "react-icons/fa";
import "../styles/FloatingIcons.css"; // Importing CSS file

const FloatingIcons = ({ whatsappNumber, phoneNumber }) => {
  return (
    <div className="floating-icons">
      <a
        href={`https://wa.me/${whatsappNumber}`}
        className="whatsapp-icon"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp size={40} color="#25D366" />
      </a>
      <a href={`tel:${phoneNumber}`} className="phone-icon">
        <FaPhone size={40} color="#007BFF" />
      </a>
    </div>
  );
};

export default FloatingIcons;
