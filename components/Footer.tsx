import React, { useState, useEffect } from 'react';
import { Heart, ArrowUp, Instagram, Twitter, Facebook, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Reveal } from './Reveal';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const [time, setTime] = useState('');

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
    <footer className="bg-black text-white relative overflow-hidden pt-16 md:pt-24 pb-8 border-t border-zinc-900">
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
                      <li><a href="#" className="hover:text-white transition-colors">{t.footer.privacy}</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Terms of Use</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Sitemap</a></li>
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
          
          <div className="flex items-center gap-6 md:gap-8">
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
    </footer>
  );
};

export default Footer;