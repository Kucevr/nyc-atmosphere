import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { Reveal } from './Reveal';
import { useLanguage } from '../contexts/LanguageContext';

const History: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stationRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stationPositions = useRef<number[]>([]); 
  
  const [lineHeight, setLineHeight] = useState(0);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  
  // Use refs for throttling scroll updates
  const lastUpdateTime = useRef<number>(0);
  const rafId = useRef<number>();

  // Configuration for track positioning
  const getTrackPosition = useCallback((trackId: number) => {
    if (trackId === 1) return '25%';
    if (trackId === 2) return '50%';
    if (trackId === 3) return '75%';
    return '50%';
  }, []);

  // Optimized position calculation
  const calculatePositions = useCallback(() => {
    const positions: number[] = [];
    stationRefs.current.forEach((el) => {
      if (el) {
        const rect = el.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        positions.push(rect.top + scrollTop);
      } else {
        positions.push(0);
      }
    });
    stationPositions.current = positions;
  }, []);

  useEffect(() => {
    // Throttled scroll handler for better performance
    const handleScroll = () => {
      const now = performance.now();
      
      // Throttle to ~60fps (16ms)
      if (now - lastUpdateTime.current < 16) return;
      lastUpdateTime.current = now;

      if (!sectionRef.current || !containerRef.current) return;

      const windowHeight = window.innerHeight;
      const sectionTop = sectionRef.current.offsetTop;
      const scrollY = window.scrollY;
      
      const triggerPoint = scrollY + (windowHeight * 0.60);
      const relativeY = triggerPoint - sectionTop;
      
      const maxStringLength = containerRef.current.offsetHeight;
      const currentHeight = Math.max(0, Math.min(relativeY, maxStringLength));
      
      setLineHeight(currentHeight);

      // Optimized collision detection
      const newActiveIndices: number[] = [];
      const positions = stationPositions.current;

      for (let i = 0; i < positions.length; i++) {
        if (triggerPoint > positions[i] - 50) {
          newActiveIndices.push(i);
        }
      }

      setActiveIndices(prev => {
        if (prev.length !== newActiveIndices.length) return newActiveIndices;
        return prev[prev.length - 1] === newActiveIndices[newActiveIndices.length - 1] ? prev : newActiveIndices;
      });
    };

    const onScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(handleScroll);
    };

    const onResize = () => {
      calculatePositions();
      onScroll();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    
    setTimeout(() => {
      calculatePositions();
      onScroll();
    }, 100);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [calculatePositions]);

  const tracks = useMemo(() => t.history.tracks, [t.history.tracks]);
  const events = useMemo(() => t.history.events, [t.history.events]);

  return (
    <section id="history" ref={sectionRef} className="py-20 md:py-32 bg-nyc-black relative overflow-hidden optimize-visibility" style={{ containIntrinsicSize: '1px 2500px' }}>
      {/* Dynamic Background Noise */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>
      
      {/* Ambient Glows (lighter blur) */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-red-900/10 rounded-full blur-[48px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-900/10 rounded-full blur-[48px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <Reveal variant="zoom">
          <div className="mb-16 md:mb-24 text-center">
            <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 mb-6 bg-white/5 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                 <span className="w-2 h-2 bg-nyc-subway rounded-full animate-[pulse_2s_infinite]"></span>
                 <span className="text-white font-bold tracking-[0.2em] text-[10px] uppercase">
                    {t.labels.timeline}
                 </span>
            </div>
            <h2 className="text-4xl md:text-8xl font-serif font-bold text-white tracking-tighter leading-none mb-6 md:mb-8">
              {t.history.title}
            </h2>
            
            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-8 p-3 md:p-4 bg-zinc-900/50 backdrop-blur-sm rounded-2xl inline-flex border border-white/5">
              {tracks.map((track) => (
                <div key={track.id} className="flex items-center gap-2 md:gap-3">
                  <span className="relative flex h-2.5 w-2.5 md:h-3 md:w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: track.color }}></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 md:h-3 md:w-3" style={{ backgroundColor: track.color }}></span>
                  </span>
                  <span className="text-[9px] md:text-xs text-gray-300 font-bold uppercase tracking-widest">{track.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative min-h-[1500px] md:min-h-[2000px]">
          
          {/* 1. Ghost Tracks (Background) */}
          <div className="absolute top-0 bottom-0 left-0 right-0 hidden md:block pointer-events-none">
            {tracks.map((track) => (
               <div 
                 key={track.id}
                 className="absolute top-0 bottom-0 w-1.5 rounded-full bg-zinc-800/50"
                 style={{ 
                   left: `calc(${getTrackPosition(track.id)} - 3px)`,
                 }}
               ></div>
            ))}
          </div>

          {/* 2. Active Lines (Foreground) */}
          <div className="absolute top-0 left-0 right-0 hidden md:block pointer-events-none z-0">
             {tracks.map((track) => (
               <div 
                 key={track.id}
                 className="absolute top-0 w-1.5 rounded-full will-change-transform" // Optimized: Removed transition to use direct style updates via RAF
                 style={{ 
                   left: `calc(${getTrackPosition(track.id)} - 3px)`,
                   backgroundColor: track.color,
                   height: `${lineHeight}px`,
                   boxShadow: `0 0 15px ${track.color}40, 0 0 30px ${track.color}20`
                 }}
               >
                 {/* The Train Head / Sparks Effect */}
                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-8 h-8 z-10 flex items-center justify-center hardware-accelerated">
                    {/* Core Glow */}
                    <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,1)] z-20"></div>
                    {/* Spark Particles */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-6 bg-white/80 rotate-45 animate-spin blur-[1px]"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-6 bg-white/80 -rotate-45 animate-spin blur-[1px]" style={{ animationDirection: 'reverse', animationDuration: '3s' }}></div>
                    {/* Large Halo */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/10 blur-xl"></div>
                 </div>
               </div>
            ))}
          </div>
          
          {/* Mobile Track (Single Line) */}
          <div className="absolute left-[19px] top-0 h-full w-1 bg-zinc-800 md:hidden rounded-full">
             <div 
                className="absolute top-0 left-0 w-full rounded-full will-change-transform bg-gradient-to-b from-nyc-taxi to-orange-500"
                style={{ height: `${lineHeight}px`, maxHeight: '100%' }}
             >
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_10px_white]"></div>
             </div>
          </div>

          <div className="space-y-24 py-12">
            {events.map((event, idx) => {
               const trackId = event.track || 2;
               const trackColor = tracks.find(tr => tr.id === trackId)?.color || '#fff';
               const isActive = activeIndices.includes(idx);

               // Layout logic
               const isCenterTrack = trackId === 2;
               const isLeftTrack = trackId === 1;
               const isRightTrack = trackId === 3;

               return (
                <div 
                    key={idx} 
                    className="relative flex flex-col md:block history-station scroll-mt-48"
                    ref={(el) => { stationRefs.current[idx] = el; }}
                >
                    
                    {/* Desktop Layout Container */}
                    <div className={`hidden md:flex flex-col relative ${isCenterTrack ? 'items-center' : ''}`}
                         style={{
                           alignItems: isLeftTrack ? 'flex-end' : isRightTrack ? 'flex-start' : (idx % 2 === 0 ? 'flex-start' : 'flex-end'),
                           width: isCenterTrack ? '50%' : '25%',
                           marginLeft: isCenterTrack ? '25%' : isRightTrack ? '75%' : '0',
                         }}
                    >
                       {/* Connection Line to Track */}
                       <div 
                         className={`absolute h-[1px] transition-all duration-600 ease-out origin-center ${isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`}
                         style={{
                            top: '24px',
                            backgroundColor: trackColor,
                            width: '60px',
                            [isLeftTrack ? 'right' : 'left']: '0',
                            transform: isLeftTrack ? 'translateX(100%)' : 'translateX(-100%)',
                            display: isCenterTrack ? 'none' : 'block',
                            boxShadow: `0 0 10px ${trackColor}`
                         }}
                       ></div>

                       {/* The Card */}
                       <div 
                            className={`
                                relative p-8 transition-all duration-300 w-full max-w-sm group rounded-xl border backdrop-blur-md
                                ${isActive 
                                    ? 'translate-y-0 opacity-100 border-white/20 bg-zinc-900/80 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] scale-100' 
                                    : 'translate-y-8 opacity-20 border-transparent scale-98'
                                }
                                ${isLeftTrack ? 'mr-16 text-right' : ''}
                                ${isRightTrack ? 'ml-16 text-left' : ''}
                                ${isCenterTrack ? (idx % 2 === 0 ? 'ml-16 text-left' : 'mr-16 text-right') : ''}
                            `}
                            style={{
                              willChange: isActive ? 'auto' : 'transform, opacity'
                            }}
                        >
                              <div className="flex items-center gap-3 mb-3 justify-end" style={{ flexDirection: (isLeftTrack || (isCenterTrack && idx % 2 !== 0)) ? 'row' : 'row-reverse' }}>
                                 <div className="text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-300" style={{ color: isActive ? trackColor : '#555' }}>
                                    {tracks.find(t => t.id === trackId)?.name}
                                 </div>
                                 <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'animate-pulse' : ''}`} style={{ backgroundColor: trackColor }}></div>
                              </div>

                              <h3 className={`text-3xl font-serif font-bold text-white mb-3 transition-colors duration-300`}>{event.title}</h3>
                              <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">{event.desc}</p>
                           </div>
                    </div>


                    {/* Station Dot on the Line (Desktop) */}
                    <div 
                        className={`hidden md:flex absolute w-12 h-12 rounded-full items-center justify-center z-20 transition-all duration-300 ease-out
                             ${isActive ? 'scale-100 opacity-100 shadow-[0_0_30px_currentColor]' : 'scale-0 opacity-0'}
                        `}
                        style={{
                            top: '0',
                            left: `calc(${getTrackPosition(trackId)} - 24px)`,
                            backgroundColor: '#000',
                            border: `3px solid ${trackColor}`,
                            color: trackColor,
                            willChange: isActive ? 'auto' : 'transform, opacity'
                        }}
                    >
                         <div className="font-bold font-sans text-[10px] text-white">
                            {event.year}
                         </div>
                    </div>

                    {/* Mobile Layout */}
                    <div className="md:hidden pl-12 relative pb-16">
                         {/* Mobile Station Dot */}
                         <div 
                            className={`absolute left-[5px] top-1 w-8 h-8 bg-black border-[2px] rounded-full flex items-center justify-center z-20 transition-all duration-300 ${isActive ? 'scale-110 shadow-[0_0_15px_rgba(255,255,255,0.5)] border-white' : 'scale-90 border-zinc-700'}`}
                            style={{ borderColor: isActive ? trackColor : undefined }}
                         >
                             <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${isActive ? 'bg-white' : 'bg-zinc-700'}`}></div>
                         </div>
                         
                         <div className={`transition-all duration-500 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-30 translate-x-4'}`}>
                                <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-wider mb-3 backdrop-blur-sm" style={{ color: trackColor }}>
                                    {event.year} • {tracks.find(t => t.id === trackId)?.name}
                                </span>
                                <h3 className="text-2xl font-serif font-bold text-white mb-2">{event.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed border-l-2 border-zinc-800 pl-4">{event.desc}</p>
                         </div>
                    </div>

                </div>
              );
            })}
          </div>

          {/* End of Line Marker */}
          <div className="relative flex justify-center mt-24 pb-24">
             <div className="group bg-black/50 backdrop-blur-xl border border-white/10 px-8 py-4 rounded-full text-xs text-white uppercase tracking-[0.2em] flex items-center gap-4 hover:border-white/30 transition-colors cursor-default">
                <div className="flex -space-x-3 group-hover:-space-x-1 transition-all duration-500">
                    {tracks.map(t => (
                        <div key={t.id} className="w-6 h-6 rounded-full border-2 border-black flex items-center justify-center text-[8px] font-bold" style={{ backgroundColor: t.color }}>
                            {t.id}
                        </div>
                    ))}
                </div>
                <span>History Continues...</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(History);