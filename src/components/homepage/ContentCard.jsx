import { useState } from "react";
import { Bookmark, Check } from "lucide-react";
const PublisherIcon = ({ type }) => {
  if (type === "rockstar") {
    return <span className="w-3.5 h-3.5 rounded-[3px] bg-[#F7A600] text-[#111] font-black text-[8px] flex items-center justify-center font-sans shrink-0 leading-none select-none shadow-xs">
        R<span className="text-[6px] leading-none mb-0.5">*</span>
      </span>;
  }
  if (type === "ea") {
    return <span className="w-3.5 h-3.5 rounded-full bg-white/25 text-white font-extrabold text-[7px] flex items-center justify-center font-sans shrink-0 leading-none select-none border border-white/40">
        EA
      </span>;
  }
  if (type === "cdpr") {
    return <span className="w-3.5 h-3.5 rounded-full bg-[#E52538] text-white font-black text-[7px] flex items-center justify-center shrink-0 leading-none select-none shadow-xs">
        ★
      </span>;
  }
  if (type === "xbox") {
    return <span className="w-3.5 h-3.5 rounded-full bg-[#107C10] text-white font-black text-[8px] flex items-center justify-center shrink-0 leading-none select-none">
        ✕
      </span>;
  }
  if (type === "fromsoftware") {
    return <span className="w-3.5 h-3.5 rounded-[3px] bg-white/35 text-white font-bold text-[6.5px] flex items-center justify-center shrink-0 leading-none select-none">
        FS
      </span>;
  }
  if (type === "jump") {
    return <span className="w-3.5 h-3.5 rounded-[3px] bg-[#E60012] text-white font-bold text-[6.5px] flex items-center justify-center shrink-0 leading-none select-none">
        JP
      </span>;
  }
  return <span className="w-3.5 h-3.5 rounded-full bg-white/25 text-white/90 font-bold text-[7px] flex items-center justify-center shrink-0 select-none border border-white/30">
      ✦
    </span>;
};
const ContentCard = ({
  item,
  isSaved = false,
  onSelect,
  onOpenAuth,
  onToggleSave,
  isLoggedIn = true
}) => {
  const [localSaved, setLocalSaved] = useState(isSaved);
  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    setLocalSaved((prev) => !prev);
    if (onToggleSave) {
      onToggleSave(item);
    } else {
      onOpenAuth("login");
    }
  };
  const baseTint = item.cardBgColor || "#2A302D";
  const getArtworkAspect = () => {
    if (item.aspectRatio === "tall" || item.aspectRatio === "portrait") {
      return "aspect-[3/4]";
    }
    if (item.aspectRatio === "wide") {
      return "aspect-[16/10]";
    }
    return "aspect-square";
  };
  return <article
    onClick={() => onSelect(item)}
    style={{
      backgroundColor: baseTint
    }}
    className="group inline-flex flex-col w-full break-inside-avoid align-top mb-5 sm:mb-6 rounded-none overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_45px_rgba(0,0,0,0.38)] cursor-pointer select-none border border-white/20 relative backdrop-blur-2xl"
  >
      {
    /* Top Glass Specular Line */
  }
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none z-20" />

      {
    /* 1. ARTWORK SECTION */
  }
      <div className={`relative ${getArtworkAspect()} w-full overflow-hidden bg-black/40 rounded-none shrink-0`}>
        <img
    src={item.posterImage}
    alt={item.title}
    loading="lazy"
    className="w-full h-full object-cover rounded-none group-hover:scale-105 transition-transform duration-500 ease-out"
  />

        {
    /* Top-Left Floating Fandom Category Tag */
  }
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
          <span className="bg-black/55 hover:bg-black/75 backdrop-blur-md border border-white/25 text-white text-[10.5px] font-bold px-2.5 py-1 uppercase tracking-wider rounded-none shadow-sm">
            {item.category}
          </span>
        </div>

        {
    /* Top-Right Floating Bookmark & Rating with Glassmorphism */
  }
        <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
          <span className="bg-black/55 backdrop-blur-md border border-white/25 text-white text-[10.5px] font-bold px-2 py-1 rounded-none shadow-sm flex items-center gap-1">
            ★ {item.rating}
          </span>
          {isLoggedIn && (
            <button
              type="button"
              onClick={handleBookmarkClick}
              className={`w-7.5 h-7.5 rounded-none flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer shadow-lg ${localSaved ? "bg-[#FF5F1F] text-white border border-[#FF5F1F]" : "bg-black/55 hover:bg-black/80 backdrop-blur-md border border-white/25 text-white"}`}
              title={localSaved ? "Saved to library" : "Bookmark title"}
            >
              {localSaved ? <Check size={12} strokeWidth={2.8} /> : <Bookmark size={12} strokeWidth={2.2} />}
            </button>
          )}
        </div>
      </div>

      {
    /* 2. CONTENT AREA */
  }
      <div className="p-5 sm:p-5.5 flex-1 flex flex-col justify-between relative bg-white/[0.12] hover:bg-white/[0.15] backdrop-blur-xl border-t border-white/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.35)] transition-colors duration-300">
        <div className="space-y-2">
          {
    /* Fandom category & type tag */
  }
          <div className="flex items-center gap-2">
            <span className="text-[10.5px] font-extrabold text-[#FF8C5A] uppercase tracking-wider">
              {item.type || "Fandom"}
            </span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-[11px] font-medium text-white/70">
              {item.year}
            </span>
          </div>

          {
    /* Title: Bold white sans typography */
  }
          <h3 className="text-white font-bold text-[18px] sm:text-[19.5px] leading-snug tracking-[-0.015em] group-hover:text-white/95 transition-colors line-clamp-2 drop-shadow-xs">
            {item.title}
          </h3>

          {
    /* Uploader Name Row */
  }
          <div className="flex items-center gap-1.5 text-white/85 text-[12px] sm:text-[12.5px] font-medium pt-0.5">
            <PublisherIcon type={item.publisherIconType} name={item.publisher} />
            <span className="truncate">
              Uploaded by <strong className="text-white font-semibold">{item.uploader || item.publisher || "Fandom Staff"}</strong>
            </span>
          </div>

          {
    /* Content lore summary / description with comfortable spacing */
  }
          <p className="text-white/80 text-[12.5px] sm:text-[13px] leading-relaxed font-normal line-clamp-3 pt-1">
            {item.content || item.synopsis || item.subtitle || "Explore extensive community wiki lore archives, guides, character bios, and lore analysis."}
          </p>
        </div>

        {
    /* 3. BOTTOM ROW: Category Pill on left & "Read more" Button on right */
  }
        <div className="mt-5 pt-3 flex items-center justify-between gap-3 border-t border-white/15">
          {
    /* Left: Category / Genre Badge */
  }
          <span className="text-[11px] text-white/90 font-semibold px-2.5 py-1 rounded-none bg-white/10 border border-white/20 backdrop-blur-sm truncate uppercase tracking-wider">
            {item.genre || item.category}
          </span>

          {
    /* Right: "Read more" Action Button */
  }
          <button
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      onSelect(item);
    }}
    className="bg-black/40 hover:bg-white hover:text-[#111] backdrop-blur-md border border-white/25 text-white text-[11.5px] sm:text-[12px] font-bold px-4 py-1.5 rounded-none flex items-center gap-1.5 transition-all duration-200 cursor-pointer shadow-sm active:scale-95 shrink-0 uppercase tracking-wider"
  >
            <span>Read more</span>
          </button>
        </div>
      </div>
    </article>;
};
export {
  ContentCard
};
