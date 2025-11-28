import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ShoppingCartItem } from '@/components/ShoppingCartItem';
import { useCart } from '@/components/CartContext';

const ShoppingCart = () => {
  const { cartItems, clearCart } = useCart();
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
        <p>Your cart is currently empty.</p>
        <Link to="/products" className="text-blue-500 hover:underline">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
      <div className="flex flex-col gap-4">
        {cartItems.map((item) => (
          <ShoppingCartItem key={item.id} item={item} />
        ))}
      </div>
      <div className="mt-4">
        <p className="text-lg font-semibold">Total: ${totalPrice.toFixed(2)}</p>
        <div className="flex justify-between mt-4">
          <button
            onClick={clearCart}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Clear Cart
          </button>
          <Link
            to="/checkout"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
