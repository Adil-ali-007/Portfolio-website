/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { VideoBackground } from './components/VideoBackground';
import { VideoSettingsModal } from './components/VideoSettingsModal';
import { ResumeModal } from './components/ResumeModal';
import { RotatingSkillCarousel } from './components/RotatingSkillCarousel';
import { CinematicScrollExperience } from './components/CinematicScrollExperience';
import { RotatingProjectCarousel } from './components/RotatingProjectCarousel';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { VideoConfig } from './types';
import { ScrollTrigger, prefersReducedMotion } from './utils/animations';

export default function App() {
  // Video Configuration State with scroll-by-scroll scrub enabled by default
  const [videoConfig, setVideoConfig] = useState<VideoConfig>(() => {
    const saved = localStorage.getItem('adil_portfolio_video_cfg');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          scrollScrub: parsed.scrollScrub !== undefined ? parsed.scrollScrub : true,
          scrubRange: parsed.scrubRange || 'hero-story',
        };
      } catch {
        // ignore JSON parse error
      }
    }
    return {
      sourceUrl: '', // Default falls back to procedural neon monolith vector & WebGL scene
      isCustom: false,
      isPlaying: true,
      muted: true,
      loop: true,
      reducedMotion: false,
      mode: '3d-hybrid',
      scrollScrub: true, // Scroll by scroll video playback enabled by default
      scrubRange: 'hero-story',
    };
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // 3D Scene Controls State
  const [explodeAmount, setExplodeAmount] = useState(0);
  const [wireframe, setWireframe] = useState(false);
  const [lightIntensity, setLightIntensity] = useState(1.1);
  const [autoRotate, setAutoRotate] = useState(true);

  // Sync reducedMotion from system preference or user toggle
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setVideoConfig((prev) => ({ ...prev, reducedMotion: true }));
    }
  }, []);

  // Persist video configuration in localStorage
  useEffect(() => {
    localStorage.setItem('adil_portfolio_video_cfg', JSON.stringify(videoConfig));
  }, [videoConfig]);

  const updateVideoConfig = (updates: Partial<VideoConfig>) => {
    setVideoConfig((prev) => ({ ...prev, ...updates }));
  };

  const handleTogglePlay = () => {
    setVideoConfig((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const handleToggleScrollScrub = () => {
    setVideoConfig((prev) => ({ ...prev, scrollScrub: !prev.scrollScrub }));
  };

  // Continuous scroll tracking across Hero & About Me
  const [heroAboutScrollProgress, setHeroAboutScrollProgress] = useState(0);
  const heroAboutWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !heroAboutWrapperRef.current) return;

    const st = ScrollTrigger.create({
      trigger: heroAboutWrapperRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.2,
      onUpdate: (self) => {
        setHeroAboutScrollProgress(self.progress);
      },
    });

    return () => st.kill();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F5F5] relative selection:bg-[#FF6B35]/30 selection:text-[#FF6B35]">
      {/* Top Navigation */}
      <Navbar
        onContactClick={() => scrollToSection('contact')}
        onResumeClick={() => setIsResumeOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative">
        {/* Continuous Video Experience spanning Hero & About Me */}
        <div id="hero-about-experience" ref={heroAboutWrapperRef} className="relative">
          {videoConfig.mode !== '3d-pure' && (
            <div className="sticky top-0 h-screen w-full pointer-events-none z-0 overflow-hidden">
              <VideoBackground
                config={videoConfig}
                scrollProgress={heroAboutScrollProgress}
              />
            </div>
          )}

          <div className="relative z-10 -mt-[100vh]">
            {/* Hero Section Container with Scroll-By-Scroll Video & 3D Playback */}
            <Hero
              videoConfig={videoConfig}
              explodeAmount={explodeAmount}
              setExplodeAmount={setExplodeAmount}
              wireframe={wireframe}
              setWireframe={setWireframe}
              lightIntensity={lightIntensity}
              setLightIntensity={setLightIntensity}
              autoRotate={autoRotate}
              setAutoRotate={setAutoRotate}
              reducedMotion={videoConfig.reducedMotion}
              setReducedMotion={(val) => {
                if (typeof val === 'function') {
                  setVideoConfig((prev) => ({ ...prev, reducedMotion: val(prev.reducedMotion) }));
                } else {
                  setVideoConfig((prev) => ({ ...prev, reducedMotion: val }));
                }
              }}
              onExploreClick={() => scrollToSection('projects')}
              onConnectClick={() => scrollToSection('contact')}
              onResumeClick={() => setIsResumeOpen(true)}
              onOpenSettings={() => setIsSettingsOpen(true)}
              onTogglePlay={handleTogglePlay}
              onToggleScrollScrub={handleToggleScrollScrub}
              hasExternalVideoBackground={videoConfig.mode !== '3d-pure'}
            />

            {/* About Section ("ABOUT ME.") with translucent glass so video continues in background */}
            <About
              onResumeClick={() => setIsResumeOpen(true)}
              hasContinuousVideoBackground={videoConfig.mode !== '3d-pure'}
            />
          </div>
        </div>

        {/* 3D Rotating Tech Stack Carousel ("MY TECH STACK.") */}
        <RotatingSkillCarousel />

        {/* Cinematic Scroll Experience (Synchronized Video Scrubbing & Visual Overlays) */}
        <CinematicScrollExperience customVideoUrl={videoConfig.sourceUrl || undefined} />

        {/* 3D Rotating Project Showcase ("SELECTED PROJECTS.") */}
        <RotatingProjectCarousel />

        {/* Experience Section ("WHERE I'VE WORKED.") */}
        <Experience onResumeClick={() => setIsResumeOpen(true)} />

        {/* Contact Section ("LET'S BUILD SOMETHING.") */}
        <Contact onResumeClick={() => setIsResumeOpen(true)} />
      </main>

      {/* Site Footer */}
      <Footer onResumeClick={() => setIsResumeOpen(true)} />

      {/* Modal for Custom Video Path & Viewport Modes */}
      <VideoSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        config={videoConfig}
        onUpdateConfig={updateVideoConfig}
      />

      {/* Modal for Full Curriculum Vitae & Resume */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
