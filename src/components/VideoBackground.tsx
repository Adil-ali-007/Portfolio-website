import React, { useRef, useState, useEffect } from 'react';
import { VideoConfig } from '../types';

interface VideoBackgroundProps {
  config: VideoConfig;
  scrollProgress: number; // 0 to 1
  onOpenSettings?: () => void;
  onTogglePlay?: () => void;
  onToggleScrollScrub?: () => void;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  config,
  scrollProgress,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoDuration, setVideoDuration] = useState(10);
  const targetTimeRef = useRef(0);

  // Active video source from config, local storage, or default cinematic asset
  const activeVideoUrl =
    config.sourceUrl ||
    (typeof window !== 'undefined' ? localStorage.getItem('adil_cinematic_video_url') || '' : '') ||
    '/cinematic.mp4';

  // Initialize and handle video source
  useEffect(() => {
    setVideoError(false);
    setVideoLoaded(false);
    const video = videoRef.current;
    if (video && activeVideoUrl) {
      video.load();
    }
  }, [activeVideoUrl]);

  // Video metadata loaded
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const dur = videoRef.current.duration;
      if (!isNaN(dur) && dur > 0) {
        setVideoDuration(dur);
      }
      setVideoLoaded(true);
      setVideoError(false);

      if (config.scrollScrub) {
        videoRef.current.pause();
      } else if (config.isPlaying && !config.reducedMotion) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  // Smooth scroll-by-scroll scrubber with damped interpolation to prevent sudden flash
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !config.scrollScrub || !videoLoaded) return;

    let animId: number;

    const updateFrame = () => {
      if (video && !video.seeking) {
        const target = Math.max(0, Math.min(scrollProgress * videoDuration, videoDuration - 0.05));
        targetTimeRef.current = target;

        const diff = target - video.currentTime;
        if (Math.abs(diff) > 0.04) {
          // Smooth jump without sudden flash
          video.currentTime = target;
        }
      }
      animId = requestAnimationFrame(updateFrame);
    };

    video.pause();
    animId = requestAnimationFrame(updateFrame);

    return () => cancelAnimationFrame(animId);
  }, [config.scrollScrub, scrollProgress, videoDuration, videoLoaded]);

  // Handle standard play/pause when scrollScrub is disabled
  useEffect(() => {
    const video = videoRef.current;
    if (!video || config.scrollScrub) return;

    if (config.isPlaying && !config.reducedMotion) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [config.isPlaying, config.reducedMotion, config.scrollScrub]);

  // Procedural SVG variables linked to scroll progress with soft eye-friendly limits
  const beamY = 780 - scrollProgress * 320;
  const fissureWidth = 16 + scrollProgress * 22;
  const glowOpacity = 0.3 + scrollProgress * 0.35;
  const monolithScale = 1 + scrollProgress * 0.12;
  const floorOffset = scrollProgress * 70;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0 bg-[#080808]">
      {/* 1. Procedural Sci-Fi Monolith Canvas / Poster Fallback (with soft eye-comfort palette) */}
      <div
        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
          videoLoaded && !videoError ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <svg
          viewBox="0 0 1920 1080"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="fissureCoreScroll" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFA07A" stopOpacity="0.8" />
              <stop offset="35%" stopColor="#FF6B35" stopOpacity="0.6" />
              <stop offset="70%" stopColor="#E65100" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#080808" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="horizontalBeamScroll" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF3D00" stopOpacity="0" />
              <stop offset="30%" stopColor="#FF6B35" stopOpacity="0.75" />
              <stop offset="50%" stopColor="#FFCCAA" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#FF6B35" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#FF3D00" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="blockShadeScroll" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1a1a20" />
              <stop offset="50%" stopColor="#101014" />
              <stop offset="100%" stopColor="#08080a" />
            </linearGradient>
          </defs>

          {/* Deep dark void base */}
          <rect width="1920" height="1080" fill="#080808" />

          {/* Ambient warm glow, dampened for eye comfort */}
          <circle
            cx={1000 + scrollProgress * 180}
            cy="540"
            r={650 + scrollProgress * 250}
            fill="url(#fissureCoreScroll)"
            opacity={glowOpacity}
          />

          {/* Perspective floor grid blocks */}
          <g opacity="0.35" transform={`translate(0, ${floorOffset * 0.25})`}>
            <rect x="750" y="380" width="160" height="340" fill="url(#blockShadeScroll)" stroke="#1a1a1e" strokeWidth="1" />
            <rect x="910" y="320" width="140" height="420" fill="url(#blockShadeScroll)" stroke="#202024" strokeWidth="1" />
            <rect x="1050" y="440" width="180" height="300" fill="url(#blockShadeScroll)" stroke="#1a1a1e" strokeWidth="1" />
            <rect x="620" y="480" width="130" height="260" fill="url(#blockShadeScroll)" stroke="#16161a" strokeWidth="1" />
            <rect x="1230" y="400" width="150" height="360" fill="url(#blockShadeScroll)" stroke="#1e1e22" strokeWidth="1" />
          </g>

          {/* Smooth glowing magma beam with soft amber core instead of blinding pure white */}
          <g>
            <path
              d={`M 200 ${beamY + 60} Q 960 ${beamY - 40} 1900 ${beamY - 120}`}
              stroke="url(#horizontalBeamScroll)"
              strokeWidth={fissureWidth}
              fill="none"
              filter="blur(10px)"
            />
            <path
              d={`M 200 ${beamY + 60} Q 960 ${beamY - 40} 1900 ${beamY - 120}`}
              stroke="#FFE0CC"
              strokeWidth={Math.max(1.5, fissureWidth * 0.12)}
              fill="none"
              opacity="0.85"
            />
          </g>

          {/* Central Monolith Tower */}
          <g
            opacity="0.85"
            transform={`translate(${960 * (1 - monolithScale)}, ${540 * (1 - monolithScale)}) scale(${monolithScale})`}
          >
            <rect x="960" y="240" width="40" height="290" fill="#FF5722" filter="blur(8px)" opacity="0.7" />
            <rect x="975" y="250" width="10" height="270" fill="#FFE0CC" opacity="0.8" />
            <rect x="940" y="220" width="35" height="340" fill="#111115" stroke="#222228" />
            <rect x="985" y="220" width="35" height="340" fill="#111115" stroke="#222228" />
          </g>
        </svg>
      </div>

      {/* 2. HTML5 Video Player with smooth brightness transition and glare-free filter */}
      {activeVideoUrl && (
        <video
          ref={videoRef}
          src={activeVideoUrl}
          muted={config.muted}
          loop={config.loop}
          playsInline
          onLoadedMetadata={handleLoadedMetadata}
          onError={() => {
            setVideoError(true);
            setVideoLoaded(false);
          }}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded && !videoError ? 'opacity-85' : 'opacity-0'
          }`}
          style={{
            filter: 'contrast(1.02) brightness(0.85) saturate(0.95)',
            backgroundColor: '#080808',
          }}
        />
      )}

      {/* 3. Eye-Protection Overlay Scrims: Prevents sudden white flashes and eye fatigue when scrolling up/down */}
      <div className="absolute inset-0 bg-[#080808]/45 pointer-events-none mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/90 via-[#080808]/20 to-[#080808]/90 pointer-events-none" />
      <div className="radial-vignette absolute inset-0 pointer-events-none opacity-90" />
    </div>
  );
};

export default VideoBackground;
