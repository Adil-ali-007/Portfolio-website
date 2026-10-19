import React, { useRef, useEffect } from 'react';
import { Briefcase, Calendar, Building2 } from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';
import { gsap, prefersReducedMotion } from '../utils/animations';

interface ExperienceProps {
  onResumeClick?: () => void;
}

export const Experience: React.FC<ExperienceProps> = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const titleMaskRef = useRef<HTMLDivElement>(null);
  const titleTextRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const ambientGlowRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger reveal animations
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Ambient Background Glow
      if (ambientGlowRef.current) {
        gsap.to(ambientGlowRef.current, {
          y: 60,
          opacity: 0.7,
          scale: 1.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }

      // 2. Section Header & Card Reveal Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(
        kickerRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      )
        .fromTo(
          titleTextRef.current,
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.9, ease: 'power4.out' },
          '-=0.3'
        )
        .fromTo(
          introRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          cardRef.current,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.4'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const internship = EXPERIENCES[0];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-28 sm:py-36 bg-[#080808] border-t border-[#1a1a20] overflow-hidden"
    >
      {/* Background ambient glow matching theme */}
      <div
        ref={ambientGlowRef}
        className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#FF6B35]/5 rounded-full blur-[130px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mb-14 sm:mb-16">
          <div
            ref={kickerRef}
            className="text-xs font-mono uppercase tracking-widest text-[#FF6B35] mb-3 flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
            <span>EXPERIENCE / 2026</span>
          </div>

          <div ref={titleMaskRef} className="overflow-hidden mb-4">
            <h2
              ref={titleTextRef}
              className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-white uppercase leading-tight"
            >
              WHERE I'VE WORKED.
            </h2>
          </div>

          <p
            ref={introRef}
            className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed max-w-2xl"
          >
            Professional milestones, engineering internships, and practical web development engagements.
          </p>
        </div>

        {/* Clean, Premium Experience Card with Generous Whitespace */}
        <div ref={cardRef} className="max-w-4xl">
          <div className="p-8 sm:p-10 rounded-2xl bg-[#0d0d12] border border-[#202028] shadow-2xl relative overflow-hidden group hover:border-[#2f2f3c] transition-all duration-300">
            {/* Subtle top hairline accent */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FF6B35]/40 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

            <div className="space-y-6">
              {/* Card Meta Header */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#16161e] border border-[#2a2a34] text-xs font-mono text-[#FF6B35]">
                  <Briefcase className="w-3.5 h-3.5 text-[#FF6B35]" />
                  <span>Internship</span>
                </div>

                <div className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400">
                  <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{internship.period}</span>
                </div>
              </div>

              {/* Title & Organization */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                  {internship.role}
                </h3>
                <div className="text-lg font-medium text-[#FF6B35] mt-1.5 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#FF6B35]" />
                  <span>{internship.organization}</span>
                </div>
              </div>

              {/* Verified Description */}
              <p className="text-base text-neutral-300 font-light leading-relaxed max-w-3xl">
                "{internship.description}"
              </p>

              {/* Footer Meta */}
              <div className="pt-6 border-t border-[#1a1a22] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-neutral-400">
                <span>Timeline: {internship.fullDates}</span>
                <span className="text-neutral-400">Web Development Track</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
