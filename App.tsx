import React, { useEffect, lazy, Suspense } from 'react';
import { m, useScroll, useTransform, LazyMotion, domMax } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import { Reveal } from './components/Reveal';
import { ParallaxLayer } from './components/ParallaxLayer';
import { CustomCursor } from './components/CustomCursor';
import Soundscape from './components/Soundscape';
import { MetroLine } from './components/MetroLine';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Lazy load heavy components
const Attractions = lazy(() => import('./components/Attractions'));
const Neighborhoods = lazy(() => import('./components/Neighborhoods'));
const Culture = lazy(() => import('./components/Culture'));
const Culinary = lazy(() => import('./components/Culinary'));
const Transport = lazy(() => import('./components/Transport'));
const History = lazy(() => import('./components/History'));
const Footer = lazy(() => import('./components/Footer'));

// Loading fallback
const SectionLoader = () => (
  <div className="w-full h-96 flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-nyc-taxi border-t-transparent rounded-full animate-spin" />
  </div>
);

// Create a wrapper component to use the hook
const Content = () => {
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll();
  
  // Variable font weight based on scroll (Disable on mobile to avoid forced reflows)
  const isMobile = typeof window !== 'undefined' ? window.matchMedia("(max-width: 768px)").matches : false;
  const fontWeight = useTransform(scrollYProgress, [0, 1], isMobile ? [700, 700] : [400, 900]);

  return (
    <LazyMotion features={domMax}>
      <div className="min-h-screen bg-nyc-black text-gray-100 selection:bg-nyc-taxi selection:text-black overflow-x-hidden">
        <div className="grain-overlay"></div>
        <CustomCursor />
        <Soundscape />
        <MetroLine />
        <Navbar />
        <Analytics />
        <SpeedInsights />
        <main className="relative">
          <Hero />
          
          <Stats />
          
          {/* Intro Text Section */}
          <section id="about" className="py-12 md:py-24 px-6 max-w-4xl mx-auto text-center optimize-visibility" style={{ containIntrinsicSize: '1px 300px' }}>
            <Reveal>
              <m.h2 
                style={{ fontWeight }}
                className="text-2xl md:text-5xl font-serif text-white mb-4 md:mb-8 leading-tight"
              >
                {t.about.title}
                <span className="italic text-nyc-taxi">{t.about.titleHighlight}</span>
                {t.about.titleSuffix}
              </m.h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-sm md:text-xl text-gray-400 leading-relaxed font-light">
                {t.about.description}
              </p>
            </Reveal>
          </section>

          <Suspense fallback={<SectionLoader />}>
            <Attractions />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <Neighborhoods />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <Culture />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <Culinary />
          </Suspense>
          
          {/* Divider with Parallax */}
          <div className="h-64 md:h-[500px] w-full relative flex items-center justify-center overflow-hidden optimize-visibility" style={{ containIntrinsicSize: '1px 500px' }}>
            <div 
              className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center"
              style={{ 
                transform: 'translateZ(0)',
                willChange: 'transform',
                backgroundAttachment: 'scroll'
              }}
            ></div>
            <div className="absolute inset-0 bg-black/40"></div>
            <ParallaxLayer distance={50} direction="down">
              <div className="relative z-10 p-6 md:p-8">
                <h3 className="text-4xl md:text-8xl font-serif text-white font-bold italic tracking-tighter drop-shadow-2xl">
                  {t.about.parallaxTitle}
                </h3>
              </div>
            </ParallaxLayer>
          </div>

          <Suspense fallback={<SectionLoader />}>
            <Transport />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <History />
          </Suspense>

        </main>
        <Suspense fallback={<SectionLoader />}>
          <Footer />
        </Suspense>
      </div>
    </LazyMotion>
  );
};

function App() {
  // Start from top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LanguageProvider>
      <Content />
    </LanguageProvider>
  );
}

export default App;