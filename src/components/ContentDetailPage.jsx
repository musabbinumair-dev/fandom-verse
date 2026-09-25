import { useState } from "react";
import {
  Bookmark,
  Calendar,
  Play,
  Volume2,
  Tv,
  Maximize2,
  Settings,
  ChevronLeft,
  Lock,
  Star,
  FileText
} from "lucide-react";

const ContentDetailPage = ({
  item = {},
  onBack,
  onOpenArticle,
  onOpenAuth,
  isLoggedIn = false
}) => {
  const [personalNote, setPersonalNote] = useState("");
  const [userRating, setUserRating] = useState(4);
  const [isSaved, setIsSaved] = useState(false);

  // Default values matching "The Skyward Isles: A New Frontier Awaits" if none provided
  const title = item?.title || "The Skyward Isles: A New Frontier Awaits";
  const category = item?.category || "Anime";
  const year = item?.year || "2025";
  const videoThumb = item?.videoThumbnail || item?.image || item?.posterImage || "/src/assets/images/aetheria_wanderer_1790282784893.jpg";
  const posterThumb = item?.posterImage || item?.image || "/src/assets/images/aetheria_wanderer_1790282784893.jpg";

  const renderStars = () => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={18}
            className={`cursor-pointer transition-transform ${
              star <= userRating
                ? "fill-[#FFCC00] text-[#FFCC00]"
                : "text-stone-300 fill-stone-100"
            }`}
            onClick={() => setUserRating(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full bg-[#FAF9F5] min-h-full font-sans select-none pb-16 text-[#0F172A]">
      {/* 1. BREADCRUMBS HEADER ROW */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-2 text-xs font-medium text-slate-500 flex items-center gap-2">
        <button onClick={onBack} className="hover:text-[#FF3B30] transition-colors cursor-pointer">
          Home
        </button>
        <span className="text-slate-300 font-bold">&gt;</span>
        <button onClick={onBack} className="hover:text-[#FF3B30] transition-colors cursor-pointer">
          {category}
        </button>
        <span className="text-slate-300 font-bold">&gt;</span>
        <span className="text-slate-800 font-semibold truncate max-w-xs">{title}</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-3 space-y-7">
        
        {/* 2. HERO VIDEO PLAYER SECTION (Exact match to uploaded image) */}
        <div className="relative w-full aspect-video sm:aspect-[21/9] rounded-2xl overflow-hidden bg-black shadow-xl border border-stone-200/80 group">
          <img
            src={videoThumb}
            alt={title}
            className="w-full h-full object-cover object-center brightness-[0.95]"
          />

          {/* Translucent Overlay */}
          <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-all duration-300" />

          {/* Center Play Circle Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              type="button"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#1E293B]/70 hover:bg-[#1E293B]/90 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-2xl hover:scale-105 transition-all cursor-pointer"
            >
              <Play size={28} className="fill-white text-white ml-1" />
            </button>
          </div>

          {/* Bottom Video Controls Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-4 py-3 flex items-center justify-between text-white text-xs font-medium">
            <div className="flex items-center gap-3">
              <button type="button" className="hover:text-[#FF3B30] cursor-pointer transition-colors">
                <Play size={16} className="fill-white" />
              </button>
              <span className="text-[11px] font-semibold text-stone-300">0:00 / 2:16</span>
              <div className="hidden sm:block w-32 sm:w-64 h-1 bg-white/30 rounded-full overflow-hidden">
                <div className="w-0 h-full bg-[#FF3B30]" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button type="button" className="hover:text-[#FF3B30] cursor-pointer transition-colors">
                <Volume2 size={16} />
              </button>
              <button type="button" className="hover:text-[#FF3B30] cursor-pointer transition-colors">
                <Settings size={15} />
              </button>
              <button type="button" className="hover:text-[#FF3B30] cursor-pointer transition-colors">
                <Tv size={15} />
              </button>
              <button type="button" className="hover:text-[#FF3B30] cursor-pointer transition-colors">
                <Maximize2 size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* 3. POSTER & OVERVIEW SECTION (2 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Column: Vertical Poster Artwork */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className="relative aspect-[2/3] w-full max-w-[260px] mx-auto md:mx-0 rounded-2xl overflow-hidden shadow-lg border border-stone-200 bg-stone-900 group">
              <img
                src={posterThumb}
                alt={title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              {/* Poster Overlay Title */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                <span className="font-titan text-lg sm:text-xl font-black uppercase tracking-tight leading-none drop-shadow-md">
                  {title.split(":")[0]}
                </span>
                <span className="text-[10px] font-bold tracking-widest text-sky-200 uppercase mt-1">
                  A NEW FRONTIER AWAITS
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Tag Pills, and Description */}
          <div className="md:col-span-8 lg:col-span-9 space-y-4">
            {/* Title */}
            <h1 className="text-2xl sm:text-3.5xl font-black text-[#0F172A] tracking-tight leading-tight">
              {title}
            </h1>

            {/* Tag Pills Bar */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="bg-[#FFEBE5] text-[#FF5F1F] font-extrabold text-[11px] px-3.5 py-1 rounded-full uppercase tracking-wider shadow-2xs">
                {category}
              </span>
              <span className="bg-[#E0F2FE] text-[#0284C7] font-extrabold text-[11px] px-3.5 py-1 rounded-full uppercase tracking-wider shadow-2xs">
                Movie
              </span>
              <span className="bg-[#F3E8FF] text-[#9333EA] font-extrabold text-[11px] px-3.5 py-1 rounded-full uppercase tracking-wider shadow-2xs">
                Adventure
              </span>
              <span className="bg-[#DCFCE7] text-[#16A34A] font-extrabold text-[11px] px-3.5 py-1 rounded-full uppercase tracking-wider shadow-2xs">
                Fantasy
              </span>
              <span className="bg-[#F1F5F9] text-[#475569] font-extrabold text-[11px] px-3.5 py-1 rounded-full uppercase tracking-wider shadow-2xs flex items-center gap-1.5">
                <Calendar size={13} className="stroke-[2.5]" />
                <span>{year}</span>
              </span>
            </div>

            {/* Description Paragraphs */}
            <div className="pt-2 space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-[#0F172A]">
                Description
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {item?.desc ||
                  "In a world where floating islands drift above the clouds, a young dreamer named Kael discovers a hidden power within himself. When his peaceful village is threatened by a mysterious force, he sets out on a journey across the skyward isles to uncover the truth, make new allies, and protect the world he calls home."}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                With breathtaking landscapes, unforgettable characters, and a story filled with courage and discovery, The Skyward Isles: A New Frontier Awaits takes you on an epic adventure beyond the clouds.
              </p>
            </div>
          </div>
        </div>

        {/* 4. BOTTOM LOCKED FEATURES BOX (Guest User Panel - Exact match to image) */}
        {!isLoggedIn ? (
          <div className="mt-8 rounded-2xl bg-gradient-to-br from-[#EBF3FF] via-[#F0F7FF] to-[#E6F0FA] border border-[#D0E2FF] p-6 sm:p-8 space-y-6 shadow-xs relative overflow-hidden">
            {/* Mountain Landscape Background Overlay */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 mix-blend-multiply">
              <img
                src="/src/assets/images/shadow_realm_ruins_1790282841812.jpg"
                alt="Mountains Background"
                className="w-full h-full object-cover object-bottom"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#EBF3FF] via-[#EBF3FF]/70 to-transparent" />
            </div>

            {/* Header with Lock Icon */}
            <div className="relative z-10 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#2C3E50] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Lock size={20} className="stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0F172A]">
                  Login to unlock these features
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B] font-medium mt-0.5">
                  Create an account or log in to bookmark, rate, and add a personal note.
                </p>
              </div>
            </div>

            {/* 3 Disabled Feature Cards */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Card 1: Bookmark */}
              <div className="bg-white/70 backdrop-blur-xs border border-white/80 rounded-xl p-4 sm:p-5 flex flex-col justify-between space-y-2 shadow-2xs">
                <div className="flex items-center gap-2 text-[#475569]">
                  <Bookmark size={18} className="stroke-[2]" />
                  <span className="text-xs sm:text-sm font-bold text-[#334155]">Bookmark</span>
                </div>
                <p className="text-[11px] text-[#94A3B8] font-medium">
                  Login to unlock this feature
                </p>
              </div>

              {/* Card 2: Rate this content */}
              <div className="bg-white/70 backdrop-blur-xs border border-white/80 rounded-xl p-4 sm:p-5 flex flex-col justify-between space-y-2 shadow-2xs">
                <div className="flex items-center gap-1.5 text-slate-300">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={15} className="stroke-[1.8] fill-none text-slate-300" />
                  ))}
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold text-[#334155] block">
                    Rate this content
                  </span>
                  <p className="text-[11px] text-[#94A3B8] font-medium mt-0.5">
                    Login to unlock this feature
                  </p>
                </div>
              </div>

              {/* Card 3: Add a personal note */}
              <div className="bg-white/70 backdrop-blur-xs border border-white/80 rounded-xl p-4 sm:p-5 flex flex-col justify-between space-y-2 shadow-2xs">
                <div className="flex items-center gap-2 text-[#475569]">
                  <FileText size={18} className="stroke-[2]" />
                  <span className="text-xs sm:text-sm font-bold text-[#334155]">Add a personal note</span>
                </div>
                <p className="text-[11px] text-[#94A3B8] font-medium">
                  Login to unlock this feature
                </p>
              </div>
            </div>

            {/* Bottom Action Buttons */}
            <div className="relative z-10 flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => onOpenAuth && onOpenAuth("login")}
                className="bg-[#FF3B30] hover:bg-[#E02B20] text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-sm transition-all active:scale-95 cursor-pointer"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => onOpenAuth && onOpenAuth("register")}
                className="bg-white/90 border border-[#FFC7C2] text-[#D0382B] hover:bg-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-2xs transition-all active:scale-95 cursor-pointer"
              >
                Register
              </button>
            </div>
          </div>
        ) : (
          /* Logged In Panel - Interactive Rating & Bookmark Controls */
          <div className="mt-8 rounded-2xl bg-white border border-[#EDE4D6] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 block uppercase tracking-wider">
                  Your Rating
                </span>
                {renderStars()}
              </div>

              <button
                type="button"
                onClick={() => setIsSaved(!isSaved)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider border transition-all cursor-pointer ${
                  isSaved
                    ? "bg-[#FFEBE5] border-[#FF5F1F] text-[#FF5F1F]"
                    : "bg-[#FF5F1F] text-white border-transparent hover:bg-[#E04F13]"
                }`}
              >
                <Bookmark size={15} className="stroke-[2.5]" />
                <span>{isSaved ? "Saved" : "Bookmark"}</span>
              </button>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <label className="text-xs font-bold text-slate-600 block">
                Add a personal note
              </label>
              <textarea
                rows={2}
                placeholder="Write your personal thoughts about this content..."
                value={personalNote}
                onChange={(e) => setPersonalNote(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[#FF5F1F] bg-[#FAF9F5]"
              />
              <button
                type="button"
                onClick={() => {
                  alert("Note saved!");
                  setPersonalNote("");
                }}
                className="bg-[#FF5F1F] hover:bg-[#E04F13] text-white font-bold text-xs px-5 py-2 rounded-lg cursor-pointer uppercase tracking-wider"
              >
                Save Note
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export { ContentDetailPage };
