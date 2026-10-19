import React, { useState } from 'react';
import { Eye, EyeOff, Sparkles, Box, Sliders, ChevronDown, ChevronUp, RotateCw } from 'lucide-react';

interface Scene3DOverlayControlsProps {
  explodeAmount: number;
  setExplodeAmount: (val: number) => void;
  wireframe: boolean;
  setWireframe: (val: boolean | ((prev: boolean) => boolean)) => void;
  lightIntensity: number;
  setLightIntensity: (val: number) => void;
  autoRotate: boolean;
  setAutoRotate: (val: boolean | ((prev: boolean) => boolean)) => void;
  reducedMotion: boolean;
  setReducedMotion: (val: boolean | ((prev: boolean) => boolean)) => void;
}

export const Scene3DOverlayControls: React.FC<Scene3DOverlayControlsProps> = ({
  explodeAmount,
  setExplodeAmount,
  wireframe,
  setWireframe,
  lightIntensity,
  setLightIntensity,
  autoRotate,
  setAutoRotate,
  reducedMotion,
  setReducedMotion,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-auto flex flex-col items-center max-w-[94vw] w-auto">
      {/* Drawer collapse / expand pill toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="mb-1.5 px-3 py-1 text-xs font-mono tracking-wider uppercase text-neutral-400 hover:text-white bg-[#101010]/90 hover:bg-[#181818] border border-[#262626] rounded-md transition-colors flex items-center gap-1.5 shadow-lg backdrop-blur-md"
        aria-label={collapsed ? 'Show 3D Viewport Controls' : 'Hide 3D Viewport Controls'}
      >
        {collapsed ? (
          <>
            <ChevronUp className="w-3.5 h-3.5 text-[#FF6B35]" />
            <span>Show 3D Engine Dock</span>
          </>
        ) : (
          <>
            <ChevronDown className="w-3.5 h-3.5 text-[#FF6B35]" />
            <span>Zen / Cinema View</span>
          </>
        )}
      </button>

      {/* Main Collapsible Horizontal Dock */}
      {!collapsed && (
        <div className="bg-[#0e0e11]/95 border border-[#242426] rounded-xl px-4 py-2.5 shadow-2xl backdrop-blur-md flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-neutral-300">
          {/* Explode View Slider */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-neutral-400 whitespace-nowrap">Explode</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={explodeAmount}
              onChange={(e) => setExplodeAmount(parseFloat(e.target.value))}
              className="w-20 sm:w-28 accent-[#FF6B35] cursor-pointer h-1.5 bg-[#202024] rounded-lg"
              title="Explode modular geometry"
            />
            <span className="font-mono text-[11px] text-[#FF6B35] tabular-nums w-7">
              {Math.round(explodeAmount * 100)}%
            </span>
          </div>

          <div className="hidden sm:block w-[1px] h-4 bg-[#262626]" />

          {/* Wireframe toggle */}
          <button
            onClick={() => setWireframe((prev) => !prev)}
            className={`px-2.5 py-1 rounded font-mono text-[11px] flex items-center gap-1.5 transition-colors border ${
              wireframe
                ? 'bg-[#FF6B35]/20 text-[#FF6B35] border-[#FF6B35]/50'
                : 'bg-[#18181b] text-neutral-400 border-[#2a2a2e] hover:text-white'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>Wireframe</span>
          </button>

          {/* Auto-rotate toggle */}
          <button
            onClick={() => setAutoRotate((prev) => !prev)}
            className={`px-2.5 py-1 rounded font-mono text-[11px] flex items-center gap-1.5 transition-colors border ${
              autoRotate
                ? 'bg-[#FF6B35]/20 text-[#FF6B35] border-[#FF6B35]/50'
                : 'bg-[#18181b] text-neutral-400 border-[#2a2a2e] hover:text-white'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>{autoRotate ? 'Rotating' : 'Static'}</span>
          </button>

          {/* Light Intensity */}
          <div className="hidden md:flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6B35]" />
            <span className="font-mono text-[11px] text-neutral-400">Glow</span>
            <input
              type="range"
              min="0.4"
              max="1.8"
              step="0.1"
              value={lightIntensity}
              onChange={(e) => setLightIntensity(parseFloat(e.target.value))}
              className="w-16 accent-[#FF6B35] cursor-pointer h-1.5 bg-[#202024] rounded-lg"
            />
          </div>

          {/* Motion preference */}
          <button
            onClick={() => setReducedMotion((prev) => !prev)}
            className={`px-2 py-1 rounded font-mono text-[11px] transition-colors border ${
              reducedMotion
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                : 'bg-[#18181b] text-neutral-400 border-[#2a2a2e] hover:text-white'
            }`}
            title="Toggle reduced motion"
          >
            {reducedMotion ? 'Reduced Motion: ON' : 'Motion: Dynamic'}
          </button>
        </div>
      )}
    </div>
  );
};
export default Scene3DOverlayControls;
