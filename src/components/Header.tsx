import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-gray-800">SDSDFGF</Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-gray-600 hover:text-gray-800">Home</Link>
            </li>
            <li>
              <Link to="/products" className="text-gray-600 hover:text-gray-800">Products</Link>
            </li>
            <li>
              <Link to="/product-details/some-product-id" className="text-gray-600 hover:text-gray-800">Product Details (Demo)</Link>
            </li>
            <li>
              <Link to="/cart" className="flex items-center text-gray-600 hover:text-gray-800">
                <ShoppingCart className="mr-1" size={20} />
                Cart
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
