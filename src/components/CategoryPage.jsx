import { useState } from "react";
import { User, ChevronDown } from "lucide-react";

const ANIME_CATEGORY_ITEMS = [
  {
    id: "anime-1",
    title: "Youkoso Jitsuryoku",
    category: "ANIME",
    type: "TV Series",
    year: "2025",
    genre: "Drama",
    image: "/src/assets/images/mafuyu_anime_art_1790180850935.jpg",
    backgroundImage: "/src/assets/images/mafuyu_anime_art_1790180850935.jpg",
    desc: "Students at an elite high school navigate psychological battles and complex ranking hierarchies."
  },
  {
    id: "anime-2",
    title: "Youkoso Jitsuryoku",
    category: "ANIME",
    type: "TV Series",
    year: "2024",
    genre: "Action",
    image: "/src/assets/images/luffy_sea_dream_1790274895834.jpg",
    backgroundImage: "/src/assets/images/luffy_sea_dream_1790274895834.jpg",
    desc: "A grand pirating adventure to discover the world's greatest treasure."
  },
  {
    id: "anime-3",
    title: "Youkoso Jitsuryoku",
    category: "ANIME",
    type: "Movie",
    year: "2024",
    genre: "Action",
    image: "/src/assets/images/kael_vex_1790281397401.jpg",
    backgroundImage: "/src/assets/images/kael_vex_1790281397401.jpg",
    desc: "A legendary warrior ascends through dangerous shadow dungeons to protect humanity."
  },
  {
    id: "anime-4",
    title: "Skyward Bloom",
    category: "ANIME",
    type: "TV Series",
    year: "2025",
    genre: "Fantasy",
    image: "/src/assets/images/aetheria_wanderer_1790282784893.jpg",
    backgroundImage: "/src/assets/images/aetheria_wanderer_1790282784893.jpg",
    desc: "A young adventurer discovers a floating citadel beyond the clouds."
  },
  {
    id: "anime-5",
    title: "Raven's Oath",
    category: "ANIME",
    type: "Movie",
    year: "2024",
    genre: "Action",
    image: "/src/assets/images/sora_hayashi_1790281509190.jpg",
    backgroundImage: "/src/assets/images/sora_hayashi_1790281509190.jpg",
    desc: "A dark knight seeks redemption in a realm gripped by nocturnal beasts."
  },
  {
    id: "anime-6",
    title: "Neon Requiem",
    category: "ANIME",
    type: "Movie",
    year: "2023",
    genre: "Sci-Fi",
    image: "/src/assets/images/cyberpunk_2077_art_1790255907017.jpg",
    backgroundImage: "/src/assets/images/cyberpunk_liberty_1790270202706.jpg",
    desc: "High-octane cybernetic combat in a glowing futuristic metropolis."
  }
];

const CategoryPage = ({
  categoryName = "ANIME",
  categoryDesc = "Explore a world of amazing stories, unique characters, and breathtaking animation.",
  onOpenArticle,
  onOpenAuth,
  isLoggedIn = false
}) => {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortBy, setSortBy] = useState("Latest");

  const filteredItems = ANIME_CATEGORY_ITEMS.filter((item) => {
    const matchesGenre = selectedGenre === "All" || item.genre.toLowerCase() === selectedGenre.toLowerCase();
    return matchesGenre;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "Latest") return b.year.localeCompare(a.year);
    if (sortBy === "A-Z") return a.title.localeCompare(b.title);
    return 0;
  });

  return (
    <div className="w-full bg-[#FAF8F5] min-h-full font-baloo select-none pb-16 text-[#171717]">
      {/* 1. HERO CATEGORY BANNER (Scrollable with page) */}
      <div className="w-full overflow-hidden border-b border-[#EAE2D8] bg-stone-900 shadow-sm">
        {/* Background Illustration Banner */}
        <div className="relative w-full h-[200px] sm:h-[240px] overflow-hidden">
          <img
            src="/src/assets/images/aetheria_wanderer_1790282784893.jpg"
            alt={categoryName}
            className="w-full h-full object-cover object-center brightness-[0.85] contrast-[1.05]"
          />
          {/* Soft gradient mask overlay on the left for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent sm:w-3/4" />

          {/* Banner Text Content */}
          <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 max-w-4xl text-white z-10">
            {/* Category Pill Tag */}
            <div>
              <span className="bg-[#FFEBE5] text-[#FF5F1F] text-[10px] font-black tracking-widest px-3 py-1 rounded-full uppercase shadow-xs inline-block">
                {categoryName.toUpperCase()}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase font-titan mt-2 mb-1 text-white drop-shadow-md">
              {categoryName.toUpperCase()}
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm font-semibold text-stone-200 leading-relaxed max-w-xl drop-shadow-xs line-clamp-2">
              {categoryDesc}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-6">

        {/* 2. FILTER BAR */}
        <div className="bg-white rounded-[16px] border border-[#EBE6DD] p-3.5 sm:p-4 shadow-2xs flex flex-wrap items-center justify-between gap-4">
          {/* Genre Dropdown */}
          <div className="flex flex-col gap-1 w-[180px] sm:w-[220px]">
            <label className="text-[11px] font-bold text-[#7A6F64] uppercase tracking-wider pl-0.5">
              Genre
            </label>
            <div className="relative">
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="w-full text-xs font-bold px-3.5 py-2.5 rounded-lg border border-[#EDE4D6] bg-[#FAF9F5] text-[#171717] appearance-none focus:outline-none focus:border-[#FF5F1F] cursor-pointer shadow-2xs pr-8"
              >
                <option value="All">All Genres</option>
                <option value="Action">Action</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Romance">Romance</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Slice of Life">Slice of Life</option>
                <option value="Drama">Drama</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-3 text-[#7A6F64] pointer-events-none" />
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="flex flex-col gap-1 w-[180px] sm:w-[220px]">
            <label className="text-[11px] font-bold text-[#7A6F64] uppercase tracking-wider pl-0.5">
              Sort
            </label>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full text-xs font-bold px-3.5 py-2.5 rounded-lg border border-[#EDE4D6] bg-[#FAF9F5] text-[#171717] appearance-none focus:outline-none focus:border-[#FF5F1F] cursor-pointer shadow-2xs pr-8"
              >
                <option value="Latest">Latest</option>
                <option value="A-Z">Title (A-Z)</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-3 text-[#7A6F64] pointer-events-none" />
            </div>
          </div>
        </div>

        {/* 3. SECTION HEADER ("NEW RELEASE" & "SEE MORE") */}
        <div className="flex items-center justify-between pt-2">
          <h2 className="text-lg sm:text-xl font-black tracking-wider uppercase text-[#171717] font-sans">
            NEW RELEASE
          </h2>
          <button
            type="button"
            className="text-xs font-black uppercase tracking-wider text-[#FF5F1F] hover:underline cursor-pointer"
          >
            SEE MORE
          </button>
        </div>

        {/* 4. SQUARE CATEGORY CARDS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 sm:gap-6">
          {sortedItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onOpenArticle && onOpenArticle(item)}
              className="group cursor-pointer flex flex-col"
            >
              {/* Square Aspect Ratio Poster Container */}
              <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-stone-900 border border-[#EBE6DD] shadow-xs">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ease-out"
                  loading="lazy"
                />
              </div>

              {/* Title Directly Below Image */}
              <h3 className="mt-2.5 font-bold text-xs sm:text-sm text-[#171717] tracking-tight leading-snug line-clamp-1 group-hover:text-[#FF5F1F] transition-colors text-left">
                {item.title}
              </h3>
            </div>
          ))}
        </div>

        {/* 5. SIGN UP CTA BANNER AT BOTTOM (ONLY FOR GUEST USERS) */}
        {!isLoggedIn && (
          <div className="mt-12 relative rounded-[20px] overflow-hidden border border-[#EBE6DD] bg-[#FAF8F5] shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Background Illustration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-85">
              <img
                src="/src/assets/images/aetheria_wanderer_1790282784893.jpg"
                alt="Sign Up Background"
                className="w-full h-full object-cover object-bottom brightness-[0.95]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/90 to-transparent sm:w-2/3" />
            </div>

            {/* Left Text & Icon */}
            <div className="relative z-10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/90 border border-[#EBE6DD] flex items-center justify-center text-[#171717] shrink-0 shadow-sm">
                <User size={24} className="stroke-[2.2]" />
              </div>

              <div>
                <h2 className="text-lg sm:text-xl font-bold text-[#171717] leading-tight font-baloo">
                  Sign up to unlock bookmarks,
                </h2>
                <h2 className="text-lg sm:text-xl font-bold text-[#171717] leading-tight font-baloo">
                  ratings, and more
                </h2>
              </div>
            </div>

            {/* Right Action Button */}
            <div className="relative z-10 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => onOpenAuth && onOpenAuth("register")}
                className="w-full sm:w-auto bg-[#FF451A] hover:bg-[#E0340A] text-white font-black text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Register</span>
                <span className="text-sm font-bold">&rarr;</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export { CategoryPage };
