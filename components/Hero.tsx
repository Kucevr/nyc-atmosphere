import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Play, ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { m, useScroll, useTransform } from 'framer-motion';
import { Reveal } from './Reveal';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  
  const { scrollY, scrollYProgress } = useScroll();

  useEffect(() => {
    // Only load video on non-mobile devices to save network payload on Mobile PageSpeed
    if (!window.matchMedia("(max-width: 768px)").matches) {
      setShouldLoadVideo(true);
    }
  }, []);

  // Parallax transforms
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);
  
  // Variable font weight for title
  const titleWeight = useTransform(scrollYProgress, [0, 0.2], [800, 400]);

  const handleScrollTo = (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
  };

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);

    // We always use the music file for the best experience
    if (audioRef.current) {
      if (!newMutedState) {
        audioRef.current.play().catch(() => {});
        audioRef.current.volume = 0.4;
      } else {
        audioRef.current.pause();
      }
    }

    // Keep video muted to avoid clashing with the music
    if (videoRef.current) {
      videoRef.current.muted = true; 
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  return (
    <section id="hero" className="relative w-full h-[100dvh] overflow-hidden flex items-center justify-center bg-black">
      {/* Primary music for the Hero section - Preload none to save initial bandwidth */}
      <audio ref={audioRef} src="/audio/empire_state.mp3" loop preload="none" />
      
      {/* VIDEO BACKGROUND */}
      <m.div 
        style={{ scale }}
        className="absolute inset-0 z-0 select-none bg-black"
      >
        {shouldLoadVideo ? (
          <video 
            ref={videoRef}
            className="w-full h-full object-cover scale-[1.02] filter contrast-[1.05] brightness-[0.92]"
            autoPlay 
            muted
            loop 
            playsInline
            preload="auto"
            poster="/items/TimesSquare.avif"
          >
            <source src="/items/Herovideo.webm" type="video/webm" />
            <source src="/items/Herovideo.mp4" type="video/mp4" />
          </video>
        ) : (
          <img 
            src="/items/TimesSquare.avif" 
            alt="New York"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover scale-[1.02] filter contrast-[1.05] brightness-[0.92]"
          />
        )}
        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-black/25 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/40 opacity-80"></div>
      </m.div>

      {/* Decorative Parallax Elements (Dust/Light) */}
      <m.div 
        style={{ y: y2, opacity }}
        className="absolute inset-0 z-[5] pointer-events-none overflow-hidden"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-nyc-taxi/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[150px]"></div>
      </m.div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full flex flex-col justify-center pt-32 md:pt-40">
        <m.div style={{ y: y1, opacity }} className="max-w-5xl">
            <m.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex items-center gap-3 mb-6 md:mb-10"
            >
                <div className="h-px w-8 md:w-12 bg-nyc-taxi"></div>
                <span className="text-nyc-taxi text-[10px] md:text-xs font-bold tracking-[0.5em] uppercase shadow-black drop-shadow-md">{t.common.est} 1624</span>
            </m.div>
            
            <div className="relative mb-4 md:mb-6">
                <m.h1 
                  style={{ fontWeight: titleWeight }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 tracking-tighter leading-[0.8] drop-shadow-2xl"
                >
                    {t.hero.title}
                </m.h1>
                <m.h2 
                  style={{ x: useTransform(scrollY, [0, 500], [0, 50]) }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-display italic text-white/90 leading-tight mix-blend-overlay absolute top-full left-1 md:left-2 -mt-2 sm:-mt-4 md:-mt-8 lg:-mt-12 pointer-events-none"
                >
                    {t.hero.subtitle}
                </m.h2>
            </div>

            <div className="h-12 md:h-24"></div> {/* Spacer for subtitle overlapping */}

            <m.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              className="text-sm md:text-xl text-gray-300 mb-8 md:mb-12 max-w-xl font-light leading-relaxed border-l border-white/30 pl-6 md:pl-8 backdrop-blur-sm"
            >
                {t.hero.description}
            </m.p>
            
            <m.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 md:gap-6"
            >
                <a 
                    href="#attractions" 
                    onClick={(e) => handleScrollTo(e, 'attractions')}
                    className="group relative overflow-hidden bg-white text-black font-bold py-4 px-8 md:px-10 rounded-full transition-all duration-150 hover:bg-nyc-taxi flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] cursor-pointer"
                >
                    <span className="relative z-10 uppercase tracking-widest text-[10px] md:text-xs">{t.common.explore}</span>
                    <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform duration-150" />
                </a>
                <button className="group flex items-center justify-center gap-3 px-6 md:px-8 py-4 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all duration-150 backdrop-blur-md">
                    <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover:border-nyc-taxi group-hover:text-nyc-taxi transition-colors duration-150">
                        <Play size={10} fill="currentColor" />
                    </div>
                    <span className="tracking-widest text-[10px] md:text-xs font-bold uppercase">{t.common.watchVideo}</span>
                </button>
            </m.div>
        </m.div>
      </div>

      {/* Sound Control Button */}
      <button
        onClick={toggleMute}
        className="absolute top-24 right-6 z-20 p-3 bg-black/40 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-200 group"
        aria-label={isMuted ? "Включить звук" : "Выключить звук"}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      <div 
        onClick={(e) => handleScrollTo(e, 'about')}
        className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hover:text-white transition-colors duration-150 cursor-pointer group z-20"
      >
        <span className="text-[8px] md:text-[9px] uppercase tracking-[0.4em] opacity-0 group-hover:opacity-100 transition-opacity duration-500">{t.common.scroll}</span>
        <div className="animate-bounce">
          <ChevronDown size={18} md:size={20} />
        </div>
      </div>
    </section>
  );
};

export default Hero;