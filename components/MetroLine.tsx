import React, { useState, useEffect } from 'react';
import { m, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

export const MetroLine: React.FC = () => {
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll();
  const [activeStation, setActiveStation] = useState<string | null>(null);
  
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const stations = [
    { id: 'hero', label: t.metro.grandCentral, sub: t.metro.start },
    { id: 'stats', label: t.metro.dataCenter, sub: t.metro.stats },
    { id: 'attractions', label: t.metro.landmarks, sub: t.metro.attractions },
    { id: 'neighborhoods', label: t.metro.districts, sub: t.metro.neighborhoods },
    { id: 'culture', label: t.metro.artsSoul, sub: t.metro.culture },
    { id: 'culinary', label: t.metro.foodHall, sub: t.metro.culinary },
    { id: 'transport', label: t.metro.transitHub, sub: t.metro.transport },
    { id: 'history', label: t.metro.archives, sub: t.metro.history }
  ];

  const [stationPositions, setStationPositions] = useState<number[]>(stations.map((_, i) => i / (stations.length - 1)));

  useEffect(() => {
    const calculatePositions = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const positions = stations.map(station => {
        const el = document.getElementById(station.id);
        if (!el) return 0;
        const rect = el.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const offsetTop = rect.top + scrollTop;
        return Math.min(Math.max(offsetTop / scrollHeight, 0), 1);
      });
      setStationPositions(positions);
    };

    calculatePositions();
    
    const observer = new ResizeObserver(calculatePositions);
    observer.observe(document.body);

    window.addEventListener('resize', calculatePositions);
    window.addEventListener('load', calculatePositions);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', calculatePositions);
      window.removeEventListener('load', calculatePositions);
    };
  }, [t]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(v => {
      // Find the station that is currently most "in view" or the last one we passed
      let current = stations[0].id;
      for (let i = 0; i < stationPositions.length; i++) {
        if (v >= stationPositions[i] - 0.05) {
          current = stations[i].id;
        }
      }
      setActiveStation(current);
    });
    return () => unsubscribe();
  }, [scrollYProgress, stationPositions]);

  return (
    <div className="fixed top-0 left-8 w-16 h-full z-[9999] pointer-events-none hidden xl:flex flex-col items-center py-20">
      {/* Line Header - Subway Style */}
      <m.div 
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.1 }}
        className="w-12 h-12 rounded-full bg-nyc-taxi flex items-center justify-center text-black font-black text-2xl mb-6 shadow-[0_0_30px_rgba(250,204,21,0.6)] border-4 border-black pointer-events-auto cursor-help relative group"
      >
        A
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black text-nyc-taxi text-[8px] px-2 py-1 rounded border border-nyc-taxi/30 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-bold uppercase tracking-widest">
          Atmosphere Line
        </div>
      </m.div>

      <div className="relative flex-1 w-px">
        {/* Track Background with "Sleepers" effect */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[4px] bg-white/5 rounded-full overflow-hidden">
          <div className="h-full w-full opacity-20" style={{ backgroundImage: 'linear-gradient(to bottom, transparent 0%, transparent 80%, white 80%, white 100%)', backgroundSize: '1px 10px' }} />
        </div>
        
        {/* Active Track with Glow */}
        <m.div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] bg-nyc-taxi origin-top"
          style={{ 
            scaleY, 
            boxShadow: '0 0 20px rgba(250,204,21,0.8), 0 0 40px rgba(250,204,21,0.2)' 
          }}
        />

        {/* Stations */}
        {stations.map((station, i) => {
          const isActive = activeStation === station.id;
          const pos = stationPositions[i];
          return (
            <div 
              key={station.id}
              className="absolute left-1/2 -translate-x-1/2 flex items-center group pointer-events-auto cursor-pointer"
              style={{ top: `${pos * 100}%` }}
              onClick={() => scrollTo(station.id)}
            >
              {/* Station Marker - Hub Style */}
              <m.div 
                animate={{ 
                  scale: isActive ? 1.4 : 1,
                  backgroundColor: isActive ? "#fbbf24" : "#18181b",
                  borderColor: isActive ? "#000" : "rgba(255, 255, 255, 0.3)",
                  boxShadow: isActive ? "0 0 15px #fbbf24" : "none"
                }}
                className={`w-4 h-4 rounded-full border-2 z-10 transition-all duration-500 flex items-center justify-center`}
              >
                {isActive && <div className="w-1.5 h-1.5 bg-black rounded-full animate-ping" />}
              </m.div>

              {/* Label Container - Digital Display Style */}
              <div className="absolute left-8 flex flex-col opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                <div className="bg-black/90 backdrop-blur-xl border border-white/10 p-3 rounded-lg shadow-2xl min-w-[140px]">
                  <span className="text-[9px] font-black text-nyc-taxi uppercase tracking-[0.2em] mb-1 block">
                    {station.sub}
                  </span>
                  <span className="text-sm font-bold text-white whitespace-nowrap block border-b border-white/5 pb-1 mb-1">
                    {station.label}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[8px] text-white/40 uppercase font-medium">{t.metro.onTime}</span>
                  </div>
                </div>
              </div>

              {/* Active Indicator Glow */}
              <AnimatePresence>
                {isActive && (
                  <m.div 
                    layoutId="active-glow"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="absolute -inset-4 bg-nyc-taxi/10 rounded-full blur-xl -z-10"
                  />
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {/* Moving Train Car - Detailed Version */}
        <m.div 
          className="absolute left-1/2 -translate-x-1/2 w-2 h-12 z-20"
          style={{ 
            top: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
          }}
        >
          {/* Train Body */}
          <div className="w-full h-full bg-white rounded-sm shadow-[0_0_25px_rgba(255,255,255,0.6)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-nyc-taxi" />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-nyc-taxi" />
            {/* Windows */}
            <div className="flex flex-col justify-around h-full py-2 px-0.5">
              <div className="w-full h-1 bg-black/20" />
              <div className="w-full h-1 bg-black/20" />
              <div className="w-full h-1 bg-black/20" />
            </div>
          </div>
          
          {/* Digital "Next Stop" Display */}
          <m.div 
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-zinc-900 border border-nyc-taxi/40 px-3 py-1.5 rounded shadow-2xl pointer-events-none"
            style={{ 
              opacity: useTransform(scrollYProgress, [0, 0.02], [0, 1]),
              x: useTransform(scrollYProgress, [0, 1], [0, 5])
            }}
          >
            <div className="text-[7px] text-nyc-taxi/60 uppercase font-black tracking-tighter leading-none mb-0.5">{t.metro.nextStop}</div>
            <div className="text-[10px] text-white font-bold uppercase tracking-wider whitespace-nowrap">
              {stations.find(s => s.id === activeStation)?.label || t.metro.inTransit}
            </div>
          </m.div>
        </m.div>
      </div>

      {/* Service Status Footer */}
      <m.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 flex flex-col items-center gap-2"
      >
        <div className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full border border-white/5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
          <span className="text-[8px] text-white/60 font-bold uppercase tracking-[0.2em]">{t.metro.goodService}</span>
        </div>
        <div className="text-[7px] text-white/20 uppercase tracking-[0.4em] vertical-text mt-4">
          NYC Atmosphere Line
        </div>
      </m.div>
    </div>
  );
};
