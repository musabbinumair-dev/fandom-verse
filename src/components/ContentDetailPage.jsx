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
import { getRelatedBgImage } from "../utils/bgImages.js";

const ContentDetailPage = ({
  item = {},
  onBack,
  onOpenArticle,
  onOpenAuth,
  isLoggedIn = true
}) => {
  const [personalNote, setPersonalNote] = useState("");
  const [userRating, setUserRating] = useState(4);
  const [isSaved, setIsSaved] = useState(false);

  // Default values matching "The Skyward Isles: A New Frontier Awaits" if none provided
  const title = item?.title || "The Skyward Isles: A New Frontier Awaits";
  const category = item?.category || "Anime";
  const year = item?.year || "2025";
  const bgImage = item?.backgroundImage || item?.bgImage || getRelatedBgImage(item) || "/src/assets/images/aetheria_wanderer_1790282784893.jpg";
  const videoThumb = item?.videoThumbnail || item?.image || item?.posterImage || bgImage;
  const posterThumb = item?.posterImage || item?.image || bgImage;

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
    <div className="w-full min-h-full font-sans select-none pb-16 text-white relative">
      {/* FULL-PAGE CONTENT RELATED BACKGROUND PICTURE COVERING ENTIRE VIEW WITH OVERLAY */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#0A0A0C]">
        <img
          src={bgImage}
          alt={title}
          className="w-full h-full object-cover object-center opacity-85 filter brightness-[0.85] scale-105"
        />
        {/* Subtle dark vignette overlay allowing background picture to be vivid & clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
      </div>

      {/* CONTENT LAYER OVER BACKGROUND PICTURE */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-4 space-y-7">
        {/* 1. BREADCRUMBS HEADER ROW */}
        <div className="text-xs font-medium text-slate-300 flex items-center gap-2 pt-2">
          <button onClick={onBack} className="hover:text-[#FF3B30] transition-colors cursor-pointer text-slate-200">
            Home
          </button>
          <span className="text-slate-500 font-bold">&gt;</span>
          <button onClick={onBack} className="hover:text-[#FF3B30] transition-colors cursor-pointer text-slate-200">
            {category}
          </button>
          <span className="text-slate-500 font-bold">&gt;</span>
          <span className="text-white font-semibold truncate max-w-xs">{title}</span>
        </div>

        {/* 2. HERO VIDEO PLAYER SECTION */}
        <div className="relative w-full aspect-video sm:aspect-[21/9] rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/20 group">
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
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#1E293B]/80 hover:bg-[#1E293B] backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-2xl hover:scale-105 transition-all cursor-pointer"
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
            <div className="relative aspect-[2/3] w-full max-w-[260px] mx-auto md:mx-0 rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-stone-900 group">
              <img
                src={posterThumb}
                alt={title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              {/* Poster Overlay Title */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
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
            <h1 className="text-2xl sm:text-3.5xl font-black text-white tracking-tight leading-tight drop-shadow-md">
              {title}
            </h1>

            {/* Tag Pills Bar */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="bg-[#FF5F1F]/25 text-[#FFA07A] border border-[#FF5F1F]/40 font-extrabold text-[11px] px-3.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs shadow-xs">
                {category}
              </span>
              <span className="bg-[#0284C7]/25 text-[#38BDF8] border border-[#0284C7]/40 font-extrabold text-[11px] px-3.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs shadow-xs">
                Movie
              </span>
              <span className="bg-[#9333EA]/25 text-[#C084FC] border border-[#9333EA]/40 font-extrabold text-[11px] px-3.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs shadow-xs">
                Adventure
              </span>
              <span className="bg-[#16A34A]/25 text-[#4ADE80] border border-[#16A34A]/40 font-extrabold text-[11px] px-3.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs shadow-xs">
                Fantasy
              </span>
              <span className="bg-white/10 text-slate-200 border border-white/20 font-extrabold text-[11px] px-3.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs shadow-xs flex items-center gap-1.5">
                <Calendar size={13} className="stroke-[2.5]" />
                <span>{year}</span>
              </span>
            </div>

            {/* Description Paragraphs in Glassmorphic Card */}
            <div className="bg-black/45 backdrop-blur-md border border-white/15 p-5 sm:p-6 rounded-2xl space-y-3 shadow-xl text-slate-100">
              <h2 className="text-base sm:text-lg font-bold text-white">
                Description
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                {item?.desc ||
                  "In a world where floating islands drift above the clouds, a young dreamer named Kael discovers a hidden power within himself. When his peaceful village is threatened by a mysterious force, he sets out on a journey across the skyward isles to uncover the truth, make new allies, and protect the world he calls home."}
              </p>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                With breathtaking landscapes, unforgettable characters, and a story filled with courage and discovery, The Skyward Isles: A New Frontier Awaits takes you on an epic adventure beyond the clouds.
              </p>
            </div>
          </div>
        </div>

        {/* 4. BOTTOM LOCKED FEATURES BOX (Guest User Panel) */}
        {!isLoggedIn ? (
          <div className="mt-8 rounded-2xl bg-gradient-to-br from-black/75 via-slate-900/80 to-black/80 backdrop-blur-md border border-white/20 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            {/* Background Overlay */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-15 mix-blend-overlay">
              <img
                src={bgImage}
                alt="Background Overlay"
                className="w-full h-full object-cover object-bottom"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>

            {/* Header with Lock Icon */}
            <div className="relative z-10 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#FF3B30] text-white flex items-center justify-center shrink-0 shadow-md font-bold">
                <Lock size={20} className="stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Login to unlock these features
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
                  Create an account or log in to bookmark, rate, and add a personal note.
                </p>
              </div>
            </div>

            {/* 3 Disabled Feature Cards */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Card 1: Bookmark */}
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-4 sm:p-5 flex flex-col justify-between space-y-2 shadow-md">
                <div className="flex items-center gap-2 text-white">
                  <Bookmark size={18} className="stroke-[2]" />
                  <span className="text-xs sm:text-sm font-bold text-white">Bookmark</span>
                </div>
                <p className="text-[11px] text-slate-300 font-medium">
                  Login to unlock this feature
                </p>
              </div>

              {/* Card 2: Rate this content */}
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-4 sm:p-5 flex flex-col justify-between space-y-2 shadow-md">
                <div className="flex items-center gap-1.5 text-slate-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={15} className="stroke-[1.8] fill-none text-slate-400" />
                  ))}
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold text-white block">
                    Rate this content
                  </span>
                  <p className="text-[11px] text-slate-300 font-medium mt-0.5">
                    Login to unlock this feature
                  </p>
                </div>
              </div>

              {/* Card 3: Add a personal note */}
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-4 sm:p-5 flex flex-col justify-between space-y-2 shadow-md">
                <div className="flex items-center gap-2 text-white">
                  <FileText size={18} className="stroke-[2]" />
                  <span className="text-xs sm:text-sm font-bold text-white">Add a personal note</span>
                </div>
                <p className="text-[11px] text-slate-300 font-medium">
                  Login to unlock this feature
                </p>
              </div>
            </div>

            {/* Bottom Action Buttons */}
            <div className="relative z-10 flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => onOpenAuth && onOpenAuth("login")}
                className="bg-[#FF3B30] hover:bg-[#E02B20] text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => onOpenAuth && onOpenAuth("register")}
                className="bg-white/15 border border-white/30 text-white hover:bg-white/25 font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
              >
                Register
              </button>
            </div>
          </div>
        ) : (
          /* Logged In Panel - Interactive Rating & Bookmark Controls */
          <div className="mt-8 rounded-2xl bg-black/60 backdrop-blur-md border border-white/20 p-6 shadow-2xl space-y-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-300 block uppercase tracking-wider">
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

            <div className="pt-3 border-t border-white/15 space-y-2">
              <label className="text-xs font-bold text-slate-300 block">
                Add a personal note
              </label>
              <textarea
                rows={2}
                placeholder="Write your personal thoughts about this content..."
                value={personalNote}
                onChange={(e) => setPersonalNote(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-white/20 focus:outline-none focus:border-[#FF5F1F] bg-black/40 text-white placeholder:text-slate-400"
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

