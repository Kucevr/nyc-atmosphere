import React from 'react';
import { Reveal } from './Reveal';
import { useLanguage } from '../contexts/LanguageContext';
import { Utensils, Star, ChefHat } from 'lucide-react';
import { SmoothImage } from './SmoothImage';

const Culinary: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="culinary" className="py-20 md:py-32 bg-nyc-dark relative overflow-hidden optimize-visibility" style={{ containIntrinsicSize: '1px 800px' }}>
    {/* Texture Overlay (lightened) */}
    <div className="absolute inset-0 opacity-[0.015] bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] pointer-events-none"></div>
      
    {/* Background Shapes (reduced blur) */}
    <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-orange-500/10 rounded-full blur-[60px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Reveal>
            <div className="flex items-center justify-center gap-3 mb-4">
                <ChefHat className="text-nyc-taxi w-5 h-5" />
                <span className="text-nyc-taxi font-bold tracking-widest text-xs uppercase">{t.labels.gastronomy}</span>
            </div>
            
            <h2 className="text-4xl md:text-7xl font-serif font-bold text-white text-center mb-6 md:mb-8 italic">{t.culinary.title}</h2>
            <div className="w-px h-12 md:h-16 bg-gradient-to-b from-nyc-taxi to-transparent mx-auto mb-10 md:mb-16"></div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
            
            {/* Visual Side */}
            <div className="lg:col-span-5 relative">
                <Reveal direction="right">
                    <div className="sticky top-24">
                        <div className="relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-xl border border-white/10 aspect-[4/5] group">
                            <SmoothImage 
                                src="/items/CityTastes.webp" 
                                alt="NYC Dining" 
                                priority={true}
                                className="w-full h-full object-cover filter brightness-[0.9] group-hover:brightness-100 transition-[filter] duration-200 ease-out" 
                                containerClassName="w-full h-full absolute inset-0"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 pointer-events-none"></div>
                            <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 right-6 md:right-8 z-10">
                                <div className="flex gap-1 mb-2 text-nyc-taxi">
                                    <Star size={12} md:size={14} fill="currentColor" />
                                    <Star size={12} md:size={14} fill="currentColor" />
                                    <Star size={12} md:size={14} fill="currentColor" />
                                    <Star size={12} md:size={14} fill="currentColor" />
                                    <Star size={12} md:size={14} fill="currentColor" />
                                </div>
                                <p className="text-white text-lg md:text-xl font-serif italic leading-tight">
                                    {t.culinary.quote}
                                </p>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>

            {/* Menu Side */}
            <div className="lg:col-span-7 space-y-2 md:space-y-4">
                {t.culinary.items.map((food, idx) => (
                    <Reveal key={idx} delay={idx * 100} direction="up">
                        <div className="group relative p-6 md:p-8 rounded-2xl transition-colors duration-100 hover:bg-white/5 border border-transparent hover:border-white/5 cursor-default">
                             <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-100">
                                <Utensils size={16} className="text-gray-500" />
                             </div>
                             
                             <div className="flex items-baseline justify-between mb-2">
                                <h3 className="text-xl md:text-3xl font-serif font-bold text-white group-hover:text-nyc-taxi transition-colors duration-100">{food.name}</h3>
                                <div className="flex-1 h-px bg-white/10 mx-6 border-b border-dotted border-white/20 hidden md:block"></div>
                             </div>
                             
                             <p className="text-gray-400 font-light text-base md:text-lg leading-relaxed max-w-xl group-hover:text-gray-300 transition-colors duration-100">
                                {food.desc}
                             </p>
                        </div>
                    </Reveal>
                ))}
                
                <Reveal delay={600}>
                    <div className="mt-8 md:mt-12 text-center lg:text-left pl-0 md:pl-8">
                        <button className="px-8 py-3 rounded-full border border-white/20 text-white hover:bg-nyc-taxi hover:text-black hover:border-nyc-taxi transition-all font-medium uppercase tracking-wide text-sm shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(251,191,36,0.3)]">
                            {t.culinary.cta}
                        </button>
                    </div>
                </Reveal>
            </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Culinary);