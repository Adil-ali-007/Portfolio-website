import React, { useRef, useEffect } from 'react';
import { GraduationCap } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { gsap, prefersReducedMotion } from '../utils/animations';

interface AboutProps {
  onResumeClick?: () => void;
  hasContinuousVideoBackground?: boolean;
}

export const About: React.FC<AboutProps> = ({
  hasContinuousVideoBackground = false,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const titleMaskRef = useRef<HTMLDivElement>(null);
  const titleTextRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const educationCardRef = useRef<HTMLDivElement>(null);
  const ambientGlowRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger Animations for About Section
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Ambient Background Parallax Glow
      if (ambientGlowRef.current) {
        gsap.to(ambientGlowRef.current, {
          y: 80,
          opacity: 0.6,
          scale: 1.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }

      // 2. Masked Heading & Intro Text Reveal
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      headerTl
        .fromTo(
          kickerRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
        )
        .fromTo(
          titleTextRef.current,
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1, ease: 'power4.out' },
          '-=0.4'
        )
        .fromTo(
          bioRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(
          educationCardRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.5'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`relative py-28 sm:py-36 overflow-hidden transition-colors ${
        hasContinuousVideoBackground
          ? 'bg-[#080808]/65 backdrop-blur-[2px] border-t border-white/[0.06]'
          : 'bg-[#080808] border-t border-[#1a1a20]'
      }`}
    >
      {/* Soft dark gradient top to blend seamlessly with the Hero section above */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#080808]/80 via-[#080808]/40 to-transparent pointer-events-none" />

      {/* Soft gradient bottom to transition seamlessly into the Tech Stack carousel */}
      <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#080808] via-[#080808]/80 to-transparent pointer-events-none" />

      {/* Subtle background ambient light with parallax */}
      <div
        ref={ambientGlowRef}
        className="absolute top-1/3 right-0 w-96 h-96 bg-[#FF6B35]/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header with Masked Text Animation */}
        <div className="max-w-4xl mb-14 sm:mb-16">
          <div
            ref={kickerRef}
            className="text-xs font-mono uppercase tracking-widest text-[#FF6B35] mb-3 flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
            <span>Profile & Background</span>
          </div>

          <div ref={titleMaskRef} className="overflow-hidden mb-6">
            <h2
              ref={titleTextRef}
              className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-white uppercase leading-tight"
            >
              ABOUT ME.
            </h2>
          </div>

          <div
            ref={bioRef}
            className="space-y-4 text-base sm:text-lg text-neutral-300 font-light leading-relaxed"
          >
            <p>
              I'm <span className="text-white font-medium">{PERSONAL_INFO.name}</span>, a B.Tech CSE (AI & ML) student at{' '}
              <span className="text-[#FF6B35] font-medium">{PERSONAL_INFO.education.university}</span>, graduating in {PERSONAL_INFO.education.graduation}.
            </p>
            <p>
              I'm interested in building, not just learning. I turn ideas into working web applications and AI-powered projects, experiment with new technologies, and improve by solving real problems.
            </p>
          </div>
        </div>

        {/* Compact Education & Genuine Interests with generous, clean spacing */}
        <div
          ref={educationCardRef}
          className="p-7 sm:p-9 rounded-2xl bg-[#0d0d12]/90 border border-[#202028] shadow-2xl backdrop-blur-md relative overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
            <div className="space-y-2.5 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#16161e] border border-[#2a2a34] text-xs font-mono text-[#FF6B35]">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Academic Profile</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                {PERSONAL_INFO.education.university}
              </h3>
              <p className="text-sm font-mono text-neutral-300">
                {PERSONAL_INFO.education.degree} · Graduation: {PERSONAL_INFO.education.graduation}
              </p>
            </div>

            <div className="space-y-3 lg:max-w-md">
              <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                Interests & Focus
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-neutral-300">
                {PERSONAL_INFO.interests.map((interest, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#14141a] border border-[#22222a] text-neutral-300 font-sans"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
                    <span>{interest}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
