import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();

  const { isLoading, error, data: product } = useQuery<Product, Error>(
    ['product', productId],
    async () => {
      if (!productId) {
        throw new Error('Product ID is missing.');
      }
      const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    }
  );

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) {
    toast.error(`Error fetching product details: ${error.message}`);
    return <div className="text-center">Error: {error.message}</div>;
  }

  if (!product) return <div className="text-center">Product not found.</div>;

  return (
    <div className="container mx-auto p-4">
      <Link to="/products">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <img src={product.image} alt={product.title} className="rounded-lg shadow-md" />
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-600 mb-2">Category: {product.category}</p>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <div className="flex items-center mb-4">
            <span className="font-bold text-lg">Price: ${product.price.toFixed(2)}</span>
            <span className="ml-4 text-sm text-gray-500">Rating: {product.rating.rate} ({product.rating.count} reviews)</span>
          </div>
          <Button className="w-full">Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
