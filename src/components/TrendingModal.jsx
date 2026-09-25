import { X, Flame, Eye, ArrowRight } from "lucide-react";
const TrendingModal = ({ item, onClose, onExploreWiki }) => {
  if (!item) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        {
    /* Cover Art - Real Picture */
  }
        <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden">
          <img
    src={item.image}
    alt={item.title}
    className="w-full h-full object-cover"
  />

          <button
    onClick={onClose}
    className="absolute top-3 right-3 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
  >
            <X size={18} />
          </button>

          <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-xs text-white text-[11px] px-2 py-0.5 rounded-full flex items-center gap-1.5 font-medium">
            <Flame size={12} className="text-[#fa005a]" />
            <span>Trending in {item.category}</span>
          </div>
        </div>

        {
    /* Details */
  }
        <div className="p-5">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <div className="w-4 h-4 rounded-full overflow-hidden bg-slate-200 flex items-center justify-center font-bold text-[9px]">
              <img
    src={item.image}
    alt={item.wikiName}
    className="w-full h-full object-cover"
  />
            </div>
            <span className="font-semibold text-slate-700">{item.wikiName}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Eye size={12} />
              {item.viewsToday}
            </span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 leading-tight mb-3">
            {item.title}
          </h3>

          <p className="text-slate-600 text-xs leading-relaxed mb-6">
            This entry is currently surging in readership across the anime, comic, and gaming community. Fans are actively researching lore, battle stats, recent plot developments, and infobox revisions.
          </p>

          <div className="flex items-center justify-end gap-2">
            <button
    onClick={onClose}
    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-100"
  >
              Close
            </button>
            <button
    onClick={() => {
      onExploreWiki?.(item.wikiName);
      onClose();
    }}
    className="px-4 py-2 text-xs font-bold bg-[#fa005a] hover:bg-[#e00050] text-white rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
  >
              <span>Visit Article</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>;
};
export {
  TrendingModal
};
