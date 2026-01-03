import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowUp, Instagram, Twitter, Facebook, Mail, X, Shield, FileText, Map as MapIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Reveal } from './Reveal';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const [time, setTime] = useState('');
  const [weather, setWeather] = useState({ temp: '...', condition: '...' });
  const [crowd, setCrowd] = useState(0);
  const [activeLegal, setActiveLegal] = useState<'privacy' | 'terms' | 'sitemap' | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { 
        timeZone: 'America/New_York',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true 
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Mock weather and crowd data
    setWeather({ temp: '42°F', condition: 'Clear' });
    setCrowd(Math.floor(Math.random() * (450000 - 300000) + 300000));

    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <footer className="bg-black text-white relative overflow-hidden pt-16 md:pt-24 pb-8 border-t border-white/5">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-zinc-900/40 via-black to-black pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 mb-16 md:mb-24">
          
          {/* Brand & Subscribe */}
          <div className="md:col-span-5 space-y-6 md:space-y-8">
            <Reveal>
              <h3 className="text-2xl md:text-3xl font-serif font-bold italic mb-4">{t.footer.subscribeTitle}</h3>
              <p className="text-gray-400 text-sm md:text-base font-light mb-6">{t.footer.subscribeDesc}</p>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder={t.footer.emailPlaceholder} 
                  className="bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-nyc-taxi focus:ring-1 focus:ring-nyc-taxi transition-all text-sm"
                />
                <button className="bg-white text-black font-bold px-6 py-3 rounded-lg hover:bg-nyc-taxi transition-colors uppercase tracking-wider text-xs whitespace-nowrap">
                  {t.footer.subscribeBtn}
                </button>
              </div>
            </Reveal>
          </div>

          {/* Navigation Grid */}
          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
             <Reveal delay={100} direction="up">
                <div>
                   <h4 className="text-nyc-taxi text-xs font-bold uppercase tracking-[0.2em] mb-6">{t.footer.links.explore}</h4>
                   <ul className="space-y-4 text-sm text-gray-400 font-light">
                      <li><a href="#attractions" onClick={(e) => handleScrollTo(e, 'attractions')} className="hover:text-white transition-colors">{t.nav.attractions}</a></li>
                      <li><a href="#neighborhoods" onClick={(e) => handleScrollTo(e, 'neighborhoods')} className="hover:text-white transition-colors">{t.nav.neighborhoods}</a></li>
                      <li><a href="#culture" onClick={(e) => handleScrollTo(e, 'culture')} className="hover:text-white transition-colors">{t.nav.culture}</a></li>
                      <li><a href="#culinary" onClick={(e) => handleScrollTo(e, 'culinary')} className="hover:text-white transition-colors">{t.nav.culinary}</a></li>
                   </ul>
                </div>
             </Reveal>

             <Reveal delay={200} direction="up">
                <div>
                   <h4 className="text-nyc-taxi text-xs font-bold uppercase tracking-[0.2em] mb-6">{t.footer.links.connect}</h4>
                   <ul className="space-y-4 text-sm text-gray-400 font-light">
                      <li className="flex items-center gap-2 group cursor-pointer">
                        <Instagram size={16} className="group-hover:text-nyc-taxi transition-colors"/> Instagram
                      </li>
                      <li className="flex items-center gap-2 group cursor-pointer">
                        <Twitter size={16} className="group-hover:text-nyc-taxi transition-colors"/> Twitter
                      </li>
                      <li className="flex items-center gap-2 group cursor-pointer">
                        <Facebook size={16} className="group-hover:text-nyc-taxi transition-colors"/> Facebook
                      </li>
                      <li className="flex items-center gap-2 group cursor-pointer">
                        <Mail size={16} className="group-hover:text-nyc-taxi transition-colors"/> Email
                      </li>
                   </ul>
                </div>
             </Reveal>

             <Reveal delay={300} direction="up">
                <div>
                   <h4 className="text-nyc-taxi text-xs font-bold uppercase tracking-[0.2em] mb-6">{t.footer.links.legal}</h4>
                   <ul className="space-y-4 text-sm text-gray-400 font-light">
                      <li>
                        <button 
                          onClick={() => setActiveLegal('privacy')} 
                          className="hover:text-white transition-colors cursor-pointer text-left"
                        >
                          {t.footer.privacy}
                        </button>
                      </li>
                      <li>
                        <button 
                          onClick={() => setActiveLegal('terms')} 
                          className="hover:text-white transition-colors cursor-pointer text-left"
                        >
                          {t.footer.terms}
                        </button>
                      </li>
                      <li>
                        <button 
                          onClick={() => setActiveLegal('sitemap')} 
                          className="hover:text-white transition-colors cursor-pointer text-left"
                        >
                          {t.footer.sitemap}
                        </button>
                      </li>
                   </ul>
                </div>
             </Reveal>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-zinc-500 text-[10px] md:text-xs flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
             <div className="flex items-center gap-2">
                <span>© {new Date().getFullYear()} NYC Vibes Inc.</span>
                <span className="w-1 h-1 bg-zinc-700 rounded-full"></span>
                <span className="flex items-center gap-1">{t.footer.madeWith} <Heart size={10} className="text-red-600 fill-red-600" /></span>
             </div>
             <a 
               href="https://kutsev.studio" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="hover:text-nyc-taxi transition-colors uppercase tracking-[0.2em] font-bold"
             >
               Made with Kutsev Studio
             </a>
          </div>
          
          <div className="flex items-center gap-6 md:gap-12">
            <div className="hidden sm:block text-right">
              <div className="text-[9px] md:text-[10px] text-zinc-500 uppercase tracking-widest">{t.footer.weather}</div>
              <div className="font-mono text-xs md:text-sm text-white">{weather.temp} {t.footer.weatherCondition}</div>
            </div>

            <div className="hidden md:block text-right">
              <div className="text-[9px] md:text-[10px] text-zinc-500 uppercase tracking-widest">{t.footer.crowd}</div>
              <div className="font-mono text-xs md:text-sm text-white">~{crowd.toLocaleString()}</div>
            </div>

            <div className="text-center md:text-right">
              <div className="text-[9px] md:text-[10px] text-zinc-500 uppercase tracking-widest">{t.footer.time}</div>
              <div className="font-mono text-sm md:text-base text-nyc-taxi">{time}</div>
            </div>
            
            <button 
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white hover:bg-zinc-900 transition-all group"
              title={t.footer.backToTop}
            >
              <ArrowUp size={18} className="group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Giant Watermark - Responsive VW Sizing */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[30%] pointer-events-none select-none opacity-5 overflow-hidden w-full text-center">
            <span className="text-[14vw] font-bold font-sans tracking-tighter leading-none whitespace-nowrap text-white">
                NEW YORK
            </span>
        </div>
      </div>

      {/* Legal Modal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {activeLegal && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveLegal(null)}
                className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
              >
                <div className="p-6 md:p-8 border-b border-white/5 flex justify-between items-center bg-zinc-900/50 backdrop-blur-md">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-nyc-taxi/10 flex items-center justify-center text-nyc-taxi">
                      {activeLegal === 'privacy' && <Shield size={20} />}
                      {activeLegal === 'terms' && <FileText size={20} />}
                      {activeLegal === 'sitemap' && <MapIcon size={20} />}
                    </div>
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-white">
                      {t.footer.legalDocs[activeLegal].title}
                    </h3>
                  </div>
                  <button 
                    onClick={() => setActiveLegal(null)}
                    className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white"
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className="p-6 md:p-8 max-h-[60vh] overflow-y-auto custom-scrollbar bg-black/20">
                  <div className="text-gray-300 leading-relaxed whitespace-pre-line font-light text-sm md:text-base">
                    {t.footer.legalDocs[activeLegal].content}
                  </div>
                </div>
                <div className="p-6 bg-zinc-900 border-t border-white/5 flex justify-center">
                  <button 
                    onClick={() => setActiveLegal(null)}
                    className="px-8 py-3 bg-white text-black text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-nyc-taxi transition-all transform hover:scale-105 active:scale-95"
                  >
                    {t.footer.close}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </footer>
  );
};

export default Footer;