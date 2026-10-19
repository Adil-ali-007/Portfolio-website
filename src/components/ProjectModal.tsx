import React, { useEffect } from 'react';
import { X, ExternalLink, Github, Layers, Cpu, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-[#0e0e12] border border-[#26262c] rounded-2xl shadow-2xl p-6 sm:p-8 z-10 my-8 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-neutral-400 hover:text-white bg-[#141418] border border-[#24242a] hover:border-neutral-500 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category & Status Bar */}
        <div className="flex items-center gap-3 text-xs font-mono text-neutral-400 mb-4">
          <span className="text-[#FF6B35] font-semibold uppercase">{project.category}</span>
          <span aria-hidden="true">·</span>
          <span>Status: {project.status}</span>
        </div>

        {/* Title & Subtitle */}
        <h3 id="modal-project-title" className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
          {project.title}
        </h3>
        <p className="text-sm font-medium text-neutral-400 mb-6">
          {project.subtitle}
        </p>

        {/* Long Description */}
        <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed mb-8">
          {project.longDescription}
        </p>

        {/* Key Features */}
        <div className="mb-8 p-5 rounded-xl bg-[#131318] border border-[#202026]">
          <h4 className="text-xs font-mono uppercase tracking-wider text-[#FF6B35] mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Key Engineering Features</span>
          </h4>
          <ul className="space-y-2">
            {project.features.map((feat, idx) => (
              <li key={idx} className="text-xs sm:text-sm text-neutral-300 flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] mt-1.5 shrink-0" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Architecture Notes */}
        <div className="mb-8">
          <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#FF6B35]" />
            <span>Architecture & Data Flow</span>
          </h4>
          <div className="space-y-2">
            {project.architectureNotes.map((note, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-[#111115] border border-[#1e1e24] text-xs text-neutral-300">
                {note}
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Tags (Clean unboxed tags) */}
        <div className="mb-8 pt-4 border-t border-[#1e1e24]">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
            Technologies Used
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-mono text-neutral-300">
            {project.tags.map((tag, idx) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded bg-[#18181e] border border-[#282830] text-neutral-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Links / Actions */}
        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#1e1e24]">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#FF6B35] hover:bg-[#ff7b47] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center gap-2 shadow-lg shadow-[#FF6B35]/20"
            >
              <span>Live Deployment</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#18181e] hover:bg-[#22222a] border border-[#2c2c34] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors flex items-center gap-2"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Source Repository</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProjectModal;
