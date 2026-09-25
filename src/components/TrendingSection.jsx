import { useState } from "react";
import { Bookmark, Check } from "lucide-react";
import { TRENDING_ITEMS } from "../data/fandomData";
const TrendingSection = ({ onSelectTrending }) => {
  const [savedIds, setSavedIds] = useState(/* @__PURE__ */ new Set());
  const toggleSave = (e, id) => {
    e.stopPropagation();
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };
  return <section className="mb-10">
      {
    /* Section Header */
  }
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-[#F5F5F5] tracking-tight">
          Trending across fandoms
        </h2>
        <a
    href="#trending"
    onClick={(e) => {
      e.preventDefault();
      onSelectTrending(TRENDING_ITEMS[0]);
    }}
    className="text-xs text-[#8A8A8E] hover:text-[#F5F5F5] transition-colors"
  >
          See all
        </a>
      </div>

      {
    /* Bento Grid */
  }
      <div className="columns-2 md:columns-4 gap-3.5 [column-fill:_balance]">
        {TRENDING_ITEMS.map((item, idx) => {
    const categories = ["Gaming", "Anime", "Lore", "Comics"];
    const isSaved = savedIds.has(item.id);
    return <div
      key={item.id}
      onClick={() => onSelectTrending(item)}
      className="break-inside-avoid mb-3.5 group bg-[#161918]/85 backdrop-blur-xl rounded-[20px] overflow-hidden border border-white/15 hover:border-white/30 transition-all cursor-pointer flex flex-col justify-between select-none shadow-lg hover:-translate-y-1"
    >
              <div>
                {
      /* Poster Artwork with bookmark button overlay */
    }
                <div className={`relative ${idx % 2 === 0 ? "aspect-[1/1]" : "aspect-[4/3]"} w-full bg-[#0B0B0D] overflow-hidden`}>
                  <img
      src={item.image}
      alt={item.title}
      referrerPolicy="no-referrer"
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
    />

                  {
      /* Bookmark Button */
    }
                  <button
      type="button"
      onClick={(e) => toggleSave(e, item.id)}
      className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer ${isSaved ? "bg-[#FF5F1F] text-white border border-[#FF5F1F]" : "bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-black/70"}`}
      title={isSaved ? "Saved" : "Save bookmark"}
    >
                    {isSaved ? <Check size={12} strokeWidth={2.5} /> : <Bookmark size={12} />}
                  </button>
                </div>

                {
      /* Card Body with White Transparent Glassmorphism (NO player ratings / icons) */
    }
                <div className="p-3.5 bg-white/[0.12] hover:bg-white/[0.15] backdrop-blur-xl border-t border-white/20 transition-colors">
                  <h3 className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#FF5F1F] transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-[11px] text-white/80 mt-1.5 truncate">
                    {categories[idx % categories.length]} · 2026
                  </p>
                </div>
              </div>
            </div>;
  })}
      </div>
    </section>;
};
export {
  TrendingSection
};
