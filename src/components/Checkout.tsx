import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

// Define the schema for the checkout form
const checkoutSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  address: z.string().min(5, { message: 'Address must be at least 5 characters.' }),
  city: z.string().min(2, { message: 'City must be at least 2 characters.' }),
  postalCode: z.string().regex(/^[0-9]{5}(?:-[0-9]{4})?$/, { message: 'Invalid postal code.' }),
});

type CheckoutSchemaType = z.infer<typeof checkoutSchema>;

const Checkout: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutSchemaType>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = (data: CheckoutSchemaType) => {
    console.log('Checkout form data:', data);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="name">Name:</Label>
          <Input type="text" id="name" {...register('name')} />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="email">Email:</Label>
          <Input type="email" id="email" {...register('email')} />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div>
          <Label htmlFor="address">Address:</Label>
          <Input type="text" id="address" {...register('address')} />
          {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
        </div>
        <div>
          <Label htmlFor="city">City:</Label>
          <Input type="text" id="city" {...register('city')} />
          {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
        </div>
        <div>
          <Label htmlFor="postalCode">Postal Code:</Label>
          <Input type="text" id="postalCode" {...register('postalCode')} />
          {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode.message}</p>}
        </div>
        <Button type="submit">Submit Checkout</Button>
      </form>
    </div>
  );
};

export default Checkout;
