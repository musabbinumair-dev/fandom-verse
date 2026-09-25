import { useState } from "react";
import {
  ChevronRight,
  Star,
  Calendar,
  Bookmark,
  Check,
  X,
  Search
} from "lucide-react";
const CATEGORIES = [
  "All",
  "Anime",
  "Gaming",
  "Movies",
  "TV Shows",
  "K-Pop",
  "Comics",
  "Manga",
  "Cosplay"
];
const ArticlesAndEventsPage = ({
  onNavigateHome,
  onNavigateSubmit,
  onOpenArticle
}) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [bookmarkedIds, setBookmarkedIds] = useState(/* @__PURE__ */ new Set(["lead", "art-1", "art-2", "art-3"]));
  const [toastMessage, setToastMessage] = useState(null);
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const matchesSearch = (texts) => {
    if (!searchQuery.trim()) return true;
    return texts.some(t => t && t.toLowerCase().includes(searchQuery.toLowerCase()));
  };
  const toggleBookmark = (e, id) => {
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
    setTimeout(() => setToastMessage(null), 2200);
  };
  const handleOpenReader = (item) => {
    if (onOpenArticle) {
      onOpenArticle({
        id: item.id || `art_${Date.now()}`,
        title: item.title,
        category: item.category || "Anime",
        year: item.year || "2025",
        rating: "9.6",
        popularity: item.popularity || "10.4K",
        image: item.image,
        videoThumbnail: item.videoThumbnail || item.image,
        backgroundImage: item.backgroundImage || "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&auto=format&fit=crop&q=85",
        type: item.type || "ARTICLE",
        genre: item.genre || item.category,
        desc: item.description || item.excerpt || "Stay updated with the latest articles and exclusive stories from across all fandoms."
      });
    } else {
      setActiveModalItem(item);
    }
  };
  return <div className="w-full bg-[#FAF8F5] min-h-full py-6 px-4 sm:px-6 font-sans select-none text-[#171717]">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* PAGE HEADER TITLE */}
        <div className="pt-2 pb-1">
          <h1 className="text-2xl sm:text-3.5xl font-black tracking-tight uppercase font-titan text-[#171717]">
            FEATURED ARTICLES AND EVENT HIGHLIGHTS
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-[#7A6F64] mt-0.5">
            Stay updated with the latest articles, exclusive stories, and exciting events from across all fandoms.
          </p>
        </div>

        {/* Small Page-specific Search Bar */}
        <div className="max-w-md w-full relative">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#737373] pointer-events-none">
            <Search size={14} className="text-[#737373]" />
          </span>
          <input
            type="text"
            placeholder="Search articles & events..."
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
    /* 3. CATEGORY TABS ROW WITH ACTIVE UNDERLINE */
  }
        <div className="pt-1 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-6 sm:gap-9 overflow-x-auto scrollbar-none">
            {CATEGORIES.map((cat) => {
    const isActive = activeCategory === cat;
    return <button
      key={cat}
      type="button"
      onClick={() => setActiveCategory(cat)}
      className={`pb-2.5 text-xs sm:text-[13px] font-medium transition-all relative whitespace-nowrap cursor-pointer ${isActive ? "text-[#E05315] font-bold" : "text-[#525252] hover:text-[#171717]"}`}
    >
                  <span>{cat}</span>
                  {isActive && <span className="absolute bottom-0 inset-x-0 h-[2px] bg-[#E05315] rounded-full" />}
                </button>;
  })}
          </div>
        </div>

        {
    /* 4. FEATURED ARTICLES SECTION */
  }
        <section className="space-y-3 pt-2">
          {
    /* Section Header: Solid Star icon + FEATURED ARTICLES */
  }
          <div className="flex items-center gap-1.5">
            <h2 className="text-[15px] font-black uppercase tracking-tight font-titan text-[#171717]">
              FEATURED ARTICLES
            </h2>
          </div>

          {
    /* 2-Column Grid: Left Large Lead Dark Card | Right 3 Stacked Cards */
  }
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {
    /* LEFT 6 COLUMNS: LARGE LEAD ARTICLE (DARK THEMED) */
  }
            <div className="lg:col-span-6 bg-[#161922] rounded-[16px] border border-[#2B2F3D] overflow-hidden shadow-sm flex flex-col justify-between text-white relative">
              {
    /* Lead Image with Inset Badge: ANIME and Bookmark */
  }
              <div className="relative aspect-[16/10.5] w-full overflow-hidden bg-black group">
                <img
    src="/src/assets/images/aetheria_wanderer_1790282784893.jpg"
    alt="The Skyward Isles"
    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
  />

                {
    /* Top-Left Category Badge: ANIME */
  }
                <div className="absolute top-3 left-3">
                  <span className="bg-[#EDE9FE] text-[#6B21A8] text-[9.5px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                    ANIME
                  </span>
                </div>

                {
    /* Top-Right Bookmark Button */
  }
                <button
    type="button"
    onClick={(e) => toggleBookmark(e, "lead")}
    className="absolute top-3 right-3 p-1 text-white hover:text-[#FFA800] transition-colors cursor-pointer"
    title="Bookmark"
  >
                  <Bookmark
    size={16}
    className={bookmarkedIds.has("lead") ? "fill-[#FFA800] text-[#FFA800]" : "text-white stroke-[2.2]"}
  />
                </button>
              </div>

              {
    /* Lead Body Content inside Dark Card */
  }
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h3 className="text-lg sm:text-[20px] font-bold text-white leading-snug">
                    The Skyward Isles: A New Frontier Awaits
                  </h3>

                  <div className="flex items-center gap-1.5 text-[11px] text-[#9CA3AF] font-medium">
                    <Calendar size={12} />
                    <span>May 16, 2025</span>
                  </div>

                  <p className="text-[12px] text-[#A1A1AA] leading-relaxed font-normal pt-1">
                    A breathtaking new region, compelling characters, and hidden secrets — The Skyward Isles is set to take fans on an unforgettable journey.
                  </p>
                </div>

                <div className="pt-2">
                  <button
    type="button"
    onClick={() => handleOpenReader({
      title: "The Skyward Isles: A New Frontier Awaits",
      category: "ANIME",
      categoryBg: "bg-[#EDE9FE] text-[#6B21A8]",
      image: "/src/assets/images/aetheria_wanderer_1790282784893.jpg",
      date: "May 16, 2025",
      description: "A breathtaking new region, compelling characters, and hidden secrets \u2014 The Skyward Isles is set to take fans on an unforgettable journey. Across floating skylands powered by ancient glowing crystal spires, adventurers can master glider air-currents and unravel the ancient lore of Aetheria."
    })}
    className="inline-flex items-center gap-1.5 bg-[#EDE9FE] hover:bg-[#DDD6FE] text-[#5B21B6] font-extrabold text-[12px] py-1.5 px-3 rounded-[8px] shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
  >
                    <span>Read article</span>
                    <span className="text-sm leading-none">&rarr;</span>
                  </button>
                </div>
              </div>
            </div>

            {
    /* RIGHT 6 COLUMNS: 3 STACKED SMALLER ARTICLE CARDS */
  }
            <div className="lg:col-span-6 flex flex-col justify-between gap-3">
              {
    /* 1. BEYOND THE HORIZON: THE RISE OF SOLARIS (GAMING) */
  }
              <div
    onClick={() => handleOpenReader({
      title: "Beyond the Horizon: The Rise of Solaris",
      category: "GAMING",
      categoryBg: "bg-[#E0F2FE] text-[#0369A1]",
      image: "/src/assets/images/solaris_rise_sunset_1790283958868.jpg",
      date: "May 14, 2025",
      description: "Studio Lumina reveals their next animated epic. Follow an aspiring cartographer who dreams of charting the forgotten floating continents at the edge of the known stratosphere."
    })}
    className="bg-white rounded-[12px] border border-[#E5E7EB] p-3 flex gap-3.5 items-center shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:border-stone-300 transition-all cursor-pointer group relative flex-1"
  >
                <div className="w-[145px] sm:w-[160px] aspect-[16/10] rounded-[8px] overflow-hidden shrink-0 bg-stone-900">
                  <img
    src="/src/assets/images/solaris_rise_sunset_1790283958868.jpg"
    alt="Beyond the Horizon"
    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between h-full py-0.5">
                  <div className="space-y-1">
                    <div>
                      <span className="bg-[#E0F2FE] text-[#0369A1] text-[8.5px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider inline-block">
                        GAMING
                      </span>
                    </div>

                    <h4 className="font-bold text-[12.5px] sm:text-[13px] text-[#171717] leading-snug line-clamp-2 group-hover:text-[#FFA800] transition-colors">
                      Beyond the Horizon: The Rise of Solaris
                    </h4>
                  </div>

                  <div className="flex items-center text-[10.5px] text-[#737373] mt-2">
                    <span className="flex items-center gap-1 font-medium">
                      <Calendar size={11} />
                      May 14, 2025
                    </span>
                  </div>
                </div>

                <button
    type="button"
    onClick={(e) => toggleBookmark(e, "art-1")}
    className="absolute top-3 right-3 text-[#A3A3A3] hover:text-black p-0.5 cursor-pointer"
    title="Bookmark"
  >
                  <Bookmark
    size={14}
    className={bookmarkedIds.has("art-1") ? "fill-[#FFA800] text-[#FFA800]" : "stroke-[1.8]"}
  />
                </button>
              </div>

              {
    /* 2. THE MIDNIGHT SIGNAL: A NEW KIND OF THRILLER (MOVIES) */
  }
              <div
    onClick={() => handleOpenReader({
      title: "The Midnight Signal: A New Kind of Thriller",
      category: "MOVIES",
      categoryBg: "bg-[#FFE4E6] text-[#BE123C]",
      image: "/src/assets/images/kairo_hale_1790281602183.jpg",
      date: "May 12, 2025",
      description: "A lonely radio operator intercepts a mysterious frequency transmitting events minutes before they happen in real life. A tense, claustrophobic psychological neo-noir thriller."
    })}
    className="bg-white rounded-[12px] border border-[#E5E7EB] p-3 flex gap-3.5 items-center shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:border-stone-300 transition-all cursor-pointer group relative flex-1"
  >
                <div className="w-[145px] sm:w-[160px] aspect-[16/10] rounded-[8px] overflow-hidden shrink-0 bg-stone-900">
                  <img
    src="/src/assets/images/kairo_hale_1790281602183.jpg"
    alt="The Midnight Signal"
    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between h-full py-0.5">
                  <div className="space-y-1">
                    <div>
                      <span className="bg-[#FFE4E6] text-[#BE123C] text-[8.5px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider inline-block">
                        MOVIES
                      </span>
                    </div>

                    <h4 className="font-bold text-[12.5px] sm:text-[13px] text-[#171717] leading-snug line-clamp-2 group-hover:text-[#FFA800] transition-colors">
                      The Midnight Signal: A New Kind of Thriller
                    </h4>
                  </div>

                  <div className="flex items-center text-[10.5px] text-[#737373] mt-2">
                    <span className="flex items-center gap-1 font-medium">
                      <Calendar size={11} />
                      May 12, 2025
                    </span>
                  </div>
                </div>

                <button
    type="button"
    onClick={(e) => toggleBookmark(e, "art-2")}
    className="absolute top-3 right-3 text-[#A3A3A3] hover:text-black p-0.5 cursor-pointer"
    title="Bookmark"
  >
                  <Bookmark
    size={14}
    className={bookmarkedIds.has("art-2") ? "fill-[#FFA800] text-[#FFA800]" : "stroke-[1.8]"}
  />
                </button>
              </div>

              {
    /* 3. LUMIERE: THE DEBUT THAT BROKE THE STAGE (K-POP) */
  }
              <div
    onClick={() => handleOpenReader({
      title: "Lumiere: The Debut That Broke the Stage",
      category: "K-POP",
      categoryBg: "bg-[#F3E8FF] text-[#7E22CE]",
      image: "/src/assets/images/lumiere_stage_debut_1790283998932.jpg",
      date: "May 10, 2025",
      description: "With groundbreaking synth-wave choreography and synchronized holographic stages, rookie sensation Lumiere shattered debut streaming records across thirty countries."
    })}
    className="bg-white rounded-[12px] border border-[#E5E7EB] p-3 flex gap-3.5 items-center shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:border-stone-300 transition-all cursor-pointer group relative flex-1"
  >
                <div className="w-[145px] sm:w-[160px] aspect-[16/10] rounded-[8px] overflow-hidden shrink-0 bg-stone-900">
                  <img
    src="/src/assets/images/lumiere_stage_debut_1790283998932.jpg"
    alt="Lumiere"
    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between h-full py-0.5">
                  <div className="space-y-1">
                    <div>
                      <span className="bg-[#F3E8FF] text-[#7E22CE] text-[8.5px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider inline-block">
                        K-POP
                      </span>
                    </div>

                    <h4 className="font-bold text-[12.5px] sm:text-[13px] text-[#171717] leading-snug line-clamp-2 group-hover:text-[#FFA800] transition-colors">
                      Lumiere: The Debut That Broke the Stage
                    </h4>
                  </div>

                  <div className="flex items-center text-[10.5px] text-[#737373] mt-2">
                    <span className="flex items-center gap-1 font-medium">
                      <Calendar size={11} />
                      May 10, 2025
                    </span>
                  </div>
                </div>

                <button
    type="button"
    onClick={(e) => toggleBookmark(e, "art-3")}
    className="absolute top-3 right-3 text-[#A3A3A3] hover:text-black p-0.5 cursor-pointer"
    title="Bookmark"
  >
                  <Bookmark
    size={14}
    className={bookmarkedIds.has("art-3") ? "fill-[#FFA800] text-[#FFA800]" : "stroke-[1.8]"}
  />
                </button>
              </div>
            </div>
          </div>
        </section>

        {
    /* 5. EVENT HIGHLIGHTS SECTION (EXACT 3 WIDE HORIZONTAL ALTERNATING CARDS WITH FLOATING DATE BADGES) */
  }
        <section className="space-y-3.5 pt-6 pb-2">
          {
    /* Header: Calendar Icon + EVENT HIGHLIGHTS */
  }
          <div className="flex items-center gap-2">
            <h2 className="text-[16px] font-black uppercase tracking-tight font-titan text-[#171717]">
              EVENT HIGHLIGHTS
            </h2>
          </div>

          <div className="space-y-4">
            {
    /* EVENT 1: EMBERFALL COMIIC & ART CON (IMAGE ON LEFT, CONTENT ON RIGHT) */
  }
            <div className="bg-[#F6F8FC] rounded-[16px] border border-[#E2E8F0] p-3 sm:p-4 flex flex-col md:flex-row items-center gap-4 sm:gap-6 shadow-xs hover:border-stone-300 transition-all">
              {
    /* Left Image with Floating Dark Navy Date Badge */
  }
              <div className="w-full md:w-[46%] aspect-[16/9.5] rounded-[12px] overflow-hidden relative shadow-2xs shrink-0 bg-stone-900">
                <img
    src="/src/assets/images/emberfall_con_expo_1790285333899.jpg"
    alt="Emberfall Comiic & Art Con"
    className="w-full h-full object-cover"
  />

                {
    /* Floating Dark Date Badge: May 17 */
  }
                <div className="absolute top-2.5 left-2.5 bg-[#1E293B] text-white rounded-[7px] px-2.5 py-1 text-center shadow-md flex flex-col items-center">
                  <span className="text-[9.5px] font-semibold text-slate-300 leading-tight">May</span>
                  <span className="text-base font-black text-white leading-none">17</span>
                </div>
              </div>

              {
    /* Right Content */
  }
              <div className="flex-1 min-w-0 space-y-1.5 py-1">
                <div>
                  <span className="bg-[#F3E8FF] text-[#7E22CE] text-[9.5px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block">
                    Convention
                  </span>
                </div>
                <h3 className="font-bold text-base sm:text-[17px] text-[#171717] leading-tight">
                  Emberfall Comiic & Art Con
                </h3>
                <p className="text-xs sm:text-[12.5px] text-[#525252] leading-relaxed">
                  Creators, artists, and fans from across the region are coming together for a weekend of panels, workshops, cosplay, and exclusive reveals.
                </p>
              </div>
            </div>

            {
    /* EVENT 2: VELVET SKY PREMIERE (CONTENT ON LEFT, IMAGE ON RIGHT) */
  }
            <div className="bg-[#F6F8FC] rounded-[16px] border border-[#E2E8F0] p-3 sm:p-4 flex flex-col-reverse md:flex-row items-center gap-4 sm:gap-6 shadow-xs hover:border-stone-300 transition-all">
              {
    /* Left Content */
  }
              <div className="flex-1 min-w-0 space-y-1.5 py-1">
                <div>
                  <span className="bg-[#CCFBF1] text-[#0F766E] text-[9.5px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block">
                    Premiere
                  </span>
                </div>
                <h3 className="font-bold text-base sm:text-[17px] text-[#171717] leading-tight">
                  Velvet Sky Premiere
                </h3>
                <p className="text-xs sm:text-[12.5px] text-[#525252] leading-relaxed">
                  The long-awaited sci-fi film, Velvet Sky, finally hits theaters this weekend. With stunning visuals and a captivating story, it's already being called a new classic.
                </p>
              </div>

              {
    /* Right Image with Floating Dark Navy Date Badge */
  }
              <div className="w-full md:w-[46%] aspect-[16/9.5] rounded-[12px] overflow-hidden relative shadow-2xs shrink-0 bg-stone-900">
                <img
    src="/src/assets/images/velvet_sky_premiere_1790282805907.jpg"
    alt="Velvet Sky Premiere"
    className="w-full h-full object-cover"
  />

                {
    /* Floating Dark Date Badge: May 12 on top-right */
  }
                <div className="absolute top-2.5 right-2.5 bg-[#1E293B] text-white rounded-[7px] px-2.5 py-1 text-center shadow-md flex flex-col items-center">
                  <span className="text-[9.5px] font-semibold text-slate-300 leading-tight">May</span>
                  <span className="text-base font-black text-white leading-none">12</span>
                </div>
              </div>
            </div>

            {
    /* EVENT 3: WHISPERS OF THE HOLLOW (IMAGE ON LEFT, CONTENT ON RIGHT) */
  }
            <div className="bg-[#F6F8FC] rounded-[16px] border border-[#E2E8F0] p-3 sm:p-4 flex flex-col md:flex-row items-center gap-4 sm:gap-6 shadow-xs hover:border-stone-300 transition-all">
              {
    /* Left Image with Floating Dark Navy Date Badge */
  }
              <div className="w-full md:w-[46%] aspect-[16/9.5] rounded-[12px] overflow-hidden relative shadow-2xs shrink-0 bg-stone-900">
                <img
    src="/src/assets/images/whispers_cinema_screen_1790285352250.jpg"
    alt="Whispers of the Hollow"
    className="w-full h-full object-cover"
  />

                {
    /* Floating Dark Date Badge: May 08 */
  }
                <div className="absolute top-2.5 left-2.5 bg-[#1E293B] text-white rounded-[7px] px-2.5 py-1 text-center shadow-md flex flex-col items-center">
                  <span className="text-[9.5px] font-semibold text-slate-300 leading-tight">May</span>
                  <span className="text-base font-black text-white leading-none">08</span>
                </div>
              </div>

              {
    /* Right Content */
  }
              <div className="flex-1 min-w-0 space-y-1.5 py-1">
                <div>
                  <span className="bg-[#E0F2FE] text-[#0284C7] text-[9.5px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block">
                    Release
                  </span>
                </div>
                <h3 className="font-bold text-base sm:text-[17px] text-[#171717] leading-tight">
                  Whispers of the Hollow
                </h3>
                <p className="text-xs sm:text-[12.5px] text-[#525252] leading-relaxed">
                  The newest chapter in the Echoes series is out now. Dive back into a world of mystery, adventure, and unforgettable characters.
                </p>
              </div>
            </div>
          </div>
        </section>

        {
    /* 6. BOTTOM BANNER: SUBMIT YOUR FAN CONTENT (WITH PURPLE SUBMIT BUTTON) */
  }
        <section className="pt-2 pb-6">
          <div className="relative rounded-[16px] overflow-hidden border border-[#E2E8F0] bg-gradient-to-r from-[#FAF8F5] via-[#EFF6FF] to-transparent shadow-xs flex flex-col sm:flex-row items-center justify-between p-4 sm:p-5 min-h-[96px]">
            {
    /* Background panoramic artwork */
  }
            <div className="absolute inset-y-0 right-0 w-2/3 sm:w-1/2 overflow-hidden pointer-events-none opacity-85">
              <img
    src="/src/assets/images/fan_content_banner_art_1790284032615.jpg"
    alt="Banner Illustration"
    className="w-full h-full object-cover object-right"
  />
              <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-[#EFF6FF]/80 to-transparent" />
            </div>

            {
    /* Left Content */
  }
            <div className="relative z-10 flex items-center gap-3">
              <div>
                <h3 className="text-sm sm:text-[15px] font-black uppercase tracking-tight font-titan text-[#171717]">
                  Submit your fan content
                </h3>
                <p className="text-[11.5px] text-[#737373] font-medium">
                  Share your articles, artwork, and stories with the community.
                </p>
              </div>
            </div>

            {
    /* Right Action Button (Purple button as shown in the screenshot) */
  }
            <div className="relative z-10 pt-3 sm:pt-0">
              <button
    type="button"
    onClick={onNavigateSubmit}
    className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-extrabold text-[12px] py-2 px-4 rounded-[8px] shadow-xs transition-all active:scale-[0.98] cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap"
  >
                <span>Submit content</span>
                <span className="text-sm leading-none">&rarr;</span>
              </button>
            </div>
          </div>
        </section>
      </div>

      {
    /* TOAST NOTIFICATION */
  }
      {toastMessage && <div className="fixed bottom-6 right-6 z-50 bg-[#1A1D24] border border-[#2B2F3D] text-white text-xs px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <Check size={14} className="text-[#FFA800]" />
          <span>{toastMessage}</span>
        </div>}

      {
    /* ARTICLE READER MODAL */
  }
      {activeModalItem && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-[#181A20] border border-[#2B2F3D] text-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150">
            {activeModalItem.image && <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
                <img
    src={activeModalItem.image}
    alt={activeModalItem.title}
    className="w-full h-full object-cover brightness-[0.88]"
  />
                <button
    type="button"
    onClick={() => setActiveModalItem(null)}
    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
  >
                  <X size={16} />
                </button>
                {activeModalItem.category && <div className="absolute bottom-3 left-4">
                    <span className={`text-[10px] font-black px-3 py-1 rounded uppercase ${activeModalItem.categoryBg || "bg-[#FFA800] text-black"}`}>
                      {activeModalItem.category}
                    </span>
                  </div>}
              </div>}

            <div className="p-5 space-y-3 max-h-[360px] overflow-y-auto">
              {activeModalItem.date && <span className="text-xs text-[#8E95A5] flex items-center gap-1 font-medium">
                  <Calendar size={13} />
                  {activeModalItem.date}
                </span>}
              <h2 className="text-lg sm:text-xl font-black text-white leading-tight">
                {activeModalItem.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#C5CAD6] leading-relaxed">
                {activeModalItem.description}
              </p>
            </div>

            <div className="bg-[#121418] border-t border-[#262A36] px-5 py-3 flex items-center justify-between">
              <span className="text-[11px] text-[#8E95A5]">Official FandomVerse Chronicle</span>
              <button
    type="button"
    onClick={() => setActiveModalItem(null)}
    className="px-4 py-1.5 bg-[#FFA800] hover:bg-[#FFB51A] text-black font-extrabold text-xs rounded-lg transition-colors cursor-pointer"
  >
                Close
              </button>
            </div>
          </div>
        </div>}
    </div>;
};
export {
  ArticlesAndEventsPage
};
