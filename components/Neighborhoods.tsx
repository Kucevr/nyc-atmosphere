import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from './Reveal';
import { useLanguage } from '../contexts/LanguageContext';
import { ChevronLeft, ChevronRight, X, Maximize2, Map } from 'lucide-react';
import { SmoothImage } from './SmoothImage';

const images = [
  "/items/SoHo.JPG", // SoHo
  "/items/DUMBO.JPG", // DUMBO
  "/items/Greenwich_Village.JPG", // Greenwich
  "/items/Chinatown.JPG", // Chinatown
  "/items/williamsburg.jpg", // Williamsburg
  "/items/Harlem.jpg.webp", // Harlem
  "/items/Chelsea.jpg", // Chelsea
  "/items/Upper_East_Side_NYC.jpg", // UES
];

const Neighborhoods: React.FC = () => {
  const { t } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<number | null>(null);

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
    <section id="neighborhoods" className="py-20 md:py-32 bg-zinc-900 overflow-hidden relative border-t border-zinc-800 optimize-visibility" style={{ containIntrinsicSize: '1px 800px' }}>
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
            className="flex-shrink-0 w-[280px] md:w-96 snap-center group"
          >
            <Reveal delay={idx * 50} width="100%" variant="zoom">
              <motion.div 
                layoutId={`neighborhood-card-${idx}`}
                className="relative h-[400px] md:h-[500px] overflow-hidden cursor-pointer bg-black border-r border-white/10 group-hover:border-transparent transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedNeighborhood(idx);
                }}
              >
                <motion.div layoutId={`neighborhood-image-${idx}`} className="w-full h-full absolute inset-0">
                  <SmoothImage 
                    src={images[idx % images.length]} 
                    alt={area.name} 
                    className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105 opacity-60 group-hover:opacity-80 grayscale group-hover:grayscale-0 will-change-transform"
                    containerClassName="w-full h-full absolute inset-0"
                  />
                </motion.div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                
                <div className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full border border-white/20">
                    <Maximize2 size={16} />
                </div>

                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block border-l border-nyc-taxi pl-2 group-hover:text-nyc-taxi transition-colors">
                    {area.tagline}
                  </span>
                  <motion.h3 layoutId={`neighborhood-title-${idx}`} className="text-4xl font-serif text-white font-bold mb-4">{area.name}</motion.h3>
                  <div className="h-px w-full bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                </div>
              </motion.div>
            </Reveal>
          </div>
        ))}
        <div className="w-6 flex-shrink-0"></div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedNeighborhood !== null && createPortal(
          <div className="fixed inset-0 z-[12000] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedNeighborhood(null);
              }}
            ></motion.div>
            
            <motion.div 
              layoutId={`neighborhood-card-${selectedNeighborhood}`}
              className="relative bg-zinc-900 border border-white/10 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row z-[13000]"
            >
              <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedNeighborhood(null);
                  }}
                  className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white hover:bg-white hover:text-black transition-colors backdrop-blur-md rounded-full border border-white/10"
              >
                  <X size={20} />
              </button>

              {/* Image Side */}
              <motion.div layoutId={`neighborhood-image-${selectedNeighborhood}`} className="w-full md:w-1/2 h-64 md:h-auto relative">
                  <SmoothImage 
                      src={images[selectedNeighborhood % images.length]} 
                      alt={t.neighborhoods.items[selectedNeighborhood].name} 
                      className="w-full h-full object-cover"
                      containerClassName="w-full h-full absolute inset-0"
                  />
                  <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
              </motion.div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-center bg-zinc-950">
                  <motion.span 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-nyc-taxi text-[10px] md:text-xs font-bold uppercase tracking-widest mb-3 md:mb-4"
                  >
                      {t.neighborhoods.items[selectedNeighborhood].tagline}
                  </motion.span>
                  <motion.h3 layoutId={`neighborhood-title-${selectedNeighborhood}`} className="text-3xl md:text-5xl font-serif text-white font-bold mb-6 md:mb-8">
                      {t.neighborhoods.items[selectedNeighborhood].name}
                  </motion.h3>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-300 text-base md:text-lg font-light leading-relaxed mb-6 md:mb-8"
                  >
                      {t.neighborhoods.items[selectedNeighborhood].details || t.neighborhoods.items[selectedNeighborhood].desc}
                  </motion.p>
                  
                  <motion.button 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      onClick={() => setSelectedNeighborhood(null)}
                      className="self-start text-white border-b border-white pb-1 hover:text-nyc-taxi hover:border-nyc-taxi transition-colors text-xs uppercase tracking-widest"
                  >
                      {t.common.close}
                  </motion.button>
              </div>
            </motion.div>
          </div>, document.body
        )}
      </AnimatePresence>
    </section>
  );
};

export default React.memo(Neighborhoods);