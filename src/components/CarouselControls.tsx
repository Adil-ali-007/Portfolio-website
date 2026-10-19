import React from 'react';
import { ChevronLeft, ChevronRight, RotateCw, Grid, Layers3 } from 'lucide-react';

interface CarouselControlsProps {
  currentIndex: number;
  totalItems: number;
  onPrev: () => void;
  onNext: () => void;
  is3DMode: boolean;
  onToggleMode?: () => void;
  itemName?: string;
}

export const CarouselControls: React.FC<CarouselControlsProps> = ({
  currentIndex,
  totalItems,
  onPrev,
  onNext,
  is3DMode,
  onToggleMode,
  itemName = 'Item',
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-4 px-2 select-none">
      {/* Scroll & Drag Hint */}
      <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] animate-pulse" />
        <span className="hidden sm:inline">Scroll down or drag horizontally to rotate</span>
        <span className="sm:hidden">Swipe or use arrows</span>
      </div>

      {/* Center Pagination Indicators */}
      <div className="flex items-center gap-1.5 bg-[#121216] border border-[#222228] px-3 py-1.5 rounded-xl shadow-md">
        <span className="text-xs font-mono text-white font-semibold">
          {currentIndex + 1}
        </span>
        <span className="text-neutral-500 font-mono text-xs">/</span>
        <span className="text-neutral-400 font-mono text-xs">
          {totalItems}
        </span>
      </div>

      {/* Action Buttons: Prev, Next & Optional 3D/Grid View Switcher */}
      <div className="flex items-center gap-2">
        {onToggleMode && (
          <button
            onClick={onToggleMode}
            className="p-2 rounded-xl bg-[#141418] hover:bg-[#1f1f26] border border-[#282830] text-neutral-300 hover:text-white transition-colors cursor-pointer"
            title={is3DMode ? 'Switch to Grid View' : 'Switch to 3D Carousel View'}
            aria-label="Toggle view layout"
          >
            {is3DMode ? <Grid className="w-4 h-4" /> : <Layers3 className="w-4 h-4 text-[#FF6B35]" />}
          </button>
        )}

        <button
          onClick={onPrev}
          className="p-2 rounded-xl bg-[#141418] hover:bg-[#1f1f26] border border-[#282830] text-neutral-300 hover:text-[#FF6B35] transition-colors cursor-pointer shadow-sm active:scale-95"
          title={`Previous ${itemName}`}
          aria-label={`Previous ${itemName}`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={onNext}
          className="p-2 rounded-xl bg-[#141418] hover:bg-[#1f1f26] border border-[#282830] text-neutral-300 hover:text-[#FF6B35] transition-colors cursor-pointer shadow-sm active:scale-95"
          title={`Next ${itemName}`}
          aria-label={`Next ${itemName}`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
export default CarouselControls;
