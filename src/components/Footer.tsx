import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-8 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* First Column: Logo and Description */}
          <div className="">
            <Link to="/" className="text-2xl font-bold text-gray-800 dark:text-gray-200">Shoe Store</Link>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Your one-stop shop for the latest and greatest shoes. We offer a wide selection of styles and brands at competitive prices.
            </p>
          </div>

          {/* Second Column: Quick Links */}
          <div>
            <h6 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Quick Links</h6>
            <ul className="text-gray-600 dark:text-gray-400">
              <li className="mb-1">
                <Link to="/products" className="hover:text-blue-500">Products</Link>
              </li>
              <li className="mb-1">
                <Link to="/about" className="hover:text-blue-500">About Us</Link>
              </li>
              <li className="mb-1">
                <Link to="/contact" className="hover:text-blue-500">Contact Us</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-blue-500">Shopping Cart</Link>
              </li>
            </ul>
          </div>

          {/* Third Column: Customer Service */}
          <div>
            <h6 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Customer Service</h6>
            <ul className="text-gray-600 dark:text-gray-400">
              <li className="mb-1">
                <Link to="/faq" className="hover:text-blue-500">FAQ</Link>
              </li>
              <li className="mb-1">
                <Link to="/shipping" className="hover:text-blue-500">Shipping &amp; Returns</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-blue-500">Terms &amp; Conditions</Link>
              </li>
            </ul>
          </div>

          {/* Fourth Column: Social Media */}
          <div>
            <h6 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Follow Us</h6>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-blue-500 dark:text-gray-400">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-500 dark:text-gray-400">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-500 dark:text-gray-400">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-500 dark:text-gray-400">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 py-4 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Shoe Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
