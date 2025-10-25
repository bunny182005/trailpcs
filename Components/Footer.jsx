// Footer.js
import React from 'react';
// Importing the new icons from your image
import {
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaYoutube,
  FaMediumM,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; // 'X' icon

const Footer = () => {
  return (
    // Set background to the orange color from your image and text to black
    <footer className="bg-white text-black p-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        
        {/* Left Side: Contact Info */}
        {/* Added gap for spacing on mobile, and space-x for desktop */}
        <div className="flex items-center gap-4 md:space-x-6 text-sm font-medium mb-4 md:mb-0">
          <a href="mailto:ieeepcs@vit.ac.in" className="hover:opacity-75">
            ieeepcs@vit.ac.in
          </a>
          <a href="tel:+919989012437" className="hover:opacity-75">
            +91 9989012437
          </a>
        </div>

        {/* Right Side: Social Icons */}
        <div className="flex items-center space-x-5">
          <a href="#" aria-label="Instagram" className="hover:opacity-75">
            <FaInstagram className="w-6 h-6" />
          </a>
          <a href="#" aria-label="LinkedIn" className="hover:opacity-75">
            <FaLinkedinIn className="w-6 h-6" />
          </a>
          <a href="#" aria-label="X" className="hover:opacity-75">
            <FaXTwitter className="w-6 h-6" />
          </a>
          <a href="#" aria-label="YouTube" className="hover:opacity-75">
            <FaYoutube className="w-6 h-6" />
          </a>
          <a href="#" aria-label="GitHub" className="hover:opacity-75">
            <FaGithub className="w-6 h-6" />
          </a>
          <a href="#" aria-label="Medium" className="hover:opacity-75">
            <FaMediumM className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;