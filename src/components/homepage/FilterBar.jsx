import { ChevronsUpDown } from "lucide-react";
const FilterBar = ({
  searchTerm = "",
  onSearchChange,
  onSearchSubmit,
  quality = "All",
  onQualityChange,
  genre = "All",
  onGenreChange,
  rating = "All",
  onRatingChange,
  year = "All",
  onYearChange,
  language = "All",
  onLanguageChange,
  orderBy = "Feature",
  onOrderByChange
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit();
    }
  };
  return <div className="w-full bg-white rounded-[8px] p-4 sm:p-5 shadow-xs border border-[#EADDCF] select-none font-baloo">
      <form onSubmit={handleSubmit} className="space-y-4">
        {
    /* 1. TOP ROW: Search Term + Red SEARCH Button */
  }
        <div>
          <label className="text-[#231C14] text-xs sm:text-[13px] font-bold block mb-1.5 tracking-wide">
            Search Term:
          </label>
          <div className="flex items-center gap-2">
            <input
    type="text"
    value={searchTerm}
    onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
    placeholder="Search anime, manga, gaming, comics..."
    className="flex-1 bg-white hover:bg-[#FFFDF7] focus:bg-white border border-[#D5C6B7] text-[#231C14] placeholder-[#9E9081] text-xs sm:text-[13px] font-medium px-3.5 py-2 rounded-[6px] focus:outline-none focus:border-[#FF5F1F] transition-colors shadow-2xs"
  />
            <button
    type="submit"
    className="bg-[#D9381E] hover:bg-[#C22E17] active:bg-[#A82512] text-white text-xs font-black tracking-wider uppercase px-5 sm:px-7 py-2 rounded-[6px] cursor-pointer transition-all shrink-0 shadow-xs active:scale-95"
  >
              SEARCH
            </button>
          </div>
        </div>

        {
    /* 2. BOTTOM ROW: 6 Filter Selectors */
  }
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 pt-1">
          {
    /* 1. Quality */
  }
          <div>
            <label className="text-[#231C14] text-xs font-bold block mb-1 tracking-wide">
              Quality :
            </label>
            <div className="relative">
              <select
    value={quality}
    onChange={(e) => onQualityChange && onQualityChange(e.target.value)}
    className="w-full appearance-none h-8.5 bg-white hover:bg-[#FFFDF7] border border-[#D5C6B7] text-[#473B30] text-xs font-semibold pl-2.5 pr-6 rounded-[6px] focus:outline-none focus:border-[#FF5F1F] transition-colors cursor-pointer shadow-2xs"
  >
                <option value="All">All</option>
                <option value="4K">4K UHD</option>
                <option value="1080p">1080p FHD</option>
                <option value="HD">HD Master</option>
                <option value="HQ">HQ Scan</option>
              </select>
              <ChevronsUpDown
    size={13}
    className="absolute right-2 top-1/2 -translate-y-1/2 text-[#8A7B6C] pointer-events-none"
  />
            </div>
          </div>

          {
    /* 2. Genre */
  }
          <div>
            <label className="text-[#231C14] text-xs font-bold block mb-1 tracking-wide">
              Genre :
            </label>
            <div className="relative">
              <select
    value={genre}
    onChange={(e) => onGenreChange && onGenreChange(e.target.value)}
    className="w-full appearance-none h-8.5 bg-white hover:bg-[#FFFDF7] border border-[#D5C6B7] text-[#473B30] text-xs font-semibold pl-2.5 pr-6 rounded-[6px] focus:outline-none focus:border-[#FF5F1F] transition-colors cursor-pointer shadow-2xs"
  >
                <option value="All">All</option>
                <option value="Action">Action</option>
                <option value="Adventure">Adventure</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="RPG">RPG</option>
                <option value="Shonen">Shonen</option>
                <option value="Mystery">Mystery</option>
                <option value="Military">Military</option>
              </select>
              <ChevronsUpDown
    size={13}
    className="absolute right-2 top-1/2 -translate-y-1/2 text-[#8A7B6C] pointer-events-none"
  />
            </div>
          </div>

          {
    /* 3. Rating */
  }
          <div>
            <label className="text-[#231C14] text-xs font-bold block mb-1 tracking-wide">
              Rating:
            </label>
            <div className="relative">
              <select
    value={rating}
    onChange={(e) => onRatingChange && onRatingChange(e.target.value)}
    className="w-full appearance-none h-8.5 bg-white hover:bg-[#FFFDF7] border border-[#D5C6B7] text-[#473B30] text-xs font-semibold pl-2.5 pr-6 rounded-[6px] focus:outline-none focus:border-[#FF5F1F] transition-colors cursor-pointer shadow-2xs"
  >
                <option value="All">All</option>
                <option value="9.8">9.8+ Masterpiece</option>
                <option value="9.5">9.5+ Acclaimed</option>
                <option value="9.0">9.0+ Excellent</option>
                <option value="8.0">8.0+ Great</option>
              </select>
              <ChevronsUpDown
    size={13}
    className="absolute right-2 top-1/2 -translate-y-1/2 text-[#8A7B6C] pointer-events-none"
  />
            </div>
          </div>

          {
    /* 4. Year */
  }
          <div>
            <label className="text-[#231C14] text-xs font-bold block mb-1 tracking-wide">
              Year:
            </label>
            <div className="relative">
              <select
    value={year}
    onChange={(e) => onYearChange && onYearChange(e.target.value)}
    className="w-full appearance-none h-8.5 bg-white hover:bg-[#FFFDF7] border border-[#D5C6B7] text-[#473B30] text-xs font-semibold pl-2.5 pr-6 rounded-[6px] focus:outline-none focus:border-[#FF5F1F] transition-colors cursor-pointer shadow-2xs"
  >
                <option value="All">All</option>
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="Classic">Classic / Retro</option>
              </select>
              <ChevronsUpDown
    size={13}
    className="absolute right-2 top-1/2 -translate-y-1/2 text-[#8A7B6C] pointer-events-none"
  />
            </div>
          </div>

          {
    /* 5. Language */
  }
          <div>
            <label className="text-[#231C14] text-xs font-bold block mb-1 tracking-wide">
              Language
            </label>
            <div className="relative">
              <select
    value={language}
    onChange={(e) => onLanguageChange && onLanguageChange(e.target.value)}
    className="w-full appearance-none h-8.5 bg-white hover:bg-[#FFFDF7] border border-[#D5C6B7] text-[#473B30] text-xs font-semibold pl-2.5 pr-6 rounded-[6px] focus:outline-none focus:border-[#FF5F1F] transition-colors cursor-pointer shadow-2xs"
  >
                <option value="All">All</option>
                <option value="English">English</option>
                <option value="Japanese">Japanese (JP)</option>
                <option value="Korean">Korean (KR)</option>
                <option value="Sub">Subtitled</option>
                <option value="Dub">Dubbed</option>
              </select>
              <ChevronsUpDown
    size={13}
    className="absolute right-2 top-1/2 -translate-y-1/2 text-[#8A7B6C] pointer-events-none"
  />
            </div>
          </div>

          {
    /* 6. Order By */
  }
          <div>
            <label className="text-[#231C14] text-xs font-bold block mb-1 tracking-wide">
              Order By:
            </label>
            <div className="relative">
              <select
    value={orderBy}
    onChange={(e) => onOrderByChange && onOrderByChange(e.target.value)}
    className="w-full appearance-none h-8.5 bg-white hover:bg-[#FFFDF7] border border-[#D5C6B7] text-[#473B30] text-xs font-semibold pl-2.5 pr-6 rounded-[6px] focus:outline-none focus:border-[#FF5F1F] transition-colors cursor-pointer shadow-2xs"
  >
                <option value="Feature">Feature</option>
                <option value="Most popular">Most popular</option>
                <option value="Latest">Latest</option>
                <option value="Rating">Highest Rated</option>
                <option value="A-Z">A-Z Name</option>
              </select>
              <ChevronsUpDown
    size={13}
    className="absolute right-2 top-1/2 -translate-y-1/2 text-[#8A7B6C] pointer-events-none"
  />
            </div>
          </div>
        </div>
      </form>
    </div>;
};
export {
  FilterBar
};
