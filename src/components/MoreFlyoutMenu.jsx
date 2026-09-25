import { useEffect, useRef } from "react";
import {
  ChevronLeft,
  Plus,
  Rocket,
  PlaySquare,
  Gamepad2,
  Clapperboard,
  Tv
} from "lucide-react";
import {
  FanaticalLogo,
  MetacriticLogo,
  GameSpotLogo,
  TVGuideLogo,
  GameFAQsLogo,
  ComicVineLogo
} from "./BrandLogos";

const AnimeOutlineIcon = ({ size = 18, className = "" }) => (
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

const MoreFlyoutMenu = ({
  isOpen,
  onClose,
  onSelectCategory,
  onStartWiki,
  theme = "light"
}) => {
  const menuRef = useRef(null);
  const isDark = theme === "dark";

  useEffect(() => {
    if (!isOpen) return;
    const handleOutsideClick = (e) => {
      const target = e.target;
      if (menuRef.current && !menuRef.current.contains(target) && !target.closest('button[title*="More"]')) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <aside
      ref={menuRef}
      className={`absolute left-[64px] top-0 bottom-0 z-40 w-[260px] sm:w-[280px] h-full flex flex-col select-none overflow-y-auto font-baloo transition-colors duration-200 ${
        isDark
          ? "bg-[#1a1a1a] border-r border-[#2a2a2a] text-stone-200"
          : "bg-white border-r border-[#F0E8DD] text-[#231C14]"
      }`}
    >
      {/* Top Header Row: "More" Title & Circular Collapse Button (<) */}
      <div className="flex items-center justify-between px-5 pt-3.5 pb-2.5">
        <h2 className={`text-sm font-bold tracking-tight uppercase ${isDark ? "text-white" : "text-[#231C14]"}`}>
          More
        </h2>

        {/* Circular collapse button */}
        <button
          onClick={onClose}
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
            isDark
              ? "bg-[#242424] border border-[#333333] text-stone-300 hover:text-[#FFCC00] hover:border-[#FFCC00]"
              : "bg-white border border-[#F0E8DD] text-[#7A6F64] hover:text-[#FF5F1F] hover:border-[#FF5F1F]"
          }`}
          title="Collapse sidebar menu"
        >
          <ChevronLeft size={15} strokeWidth={2.5} />
        </button>
      </div>

      {/* Action: + START A WIKI */}
      <div className="px-5 pt-1.5 pb-2">
        <button
          onClick={() => onStartWiki?.()}
          className={`flex items-center gap-2 text-xs font-bold tracking-wider transition-colors group cursor-pointer ${
            isDark ? "text-[#FFCC00] hover:text-[#F2C200]" : "text-[#FF5F1F] hover:text-[#E54F13]"
          }`}
        >
          <Plus size={15} strokeWidth={3} className={isDark ? "text-[#FFCC00]" : "text-[#FF5F1F]"} />
          <span className="uppercase text-[11px] sm:text-xs font-bold tracking-wide">START A WIKI</span>
        </button>
      </div>

      {/* Thin horizontal divider */}
      <div className={`h-[1px] mx-5 mb-2 ${isDark ? "bg-[#2a2a2a]" : "bg-[#F0E8DD]"}`} />

      {/* Main Category List with outline icons */}
      <nav className="px-3 space-y-1 mb-3">
        {[
          { label: "Fan Central", icon: Rocket },
          { label: "Video", icon: PlaySquare },
          { label: "Games", icon: Gamepad2 },
          { label: "Movies", icon: Clapperboard },
          { label: "TV", icon: Tv },
          { label: "Anime", icon: AnimeOutlineIcon }
        ].map(({ label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => onSelectCategory?.(label)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-left group cursor-pointer transition-colors ${
              isDark
                ? "text-stone-300 hover:text-[#FFCC00] hover:bg-[#242424]"
                : "text-[#7A6F64] hover:text-[#231C14] hover:bg-[#FAF7F2]"
            }`}
          >
            <Icon
              size={16}
              strokeWidth={2}
              className={`shrink-0 transition-colors ${
                isDark
                  ? "text-stone-400 group-hover:text-[#FFCC00]"
                  : "text-[#7A6F64] group-hover:text-[#FF5F1F]"
              }`}
            />
            <span>{label}</span>
          </button>
        ))}

        {/* Community Central */}
        <button
          onClick={() => onSelectCategory?.("Community Central")}
          className={`w-full px-3 py-2 text-xs font-semibold rounded-xl text-left transition-colors pl-9 cursor-pointer ${
            isDark
              ? "text-stone-300 hover:text-[#FFCC00] hover:bg-[#242424]"
              : "text-[#7A6F64] hover:text-[#231C14] hover:bg-[#FAF7F2]"
          }`}
        >
          Community Central
        </button>
      </nav>

      {/* Fandom Brands Section */}
      <div className={`px-5 pt-3 pb-4 border-t ${isDark ? "border-[#2a2a2a]" : "border-[#F0E8DD]"}`}>
        <h3 className={`text-xs font-bold uppercase tracking-wider mb-3 ${isDark ? "text-stone-400" : "text-[#7A6F64]"}`}>
          Fandom Brands
        </h3>

        <div className="space-y-1.5">
          {[
            { name: "Fanatical", Logo: FanaticalLogo },
            { name: "Metacritic", Logo: MetacriticLogo },
            { name: "GameSpot", Logo: GameSpotLogo },
            { name: "TV Guide", Logo: TVGuideLogo },
            { name: "GameFAQs", Logo: GameFAQsLogo },
            { name: "Comic Vine", Logo: ComicVineLogo }
          ].map(({ name, Logo }) => (
            <button
              key={name}
              onClick={() => onSelectCategory?.(name)}
              className={`w-full flex items-center gap-3 py-1.5 px-2 rounded-lg text-left transition-colors group cursor-pointer ${
                isDark
                  ? "hover:bg-[#242424]"
                  : "hover:bg-[#FAF7F2]"
              }`}
            >
              <Logo size={16} />
              <span
                className={`text-xs font-medium transition-colors ${
                  isDark
                    ? "text-stone-300 group-hover:text-[#FFCC00]"
                    : "text-[#7A6F64] group-hover:text-[#231C14]"
                }`}
              >
                {name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export { MoreFlyoutMenu };
