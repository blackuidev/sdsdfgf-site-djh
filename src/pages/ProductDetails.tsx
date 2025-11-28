import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProduct } from '@/lib/api';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();

  const { data: product, isLoading, isError, error } = useQuery<Product, Error>([
    'product', productId
  ], () => fetchProduct(productId!));

  if (isLoading) {
    return <div>Loading product details...</div>;
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="md:h-[500px] md:w-full">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>
        <div>
          <h1 className="text-3xl font-semibold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="flex items-center mb-4">
            <span className="text-xl font-bold">${product.price}</span>
          </div>
          <Button variant="secondary" size="lg">
            <ShoppingCart className="mr-2" size={20} />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
