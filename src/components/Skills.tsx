import React, { useState, useRef, useEffect } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Code2, Server, Terminal, Sparkles, Search } from 'lucide-react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../utils/animations';

export const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const filterBarRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categoryIcons: Record<string, React.ElementType> = {
    Frontend: Code2,
    Backend: Server,
    'Programming & Data': Terminal,
    'Creative Development': Sparkles,
  };

  const filteredCategories = SKILL_CATEGORIES.map((category) => {
    if (activeCategory !== 'All' && category.name !== activeCategory) {
      return null;
    }

    const filteredSkills = category.skills.filter(
      (skill) =>
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.note.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.level.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredSkills.length === 0) return null;

    return {
      ...category,
      skills: filteredSkills,
    };
  }).filter(Boolean);

  // GSAP ScrollTrigger on section entry
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
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
          { yPercent: 0, opacity: 1, duration: 0.9, ease: 'power4.out' },
          '-=0.4'
        )
        .fromTo(
          introRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.5'
        )
        .fromTo(
          filterBarRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
          '-=0.4'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Stagger skill cards whenever activeCategory or searchQuery updates
  useEffect(() => {
    if (prefersReducedMotion() || !cardsContainerRef.current) return;

    const cards = cardsContainerRef.current.querySelectorAll('.skill-card-item');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 20, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.45,
        stagger: 0.04,
        ease: 'power2.out',
      }
    );
  }, [activeCategory, searchQuery]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-28 sm:py-36 bg-[#080808] border-t border-[#1c1c20] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header with Masked Text Animation */}
        <div className="max-w-3xl mb-12">
          <div
            ref={kickerRef}
            className="text-xs font-mono uppercase tracking-widest text-[#FF6B35] mb-3"
          >
            Technical Stack
          </div>
          <div className="overflow-hidden mb-4">
            <h2
              ref={titleRef}
              className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-white uppercase leading-tight"
            >
              SKILLS & CAPABILITIES.
            </h2>
          </div>
          <p
            ref={introRef}
            className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed"
          >
            A comprehensive, transparent overview of technologies and tools I employ across frontend interfaces, scalable backend systems, computational algorithms, and real-time 3D environments.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div
          ref={filterBarRef}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-12"
        >
          {/* Segmented Category Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#101014] border border-[#222226] rounded-xl">
            <button
              onClick={() => setActiveCategory('All')}
              className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === 'All'
                  ? 'bg-[#FF6B35] text-white shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              All Domains
            </button>
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.name
                    ? 'bg-[#FF6B35] text-white shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skill (e.g. React, C++, Three.js)..."
              className="w-full bg-[#101014] border border-[#222226] focus:border-[#FF6B35] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Skills Display Grids with Staggered Entrance */}
        <div ref={cardsContainerRef} className="space-y-12">
          {filteredCategories.map((cat) => {
            if (!cat) return null;
            const Icon = categoryIcons[cat.name] || Code2;
            return (
              <div
                key={cat.name}
                className="p-6 sm:p-8 rounded-2xl bg-[#0c0c10] border border-[#1e1e22] shadow-xl"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 pb-6 border-b border-[#1c1c20] mb-6">
                  <div className="p-2 rounded-lg bg-[#141418] text-[#FF6B35] border border-[#26262a]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-semibold text-white">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-neutral-400 font-light mt-0.5">
                      {cat.description}
                    </p>
                  </div>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="skill-card-item p-4 rounded-xl bg-[#121216] border border-[#222228] hover:border-[#FF6B35]/40 transition-all duration-300 hover:-translate-y-1 group"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-sm font-medium text-white group-hover:text-[#FF6B35] transition-colors">
                          {skill.name}
                        </span>
                        <span className="text-[11px] font-mono text-[#FF6B35]">
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400 font-light leading-relaxed">
                        {skill.note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default Skills;
