import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Use refs for positions to avoid re-renders on mousemove
  const mousePos = useRef({ x: -100, y: -100 });
  const glowPos = useRef({ x: -100, y: -100 });
  
  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setIsVisible(true);

    let rafId: number;
    let lastFrame = 0;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      // Update core cursor immediately for responsiveness
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const animateGlow = (time?: number) => {
      // 60fps throttle using timestamp from RAF
      if (time !== undefined && lastFrame && time - lastFrame < 16) {
        rafId = requestAnimationFrame(animateGlow);
        return;
      }
      lastFrame = time ?? 0;

      // Physics-based interpolation (lerp) for the glow - tuned for responsiveness without overshoot
      const ease = 0.38;
      
      glowPos.current.x += (mousePos.current.x - glowPos.current.x) * ease;
      glowPos.current.y += (mousePos.current.y - glowPos.current.y) * ease;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowPos.current.x}px, ${glowPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(animateGlow);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Detect interactive elements
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    rafId = requestAnimationFrame(animateGlow);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Glow (Flashlight effect) */}
      <div 
        ref={glowRef}
        className={`fixed pointer-events-none z-[20000] rounded-full transition-all duration-200 ease-out
          ${isHovering ? 'w-20 h-20 blur-xl opacity-40' : 'w-72 h-72 blur-3xl opacity-25'}
        `}
        style={{ 
          top: 0, 
          left: 0,
          background: 'radial-gradient(circle, rgba(250,204,21,0.6) 0%, rgba(251,191,36,0.3) 40%, rgba(217,119,6,0.1) 100%)'
        }}
      />
      
      {/* Core Dot */}
      <div 
        ref={cursorRef}
        className={`fixed pointer-events-none z-[20001] rounded-full bg-gradient-to-br from-nyc-taxi via-yellow-400 to-amber-500 transition-[width,height,opacity] duration-75 ease-linear
          ${isHovering ? 'w-5 h-5 opacity-60' : 'w-2.5 h-2.5 opacity-100'}
        `}
        style={{ 
          top: 0, 
          left: 0, 
          willChange: 'transform',
          boxShadow: '0 0 20px rgba(250,204,21,0.8), 0 0 40px rgba(250,204,21,0.4), 0 0 60px rgba(250,204,21,0.2)'
        }}
      />
    </>
  );
};