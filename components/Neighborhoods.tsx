import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { m, AnimatePresence } from 'framer-motion';
import { Reveal } from './Reveal';
import { useLanguage } from '../contexts/LanguageContext';
import { ChevronLeft, ChevronRight, X, Maximize2, Map } from 'lucide-react';
import { SmoothImage } from './SmoothImage';

const images = [
  "/items/SoHo.webp", // SoHo
  "/items/DUMBO.webp", // DUMBO
  "/items/Greenwich_Village.webp", // Greenwich
  "/items/Chinatown.webp", // Chinatown
  "/items/williamsburg.webp", // Williamsburg
  "/items/Harlem.webp", // Harlem
  "/items/Chelsea.webp", // Chelsea
  "/items/Upper_East_Side_NYC.webp", // UES
];

const Neighborhoods: React.FC = () => {
  const { t } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Intersection Observer for mobile "active" state
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setActiveIndex(index);
          }
        });
      },
      {
        root: scrollContainerRef.current,
        threshold: 0.7,
        rootMargin: '0px -10% 0px -10%'
      }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = 350;
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setSelectedNeighborhood(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Block body scroll when modal is open
  useEffect(() => {
    if (selectedNeighborhood !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedNeighborhood]);

  return (
    <section id="neighborhoods" className="py-20 md:py-32 bg-zinc-950 overflow-hidden relative border-t border-white/5 optimize-visibility" style={{ containIntrinsicSize: '1px 800px' }}>
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-16">
            <div>
              <div className="flex items-center gap-2 mb-4">
                 <Map size={16} className="text-nyc-taxi"/>
                 <span className="text-nyc-taxi font-bold tracking-[0.3em] text-xs uppercase">{t.labels.districts}</span>
              </div>
              <h2 className="text-4xl md:text-7xl font-serif font-bold text-white leading-[0.9]">{t.neighborhoods.title}</h2>
            </div>
            
            {/* Scroll Buttons */}
            <div className="flex gap-3 mt-6 md:mt-0">
              <button 
                onClick={() => scroll('left')}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all flex items-center justify-center backdrop-blur-sm"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all flex items-center justify-center backdrop-blur-sm"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-1 px-6 pb-8 md:pb-12 snap-x snap-mandatory scrollbar-hide pl-[max(1.5rem,calc((100vw-80rem)/2))]"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {t.neighborhoods.items.map((area, idx) => (
          <div 
            key={idx} 
            ref={el => itemRefs.current[idx] = el}
            data-index={idx}
            className={`flex-shrink-0 w-[280px] md:w-96 snap-center group cursor-pointer ${activeIndex === idx ? 'is-active' : ''}`}
            onClick={() => setSelectedNeighborhood(idx)}
          >
            <Reveal delay={idx * 50} width="100%" variant="zoom">
              <div 
                className="relative h-[400px] md:h-[500px] overflow-hidden bg-black border-r border-white/10 group-hover:border-transparent group-[.is-active]:border-transparent transition-colors"
              >
                <div className="w-full h-full absolute inset-0">
                  <SmoothImage 
                    src={images[idx % images.length]} 
                    alt={area.name} 
                    priority={idx < 2}
                    className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105 group-[.is-active]:scale-105 opacity-60 group-hover:opacity-80 group-[.is-active]:opacity-80 grayscale group-hover:grayscale-0 group-[.is-active]:grayscale-0 will-change-transform"
                    containerClassName="w-full h-full absolute inset-0"
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                
                <div className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 group-[.is-active]:opacity-100 transition-all duration-300 rounded-full border border-white/20">
                    <Maximize2 size={16} />
                </div>

                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block border-l border-nyc-taxi pl-2 group-hover:text-nyc-taxi group-[.is-active]:text-nyc-taxi transition-colors">
                    {area.tagline}
                  </span>
                  <h3 className="text-4xl font-serif text-white font-bold mb-4">{area.name}</h3>
                  <div className="h-px w-full bg-white/20 scale-x-0 group-hover:scale-x-100 group-[.is-active]:scale-x-100 transition-transform origin-left duration-500"></div>
                </div>
              </div>
            </Reveal>
          </div>
        ))}
        <div className="w-6 flex-shrink-0"></div>
      </div>

      {/* Detail Modal - Fixed Portal & Animation Logic */}
      {createPortal(
        <AnimatePresence>
          {selectedNeighborhood !== null && (
            <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 md:p-8 pointer-events-auto">
              {/* Backdrop */}
              <m.div 
                key="neighborhood-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/90 backdrop-blur-xl cursor-pointer"
                onClick={() => setSelectedNeighborhood(null)}
              />
              
              {/* Modal Content */}
              <m.div 
                key="neighborhood-modal-content"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative bg-zinc-900 border border-white/10 max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] rounded-3xl flex flex-col md:flex-row z-[1000000] pointer-events-auto"
              >
                <button 
                    onClick={() => setSelectedNeighborhood(null)}
                    className="absolute top-6 right-6 z-50 p-3 bg-black/50 text-white hover:bg-white hover:text-black transition-all backdrop-blur-md rounded-full border border-white/10"
                >
                    <X size={24} />
                </button>

                {/* Image Side */}
                <div className="w-full md:w-1/2 h-72 md:h-auto relative overflow-hidden">
                    <SmoothImage 
                        src={images[selectedNeighborhood % images.length]} 
                        alt={t.neighborhoods.items[selectedNeighborhood].name} 
                        className="w-full h-full object-cover"
                        containerClassName="w-full h-full absolute inset-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                </div>

                {/* Content Side */}
                <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-zinc-900 overflow-y-auto">
                    <m.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className="text-nyc-taxi text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                          {t.neighborhoods.items[selectedNeighborhood].tagline}
                      </span>
                      <h3 className="text-4xl md:text-6xl font-serif text-white font-bold mb-8 leading-none">
                          {t.neighborhoods.items[selectedNeighborhood].name}
                      </h3>
                      <div className="w-12 h-1 bg-nyc-taxi mb-8"></div>
                      <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed mb-10">
                          {t.neighborhoods.items[selectedNeighborhood].details || t.neighborhoods.items[selectedNeighborhood].desc}
                      </p>
                      
                      <button 
                          onClick={() => setSelectedNeighborhood(null)}
                          className="group flex items-center gap-3 text-white font-bold text-xs uppercase tracking-widest hover:text-nyc-taxi transition-colors"
                      >
                          <span className="w-8 h-px bg-white group-hover:bg-nyc-taxi transition-all"></span>
                          {t.common.close}
                      </button>
                    </m.div>
                </div>
              </m.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};

export default React.memo(Neighborhoods);