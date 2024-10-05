"use client"

import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  { name: 'Emily', company: 'Health First', text: "The insights we've gained from Metric have helped us make informed decisions and grow our practice significantly." },

  { name: 'David', company: 'Global Logistics', text: "Metric's intuitive interface has streamlined our financial processes, saving us countless hours each month." },

  { name: 'Sophie', company: 'Eco Startups', text: "As a startup founder, Metric has been invaluable in helping me understand and manage our burn rate effectively." },

  { name: 'Rasha', company: 'The Daily Me', text: "It was amazing when I started using Metric. Despite having no financial background, I was able to understand my business financials easily." },

  { name: 'Ammar', company: 'The Daily Me', text: "It was amazing when I started using Metric. Despite having no financial background, I was able to understand my business financials easily." },

  { name: 'Ahmad', company: 'The Daily Me', text: "It was amazing when I started using Metric. Despite having no financial background, I was able to understand my business financials easily." },
  // Add more testimonials as needed
];

const TestimonialSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const getSlideIndex = (index) => {
    const totalSlides = testimonials.length;
    return (index + totalSlides) % totalSlides;
  };

  const getTestimonialStyle = (index) => {
    const baseStyle = "transition-all duration-500 ease-in-out absolute top-1/2 transform -translate-y-1/2 flex-shrink-0 w-[290px] p-6 rounded-lg shadow-md";
    const positions = {
      '-2': '-left-[4%] -rotate-2 translate-y-[2.25rem]',
      '-1': 'left-[18%] -rotate-1 -translate-y-[4.75rem]',
      '0': 'left-1/2 -translate-x-1/2',
      '1': 'right-[18%] rotate-1 -translate-y-[4.75rem]',
      '2': '-right-[4%] rotate-2 translate-y-[2.25rem]',
    };

    if (index === 0) {
      return `${baseStyle} ${positions['0']} bg-purple-600 text-white h-80 z-30`;
    } else if (index === -1 || index === 1) {
      return `${baseStyle} ${positions[index.toString()]} bg-white h-64 opacity-70 z-20`;
    } else if (index === -2 || index === 2) {
      return `${baseStyle} ${positions[index.toString()]} bg-white h-48 opacity-40 z-10`;
    }
  };

  const nextTestimonial = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }
  };

  const prevTestimonial = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    }
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  return (
    <div className="relative w-full h-[322px] my-28">
      {[-2, -1, 0, 1, 2].map((offset) => {
        const testimonialIndex = getSlideIndex(activeIndex + offset);
        const testimonial = testimonials[testimonialIndex];
        return (
          <div
            key={testimonialIndex}
            className={getTestimonialStyle(offset)}
          >
            <p className="text-sm mb-4">{testimonial.text}</p>
            <p className="font-bold">{testimonial.name}</p>
            <p className="text-sm opacity-75">{testimonial.company}</p>
          </div>
        );
      })}
      <button
        onClick={prevTestimonial}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-40"
        disabled={isAnimating}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextTestimonial}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-40"
        disabled={isAnimating}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default TestimonialSlider;