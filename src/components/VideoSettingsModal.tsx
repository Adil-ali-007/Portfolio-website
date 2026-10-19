import React, { useState } from 'react';
import { X, Video, Sliders, Check, RotateCcw, Info, Sparkles, ArrowDownUp } from 'lucide-react';
import { VideoConfig } from '../types';

interface VideoSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: VideoConfig;
  onUpdateConfig: (newConfig: Partial<VideoConfig>) => void;
}

export const VideoSettingsModal: React.FC<VideoSettingsModalProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
}) => {
  const [inputUrl, setInputUrl] = useState(config.sourceUrl);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateConfig({ sourceUrl: inputUrl, isCustom: Boolean(inputUrl) });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const samplePresets = [
    {
      name: 'Procedural Monolith Scene (Active Fallback)',
      url: '',
      desc: 'Real-time vector & WebGL recreation of the glowing neon orange canyon fissure monoliths (scrubs with scroll)',
    },
    {
      name: 'High-Retention VFX Reel (MP4)',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      desc: 'Dark cinematic sci-fi VFX footage with keyframe scrubbing support',
    },
    {
      name: 'Sintel Ambient Motion (MP4)',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
      desc: 'High-definition video loop for testing frame-by-frame scroll playback',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-[#0f0f13] border border-[#26262a] rounded-2xl shadow-2xl p-6 z-10 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#222226]">
          <div className="flex items-center gap-2.5">
            <Video className="w-5 h-5 text-[#FF6B35]" />
            <h3 id="video-modal-title" className="text-lg font-display font-semibold text-white">
              Video & Scroll Playback Controls
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-[#1a1a20] transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scroll-Driven Playback Feature Highlight */}
        <div className="mt-5 p-4 rounded-xl bg-[#14141c] border border-[#FF6B35]/30 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white font-medium text-sm">
              <ArrowDownUp className="w-4 h-4 text-[#FF6B35]" />
              <span>Scroll-By-Scroll Playback</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.scrollScrub}
                onChange={(e) => onUpdateConfig({ scrollScrub: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#202026] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF6B35]"></div>
            </label>
          </div>
          <p className="text-xs text-neutral-300 font-light leading-relaxed">
            When enabled, scrolling down advances video frames forward; scrolling up rewinds them backwards in real time.
          </p>
        </div>

        {/* Custom Video Path Input */}
        <div className="mt-5 space-y-4">
          <form onSubmit={handleSaveUrl} className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300">
              Video File Path or Remote URL
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="/assets/hero.mp4 or https://..."
                className="flex-1 bg-[#16161c] border border-[#2a2a30] rounded-lg px-3.5 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF6B35] font-mono"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#FF6B35] hover:bg-[#ff7b47] text-white font-medium text-xs rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
              >
                {saveSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Saved</span>
                  </>
                ) : (
                  <span>Apply Path</span>
                )}
              </button>
            </div>
            <p className="text-[11px] text-neutral-400">
              Place your MP4 or WebM video file in the project <code className="text-[#FF6B35]">public/</code> directory or provide an external streaming URL.
            </p>
          </form>

          {/* Preset options */}
          <div className="space-y-2 pt-2">
            <span className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
              Video Source Presets
            </span>
            <div className="space-y-2">
              {samplePresets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInputUrl(preset.url);
                    onUpdateConfig({ sourceUrl: preset.url, isCustom: Boolean(preset.url) });
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex flex-col gap-1 ${
                    config.sourceUrl === preset.url
                      ? 'bg-[#FF6B35]/10 border-[#FF6B35]/50 text-white'
                      : 'bg-[#141418] border-[#222226] text-neutral-300 hover:border-[#333339]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">{preset.name}</span>
                    {config.sourceUrl === preset.url && (
                      <span className="text-[10px] font-mono text-[#FF6B35]">ACTIVE</span>
                    )}
                  </div>
                  <span className="text-[11px] text-neutral-400">{preset.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Visual Presentation Mode */}
          <div className="pt-3 border-t border-[#222226]">
            <span className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
              Viewport Composition Mode
            </span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: '3d-hybrid', label: 'Hybrid 3D + Video', desc: 'Layered experience' },
                { id: '3d-pure', label: 'Pure 3D Engine', desc: 'Interactive WebGL' },
                { id: 'video-pure', label: 'Cinematic Reel', desc: 'Video focused' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => onUpdateConfig({ mode: m.id as VideoConfig['mode'] })}
                  className={`p-2.5 rounded-xl border text-left transition-colors ${
                    config.mode === m.id
                      ? 'bg-[#FF6B35]/15 border-[#FF6B35] text-white'
                      : 'bg-[#141418] border-[#242428] text-neutral-400 hover:text-white'
                  }`}
                >
                  <div className="font-medium text-xs text-white mb-0.5">{m.label}</div>
                  <div className="text-[10px] text-neutral-400">{m.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="pt-3 border-t border-[#222226] grid grid-cols-2 gap-3 text-xs">
            <label className="flex items-center gap-2 p-2.5 rounded-lg bg-[#141418] border border-[#222226] cursor-pointer">
              <input
                type="checkbox"
                checked={config.loop}
                onChange={(e) => onUpdateConfig({ loop: e.target.checked })}
                className="accent-[#FF6B35]"
              />
              <span className="text-neutral-300">Continuous Loop</span>
            </label>

            <label className="flex items-center gap-2 p-2.5 rounded-lg bg-[#141418] border border-[#222226] cursor-pointer">
              <input
                type="checkbox"
                checked={config.reducedMotion}
                onChange={(e) => onUpdateConfig({ reducedMotion: e.target.checked })}
                className="accent-[#FF6B35]"
              />
              <span className="text-neutral-300">Reduced Motion</span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-[#222226] flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
            <Info className="w-3.5 h-3.5 text-[#FF6B35]" />
            <span>Settings saved automatically to local session.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#1c1c22] hover:bg-[#25252c] border border-[#333339] text-white rounded-lg text-xs font-medium transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
export default VideoSettingsModal;
