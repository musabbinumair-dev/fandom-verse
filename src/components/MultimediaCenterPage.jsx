import { useState, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Settings,
  Maximize,
  Minimize,
  Bookmark,
  ChevronRight,
  ChevronLeft,
  LayoutGrid,
  CircleDot,
  Gamepad2,
  Film,
  Tv,
  Music,
  BookOpen,
  Book,
  Smile,
  Headphones,
  Sparkles,
  Star,
  Check
} from "lucide-react";
const PLAYLIST_VIDEOS = [
  {
    id: "vid-1",
    title: "One Piece: Egghead Arc Breakdown",
    duration: "2:34",
    durationSeconds: 154,
    thumbnail: "/src/assets/images/luffy_avatar_1790269807034.jpg",
    category: "ANIME",
    type: "VIDEO",
    tags: ["Action", "Adventure", "Shounen"],
    rating: 4.7,
    ratingCount: "12.4k ratings",
    mediaType: "video"
  },
  {
    id: "vid-2",
    title: "Zoro's Greatest Fights",
    duration: "2:18",
    durationSeconds: 138,
    thumbnail: "/src/assets/images/zoro_fights_1790274082919.jpg",
    category: "ANIME",
    type: "VIDEO",
    tags: ["Swordsman", "Action", "Sakuga"],
    rating: 4.9,
    ratingCount: "18.9k ratings",
    mediaType: "video"
  },
  {
    id: "vid-3",
    title: "Demon Slayer: Infinity Castle",
    duration: "1:52",
    durationSeconds: 112,
    thumbnail: "/src/assets/images/tanjiro_bookmark_1790277857472.jpg",
    category: "ANIME",
    type: "TRAILER",
    tags: ["Dark Fantasy", "Animation", "Ufotable"],
    rating: 4.8,
    ratingCount: "24.1k ratings",
    mediaType: "trailer"
  },
  {
    id: "vid-4",
    title: "Jujutsu Kaisen: Season 2",
    duration: "2:10",
    durationSeconds: 130,
    thumbnail: "/src/assets/images/gojo_satoru_1790270284794.jpg",
    category: "ANIME",
    type: "VIDEO",
    tags: ["Shibuya", "Sorcery", "Supernatural"],
    rating: 4.9,
    ratingCount: "31.2k ratings",
    mediaType: "video"
  },
  {
    id: "vid-5",
    title: "Attack on Titan: Final Season",
    duration: "2:42",
    durationSeconds: 162,
    thumbnail: "/src/assets/images/attack_on_titan_final_1790273197403.jpg",
    category: "ANIME",
    type: "VIDEO",
    tags: ["Military", "Mystery", "Drama"],
    rating: 4.9,
    ratingCount: "42.0k ratings",
    mediaType: "video"
  },
  {
    id: "vid-6",
    title: "Black Myth: Wukong - Boss Encounters",
    duration: "3:15",
    durationSeconds: 195,
    thumbnail: "/src/assets/images/black_myth_wukong_1790273181489.jpg",
    category: "GAMING",
    type: "VIDEO",
    tags: ["Action RPG", "Mythology", "Souls-like"],
    rating: 4.8,
    ratingCount: "15.6k ratings",
    mediaType: "video"
  },
  {
    id: "vid-7",
    title: "Stranger Things S5 Official Teaser",
    duration: "1:45",
    durationSeconds: 105,
    thumbnail: "/src/assets/images/stranger_things_thumb_1790269900192.jpg",
    category: "TV SHOWS",
    type: "TRAILER",
    tags: ["Sci-Fi", "Horror", "80s Nostalgia"],
    rating: 4.6,
    ratingCount: "28.3k ratings",
    mediaType: "trailer"
  },
  {
    id: "vid-8",
    title: "Dune: Part Two - Sound Design Explainer",
    duration: "3:30",
    durationSeconds: 210,
    thumbnail: "/src/assets/images/dune_part_two_1790270217047.jpg",
    category: "MOVIES",
    type: "EXPLAINER",
    tags: ["Hans Zimmer", "Soundtrack", "Sci-Fi"],
    rating: 4.9,
    ratingCount: "11.8k ratings",
    mediaType: "explainer"
  }
];
const FEATURED_VIDEOS = [
  {
    id: "fv-1",
    title: "One Piece: Egghead Arc Breakdown Breakdown",
    thumbnail: "/src/assets/images/luffy_avatar_1790269807034.jpg",
    duration: "12:34",
    category: "ANIME",
    categoryColor: "bg-[#FBCFE8]",
    rating: "4.8"
  },
  {
    id: "fv-2",
    title: "Elden Ring: Shadow of the Erdtree \u2013 First Impressions",
    thumbnail: "/src/assets/images/elden_ring_thumb_1790269858443.jpg",
    duration: "10:21",
    category: "GAMING",
    categoryColor: "bg-[#D1FAE5]",
    rating: "4.6"
  },
  {
    id: "fv-3",
    title: "Dune: Part Two \u2013 A Visual Masterpiece",
    thumbnail: "/src/assets/images/dune_part_two_1790270217047.jpg",
    duration: "08:45",
    category: "MOVIES",
    categoryColor: "bg-[#BAE6FD]",
    rating: "4.7"
  },
  {
    id: "fv-4",
    title: "Stranger Things S5 \u2013 What We Know So Far",
    thumbnail: "/src/assets/images/stranger_things_thumb_1790269900192.jpg",
    duration: "11:32",
    category: "TV SHOWS",
    categoryColor: "bg-[#E9D5FF]",
    rating: "4.7"
  }
];
const FEATURED_TRAILERS = [
  {
    id: "ft-1",
    title: "Spider-Man: Across the Spider-Verse",
    thumbnail: "/src/assets/images/spiderman_comic_1790270342039.jpg",
    category: "MOVIES",
    categoryColor: "bg-[#FEF08A]",
    rating: "4.9"
  },
  {
    id: "ft-2",
    title: "Jujutsu Kaisen: Season 2",
    thumbnail: "/src/assets/images/gojo_satoru_1790270284794.jpg",
    category: "ANIME",
    categoryColor: "bg-[#FBCFE8]",
    rating: "4.7"
  },
  {
    id: "ft-3",
    title: "The Last of Us S2",
    thumbnail: "/src/assets/images/last_of_us_1790273144908.jpg",
    category: "TV SHOWS",
    categoryColor: "bg-[#BAE6FD]",
    rating: "4.6"
  }
];
const FEATURED_AUDIO = [
  {
    id: "aud-1",
    title: "Luffy's Theme (One Piece)",
    thumbnail: "/src/assets/images/luffy_avatar_1790269807034.jpg",
    category: "ANIME",
    categoryColor: "bg-[#FBCFE8]",
    duration: "03:42",
    rating: "4.8"
  },
  {
    id: "aud-2",
    title: "Gfriend - Navillera",
    thumbnail: "/src/assets/images/newjeans_thumb_1790269920672.jpg",
    category: "K-POP",
    categoryColor: "bg-[#FBCFE8]",
    duration: "03:36",
    rating: "4.5"
  },
  {
    id: "aud-3",
    title: "Main Theme (Elden Ring)",
    thumbnail: "/src/assets/images/elden_ring_thumb_1790269858443.jpg",
    category: "GAMING",
    categoryColor: "bg-[#D1FAE5]",
    duration: "04:21",
    rating: "4.6"
  },
  {
    id: "aud-4",
    title: "Attack on Titan - Vogel im K\xE4fig",
    thumbnail: "/src/assets/images/attack_on_titan_final_1790273197403.jpg",
    category: "ANIME",
    categoryColor: "bg-[#FBCFE8]",
    duration: "03:51",
    rating: "4.8"
  },
  {
    id: "aud-5",
    title: "Interstellar - Cornfield Chase",
    thumbnail: "/src/assets/images/interstellar_space_1790270312783.jpg",
    category: "MOVIES",
    categoryColor: "bg-[#BAE6FD]",
    duration: "02:17",
    rating: "4.7"
  },
  {
    id: "aud-6",
    title: "Naruto - Sadness and Sorrow",
    thumbnail: "/src/assets/images/naruto_kurama_1790273165067.jpg",
    category: "MANGA",
    categoryColor: "bg-[#BAE6FD]",
    duration: "04:28",
    rating: "4.7"
  }
];
const EXPLAINER_GRID = [
  {
    id: "exp-1",
    title: "The Story of Naruto",
    thumbnail: "/src/assets/images/naruto_kurama_1790273165067.jpg",
    category: "ANIME",
    categoryColor: "bg-[#FBCFE8]",
    rating: "4.6"
  },
  {
    id: "exp-2",
    title: "The Timeline of Marvel",
    thumbnail: "/src/assets/images/deadpool_wolverine_thumb_1790269881150.jpg",
    category: "MOVIES",
    categoryColor: "bg-[#BAE6FD]",
    rating: "4.7"
  },
  {
    id: "exp-3",
    title: "The History of K-Pop",
    thumbnail: "/src/assets/images/bts_icons_1790277885253.jpg",
    category: "K-POP",
    categoryColor: "bg-[#FBCFE8]",
    rating: "4.5"
  },
  {
    id: "exp-4",
    title: "The Evolution of Manga",
    thumbnail: "/src/assets/images/tanjiro_bookmark_1790277857472.jpg",
    category: "MANGA",
    categoryColor: "bg-[#BAE6FD]",
    rating: "4.4"
  }
];
const MultimediaCenterPage = ({
  onNavigateHome
}) => {
  const [activeMediaType, setActiveMediaType] = useState("all");
  const [activeFandom, setActiveFandom] = useState("All");
  const [currentVideo, setCurrentVideo] = useState(PLAYLIST_VIDEOS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCaptions, setShowCaptions] = useState(false);
  const [playingAudioId, setPlayingAudioId] = useState(null);
  const [bookmarkedIds, setBookmarkedIds] = useState(/* @__PURE__ */ new Set(["vid-1", "fv-1", "ft-1", "exp-main"]));
  const [toastMessage, setToastMessage] = useState(null);
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= currentVideo.durationSeconds) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1e3);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentVideo.durationSeconds]);
  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = Math.floor(totalSeconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };
  const handleSelectVideo = (video) => {
    setCurrentVideo(video);
    setCurrentTime(0);
    setIsPlaying(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleToggleBookmark = (e, id) => {
    e.stopPropagation();
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        setToastMessage("Removed from bookmarks");
      } else {
        next.add(id);
        setToastMessage("Saved to bookmarks!");
      }
      return next;
    });
    setTimeout(() => setToastMessage(null), 2500);
  };
  const filteredPlaylist = PLAYLIST_VIDEOS.filter((item) => {
    const matchesMedia = activeMediaType === "all" || activeMediaType === "videos" && item.mediaType === "video" || activeMediaType === "trailers" && item.mediaType === "trailer" || activeMediaType === "audio" && item.mediaType === "audio" || activeMediaType === "explainers" && item.mediaType === "explainer";
    const matchesFandom = activeFandom === "All" || item.category.toLowerCase() === activeFandom.toLowerCase();
    return matchesMedia && matchesFandom;
  });
  const progressPercent = currentTime / currentVideo.durationSeconds * 100;
  return <div className="w-full bg-[#FAF8F5] min-h-full py-6 px-4 sm:px-6 select-none font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {
    /* 1. BREADCRUMBS: Home > Multimedia Center */
  }
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#737373] font-medium">
          <button
    type="button"
    onClick={onNavigateHome}
    className="hover:text-black transition-colors cursor-pointer"
  >
            Home
          </button>
          <ChevronRight size={13} className="text-[#A3A3A3] shrink-0" />
          <span className="text-[#171717] font-semibold">Multimedia Center</span>
        </nav>

        {
    /* 2. TITLE SECTION with exact Dark Square Play Icon + Heavy Uppercase Heading */
  }
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl sm:text-4xl font-black text-[#1C1917] tracking-tight uppercase font-titan">
              MULTIMEDIA CENTER
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#737373] font-medium mt-1">
            Watch your favorite videos, trailers and listen to amazing audio clips from across all fandoms.
          </p>
        </div>

        {
    /* 3. ROW 1 FILTER TABS: All, Videos, Trailers, Audio, Animated Explainers */
  }
        <div className="border-b border-stone-200/80 pb-1">
          <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto scrollbar-none text-xs sm:text-sm font-semibold text-[#525252]">
            {
    /* All tab */
  }
            <button
    type="button"
    onClick={() => setActiveMediaType("all")}
    className={`flex items-center gap-2 pb-2.5 transition-all cursor-pointer relative ${activeMediaType === "all" ? "text-[#FF5F1F] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#FF5F1F]" : "hover:text-black"}`}
  >
              <div className="w-4 h-4 rounded bg-[#FF5F1F] flex items-center justify-center text-white">
                <Play size={10} className="fill-white ml-0.5" />
              </div>
              <span>All</span>
            </button>

            {
    /* Videos tab */
  }
            <button
    type="button"
    onClick={() => setActiveMediaType("videos")}
    className={`flex items-center gap-2 pb-2.5 transition-all cursor-pointer relative ${activeMediaType === "videos" ? "text-[#FF5F1F] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#FF5F1F]" : "hover:text-black"}`}
  >
              <div className="w-4 h-4 rounded bg-[#1C1917] flex items-center justify-center text-white">
                <Play size={10} className="fill-white ml-0.5" />
              </div>
              <span>Videos</span>
            </button>

            {
    /* Trailers tab */
  }
            <button
    type="button"
    onClick={() => setActiveMediaType("trailers")}
    className={`flex items-center gap-2 pb-2.5 transition-all cursor-pointer relative ${activeMediaType === "trailers" ? "text-[#FF5F1F] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#FF5F1F]" : "hover:text-black"}`}
  >
              <Film size={16} className="text-[#1C1917]" />
              <span>Trailers</span>
            </button>

            {
    /* Audio tab */
  }
            <button
    type="button"
    onClick={() => setActiveMediaType("audio")}
    className={`flex items-center gap-2 pb-2.5 transition-all cursor-pointer relative ${activeMediaType === "audio" ? "text-[#FF5F1F] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#FF5F1F]" : "hover:text-black"}`}
  >
              <Headphones size={16} className="text-[#1C1917]" />
              <span>Audio</span>
            </button>

            {
    /* Animated Explainers tab */
  }
            <button
    type="button"
    onClick={() => setActiveMediaType("explainers")}
    className={`flex items-center gap-2 pb-2.5 transition-all cursor-pointer relative ${activeMediaType === "explainers" ? "text-[#FF5F1F] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#FF5F1F]" : "hover:text-black"}`}
  >
              <Sparkles size={16} className="text-[#1C1917]" />
              <span>Animated Explainers</span>
            </button>
          </div>
        </div>

        {
    /* 4. ROW 2 FANDOM CATEGORY PILLS */
  }
        <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto pb-1 scrollbar-none">
          {
    /* All */
  }
          <button
    type="button"
    onClick={() => setActiveFandom("All")}
    className={`text-xs sm:text-sm font-bold px-4 sm:px-5 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-2xs ${activeFandom === "All" ? "bg-[#FFA800] text-black font-extrabold shadow-sm" : "bg-white text-[#404040] hover:bg-stone-50 border border-stone-200"}`}
  >
            <LayoutGrid size={15} />
            <span>All</span>
          </button>

          {
    /* Anime */
  }
          <button
    type="button"
    onClick={() => setActiveFandom("Anime")}
    className={`text-xs sm:text-sm font-semibold px-4 sm:px-4.5 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-2xs ${activeFandom === "Anime" ? "bg-[#FFA800] text-black font-extrabold shadow-sm" : "bg-white text-[#404040] hover:bg-stone-50 border border-stone-200"}`}
  >
            <CircleDot size={15} className="text-[#E11D48]" />
            <span>Anime</span>
          </button>

          {
    /* Gaming */
  }
          <button
    type="button"
    onClick={() => setActiveFandom("Gaming")}
    className={`text-xs sm:text-sm font-semibold px-4 sm:px-4.5 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-2xs ${activeFandom === "Gaming" ? "bg-[#FFA800] text-black font-extrabold shadow-sm" : "bg-white text-[#404040] hover:bg-stone-50 border border-stone-200"}`}
  >
            <Gamepad2 size={15} className="text-[#4F46E5]" />
            <span>Gaming</span>
          </button>

          {
    /* Movies */
  }
          <button
    type="button"
    onClick={() => setActiveFandom("Movies")}
    className={`text-xs sm:text-sm font-semibold px-4 sm:px-4.5 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-2xs ${activeFandom === "Movies" ? "bg-[#FFA800] text-black font-extrabold shadow-sm" : "bg-white text-[#404040] hover:bg-stone-50 border border-stone-200"}`}
  >
            <Film size={15} className="text-[#D97706]" />
            <span>Movies</span>
          </button>

          {
    /* TV Shows */
  }
          <button
    type="button"
    onClick={() => setActiveFandom("TV Shows")}
    className={`text-xs sm:text-sm font-semibold px-4 sm:px-4.5 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-2xs ${activeFandom === "TV Shows" ? "bg-[#FFA800] text-black font-extrabold shadow-sm" : "bg-white text-[#404040] hover:bg-stone-50 border border-stone-200"}`}
  >
            <Tv size={15} className="text-[#0D9488]" />
            <span>TV Shows</span>
          </button>

          {
    /* K-Pop */
  }
          <button
    type="button"
    onClick={() => setActiveFandom("K-Pop")}
    className={`text-xs sm:text-sm font-semibold px-4 sm:px-4.5 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-2xs ${activeFandom === "K-Pop" ? "bg-[#FFA800] text-black font-extrabold shadow-sm" : "bg-white text-[#404040] hover:bg-stone-50 border border-stone-200"}`}
  >
            <Music size={15} className="text-[#EC4899]" />
            <span>K-Pop</span>
          </button>

          {
    /* Comics */
  }
          <button
    type="button"
    onClick={() => setActiveFandom("Comics")}
    className={`text-xs sm:text-sm font-semibold px-4 sm:px-4.5 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-2xs ${activeFandom === "Comics" ? "bg-[#FFA800] text-black font-extrabold shadow-sm" : "bg-white text-[#404040] hover:bg-stone-50 border border-stone-200"}`}
  >
            <BookOpen size={15} className="text-[#0284C7]" />
            <span>Comics</span>
          </button>

          {
    /* Manga */
  }
          <button
    type="button"
    onClick={() => setActiveFandom("Manga")}
    className={`text-xs sm:text-sm font-semibold px-4 sm:px-4.5 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-2xs ${activeFandom === "Manga" ? "bg-[#FFA800] text-black font-extrabold shadow-sm" : "bg-white text-[#404040] hover:bg-stone-50 border border-stone-200"}`}
  >
            <Book size={15} className="text-[#7C3AED]" />
            <span>Manga</span>
          </button>

          {
    /* Cosplay */
  }
          <button
    type="button"
    onClick={() => setActiveFandom("Cosplay")}
    className={`text-xs sm:text-sm font-semibold px-4 sm:px-4.5 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-2xs ${activeFandom === "Cosplay" ? "bg-[#FFA800] text-black font-extrabold shadow-sm" : "bg-white text-[#404040] hover:bg-stone-50 border border-stone-200"}`}
  >
            <Smile size={15} className="text-[#E11D48]" />
            <span>Cosplay</span>
          </button>
        </div>

        {
    /* TOAST NOTIFICATION */
  }
        {toastMessage && <div className="fixed bottom-6 right-6 z-50 bg-[#1A1D24] border border-[#2B2F3D] text-white text-xs px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-150">
            <Check size={15} className="text-[#FFA800]" />
            <span>{toastMessage}</span>
          </div>}

        {
    /* 5. MAIN STAGE: VIDEO PLAYER (LEFT) & PLAYLIST SIDEBAR (RIGHT) */
  }
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {
    /* LEFT 8 COLUMNS: INTERACTIVE VIDEO PLAYER */
  }
          <div className="lg:col-span-8 space-y-4">
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black shadow-lg group">
              <img
    src={currentVideo.thumbnail}
    alt={currentVideo.title}
    className={`w-full h-full object-cover transition-transform duration-500 ${isPlaying ? "brightness-[0.95]" : "brightness-[0.88]"}`}
  />

              {
    /* Big Center Play/Pause Button */
  }
              <button
    type="button"
    onClick={() => setIsPlaying(!isPlaying)}
    className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/60 hover:bg-black/75 backdrop-blur-xs flex items-center justify-center border-2 border-white/80 text-white shadow-2xl transition-transform hover:scale-105 active:scale-95 cursor-pointer z-10"
    aria-label={isPlaying ? "Pause video" : "Play video"}
  >
                {isPlaying ? <Pause size={28} className="fill-white" /> : <Play size={28} className="fill-white ml-1" />}
              </button>

              {
    /* Subtitles Overlay */
  }
              {showCaptions && <div className="absolute bottom-16 left-0 right-0 text-center pointer-events-none z-10 px-4">
                  <span className="bg-black/80 text-white text-xs sm:text-sm font-medium px-3 py-1.5 rounded shadow">
                    &ldquo;The dawn of a new era is unfolding right here on Egghead Island!&rdquo;
                  </span>
                </div>}

              {
    /* Bottom Video Controls Overlay with Red Scrubber Bar */
  }
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 sm:p-4 z-20 flex flex-col gap-2">
                {
    /* Red Scrubber Bar */
  }
                <div
    className="w-full h-1 bg-white/25 rounded-full cursor-pointer relative overflow-hidden group/bar"
    onClick={(e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newPercent = clickX / rect.width;
      setCurrentTime(Math.floor(newPercent * currentVideo.durationSeconds));
    }}
  >
                  <div
    className="h-full bg-red-600 rounded-full transition-all duration-150"
    style={{ width: `${progressPercent}%` }}
  />
                </div>

                {
    /* Controls Row */
  }
                <div className="flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-3">
                    <button
    type="button"
    onClick={() => setIsPlaying(!isPlaying)}
    className="text-white hover:text-[#FFA800] transition-colors cursor-pointer"
  >
                      {isPlaying ? <Pause size={17} className="fill-current" /> : <Play size={17} className="fill-current" />}
                    </button>

                    <button
    type="button"
    onClick={() => setIsMuted(!isMuted)}
    className="text-white hover:text-[#FFA800] transition-colors cursor-pointer"
  >
                      {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
                    </button>

                    <span className="font-mono text-[11px] sm:text-xs text-white/90 font-medium">
                      {formatTime(currentTime)} / {currentVideo.duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
    type="button"
    onClick={() => setShowCaptions(!showCaptions)}
    className={`text-[10px] font-black px-1.5 py-0.5 rounded border transition-colors cursor-pointer ${showCaptions ? "border-[#FFA800] text-[#FFA800] bg-[#FFA800]/10" : "border-white/70 text-white hover:border-white"}`}
    title="Toggle Captions"
  >
                      CC
                    </button>

                    <button
    type="button"
    onClick={() => setToastMessage("Playback quality: 1080p Full HD")}
    className="text-white hover:text-[#FFA800] transition-colors cursor-pointer"
  >
                      <Settings size={16} />
                    </button>

                    <button
    type="button"
    onClick={() => setIsFullscreen(!isFullscreen)}
    className="text-white hover:text-[#FFA800] transition-colors cursor-pointer"
  >
                      {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {
    /* Video Title */
  }
            <h2 className="text-xl sm:text-2xl font-bold text-[#171717] tracking-tight">
              {currentVideo.title}
            </h2>

            {
    /* Badges & Rating */
  }
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider bg-[#FBCFE8] text-black">
                  {currentVideo.category}
                </span>

                <span className="text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-[#262832] text-[#9CA3AF] border border-[#303340]">
                  {currentVideo.type}
                </span>

                {currentVideo.tags.map((tag) => <span
    key={tag}
    className="text-[11px] font-medium px-3 py-0.5 rounded-full bg-white border border-stone-200 text-stone-600 shadow-2xs"
  >
                    {tag}
                  </span>)}
              </div>

              <div className="flex items-center gap-1 text-xs text-stone-600 font-medium">
                <div className="flex items-center gap-0.5 text-[#FFA800]">
                  <Star size={14} className="fill-current" />
                  <Star size={14} className="fill-current" />
                  <Star size={14} className="fill-current" />
                  <Star size={14} className="fill-current" />
                  <Star size={14} className="fill-current opacity-80" />
                </div>
                <span className="font-bold text-stone-900 ml-1">{currentVideo.rating}</span>
                <span className="text-stone-400">({currentVideo.ratingCount})</span>
              </div>
            </div>
          </div>

          {
    /* RIGHT 4 COLUMNS: PLAYLIST */
  }
          <div className="lg:col-span-4">
            <div className="bg-[#181A20] rounded-2xl p-4 sm:p-5 border border-[#262832] shadow-md flex flex-col space-y-3.5">
              <div>
                <h3 className="text-base font-bold text-white">Playlist</h3>
                <p className="text-xs text-[#9CA3AF] mt-0.5">
                  {filteredPlaylist.length} {filteredPlaylist.length === 1 ? "video" : "videos"}
                </p>
              </div>

              <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-0.5">
                {filteredPlaylist.map((video) => {
    const isActive = currentVideo.id === video.id;
    const isSaved = bookmarkedIds.has(video.id);
    return <div
      key={video.id}
      onClick={() => handleSelectVideo(video)}
      className={`group rounded-xl p-2 flex items-center justify-between gap-3 cursor-pointer transition-all ${isActive ? "border border-[#FFA800] bg-[#222631]" : "border border-transparent bg-[#1E2028] hover:bg-[#252834]"}`}
    >
                      <div className="relative w-20 h-12 rounded-lg overflow-hidden shrink-0 bg-black">
                        <img
      src={video.thumbnail}
      alt={video.title}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
    />
                        {isActive && <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Play size={14} className="fill-[#FFA800] text-[#FFA800]" />
                          </div>}
                      </div>

                      <div className="flex-1 min-w-0 pr-1">
                        <h4
      className={`text-xs font-bold leading-tight line-clamp-2 transition-colors ${isActive ? "text-white" : "text-stone-300 group-hover:text-white"}`}
    >
                          {video.title}
                        </h4>
                        <span className="text-[11px] text-[#9CA3AF] mt-1 block">
                          {video.duration}
                        </span>
                      </div>

                      <button
      type="button"
      onClick={(e) => handleToggleBookmark(e, video.id)}
      className={`p-1.5 rounded-md transition-colors shrink-0 cursor-pointer ${isSaved ? "text-[#FFA800]" : "text-[#8E95A5] hover:text-white"}`}
      title={isSaved ? "Bookmarked" : "Save bookmark"}
    >
                        <Bookmark
      size={15}
      className={isSaved ? "fill-current stroke-[2]" : "stroke-[2]"}
    />
                      </button>
                    </div>;
  })}
              </div>
            </div>
          </div>
        </div>

        {
    /* 6. SECTION 1: VIDEOS */
  }
        <section className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-[#1C1917] flex items-center justify-center text-white">
                <Play size={11} className="fill-white ml-0.5" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#171717] uppercase tracking-wide">
                VIDEOS
              </h3>
            </div>
            <button
    type="button"
    onClick={() => setActiveMediaType("videos")}
    className="text-xs font-bold text-[#FF5F1F] hover:underline flex items-center gap-1 cursor-pointer"
  >
              <span>See all</span>
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {FEATURED_VIDEOS.map((item) => <div
    key={item.id}
    onClick={() => {
      setCurrentVideo({
        id: item.id,
        title: item.title,
        duration: item.duration,
        durationSeconds: 154,
        thumbnail: item.thumbnail,
        category: item.category,
        type: "VIDEO",
        tags: ["Featured", item.category],
        rating: parseFloat(item.rating),
        ratingCount: "15k ratings",
        mediaType: "video"
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
    className="group cursor-pointer flex flex-col justify-between"
  >
                {
    /* Thumbnail container */
  }
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-black shadow-xs border border-stone-200/80">
                  <img
    src={item.thumbnail}
    alt={item.title}
    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
  />
                  {
    /* Bookmark Button Top Right */
  }
                  <button
    type="button"
    onClick={(e) => handleToggleBookmark(e, item.id)}
    className="absolute top-2 right-2 w-6 h-6 rounded bg-black/60 hover:bg-black/85 flex items-center justify-center text-white transition-colors cursor-pointer"
  >
                    <Bookmark
    size={13}
    className={bookmarkedIds.has(item.id) ? "fill-[#FFA800] text-[#FFA800]" : "text-white"}
  />
                  </button>

                  {
    /* Duration Pill Bottom Right */
  }
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                    {item.duration}
                  </div>
                </div>

                {
    /* Details */
  }
                <div className="pt-2">
                  <h4 className="text-xs sm:text-[13px] font-bold text-stone-900 group-hover:text-[#FF5F1F] transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h4>

                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${item.categoryColor} text-black`}>
                      {item.category}
                    </span>

                    <div className="flex items-center gap-1 text-xs font-semibold text-stone-700">
                      <Star size={13} className="fill-[#FFA800] text-[#FFA800]" />
                      <span>{item.rating}</span>
                    </div>
                  </div>
                </div>
              </div>)}
          </div>
        </section>

        {
    /* 7. SECTION 2: TRAILERS */
  }
        <section className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Film size={18} className="text-[#1C1917]" />
              <h3 className="text-base sm:text-lg font-bold text-[#171717] uppercase tracking-wide">
                TRAILERS
              </h3>
            </div>
            <button
    type="button"
    onClick={() => setActiveMediaType("trailers")}
    className="text-xs font-bold text-[#FF5F1F] hover:underline flex items-center gap-1 cursor-pointer"
  >
              <span>See all</span>
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>

          <div className="relative">
            {
    /* Carousel navigation buttons */
  }
            <button
    type="button"
    className="hidden lg:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white border border-stone-200 shadow-md items-center justify-center text-stone-700 hover:text-black hover:scale-105 transition-all cursor-pointer"
    title="Previous"
  >
              <ChevronLeft size={18} />
            </button>

            <button
    type="button"
    className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white border border-stone-200 shadow-md items-center justify-center text-stone-700 hover:text-black hover:scale-105 transition-all cursor-pointer"
    title="Next"
  >
              <ChevronRight size={18} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {FEATURED_TRAILERS.map((trailer) => <div
    key={trailer.id}
    onClick={() => {
      setCurrentVideo({
        id: trailer.id,
        title: trailer.title,
        duration: "2:15",
        durationSeconds: 135,
        thumbnail: trailer.thumbnail,
        category: trailer.category,
        type: "TRAILER",
        tags: ["Official Trailer", trailer.category],
        rating: parseFloat(trailer.rating),
        ratingCount: "22k ratings",
        mediaType: "trailer"
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
    className="group relative aspect-[16/10] rounded-xl overflow-hidden bg-black shadow-md cursor-pointer"
  >
                  <img
    src={trailer.thumbnail}
    alt={trailer.title}
    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300 brightness-[0.85]"
  />

                  {
    /* Gradient Overlay */
  }
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {
    /* Center Play Button */
  }
                  <div className="absolute inset-0 m-auto w-11 h-11 rounded-full bg-black/55 backdrop-blur-xs border border-white/70 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play size={16} className="fill-white ml-0.5" />
                  </div>

                  {
    /* Top Right Bookmark Button */
  }
                  <button
    type="button"
    onClick={(e) => handleToggleBookmark(e, trailer.id)}
    className="absolute top-2.5 right-2.5 w-6 h-6 rounded bg-black/60 hover:bg-black/85 flex items-center justify-center text-white transition-colors cursor-pointer z-10"
  >
                    <Bookmark
    size={13}
    className={bookmarkedIds.has(trailer.id) ? "fill-[#FFA800] text-[#FFA800]" : "text-white"}
  />
                  </button>

                  {
    /* Bottom Info Overlay */
  }
                  <div className="absolute inset-x-0 bottom-0 p-3.5 space-y-1.5 z-10">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white leading-tight line-clamp-1 group-hover:text-amber-300 transition-colors">
                        {trailer.title}
                      </h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-black/75 text-stone-300 border border-stone-700">
                        TRAILER
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-0.5">
                      <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${trailer.categoryColor} text-black`}>
                        {trailer.category}
                      </span>

                      <div className="flex items-center gap-1 text-xs font-semibold text-white">
                        <Star size={13} className="fill-[#FFA800] text-[#FFA800]" />
                        <span>{trailer.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>)}
            </div>
          </div>
        </section>

        {
    /* 8. SECTION 3: AUDIO (PODCASTS AND SOUNDTRACKS) */
  }
        <section className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Headphones size={18} className="text-[#1C1917]" />
              <h3 className="text-base sm:text-lg font-bold text-[#171717] uppercase tracking-wide">
                AUDIO (PODCASTS AND SOUNDTRACKS)
              </h3>
            </div>
            <button
    type="button"
    onClick={() => setActiveMediaType("audio")}
    className="text-xs font-bold text-[#FF5F1F] hover:underline flex items-center gap-1 cursor-pointer"
  >
              <span>See all</span>
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FEATURED_AUDIO.map((track) => {
    const isPlayingThis = playingAudioId === track.id;
    return <div
      key={track.id}
      className="bg-white rounded-xl p-3 border border-stone-200/90 shadow-2xs hover:shadow-sm flex items-center justify-between gap-3 transition-all"
    >
                  {
      /* Left thumbnail */
    }
                  <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-stone-900 border border-stone-100">
                    <img
      src={track.thumbnail}
      alt={track.title}
      className="w-full h-full object-cover"
    />
                  </div>

                  {
      /* Center details & waveform */
    }
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-stone-900 truncate">
                        {track.title}
                      </h4>
                      <span className={`text-[9px] font-black px-1.5 py-0.2 rounded uppercase ${track.categoryColor} text-black shrink-0`}>
                        {track.category}
                      </span>
                    </div>

                    {
      /* Audio scrubber & waveform bars */
    }
                    <div className="flex items-center gap-2 pt-0.5">
                      <button
      type="button"
      onClick={() => setPlayingAudioId(isPlayingThis ? null : track.id)}
      className="w-5 h-5 rounded-full bg-[#1C1917] hover:bg-[#FF5F1F] text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer"
      title={isPlayingThis ? "Pause" : "Play"}
    >
                        {isPlayingThis ? <Pause size={9} className="fill-white" /> : <Play size={9} className="fill-white ml-0.5" />}
                      </button>

                      {
      /* Simulated Soundwave Bars */
    }
                      <div className="flex-1 flex items-center gap-[2px] h-4">
                        {[4, 8, 12, 6, 14, 9, 5, 12, 16, 8, 10, 14, 7, 11, 15, 6, 9, 13, 8, 5, 11, 14, 7, 10].map((h, i) => <div
      key={i}
      className={`w-[2px] rounded-full transition-all duration-200 ${isPlayingThis ? "bg-[#FF5F1F] animate-pulse" : "bg-stone-300"}`}
      style={{ height: `${h}px` }}
    />)}
                      </div>
                    </div>
                  </div>

                  {
      /* Right metadata & bookmark */
    }
                  <div className="flex flex-col items-end justify-between h-12 shrink-0">
                    <button
      type="button"
      onClick={(e) => handleToggleBookmark(e, track.id)}
      className="text-stone-400 hover:text-stone-800 cursor-pointer"
    >
                      <Bookmark
      size={14}
      className={bookmarkedIds.has(track.id) ? "fill-[#FFA800] text-[#FFA800]" : ""}
    />
                    </button>

                    <div className="flex items-center gap-2 text-[11px] text-stone-500 font-medium">
                      <span>{track.duration}</span>
                      <div className="flex items-center gap-0.5 text-stone-700 font-bold">
                        <Star size={11} className="fill-[#FFA800] text-[#FFA800]" />
                        <span>{track.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>;
  })}
          </div>
        </section>

        {
    /* 9. SECTION 4: ANIMATED EXPLAINERS */
  }
        <section className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-[#1C1917]" />
              <h3 className="text-base sm:text-lg font-bold text-[#171717] uppercase tracking-wide">
                ANIMATED EXPLAINERS
              </h3>
            </div>
            <button
    type="button"
    onClick={() => setActiveMediaType("explainers")}
    className="text-xs font-bold text-[#FF5F1F] hover:underline flex items-center gap-1 cursor-pointer"
  >
              <span>See all</span>
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {
    /* Left Big Card: How Pokémon Works */
  }
            <div
    onClick={() => {
      setCurrentVideo({
        id: "exp-main",
        title: "How Pok\xE9mon Works",
        duration: "09:20",
        durationSeconds: 560,
        thumbnail: "/src/assets/images/pikachu_explainer_1790279251212.jpg",
        category: "GAMING",
        type: "EXPLAINER",
        tags: ["Pok\xE9mon", "Animation", "Lore"],
        rating: 4.8,
        ratingCount: "34k ratings",
        mediaType: "explainer"
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
    className="lg:col-span-6 relative aspect-[16/10] rounded-xl overflow-hidden bg-black shadow-md cursor-pointer group"
  >
              <img
    src="/src/assets/images/pikachu_explainer_1790279251212.jpg"
    alt="How Pokémon Works"
    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
  />

              {
    /* Gradient Overlay */
  }
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {
    /* Top Right Bookmark Button */
  }
              <button
    type="button"
    onClick={(e) => handleToggleBookmark(e, "exp-main")}
    className="absolute top-2.5 right-2.5 w-6 h-6 rounded bg-black/60 hover:bg-black/85 flex items-center justify-center text-white transition-colors cursor-pointer z-10"
  >
                <Bookmark
    size={13}
    className={bookmarkedIds.has("exp-main") ? "fill-[#FFA800] text-[#FFA800]" : "text-white"}
  />
              </button>

              {
    /* Bottom Info */
  }
              <div className="absolute inset-x-0 bottom-0 p-4 space-y-1 z-10">
                <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                  How Pokémon Works
                </h4>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-[#D1FAE5] text-black">
                    GAMING
                  </span>

                  <div className="flex items-center gap-1 text-xs font-semibold text-white">
                    <Star size={13} className="fill-[#FFA800] text-[#FFA800]" />
                    <span>4.8</span>
                  </div>
                </div>
              </div>
            </div>

            {
    /* Right 2x2 Grid of 4 Cards */
  }
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {EXPLAINER_GRID.map((exp) => <div
    key={exp.id}
    onClick={() => {
      setCurrentVideo({
        id: exp.id,
        title: exp.title,
        duration: "06:45",
        durationSeconds: 405,
        thumbnail: exp.thumbnail,
        category: exp.category,
        type: "EXPLAINER",
        tags: ["Animated Explainer", exp.category],
        rating: parseFloat(exp.rating),
        ratingCount: "19k ratings",
        mediaType: "explainer"
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
    className="bg-white rounded-xl p-2.5 border border-stone-200/90 shadow-2xs hover:shadow-sm flex items-center justify-between gap-3 cursor-pointer group transition-all"
  >
                  <div className="w-16 h-14 rounded-lg overflow-hidden shrink-0 bg-stone-900">
                    <img
    src={exp.thumbnail}
    alt={exp.title}
    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
  />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="text-xs font-bold text-stone-900 group-hover:text-[#FF5F1F] transition-colors truncate">
                      {exp.title}
                    </h4>

                    <span className={`inline-block text-[9px] font-black px-2 py-0.2 rounded-full uppercase ${exp.categoryColor} text-black`}>
                      {exp.category}
                    </span>
                  </div>

                  <div className="flex flex-col items-end justify-between h-12 shrink-0">
                    <button
    type="button"
    onClick={(e) => handleToggleBookmark(e, exp.id)}
    className="text-stone-400 hover:text-stone-800 cursor-pointer"
  >
                      <Bookmark
    size={13}
    className={bookmarkedIds.has(exp.id) ? "fill-[#FFA800] text-[#FFA800]" : ""}
  />
                    </button>

                    <div className="flex items-center gap-1 text-[11px] font-bold text-stone-700">
                      <Star size={11} className="fill-[#FFA800] text-[#FFA800]" />
                      <span>{exp.rating}</span>
                    </div>
                  </div>
                </div>)}
            </div>
          </div>
        </section>
      </div>
    </div>;
};
export {
  MultimediaCenterPage
};
