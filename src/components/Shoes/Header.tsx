import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-800">Shoe Store</Link>

        {/* Mobile Menu (Hidden by default) */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Navigation Links (Hidden on small screens, visible on medium and up) */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/products" className="text-gray-600 hover:text-gray-800">Products</Link>
          <Link to="/about" className="text-gray-600 hover:text-gray-800">About</Link>
          <Link to="/contact" className="text-gray-600 hover:text-gray-800">Contact</Link>
        </nav>

        {/* User and Cart Icons */}
        <div className="flex items-center space-x-4">
          <Link to="/profile" className="text-gray-600 hover:text-gray-800">
            <User className="h-5 w-5" />
          </Link>
          <Link to="/cart" className="relative text-gray-600 hover:text-gray-800">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-1">
              3 {/* Replace with actual cart item count */}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
