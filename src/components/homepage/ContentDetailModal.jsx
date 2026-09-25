import { X, Bookmark, Lock, Star } from "lucide-react";
const ContentDetailModal = ({
  item,
  onClose,
  onOpenAuth
}) => {
  if (!item) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white border-2 border-[#F0E8DD] rounded-[20px] max-w-xl w-full overflow-hidden text-[#231C14] relative animate-in fade-in zoom-in-95 duration-150">
        {
    /* Close Button */
  }
        <button
    type="button"
    onClick={onClose}
    className="absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-full bg-white/90 border border-[#F0E8DD] text-[#8A7B6C] hover:text-[#231C14] flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
  >
          <X size={16} />
        </button>

        {
    /* Visual Poster Banner */
  }
        <div className="relative aspect-[16/9] w-full bg-[#FFFDF7] overflow-hidden border-b-2 border-[#F0E8DD]">
          <img
    src={item.posterImage}
    alt={item.title}
    className="w-full h-full object-cover"
  />

          {
    /* Rating Badge: Golden Yellow sticker */
  }
          <div className="absolute top-3.5 left-3.5 bg-[#FFF200] text-[#231C14] px-3 py-1 rounded-[12px] text-xs font-bold flex items-center gap-1.5 -rotate-3">
            <Star size={12} className="fill-[#231C14] text-[#231C14]" />
            <span>{item.rating}</span>
          </div>

          <div className="absolute bottom-3.5 left-3.5 bg-white/95 backdrop-blur-xs border border-[#F0E8DD] px-3 py-1 rounded-full text-[11px] font-bold text-[#FF5F1F]">
            {item.category} • {item.type}
          </div>
        </div>

        {
    /* Content Body */
  }
        <div className="p-6 space-y-4 bg-white">
          <div>
            <h2 className="text-xl font-bold text-[#231C14] leading-tight">
              {item.title}
            </h2>
            <div className="flex items-center gap-2 text-xs text-[#8A7B6C] mt-1.5 font-medium flex-wrap">
              <span>Released {item.year}</span>
              <span>•</span>
              <span className="text-[#231C14] font-bold">{item.genre || item.type}</span>
              {item.subtitle && <>
                  <span>•</span>
                  <span>{item.subtitle}</span>
                </>}
            </div>
          </div>

          <p className="text-xs text-[#8A7B6C] font-medium leading-relaxed">
            Explore complete community-curated character dossiers, episode summaries, lore progression charts, and interactive wiki walkthroughs for this title.
          </p>

          {
    /* Visitor role restricted action banner */
  }
          <div className="p-3.5 bg-[#FFFDF7] border-2 border-[#F0E8DD] rounded-xl flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-[#8A7B6C] font-medium">
              <Lock size={14} className="text-[#FF5F1F] shrink-0" />
              <span>Sign in to bookmark this title or rate it in the community index.</span>
            </div>
            <button
    type="button"
    onClick={() => {
      onClose();
      onOpenAuth("login");
    }}
    className="text-xs font-bold text-[#FF5F1F] hover:underline shrink-0 cursor-pointer"
  >
              Sign in
            </button>
          </div>

          {
    /* Bottom Actions */
  }
          <div className="pt-3 border-t-2 border-[#F0E8DD] flex items-center justify-between">
            <button
    type="button"
    onClick={() => {
      onClose();
      onOpenAuth("login");
    }}
    className="h-10 px-5 text-xs font-bold text-[#FF5F1F] hover:bg-[#FF5F1F]/10 border-2 border-[#FF5F1F] rounded-full flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
  >
              <Bookmark size={14} />
              <span>Save to Watchlist</span>
            </button>

            <button
    type="button"
    onClick={onClose}
    className="h-10 px-6 text-xs font-bold text-white bg-[#FF5F1F] hover:bg-[#E54F13] rounded-full transition-all hover:scale-105 active:scale-95 cursor-pointer"
  >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>;
};
export {
  ContentDetailModal
};
