import React from 'react';
import { Project } from '../types';
import { ExternalLink, Github, ArrowUpRight, Layers } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  isFront: boolean;
  onClick: () => void;
  onOpenDetails: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  isFront,
  onClick,
  onOpenDetails,
}) => {
  // Render high-fidelity graphic banner for each project
  const renderGraphic = () => {
    switch (project.id) {
      case 'tomato-food':
        return (
          <div className="relative w-full h-44 sm:h-52 bg-[#0a0a0d] overflow-hidden flex flex-col justify-between p-4 border-b border-[#1e1e24]">
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#FF6B35]/20 rounded-full blur-2xl pointer-events-none" />
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
              <div className="space-y-0.5">
                <div className="text-[10px] font-mono text-[#FF6B35]">FEATURED RESTAURANT</div>
                <div className="text-base font-display font-bold text-white">Artisan Ramen & Bowls</div>
                <div className="text-[11px] text-neutral-400">Fresh noodles · Soft egg · Chashu pork</div>
              </div>
              <div className="w-16 h-16 rounded-full border-2 border-[#FF6B35]/40 bg-gradient-to-br from-[#1a1a22] to-[#0d0d12] flex items-center justify-center shadow-lg relative shrink-0">
                <div className="w-10 h-10 rounded-full bg-[#FF6B35]/30" />
              </div>
            </div>
            <div className="z-10 flex items-center justify-between pt-2 border-t border-[#1c1c22] text-[10px] font-mono text-neutral-400">
              <span>Cart: 3 items ($34.50)</span>
              <span className="text-[#FF6B35]">LIVE DISPATCH →</span>
            </div>
          </div>
        );

      case 'swiggy-clone':
        return (
          <div className="relative w-full h-44 sm:h-52 bg-[#0c0a0a] overflow-hidden flex flex-col justify-between p-4 border-b border-[#1e1e24]">
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#FC8019]/20 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FC8019]" />
                <span className="font-display font-bold text-xs tracking-wider text-white">SWIGGY PLATFORM</span>
              </div>
              <span className="font-mono text-[10px] text-orange-400 bg-[#1f1510] px-2 py-0.5 rounded border border-[#382315]">
                HYPERLOCAL
              </span>
            </div>
            <div className="relative z-10 space-y-1 my-auto">
              <div className="text-[10px] font-mono text-[#FC8019]">REAL-TIME CATALOG ENGINE</div>
              <div className="text-base font-display font-bold text-white">Multi-Restaurant Checkout</div>
              <div className="text-[11px] text-neutral-400">Instant add-ons · Geolocation tracking · Cart sync</div>
            </div>
            <div className="z-10 flex items-center justify-between pt-2 border-t border-[#1c1c22] text-[10px] font-mono text-neutral-400">
              <span>Order State: Dispatching</span>
              <span className="text-[#FC8019]">EST 15 MIN</span>
            </div>
          </div>
        );

      case 'mern-crud':
        return (
          <div className="relative w-full h-44 sm:h-52 bg-[#0a0a0d] overflow-hidden flex flex-col justify-between p-4 border-b border-[#1e1e24]">
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#E25B2D]/15 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-sm bg-[#E25B2D]" />
                <span className="font-mono text-xs text-neutral-300">MONGODB // REST API</span>
              </div>
              <span className="font-mono text-[10px] text-emerald-400 bg-[#141d16] px-2 py-0.5 rounded border border-[#203a25]">
                200 OK
              </span>
            </div>
            <div className="relative z-10 space-y-1 my-auto">
              <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-neutral-500 pb-1 border-b border-[#1c1c22]">
                <span>ID</span>
                <span>ENTITY</span>
                <span className="text-right">LATENCY</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-neutral-300 py-0.5 bg-[#121217] px-2 rounded">
                <span className="text-neutral-400">#REC-8491</span>
                <span>User Session</span>
                <span className="text-right text-[#E25B2D]">14ms</span>
              </div>
            </div>
            <div className="z-10 flex items-center justify-between pt-2 border-t border-[#1c1c22] text-[10px] font-mono text-neutral-400">
              <span>Indexed: 14,280 Docs</span>
              <span className="text-[#E25B2D]">CRUD OPS ACTIVE</span>
            </div>
          </div>
        );

      case 'interactive-3d-portfolio':
        return (
          <div className="relative w-full h-44 sm:h-52 bg-[#08080a] overflow-hidden flex flex-col justify-between p-4 border-b border-[#1e1e24]">
            <div className="absolute inset-0 opacity-80 pointer-events-none">
              <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
                <defs>
                  <radialGradient id="fissureCoreMiniCard" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFA07A" stopOpacity="0.8" />
                    <stop offset="40%" stopColor="#FF6B35" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#08080a" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="280" cy="120" r="140" fill="url(#fissureCoreMiniCard)" />
                <rect x="230" y="50" width="30" height="130" fill="#15151b" stroke="#333" />
                <rect x="265" y="40" width="40" height="150" fill="#181822" stroke="#444" />
                <line x1="264" y1="45" x2="264" y2="185" stroke="#FF6B35" strokeWidth="4" />
                <line x1="40" y1="190" x2="380" y2="150" stroke="#FF5722" strokeWidth="6" opacity="0.7" />
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
              <div className="text-[11px] text-neutral-400">PBR Shaders & Dynamic Parallax</div>
            </div>
            <div className="z-10 flex items-center justify-between pt-2 border-t border-[#1c1c22] text-[10px] font-mono text-neutral-400">
              <span>Vertex Displace: Active</span>
              <span className="text-[#FF7A45]">SPATIAL CANVAS</span>
            </div>
          </div>
        );

      case 'ai-dev-tool':
        return (
          <div className="relative w-full h-44 sm:h-52 bg-[#0a0a0d] overflow-hidden flex flex-col justify-between p-4 border-b border-[#1e1e24]">
            <div className="absolute top-0 left-0 w-36 h-36 bg-[#FF9466]/15 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between z-10">
              <span className="font-mono text-xs text-neutral-300">AST INTEL // CODE GRAPH</span>
              <span className="font-mono text-[10px] text-white bg-[#1a1a20] px-2 py-0.5 rounded border border-[#282832]">
                NODE PARSER v1.2
              </span>
            </div>
            <div className="relative z-10 my-auto py-1">
              <div className="flex items-center justify-around gap-1.5 text-[9px] font-mono">
                <div className="p-1.5 rounded bg-[#16161e] border border-[#2c2c38] text-white">
                  Program()
                </div>
                <div className="text-neutral-500">→</div>
                <div className="p-1.5 rounded bg-[#1f1915] border border-[#FF6B35]/40 text-[#FF9466]">
                  AsyncFnNode
                </div>
                <div className="text-neutral-500">→</div>
                <div className="p-1.5 rounded bg-[#16161e] border border-[#2c2c38] text-white">
                  ReturnState
                </div>
              </div>
            </div>
            <div className="z-10 flex items-center justify-between pt-2 border-t border-[#1c1c22] text-[10px] font-mono text-neutral-400">
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
    <div
      onClick={onClick}
      className={`w-[300px] sm:w-[380px] lg:w-[420px] rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between cursor-pointer select-none relative backdrop-blur-xl ${
        isFront
          ? 'bg-[#101015]/95 border-2 border-[#FF6B35] shadow-[0_20px_50px_rgba(255,107,53,0.3)] ring-1 ring-[#FF6B35]/50'
          : 'bg-[#0c0c10]/85 border border-[#202026] hover:border-[#33333d] shadow-xl'
      }`}
      style={{
        boxShadow: isFront
          ? '0 25px 50px -12px rgba(255, 107, 53, 0.4), 0 0 25px rgba(255, 107, 53, 0.2)'
          : '0 12px 30px -8px rgba(0, 0, 0, 0.7)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
    >
      {/* Top Banner Graphic */}
      <div>{renderGraphic()}</div>

      {/* Card Body */}
      <div className="p-6 flex flex-col justify-between flex-1">
        <div>
          {/* Category Tag */}
          <div className="text-[11px] font-mono text-[#FF6B35] font-medium tracking-wider uppercase mb-2.5">
            {project.category}
          </div>

          {/* Project Title */}
          <h3
            className={`text-lg sm:text-xl font-display font-bold mb-2.5 transition-colors ${
              isFront ? 'text-white' : 'text-neutral-200'
            }`}
          >
            {project.title}
          </h3>

          {/* Concise Description (Max 12-15 words) */}
          <p className="text-xs text-neutral-300 font-light leading-relaxed mb-5 line-clamp-2">
            {project.description}
          </p>

          {/* Max 2-3 short tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md bg-[#16161c] border border-[#24242c] text-[10px] font-mono text-neutral-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-4 border-t border-[#1c1c22] flex items-center justify-between gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(project);
            }}
            className="text-xs font-semibold uppercase tracking-wider text-white hover:text-[#FF6B35] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded-lg bg-[#16161c] hover:bg-[#202028] border border-[#262630] text-neutral-400 hover:text-white transition-colors"
                title="View GitHub Repository"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded-lg bg-[#16161c] hover:bg-[#202028] border border-[#262630] text-neutral-400 hover:text-[#FF6B35] transition-colors"
                title="View Live Demo"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProjectCard;
