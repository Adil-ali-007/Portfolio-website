import React, { useState, useRef, useEffect } from 'react';
import {
  Mail,
  Github,
  Linkedin,
  Phone,
  Copy,
  Check,
  ArrowUpRight,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { gsap, prefersReducedMotion } from '../utils/animations';

interface ContactProps {
  onResumeClick?: () => void;
}

export const Contact: React.FC<ContactProps> = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ambientGlowRef = useRef<HTMLDivElement>(null);

  // Direct contact copy states
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Header Reveal
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      headerTl
        .fromTo(
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
        );

      // 2. Form & Direct Cards Reveal
      if (formRef.current && cardsRef.current) {
        gsap.fromTo(
          [formRef.current, cardsRef.current],
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 3. Ambient Glow Parallax
      if (ambientGlowRef.current) {
        gsap.to(ambientGlowRef.current, {
          scale: 1.25,
          opacity: 0.9,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: 1.5,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2200);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in your name, email, and message.');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    try {
      // Send directly to Adil's email (adil798267@gmail.com) via FormSubmit AJAX API
      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(PERSONAL_INFO.email)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Portfolio Message from ${formData.name}`,
          _replyto: formData.email,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Server returned an unexpected response');
      }
    } catch {
      // If network fails (or adblocker blocks FormSubmit), fallback smoothly with mailto option
      setStatus('error');
      setErrorMessage('Could not send automatically. Click below to send directly via your mail client.');
    }
  };

  const handleDirectMailto = () => {
    const subject = encodeURIComponent(`Portfolio Message from ${formData.name || 'Visitor'}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-28 sm:py-36 bg-[#080808] border-t border-[#1c1c20] overflow-hidden"
    >
      {/* Background ambient glow */}
      <div
        ref={ambientGlowRef}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-[#FF6B35]/10 rounded-full blur-[140px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div
            ref={kickerRef}
            className="text-xs font-mono uppercase tracking-widest text-[#FF6B35] mb-3 flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
            <span>Get In Touch</span>
          </div>
          <div className="overflow-hidden mb-4">
            <h2
              ref={titleRef}
              className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white uppercase leading-tight"
            >
              LET'S BUILD SOMETHING.
            </h2>
          </div>
          <p
            ref={introRef}
            className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed"
          >
            Send a direct message or connect with me through my social channels.
          </p>
        </div>

        {/* 2-Column Clean Layout: Simple Message Form + Direct Contact Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Simple, Functional Contact Form */}
          <div
            ref={formRef}
            className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#0d0d12] border border-[#202028] shadow-2xl relative"
          >
            <div className="mb-6">
              <h3 className="text-lg font-display font-semibold text-white tracking-wide">
                Send a Message
              </h3>
              <p className="text-xs text-neutral-400 font-mono mt-1">
                Delivered straight to {PERSONAL_INFO.email}
              </p>
            </div>

            {status === 'success' ? (
              <div className="py-8 px-6 rounded-xl bg-[#101b15] border border-emerald-500/30 text-center animate-fade-in">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                <h4 className="text-base font-semibold text-white mb-1">
                  Message Sent Successfully!
                </h4>
                <p className="text-xs text-neutral-300 font-mono max-w-md mx-auto mb-5 leading-relaxed">
                  Thank you! Your message has been forwarded directly to my email (<span className="text-emerald-400">{PERSONAL_INFO.email}</span>). I'll reply to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="px-4 py-2 rounded-lg bg-[#18281e] hover:bg-[#203628] border border-emerald-500/40 text-xs font-mono text-emerald-300 transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl bg-[#13131a] border border-[#242430] focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] outline-none text-white text-sm placeholder:text-neutral-600 transition-colors"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email address"
                      className="w-full px-4 py-3 rounded-xl bg-[#13131a] border border-[#242430] focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] outline-none text-white text-sm placeholder:text-neutral-600 transition-colors"
                    />
                  </div>
                </div>

                {/* Message Input */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, idea, or opportunity..."
                    className="w-full px-4 py-3 rounded-xl bg-[#13131a] border border-[#242430] focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] outline-none text-white text-sm placeholder:text-neutral-600 transition-colors resize-none"
                  />
                </div>

                {/* Error Banner */}
                {status === 'error' && (
                  <div className="p-3 rounded-xl bg-[#1c1212] border border-red-500/40 text-xs font-mono text-red-300 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{errorMessage || 'Failed to send message.'}</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleDirectMailto}
                      className="px-2.5 py-1 rounded-md bg-red-950/80 hover:bg-red-900 border border-red-500/50 text-[11px] text-white shrink-0 cursor-pointer transition-colors"
                    >
                      Open Email App
                    </button>
                  </div>
                )}

                {/* Submit Row */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] font-mono text-neutral-400">
                    Direct delivery to Adil's inbox
                  </span>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="px-6 py-3 rounded-xl bg-[#FF6B35] hover:bg-[#ff7b47] disabled:opacity-60 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all duration-200 cursor-pointer shadow-lg shadow-[#FF6B35]/20 hover:shadow-[#FF6B35]/30 active:scale-[0.98]"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Direct Contact Cards Column */}
          <div
            ref={cardsRef}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4"
          >
            {/* Direct Email Card */}
            <div className="p-5 rounded-2xl bg-[#0d0d12] border border-[#202028] hover:border-[#FF6B35]/40 transition-all duration-300 flex items-center justify-between group shadow-lg">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#16161e] border border-[#262632] flex items-center justify-center text-[#FF6B35] shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                    Email
                  </div>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-sm font-mono font-medium text-white hover:text-[#FF6B35] transition-colors block truncate"
                    title={PERSONAL_INFO.email}
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-[#15151c] hover:bg-[#1f1f26] border border-[#282834] text-neutral-300 hover:text-white transition-colors cursor-pointer"
                  title="Copy email address"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-neutral-400" />
                  )}
                </button>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="p-2 rounded-lg bg-[#181822] hover:bg-[#22222e] border border-[#2c2c3a] text-neutral-300 hover:text-white transition-colors"
                  title="Write email"
                  aria-label="Write email"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#FF6B35]" />
                </a>
              </div>
            </div>

            {/* Direct Phone Card */}
            <div className="p-5 rounded-2xl bg-[#0d0d12] border border-[#202028] hover:border-[#FF6B35]/40 transition-all duration-300 flex items-center justify-between group shadow-lg">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#16161e] border border-[#262632] flex items-center justify-center text-[#FF6B35] shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                    Phone
                  </div>
                  <a
                    href={`tel:${PERSONAL_INFO.phone}`}
                    className="text-sm font-mono font-medium text-white hover:text-[#FF6B35] transition-colors block truncate"
                  >
                    {PERSONAL_INFO.phoneFormatted}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className="p-2 rounded-lg bg-[#15151c] hover:bg-[#1f1f26] border border-[#282834] text-neutral-300 hover:text-white transition-colors cursor-pointer"
                  title="Copy phone number"
                  aria-label="Copy phone number"
                >
                  {copiedPhone ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-neutral-400" />
                  )}
                </button>
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="p-2 rounded-lg bg-[#181822] hover:bg-[#22222e] border border-[#2c2c3a] text-neutral-300 hover:text-white transition-colors"
                  title="Call phone number"
                  aria-label="Call phone number"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#FF6B35]" />
                </a>
              </div>
            </div>

            {/* GitHub Card */}
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-[#0d0d12] border border-[#202028] hover:border-[#FF6B35]/40 transition-all duration-300 flex items-center justify-between group shadow-lg"
              aria-label="Visit Adil Ali's GitHub Profile"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#16161e] border border-[#262632] flex items-center justify-center text-white group-hover:text-[#FF6B35] shrink-0 group-hover:scale-105 transition-transform">
                  <Github className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                    GitHub
                  </div>
                  <div className="text-sm font-mono font-medium text-white group-hover:text-[#FF6B35] transition-colors truncate">
                    @{PERSONAL_INFO.githubUsername}
                  </div>
                </div>
              </div>

              <div className="p-2 rounded-lg bg-[#181822] text-neutral-400 group-hover:text-white transition-colors">
                <ArrowUpRight className="w-3.5 h-3.5 text-[#FF6B35] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>

            {/* LinkedIn Card */}
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-[#0d0d12] border border-[#202028] hover:border-[#FF6B35]/40 transition-all duration-300 flex items-center justify-between group shadow-lg"
              aria-label="Visit Adil Ali's LinkedIn Profile"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#16161e] border border-[#262632] flex items-center justify-center text-white group-hover:text-[#FF6B35] shrink-0 group-hover:scale-105 transition-transform">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                    LinkedIn
                  </div>
                  <div className="text-sm font-mono font-medium text-white group-hover:text-[#FF6B35] transition-colors truncate">
                    Adil Ali
                  </div>
                </div>
              </div>

              <div className="p-2 rounded-lg bg-[#181822] text-neutral-400 group-hover:text-white transition-colors">
                <ArrowUpRight className="w-3.5 h-3.5 text-[#FF6B35] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
