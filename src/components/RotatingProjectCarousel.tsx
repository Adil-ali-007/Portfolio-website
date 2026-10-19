import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../utils/animations';

export const RotatingProjectCarousel: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const carouselStageRef = useRef<HTMLDivElement>(null);

  const [rotation, setRotation] = useState(0); // in radians
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartXRef = useRef(0);
  const rotationStartRef = useRef(0);

  const totalItems = PROJECTS.length;
  const angleStep = (2 * Math.PI) / totalItems;

  // Active front index
  const normalizedRotation = ((-rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  const activeIndex = Math.round(normalizedRotation / angleStep) % totalItems;

  // Dynamic radius for responsive 3D ring
  const [radius, setRadius] = useState(560);

  useEffect(() => {
    const updateRadius = () => {
      const w = window.innerWidth;
      if (w < 640) setRadius(280);
      else if (w < 1024) setRadius(420);
      else setRadius(560);
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  const isDraggingRef = useRef(false);
  isDraggingRef.current = isDragging;

  // GSAP ScrollTrigger: Connect page scroll to 3D carousel rotation with scrub (matching MY TECH STACK)
  useEffect(() => {
    if (prefersReducedMotion()) return;

    let refreshTimeout: number;

    const ctx = gsap.context(() => {
      gsap.to(
        {},
        {
          scrollTrigger: {
            trigger: sectionRef.current || trackRef.current,
            start: 'top 85%',
            end: 'bottom 15%',
            scrub: 1.2,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (!isDraggingRef.current) {
                // Rotate smoothly through the project carousel across section scroll, exactly like MY TECH STACK
                const targetRotation = -self.progress * Math.PI * 2.4;
                setRotation(targetRotation);
              }
            },
          },
        }
      );

      // Ensure ScrollTrigger correctly accounts for the pinned cinematic section above it
      refreshTimeout = window.setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);
    }, sectionRef);

    return () => {
      window.clearTimeout(refreshTimeout);
      ctx.revert();
    };
  }, []);

  // Dual-engine scroll rotation listener: Guarantees fluid rotation as user scrolls through section
  useEffect(() => {
    if (prefersReducedMotion()) return;

    let animId: number;

    const handleWindowScroll = () => {
      if (isDraggingRef.current || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const winH = window.innerHeight;

      // When section enters the viewport
      if (rect.bottom > 0 && rect.top < winH) {
        // Compute progression from 0 to 1 across the section scroll
        const scrollDistance = winH + rect.height;
        const currentScrolled = winH - rect.top;
        const progress = Math.max(0, Math.min(1, currentScrolled / scrollDistance));
        const targetRotation = -progress * Math.PI * 2.4;

        cancelAnimationFrame(animId);
        animId = requestAnimationFrame(() => {
          setRotation(targetRotation);
        });
      }
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

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
    setRotation(rotationStartRef.current + deltaX * sensitivity);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);

    // Snap to nearest project card
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

  // Rotate smoothly to specific project index
  const rotateToIndex = useCallback(
    (index: number) => {
      const targetAngle = -index * angleStep;
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
      id="projects"
      ref={sectionRef}
      className="relative py-28 sm:py-36 bg-[#080808] border-t border-[#1c1c20] overflow-hidden select-none"
    >
      {/* Background ambient orange glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-[#FF6B35]/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header with Minimal Navigation Arrows (No 1/5 numbers!) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-widest text-[#FF6B35] mb-3">
              Interactive 3D Showcase
            </div>
            <div className="overflow-hidden mb-4">
              <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-white uppercase leading-tight">
                SELECTED PROJECTS.
              </h2>
            </div>
            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              Curated full-stack platforms and 3D digital worlds arranged in a rotating cylindrical showcase. Scroll down, drag, or use the navigation arrows to rotate projects into front focus.
            </p>
          </div>

          {/* Minimal Forward / Backward Arrows (Just arrows, no numbers) */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handlePrev}
              className="p-3 rounded-xl border border-[#2a2a32] text-neutral-300 hover:text-white hover:border-[#FF6B35] bg-[#141418] hover:bg-[#1c1c22] shadow-lg transition-colors cursor-pointer"
              title="Rotate backward"
              aria-label="Previous project"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-xl border border-[#2a2a32] text-neutral-300 hover:text-white hover:border-[#FF6B35] bg-[#141418] hover:bg-[#1c1c22] shadow-lg transition-colors cursor-pointer"
              title="Rotate forward"
              aria-label="Next project"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scroll Track & 3D Stage */}
        <div ref={trackRef} className="relative w-full">
          <div
            ref={carouselStageRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="relative w-full h-[540px] sm:h-[580px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
            style={{
              perspective: '1400px',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Circular ground ring shadow */}
            <div
              className="absolute w-[600px] sm:w-[850px] lg:w-[1100px] h-[600px] sm:h-[850px] lg:h-[1100px] rounded-full border border-[#24242e]/60 pointer-events-none"
              style={{
                transform: 'rotateX(78deg) translateZ(-180px)',
                boxShadow: '0 0 60px rgba(255, 107, 53, 0.08)',
              }}
            />

            {/* 3D Project Cards in Cylindrical Arrangement */}
            {PROJECTS.map((project, index) => {
              const cardAngle = index * angleStep + rotation;
              const cos = Math.cos(cardAngle);
              const sin = Math.sin(cardAngle);

              // 3D coordinates
              const x = sin * radius;
              const z = cos * radius - radius;

              // Perspective depth factors
              const isFront = index === activeIndex;
              const scale = 0.74 + 0.34 * ((cos + 1) / 2);
              const opacity = Math.max(0.2, Math.min(1, 0.25 + 0.75 * ((cos + 0.3) / 1.3)));
              const zIndex = Math.round((cos + 1) * 100);
              // Periodic yaw angle so project cards always face the viewer and never flip into reverse
              const rotateY = -Math.sin(cardAngle) * 24;

              return (
                <div
                  key={project.id}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 will-change-transform"
                  style={{
                    transform: `translate3d(${x}px, ${sin * -20}px, ${z}px) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity,
                    zIndex,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  <ProjectCard
                    project={project}
                    isFront={isFront}
                    onClick={() => rotateToIndex(index)}
                    onOpenDetails={(proj) => setSelectedProject(proj)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Project Architecture Deep-Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
export default RotatingProjectCarousel;
