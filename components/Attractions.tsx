import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from './Reveal';
import { useLanguage } from '../contexts/LanguageContext';
import { X, ArrowUpRight, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { SmoothImage } from './SmoothImage';

const images = {
  '1': '/items/TimesSquare.webp', // Times Square
  '2': '/items/CentralPark.webp', // Central Park
  '3': '/items/EmpireState.webp', // Empire State
  '4': '/items/BrooklynBridge.webp', // Brooklyn Bridge
  '5': '/items/Statue_of_Liberty.webp', // Statue of Liberty
  '6': '/items/TheMet.webp', // The Met
};

const Attractions: React.FC = () => {
  const { t } = useLanguage();
  const [selectedAttraction, setSelectedAttraction] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = 450;
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setSelectedAttraction(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Block body scroll when modal is open
  useEffect(() => {
    if (selectedAttraction) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedAttraction]);

  const selectedItem = selectedAttraction 
    ? t.attractions.items.find(i => i.id === selectedAttraction)
    : null;

  return (
    <section id="attractions" className="py-20 md:py-32 bg-nyc-black relative overflow-hidden optimize-visibility" style={{ containIntrinsicSize: '1px 800px' }}>
      {/* Background Ambience */}
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-16">
                <div className="max-w-2xl">
                    <span className="text-nyc-taxi font-bold tracking-[0.3em] text-xs uppercase mb-4 block animate-pulse">{t.labels.mustVisit}</span>
                    <h2 className="text-4xl md:text-7xl font-serif font-bold text-white mb-4 md:mb-6 tracking-tight leading-[0.9]">
                        {t.attractions.title}
                    </h2>
                    <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed">
                        {t.attractions.description}
                    </p>
                </div>
                
                {/* Scroll Navigation */}
                <div className="flex gap-3 mt-6 md:mt-0">
                  <button 
                    onClick={() => scroll('left')}
                    className="group w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white text-white hover:text-black transition-all duration-300"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={() => scroll('right')}
                    className="group w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white text-white hover:text-black transition-all duration-300"
                    aria-label="Scroll right"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
            </div>
        </Reveal>
      </div>

      {/* Horizontal Scroll Container */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-4 md:gap-8 px-6 pb-12 snap-x snap-mandatory scrollbar-hide pl-[max(1.5rem,calc((100vw-80rem)/2))]"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {t.attractions.items.map((spot, idx) => (
            <div 
                key={spot.id} 
                className="flex-shrink-0 w-[280px] md:w-[450px] snap-center cursor-pointer"
                onClick={() => setSelectedAttraction(spot.id)}
            >
                <Reveal delay={idx * 100} width="100%" variant="zoom">
                    <div 
                        className="group relative h-[450px] md:h-[600px] overflow-hidden bg-zinc-900 transition-transform duration-200 hover:-translate-y-2 rounded-lg"
                    >
                        <div className="absolute inset-0 z-0">
                             <SmoothImage 
                                src={images[spot.id as keyof typeof images]} 
                                alt={spot.name} 
                                className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105 filter brightness-[0.75] grayscale-[20%] group-hover:grayscale-0 group-hover:brightness-100"
                            />
                        </div>
                        
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 transition-opacity duration-300"></div>
                        
                        {/* Hover Overlay - Shows Description */}
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-center p-10 transform translate-y-4 group-hover:translate-y-0 border border-white/10">
                             <p className="text-xl font-serif italic text-white mb-6 text-center leading-relaxed">
                                "{spot.description}"
                             </p>
                             <div className="flex items-center justify-center gap-2 text-nyc-taxi uppercase text-xs font-bold tracking-widest">
                                <span>{t.common.discover}</span>
                                <ArrowUpRight size={14} />
                             </div>
                        </div>

                        {/* Always visible bottom content */}
                        <div className="absolute bottom-0 left-0 w-full p-8 transition-opacity duration-300 group-hover:opacity-0">
                            <div className="flex items-end justify-between">
                                <div>
                                    <span className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-2 block">{spot.category}</span>
                                    <h3 className="text-4xl font-serif text-white font-bold leading-none">{spot.name}</h3>
                                </div>
                                <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white backdrop-blur-md">
                                    <span className="text-sm font-mono">0{idx + 1}</span>
                                </div>
                            </div>
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
          {selectedItem && (
            <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 md:p-8 pointer-events-auto">
              {/* Backdrop */}
              <motion.div 
                key="attraction-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/90 backdrop-blur-xl cursor-pointer"
                onClick={() => setSelectedAttraction(null)}
              />
              
              {/* Modal Content */}
              <motion.div 
                key="attraction-modal-content"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative bg-zinc-900 border border-white/10 max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] rounded-3xl flex flex-col md:flex-row z-[1000000] pointer-events-auto"
              >
                <button 
                    onClick={() => setSelectedAttraction(null)}
                    className="absolute top-6 right-6 z-50 p-3 bg-black/50 text-white hover:bg-white hover:text-black transition-all backdrop-blur-md rounded-full border border-white/10"
                >
                    <X size={24} />
                </button>

                {/* Image Side */}
                <div className="w-full md:w-1/2 h-72 md:h-auto relative overflow-hidden">
                    <SmoothImage 
                        src={images[selectedItem.id as keyof typeof images]} 
                        alt={selectedItem.name} 
                        className="w-full h-full object-cover"
                        containerClassName="w-full h-full absolute inset-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                </div>

                {/* Content Side */}
                <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-zinc-950 overflow-y-auto">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                        <div className="flex items-center gap-2 mb-6 md:mb-8">
                            <MapPin size={16} className="text-nyc-taxi" />
                            <span className="text-zinc-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">{selectedItem.category}</span>
                        </div>
                        
                        <h3 className="text-4xl md:text-7xl font-serif text-white font-bold mb-6 md:mb-8 leading-[0.9]">
                            {selectedItem.name}
                        </h3>
                        
                        <div className="w-16 md:w-20 h-1 bg-nyc-taxi mb-8 md:mb-10"></div>
                        
                        <p className="text-xl md:text-3xl text-gray-200 font-display italic leading-relaxed mb-6 md:mb-8">
                            {selectedItem.description}
                        </p>
                        <p className="text-gray-400 leading-relaxed text-base md:text-lg font-light">
                            {selectedItem.details}
                        </p>

                        <div className="mt-12 pt-8 border-t border-zinc-800 flex justify-between items-center">
                            <span className="text-zinc-600 text-sm font-mono">{t.common.est} NYC</span>
                            <button className="text-white border-b border-white pb-1 hover:text-nyc-taxi hover:border-nyc-taxi transition-colors text-sm uppercase tracking-widest">
                                {t.common.viewOnMap}
                            </button>
                        </div>
                    </motion.div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};

export default React.memo(Attractions);