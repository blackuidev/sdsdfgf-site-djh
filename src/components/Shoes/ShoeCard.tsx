import React from 'react';
import { Star } from 'lucide-react';
import { formatCurrency } from '@/components/lib/utils';

interface ShoeCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
}

const ShoeCard: React.FC<ShoeCardProps> = ({ id, name, image, price, rating }) => {
  return (
    <div className="w-full max-w-sm bg-white border   rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href={`/shoes/${id}`}> {/* TODO: Use react-router-dom Link */}
        <img className="p-8 rounded-t-lg" src={image} alt={name} />
      </a>
      <div className="px-5 pb-5">
        <a href={`/shoes/${id}`}> {/* TODO: Use react-router-dom Link */}
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{name}</h5>
        </a>
        <div className="flex items-center mt-2.5 mb-5">
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">{rating}</span>
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className={`w-4 h-4 text-yellow-500 ${index < rating ? '' : 'opacity-50'}`} />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">{formatCurrency(price)}</span>
          <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Add to cart
          </a> {/* TODO: Use react-router-dom Link */}
        </div>
      </div>
    </div>
  );
};

export default ShoeCard;
