import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';

interface FilterProps {
    brands: string[];
    sizes: string[];
}

const Filters: React.FC<FilterProps> = ({ brands, sizes }) => {
    return (
        <div className="w-full">
            <Accordion type="multiple" collapsible>
                <AccordionItem value="brands">
                    <AccordionTrigger>
                        Brand
                    </AccordionTrigger>
                    <AccordionContent>
                        {brands.map((brand) => (
                            <div key={brand} className="py-1">
                                <label htmlFor={`brand-${brand}`} className="flex items-center">
                                    <Checkbox id={`brand-${brand}`} className="mr-2" />
                                    {brand}
                                </label>
                            </div>
                        ))}
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="sizes">
                    <AccordionTrigger>
                        Size
                    </AccordionTrigger>
                    <AccordionContent>
                        {sizes.map((size) => (
                            <div key={size} className="py-1">
                                <label htmlFor={`size-${size}`} className="flex items-center">
                                    <Checkbox id={`size-${size}`} className="mr-2" />
                                    {size}
                                </label>
                            </div>
                        ))}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default Filters;
