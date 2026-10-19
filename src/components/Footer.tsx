import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Phone, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onResumeClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onResumeClick }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 bg-[#060608] border-t border-[#18181c] text-xs text-neutral-400 font-mono">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand, Academic & Copyright */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 text-center sm:text-left">
          <span className="font-display font-semibold text-white tracking-wider">
            {PERSONAL_INFO.name}
          </span>
          <span className="hidden sm:inline" aria-hidden="true">·</span>
          <span>{PERSONAL_INFO.education.degreeShort} · {PERSONAL_INFO.education.graduation}</span>
          <span className="hidden sm:inline" aria-hidden="true">·</span>
          <span>© {new Date().getFullYear()} All Rights Reserved</span>
        </div>

        {/* Social Links, Phone, Resume & Back to Top */}
        <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors p-1"
            title="GitHub Profile"
            aria-label="Adil Ali's GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors p-1"
            title="LinkedIn Profile"
            aria-label="Adil Ali's LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            href={`tel:${PERSONAL_INFO.phone}`}
            className="hover:text-[#FF6B35] transition-colors p-1 flex items-center gap-1.5"
            title={`Call Adil Ali (${PERSONAL_INFO.phoneFormatted})`}
            aria-label={`Call Adil Ali at ${PERSONAL_INFO.phoneFormatted}`}
          >
            <Phone className="w-4 h-4" />
            <span className="hidden lg:inline">{PERSONAL_INFO.phoneFormatted}</span>
          </a>

          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="hover:text-[#FF6B35] transition-colors p-1"
            title={`Email: ${PERSONAL_INFO.email}`}
            aria-label={`Send email to ${PERSONAL_INFO.email}`}
          >
            <Mail className="w-4 h-4" />
          </a>

          {onResumeClick && (
            <button
              onClick={onResumeClick}
              className="hover:text-[#FF6B35] transition-colors p-1 flex items-center gap-1 cursor-pointer text-neutral-300"
              title="View Resume"
              aria-label="View Resume"
            >
              <span>Resume</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#FF6B35]" />
            </button>
          )}

          <div className="w-[1px] h-3.5 bg-[#222226]" />

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            aria-label="Scroll back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#FF6B35]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
