import React, { useState, useRef, useEffect } from 'react';
import { ExternalLink, Github, ArrowUpRight, Layers, Eye, Sparkles } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../utils/animations';

// Subcomponent: 3D Tilt Card wrapper with smooth pointer physics
function TiltProjectCard({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion() || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6; // Max 6deg tilt
    const rotateY = ((x - centerX) / centerX) * 6;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      duration: 0.35,
      ease: 'power2.out',
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'power3.out',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="project-card-item rounded-2xl bg-[#0c0c10] border border-[#1e1e24] hover:border-[#383844] transition-colors duration-300 flex flex-col justify-between overflow-hidden group shadow-2xl cursor-pointer will-change-transform"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
}

export const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Full-Stack', 'Creative 3D', 'Systems & AI'];

  const filteredProjects = PROJECTS.filter((proj) =>
    filter === 'All' ? true : proj.category === filter
  );

  // GSAP ScrollTrigger Section Entrance
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Header & Filters Reveal
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
          titleRef.current,
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1, ease: 'power4.out' },
          '-=0.4'
        )
        .fromTo(
          introRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.5'
        )
        .fromTo(
          filterRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
          '-=0.4'
        );

      // 2. Project Cards Stagger
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.project-card-item');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.16,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // When filter changes, re-stagger filtered cards
  useEffect(() => {
    if (prefersReducedMotion() || !gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.project-card-item');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
      }
    );
  }, [filter]);

  // Custom visual preview illustration renderers for each project
  const renderPreviewGraphic = (project: Project) => {
    switch (project.id) {
      case 'tomato-food':
        return (
          <div className="relative w-full h-56 sm:h-64 bg-[#0a0a0d] overflow-hidden flex flex-col justify-between p-5 border-b border-[#1e1e24] group-hover:bg-[#0e0e12] transition-colors">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF6B35]/15 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
            
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B35]" />
                <span className="font-display font-bold text-xs tracking-wider text-white">TOMATO DELIVER</span>
              </div>
              <span className="font-mono text-[10px] text-neutral-400 bg-[#16161c] px-2 py-0.5 rounded border border-[#26262e]">
                EST. 18-24 MIN
              </span>
            </div>

            <div className="relative z-10 flex items-center justify-between my-auto">
              <div className="space-y-1">
                <div className="text-xs font-mono text-[#FF6B35]">FEATURED RESTAURANT</div>
                <div className="text-lg font-display font-bold text-white">Artisan Ramen & Bowls</div>
                <div className="text-xs text-neutral-400">Fresh noodles · Soft egg · Chashu pork</div>
              </div>
              <div className="w-20 h-20 rounded-full border-2 border-[#FF6B35]/40 bg-gradient-to-br from-[#1a1a22] to-[#0d0d12] flex items-center justify-center shadow-lg relative shrink-0 group-hover:scale-105 transition-transform duration-300">
                <div className="w-14 h-14 rounded-full border border-[#FF6B35]/30 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-[#FF6B35]/30" />
                </div>
              </div>
            </div>

            <div className="z-10 flex items-center justify-between pt-3 border-t border-[#1c1c22] text-[11px] font-mono text-neutral-400">
              <span>Cart: 3 items ($34.50)</span>
              <span className="text-[#FF6B35]">LIVE DISPATCH →</span>
            </div>
          </div>
        );

      case 'mern-crud':
        return (
          <div className="relative w-full h-56 sm:h-64 bg-[#0a0a0d] overflow-hidden flex flex-col justify-between p-5 border-b border-[#1e1e24] group-hover:bg-[#0e0e12] transition-colors">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#E25B2D]/15 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-sm bg-[#E25B2D]" />
                <span className="font-mono text-xs text-neutral-300">MONGODB // REST API</span>
              </div>
              <span className="font-mono text-[10px] text-emerald-400 bg-[#141d16] px-2 py-0.5 rounded border border-[#203a25]">
                200 OK
              </span>
            </div>

            <div className="relative z-10 space-y-1.5 my-auto">
              <div className="grid grid-cols-4 gap-2 text-[10px] font-mono text-neutral-500 pb-1 border-b border-[#1c1c22]">
                <span>RECORD ID</span>
                <span>ENTITY</span>
                <span>STATUS</span>
                <span className="text-right">LATENCY</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-[11px] font-mono text-neutral-300 py-1 bg-[#121217] px-2 rounded">
                <span className="text-neutral-400">#REC-8491</span>
                <span>User Session</span>
                <span className="text-emerald-400">Validated</span>
                <span className="text-right text-[#E25B2D]">14ms</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-[11px] font-mono text-neutral-300 py-1 bg-[#121217] px-2 rounded">
                <span className="text-neutral-400">#REC-8492</span>
                <span>Resource Order</span>
                <span className="text-amber-400">Pending</span>
                <span className="text-right text-[#E25B2D]">22ms</span>
              </div>
            </div>

            <div className="z-10 flex items-center justify-between pt-3 border-t border-[#1c1c22] text-[11px] font-mono text-neutral-400">
              <span>Total Indexed: 14,280 Docs</span>
              <span className="text-[#E25B2D]">CRUD OPS ACTIVE</span>
            </div>
          </div>
        );

      case 'interactive-3d-portfolio':
        return (
          <div className="relative w-full h-56 sm:h-64 bg-[#08080a] overflow-hidden flex flex-col justify-between p-5 border-b border-[#1e1e24] group-hover:bg-[#0c0c10] transition-colors">
            <div className="absolute inset-0 opacity-80 pointer-events-none group-hover:scale-105 transition-transform duration-500">
              <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
                <defs>
                  <radialGradient id="fissureCoreMini" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFA07A" stopOpacity="0.8" />
                    <stop offset="40%" stopColor="#FF6B35" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#08080a" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="280" cy="120" r="140" fill="url(#fissureCoreMini)" />
                <rect x="230" y="50" width="30" height="130" fill="#15151b" stroke="#333" />
                <rect x="265" y="40" width="40" height="150" fill="#181822" stroke="#444" />
                <rect x="310" y="70" width="25" height="110" fill="#131317" stroke="#333" />
                <line x1="264" y1="45" x2="264" y2="185" stroke="#FF6B35" strokeWidth="4" />
                <line x1="264" y1="45" x2="264" y2="185" stroke="#FFF" strokeWidth="1" />
                <line x1="40" y1="190" x2="380" y2="150" stroke="#FF5722" strokeWidth="6" opacity="0.7" />
                <line x1="40" y1="190" x2="380" y2="150" stroke="#FFF" strokeWidth="1.5" />
              </svg>
            </div>

            <div className="flex items-center justify-between z-10">
              <span className="font-mono text-xs text-[#FF7A45]">THREE.JS // WEBGL RENDER</span>
              <span className="font-mono text-[10px] text-white bg-[#1a1a24] px-2 py-0.5 rounded border border-[#303040]">
                60 FPS
              </span>
            </div>

            <div className="relative z-10 my-auto">
              <div className="text-sm font-display font-bold text-white">Procedural Monolith Engine</div>
              <div className="text-xs text-neutral-400">PBR Shaders & Dynamic Parallax</div>
            </div>

            <div className="z-10 flex items-center justify-between pt-3 border-t border-[#1c1c22] text-[11px] font-mono text-neutral-400">
              <span>Vertex Displace: Active</span>
              <span className="text-[#FF7A45]">SPATIAL CANVAS</span>
            </div>
          </div>
        );

      case 'ai-dev-tool':
        return (
          <div className="relative w-full h-56 sm:h-64 bg-[#0a0a0d] overflow-hidden flex flex-col justify-between p-5 border-b border-[#1e1e24] group-hover:bg-[#0e0e12] transition-colors">
            <div className="absolute top-0 left-0 w-48 h-48 bg-[#FF9466]/15 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

            <div className="flex items-center justify-between z-10">
              <span className="font-mono text-xs text-neutral-300">AST INTEL // CODE GRAPH</span>
              <span className="font-mono text-[10px] text-white bg-[#1a1a20] px-2 py-0.5 rounded border border-[#282832]">
                NODE PARSER v1.2
              </span>
            </div>

            <div className="relative z-10 my-auto py-2">
              <div className="flex items-center justify-around gap-2 text-[10px] font-mono">
                <div className="p-2 rounded bg-[#16161e] border border-[#2c2c38] text-white">
                  Program()
                </div>
                <div className="text-neutral-500">→</div>
                <div className="p-2 rounded bg-[#1f1915] border border-[#FF6B35]/40 text-[#FF9466]">
                  AsyncFnNode
                </div>
                <div className="text-neutral-500">→</div>
                <div className="p-2 rounded bg-[#16161e] border border-[#2c2c38] text-white">
                  ReturnState
                </div>
              </div>
            </div>

            <div className="z-10 flex items-center justify-between pt-3 border-t border-[#1c1c22] text-[11px] font-mono text-neutral-400">
              <span>Complexity: O(n log n)</span>
              <span className="text-[#FF9466]">AGENT RUNNER</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-28 sm:py-36 bg-[#080808] border-t border-[#1c1c20] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header with Masked Text Animation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div
              ref={kickerRef}
              className="text-xs font-mono uppercase tracking-widest text-[#FF6B35] mb-3"
            >
              Selected Works
            </div>
            <div className="overflow-hidden mb-4">
              <h2
                ref={titleRef}
                className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-white uppercase leading-tight"
              >
                FEATURED PROJECTS.
              </h2>
            </div>
            <p
              ref={introRef}
              className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed"
            >
              Curated full-stack platforms, 3D WebGL digital worlds, and developer engineering tools. Built with focus on structural performance and visual distinction.
            </p>
          </div>

          {/* Interactive filter pills */}
          <div
            ref={filterRef}
            className="flex flex-wrap items-center gap-1.5 p-1 bg-[#101014] border border-[#222226] rounded-xl self-start md:self-auto"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  filter === cat
                    ? 'bg-[#FF6B35] text-white shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects 2-Column Grid with Stagger & 3D Tilt */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project) => (
            <TiltProjectCard
              key={project.id}
              onClick={() => setSelectedProject(project)}
            >
              {/* Graphic Banner */}
              <div
                onClick={() => setSelectedProject(project)}
                className="cursor-pointer overflow-hidden"
              >
                {renderPreviewGraphic(project)}
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between">
                <div>
                  {/* Clean unboxed metadata with separators */}
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-3">
                    <span className="text-[#FF6B35]">{project.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.subtitle}</span>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => setSelectedProject(project)}
                    className="text-xl sm:text-2xl font-display font-semibold text-white mb-3 group-hover:text-[#FF6B35] transition-colors cursor-pointer"
                  >
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded bg-[#14141a] border border-[#24242e] text-[11px] font-mono text-neutral-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="pt-5 border-t border-[#1c1c22] flex items-center justify-between gap-4">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-semibold uppercase tracking-wider text-white hover:text-[#FF6B35] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>View Architecture</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-[#141418] hover:bg-[#1f1f24] border border-[#24242a] text-neutral-400 hover:text-white transition-colors"
                        title="View GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-[#141418] hover:bg-[#1f1f24] border border-[#24242a] text-neutral-400 hover:text-[#FF6B35] transition-colors"
                        title="View Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </TiltProjectCard>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
export default Projects;
