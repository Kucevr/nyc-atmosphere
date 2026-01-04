import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { m, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [nycTime, setNycTime] = useState('');
  const { language, setLanguage, t } = useLanguage();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const updateTime = () => {
      const time = new Date().toLocaleTimeString('en-US', {
        timeZone: 'America/New_York',
        hour12: true,
        hour: '2-digit',
        minute: '2-digit'
      });
      setNycTime(time);
    };
    
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleLanguage = () => {
    setLanguage(language === 'ru' ? 'en' : 'ru');
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    
    // Close menu and reset overflow immediately for responsiveness
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'unset';

    const element = document.getElementById(id);
    if (element) {
      // Use a longer timeout to let the menu exit animation finish
      // and the browser to breathe before starting a heavy smooth scroll
      setTimeout(() => {
        const isMobile = window.innerWidth < 1024;
        element.scrollIntoView({
          behavior: isMobile ? "auto" : "smooth",
          block: "start"
        });
      }, 350);
    }
  };

  const navLinks = [
    { name: t.nav.home, id: 'hero' },
    { name: t.nav.attractions, id: 'attractions' },
    { name: t.nav.neighborhoods, id: 'neighborhoods' },
    { name: t.nav.culture, id: 'culture' },
    { name: t.nav.culinary, id: 'culinary' },
    { name: t.nav.transport, id: 'transport' },
    { name: t.nav.history, id: 'history' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 border-b hardware-accelerated ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-lg py-4 border-white/5 shadow-2xl' 
          : 'bg-transparent py-6 border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative z-[110]">
        <a 
          href="#hero" 
          onClick={(e) => handleScrollTo(e, 'hero')}
          className="text-2xl font-bold tracking-tighter text-white font-serif italic relative group z-[120]"
        >
          NYC <span className="text-nyc-taxi not-italic font-sans">Vibes</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={`#${link.id}`}
              onClick={(e) => handleScrollTo(e, link.id)}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300 hover:text-white transition-all py-2 relative group"
            >
              <span className="relative z-10">{link.name}</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-nyc-taxi transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right group-hover:origin-left"></span>
            </a>
          ))}
          
          <div className="w-px h-4 bg-white/20 mx-4"></div>

          {/* Language Toggle */}
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 group hover:bg-white/5 px-2 py-1 rounded transition-all"
          >
            <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${language === 'en' ? 'text-white' : 'text-zinc-500'}`}>EN</span>
            <span className="text-zinc-600">/</span>
            <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${language === 'ru' ? 'text-white' : 'text-zinc-500'}`}>RU</span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 lg:hidden z-[120]">
            <button 
              onClick={toggleLanguage}
              className="px-2 py-1 rounded text-[10px] font-bold text-white uppercase bg-white/10 border border-white/10 backdrop-blur-sm"
            >
              {language === 'en' ? 'EN' : 'RU'}
            </button>
            <button 
              className="relative w-12 h-12 flex items-center justify-center text-white hover:text-nyc-taxi transition-colors group"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-5">
                <span className={`absolute left-0 block h-0.5 bg-current transform transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'w-6 rotate-45 top-2' : 'w-6 top-0'}`}></span>
                <span className={`absolute left-0 block h-0.5 bg-current transform transition-all duration-500 ease-in-out top-2 ${isMobileMenuOpen ? 'w-0 opacity-0' : 'w-4 opacity-100'}`}></span>
                <span className={`absolute left-0 block h-0.5 bg-current transform transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'w-6 -rotate-45 top-2' : 'w-5 top-4'}`}></span>
              </div>
            </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5 z-[110]">
        <m.div 
          className="h-full bg-gradient-to-r from-nyc-taxi via-yellow-200 to-nyc-taxi shadow-[0_0_15px_rgba(251,191,36,0.6)] origin-left"
          style={{ scaleX }}
        />
      </div>

      {/* Mobile Menu */}
      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <m.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-md z-[101]"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <m.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden fixed inset-0 bg-zinc-950 z-[105] flex flex-col"
          >
             {/* Background Decorative Elements */}
             <div className="absolute top-[-10%] right-[-10%] w-[70%] h-[70%] bg-nyc-taxi/10 rounded-full blur-[120px]"></div>
             <div className="absolute bottom-[-10%] left-[-10%] w-[70%] h-[70%] bg-white/5 rounded-full blur-[120px]"></div>
             <div className="grain-overlay opacity-30"></div>

             <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-6 pt-32">
               <m.div 
                 initial={{ opacity: 0, y: -20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.2 }}
                 className="absolute top-36 left-1/2 -translate-x-1/2 flex flex-col items-center"
               >
                 <span className="text-nyc-taxi font-mono text-[10px] tracking-[0.5em] uppercase mb-2">Local Time</span>
                 <span className="text-white font-serif italic text-2xl">{nycTime}</span>
               </m.div>

               <div className="flex flex-col items-center space-y-5 md:space-y-8 mt-24">
                 {navLinks.map((link, idx) => (
                   <m.a 
                     key={link.name} 
                     href={`#${link.id}`} 
                     onClick={(e) => handleScrollTo(e, link.id)}
                     initial={{ opacity: 0, y: 30, rotateX: -45 }}
                     animate={{ opacity: 1, y: 0, rotateX: 0 }}
                     transition={{ 
                       delay: 0.3 + idx * 0.07,
                       duration: 0.6,
                       ease: [0.22, 1, 0.36, 1]
                     }}
                     className="text-white text-4xl md:text-7xl font-serif font-bold italic hover:text-nyc-taxi transition-all transform hover:scale-105 duration-300 flex items-center gap-4 group"
                   >
                     <span className="text-nyc-taxi/20 font-mono text-sm not-italic group-hover:text-nyc-taxi transition-colors">0{idx + 1}</span>
                     {link.name}
                   </m.a>
                 ))}
               </div>
             </div>
             
             <m.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.8 }}
               className="p-12 flex flex-col items-center gap-4 z-10"
             >
                <div className="w-12 h-px bg-nyc-taxi/50"></div>
                <div className="flex items-center gap-6">
                  <span className="text-zinc-500 text-[10px] uppercase tracking-[0.4em] font-bold">New York City</span>
                  <span className="text-zinc-700 text-[10px] uppercase tracking-[0.4em] font-bold">2026</span>
                </div>
             </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default React.memo(Navbar);