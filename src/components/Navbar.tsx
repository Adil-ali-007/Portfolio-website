import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onContactClick: () => void;
  onResumeClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onContactClick, onResumeClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-4 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl transition-all duration-300 rounded-full ${
          isScrolled
            ? 'bg-[#08080c]/92 border border-white/[0.14] shadow-[0_12px_40px_rgba(0,0,0,0.85)] backdrop-blur-xl py-2 sm:py-2.5 px-4 sm:px-6'
            : 'bg-[#0d0d12]/80 border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.55)] backdrop-blur-lg py-2.5 sm:py-3 px-4 sm:px-6'
        }`}
      >
        <div className="flex items-center justify-between gap-4 sm:gap-6">
          {/* Zone 1: Single text element Brand wordmark */}
          <a
            href="#"
            className="text-base sm:text-lg font-display font-bold tracking-tight text-[#F5F5F5] hover:text-[#FF6B35] transition-colors whitespace-nowrap shrink-0 group flex items-center gap-2 pl-1"
          >
            <span>ADIL ALI</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] inline-block shadow-[0_0_8px_#FF6B35]" />
          </a>

          {/* Zone 2: Centered nav links */}
          <nav className="hidden md:flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-neutral-300 mx-auto">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/[0.08] transition-all duration-200 whitespace-nowrap shrink-0 text-neutral-300 hover:shadow-inner"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Resume & Contact actions */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0 pr-1">
            {onResumeClick && (
              <button
                onClick={onResumeClick}
                className="px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.1] hover:border-[#FF6B35]/60 rounded-full transition-all duration-200 shadow-sm whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer group"
                title="View Adil Ali's Resume"
              >
                <span>Resume</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#FF6B35] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            )}

            <button
              onClick={onContactClick}
              className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#FF6B35] hover:bg-[#ff7b47] rounded-full transition-all duration-200 shadow-md shadow-[#FF6B35]/25 hover:shadow-[#FF6B35]/40 whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 md:hidden">
            {onResumeClick && (
              <button
                onClick={onResumeClick}
                className="px-3 py-1 text-xs text-white bg-white/[0.05] border border-white/[0.1] hover:border-[#FF6B35] rounded-full flex items-center gap-1.5"
                title="View Resume"
              >
                <span className="font-semibold uppercase tracking-wider text-[10px]">Resume</span>
                <ArrowUpRight className="w-3 h-3 text-[#FF6B35]" />
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-full text-neutral-300 hover:text-white hover:bg-white/[0.08] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-4 top-20 z-50 bg-[#0d0d12]/98 border border-white/[0.12] rounded-3xl backdrop-blur-2xl p-6 md:hidden flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.9)] max-w-lg mx-auto animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-[#FF6B35] mb-2 flex items-center justify-between">
              <span>Navigation</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
            </div>
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl text-lg font-display font-medium text-neutral-200 hover:text-white hover:bg-white/[0.06] transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-neutral-500" />
                </a>
              ))}
            </nav>
          </div>

          <div className="pt-6 mt-4 border-t border-white/[0.08] space-y-3">
            <div className="text-[11px] text-neutral-400 font-mono">
              {PERSONAL_INFO.education.degreeShort} · Class of {PERSONAL_INFO.education.graduation}
            </div>
            <div className="flex gap-2.5">
              {onResumeClick && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onResumeClick();
                  }}
                  className="flex-1 py-2.5 text-center text-xs font-mono uppercase tracking-wider text-white bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] rounded-full flex items-center justify-center gap-1.5"
                >
                  <span className="font-semibold uppercase tracking-wider text-xs">Resume</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#FF6B35]" />
                </button>
              )}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onContactClick();
                }}
                className="flex-1 py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-white bg-[#FF6B35] hover:bg-[#ff7b47] rounded-full flex items-center justify-center gap-1.5 shadow-lg shadow-[#FF6B35]/25"
              >
                <span>Contact</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Navbar;
