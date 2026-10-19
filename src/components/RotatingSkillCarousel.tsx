import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CAROUSEL_SKILLS } from '../data/portfolioData';
import { SkillCard } from './SkillCard';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../utils/animations';

export const RotatingSkillCarousel: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const carouselStageRef = useRef<HTMLDivElement>(null);

  const [rotation, setRotation] = useState(0); // in radians
  const [isDragging, setIsDragging] = useState(false);
  const dragStartXRef = useRef(0);
  const rotationStartRef = useRef(0);

  const totalItems = CAROUSEL_SKILLS.length;
  const angleStep = (2 * Math.PI) / totalItems;

  // Compute current active front index
  const normalizedRotation = ((-rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  const activeIndex = Math.round(normalizedRotation / angleStep) % totalItems;

  // Radius based on viewport width
  const [radius, setRadius] = useState(520);

  useEffect(() => {
    const updateRadius = () => {
      const w = window.innerWidth;
      if (w < 640) setRadius(260);
      else if (w < 1024) setRadius(380);
      else setRadius(520);
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  // GSAP ScrollTrigger Scrubbing: Connect page scroll to carousel rotation
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Rotating scroll timeline
      gsap.to(
        {},
        {
          scrollTrigger: {
            trigger: trackRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1.2,
            onUpdate: (self) => {
              if (!isDragging) {
                // Rotate through 1.2 full revolutions across the section scroll
                const targetRotation = -self.progress * Math.PI * 2.4;
                setRotation(targetRotation);
              }
            },
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isDragging]);

  // Pointer drag handling for manual horizontal rotation
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
    rotationStartRef.current = rotation;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartXRef.current;
    const sensitivity = 0.0035;
    const newRotation = rotationStartRef.current + deltaX * sensitivity;
    setRotation(newRotation);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);

    // Snap to nearest card with smooth GSAP tween
    const snapAngle = Math.round(rotation / angleStep) * angleStep;
    gsap.to(
      { val: rotation },
      {
        val: snapAngle,
        duration: 0.5,
        ease: 'power2.out',
        onUpdate: function () {
          setRotation(this.targets()[0].val);
        },
      }
    );
  };

  // Rotate smoothly to specific card index
  const rotateToIndex = useCallback(
    (index: number) => {
      const targetAngle = -index * angleStep;
      // Find shortest rotational path
      const currentMod = rotation % (2 * Math.PI);
      const diff = targetAngle - currentMod;
      const shortestDiff = Math.atan2(Math.sin(diff), Math.cos(diff));

      gsap.to(
        { val: rotation },
        {
          val: rotation + shortestDiff,
          duration: 0.65,
          ease: 'power3.out',
          onUpdate: function () {
            setRotation(this.targets()[0].val);
          },
        }
      );
    },
    [rotation, angleStep]
  );

  const handlePrev = () => {
    const nextIdx = (activeIndex - 1 + totalItems) % totalItems;
    rotateToIndex(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % totalItems;
    rotateToIndex(nextIdx);
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-28 sm:py-36 bg-[#080808] border-t border-[#1c1c20] overflow-hidden select-none"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#FF6B35]/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header with Clean Forward/Backward Arrow Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-widest text-[#FF6B35] mb-3">
              Interactive 3D Carousel
            </div>
            <div className="overflow-hidden mb-4">
              <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-white uppercase leading-tight">
                MY TECH STACK.
              </h2>
            </div>
            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              Floating rectangular 3D cards arranged on a circular axis. Scroll down, drag, or use the navigation arrows to rotate the carousel and inspect each tool of my craft.
            </p>
          </div>

          {/* Clean Navigation Arrows */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handlePrev}
              className="p-3 rounded-xl border border-[#2a2a32] text-neutral-300 hover:text-white hover:border-[#FF6B35] bg-[#141418] hover:bg-[#1c1c22] shadow-lg transition-colors cursor-pointer"
              title="Rotate backward"
              aria-label="Previous skill"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-xl border border-[#2a2a32] text-neutral-300 hover:text-white hover:border-[#FF6B35] bg-[#141418] hover:bg-[#1c1c22] shadow-lg transition-colors cursor-pointer"
              title="Rotate forward"
              aria-label="Next skill"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scroll Tracking Wrapper & 3D Stage */}
        <div ref={trackRef} className="relative w-full">
          <div
            ref={carouselStageRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="relative w-full h-[460px] sm:h-[520px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
            style={{
              perspective: '1400px',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Circular ground ring guide */}
            <div
              className="absolute w-[500px] sm:w-[750px] lg:w-[1000px] h-[500px] sm:h-[750px] lg:h-[1000px] rounded-full border border-[#24242e]/60 pointer-events-none"
              style={{
                transform: 'rotateX(78deg) translateZ(-160px)',
                boxShadow: '0 0 50px rgba(255, 107, 53, 0.08)',
              }}
            />

            {/* 3D Skill Cards arranged evenly around the circular axis */}
            {CAROUSEL_SKILLS.map((skill, index) => {
              const cardAngle = index * angleStep + rotation;
              const cos = Math.cos(cardAngle);
              const sin = Math.sin(cardAngle);

              // 3D coordinates
              const x = sin * radius;
              const z = cos * radius - radius; // front card is at z = 0, back cards at z < 0

              // Perspective depth calculations
              const isFront = index === activeIndex;
              const scale = 0.72 + 0.36 * ((cos + 1) / 2);
              const opacity = Math.max(0.2, Math.min(1, 0.25 + 0.75 * ((cos + 0.3) / 1.3)));
              const zIndex = Math.round((cos + 1) * 100);
              // Periodic yaw angle so cards always face the viewer and never flip into reverse
              const rotateY = -Math.sin(cardAngle) * 26;

              return (
                <div
                  key={skill.id}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 will-change-transform"
                  style={{
                    transform: `translate3d(${x}px, ${sin * -15}px, ${z}px) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity,
                    zIndex,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  <SkillCard
                    skill={skill}
                    isFront={isFront}
                    angleFromFront={cardAngle}
                    onClick={() => rotateToIndex(index)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
export default RotatingSkillCarousel;
