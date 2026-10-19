import React, { useRef, useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Upload, Video, Check, RefreshCw } from 'lucide-react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../utils/animations';

interface CinematicScrollExperienceProps {
  customVideoUrl?: string;
}

// ---------------------------------------------------------------------------
// 3D Procedural Scenes Replicating the Uploaded Video Frames
// ---------------------------------------------------------------------------

// Stage 1 Scene: The Monolith with Glowing Vertical Slit and Sweeping Fiery Magma Wall (00:00 - 00:04)
function Stage1MonolithScene({ progress }: { progress: number }) {
  const monolithRef = useRef<THREE.Group>(null);
  const magmaWallRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (monolithRef.current) {
      monolithRef.current.rotation.y = THREE.MathUtils.damp(
        monolithRef.current.rotation.y,
        progress * 0.8,
        3,
        delta
      );
    }
    if (magmaWallRef.current) {
      // Swell and widen the fiery horizontal horizon
      const scaleX = 1 + progress * 2.5;
      magmaWallRef.current.scale.set(scaleX, 1, 1);
    }
  });

  return (
    <group position={[0, -0.2, 0]}>
      {/* Central Dark Monolith with Slit */}
      <group ref={monolithRef}>
        {/* Left Monolith Pillar */}
        <mesh position={[-0.4, 0, 0]}>
          <boxGeometry args={[0.65, 3.2, 0.65]} />
          <meshStandardMaterial color="#0c0c0f" roughness={0.2} metalness={0.9} />
        </mesh>

        {/* Right Monolith Pillar */}
        <mesh position={[0.4, 0, 0]}>
          <boxGeometry args={[0.65, 3.2, 0.65]} />
          <meshStandardMaterial color="#0c0c0f" roughness={0.2} metalness={0.9} />
        </mesh>

        {/* Back Step Pillars */}
        <mesh position={[-0.3, 0.4, -0.6]}>
          <boxGeometry args={[0.55, 3.8, 0.55]} />
          <meshStandardMaterial color="#08080a" roughness={0.25} metalness={0.85} />
        </mesh>
        <mesh position={[0.3, 0.4, -0.6]}>
          <boxGeometry args={[0.55, 3.8, 0.55]} />
          <meshStandardMaterial color="#08080a" roughness={0.25} metalness={0.85} />
        </mesh>

        {/* Radiant Molten Orange Slit Core */}
        <mesh position={[0, -0.2, 0]}>
          <boxGeometry args={[0.14, 3.0, 0.4]} />
          <meshStandardMaterial
            color="#FF4500"
            emissive="#FF6B35"
            emissiveIntensity={4.5}
            roughness={0.1}
          />
        </mesh>

        <pointLight position={[0, 0, 0.4]} color="#FF6B35" intensity={8} distance={7} />
      </group>

      {/* Sweeping Fiery Magma Wall / Horizon Laser Beam (00:01 - 00:03) */}
      <mesh ref={magmaWallRef} position={[2.2, 0.2, -1.2]} rotation={[0, -0.2, 0]}>
        <planeGeometry args={[7, 1.8]} />
        <meshBasicMaterial
          color="#FF5500"
          transparent
          opacity={0.85}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Stepped Dark Metallic Floor Blocks */}
      {[-2, -1, 0, 1, 2].map((x) =>
        [-2, -1, 0, 1, 2].map((z) => (
          <mesh key={`${x}-${z}`} position={[x * 1.3, -1.9, z * 1.3]}>
            <boxGeometry args={[1.2, 0.35, 1.2]} />
            <meshStandardMaterial color="#0e0e12" roughness={0.3} metalness={0.85} />
          </mesh>
        ))
      )}
    </group>
  );
}

// Stage 2 Scene: Isometric Circuit Grid with Glowing Molten Orange Canal (00:04 - 00:08)
function Stage2CircuitScene({ progress }: { progress: number }) {
  const gridRef = useRef<THREE.Group>(null);
  const canalRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (gridRef.current) {
      gridRef.current.position.z = THREE.MathUtils.damp(
        gridRef.current.position.z,
        (progress - 0.5) * 1.5,
        3,
        delta
      );
    }
    if (canalRef.current) {
      const mat = canalRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 3.5 + Math.sin(progress * 15) * 0.8;
    }
  });

  const blocks = useMemo(() => {
    const list = [];
    for (let i = -5; i <= 5; i++) {
      for (let j = -5; j <= 5; j++) {
        // Exclude central canal pathway
        if (Math.abs(j - Math.round(i * 0.3)) <= 1) continue;
        const h = 0.3 + ((Math.sin(i * 2 + j) + 1) / 2) * 0.9;
        const isGlow = (i * 3 + j * 7) % 5 === 0;
        list.push({ x: i * 0.7, z: j * 0.7, h, isGlow });
      }
    }
    return list;
  }, []);

  return (
    <group ref={gridRef} position={[0, -0.6, 0]} rotation={[0.45, -0.4, 0]}>
      {/* Central Molten Orange Canal / Energy River */}
      <mesh ref={canalRef} position={[0, -1.35, 0]} rotation={[-Math.PI / 2, 0, 0.3]}>
        <planeGeometry args={[12, 1.2]} />
        <meshStandardMaterial
          color="#FF3D00"
          emissive="#FF6B35"
          emissiveIntensity={4}
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>

      {/* Origin Tower on the Canal */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[0.6, 1.8, 0.6]} />
        <meshStandardMaterial
          color="#FF4500"
          emissive="#FF6B35"
          emissiveIntensity={3.2}
          roughness={0.15}
        />
      </mesh>

      {/* Surrounding Stepped Dark Blocks with Glowing Windows */}
      {blocks.map((b, idx) => (
        <group key={idx} position={[b.x, -1.4 + b.h / 2, b.z]}>
          <mesh>
            <boxGeometry args={[0.62, b.h, 0.62]} />
            <meshStandardMaterial color="#111116" roughness={0.35} metalness={0.8} />
          </mesh>
          {b.isGlow && (
            <mesh position={[0, b.h / 2 + 0.01, 0]}>
              <planeGeometry args={[0.25, 0.25]} />
              <meshBasicMaterial color="#FF6B35" />
            </mesh>
          )}
        </group>
      ))}

      <pointLight position={[0, 1, 0]} color="#FF6B35" intensity={9} distance={8} />
    </group>
  );
}

// Stage 3 Scene: Modular 3D Glowing Amber Voxel Matrix Wall (00:08 - 00:11)
function Stage3VoxelMatrixScene({ progress }: { progress: number }) {
  const wallRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (wallRef.current) {
      wallRef.current.position.y = THREE.MathUtils.damp(
        wallRef.current.position.y,
        (progress - 0.85) * 1.8,
        3,
        delta
      );
    }
  });

  const voxels = useMemo(() => {
    const list = [];
    for (let r = -4; r <= 4; r++) {
      for (let c = -4; c <= 4; c++) {
        const depth = 0.4 + ((Math.cos(r * 3 + c * 2) + 1) / 2) * 0.8;
        const isWarmCore = c >= 1;
        list.push({ r, c, depth, isWarmCore });
      }
    }
    return list;
  }, []);

  return (
    <group ref={wallRef} position={[0, 0, 0]} rotation={[0, 0.35, 0]}>
      {/* Radiant Orange Light Wall Barrier on the Side */}
      <mesh position={[2.8, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[6, 5]} />
        <meshBasicMaterial color="#FF5722" />
      </mesh>

      {/* Grid of Micro-cubes / Voxels */}
      {voxels.map((v, i) => (
        <mesh key={i} position={[v.c * 0.55, v.r * 0.55, v.depth / 2]}>
          <boxGeometry args={[0.5, 0.5, v.depth]} />
          <meshStandardMaterial
            color={v.isWarmCore ? '#FF7A45' : '#141418'}
            emissive={v.isWarmCore ? '#FF5500' : '#000000'}
            emissiveIntensity={v.isWarmCore ? 1.8 : 0}
            roughness={0.25}
            metalness={0.8}
          />
        </mesh>
      ))}

      <pointLight position={[2, 0, 1]} color="#FF6B35" intensity={10} distance={9} />
    </group>
  );
}

// Composite 3D Canvas Switcher based on Scroll Progress
function ProceduralCinematicScene({ progress }: { progress: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 4.8], fov: 45 }}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 5, 4]} color="#FFE0B2" intensity={1.5} />
      <directionalLight position={[-4, 3, -4]} color="#FF6B35" intensity={1.8} />

      {progress <= 0.38 && <Stage1MonolithScene progress={progress / 0.38} />}
      {progress > 0.38 && progress <= 0.72 && (
        <Stage2CircuitScene progress={(progress - 0.38) / 0.34} />
      )}
      {progress > 0.72 && <Stage3VoxelMatrixScene progress={(progress - 0.72) / 0.28} />}
    </Canvas>
  );
}

// ---------------------------------------------------------------------------
// Main Component: CinematicScrollExperience
// ---------------------------------------------------------------------------
export const CinematicScrollExperience: React.FC<CinematicScrollExperienceProps> = ({
  customVideoUrl,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Milestone Text Refs
  const stage1Ref = useRef<HTMLDivElement>(null);
  const stage2Ref = useRef<HTMLDivElement>(null);
  const stage3Ref = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Video State
  const [videoSrc, setVideoSrc] = useState<string>(() => {
    return (
      customVideoUrl ||
      (typeof window !== 'undefined'
        ? localStorage.getItem('adil_cinematic_video_url') || ''
        : '') ||
      '/cinematic.mp4'
    );
  });
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [duration, setDuration] = useState(12);
  const [currentProgress, setCurrentProgress] = useState(0);

  const isSeekingRef = useRef(false);

  // Handle Video Metadata
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const dur = videoRef.current.duration;
      if (!isNaN(dur) && dur > 0) {
        setDuration(dur);
      }
      setVideoLoaded(true);
      setVideoError(false);
      videoRef.current.pause();
    }
  };

  const handleVideoError = () => {
    setVideoError(true);
    setVideoLoaded(false);
  };

  // Video seek complete callback
  const handleSeeked = () => {
    isSeekingRef.current = false;
  };

  // Handle local video file upload / drop
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setVideoError(false);
      try {
        localStorage.setItem('adil_cinematic_video_url', url);
      } catch {
        // ignore storage limits
      }
    }
  };

  // GSAP ScrollTrigger to lock viewport and scrub video / 3D scenes
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=250%',
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            setCurrentProgress(p);

            // Frame-by-frame scrub video playback without overlapping seeks
            const video = videoRef.current;
            if (video && videoLoaded && !videoError && duration > 0) {
              const targetTime = Math.max(0, Math.min(p * duration, duration - 0.05));
              if (!isSeekingRef.current) {
                isSeekingRef.current = true;
                video.currentTime = targetTime;
              }
            }

            // Update bottom progress bar
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${p * 100}%`;
            }
          },
        },
      });

      // Chapter Overlays synchronized to the exact 3 video phases
      // Stage 1: 0% to 32% (The Monolith & Horizon Magma Beam)
      tl.fromTo(
        stage1Ref.current,
        { opacity: 0, y: 35, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: 'power2.out' },
        0
      ).to(
        stage1Ref.current,
        { opacity: 0, y: -30, scale: 1.05, duration: 0.2, ease: 'power2.in' },
        0.32
      );

      // Stage 2: 36% to 68% (The Circuit Grid & Molten Orange Canal)
      tl.fromTo(
        stage2Ref.current,
        { opacity: 0, y: 35, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: 'power2.out' },
        0.36
      ).to(
        stage2Ref.current,
        { opacity: 0, y: -30, scale: 1.05, duration: 0.2, ease: 'power2.in' },
        0.68
      );

      // Stage 3: 72% to 100% (The Modular Glowing Voxel Matrix Wall)
      tl.fromTo(
        stage3Ref.current,
        { opacity: 0, y: 35, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: 'power2.out' },
        0.72
      ).to(
        stage3Ref.current,
        { opacity: 0, y: -25, scale: 1.02, duration: 0.2, ease: 'power2.in' },
        0.96
      );

      // Refresh downstream ScrollTrigger instances so pin spacing is properly registered
      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, [duration, videoLoaded, videoError]);

  return (
    <section
      id="cinematic"
      ref={containerRef}
      className="relative w-full h-screen bg-[#080808] overflow-hidden select-none"
    >
      {/* 1. HTML5 Video Layer with Frame-By-Frame Scrubbing */}
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          playsInline
          muted
          preload="auto"
          onLoadedMetadata={handleLoadedMetadata}
          onError={handleVideoError}
          onSeeked={handleSeeked}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 pointer-events-none z-0 ${
            videoLoaded && !videoError ? 'opacity-90' : 'opacity-0'
          }`}
          style={{
            filter: 'contrast(1.05) brightness(0.9) saturate(1.05)',
            backgroundColor: '#080808',
          }}
        />
      )}

      {/* 2. Three.js Procedural Video Recreation (Active when MP4 is loading or unattached) */}
      <div
        className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-700 z-1 ${
          videoLoaded && !videoError ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <ProceduralCinematicScene progress={currentProgress} />
      </div>

      {/* 3. Subtle Eye-Comfort Scrims & Deep Vignette */}
      <div className="absolute inset-0 bg-[#080808]/25 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808] pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/75 via-transparent to-[#080808]/75 pointer-events-none z-10" />

      {/* 4. Synchronized Overlays for Scroll Narrative Matching User Screenshot Exactly */}
      <div className="absolute inset-0 z-20 flex items-center justify-center p-6 sm:p-12 pointer-events-none">
        {/* Stage 1: Foundational Rigor */}
        <div
          ref={stage1Ref}
          className="max-w-2xl text-center space-y-4 pointer-events-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16161c]/90 border border-[#2a2a34] text-xs font-mono text-[#FF6B35] tracking-widest uppercase mb-2 shadow-xl backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] animate-pulse" />
            <span>Chapter 01 · Motion & Architecture</span>
          </div>
          <h3 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-tight uppercase leading-tight drop-shadow-[0_12px_40px_rgba(0,0,0,0.95)]">
            FOUNDATIONAL RIGOR.
          </h3>
          <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed max-w-xl mx-auto drop-shadow-lg">
            Architecting robust software systems, performant backends, and algorithmic logic from first principles.
          </p>
        </div>

        {/* Stage 2: Scalable Horizons */}
        <div
          ref={stage2Ref}
          className="max-w-2xl text-center space-y-4 pointer-events-auto absolute"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16161c]/90 border border-[#2a2a34] text-xs font-mono text-[#FF6B35] tracking-widest uppercase mb-2 shadow-xl backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] animate-pulse" />
            <span>Chapter 02 · Full-Stack Horizons</span>
          </div>
          <h3 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-tight uppercase leading-tight drop-shadow-[0_12px_40px_rgba(0,0,0,0.95)]">
            SCALABLE HORIZONS.
          </h3>
          <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed max-w-xl mx-auto drop-shadow-lg">
            High-throughput RESTful endpoints, asynchronous streaming, and reactive full-stack web applications.
          </p>
        </div>

        {/* Stage 3: Creative Computing */}
        <div
          ref={stage3Ref}
          className="max-w-2xl text-center space-y-4 pointer-events-auto absolute"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16161c]/90 border border-[#2a2a34] text-xs font-mono text-[#FF6B35] tracking-widest uppercase mb-2 shadow-xl backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] animate-pulse" />
            <span>Chapter 03 · Intelligent Synergy</span>
          </div>
          <h3 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-tight uppercase leading-tight drop-shadow-[0_12px_40px_rgba(0,0,0,0.95)]">
            CREATIVE COMPUTING.
          </h3>
          <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed max-w-xl mx-auto drop-shadow-lg">
            Synthesizing spatial Three.js graphics, machine learning algorithms, and seamless human experiences.
          </p>
        </div>
      </div>

      {/* 5. Quick Video File Selector (Lets User Connect Their Video File in 1 Click) */}
      <div className="absolute top-6 right-6 z-30">
        <input
          ref={fileInputRef}
          type="file"
          accept="video/mp4,video/webm,video/quicktime"
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-3.5 py-1.5 rounded-full bg-[#14141a]/80 hover:bg-[#1c1c24] border border-white/[0.1] hover:border-[#FF6B35]/50 text-neutral-300 hover:text-white text-xs font-mono flex items-center gap-2 backdrop-blur-md transition-all shadow-md cursor-pointer group"
          title="Select and attach your video file (.mp4, .webm)"
        >
          <Video className="w-3.5 h-3.5 text-[#FF6B35] group-hover:scale-110 transition-transform" />
          <span>{videoLoaded && !videoError ? 'Video Active' : 'Load Video File'}</span>
          {videoLoaded && !videoError && <Check className="w-3.5 h-3.5 text-emerald-400" />}
        </button>
      </div>

      {/* 6. Progress Bar & Scroll Indicator Matching User Screenshot */}
      <div className="absolute bottom-8 left-8 right-8 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2.5 text-xs font-mono text-neutral-400">
          <div className="w-4 h-7 rounded-full border border-neutral-600 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-[#FF6B35] animate-bounce" />
          </div>
          <span className="tracking-widest uppercase text-[11px] font-mono text-neutral-300">
            SCROLL TO SCRUB MOTION
          </span>
        </div>

        <div className="w-36 sm:w-48 h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full bg-[#FF6B35] transition-all duration-75"
            style={{ width: `${currentProgress * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
};

export default CinematicScrollExperience;
