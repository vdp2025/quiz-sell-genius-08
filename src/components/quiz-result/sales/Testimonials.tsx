
import React from 'react';
import { Card } from '@/components/ui/card';
import { testimonials } from '@/data/testimonials';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Testimonials = () => {
  return (
    <Card className="p-6 bg-[#f9ede8] border-[#aa6b5d]/20">
      <h3 className="text-2xl font-playfair text-[#aa6b5d] mb-8 text-center">
        O que as alunas estão dizendo
      </h3>
      
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center text-center space-y-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={testimonial.image} alt={testimonial.name} />
                <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              
              <div className="space-y-2">
                <p className="text-gray-700 italic">&quot;{testimonial.text}&quot;</p>
                <div>
                  <h4 className="font-semibold text-[#aa6b5d]">{testimonial.name}</h4>
                  {testimonial.location && (
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default Testimonials;
