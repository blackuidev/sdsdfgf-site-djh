import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { ShoppingBag } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

// Placeholder function to fetch product details - replace with your actual API call
const fetchProduct = async (productId: string | undefined) => {
    if (!productId) {
        throw new Error('Product ID is required');
    }
    // Simulate an API call
    return new Promise((resolve) => {
        setTimeout(() => {
            const mockProducts = [
                {
                    id: '1',
                    name: 'Classic Sneakers',
                    description: 'Comfortable and stylish sneakers for everyday wear.',
                    price: 79.99,
                    imageUrl: 'https://images.unsplash.com/photo-1542298417-6272caea0be6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80',
                    category: 'Shoes',
                    brand: 'Generic',
                    sizes: ['US 7', 'US 8', 'US 9', 'US 10'],
                    colors: ['White', 'Black', 'Navy'],
                    rating: 4.5,
                    numReviews: 25,
                    discountPercentage: 10,
                },
                {
                    id: '2',
                    name: 'Leather Jacket',
                    description: 'A timeless leather jacket to elevate your style.',
                    price: 199.99,
                    imageUrl: 'https://images.unsplash.com/photo-1551488831-00ddcb63a06b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80',
                    category: 'Apparel',
                    brand: 'Generic',
                    sizes: ['S', 'M', 'L', 'XL'],
                    colors: ['Black', 'Brown'],
                    rating: 4.2,
                    numReviews: 15,
                    discountPercentage: 5,
                },
            ];

            const product = mockProducts.find((p) => p.id === productId);
            if (product) {
                resolve(product);
            } else {
                throw new Error('Product not found');
            }
        }, 500);
    });
};

const ProductDetails: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const { data: product, isLoading, isError, error } = useQuery({
        queryKey: ['product', productId],
        queryFn: () => fetchProduct(productId),
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {(error as Error).message}</p>;

    if (!product) {
        return <p>Product not found.</p>;
    }

    const handleAddToCart = () => {
        toast.success(`${product.name} added to cart!`);
        // Implement your add to cart logic here
    };

    return (
        <div className="container mx-auto py-8">
            <Helmet>
                <title>{product.name} - ShopNow</title>
                <meta name="description" content={product.description} />
            </Helmet>

            <Card className="max-w-3xl mx-auto shadow-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold">{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <img src={product.imageUrl} alt={product.name} className="rounded-md object-cover h-96 w-full" />
                    <div>
                        <div className="flex items-center space-x-2 mb-2">
                            <Badge>{product.category}</Badge>
                            <Badge variant="secondary">{product.brand}</Badge>
                        </div>
                        <Separator className="my-2" />
                        <div className="mb-4">
                            <p className="text-gray-600">Price: ${product.price.toFixed(2)}</p>
                            {product.discountPercentage && (
                                <p className="text-green-500">Discount: {product.discountPercentage}%</p>
                            )}
                        </div>
                        <Separator className="my-2" />
                        <div className="mb-4">
                            <h4 className="text-lg font-medium">Sizes:</h4>
                            <div className="flex space-x-2">
                                {product.sizes.map((size) => (
                                    <Button key={size} variant="outline" size="sm">{size}</Button>
                                ))}
                            </div>
                        </div>
                        <Separator className="my-2" />
                        <div className="mb-4">
                            <h4 className="text-lg font-medium">Colors:</h4>
                            <div className="flex space-x-2">
                                {product.colors.map((color) => (
                                    <Button key={color} variant="outline" size="sm">{color}</Button>
                                ))}
                            </div>
                        </div>
                        <Separator className="my-2" />
                        <div>
                            <h4 className="text-lg font-medium">Rating: {product.rating} ({product.numReviews} reviews)</h4>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                    <Button onClick={handleAddToCart}>
                        Add to Cart <ShoppingBag className="ml-2 h-4 w-4" />
                    </Button>
                    <Link to="/products">
                        <Button variant="secondary">Back to Products</Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
};

export default ProductDetails;
