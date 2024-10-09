"use client"

import React, { useEffect, useState, useRef } from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { useDrag } from '@use-gesture/react';
import Image from 'next/image';
import testi from '../../../../public/assets/testi.jpg'

const testimonials = [
  { name: 'Emily', company: 'Health First', text: '"The insights weve gained from Metric have helped us make informed decisions and grow our practice significantly."' },
  { name: 'David', company: 'Global Logistics', text: '"Metrics intuitive interface has streamlined our financial processes, saving us countless hours each month."' },
  { name: 'Sophie', company: 'Eco Startups', text: '"As a startup founder, Metric has been invaluable in helping me understand and manage our burn rate effectively."' },
  { name: 'Rasha', company: 'The Daily Me', text: '"It was amazing when I started using Metric. Despite having no financial background, I was able to understand my business financials easily."' },
  { name: 'Ammar', company: 'The Daily Me', text: '"It was amazing when I started using Metric. Despite having no financial background, I was able to understand my business financials easily."' },
  { name: 'Ahmad', company: 'The Daily Me', text: '"It was amazing when I started using Metric. Despite having no financial background, I was able to understand my business financials easily."' },
];

const TestimonialSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef(null);

  const getSlideIndex = (index) => {
    const totalSlides = testimonials.length;
    return (index + totalSlides) % totalSlides;
  };

  const getTestimonialStyle = (index) => {
    const baseStyle = "transition-all duration-500 ease-in-out absolute top-1/2 transform -translate-y-1/2 flex-shrink-0 w-[290px] p-6 shadow-md select-none cursor-grab rounded-[25px]";
    const positions = {
      '-2': '-left-[4%] -rotate-2 -translate-y-[3.75rem]',
      '-1': 'left-[18%] -rotate-1 -translate-y-[7.75rem]',
      '0': 'left-1/2 -translate-x-1/2',
      '1': 'right-[18%] rotate-1 -translate-y-[7.75rem]',
      '2': '-right-[4%] rotate-2 -translate-y-[3.75rem]',
    };

    if (index === 0) {
      return `${baseStyle} ${positions['0']} bg-[#7F3DFF] text-white h-80 z-30`;
    } else if (index === -1 || index === 1) {
      return `${baseStyle} ${positions[index.toString()]} bg-[#F4F3F0] h-80 opacity-70 z-20`;
    } else if (index === -2 || index === 2) {
      return `${baseStyle} ${positions[index.toString()]} bg-[#F4F3F0] h-80 opacity-40 z-10`;
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
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const bind = useDrag(({ movement: [mx], direction: [dx], active, cancel }) => {
    if (active && Math.abs(mx) > 10) {
      if (dx > 0) {
        prevTestimonial();
      } else {
        nextTestimonial();
      }
      cancel();
    }
  }, {
    axis: 'x',
    bounds: { left: -100, right: 100, top: 0, bottom: 0 },
    rubberband: true,
  });

  return (
    <div className="relative w-full h-[600px] overflow-x-hidden bg-white" ref={containerRef} {...bind()}>
      {[-2, -1, 0, 1, 2].map((offset) => {
        const testimonialIndex = getSlideIndex(activeIndex + offset);
        const testimonial = testimonials[testimonialIndex];
        return (
          <div
            key={testimonialIndex}
            className={getTestimonialStyle(offset)}
          >
            <div className="testimonail-content text-center pt-10">
              <p className="text-sm mb-4">{testimonial.text}</p>
              <div className="testimonail-footer flex justify-center items-center gap-3 pt-6">
                <Image src={testi} alt="avatar" className='w-16 h-16 rounded-full select-none' width={100} height={100} />
                <div className="flex flex-col">
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm opacity-75">{testimonial.company}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {/* <button
        onClick={prevTestimonial}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-40"
        disabled={isAnimating}
      >
        <IoChevronBack size={24} />
      </button>
      <button
        onClick={nextTestimonial}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-40"
        disabled={isAnimating}
      >
        <IoChevronForward size={24} />
      </button> */}
    </div>
  );
};

export default TestimonialSlider;