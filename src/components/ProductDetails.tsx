import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Star, ShoppingCart, ShieldCheck, Truck } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

    const { isLoading, error, data: product } = useQuery<Product>({
        queryKey: ['product', productId],
        queryFn: async () => {
            if (!productId) throw new Error('Product ID is missing.');
            const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        },
    });

    const handleAddToCart = () => {
        toast.success(`${product?.title} added to cart!`, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000,
        });
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <img src={product.image} alt={product.title} className="w-full rounded-lg shadow-md" />
                </div>
                <div>
                    <h1 className="text-3xl font-semibold mb-2">{product.title}</h1>
                    <div className="flex items-center mb-4">
                        <Star className="text-yellow-500 mr-1" size={20} />
                        <span>{product.rating.rate} ({product.rating.count} ratings)</span>
                    </div>
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    <p className="text-xl font-bold text-gray-900 mb-4">${product.price}</p>

                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
                        onClick={handleAddToCart}
                    >
                        <ShoppingCart size={20} />
                        Add to Cart
                    </button>

                    <div className="mt-6">
                        <div className="flex items-center gap-2 text-green-600">
                            <ShieldCheck size={20} />
                            <span>Secure payment</span>
                        </div>
                        <div className="flex items-center gap-2 text-blue-600 mt-2">
                            <Truck size={20} />
                            <span>Free shipping on orders over $50</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
