import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'ru' ? 'en' : 'ru');
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Offset for fixed header
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setIsMobileMenuOpen(false);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 border-b hardware-accelerated ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-lg py-4 border-white/5 shadow-2xl' 
          : 'bg-transparent py-6 border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative z-20">
        <a 
          href="#hero" 
          onClick={(e) => handleScrollTo(e, 'hero')}
          className="text-2xl font-bold tracking-tighter text-white font-serif italic relative group z-50 mix-blend-difference"
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
              <span className="relative z-10 mix-blend-difference">{link.name}</span>
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
        <div className="flex items-center gap-4 lg:hidden z-50">
            <button 
              onClick={toggleLanguage}
              className="px-2 py-1 rounded text-[10px] font-bold text-white uppercase bg-white/10 border border-white/10 backdrop-blur-sm"
            >
              {language === 'en' ? 'EN' : 'RU'}
            </button>
            <button 
              className="text-white hover:text-nyc-taxi transition-colors p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5 z-10">
        <motion.div 
          className="h-full bg-gradient-to-r from-nyc-taxi via-yellow-200 to-nyc-taxi shadow-[0_0_15px_rgba(251,191,36,0.6)] origin-left"
          style={{ scaleX }}
        />
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 bg-zinc-950/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
         <div className="flex flex-col items-center space-y-8">
           {navLinks.map((link, idx) => (
             <a 
               key={link.name} 
               href={`#${link.id}`} 
               onClick={(e) => handleScrollTo(e, link.id)}
               className="text-white text-4xl font-serif font-bold italic hover:text-nyc-taxi transition-colors transform hover:scale-110 duration-300"
               style={{ transitionDelay: `${idx * 50}ms` }}
             >
               {link.name}
             </a>
           ))}
         </div>
         <div className="absolute bottom-10 text-zinc-500 text-xs uppercase tracking-widest">
            New York City
         </div>
      </div>
    </nav>
  );
};

export default React.memo(Navbar);