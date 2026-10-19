import React, { useRef, useEffect } from 'react';
import { Compass } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { VideoConfig } from '../types';
import { Scene3D } from './Scene3D';
import { VideoBackground } from './VideoBackground';
import { gsap, prefersReducedMotion } from '../utils/animations';

interface HeroProps {
  videoConfig: VideoConfig;
  explodeAmount: number;
  setExplodeAmount: (val: number) => void;
  wireframe: boolean;
  setWireframe: (val: boolean | ((prev: boolean) => boolean)) => void;
  lightIntensity: number;
  setLightIntensity: (val: number) => void;
  autoRotate: boolean;
  setAutoRotate: (val: boolean | ((prev: boolean) => boolean)) => void;
  reducedMotion: boolean;
  setReducedMotion: (val: boolean | ((prev: boolean) => boolean)) => void;
  onExploreClick: () => void;
  onConnectClick?: () => void;
  onResumeClick?: () => void;
  onOpenSettings?: () => void;
  onTogglePlay?: () => void;
  onToggleScrollScrub?: () => void;
  hasExternalVideoBackground?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  videoConfig,
  explodeAmount,
  wireframe,
  lightIntensity,
  autoRotate,
  reducedMotion,
  onExploreClick,
  hasExternalVideoBackground = false,
}) => {
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const threeWrapperRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLAnchorElement>(null);

  // GSAP ScrollTrigger Entrance & Soft Eye-Friendly Scroll Exit
  useEffect(() => {
    if (prefersReducedMotion() || reducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Initial Hero Entrance Animation
      const enterTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      enterTl
        .fromTo(
          kickerRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.1 }
        )
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 30, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: 'power4.out' },
          '-=0.5'
        )
        .fromTo(
          subtextRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9 },
          '-=0.7'
        )
        .fromTo(
          ctaGroupRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          '-=0.5'
        );

      // 2. Cinematic, Velvet-Smooth Scroll Exit Timeline
      // Uses power1.inOut damping so scrolling down or suddenly going upward never causes harsh flashes or eye strain
      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.4,
          invalidateOnRefresh: true,
        },
      });

      // Foreground content: smoothly translates upward and gently fades
      exitTl.to(
        heroContentRef.current,
        {
          y: -110,
          opacity: 0,
          scale: 0.96,
          ease: 'power1.inOut',
        },
        0
      );

      // Video background: gradual, cushioned dimming without abrupt cuts or blinding light
      exitTl.to(
        videoWrapperRef.current,
        {
          y: 70,
          scale: 1.04,
          opacity: 0.2,
          filter: 'brightness(0.65) contrast(1.0)',
          ease: 'power1.inOut',
        },
        0
      );

      // 3D scene container: smooth soft parallax
      exitTl.to(
        threeWrapperRef.current,
        {
          y: 50,
          scale: 0.97,
          opacity: 0.4,
          ease: 'power1.inOut',
        },
        0
      );
    }, heroSectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="hero"
      ref={heroSectionRef}
      className={`relative w-full h-screen min-h-[640px] flex items-center justify-center overflow-hidden ${
        hasExternalVideoBackground ? 'bg-transparent' : 'bg-[#080808]'
      }`}
    >
      {/* Video Background Layer with Eye-Comfort Scrims (only rendered internally if not external) */}
      {!hasExternalVideoBackground && videoConfig.mode !== '3d-pure' && (
        <div ref={videoWrapperRef} className="absolute inset-0 w-full h-full pointer-events-none">
          <VideoBackground
            config={videoConfig}
            scrollProgress={0}
          />
        </div>
      )}

      {/* Interactive 3D Canvas Layer */}
      {videoConfig.mode !== 'video-pure' && (
        <div
          ref={threeWrapperRef}
          className="absolute inset-0 w-full h-full z-10 pointer-events-none"
        >
          <Scene3D
            explodeAmount={explodeAmount}
            wireframe={wireframe}
            lightIntensity={lightIntensity}
            autoRotate={autoRotate}
            reducedMotion={reducedMotion}
          />
        </div>
      )}

      {/* Soft gradient floor: if external video is present, keep it subtle so video seamlessly flows into About */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-44 pointer-events-none z-15 ${
          hasExternalVideoBackground
            ? 'bg-gradient-to-t from-transparent via-[#080808]/20 to-transparent'
            : 'bg-gradient-to-t from-[#080808] via-[#080808]/75 to-transparent'
        }`}
      />

      {/* Foreground Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 w-full pointer-events-none">
        <div ref={heroContentRef} className="max-w-3xl pointer-events-auto origin-top-left">
          {/* Small label kicker */}
          <div
            ref={kickerRef}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#16161a]/90 border border-[#2a2a30] text-[#FF6B35] font-mono text-xs tracking-widest uppercase mb-4 shadow-sm backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] animate-pulse" />
            <span>{PERSONAL_INFO.label}</span>
          </div>

          {/* User Name in Bigger and Bold Cursive Text */}
          <div className="overflow-visible mb-4">
            <h1
              ref={headlineRef}
              className="font-cursive text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white tracking-wide leading-[1.15] sm:leading-[1.1] pb-1 select-none drop-shadow-[0_4px_30px_rgba(255,107,53,0.35)]"
            >
              {PERSONAL_INFO.name}
            </h1>
          </div>

          {/* Supporting data requested by user */}
          <p
            ref={subtextRef}
            className="text-base sm:text-lg lg:text-xl text-neutral-300 font-light leading-relaxed max-w-2xl mb-8"
          >
            {PERSONAL_INFO.subtext}
          </p>

          {/* Single clean CTA: Explore My Work only */}
          <div ref={ctaGroupRef} className="flex items-center gap-4">
            <button
              onClick={onExploreClick}
              className="px-6 py-3.5 bg-[#FF6B35] hover:bg-[#ff7b47] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center gap-2.5 shadow-lg shadow-[#FF6B35]/25 hover:shadow-[#FF6B35]/40 hover:-translate-y-0.5 cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>Explore My Work</span>
            </button>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <a
        ref={scrollIndicatorRef}
        href="#about"
        className="absolute bottom-6 left-6 z-20 pointer-events-auto hidden md:flex items-center gap-3 text-xs font-mono text-neutral-400 hover:text-white transition-colors uppercase tracking-widest"
        aria-label="Scroll to About section"
      >
        <div className="w-5 h-9 rounded-full border border-neutral-600 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-[#FF6B35] animate-bounce" />
        </div>
        <span>Scroll to Explore</span>
      </a>
    </section>
  );
};

export default Hero;
