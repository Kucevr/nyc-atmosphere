import React from 'react';
import { Reveal } from './Reveal';
import { Music, Landmark, Theater, ArrowUpRight, Shirt, Disc, Mic2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { SmoothImage } from './SmoothImage';

const Culture: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="culture" className="py-20 md:py-32 bg-nyc-black px-6 relative overflow-hidden optimize-visibility" style={{ containIntrinsicSize: '1px 900px' }}>
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[650px] h-[650px] bg-indigo-900/10 rounded-full blur-[50px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[480px] h-[480px] bg-rose-900/10 rounded-full blur-[50px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-16 border-b border-white/5 pb-8">
            <div>
               <span className="text-nyc-taxi font-bold tracking-[0.3em] text-[10px] md:text-xs uppercase mb-3 block">{t.labels.lifestyle}</span>
               <h2 className="text-4xl md:text-7xl font-bold text-white mb-4 md:mb-6 font-serif tracking-tight">{t.culture.title}</h2>
               <p className="text-gray-400 max-w-xl text-lg md:text-xl font-light leading-relaxed">{t.culture.description}</p>
            </div>
          </div>
        </Reveal>

        {/* Bento Grid Layout - 5 Items */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:h-[800px]">
          
          {/* 1. Broadway (Large Top Left - Spans 3 Cols) */}
          <div className="md:col-span-3 md:row-span-1 relative group overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 min-h-[350px] md:min-h-[400px]">
            <Reveal width="100%" className="h-full">
                <div className="h-full w-full relative">
                    <SmoothImage 
                        src="/items/CulturalCode1.webp" 
                        alt="Broadway" 
                        priority={true}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] filter brightness-[0.85] group-hover:brightness-100"
                        containerClassName="w-full h-full absolute inset-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                    
                    <div className="absolute top-6 right-6 w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 group-hover:rotate-45 transition-transform duration-500 z-10">
                        <ArrowUpRight size={18} md:size={20} />
                    </div>

                    <div className="absolute bottom-0 left-0 p-6 md:p-12 z-10">
                        <div className="flex items-center gap-2 mb-3 md:mb-4">
                             <div className="p-1.5 md:p-2 bg-red-500/20 backdrop-blur-sm rounded-lg border border-red-500/10">
                                <Theater className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
                             </div>
                             <span className="text-red-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">Theater District</span>
                        </div>
                        <h3 className="text-3xl md:text-6xl font-serif font-bold text-white mb-3 md:mb-4 leading-none">{t.culture.broadway.title}</h3>
                        <p className="text-gray-200 text-base md:text-lg font-light max-w-md mb-4 md:mb-6 opacity-90">{t.culture.broadway.desc}</p>
                    </div>
                </div>
            </Reveal>
          </div>

          {/* 2. Fashion (Tall Right - Spans 1 Col, 2 Rows) */}
          <div className="md:col-span-1 md:row-span-2 relative group overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 min-h-[400px] md:min-h-0">
             <Reveal width="100%" className="h-full">
                <div className="h-full w-full relative">
                     <SmoothImage 
                        src="/items/SoHo.webp" 
                        alt="Fashion" 
                        className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-200 ease-out"
                        containerClassName="w-full h-full absolute inset-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90"></div>
                     <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-10">
                        <div className="p-2 bg-purple-500/20 w-fit backdrop-blur-sm rounded-lg mb-4 border border-purple-500/10">
                            <Shirt className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
                        </div>
                        <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2 leading-none break-words">{t.culture.fashion?.title || 'Fashion'}</h3>
                        <p className="text-gray-400 text-xs md:text-sm leading-relaxed">{t.culture.fashion?.desc || 'Style capital.'}</p>
                    </div>
                </div>
            </Reveal>
          </div>

          {/* 3. Jazz (Bottom Left) */}
          <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 min-h-[250px] md:min-h-[300px]">
             <Reveal width="100%" className="h-full">
                <div className="h-full w-full relative">
                    <SmoothImage 
                        src="/items/CulturalCode3.webp" 
                        alt="Jazz" 
                        className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-200 ease-out"
                        containerClassName="w-full h-full absolute inset-0"
                    />
                     <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors duration-200 z-10"></div>
                     <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                         <div className="self-end p-2 bg-amber-500/20 rounded-full border border-amber-500/10">
                            <Mic2 className="w-4 h-4 md:w-5 md:h-5 text-amber-500" />
                         </div>
                        <div>
                             <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-1">{t.culture.jazz?.title || 'Jazz'}</h3>
                             <p className="text-gray-400 text-[10px] md:text-xs">{t.culture.jazz?.desc || 'Soul & Rhythm.'}</p>
                        </div>
                    </div>
                </div>
            </Reveal>
          </div>

          {/* 4. Museums (Bottom Center-Left) */}
          <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 min-h-[300px]">
             <Reveal width="100%" className="h-full">
                <div className="h-full w-full relative">
                    <SmoothImage 
                        src="/items/CulturalCode4.webp" 
                        alt="Museums" 
                        className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-200 ease-out"
                        containerClassName="w-full h-full absolute inset-0"
                    />
                     <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors duration-200 z-10"></div>
                     <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                         <div className="self-end p-2 bg-blue-500/20 rounded-full border border-blue-500/10">
                            <Landmark className="w-5 h-5 text-blue-500" />
                         </div>
                        <div>
                             <h3 className="text-2xl font-serif font-bold text-white mb-1">{t.culture.museums.title}</h3>
                             <p className="text-gray-400 text-xs">{t.culture.museums.desc}</p>
                        </div>
                    </div>
                </div>
            </Reveal>
          </div>

          {/* 5. Nightlife (Bottom Center-Right) */}
          <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 min-h-[300px]">
             <Reveal width="100%" className="h-full">
                <div className="h-full w-full relative">
                    <SmoothImage 
                        src="/items/CulturalCode2.webp" 
                        alt="Nightlife" 
                        className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-200 ease-out"
                        containerClassName="w-full h-full absolute inset-0"
                    />
                     <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors duration-200 z-10"></div>
                     <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                         <div className="self-end p-2 bg-nyc-taxi/20 rounded-full border border-nyc-taxi/10">
                            <Disc className="w-5 h-5 text-nyc-taxi" />
                         </div>
                        <div>
                             <h3 className="text-2xl font-serif font-bold text-white mb-1">{t.culture.nightlife.title}</h3>
                             <p className="text-gray-400 text-xs">{t.culture.nightlife.desc}</p>
                        </div>
                    </div>
                </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};

export default React.memo(Culture);