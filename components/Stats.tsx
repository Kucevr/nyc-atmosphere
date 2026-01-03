import React, { useState, useEffect, useRef } from 'react';
import { Reveal } from './Reveal';
import { useLanguage } from '../contexts/LanguageContext';

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, className }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Parse the input string (e.g., "8.4M" -> number: 8.4, suffix: "M")
  const match = value.match(/^([\d.]+)(.*)$/);
  const targetNumber = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : '';
  const isFloat = match ? match[1].includes('.') : false;

  useEffect(() => {
    // Prevent creating observer if already animated
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true);
          observer.disconnect(); // Immediately disconnect to save resources
          
          let startTimestamp: number | null = null;
          const duration = 2000; // 2 seconds animation

          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // Ease out quart
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            
            const currentVal = easeProgress * targetNumber;
            setDisplayValue(currentVal);

            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setDisplayValue(targetNumber);
            }
          };

          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [targetNumber, hasAnimated]);

  const formattedValue = isFloat ? displayValue.toFixed(1) : Math.round(displayValue).toString();

  return (
    <span ref={elementRef} className={className}>
      {hasAnimated ? formattedValue : '0'}{suffix}
    </span>
  );
};

const Stats: React.FC = () => {
  const { t } = useLanguage();

  const stats = [
    t.stats.residents,
    t.stats.languages,
    t.stats.stations,
    t.stats.buildings
  ];

  return (
    <section id="stats" className="relative bg-nyc-black py-16 md:py-24 border-y border-white/5 overflow-hidden optimize-visibility" style={{ containIntrinsicSize: '1px 400px' }}>
      {/* Abstract Grid Background */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, idx) => (
            <Reveal key={idx} delay={idx * 100} direction="up">
              <div className="text-center group cursor-default">
                <div className="text-[10px] font-bold text-nyc-taxi uppercase tracking-[0.3em] mb-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-0 md:translate-y-2 group-hover:translate-y-0">
                    {stat.sub}
                </div>
                <div className="text-4xl sm:text-5xl md:text-7xl font-sans font-bold text-white mb-2 tracking-tighter group-hover:scale-110 transition-transform duration-400 ease-out font-variant-numeric tabular-nums">
                    <AnimatedCounter value={stat.val} />
                </div>
                <div className="text-[10px] md:text-sm text-gray-500 uppercase tracking-widest font-medium border-t border-zinc-800 pt-4 mt-2 inline-block w-full max-w-[80px] md:max-w-[100px] group-hover:border-nyc-taxi transition-colors duration-500">
                    {stat.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Stats);