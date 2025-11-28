import React from 'react';

const OrderConfirmation = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Order Confirmation</h1>
            <p>Thank you for your order! Your order has been successfully placed and is being processed.</p>
            {/* Add more details here, like order number, estimated delivery, etc. */}
        </div>
    );
};

export default OrderConfirmation;
