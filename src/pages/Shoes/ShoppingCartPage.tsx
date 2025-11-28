import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, XCircle, PlusCircle, MinusCircle, ArrowRightCircle } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/components/lib/utils';

const ShoppingCartPage = () => {
  // Mock shopping cart data (replace with real data fetching)
  const [cartItems, setCartItems] = useState([
    {
      id: 'shoe1', name: 'Running Shoe', price: 89.99, quantity: 2, image: 'https://source.unsplash.com/300x200/?running-shoe'
    },
    {
      id: 'shoe2', name: 'Casual Sneaker', price: 59.99, quantity: 1, image: 'https://source.unsplash.com/300x200/?sneaker'
    }
  ]);

  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Calculate subtotal
    const newSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setSubtotal(newSubtotal);

    // Apply discount if applicable
    let discountedTotal = newSubtotal;
    if (discountApplied) {
      discountedTotal -= discountAmount;
    }

    // Calculate total (including shipping/taxes if applicable)
    setTotal(discountedTotal);
  }, [cartItems, discountAmount, discountApplied]);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 0) return;
    setCartItems(cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const handleApplyDiscount = () => {
    // Mock discount code validation (replace with real validation)
    if (discountCode === 'SAVE10') {
      setDiscountApplied(true);
      setDiscountAmount(Math.min(subtotal * 0.1, 20)); // 10% off, up to $20
    } else {
      alert('Invalid discount code');
      setDiscountApplied(false);
      setDiscountAmount(0);
    }
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-semibold mb-6 flex items-center gap-2 text-gray-800 dark:text-gray-100">
        <ShoppingCart className="h-6 w-6" /> Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500">Your cart is empty.</p>
          <Link to="/shoes" className="text-blue-600 hover:underline">Continue shopping</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <ul className="space-y-4">
                  {cartItems.map(item => (
                    <li key={item.id} className="flex items-center border-b   pb-4">
                      <img src={item.image} alt={item.name} className="w-24 h-20 object-cover rounded-md mr-4" />
                      <div className="flex-grow">
                        <h2 className="text-lg font-medium text-gray-700 dark:text-gray-200">{item.name}</h2>
                        <p className="text-gray-500 dark:text-gray-400">{formatCurrency(item.price)}</p>
                        <div className="flex items-center mt-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 focus:outline-none"
                          >
                            <MinusCircle className="h-5 w-5" />
                          </button>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                            className="w-20 text-center mx-2"
                          />
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 focus:outline-none"
                          >
                            <PlusCircle className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700 focus:outline-none"
                      >
                        <XCircle className="h-6 w-6" />
                      </button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-medium mb-4 text-gray-700 dark:text-gray-200">Order Summary</h2>
                <div className="flex justify-between mb-2 text-gray-600 dark:text-gray-300">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                {discountApplied && (
                  <div className="flex justify-between mb-2 text-green-600">
                    <span>Discount:</span>
                    <span>-{formatCurrency(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between mb-4 text-gray-600 dark:text-gray-300">
                  <span>Total:</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-100">{formatCurrency(total)}</span>
                </div>

                <div className="mb-4">
                  <Input
                    type="text"
                    placeholder="Discount code"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="mb-2"
                  />
                  <Button onClick={handleApplyDiscount} className="w-full">
                    Apply Discount
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link to="/checkout" className="flex items-center gap-2 w-full justify-center">
                    Proceed to Checkout <ArrowRightCircle className="h-5 w-5" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCartPage;
