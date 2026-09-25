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
  Check,
  Search
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

const VideoPlayerModal = ({ video, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const durationSeconds = video.durationSeconds || 120;
  const progressPercent = (currentTime / durationSeconds) * 100;

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= durationSeconds) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, durationSeconds]);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = Math.floor(totalSeconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#181A20] border border-[#2B2F3D] text-white rounded-none max-w-2xl w-full overflow-hidden shadow-2xl relative">
        <div className="relative aspect-[16/9] w-full bg-black">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover brightness-90"
          />
          
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-black/60 hover:bg-black/75 flex items-center justify-center border border-white/40 text-white transition-all scale-100 hover:scale-105 cursor-pointer"
          >
            {isPlaying ? <Pause size={24} className="fill-white" /> : <Play size={24} className="fill-white ml-1" />}
          </button>

          {/* Controls overlay */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 to-transparent p-4 flex flex-col gap-2">
            {/* Scrubber bar */}
            <div className="w-full h-1 bg-white/20 rounded-none cursor-pointer relative overflow-hidden">
              <div
                className="h-full bg-red-600 transition-all duration-150"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            
            {/* Controls */}
            <div className="flex items-center justify-between text-xs text-white/90">
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setIsPlaying(!isPlaying)} className="hover:text-[#FFA800] cursor-pointer">
                  {isPlaying ? <Pause size={14} className="fill-current" /> : <Play size={14} className="fill-current" />}
                </button>
                <span>{formatTime(currentTime)} / {video.duration}</span>
              </div>
              <span className="text-[10px] font-bold text-[#FFA800] tracking-widest">CANON PLAYBACK</span>
            </div>
          </div>
        </div>

        <div className="p-5 bg-[#1F2330]">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
            <div>
              <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">{video.category}</span>
              <h3 className="text-lg font-bold text-white tracking-tight">{video.title}</h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 bg-white/10 hover:bg-white/25 border border-white/20 text-white font-extrabold text-xs rounded-none transition-colors cursor-pointer"
            >
              CLOSE
            </button>
          </div>
          <p className="text-xs text-stone-400 leading-relaxed">
            Playing this official high fidelity video file directly from the canon database registry archives. Bookmark this clip to save it to your library!
          </p>
        </div>
      </div>
    </div>
  );
};

const MultimediaCenterPage = ({
  onNavigateHome
}) => {
  const [activeMediaType, setActiveMediaType] = useState("all");
  const [activeFandom, setActiveFandom] = useState("All");
  const [activeModalVideo, setActiveModalVideo] = useState(null);
  const [playingAudioId, setPlayingAudioId] = useState(null);
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set(["vid-1", "fv-1", "ft-1", "exp-main"]));
  const [toastMessage, setToastMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

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

  return <div className="w-full bg-[#FAF8F5] min-h-full py-6 px-4 sm:px-6 select-none font-sans">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* PAGE HEADER TITLE */}
        <div className="pt-2 pb-1">
          <h1 className="text-2xl sm:text-3.5xl font-black tracking-tight uppercase font-titan text-[#171717]">
            MULTIMEDIA CENTER
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-[#7A6F64] mt-0.5">
            Watch your favorite videos, trailers and listen to amazing audio clips from across all fandoms.
          </p>
        </div>

        {/* Small Page-specific Search Bar */}
        <div className="max-w-md w-full relative">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#737373] pointer-events-none">
            <Search size={14} className="text-[#737373]" />
          </span>
          <input
            type="text"
            placeholder="Search media files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs font-bold pl-9 pr-8 py-2 border border-[#E5E7EB] rounded-none bg-white text-[#171717] focus:outline-none focus:border-[#FFA800] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-[#FFA800]"
            >
              <X size={14} />
            </button>
          )}
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
            className={`text-xs sm:text-sm font-bold px-4 sm:px-5 py-2 rounded-none transition-all flex items-center gap-2 cursor-pointer shadow-2xs ${activeFandom === "All" ? "bg-[#FFA800] text-black font-extrabold shadow-sm" : "bg-white text-[#404040] hover:bg-stone-50 border border-stone-200"}`}
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
            className={`text-xs sm:text-sm font-semibold px-4 sm:px-4.5 py-2 rounded-none transition-all flex items-center gap-2 cursor-pointer shadow-2xs ${activeFandom === "Anime" ? "bg-[#FFA800] text-black font-extrabold shadow-sm" : "bg-white text-[#404040] hover:bg-stone-50 border border-stone-200"}`}
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
            className={`text-xs sm:text-sm font-semibold px-4 sm:px-4.5 py-2 rounded-none transition-all flex items-center gap-2 cursor-pointer shadow-2xs ${activeFandom === "Gaming" ? "bg-[#FFA800] text-black font-extrabold shadow-sm" : "bg-white text-[#404040] hover:bg-stone-50 border border-stone-200"}`}
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
            className={`text-xs sm:text-sm font-semibold px-4 sm:px-4.5 py-2 rounded-none transition-all flex items-center gap-2 cursor-pointer shadow-2xs ${activeFandom === "Movies" ? "bg-[#FFA800] text-black font-extrabold shadow-sm" : "bg-white text-[#404040] hover:bg-stone-50 border border-stone-200"}`}
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
            className={`text-xs sm:text-sm font-semibold px-4 sm:px-4.5 py-2 rounded-none transition-all flex items-center gap-2 cursor-pointer shadow-2xs ${activeFandom === "TV Shows" ? "bg-[#FFA800] text-black font-extrabold shadow-sm" : "bg-white text-[#404040] hover:bg-stone-50 border border-stone-200"}`}
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
            className={`text-xs sm:text-sm font-semibold px-4 sm:px-4.5 py-2 rounded-none transition-all flex items-center gap-2 cursor-pointer shadow-2xs ${activeFandom === "K-Pop" ? "bg-[#FFA800] text-black font-extrabold shadow-sm" : "bg-white text-[#404040] hover:bg-stone-50 border border-stone-200"}`}
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
            className={`text-xs sm:text-sm font-semibold px-4 sm:px-4.5 py-2 rounded-none transition-all flex items-center gap-2 cursor-pointer shadow-2xs ${activeFandom === "Comics" ? "bg-[#FFA800] text-black font-extrabold shadow-sm" : "bg-white text-[#404040] hover:bg-stone-50 border border-stone-200"}`}
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
            className={`text-xs sm:text-sm font-semibold px-4 sm:px-4.5 py-2 rounded-none transition-all flex items-center gap-2 cursor-pointer shadow-2xs ${activeFandom === "Manga" ? "bg-[#FFA800] text-black font-extrabold shadow-sm" : "bg-white text-[#404040] hover:bg-stone-50 border border-stone-200"}`}
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
            className={`text-xs sm:text-sm font-semibold px-4 sm:px-4.5 py-2 rounded-none transition-all flex items-center gap-2 cursor-pointer shadow-2xs ${activeFandom === "Cosplay" ? "bg-[#FFA800] text-black font-extrabold shadow-sm" : "bg-white text-[#404040] hover:bg-stone-50 border border-stone-200"}`}
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
            {FEATURED_VIDEOS.filter(item => !searchQuery.trim() || item.title.toLowerCase().includes(searchQuery.toLowerCase())).map((item) => <div
    key={item.id}
    onClick={() => {
      setActiveModalVideo({
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
    }}
    className="group cursor-pointer flex flex-col justify-between"
  >
                {
    /* Thumbnail container */
  }
                <div className="relative aspect-[16/9] w-full rounded-none overflow-hidden bg-black shadow-xs border border-stone-200/80">
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
                    className="absolute top-2 right-2 w-6 h-6 rounded-none bg-black/60 hover:bg-black/85 flex items-center justify-center text-white transition-colors cursor-pointer"
                  >
                    <Bookmark
                      size={13}
                      className={bookmarkedIds.has(item.id) ? "fill-[#FFA800] text-[#FFA800]" : "text-white"}
                    />
                  </button>

                  {
    /* Duration Pill Bottom Right */
  }
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-none">
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
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-none uppercase tracking-wider ${item.categoryColor} text-black`}>
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
            {FEATURED_AUDIO.filter(track => !searchQuery.trim() || track.title.toLowerCase().includes(searchQuery.toLowerCase())).map((track) => {
    const isPlayingThis = playingAudioId === track.id;
    return <div
      key={track.id}
      className="bg-white rounded-none p-3 border border-stone-200/90 shadow-2xs hover:shadow-sm flex items-center justify-between gap-3 transition-all"
    >
                  {
                    /* Left thumbnail */
                  }
                  <div className="w-12 h-12 rounded-none overflow-hidden shrink-0 bg-stone-900 border border-stone-100">
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
                setActiveModalVideo({
                  id: "exp-main",
                  title: "How Pokémon Works",
                  duration: "09:20",
                  durationSeconds: 560,
                  thumbnail: "/src/assets/images/pikachu_explainer_1790279251212.jpg",
                  category: "GAMING",
                  type: "EXPLAINER",
                  tags: ["Pokémon", "Animation", "Lore"],
                  rating: 4.8,
                  ratingCount: "34k ratings",
                  mediaType: "explainer"
                });
              }}
              className="lg:col-span-6 relative aspect-[16/10] rounded-none overflow-hidden bg-black shadow-md cursor-pointer group"
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
                className="absolute top-2.5 right-2.5 w-6 h-6 rounded-none bg-black/60 hover:bg-black/85 flex items-center justify-center text-white transition-colors cursor-pointer z-10"
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
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-none uppercase tracking-wider bg-[#D1FAE5] text-black">
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
              {EXPLAINER_GRID.filter(exp => !searchQuery.trim() || exp.title.toLowerCase().includes(searchQuery.toLowerCase())).map((exp) => (
                <div
                  key={exp.id}
                  onClick={() => {
                    setActiveModalVideo({
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
                  }}
                  className="bg-white rounded-none p-2.5 border border-stone-200/90 shadow-2xs hover:shadow-sm flex items-center justify-between gap-3 cursor-pointer group transition-all"
                >
                  <div className="w-16 h-14 rounded-none overflow-hidden shrink-0 bg-stone-900">
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

                    <span className={`inline-block text-[9px] font-black px-2 py-0.2 rounded-none uppercase ${exp.categoryColor} text-black`}>
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
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Player Modal render */}
        {activeModalVideo && (
          <VideoPlayerModal
            video={activeModalVideo}
            onClose={() => setActiveModalVideo(null)}
          />
        )}
      </div>
    </div>;
};

export { MultimediaCenterPage };
