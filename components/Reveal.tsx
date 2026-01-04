import React from 'react';
import { m } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  width?: 'fit-content' | '100%';
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  variant?: 'slide' | 'zoom' | 'fade';
  className?: string;
}

export const Reveal: React.FC<RevealProps> = React.memo(({
  children, 
  width = '100%', 
  delay = 0, 
  direction = 'up',
  variant = 'slide',
  className = '' 
}) => {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
      scale: variant === 'zoom' ? 0.9 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: delay / 1000,
        ease: [0.22, 1, 0.36, 1], // Premium cubic-bezier
      },
    },
  };

  return (
    <div style={{ width, position: 'relative' }} className={className}>
      <m.div
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className={`${width === '100%' ? 'w-full' : ''} ${className.includes('h-full') ? 'h-full' : ''}`}
        style={{ height: className.includes('h-full') ? '100%' : 'auto' }}
      >
        {children}
      </m.div>
    </div>
  );
});