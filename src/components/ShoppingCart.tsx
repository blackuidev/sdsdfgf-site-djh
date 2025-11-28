import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ShoppingCart as ShoppingCartIcon, Trash2 } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

const ShoppingCart: React.FC = () => {
  const { data: cartItems, isLoading, error } = useQuery<CartItem[]>(
    ['cartItems'],
    async () => {
      // Replace with your actual data fetching logic from localStorage or an API
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : [];
    }
  );

  const calculateTotal = () => {
    if (!cartItems) return 0;
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleRemoveItem = (itemId: string) => {
    const updatedCart = cartItems ? cartItems.filter(item => item.id !== itemId) : [];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    // Invalidate the query to refetch the cart items

  };

  if (isLoading) return <p>Loading cart...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <ShoppingCartIcon className="w-16 h-16 text-gray-400 mb-4" />
        <p className="text-gray-500">Your cart is empty.</p>
        <Link to="/products" className="mt-4 text-blue-600 hover:underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10">
      <div className="flex shadow-md my-10">
        <div className="w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">{cartItems.length} Items</h2>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Quantity</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Price</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Total</h3>
          </div>

          {cartItems.map(item => (
            <div key={item.id} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
              <div className="flex w-2/5">
                <div className="w-20">
                  <img src={item.imageUrl} alt={item.name} />
                </div>
                <div className="flex flex-col justify-between ml-4 flex-grow">
                  <span className="font-bold text-sm">{item.name}</span>
                  <span className="text-red-500 text-xs">Apple</span>
                  <button onClick={() => handleRemoveItem(item.id)} className="font-semibold hover:text-red-500 text-gray-500 text-xs">
                    Remove
                  </button>
                </div>
              </div>
              <div className="flex justify-center w-1/5">
                <svg className="fill-current text-gray-600 w-3">
                  <path d="M11.363 2.864l-9 9a1.001 1.001 0 001.415 1.414l9-9a1.001 1.001 0 00-1.415-1.414z"></path>
                </svg>

                <input className="mx-2 border text-center w-8" type="text" value={item.quantity} />

                <svg className="fill-current text-gray-600 w-3">
                  <path d="M2.864 2.864l9 9a1.001 1.001 0 00-1.415 1.414l-9-9a1.001 1.001 0 001.415-1.414z"></path>
                </svg>
              </div>
              <span className="text-center w-1/5 font-semibold text-sm">${item.price.toFixed(2)}</span>
              <span className="text-center w-1/5 font-semibold text-sm">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}

          <Link to="/products" className="flex font-semibold text-indigo-600 text-sm mt-10">
            <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
              <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
            </svg>
            Continue Shopping
          </Link>
        </div>

        <div id="summary" className="w-1/4 px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">Items {cartItems.length}</span>
            <span className="font-semibold text-sm">${calculateTotal().toFixed(2)}</span>
          </div>
          <div>
            <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
            <select className="block p-2 text-gray-600 w-full text-sm">
              <option>Standard shipping - $5.00</option>
            </select>
          </div>
          <div className="py-10">
            <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
            <input type="text" id="promo" placeholder="Enter your code" className="p-2 text-sm w-full" />
          </div>
          <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
            Apply
          </button>
          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
              <span>${(calculateTotal() + 5).toFixed(2)}</span>
            </div>
            <Link to="/checkout">
              <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
                Checkout
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ShoppingCart;
