import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
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
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      // Use a small timeout to ensure the menu starts closing before the scroll begins
      // This prevents the "stuck" feeling on mobile
      setTimeout(() => {
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }, 10);
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
              className="relative w-10 h-10 flex items-center justify-center text-white hover:text-nyc-taxi transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-5">
                <span className={`absolute left-0 block w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45 top-2' : 'top-0'}`}></span>
                <span className={`absolute left-0 block w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out top-2 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`absolute left-0 block w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${isMobileMenuOpen ? '-rotate-45 top-2' : 'top-4'}`}></span>
              </div>
            </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5 z-[110]">
        <motion.div 
          className="h-full bg-gradient-to-r from-nyc-taxi via-yellow-200 to-nyc-taxi shadow-[0_0_15px_rgba(251,191,36,0.6)] origin-left"
          style={{ scaleX }}
        />
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden fixed inset-0 bg-zinc-950 z-[105] flex flex-col items-center justify-center"
          >
             {/* Background Decorative Elements */}
             <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-nyc-taxi/5 rounded-full blur-[120px]"></div>
             <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/5 rounded-full blur-[120px]"></div>

             <div className="flex flex-col items-center space-y-6 md:space-y-8 relative z-10">
               {navLinks.map((link, idx) => (
                 <motion.a 
                   key={link.name} 
                   href={`#${link.id}`} 
                   onClick={(e) => handleScrollTo(e, link.id)}
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: 0.2 + idx * 0.05 }}
                   className="text-white text-4xl md:text-6xl font-serif font-bold italic hover:text-nyc-taxi transition-colors transform hover:scale-105 duration-300"
                 >
                   {link.name}
                 </motion.a>
               ))}
             </div>
             
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.6 }}
               className="absolute bottom-12 flex flex-col items-center gap-4 z-10"
             >
                <div className="w-12 h-px bg-nyc-taxi/50"></div>
                <span className="text-zinc-500 text-[10px] uppercase tracking-[0.4em] font-bold">New York City</span>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default React.memo(Navbar);