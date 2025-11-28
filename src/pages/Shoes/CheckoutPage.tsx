import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'react-toastify';

const shippingSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  address: z.string().min(5, { message: 'Address must be at least 5 characters.' }),
  city: z.string().min(2, { message: 'City must be at least 2 characters.' }),
  postalCode: z.string().regex(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/, { message: 'Invalid postal code.' }),
  country: z.string().min(2, { message: 'Country must be at least 2 characters.' }),
});

const paymentSchema = z.object({
  cardNumber: z.string().regex(/^\d{16}$/, { message: 'Invalid card number.' }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, { message: 'Invalid expiry date.' }),
  cvv: z.string().regex(/^\d{3}$/, { message: 'Invalid CVV.' }),
});

type ShippingValues = z.infer<typeof shippingSchema>;
type PaymentValues = z.infer<typeof paymentSchema>;

const CheckoutPage = () => {
  const shippingForm = useForm<ShippingValues>({ resolver: zodResolver(shippingSchema) });
  const paymentForm = useForm<PaymentValues>({ resolver: zodResolver(paymentSchema) });

  const handleShippingSubmit = (values: ShippingValues) => {
    console.log('Shipping Info:', values);
    toast.success('Shipping information submitted!', { position: 'top-right' });
  };

  const handlePaymentSubmit = (values: PaymentValues) => {
    console.log('Payment Info:', values);

    // Mock payment gateway integration
    setTimeout(() => {
      toast.success('Payment successful!', { position: 'top-right' });
      // Redirect to order confirmation page or clear cart
    }, 2000);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shipping Information */}
        <Card>
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
            <CardDescription>Enter your shipping details.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={shippingForm.handleSubmit(handleShippingSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" {...shippingForm.register('name')} />
                {shippingForm.formState.errors.name && (
                  <p className="text-red-500 text-sm">{shippingForm.formState.errors.name.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" type="text" {...shippingForm.register('address')} />
                {shippingForm.formState.errors.address && (
                  <p className="text-red-500 text-sm">{shippingForm.formState.errors.address.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" type="text" {...shippingForm.register('city')} />
                {shippingForm.formState.errors.city && (
                  <p className="text-red-500 text-sm">{shippingForm.formState.errors.city.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input id="postalCode" type="text" {...shippingForm.register('postalCode')} />
                {shippingForm.formState.errors.postalCode && (
                  <p className="text-red-500 text-sm">{shippingForm.formState.errors.postalCode.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input id="country" type="text" {...shippingForm.register('country')} />
                {shippingForm.formState.errors.country && (
                  <p className="text-red-500 text-sm">{shippingForm.formState.errors.country.message}</p>
                )}
              </div>
              <CardFooter>
                <Button type="submit">Submit Shipping Info</Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>

        {/* Payment Information */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
            <CardDescription>Enter your payment details.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={paymentForm.handleSubmit(handlePaymentSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" type="text" {...paymentForm.register('cardNumber')} />
                {paymentForm.formState.errors.cardNumber && (
                  <p className="text-red-500 text-sm">{paymentForm.formState.errors.cardNumber.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="expiryDate">Expiry Date (MM/YY)</Label>
                <Input id="expiryDate" type="text" placeholder="MM/YY" {...paymentForm.register('expiryDate')} />
                {paymentForm.formState.errors.expiryDate && (
                  <p className="text-red-500 text-sm">{paymentForm.formState.errors.expiryDate.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" type="text" {...paymentForm.register('cvv')} />
                {paymentForm.formState.errors.cvv && (
                  <p className="text-red-500 text-sm">{paymentForm.formState.errors.cvv.message}</p>
                )}
              </div>
              <CardFooter>
                <Button type="submit">Submit Payment</Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CheckoutPage;
