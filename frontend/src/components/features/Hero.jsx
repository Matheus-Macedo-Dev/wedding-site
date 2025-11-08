import { useState, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { COUPLE_NAMES } from '@/utils/constants.js';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Placeholder images - will be replaced with actual photos
  const slides = [
    `${import.meta.env.BASE_URL}images/hero/slide1.jpg`,
    `${import.meta.env.BASE_URL}images/hero/slide2.jpg`,
    `${import.meta.env.BASE_URL}images/hero/slide3.jpg`,
    `${import.meta.env.BASE_URL}images/hero/slide4.jpg`,
    `${import.meta.env.BASE_URL}images/hero/slide5.jpg`,
    `${import.meta.env.BASE_URL}images/hero/slide6.jpg`,
    `${import.meta.env.BASE_URL}images/hero/slide7.jpg`,
    `${import.meta.env.BASE_URL}images/hero/slide8.jpg`
  ];

  // Auto-advance slideshow every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Slideshow Background - Fixed */}
      <div className="fixed top-0 left-0 right-0 w-full h-screen z-0">
        {slides.map((slide, index) => (
          <div
            key={slide}
            className={`absolute inset-0 w-full h-full transition-opacity duration-[2000ms] ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide}
              alt={`Alana & Matheus - Photo ${index + 1}`}
              className="w-full h-full object-cover object-center"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>

      {/* Vignette Overlay - darker edges, lighter center */}
      <div className="fixed top-0 left-0 right-0 h-screen z-0" style={{
        background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.6) 100%)'
      }} />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 text-white pt-20 z-10">
        <h1 className="font-couple-names text-4xl md:text-6xl lg:text-7xl mb-4 animate-fade-in -mt-48 md:-mt-32">
          <span className="block md:inline">ALANA</span>
          <span className="block md:inline font-sans italic font-extralight text-white mx-2 my-2 md:my-0">&</span>
          <span className="block md:inline">MATHEUS</span>
        </h1>
        
        <div className="w-16 h-px bg-white mb-4" />
        
        <p className="text-xl md:text-2xl font-extralight">
          04 de Junho de 2026
        </p>
      </div>
    </section>
  );
}
