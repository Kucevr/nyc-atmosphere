import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

const Soundscape: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true);
  const { scrollYProgress } = useScroll();

  // Audio refs
  const transportAudio = useRef<HTMLAudioElement>(null);
  const culinaryAudio = useRef<HTMLAudioElement>(null);
  const historyAudio = useRef<HTMLAudioElement>(null);
  const ambientAudio = useRef<HTMLAudioElement>(null);

  // Volume mapping based on scroll progress
  // Assuming sections are roughly at these scroll points:
  // Transport: 0.6 - 0.8
  // Culinary: 0.4 - 0.6
  // History: 0.8 - 1.0
  
  const transportVol = useTransform(scrollYProgress, [0.5, 0.65, 0.8, 0.9], [0, 0.5, 0.5, 0]);
  const culinaryVol = useTransform(scrollYProgress, [0.3, 0.45, 0.6, 0.75], [0, 0.5, 0.5, 0]);
  const historyVol = useTransform(scrollYProgress, [0.75, 0.85, 0.95, 1.0], [0, 0.5, 0.5, 0]);

  useEffect(() => {
    const updateVolumes = () => {
      if (isMuted) {
        [transportAudio, culinaryAudio, historyAudio, ambientAudio].forEach(ref => {
          if (ref.current) ref.current.volume = 0;
        });
        return;
      }

      // Smoothly update volumes using framer-motion's get()
      if (transportAudio.current) transportAudio.current.volume = transportVol.get();
      if (culinaryAudio.current) culinaryAudio.current.volume = culinaryVol.get();
      if (historyAudio.current) historyAudio.current.volume = historyVol.get();
      if (ambientAudio.current) ambientAudio.current.volume = 0.1; 
    };

    // Use a requestAnimationFrame loop for smoother volume transitions
    let rafId: number;
    const loop = () => {
      updateVolumes();
      rafId = requestAnimationFrame(loop);
    };
    
    if (!isMuted) {
      rafId = requestAnimationFrame(loop);
    }

    return () => cancelAnimationFrame(rafId);
  }, [isMuted, transportVol, culinaryVol, historyVol]);

  const toggleMute = () => {
    const newState = !isMuted;
    setIsMuted(newState);
    
    // Start playing on first interaction
    const audios = [transportAudio, culinaryAudio, historyAudio, ambientAudio];
    audios.forEach(ref => {
      if (ref.current) {
        if (!newState) {
          ref.current.play().catch(e => console.log("Audio play blocked", e));
        } else {
          ref.current.pause();
        }
      }
    });
  };

  return (
    <>
      {/* Audio Elements */}
      <audio ref={ambientAudio} src="/audio/ambient_city.mp3" loop preload="none" />
      <audio ref={transportAudio} src="/audio/subway_ambience.mp3" loop preload="none" />
      <audio ref={culinaryAudio} src="/audio/cafe_ambience.mp3" loop preload="none" />
      <audio ref={historyAudio} src="/audio/jazz_ambience.mp3" loop preload="none" />

      {/* Equalizer / Mute Button */}
      <div className="fixed bottom-8 left-8 z-[10000] flex items-center gap-4">
        <button 
          onClick={toggleMute}
          className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 hover:border-nyc-taxi transition-all duration-300"
        >
          {isMuted ? (
            <VolumeX size={18} className="text-white/60 group-hover:text-nyc-taxi" />
          ) : (
            <div className="flex items-end gap-[2px] h-4">
              {[0.6, 0.8, 0.4, 1, 0.5].map((h, i) => (
                <motion.div
                  key={i}
                  animate={{ height: ["20%", "100%", "20%"] }}
                  transition={{ 
                    duration: 0.5 + Math.random(), 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-[2px] bg-nyc-taxi"
                />
              ))}
            </div>
          )}
          
          {/* Tooltip */}
          <span className="absolute left-full ml-4 px-3 py-1 bg-black/80 text-[10px] text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/5">
            {isMuted ? 'Unmute Atmosphere' : 'Mute Atmosphere'}
          </span>
        </button>
      </div>
    </>
  );
};

export default Soundscape;