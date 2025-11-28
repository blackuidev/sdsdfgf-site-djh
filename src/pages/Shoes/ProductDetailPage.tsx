import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent } from '@/components/ui/card';

// Placeholder data - replace with real data fetching
const products = [
    {
        id: '1', name: 'Awesome Shoe', price: 99.99, description: 'This is an awesome shoe for running.',
        images: [
            'https://source.unsplash.com/random/400x300?shoe=1', 'https://source.unsplash.com/random/400x300?shoe=2',
            'https://source.unsplash.com/random/400x300?shoe=3'
        ],
        reviews: [
            { id: 'r1', author: 'John Doe', rating: 5, comment: 'Great shoes!' },
            { id: 'r2', author: 'Jane Smith', rating: 4, comment: 'Very comfortable.' }
        ]
    },
    {
        id: '2', name: 'Another Shoe', price: 129.99, description: 'Another great shoe for walking.',
        images: [
            'https://source.unsplash.com/random/400x300?shoe=4', 'https://source.unsplash.com/random/400x300?shoe=5',
            'https://source.unsplash.com/random/400x300?shoe=6'
        ],
        reviews: [
            { id: 'r3', author: 'Peter Jones', rating: 3, comment: 'Good but could be better.' },
            { id: 'r4', author: 'Alice Brown', rating: 5, comment: 'Excellent quality.' }
        ]
    }
];

const ProductDetailPage = () => {
    const { productId } = useParams<{ productId: string }>();
    const product = products.find(p => p.id === productId);

    if (!product) {
        return <div className="text-center">Product not found.</div>;
    }

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handlePrevImage = () => {
        setCurrentImageIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : product.images.length - 1));
    };

    const handleNextImage = () => {
        setCurrentImageIndex(prevIndex => (prevIndex < product.images.length - 1 ? prevIndex + 1 : 0));
    };

    return (
        <motion.div
            className="container mx-auto p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Image Gallery */}
                <div className="relative">
                    <AspectRatio ratio={4 / 3}>
                        <motion.img
                            src={product.images[currentImageIndex]}
                            alt={product.name}
                            className="rounded-lg object-cover w-full h-full"
                            initial={{ x: '100%' }}
                            animate={{ x: '0%' }}
                            exit={{ x: '-100%' }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            key={currentImageIndex} // Force re-render on image change
                        />
                    </AspectRatio>
                    <div className="absolute top-1/2 left-2 -translate-y-1/2">
                        <Button variant="ghost" size="icon" onClick={handlePrevImage}>
                            <ArrowLeft />
                        </Button>
                    </div>
                    <div className="absolute top-1/2 right-2 -translate-y-1/2">
                        <Button variant="ghost" size="icon" onClick={handleNextImage}>
                            <ArrowRight />
                        </Button>
                    </div>

                    <div className="flex mt-2 space-x-2">
                        {product.images.map((img, index) => (
                            <motion.button
                                key={index}
                                className={`w-12 h-10 rounded-md overflow-hidden cursor-pointer ${index === currentImageIndex ? 'ring-2 ring-primary' : ''}`}
                                onClick={() => setCurrentImageIndex(index)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <img src={img} alt={`${product.name} - ${index + 1}`} className="object-cover w-full h-full" />
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Product Details */}
                <div>
                    <motion.h1 className="text-2xl font-bold mb-2" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        {product.name}
                    </motion.h1>
                    <motion.p className="text-gray-700 mb-4" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                        {product.description}
                    </motion.p>
                    <motion.div className="flex items-center mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
                        <span className="text-xl font-semibold">${product.price.toFixed(2)}</span>
                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
                        <Button className="w-full" size="lg">
                            <ShoppingCart className="mr-2" />
                            Add to Cart
                        </Button>
                    </motion.div>

                    {/* Reviews */}
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold mb-2">Reviews</h2>
                        {product.reviews.length > 0 ? (
                            product.reviews.map(review => (
                                <Card key={review.id} className="mb-4">
                                    <CardContent className="flex flex-col">
                                        <div className="flex items-center mb-1">
                                            {Array.from({ length: review.rating }, (_, i) => (
                                                <Star key={i} className="text-yellow-500 h-4 w-4 mr-1" />
                                            ))}
                                        </div>
                                        <p className="text-sm text-gray-600">{review.comment}</p>
                                        <p className="text-xs text-gray-500 mt-1">By {review.author}</p>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">No reviews yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductDetailPage;
