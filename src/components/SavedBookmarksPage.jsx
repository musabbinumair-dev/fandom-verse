import { useState } from "react";
import {
  Bookmark,
  ChevronRight,
  FileText,
  Users,
  Film,
  Tag,
  Calendar,
  Flame,
  Edit3,
  Eye,
  Trash2,
  X,
  Undo2,
  Search
} from "lucide-react";
const INITIAL_BOOKMARKS = [
  {
    id: "bm-1",
    title: "The Complete Guide to the One Piece Universe",
    category: "ANIME",
    type: "ARTICLE",
    year: "2024",
    views: "9.8K",
    note: "One of my all time favorites. The world building is just unmatched.",
    image: "/src/assets/images/luffy_avatar_1790269807034.jpg"
  },
  {
    id: "bm-2",
    title: "Elden Ring: Shadow of the Erdtree \u2013 First Impressions",
    category: "GAMING",
    type: "VIDEO",
    year: "2024",
    views: "8.7K",
    note: "The atmosphere is insane. Can't wait to explore more areas.",
    image: "/src/assets/images/elden_ring_thumb_1790269858443.jpg"
  },
  {
    id: "bm-3",
    title: "Tanjiro Kamado",
    category: "ANIME",
    type: "CHARACTER",
    year: "2020",
    views: "12.3K",
    note: "Such an inspiring character. His growth throughout the series is incredible.",
    image: "/src/assets/images/tanjiro_bookmark_1790277857472.jpg"
  },
  {
    id: "bm-4",
    title: "Interstellar \u2013 Still a Masterpiece",
    category: "MOVIES",
    type: "VIDEO",
    year: "2014",
    views: "11.2K",
    note: "The soundtrack alone is worth it. A true modern classic.",
    image: "/src/assets/images/interstellar_space_1790270312783.jpg"
  },
  {
    id: "bm-5",
    title: "BTS: The Journey from Debut to Global Icons",
    category: "K-POP",
    type: "ARTICLE",
    year: "2013",
    views: "7.6K",
    note: "Their music helped me through some of my toughest days.",
    image: "/src/assets/images/bts_icons_1790277885253.jpg"
  },
  {
    id: "bm-6",
    title: "Spider-Man: Best Story Arcs of All Time",
    category: "COMICS",
    type: "ARTICLE",
    year: "1962",
    views: "6.8K",
    note: "So many great arcs, but the character development is what makes it special.",
    image: "/src/assets/images/spiderman_comic_1790270342039.jpg"
  },
  {
    id: "bm-7",
    title: "Naruto: The Ultimate Guide to the Series",
    category: "MANGA",
    type: "MANGA",
    year: "1999",
    views: "16.7K",
    note: "Still my favorite manga of all time. The story, characters, everything is perfect.",
    image: "/src/assets/images/naruto_kurama_1790273165067.jpg"
  },
  {
    id: "bm-8",
    title: "Kaneki Ken Cosplay Showcase",
    category: "COSPLAY",
    type: "IMAGE",
    year: "2014",
    views: "5.4K",
    note: "This cosplay is really well done! The attention to detail is amazing.",
    image: "/src/assets/images/kaneki_cosplay_1790277871710.jpg"
  },
  {
    id: "bm-9",
    title: "Jujutsu Kaisen: Season 2 Highlights",
    category: "ANIME",
    type: "VIDEO",
    year: "2023",
    views: "9.1K",
    note: "The animation and fight scenes are next level. Can't wait for Season 3!",
    image: "/src/assets/images/gojo_satoru_1790270284794.jpg"
  },
  {
    id: "bm-10",
    title: "The Legend of Zelda: Breath of the Wild \u2013 A New Kind of Adventure",
    category: "GAMING",
    type: "ARTICLE",
    year: "2017",
    views: "10.4K",
    note: "This game changed how I see open world games. Pure magic.",
    image: "/src/assets/images/zelda_tears_1790273114837.jpg"
  },
  {
    id: "bm-11",
    title: "Stranger Things S5 \u2013 What We Know So Far",
    category: "TV SHOWS",
    type: "VIDEO",
    year: "2025",
    views: "12.8K",
    note: "The anticipation is unreal. This season can't come soon enough!",
    image: "/src/assets/images/stranger_things_thumb_1790269900192.jpg"
  },
  {
    id: "bm-12",
    title: "One Piece Straw Hat Crew Poster",
    category: "MANGA",
    type: "MERCHANDISE",
    year: "2024",
    views: "4.3K",
    note: "This poster looks amazing! Perfect for my room.",
    image: "/src/assets/images/straw_hat_crew_1790277899417.jpg"
  },
  {
    id: "bm-13",
    title: "Attack on Titan: The Final Chapters Breakdown",
    category: "ANIME",
    type: "ARTICLE",
    year: "2023",
    views: "14.5K",
    note: "The philosophical depth of the Rumbling will be analyzed for decades.",
    image: "/src/assets/images/attack_on_titan_final_1790273197403.jpg"
  },
  {
    id: "bm-14",
    title: "Cyberpunk 2077: Phantom Liberty Ending Analysis",
    category: "GAMING",
    type: "VIDEO",
    year: "2023",
    views: "8.9K",
    note: "Songbird vs Reed choice still gives me goosebumps every single playthrough.",
    image: "/src/assets/images/cyberpunk_liberty_1790270202706.jpg"
  },
  {
    id: "bm-15",
    title: "Geralt of Rivia (The White Wolf)",
    category: "GAMING",
    type: "CHARACTER",
    year: "2015",
    views: "15.1K",
    note: "The pinnacle of dark fantasy protagonists. Unforgettable moral dilemmas.",
    image: "/src/assets/images/witcher_geralt_1790270326784.jpg"
  },
  {
    id: "bm-16",
    title: "Dune: Part Two \u2013 Cinematography and Sound Design",
    category: "MOVIES",
    type: "ARTICLE",
    year: "2024",
    views: "11.8K",
    note: "The worm riding sequence in IMAX was a visceral religious experience.",
    image: "/src/assets/images/dune_part_two_1790270217047.jpg"
  },
  {
    id: "bm-17",
    title: "NewJeans: How Y2K Aesthetics Re-invented K-Pop",
    category: "K-POP",
    type: "ARTICLE",
    year: "2023",
    views: "9.4K",
    note: "Clean production, nostalgic melodies, and effortless choreography.",
    image: "/src/assets/images/newjeans_thumb_1790269920672.jpg"
  },
  {
    id: "bm-18",
    title: "Deadpool & Wolverine: Full Easter Egg Guide",
    category: "COMICS",
    type: "VIDEO",
    year: "2024",
    views: "13.2K",
    note: "So many retro Fox Marvel universe cameos I had to pause five times.",
    image: "/src/assets/images/deadpool_wolverine_thumb_1790269881150.jpg"
  },
  {
    id: "bm-19",
    title: "Sung Jin-woo (Shadow Monarch)",
    category: "MANGA",
    type: "CHARACTER",
    year: "2024",
    views: "18.4K",
    note: "The transition from E-rank hunter to commanding the shadow army is peak hype.",
    image: "/src/assets/images/solo_leveling_jinwoo_1790251801155.jpg"
  },
  {
    id: "bm-20",
    title: "The Last of Us: Joel & Ellie Character Journey",
    category: "TV SHOWS",
    type: "ARTICLE",
    year: "2023",
    views: "12.0K",
    note: "Pedro Pascal and Bella Ramsey captured the emotional core with perfection.",
    image: "/src/assets/images/last_of_us_1790273144908.jpg"
  },
  {
    id: "bm-21",
    title: "Black Myth: Wukong Boss Strategies & Lore Secrets",
    category: "GAMING",
    type: "VIDEO",
    year: "2024",
    views: "17.6K",
    note: "The transformation spells and staff stances make combat so fluid and rewarding.",
    image: "/src/assets/images/black_myth_wukong_1790273181489.jpg"
  },
  {
    id: "bm-22",
    title: "Joker (Arthur Fleck) Psychological Study",
    category: "MOVIES",
    type: "CHARACTER",
    year: "2019",
    views: "14.2K",
    note: "Joaquin Phoenix delivers one of the most chilling portrayals in cinema history.",
    image: "/src/assets/images/joker_arthur_1790273130213.jpg"
  },
  {
    id: "bm-23",
    title: "Gojo Satoru Limitless & Six Eyes Deep Dive",
    category: "ANIME",
    type: "ARTICLE",
    year: "2023",
    views: "22.1K",
    note: "The mathematical concept behind the Infinity technique is brilliantly conceived.",
    image: "/src/assets/images/gojo_satoru_1790270284794.jpg"
  },
  {
    id: "bm-24",
    title: "Elden Ring Tarnished Collector Edition Figurine",
    category: "GAMING",
    type: "MERCHANDISE",
    year: "2024",
    views: "6.7K",
    note: "Hand-painted details on the armor and cape look museum grade.",
    image: "/src/assets/images/elden_ring_tarnished_1790180785046.jpg"
  }
];
const SavedBookmarksPage = ({
  onSelectStory,
  onRemoveSavedStory,
  onNavigateHome,
  parentLabel = "Dashboard",
  isLoggedIn = true,
  onOpenAuth
}) => {
  if (!isLoggedIn) {
    return (
      <div className="w-full bg-[#FAF8F5] min-h-[70vh] flex items-center justify-center py-12 px-4 select-none font-sans">
        <div className="max-w-md w-full bg-white rounded-2xl border border-[#EDE4D6] p-8 text-center shadow-xl space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#FFEBE5] text-[#FF5F1F] flex items-center justify-center mx-auto shadow-xs">
            <Bookmark size={32} className="stroke-[2.2]" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-black text-[#171717] tracking-tight font-titan uppercase">
              SIGN IN REQUIRED
            </h2>
            <p className="text-xs sm:text-sm text-[#737373]">
              Bookmarks are private to registered user accounts. Please sign in or create an account to save and view your favorite fandoms.
            </p>
          </div>
          <div className="pt-3 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => onOpenAuth && onOpenAuth("login")}
              className="w-full py-2.5 px-4 bg-[#FF5F1F] hover:bg-[#E04F13] text-white font-extrabold text-xs tracking-wider uppercase rounded-xl transition-all cursor-pointer shadow-sm active:scale-[0.98]"
            >
              Sign In To Access Bookmarks
            </button>
            <button
              type="button"
              onClick={onNavigateHome}
              className="w-full py-2 px-4 text-xs font-bold text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
            >
              Back to Explorer
            </button>
          </div>
        </div>
      </div>
    );
  }

  const [bookmarks, setBookmarks] = useState(INITIAL_BOOKMARKS);
  const [activeFilter, setActiveFilter] = useState("all");
  const [editingItem, setEditingItem] = useState(null);
  const [noteDraft, setNoteDraft] = useState("");
  const [recentlyRemoved, setRecentlyRemoved] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const handleRemoveBookmark = (id) => {
    const itemToRemove = bookmarks.find((b) => b.id === id);
    if (itemToRemove) {
      setRecentlyRemoved(itemToRemove);
      setBookmarks((prev) => prev.filter((b) => b.id !== id));
      if (onRemoveSavedStory) {
        onRemoveSavedStory(id);
      }
    }
  };
  const handleUndoRemove = () => {
    if (recentlyRemoved) {
      setBookmarks((prev) => [recentlyRemoved, ...prev]);
      setRecentlyRemoved(null);
    }
  };
  const handleOpenEditNote = (item) => {
    setEditingItem(item);
    setNoteDraft(item.note);
  };
  const handleSaveNote = () => {
    if (!editingItem) return;
    setBookmarks(
      (prev) => prev.map((b) => b.id === editingItem.id ? { ...b, note: noteDraft.trim() } : b)
    );
    setEditingItem(null);
  };
  const filteredBookmarks = bookmarks.filter((item) => {
    const matchesQuery = !searchQuery.trim() || item.title.toLowerCase().includes(searchQuery.toLowerCase()) || (item.note && item.note.toLowerCase().includes(searchQuery.toLowerCase()));
    if (!matchesQuery) return false;
    if (activeFilter === "all") return true;
    if (activeFilter === "article") return item.type === "ARTICLE" || item.type === "MANGA";
    if (activeFilter === "character") return item.type === "CHARACTER";
    if (activeFilter === "video") return item.type === "VIDEO";
    if (activeFilter === "merchandise") return item.type === "MERCHANDISE" || item.type === "IMAGE";
    return true;
  });
  const getCategoryBadgeColor = (category) => {
    switch (category) {
      case "ANIME":
        return "bg-[#FBCFE8] text-black";
      // Pastel Pink + Black text
      case "GAMING":
        return "bg-[#D8B4FE] text-black";
      // Pastel Lavender/Purple + Black text
      case "MOVIES":
        return "bg-[#FDE68A] text-black";
      // Pastel Amber/Yellow + Black text
      case "K-POP":
        return "bg-[#FBCFE8] text-black";
      // Pastel Pink/Rose + Black text
      case "COMICS":
        return "bg-[#BAE6FD] text-black";
      // Pastel Sky Blue + Black text
      case "MANGA":
        return "bg-[#DDD6FE] text-black";
      // Pastel Violet/Purple + Black text
      case "COSPLAY":
        return "bg-[#FECDD3] text-black";
      // Pastel Salmon/Rose + Black text
      case "TV SHOWS":
        return "bg-[#A7F3D0] text-black";
      // Pastel Mint/Cyan + Black text
      default:
        return "bg-[#E5E7EB] text-black";
    }
  };
  return <div className="w-full bg-[#FAF8F5] min-h-full py-6 px-4 sm:px-6 select-none font-sans">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* PAGE HEADER TITLE */}
        <div className="pt-2 pb-1">
          <h1 className="text-2xl sm:text-3.5xl font-black tracking-tight uppercase font-titan text-[#171717]">
            BOOKMARKS ({filteredBookmarks.length} {filteredBookmarks.length === 1 ? "item" : "items"})
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-[#7A6F64] mt-0.5">
            Your saved content, all in one place.
          </p>
        </div>

        {/* Small Page-specific Search Bar */}
        <div className="max-w-md w-full relative mb-6">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#737373] pointer-events-none">
            <Search size={14} className="text-[#737373]" />
          </span>
          <input
            type="text"
            placeholder="Search bookmarks..."
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
    /* 3. FILTER TABS matching reference tabs */
  }
        <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto pb-2 scrollbar-none mb-7">
          {
    /* Tab 1: All */
  }
          <button
    type="button"
    onClick={() => setActiveFilter("all")}
    className={`text-xs sm:text-sm font-bold px-4 sm:px-5 py-2 rounded-lg sm:rounded-xl transition-all flex items-center justify-center cursor-pointer shadow-2xs ${activeFilter === "all" ? "bg-[#FFA800] text-black font-extrabold shadow-sm" : "bg-white text-[#404040] hover:bg-stone-50 border border-stone-200"}`}
  >
            All
          </button>

          {
    /* Tab 2: Articles */
  }
          <button
    type="button"
    onClick={() => setActiveFilter("article")}
    className={`text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 rounded-lg sm:rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-2xs ${activeFilter === "article" ? "bg-[#FFA800] text-black font-extrabold shadow-sm" : "bg-white text-[#404040] hover:bg-stone-50 border border-stone-200"}`}
  >
            <FileText size={15} className={activeFilter === "article" ? "text-black stroke-[2.4]" : "text-[#737373]"} />
            <span>Articles</span>
          </button>

          {
    /* Tab 3: Characters */
  }
          <button
    type="button"
    onClick={() => setActiveFilter("character")}
    className={`text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 rounded-lg sm:rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-2xs ${activeFilter === "character" ? "bg-[#FFA800] text-black font-extrabold shadow-sm" : "bg-white text-[#404040] hover:bg-stone-50 border border-stone-200"}`}
  >
            <Users size={15} className={activeFilter === "character" ? "text-black stroke-[2.4]" : "text-[#737373]"} />
            <span>Characters</span>
          </button>

          {
    /* Tab 4: Videos */
  }
          <button
    type="button"
    onClick={() => setActiveFilter("video")}
    className={`text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 rounded-lg sm:rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-2xs ${activeFilter === "video" ? "bg-[#FFA800] text-black font-extrabold shadow-sm" : "bg-white text-[#404040] hover:bg-stone-50 border border-stone-200"}`}
  >
            <Film size={15} className={activeFilter === "video" ? "text-black stroke-[2.4]" : "text-[#737373]"} />
            <span>Videos</span>
          </button>

          {
    /* Tab 5: Merchandise */
  }
          <button
    type="button"
    onClick={() => setActiveFilter("merchandise")}
    className={`text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 rounded-lg sm:rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-2xs ${activeFilter === "merchandise" ? "bg-[#FFA800] text-black font-extrabold shadow-sm" : "bg-white text-[#404040] hover:bg-stone-50 border border-stone-200"}`}
  >
            <Tag size={15} className={activeFilter === "merchandise" ? "text-black stroke-[2.4]" : "text-[#737373]"} />
            <span>Merchandise</span>
          </button>
        </div>

        {
    /* 4. UNDO TOAST NOTIFICATION */
  }
        {recentlyRemoved && <div className="mb-6 p-3 bg-[#1A1D24] border border-[#2B2F3D] text-white text-xs rounded-xl flex items-center justify-between shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
            <span>
              Removed <strong>&ldquo;{recentlyRemoved.title}&rdquo;</strong> from your bookmarks.
            </span>
            <button
    type="button"
    onClick={handleUndoRemove}
    className="text-[#FFA800] font-bold hover:underline flex items-center gap-1.5 px-2 py-1 cursor-pointer"
  >
              <Undo2 size={13} />
              <span>Undo</span>
            </button>
          </div>}

        {
    /* 5. 3-COLUMN EXACT CARDS GRID */
  }
        {filteredBookmarks.length === 0 ? <div className="text-center py-20 bg-white rounded-2xl border border-stone-200 p-8">
            <Bookmark size={42} className="mx-auto mb-3 text-stone-400 stroke-1" />
            <h3 className="text-base font-bold text-stone-800">No bookmarks found in this category</h3>
            <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
              You haven&apos;t saved any items under this category yet.
            </p>
            <button
    type="button"
    onClick={() => setActiveFilter("all")}
    className="mt-4 px-4 py-2 bg-[#FFA800] text-black font-bold text-xs rounded-lg hover:brightness-105 transition cursor-pointer"
  >
              View All Bookmarks
            </button>
          </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredBookmarks.map((item) => <div
    key={item.id}
    className="group bg-[#181A20] rounded-xl overflow-hidden border border-[#262832] shadow-md hover:border-[#383D4C] transition-all duration-200 flex flex-col justify-between"
  >
                {
    /* Visual Header Image with Bookmark Button in Top Right */
  }
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
                  <img
    src={item.image}
    alt={item.title}
    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
    loading="lazy"
  />
                  
                  {
    /* Bookmark Button in Top Right with White Ribbon Icon */
  }
                  <button
    type="button"
    onClick={() => handleRemoveBookmark(item.id)}
    className="absolute top-2.5 right-2.5 w-7 h-7 rounded-md bg-black/60 hover:bg-black/85 backdrop-blur-xs flex items-center justify-center text-white transition-all cursor-pointer shadow-xs"
    title="Bookmark saved"
  >
                    <Bookmark size={14} className="stroke-[2.4] text-white" />
                  </button>
                </div>

                {
    /* Card Content Area */
  }
                <div className="p-4 sm:p-4.5 flex-1 flex flex-col justify-between space-y-2.5">
                  {
    /* Row 1: Category Pill (Pink/Purple/Yellow with black text) + Type Pill (Dark with grey text) */
  }
                  <div className="flex items-center justify-between gap-2">
                    <span
    className={`text-[11px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider ${getCategoryBadgeColor(
      item.category
    )}`}
  >
                      {item.category}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-[#262832] text-[#9CA3AF] border border-[#303340]">
                      {item.type}
                    </span>
                  </div>

                  {
    /* Row 2: Title in Bold White Text */
  }
                  <h3 className="font-sans font-bold text-[15px] sm:text-[16px] text-white leading-snug tracking-tight line-clamp-2 min-h-[44px]">
                    {item.title}
                  </h3>

                  {
    /* Row 3: Meta Information (Calendar + Year, Orange Flame + Views) */
  }
                  <div className="flex items-center justify-between text-[12px] text-[#9CA3AF] font-medium pt-0.5">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-[#8E95A5] stroke-[2]" />
                      <span>{item.year}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-semibold text-[#9CA3AF]">
                      <Flame size={14} className="text-[#FF5500] fill-[#FF5500]" />
                      <span>{item.views}</span>
                    </div>
                  </div>

                  {
    /* Row 4: Personal Note Section + Golden Yellow "Edit note" */
  }
                  <div className="pt-2 border-t border-[#232630] space-y-1.5">
                    <div className="flex items-start gap-2 text-[#9CA3AF]">
                      <FileText size={13} className="text-[#8E95A5] mt-0.5 shrink-0 stroke-[2]" />
                      <p className="font-sans text-[12px] text-[#A0A5B5] leading-relaxed line-clamp-2">
                        {item.note}
                      </p>
                    </div>

                    <button
    type="button"
    onClick={() => handleOpenEditNote(item)}
    className="font-sans text-[11px] font-medium text-[#FFA800] hover:text-[#FFB82E] flex items-center gap-1.5 transition-colors cursor-pointer pl-5"
  >
                      <Edit3 size={11} className="stroke-[2.5]" />
                      <span>Edit note</span>
                    </button>
                  </div>

                  {
    /* Row 5: Action Buttons (Solid Yellow View + Bordered Remove bookmark) */
  }
                  <div className="flex items-center gap-2.5 pt-2">
                    {
    /* View Button */
  }
                    <button
    type="button"
    onClick={() => {
      if (onSelectStory) {
        onSelectStory({
          id: item.id,
          title: item.title,
          category: item.category,
          image: item.image,
          year: item.year,
          views: item.views,
          type: item.type
        });
      }
    }}
    className="flex-1 bg-[#FFA800] hover:bg-[#FFB51A] active:scale-[0.98] text-black font-extrabold text-[12px] py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
  >
                      <Eye size={14} className="stroke-[2.5]" />
                      <span>View</span>
                    </button>

                    {
    /* Remove Bookmark Button */
  }
                    <button
    type="button"
    onClick={() => handleRemoveBookmark(item.id)}
    className="flex-1 bg-[#1A1D25] hover:bg-[#232732] active:scale-[0.98] text-[#C5CAD6] hover:text-white border border-[#2F3443] font-medium text-[11px] sm:text-[12px] py-2 px-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer"
  >
                      <Trash2 size={13} className="text-[#8E95A5] stroke-[2]" />
                      <span>Remove bookmark</span>
                    </button>
                  </div>
                </div>
              </div>)}
          </div>}
      </div>

      {
    /* 6. EDIT NOTE INTERACTIVE MODAL */
  }
      {editingItem && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-[#181A20] border border-[#2B2F3D] text-white rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#262832] mb-4">
              <div className="flex items-center gap-2">
                <Edit3 size={16} className="text-[#FFA800]" />
                <h3 className="text-sm sm:text-base font-bold text-white">Edit Personal Note</h3>
              </div>
              <button
    type="button"
    onClick={() => setEditingItem(null)}
    className="text-stone-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
  >
                <X size={18} />
              </button>
            </div>

            <div className="mb-3">
              <span className="text-[11px] text-stone-400 font-semibold block mb-1 truncate">
                Bookmark: <strong className="text-stone-200">{editingItem.title}</strong>
              </span>
              <textarea
    rows={4}
    value={noteDraft}
    onChange={(e) => setNoteDraft(e.target.value)}
    placeholder="Write your personal thoughts, reminder notes, or impressions..."
    className="w-full bg-[#111317] border border-[#303340] rounded-xl p-3 text-xs text-stone-200 focus:outline-none focus:border-[#FFA800] resize-none"
  />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
    type="button"
    onClick={() => setEditingItem(null)}
    className="text-xs text-stone-400 hover:text-white px-3.5 py-2 rounded-lg cursor-pointer"
  >
                Cancel
              </button>
              <button
    type="button"
    onClick={handleSaveNote}
    className="text-xs font-bold px-4 py-2 bg-[#FFA800] hover:bg-[#FFB51A] text-black rounded-lg shadow-sm transition-all cursor-pointer"
  >
                Save Note
              </button>
            </div>
          </div>
        </div>}
    </div>;
};
export {
  INITIAL_BOOKMARKS,
  SavedBookmarksPage
};
