import React from "react";
import { FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-heading text-white py-8 rounded-t-2xl">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h1 className="text-2xl font-bold mb-4 text-secondary">
              SheManages
            </h1>
            <p className="mb-2">Empowering women to lead.</p>
            <p>
              Contact us:{" "}
              <a
                href="mailto:shemanages.info@gmail.com"
                className="hover:text-btnHover"
              >
                shemanages.info@gmail.com
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-4 text-blue-300">
              Quick Links
            </h2>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-btnHover">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-btnHover">
                  Services
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-btnHover">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-btnHover">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-4 text-blue-300">
              Follow Us
            </h2>
            <div className="flex space-x-4 items-center md:justify-start justify-center">
              <a
                href="https://github.com/Ninjaabhay/projectSheManages"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="w-8 h-8 hover:text-btnHover" />
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="w-8 h-8 hover:text-btnHover" />
              </a>
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="w-8 h-8 hover:text-btnHover" />
              </a>
              <a href="mailto:shemanages.info@gmail.com">
                <AiOutlineMail className="w-8 h-8 hover:text-btnHover" />
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-4 text-blue-300">
              Resources
            </h2>
            <ul className="space-y-2">
              <li>
                <a href="/blog" className="hover:text-btnHover">
                  Blog
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-btnHover">
                  FAQs
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-btnHover">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-btnHover">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
