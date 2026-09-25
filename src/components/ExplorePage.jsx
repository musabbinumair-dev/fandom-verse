import { useState } from "react";
import {
  Search,
  RotateCcw,
  Calendar,
  Flame,
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  RefreshCw,
  Gamepad2,
  Film,
  Tv,
  Music,
  BookOpen,
  Book,
  Sparkles
} from "lucide-react";
const ExplorePage = ({ onOpenArticle, isLoggedIn = true }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedPopularity, setSelectedPopularity] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [sortBy, setSortBy] = useState("Latest");
  const [visibleCount, setVisibleCount] = useState(10);
  const [savedIds, setSavedIds] = useState(/* @__PURE__ */ new Set(["c-1", "c-4"]));
  const [contentCards, setContentCards] = useState([
    {
      id: "c-1",
      title: "One Piece: Egghead Arc Breakdown",
      category: "Anime",
      badgeColor: "bg-blue-600",
      type: "ARTICLE",
      year: "2025",
      popularity: "9.2K",
      image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1000&auto=format&fit=crop&q=80",
      videoThumbnail: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1000&auto=format&fit=crop&q=80",
      backgroundImage: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&auto=format&fit=crop&q=85",
      genre: "Action",
      desc: "Deep breakdown of Egghead Island climax, Vegapunk revelations, and Gear 5 Luffy fights."
    },
    {
      id: "c-2",
      title: "Elden Ring: Shadow of the Erdtree - First Impressions",
      category: "Gaming",
      badgeColor: "bg-violet-600",
      type: "VIDEO",
      year: "2024",
      popularity: "8.7K",
      image: "https://images.unsplash.com/photo-1563089145-599997674d42?w=1000&auto=format&fit=crop&q=80",
      videoThumbnail: "https://images.unsplash.com/photo-1563089145-599997674d42?w=1000&auto=format&fit=crop&q=80",
      backgroundImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&auto=format&fit=crop&q=85",
      genre: "Fantasy",
      desc: "Our first hands-on impressions of Land of Shadow, new legacy dungeons, and grueling boss fights."
    },
    {
      id: "c-3",
      title: "Dune: Part Two - A Visual Masterpiece",
      category: "Movies",
      badgeColor: "bg-rose-600",
      type: "ARTICLE",
      year: "2024",
      popularity: "7.5K",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1000&auto=format&fit=crop&q=80",
      videoThumbnail: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1000&auto=format&fit=crop&q=80",
      backgroundImage: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1920&auto=format&fit=crop&q=85",
      genre: "Sci-Fi",
      desc: "Cinematography breakdown of Denis Villeneuve’s epic sequel, sandstorms, and worm-riding effects."
    },
    {
      id: "c-4",
      title: "Stranger Things S5 - What We Know So Far",
      category: "TV Shows",
      badgeColor: "bg-purple-600",
      type: "VIDEO",
      year: "2025",
      popularity: "12.3K",
      image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1000&auto=format&fit=crop&q=80",
      videoThumbnail: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1000&auto=format&fit=crop&q=80",
      backgroundImage: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1920&auto=format&fit=crop&q=85",
      genre: "Thriller",
      desc: "The final showdown in Hawkins. Cast announcements, release windows, and Upside Down theories."
    },
    {
      id: "c-5",
      title: "IVE's New Comeback Teaser Breaks Records",
      category: "K-Pop",
      badgeColor: "bg-emerald-600",
      type: "ARTICLE",
      year: "2025",
      popularity: "10.1K",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1000&auto=format&fit=crop&q=80",
      videoThumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1000&auto=format&fit=crop&q=80",
      backgroundImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1920&auto=format&fit=crop&q=85",
      genre: "Music",
      desc: "Analyzing the record-breaking teaser statistics and conceptual visuals of IVE’s upcoming album."
    },
    {
      id: "c-6",
      title: "Zoro's Greatest Fights Ranked",
      category: "Anime",
      badgeColor: "bg-blue-600",
      type: "VIDEO",
      year: "2024",
      popularity: "6.8K",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80",
      videoThumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80",
      backgroundImage: "https://images.unsplash.com/photo-1563089145-599997674d42?w=1920&auto=format&fit=crop&q=85",
      genre: "Action",
      desc: "From Mihawk to King, ranking Roronoa Zoro’s most legendary three-sword style duels."
    },
    {
      id: "c-7",
      title: "Final Fantasy 7 Rebirth: What Makes It Special",
      category: "Gaming",
      badgeColor: "bg-violet-600",
      type: "ARTICLE",
      year: "2024",
      popularity: "5.6K",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1000&auto=format&fit=crop&q=80",
      videoThumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1000&auto=format&fit=crop&q=80",
      backgroundImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&auto=format&fit=crop&q=85",
      genre: "Fantasy",
      desc: "Cloud Strife’s open-world adventure analyzed. Minigames, combat depth, and story modifications."
    },
    {
      id: "c-8",
      title: "Spider-Man: Across the Spider-Verse - A Deeper Look",
      category: "Movies",
      badgeColor: "bg-rose-600",
      type: "VIDEO",
      year: "2023",
      popularity: "11.9K",
      image: "https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?w=1000&auto=format&fit=crop&q=80",
      videoThumbnail: "https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?w=1000&auto=format&fit=crop&q=80",
      backgroundImage: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&auto=format&fit=crop&q=85",
      genre: "Sci-Fi",
      desc: "Breaking down the diverse animation styles, cameos, and tragic backstories of Miles Morales."
    },
    {
      id: "c-9",
      title: "Attack on Titan - Final Season Explained",
      category: "TV Shows",
      badgeColor: "bg-purple-600",
      type: "ARTICLE",
      year: "2023",
      popularity: "14.2K",
      image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1000&auto=format&fit=crop&q=80",
      videoThumbnail: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1000&auto=format&fit=crop&q=80",
      backgroundImage: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1920&auto=format&fit=crop&q=85",
      genre: "Action",
      desc: "The complex moral dilemma of Eren Yeager, the Rumbling, and the final emotional sacrifice explained."
    },
    {
      id: "c-10",
      title: "Naruto: The Ultimate Guide to the Series",
      category: "Manga",
      badgeColor: "bg-amber-600",
      type: "IMAGE",
      year: "2020",
      popularity: "18.7K",
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1000&auto=format&fit=crop&q=80",
      videoThumbnail: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1000&auto=format&fit=crop&q=80",
      backgroundImage: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&auto=format&fit=crop&q=85",
      genre: "Fantasy",
      desc: "The complete reading and watch guide for Naruto Uzumaki’s journey from outcast to Hokage."
    },
    // Extra cards for pagination "LOAD MORE"
    {
      id: "c-11",
      title: "Cyberpunk 2077: Phantom Liberty Hidden Secrets",
      category: "Gaming",
      badgeColor: "bg-violet-600",
      type: "ARTICLE",
      year: "2024",
      popularity: "4.8K",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1000&auto=format&fit=crop&q=80",
      videoThumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1000&auto=format&fit=crop&q=80",
      backgroundImage: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1920&auto=format&fit=crop&q=85",
      genre: "Sci-Fi",
      desc: "Top easter eggs, weapons, and alternative endings inside Dogtown expansion."
    },
    {
      id: "c-12",
      title: "Joker: Gotham Shadow Psychology Analysis",
      category: "Movies",
      badgeColor: "bg-rose-600",
      type: "VIDEO",
      year: "2024",
      popularity: "15.4K",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1000&auto=format&fit=crop&q=80",
      videoThumbnail: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1000&auto=format&fit=crop&q=80",
      backgroundImage: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1920&auto=format&fit=crop&q=85",
      genre: "Thriller",
      desc: "A deep psychological profile of the descent into Gotham’s criminal underworld."
    }
  ]);
  const handleToggleBookmark = (id, e) => {
    e.stopPropagation();
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };
  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedGenre("All");
    setSelectedYear("All");
    setSelectedPopularity("All");
    setSelectedType("All");
    setSortBy("Latest");
  };
  const filteredCards = contentCards.filter((card) => {
    const matchesSearch = !searchQuery || card.title.toLowerCase().includes(searchQuery.toLowerCase()) || card.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || card.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesGenre = selectedGenre === "All" || card.genre.toLowerCase() === selectedGenre.toLowerCase();
    const matchesYear = selectedYear === "All" || card.year === selectedYear;
    const matchesType = selectedType === "All" || card.type === selectedType.toUpperCase();
    return matchesSearch && matchesCategory && matchesGenre && matchesYear && matchesType;
  });
  const sortedCards = [...filteredCards].sort((a, b) => {
    if (sortBy === "Latest") {
      return b.year.localeCompare(a.year);
    }
    if (sortBy === "Popular") {
      return parseFloat(b.popularity) - parseFloat(a.popularity);
    }
    return 0;
  });
  const displayedCards = sortedCards.slice(0, visibleCount);
  const renderCategoryIcon = (label) => {
    switch (label.toLowerCase()) {
      case "anime":
        return <svg viewBox="0 0 24 24" fill="none" className="w-[14px] h-[14px] stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 15a5 5 0 1 1 5-5 5 5 0 0 1-5 5z" />
          </svg>;
      case "gaming":
        return <Gamepad2 size={14} />;
      case "movies":
        return <Film size={13} />;
      case "tv shows":
        return <Tv size={13} />;
      case "k-pop":
        return <Music size={13} />;
      case "comics":
        return <BookOpen size={13} />;
      case "manga":
        return <Book size={13} />;
      case "cosplay":
        return <Sparkles size={13} />;
      default:
        return null;
    }
  };
  return <div className="w-full antialiased select-none bg-[#FAF8F5] min-h-screen font-baloo pb-16">
      
      {/* 2. HEADER BANNER */}
      <div className="relative w-full h-[180px] sm:h-[200px] overflow-hidden bg-zinc-950 border-b border-[#F0E8DD]">
        <img
          src="/src/assets/images/fandom_banner_1790273074334.jpg"
          alt="Content Explorer Cover"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.70] opacity-90 contrast-[1.1]"
        />
        {/* Dark mask overlay for optimal text contrast */}
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-black via-black/40 to-transparent" />

        {/* Content Inside Banner */}
        <div className="absolute inset-0 flex items-center justify-between px-6 sm:px-12 z-10">
          <div className="flex flex-col text-white">
            <h1 className="text-3xl sm:text-4.5xl font-black tracking-wider uppercase font-titan drop-shadow-md text-white">
              CONTENT EXPLORER
            </h1>
            <p className="text-sm sm:text-base font-extrabold text-amber-300 drop-shadow-xs mt-1">
              Discover amazing content from your favorite fandoms.
            </p>
            <p className="text-xs sm:text-sm font-semibold text-stone-300 mt-1">
              Articles, videos, and more — all in one place.
            </p>
          </div>
        </div>
      </div>

      {
    /* 3. CATEGORY PILLS BAR */
  }
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-6">
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          {["All", "Anime", "Gaming", "Movies", "TV Shows", "K-Pop", "Comics", "Manga", "Cosplay"].map((cat) => {
    const isSelected = selectedCategory === cat;
    return <button
      key={cat}
      onClick={() => {
        setSelectedCategory(cat);
        setVisibleCount(10);
      }}
      className={`flex items-center gap-1.5 text-[11px] font-black px-4 py-2.5 rounded-full tracking-wider uppercase border transition-all cursor-pointer shrink-0 ${isSelected ? "bg-[#FFCC00] border-[#E6B800] text-black font-black shadow-xs" : "bg-white border-[#EDE4D6] text-[#4A3E31] hover:bg-stone-50"}`}
    >
                {cat !== "All" && renderCategoryIcon(cat)}
                <span>{cat}</span>
              </button>;
  })}
        </div>
      </div>

      {
    /* 4. FILTER BAR CONTROLLER (Matches exactly) */
  }
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-5">
        <div className="bg-white border border-[#EBE6DD] rounded-xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.01)] flex flex-wrap items-center gap-3">
          
          {
    /* Keyword Search Input */
  }
          <div className="flex-1 min-w-[200px] relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#8E8272] pointer-events-none">
              <Search size={14} />
            </span>
            <input
    type="text"
    placeholder="Search by title or keyword..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-full text-xs font-bold pl-9 pr-4 py-3 rounded-lg border border-[#EDE4D6] focus:outline-none focus:border-[#FF5F1F] bg-[#FAF9F5] text-[#231C14]"
  />
          </div>

          {
    /* Category Dropdown */
  }
          <div className="w-[125px] flex flex-col gap-1">
            <span className="text-[9px] font-black text-[#8E8272] uppercase tracking-wider pl-1">Category</span>
            <div className="relative">
              <select
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
    className="w-full text-xs font-bold px-3 py-2.5 rounded-lg border border-[#EDE4D6] bg-[#FAF9F5] text-[#231C14] appearance-none focus:outline-none focus:border-[#FF5F1F] cursor-pointer"
  >
                <option value="All">All Categories</option>
                <option value="Anime">Anime</option>
                <option value="Gaming">Gaming</option>
                <option value="Movies">Movies</option>
                <option value="TV Shows">TV Shows</option>
                <option value="K-Pop">K-Pop</option>
                <option value="Comics">Comics</option>
                <option value="Manga">Manga</option>
                <option value="Cosplay">Cosplay</option>
              </select>
              <ChevronDown size={12} className="absolute right-2.5 top-3.5 text-[#8E8272] pointer-events-none" />
            </div>
          </div>

          {
    /* Genre Dropdown */
  }
          <div className="w-[125px] flex flex-col gap-1">
            <span className="text-[9px] font-black text-[#8E8272] uppercase tracking-wider pl-1">Genre</span>
            <div className="relative">
              <select
    value={selectedGenre}
    onChange={(e) => setSelectedGenre(e.target.value)}
    className="w-full text-xs font-bold px-3 py-2.5 rounded-lg border border-[#EDE4D6] bg-[#FAF9F5] text-[#231C14] appearance-none focus:outline-none focus:border-[#FF5F1F] cursor-pointer"
  >
                <option value="All">All Genres</option>
                <option value="Action">Action</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Thriller">Thriller</option>
                <option value="Music">Music</option>
                <option value="Fantasy">Fantasy</option>
              </select>
              <ChevronDown size={12} className="absolute right-2.5 top-3.5 text-[#8E8272] pointer-events-none" />
            </div>
          </div>

          {
    /* Release Year Dropdown */
  }
          <div className="w-[125px] flex flex-col gap-1">
            <span className="text-[9px] font-black text-[#8E8272] uppercase tracking-wider pl-1">Release Year</span>
            <div className="relative">
              <select
    value={selectedYear}
    onChange={(e) => setSelectedYear(e.target.value)}
    className="w-full text-xs font-bold px-3 py-2.5 rounded-lg border border-[#EDE4D6] bg-[#FAF9F5] text-[#231C14] appearance-none focus:outline-none focus:border-[#FF5F1F] cursor-pointer"
  >
                <option value="All">All Years</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2020">2020</option>
              </select>
              <ChevronDown size={12} className="absolute right-2.5 top-3.5 text-[#8E8272] pointer-events-none" />
            </div>
          </div>

          {
    /* Popularity Dropdown */
  }
          <div className="w-[125px] flex flex-col gap-1">
            <span className="text-[9px] font-black text-[#8E8272] uppercase tracking-wider pl-1">Popularity</span>
            <div className="relative">
              <select
    value={selectedPopularity}
    onChange={(e) => setSelectedPopularity(e.target.value)}
    className="w-full text-xs font-bold px-3 py-2.5 rounded-lg border border-[#EDE4D6] bg-[#FAF9F5] text-[#231C14] appearance-none focus:outline-none focus:border-[#FF5F1F] cursor-pointer"
  >
                <option value="All">All Levels</option>
                <option value="High">10K+ Views</option>
                <option value="Medium">5K+ Views</option>
              </select>
              <ChevronDown size={12} className="absolute right-2.5 top-3.5 text-[#8E8272] pointer-events-none" />
            </div>
          </div>

          {
    /* Content Type Dropdown */
  }
          <div className="w-[135px] flex flex-col gap-1">
            <span className="text-[9px] font-black text-[#8E8272] uppercase tracking-wider pl-1">Content Type</span>
            <div className="relative">
              <select
    value={selectedType}
    onChange={(e) => setSelectedType(e.target.value)}
    className="w-full text-xs font-bold px-3 py-2.5 rounded-lg border border-[#EDE4D6] bg-[#FAF9F5] text-[#231C14] appearance-none focus:outline-none focus:border-[#FF5F1F] cursor-pointer"
  >
                <option value="All">Article, Video, Audio...</option>
                <option value="Article">Article</option>
                <option value="Video">Video</option>
                <option value="Image">Image</option>
              </select>
              <ChevronDown size={12} className="absolute right-2.5 top-3.5 text-[#8E8272] pointer-events-none" />
            </div>
          </div>

          {
    /* Clear Filters Button */
  }
          <button
    onClick={handleClearFilters}
    className="flex items-center gap-1.5 bg-white hover:bg-stone-50 border border-[#EDE4D6] text-[#4A3E31] px-4 py-3 rounded-lg text-xs font-extrabold tracking-wider uppercase cursor-pointer self-end shadow-xs"
  >
            <RotateCcw size={13} className="text-[#8E8272]" />
            <span>Clear Filters</span>
          </button>

        </div>
      </div>

      {
    /* 5. RESULTS SUBHEADER BAR */
  }
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-6 flex items-center justify-between">
        <span className="text-xs font-black tracking-wide text-[#231C14]">
          Showing <span className="text-[#FF5F1F]">{sortedCards.length}</span> results
        </span>

        {
    /* Sort selector dropdown */
  }
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black text-[#8E8272] uppercase tracking-wider">Sort by</span>
          <div className="relative">
            <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
    className="text-xs font-black border border-[#EDE4D6] rounded-md px-3 py-1.5 bg-white text-[#231C14] cursor-pointer appearance-none pr-7"
  >
              <option value="Latest">Latest</option>
              <option value="Popular">Popularity</option>
            </select>
            <ChevronDown size={11} className="absolute right-2 top-2.5 text-[#8E8272] pointer-events-none" />
          </div>
        </div>
      </div>

      {
    /* 6. RESULTS GRID - EXACTLY 5 COLUMNS RESPONSIVE GRID */
  }
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-4">
        {displayedCards.length === 0 ? <div className="bg-white border border-[#EDE4D6] rounded-xl py-12 text-center">
            <p className="text-sm font-bold text-[#8E8272]">No matching content items found.</p>
            <button
    onClick={handleClearFilters}
    className="text-xs font-extrabold text-[#FF5F1F] uppercase tracking-widest mt-3 underline"
  >
              Reset Filters
            </button>
          </div> : <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {displayedCards.map((card) => {
    const isSaved = savedIds.has(card.id);
    const getCategoryBadgeStyles = (catName) => {
      switch (catName.toLowerCase()) {
        case "anime":
          return "bg-white text-black";
        case "gaming":
          return "bg-[#FED7E2] text-[#702459]";
        case "movies":
          return "bg-[#FBB6CE] text-[#702459]";
        case "tv shows":
          return "bg-[#C6F6D5] text-[#22543D]";
        case "k-pop":
          return "bg-[#B2F5EA] text-[#234E52]";
        case "comics":
          return "bg-[#EBF8FF] text-[#2B6CB0]";
        case "manga":
          return "bg-[#E9D8FD] text-[#553C9A]";
        default:
          return "bg-[#FEFCBF] text-[#744210]";
      }
    };
    return <div
      key={card.id}
      onClick={() => onOpenArticle && onOpenArticle(card)}
      className="rounded-xl overflow-hidden border border-[#EAE2D8]/10 bg-[#121824] shadow-md flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:scale-[1.01]"
      style={{ minHeight: "270px" }}
    >
                  {
      /* Image area */
    }
                  <div className="relative w-full h-[135px] overflow-hidden">
                    <img
      src={card.image}
      alt={card.title}
      className="w-full h-full object-cover brightness-[0.85] group-hover:scale-105 transition-transform duration-500"
    />
                    
                    {/* Top-Right Bookmark Button - Only shown when logged in */}
                    {isLoggedIn && (
                      <button
                        onClick={(e) => handleToggleBookmark(card.id, e)}
                        className="absolute top-2.5 right-2.5 w-7.5 h-7.5 rounded-md bg-black/45 backdrop-blur-xs flex items-center justify-center text-white border border-white/10 hover:bg-[#FF5F1F] hover:text-white transition-colors"
                      >
                        {isSaved ? <BookmarkCheck size={13} className="text-[#FFCC00] stroke-[2.5]" /> : <Bookmark size={13} className="stroke-[2.5]" />}
                      </button>
                    )}

                    {
      /* Bottom Left Category Overlay - Pill shaped, custom background matching the image */
    }
                    <div className={`absolute bottom-2.5 left-2.5 font-[900] text-[9.5px] px-2.5 py-0.5 rounded-full tracking-wider uppercase shadow-xs ${getCategoryBadgeStyles(card.category)}`}>
                      {card.category}
                    </div>

                    {
      /* Bottom Right Type Tag */
    }
                    <div className="absolute bottom-2.5 right-2.5 bg-black/55 text-[#DCDCDC] font-black text-[9px] px-2 py-0.5 rounded-sm tracking-wider uppercase border border-white/5">
                      {card.type}
                    </div>
                  </div>

                  {
      /* Details Card Content */
    }
                  <div className="p-3 flex-1 flex flex-col justify-between bg-[#111622] text-white">
                    <h3 className="font-extrabold text-[12px] leading-tight text-[#FAFBFD] uppercase tracking-wide mb-1.5 line-clamp-2">
                      {card.title}
                    </h3>

                    {
      /* Meta information row at bottom */
    }
                    <div className="flex items-center justify-between border-t border-white/5 pt-2 mt-1.5">
                      <div className="flex items-center gap-1 text-[#8E99A8] text-[9.5px] font-bold uppercase tracking-tight">
                        <Calendar size={11} className="stroke-[2.5]" />
                        <span>{card.year}</span>
                      </div>

                      <div className="flex items-center gap-1 text-orange-400 text-[9.5px] font-black uppercase tracking-tight">
                        <Flame size={11} className="stroke-[2.5]" />
                        <span>{card.popularity}</span>
                      </div>
                    </div>
                  </div>
                </div>;
  })}
          </div>}
      </div>

      {
    /* 7. LOAD MORE BUTTON (Exactly matching style & orange color) */
  }
      {sortedCards.length > visibleCount && <div className="flex justify-center mt-8">
          <button
    onClick={() => setVisibleCount((prev) => prev + 5)}
    className="flex items-center gap-2 bg-[#FFCC00] hover:bg-[#F2C200] text-black font-black text-xs tracking-widest uppercase px-8 py-3.5 rounded-lg shadow-md border border-[#E6B800] active:scale-[0.98] transition-all cursor-pointer"
  >
            <RefreshCw size={13} className="stroke-[3] animate-spin-slow" />
            <span>LOAD MORE</span>
          </button>
        </div>}

    </div>;
};
export {
  ExplorePage
};
