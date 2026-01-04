import React, { useState, useEffect, useRef } from 'react';
import { Train, Car, Footprints, Info, CreditCard, Clock, MapPin, ArrowUpRight } from 'lucide-react';
import { Reveal } from './Reveal';
import { useLanguage } from '../contexts/LanguageContext';
import { SmoothImage } from './SmoothImage';

const Transport: React.FC = () => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

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
        threshold: 0.6,
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="transport" className="bg-zinc-950 relative overflow-hidden optimize-visibility" style={{ containIntrinsicSize: '1px 800px' }}>
      {/* Marquee Header */}
      <div className="bg-nyc-taxi text-black py-2 md:py-3 overflow-hidden whitespace-nowrap border-b border-black">
        <div className="inline-flex animate-marquee gap-8 md:gap-12 font-mono text-[10px] md:text-sm font-bold uppercase tracking-widest" style={{ willChange: 'transform' }}>
            {Array(20).fill("Stand Clear of the Closing Doors").map((text, i) => (
                <span key={i} className="flex items-center gap-3 md:gap-4">
                    {text} <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-black rounded-full"></span>
                </span>
            ))}
        </div>
      </div>

      <div className="relative z-10">
        <div className="px-6 py-16 md:py-32 max-w-7xl mx-auto">
             <Reveal>
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-16">
                    <div>
                        <span className="text-zinc-500 font-bold tracking-[0.3em] text-[10px] md:text-xs uppercase mb-4 block flex items-center gap-2">
                             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                             {t.labels.mobility}
                        </span>
                        <h2 className="text-4xl md:text-8xl font-serif font-bold text-white tracking-tighter leading-none">
                            {t.transport.title}
                        </h2>
                    </div>
                    <p className="text-gray-400 max-w-md mt-6 md:mt-0 text-left md:text-right text-base md:text-lg font-light leading-relaxed border-l md:border-l-0 md:border-r border-zinc-800 pl-6 md:pl-0 md:pr-6">
                        {t.transport.description}
                    </p>
                </div>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-zinc-800 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800 bg-zinc-900/60">
                {t.transport.items.map((item, idx) => {
                    const icons = [Train, Car, Footprints];
                    const Icon = icons[idx];
                    
                    return (
                        <Reveal key={idx} delay={idx * 150} width="100%">
                            <div 
                                ref={el => itemRefs.current[idx] = el}
                                data-index={idx}
                                className={`group relative h-[450px] md:h-[600px] overflow-hidden ${activeIndex === idx ? 'is-active' : ''}`}
                            >
                                {/* Background Image with Zoom */}
                                <div className="absolute inset-0 z-0">
                                    <SmoothImage 
                                        src={item.image} 
                                        alt={item.title} 
                                        priority={idx === 0}
                                        className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-102 group-[.is-active]:scale-102 filter grayscale brightness-[0.5] group-hover:grayscale-0 group-[.is-active]:grayscale-0 group-hover:brightness-85 group-[.is-active]:brightness-85"
                                        containerClassName="w-full h-full absolute inset-0"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/15 to-black/80"></div>
                                </div>

                                {/* Content Layer */}
                                <div className="relative z-10 h-full p-8 md:p-12 flex flex-col justify-between">
                                    
                                    {/* Top Data Bar */}
                                    <div className="flex justify-between items-start">
                                        <div className="p-2.5 md:p-3 bg-white/10 rounded-lg border border-white/10 text-white group-hover:bg-nyc-taxi group-[.is-active]:bg-nyc-taxi group-hover:text-black group-[.is-active]:text-black transition-colors duration-150">
                                            <Icon size={20} md:size={24} />
                                        </div>
                                        <div className="flex flex-col items-end gap-1 font-mono text-[10px] md:text-xs text-gray-400">
                                            <span className="flex items-center gap-2 bg-black/50 px-2 py-1 rounded">
                                                <CreditCard size={10} /> {item.price}
                                            </span>
                                            <span className="flex items-center gap-2 bg-black/50 px-2 py-1 rounded">
                                                <Clock size={10} /> {item.status}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Main Info */}
                                    <div className="transform translate-y-1 group-hover:translate-y-0 group-[.is-active]:translate-y-0 transition-transform duration-200 ease-out">
                                        <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">{item.title}</h3>
                                        <p className="text-gray-300 font-light text-base md:text-lg mb-6 md:mb-8 opacity-85 group-hover:opacity-100 group-[.is-active]:opacity-100 transition-opacity duration-200">
                                            {item.desc}
                                        </p>

                                        {/* Hidden Tip Reveal */}
                                        <div className="overflow-hidden max-h-0 group-hover:max-h-40 group-[.is-active]:max-h-40 transition-all duration-300 ease-out">
                                            <div className="bg-white/10 rounded-xl p-4 border border-white/10 mb-4 opacity-0 group-hover:opacity-100 group-[.is-active]:opacity-100 transition-opacity duration-250 delay-50">
                                                <div className="flex items-start gap-3">
                                                    <Info size={16} className="text-nyc-taxi mt-1 flex-shrink-0" />
                                                    <p className="text-xs md:text-sm text-gray-200 leading-relaxed">
                                                        <span className="font-bold text-white block text-[10px] uppercase tracking-wider mb-1">Pro Tip</span>
                                                        {item.tip}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <button className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-nyc-taxi opacity-0 group-hover:opacity-100 group-[.is-active]:opacity-100 transition-opacity duration-700 delay-200">
                                            {t.common.readMore} <ArrowUpRight size={14} />
                                        </button>
                                    </div>
                                </div>

                                {/* Hover Border Effect */}
                                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/10 transition-colors pointer-events-none"></div>
                            </div>
                        </Reveal>
                    );
                })}
            </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Transport);