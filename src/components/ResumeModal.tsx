import React, { useEffect, useState } from 'react';
import { X, Printer, Download, Copy, Check, ExternalLink, Github, Linkedin, Phone, Mail, GraduationCap, Code2, FolderGit2, Sparkles, Award, Briefcase } from 'lucide-react';
import { PERSONAL_INFO, CAROUSEL_SKILLS, PROJECTS, EXPERIENCES } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyContact = () => {
    const info = `Adil Ali - Creative Developer & Software Engineer\nPhone: ${PERSONAL_INFO.phoneFormatted}\nEmail: ${PERSONAL_INFO.email}\nGitHub: ${PERSONAL_INFO.github}\nLinkedIn: ${PERSONAL_INFO.linkedin}\nEducation: ${PERSONAL_INFO.education.degree}, ${PERSONAL_INFO.education.university} (${PERSONAL_INFO.education.graduation})`;
    navigator.clipboard.writeText(info);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-[#0c0c10] border border-[#24242c] rounded-2xl shadow-2xl z-10 my-6 sm:my-10 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Top Sticky Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#121217] border-b border-[#22222a]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#FF6B35]/10 text-[#FF6B35]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 id="resume-title" className="text-base sm:text-lg font-display font-bold text-white tracking-tight">
                Curriculum Vitae · {PERSONAL_INFO.name}
              </h2>
              <p className="text-xs font-mono text-neutral-400">
                {PERSONAL_INFO.education.degreeShort} · Class of {PERSONAL_INFO.education.graduation}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyContact}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#18181f] hover:bg-[#22222b] border border-[#2c2c36] text-xs font-mono text-neutral-300 transition-colors cursor-pointer"
              title="Copy Contact Information"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-neutral-400" />}
              <span>{copied ? 'Copied' : 'Copy Info'}</span>
            </button>

            <a
              href="/resume.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#18181f] hover:bg-[#22222b] border border-[#2c2c36] text-xs font-mono text-neutral-300 hover:text-white transition-colors cursor-pointer"
              title="Open full resume document in new browser tab"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#FF6B35]" />
              <span className="hidden sm:inline">Open in Tab</span>
            </a>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#FF6B35] hover:bg-[#ff7b47] text-xs font-mono font-medium text-white transition-colors shadow-sm cursor-pointer"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white bg-[#18181f] hover:bg-[#22222b] border border-[#2c2c36] transition-colors cursor-pointer ml-1"
              aria-label="Close resume modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Resume Sheet */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 font-sans text-neutral-200" id="resume-printable">
          {/* Header Identity Block */}
          <div className="border-b border-[#202026] pb-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight uppercase">
                  {PERSONAL_INFO.name}
                </h1>
                <p className="text-sm sm:text-base font-mono text-[#FF6B35] font-medium mt-1">
                  Creative Developer & Software Engineer
                </p>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
                  {PERSONAL_INFO.education.degree} · {PERSONAL_INFO.education.university} (Class of {PERSONAL_INFO.education.graduation})
                </p>
              </div>

              {/* Direct Clickable Contact Badges */}
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#16161b] hover:bg-[#1f1f26] border border-[#282832] text-neutral-200 hover:text-[#FF6B35] transition-colors"
                  title="Call Phone Number"
                >
                  <Phone className="w-3.5 h-3.5 text-[#FF6B35]" />
                  <span>{PERSONAL_INFO.phoneFormatted}</span>
                </a>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#16161b] hover:bg-[#1f1f26] border border-[#282832] text-neutral-200 hover:text-[#FF6B35] transition-colors"
                  title="Send Email"
                >
                  <Mail className="w-3.5 h-3.5 text-[#FF6B35]" />
                  <span>{PERSONAL_INFO.email}</span>
                </a>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#16161b] hover:bg-[#1f1f26] border border-[#282832] text-neutral-200 hover:text-[#FF6B35] transition-colors"
                  title="Open GitHub Profile"
                >
                  <Github className="w-3.5 h-3.5 text-[#FF6B35]" />
                  <span>github.com/{PERSONAL_INFO.githubUsername}</span>
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#16161b] hover:bg-[#1f1f26] border border-[#282832] text-neutral-200 hover:text-[#FF6B35] transition-colors"
                  title="Open LinkedIn Profile"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#FF6B35]" />
                  <span>linkedin.com/in/{PERSONAL_INFO.linkedinUsername}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#FF6B35] mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
              <span>Professional Summary</span>
            </h3>
            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              {PERSONAL_INFO.aboutIntro}
            </p>
          </div>

          {/* Experience Block */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#FF6B35] mb-3 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#FF6B35]" />
              <span>Experience</span>
            </h3>
            <div className="space-y-3">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="p-4 sm:p-5 rounded-xl bg-[#111116] border border-[#22222a]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h4 className="text-base font-semibold text-white">
                      {exp.role}
                    </h4>
                    <span className="text-xs font-mono text-neutral-400">
                      {exp.period}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-[#FF6B35] mb-2 flex items-center gap-2">
                    <span>{exp.organization}</span>
                    <span className="text-neutral-500 font-mono text-xs">·</span>
                    <span className="text-xs font-mono text-neutral-400 font-normal">{exp.type}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Education Block */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#FF6B35] mb-3 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#FF6B35]" />
              <span>Education</span>
            </h3>
            <div className="p-4 sm:p-5 rounded-xl bg-[#111116] border border-[#22222a]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <h4 className="text-base font-semibold text-white">
                  {PERSONAL_INFO.education.university}
                </h4>
                <span className="text-xs font-mono text-[#FF6B35]">
                  Expected Graduation: {PERSONAL_INFO.education.graduation} ({PERSONAL_INFO.education.timeline})
                </span>
              </div>
              <p className="text-sm font-medium text-neutral-300">
                {PERSONAL_INFO.education.degree}
              </p>
              <p className="text-xs text-neutral-400 mt-2 font-light">
                Focus Areas: Practical Artificial Intelligence & Machine Learning, Data Structures and Algorithms (C++ / Python), Full-Stack Systems Architecture (MERN Stack), Interactive Graphics & WebGL.
              </p>
            </div>
          </div>

          {/* Core Technical Proficiencies */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#FF6B35] mb-3 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#FF6B35]" />
              <span>Technical Skills</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#111116] border border-[#22222a]">
                <div className="text-xs font-mono uppercase text-neutral-400 mb-2 font-medium">
                  Frontend & Creative 3D
                </div>
                <div className="flex flex-wrap gap-1.5 text-xs font-mono">
                  {['React', 'JavaScript (ESNext)', 'Next.js', 'Three.js', 'React Three Fiber', 'Tailwind CSS', 'GSAP', 'HTML5 / CSS3'].map(
                    (skill) => (
                      <span key={skill} className="px-2.5 py-1 rounded bg-[#181820] text-neutral-200 border border-[#282834]">
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#111116] border border-[#22222a]">
                <div className="text-xs font-mono uppercase text-neutral-400 mb-2 font-medium">
                  Backend, Systems & Data
                </div>
                <div className="flex flex-wrap gap-1.5 text-xs font-mono">
                  {['Node.js', 'Express', 'MongoDB', 'REST APIs', 'C++', 'Data Structures & Algorithms', 'Python', 'NumPy', 'pandas'].map(
                    (skill) => (
                      <span key={skill} className="px-2.5 py-1 rounded bg-[#181820] text-neutral-200 border border-[#282834]">
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Selected Projects */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#FF6B35] mb-3 flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-[#FF6B35]" />
              <span>Featured Engineering Projects</span>
            </h3>
            <div className="space-y-4">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="p-4 sm:p-5 rounded-xl bg-[#111116] border border-[#22222a]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <h4 className="text-base font-semibold text-white flex items-center gap-2">
                      <span>{proj.title}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1d1d26] text-[#FF6B35] border border-[#2e2e3c]">
                        {proj.category}
                      </span>
                    </h4>
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                        <ExternalLink className="w-3 h-3 ml-0.5" />
                      </a>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 font-light mb-3">
                    {proj.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 text-[11px] font-mono text-neutral-400">
                    {proj.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded bg-[#181820] text-neutral-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interests & Engineering Philosophy */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#FF6B35] mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FF6B35]" />
              <span>Interests & Focus Areas</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PERSONAL_INFO.interests.map((interest, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-lg bg-[#111116] border border-[#202026] text-xs text-neutral-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] shrink-0" />
                  <span>{interest}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="px-6 py-4 bg-[#121217] border-t border-[#22222a] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
            <a
              href={`tel:${PERSONAL_INFO.phone}`}
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#FF6B35]" />
              <span>{PERSONAL_INFO.phoneFormatted}</span>
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-[#FF6B35]" />
              <span>{PERSONAL_INFO.email}</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-[#FF6B35] hover:bg-[#ff7b47] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download / Print</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#181820] hover:bg-[#22222c] border border-[#2c2c38] text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResumeModal;
