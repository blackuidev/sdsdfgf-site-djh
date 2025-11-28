import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, ShoppingCart } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto py-4 px-6 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-gray-800">My Store</Link>

        <nav className="hidden md:flex space-x-4">
          <Link to="/" className="text-gray-600 hover:text-gray-800">Home</Link>
          <Link to="/products" className="text-gray-600 hover:text-gray-800">Products</Link>
          <Link to="/cart" className="text-gray-600 hover:text-gray-800 flex items-center">
            <ShoppingCart className="mr-1" size={20} />
            Cart
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-600 hover:text-gray-800">
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;
