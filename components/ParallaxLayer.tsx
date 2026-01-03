import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ParallaxLayerProps {
  children: React.ReactNode;
  distance?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  opacityRange?: [number, number];
}

export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({ 
  children, 
  distance = 100, 
  direction = 'up',
  className = '',
  opacityRange = [1, 1]
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  
  const xRange = direction === 'left' ? [distance, -distance] : direction === 'right' ? [-distance, distance] : [0, 0];
  const yRange = direction === 'up' ? [distance, -distance] : direction === 'down' ? [-distance, distance] : [0, 0];

  const x = useSpring(useTransform(scrollYProgress, [0, 1], xRange), springConfig);
  const y = useSpring(useTransform(scrollYProgress, [0, 1], yRange), springConfig);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, opacityRange[0], opacityRange[1], 0]);

  return (
    <motion.div
      ref={ref}
      style={{ x, y, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
};