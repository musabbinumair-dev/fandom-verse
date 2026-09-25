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
  FileText,
  Sparkles,
  Shield,
  Check,
  Share2
} from "lucide-react";
import { getRelatedBgImage } from "../utils/bgImages.js";

export const CharacterDetailPage = ({
  character = {},
  onBack,
  onOpenAuth,
  isLoggedIn = true
}) => {
  const [personalNote, setPersonalNote] = useState("");
  const [userRating, setUserRating] = useState(5);
  const [isSaved, setIsSaved] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const name = character?.name || "Kael Vex";
  const category = character?.category || "Anime";
  const fandom = character?.fandom || "Star Chasers";
  const role = character?.role || "Hero & Guardian";
  const bio = character?.bio || "A legendary hero standing at the crossroads of destiny, wielding starlight resonance to protect the floating islands.";
  const lore = character?.lore || "Born under the crimson eclipse, Kael mastered celestial energy at a young age. His journey has taken him across forgotten ruins and floating archipelagos, gathering allies to face the shadow awakening.";
  const abilities = character?.abilities || ["Starlight Resonance", "Gravitational Rift", "Hyper-spatial Reflexes"];
  
  const bgImage = character?.backgroundImage || character?.bgImage || getRelatedBgImage(character) || "/src/assets/images/fandom_banner_1790273074334.jpg";
  const portraitImage = character?.image || "/src/assets/images/kael_vex_1790281397401.jpg";

  const handleToggleSave = () => {
    if (!isLoggedIn && onOpenAuth) {
      onOpenAuth("login");
      return;
    }
    setIsSaved(!isSaved);
    setToastMessage(!isSaved ? "Character saved to your bookmarks!" : "Character removed from bookmarks.");
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setToastMessage("Character link copied to clipboard!");
    setTimeout(() => setToastMessage(null), 2500);
  };

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
          alt={name}
          className="w-full h-full object-cover object-center opacity-85 filter brightness-[0.85] scale-105"
        />
        {/* Subtle dark vignette overlay allowing background picture to be vivid & clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
      </div>

      {/* CONTENT LAYER OVER BACKGROUND PICTURE */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-6 space-y-7">

        {/* 1. TOP BREADCRUMB / BACK BAR */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-300 hover:text-white transition-colors cursor-pointer bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/20"
          >
            <ChevronLeft size={16} />
            <span>Back to Characters</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="flex items-center gap-1.5 text-xs font-bold bg-black/40 backdrop-blur-md border border-white/20 hover:border-white text-white px-3.5 py-1.5 rounded-full transition-colors cursor-pointer shadow-xs"
            >
              <Share2 size={13} className="text-stone-300" />
              <span>Share</span>
            </button>

            <button
              type="button"
              onClick={handleToggleSave}
              className={`flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-full transition-colors cursor-pointer border ${isSaved ? "bg-[#FF5F1F] border-[#FF5F1F] text-white shadow-md" : "bg-black/40 backdrop-blur-md border-white/20 text-white hover:border-white"}`}
            >
              <Bookmark size={13} className={isSaved ? "fill-white text-white" : "text-stone-300"} />
              <span>{isSaved ? "Saved" : "Save"}</span>
            </button>
          </div>
        </div>

        {/* 2. HERO VIDEO PLAYER SECTION */}
        <div className="relative w-full aspect-video sm:aspect-[21/9] rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/20 group">
          <img
            src={portraitImage}
            alt={name}
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
              <button type="button" className="hover:text-[#FF5F1F] cursor-pointer transition-colors">
                <Play size={16} className="fill-white" />
              </button>
              <span className="text-[11px] font-semibold text-stone-300">0:00 / 3:12</span>
              <div className="hidden sm:block w-32 sm:w-64 h-1 bg-white/30 rounded-full overflow-hidden">
                <div className="w-0 h-full bg-[#FF5F1F]" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button type="button" className="hover:text-[#FF5F1F] cursor-pointer transition-colors">
                <Volume2 size={16} />
              </button>
              <button type="button" className="hover:text-[#FF5F1F] cursor-pointer transition-colors">
                <Settings size={15} />
              </button>
              <button type="button" className="hover:text-[#FF5F1F] cursor-pointer transition-colors">
                <Tv size={15} />
              </button>
              <button type="button" className="hover:text-[#FF5F1F] cursor-pointer transition-colors">
                <Maximize2 size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* 3. POSTER & OVERVIEW SECTION (2 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Column: Vertical Character Portrait Artwork */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className="relative aspect-[2/3] w-full max-w-[260px] mx-auto md:mx-0 rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-stone-900 group">
              <img
                src={portraitImage}
                alt={name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              {/* Poster Overlay Title */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                <span className="font-titan text-lg sm:text-xl font-black uppercase tracking-tight leading-none drop-shadow-md">
                  {name}
                </span>
                <span className="text-[10px] font-bold tracking-widest text-amber-300 uppercase mt-1">
                  {role}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Tag Pills, and Description */}
          <div className="md:col-span-8 lg:col-span-9 space-y-4">
            {/* Title */}
            <h1 className="text-2xl sm:text-3.5xl font-black text-white tracking-tight leading-tight drop-shadow-md">
              {name}
            </h1>

            {/* Tag Pills Bar */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="bg-[#FF5F1F]/25 text-[#FFA07A] border border-[#FF5F1F]/40 font-extrabold text-[11px] px-3.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs shadow-xs">
                {category}
              </span>
              <span className="bg-[#0284C7]/25 text-[#38BDF8] border border-[#0284C7]/40 font-extrabold text-[11px] px-3.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs shadow-xs">
                {fandom}
              </span>
              <span className="bg-[#9333EA]/25 text-[#C084FC] border border-[#9333EA]/40 font-extrabold text-[11px] px-3.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs shadow-xs">
                Hero
              </span>
              <span className="bg-[#16A34A]/25 text-[#4ADE80] border border-[#16A34A]/40 font-extrabold text-[11px] px-3.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs shadow-xs flex items-center gap-1.5">
                <Sparkles size={13} className="stroke-[2.5]" />
                <span>Verified Canon</span>
              </span>
            </div>

            {/* Description Paragraphs in Glassmorphic Card */}
            <div className="bg-black/45 backdrop-blur-md border border-white/15 p-5 sm:p-6 rounded-2xl space-y-4 shadow-xl text-slate-100">
              <h2 className="text-base sm:text-lg font-bold text-white">
                Character Overview & Lore
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                {bio}
              </p>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                {lore}
              </p>

              {/* Signature Abilities */}
              {abilities && abilities.length > 0 && (
                <div className="pt-2">
                  <h3 className="text-xs font-black uppercase tracking-wider text-amber-300 mb-2">
                    Signature Abilities & Powers
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {abilities.map((ability, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-bold bg-white/10 border border-white/20 text-amber-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5 backdrop-blur-xs"
                      >
                        <Sparkles size={13} className="text-[#FF5F1F]" />
                        <span>{ability}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 4. INTERACTIVE USER FEATURES SECTION (OR LOGIN PROMPT FOR GUESTS) */}
        {isLoggedIn ? (
          <div className="mt-8 rounded-2xl bg-black/55 backdrop-blur-md border border-white/20 p-6 sm:p-8 space-y-6 shadow-2xl">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Star size={18} className="text-[#FFCC00] fill-[#FFCC00]" />
              <span>Your Character Interaction & Notes</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {/* Feature 1: Bookmark Status */}
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-4 sm:p-5 flex flex-col justify-between space-y-3 shadow-md">
                <div className="flex items-center justify-between text-white">
                  <span className="text-xs sm:text-sm font-bold">Bookmark</span>
                  <button
                    type="button"
                    onClick={handleToggleSave}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${isSaved ? "bg-[#FF5F1F] text-white" : "bg-white/20 hover:bg-white/30 text-white"}`}
                  >
                    {isSaved ? "Saved" : "Save"}
                  </button>
                </div>
                <p className="text-[11px] text-slate-300 font-medium">
                  {isSaved ? "Saved in your saved bookmarks." : "Save this character to your favorites."}
                </p>
              </div>

              {/* Feature 2: Rate Character */}
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-4 sm:p-5 flex flex-col justify-between space-y-3 shadow-md">
                <div>
                  <span className="text-xs sm:text-sm font-bold text-white block mb-1">
                    Rate Character
                  </span>
                  {renderStars()}
                </div>
                <p className="text-[11px] text-slate-300 font-medium">
                  Your rating: {userRating}/5 stars
                </p>
              </div>

              {/* Feature 3: Personal Note */}
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-4 sm:p-5 flex flex-col justify-between space-y-3 shadow-md">
                <div className="flex items-center gap-2 text-white">
                  <FileText size={16} />
                  <span className="text-xs sm:text-sm font-bold">Personal Note</span>
                </div>
                <input
                  type="text"
                  value={personalNote}
                  onChange={(e) => setPersonalNote(e.target.value)}
                  placeholder="Add private note..."
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#FF5F1F]"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8 rounded-2xl bg-gradient-to-br from-black/75 via-slate-900/80 to-black/80 backdrop-blur-md border border-white/20 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#FF5F1F] text-white flex items-center justify-center shrink-0 shadow-md font-bold">
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

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-4 sm:p-5 flex flex-col justify-between space-y-2 shadow-md">
                <div className="flex items-center gap-2 text-white">
                  <Bookmark size={18} className="stroke-[2]" />
                  <span className="text-xs sm:text-sm font-bold text-white">Bookmark</span>
                </div>
                <p className="text-[11px] text-slate-300 font-medium">
                  Login to unlock this feature
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-4 sm:p-5 flex flex-col justify-between space-y-2 shadow-md">
                <div className="flex items-center gap-1.5 text-slate-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={15} className="stroke-[1.8] fill-none text-slate-400" />
                  ))}
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold text-white block">
                    Rate this character
                  </span>
                  <p className="text-[11px] text-slate-300 font-medium mt-0.5">
                    Login to unlock this feature
                  </p>
                </div>
              </div>

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

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => onOpenAuth && onOpenAuth("login")}
                className="px-6 py-2.5 bg-[#FF5F1F] hover:bg-[#e04e15] text-white font-bold text-xs rounded-xl shadow-lg transition-colors cursor-pointer"
              >
                Log In / Sign Up
              </button>
            </div>
          </div>
        )}

      </div>

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#171717] border border-[#333] text-white text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <Check size={15} className="text-[#FF5F1F]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
