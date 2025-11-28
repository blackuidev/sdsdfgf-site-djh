import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, SortAsc, SortDesc, Grid } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/components/lib/utils';

interface Shoe {
  id: number;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
  category: string;
}

const dummyShoes: Shoe[] = [
  { id: 1, name: 'Air Max 90', brand: 'Nike', price: 120, imageUrl: 'https://images.unsplash.com/photo-1542296638-78919995307d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60', category: 'Running' },
  { id: 2, name: 'Ultraboost', brand: 'Adidas', price: 150, imageUrl: 'https://images.unsplash.com/photo-1600851231798-6c6354a9c94e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNob2VzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60', category: 'Running' },
  { id: 3, name: 'Chuck Taylor All Star', brand: 'Converse', price: 60, imageUrl: 'https://images.unsplash.com/photo-1560769629-975efa693801?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNob2VzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60', category: 'Casual' },
  { id: 4, name: 'Gel-Lyte III', brand: 'ASICS', price: 110, imageUrl: 'https://images.unsplash.com/photo-1616396377748-168d150045da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNob2VzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60', category: 'Running' },
  { id: 5, name: 'Classic Leather', brand: 'Reebok', price: 80, imageUrl: 'https://images.unsplash.com/photo-1632868553999-b16edb1c4756?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNob2VzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60', category: 'Casual' },
  { id: 6, name: '1460', brand: 'Dr. Martens', price: 160, imageUrl: 'https://images.unsplash.com/photo-1612577878120-08c513a91d48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNob2VzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60', category: 'Boots' },
];

const ProductListingPage = () => {
  const [shoes, setShoes] = useState(dummyShoes);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filters, setFilters] = useState<string[]>([]);

  useEffect(() => {
    let filteredShoes = dummyShoes;

    if (searchTerm) {
      filteredShoes = filteredShoes.filter(shoe =>
        shoe.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.length > 0) {
      filteredShoes = filteredShoes.filter(shoe => filters.includes(shoe.category));
    }

    if (sortOrder === 'asc') {
      filteredShoes = [...filteredShoes].sort((a, b) => a.price - b.price);
    } else {
      filteredShoes = [...filteredShoes].sort((a, b) => b.price - a.price);
    }

    setShoes(filteredShoes);
  }, [searchTerm, sortOrder, filters]);

  const toggleFilter = (category: string) => {
    if (filters.includes(category)) {
      setFilters(filters.filter(f => f !== category));
    } else {
      setFilters([...filters, category]);
    }
  };

  return (
    <motion.div
      className="container mx-auto py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <Input
          type="text"
          placeholder="Search for shoes..."
          className="w-full md:w-auto mb-4 md:mb-0"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
            {sortOrder === 'asc' ? <SortAsc /> : <SortDesc />}
          </Button>

          <Button variant="outline" size="icon">
            <Filter />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {shoes.map(shoe => (
          <motion.div
            key={shoe.id}
            className="shadow-md rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{shoe.name}</CardTitle>
                <CardDescription>{shoe.brand}</CardDescription>
              </CardHeader>
              <CardContent>
                <img src={shoe.imageUrl} alt={shoe.name} className="w-full h-48 object-cover mb-4" />
                <p>Category: {shoe.category}</p>
              </CardContent>
              <CardFooter className="justify-between">
                <p className="text-2xl font-semibold">${shoe.price}</p>
                <Button>View Details</Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Category Filters (Example) */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Category Filters</h2>
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <Checkbox checked={filters.includes('Running')} onCheckedChange={() => toggleFilter('Running')} />
            <span>Running</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox checked={filters.includes('Casual')} onCheckedChange={() => toggleFilter('Casual')} />
            <span>Casual</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox checked={filters.includes('Boots')} onCheckedChange={() => toggleFilter('Boots')} />
            <span>Boots</span>
          </label>
        </div>
      </div>

    </motion.div>
  );
};

export default ProductListingPage;
