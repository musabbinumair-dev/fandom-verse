import React, { useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  Plus, 
  Rocket, 
  PlaySquare, 
  Gamepad2, 
  Clapperboard, 
  Tv 
} from 'lucide-react';
import { 
  FanaticalLogo, 
  MetacriticLogo, 
  GameSpotLogo, 
  TVGuideLogo, 
  GameFAQsLogo, 
  ComicVineLogo 
} from './BrandLogos';

// Custom Anime Cat/Face outline icon
const AnimeOutlineIcon: React.FC<{ size?: number; className?: string }> = ({ size = 18, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.8" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M4 11V16C4 18.5 7.5 20.5 12 20.5C16.5 20.5 20 18.5 20 16V11L17.5 5L14 8C13.4 7.8 12.7 7.7 12 7.7C11.3 7.7 10.6 7.8 10 8L6.5 5L4 11Z" />
    <circle cx="9" cy="14" r="1" fill="currentColor" />
    <circle cx="15" cy="14" r="1" fill="currentColor" />
  </svg>
);

interface MoreFlyoutMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory?: (category: string) => void;
  onStartWiki?: () => void;
}

export const MoreFlyoutMenu: React.FC<MoreFlyoutMenuProps> = ({
  isOpen,
  onClose,
  onSelectCategory,
  onStartWiki,
}) => {
  const menuRef = useRef<HTMLElement>(null);

  // Close when clicking outside the menu
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (menuRef.current && !menuRef.current.contains(target) && !target.closest('button[title*="More"]')) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <aside 
      ref={menuRef}
      className="absolute left-[64px] top-0 bottom-0 z-40 w-[260px] sm:w-[280px] h-full bg-white border-r border-[#F0E8DD] flex flex-col select-none overflow-y-auto text-[#231C14] font-baloo"
    >
      {/* Top Header Row: "More" Title & Circular Collapse Button (<) */}
      <div className="flex items-center justify-between px-5 pt-3.5 pb-2.5">
        <h2 className="text-sm font-bold text-[#231C14] tracking-tight uppercase">
          More
        </h2>

        {/* Circular collapse button */}
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-full bg-white border border-[#F0E8DD] hover:border-[#FF5F1F] text-[#7A6F64] hover:text-[#FF5F1F] flex items-center justify-center transition-colors cursor-pointer"
          title="Collapse sidebar menu"
        >
          <ChevronLeft size={15} strokeWidth={2.5} />
        </button>
      </div>

      {/* Action: + START A WIKI */}
      <div className="px-5 pt-1.5 pb-2">
        <button
          onClick={() => onStartWiki?.()}
          className="flex items-center gap-2 text-xs font-bold text-[#FF5F1F] hover:text-[#E54F13] tracking-wider transition-colors group cursor-pointer"
        >
          <Plus size={15} strokeWidth={3} className="text-[#FF5F1F]" />
          <span className="uppercase text-[11px] sm:text-xs font-bold tracking-wide">START A WIKI</span>
        </button>
      </div>

      {/* Thin horizontal divider */}
      <div className="h-[1px] bg-[#F0E8DD] mx-5 mb-2" />

      {/* Main Category List with outline icons */}
      <nav className="px-3 space-y-1 mb-3">
        <button
          onClick={() => onSelectCategory?.('Fan Central')}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-[#7A6F64] hover:text-[#231C14] hover:bg-[#FAF7F2] transition-colors text-left group cursor-pointer"
        >
          <Rocket size={16} strokeWidth={2} className="text-[#7A6F64] group-hover:text-[#FF5F1F] shrink-0" />
          <span>Fan Central</span>
        </button>

        <button
          onClick={() => onSelectCategory?.('Video')}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-[#7A6F64] hover:text-[#231C14] hover:bg-[#FAF7F2] transition-colors text-left group cursor-pointer"
        >
          <PlaySquare size={16} strokeWidth={2} className="text-[#7A6F64] group-hover:text-[#FF5F1F] shrink-0" />
          <span>Video</span>
        </button>

        <button
          onClick={() => onSelectCategory?.('Games')}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-[#7A6F64] hover:text-[#231C14] hover:bg-[#FAF7F2] transition-colors text-left group cursor-pointer"
        >
          <Gamepad2 size={16} strokeWidth={2} className="text-[#7A6F64] group-hover:text-[#FF5F1F] shrink-0" />
          <span>Games</span>
        </button>

        <button
          onClick={() => onSelectCategory?.('Movies')}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-[#7A6F64] hover:text-[#231C14] hover:bg-[#FAF7F2] transition-colors text-left group cursor-pointer"
        >
          <Clapperboard size={16} strokeWidth={2} className="text-[#7A6F64] group-hover:text-[#FF5F1F] shrink-0" />
          <span>Movies</span>
        </button>

        <button
          onClick={() => onSelectCategory?.('TV')}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-[#7A6F64] hover:text-[#231C14] hover:bg-[#FAF7F2] transition-colors text-left group cursor-pointer"
        >
          <Tv size={16} strokeWidth={2} className="text-[#7A6F64] group-hover:text-[#FF5F1F] shrink-0" />
          <span>TV</span>
        </button>

        <button
          onClick={() => onSelectCategory?.('Anime')}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-[#7A6F64] hover:text-[#231C14] hover:bg-[#FAF7F2] transition-colors text-left group cursor-pointer"
        >
          <AnimeOutlineIcon size={16} className="text-[#7A6F64] group-hover:text-[#FF5F1F] shrink-0" />
          <span>Anime</span>
        </button>

        {/* Community Central */}
        <button
          onClick={() => onSelectCategory?.('Community Central')}
          className="w-full px-3 py-2 text-xs font-semibold text-[#7A6F64] hover:text-[#231C14] hover:bg-[#FAF7F2] rounded-xl text-left transition-colors pl-9 cursor-pointer"
        >
          Community Central
        </button>
      </nav>

      {/* Fandom Brands Section */}
      <div className="px-5 pt-3 pb-4 border-t border-[#F0E8DD]">
        <h3 className="text-xs font-bold text-[#7A6F64] uppercase tracking-wider mb-3">
          Fandom Brands
        </h3>

        <div className="space-y-1.5">
          {/* Fanatical */}
          <button
            onClick={() => onSelectCategory?.('Fanatical')}
            className="w-full flex items-center gap-3 py-1.5 px-2 hover:bg-[#FAF7F2] rounded-lg text-left transition-colors group cursor-pointer"
          >
            <FanaticalLogo size={16} />
            <span className="text-xs font-medium text-[#7A6F64] group-hover:text-[#231C14] transition-colors">
              Fanatical
            </span>
          </button>

          {/* Metacritic */}
          <button
            onClick={() => onSelectCategory?.('Metacritic')}
            className="w-full flex items-center gap-3 py-1.5 px-2 hover:bg-[#FAF7F2] rounded-lg text-left transition-colors group cursor-pointer"
          >
            <MetacriticLogo size={16} />
            <span className="text-xs font-medium text-[#7A6F64] group-hover:text-[#231C14] transition-colors">
              Metacritic
            </span>
          </button>

          {/* GameSpot */}
          <button
            onClick={() => onSelectCategory?.('GameSpot')}
            className="w-full flex items-center gap-3 py-1.5 px-2 hover:bg-[#FAF7F2] rounded-lg text-left transition-colors group cursor-pointer"
          >
            <GameSpotLogo size={16} />
            <span className="text-xs font-medium text-[#7A6F64] group-hover:text-[#231C14] transition-colors">
              GameSpot
            </span>
          </button>

          {/* TV Guide */}
          <button
            onClick={() => onSelectCategory?.('TV Guide')}
            className="w-full flex items-center gap-3 py-1.5 px-2 hover:bg-[#FAF7F2] rounded-lg text-left transition-colors group cursor-pointer"
          >
            <TVGuideLogo size={16} />
            <span className="text-xs font-medium text-[#7A6F64] group-hover:text-[#231C14] transition-colors">
              TV Guide
            </span>
          </button>

          {/* GameFAQs */}
          <button
            onClick={() => onSelectCategory?.('GameFAQs')}
            className="w-full flex items-center gap-3 py-1.5 px-2 hover:bg-[#FAF7F2] rounded-lg text-left transition-colors group cursor-pointer"
          >
            <GameFAQsLogo size={16} />
            <span className="text-xs font-medium text-[#7A6F64] group-hover:text-[#231C14] transition-colors">
              GameFAQs
            </span>
          </button>

          {/* Comic Vine */}
          <button
            onClick={() => onSelectCategory?.('Comic Vine')}
            className="w-full flex items-center gap-3 py-1.5 px-2 hover:bg-[#FAF7F2] rounded-lg text-left transition-colors group cursor-pointer"
          >
            <ComicVineLogo size={16} />
            <span className="text-xs font-medium text-[#7A6F64] group-hover:text-[#231C14] transition-colors">
              Comic Vine
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
};

