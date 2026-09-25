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

  return (
    <div className="w-full bg-white rounded-[8px] p-4 sm:p-5 shadow-theme-card border border-gray-200 select-none font-baloo">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 1. TOP ROW: Search Term + Red SEARCH Button */}
        <div>
          <label className="text-gray-900 text-xs sm:text-[13px] font-bold block mb-1.5 tracking-wide">
            Search Term:
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              placeholder="Search anime, manga, gaming, comics..."
              className="flex-1 bg-gray-100 hover:bg-gray-200 focus:bg-gray-100 border border-gray-200 text-gray-900 placeholder-gray-400 text-xs sm:text-[13px] font-medium px-3.5 py-2 rounded-[6px] focus:outline-none focus:border-[#F59E0B] transition-colors shadow-2xs"
            />
            <button
              type="submit"
              className="bg-[#F59E0B] hover:bg-[#D97706] active:bg-[#B45309] text-black text-xs font-black tracking-wider uppercase px-5 sm:px-7 py-2 rounded-[6px] cursor-pointer transition-all shrink-0 shadow-xs active:scale-95"
            >
              SEARCH
            </button>
          </div>
        </div>

        {/* 2. BOTTOM ROW: 6 Filter Selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 pt-1">
          {/* 1. Quality */}
          <div>
            <label className="text-gray-900 text-xs font-bold block mb-1 tracking-wide">
              Quality :
            </label>
            <div className="relative">
              <select
                value={quality}
                onChange={(e) => onQualityChange && onQualityChange(e.target.value)}
                className="w-full appearance-none h-8.5 bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-900 text-xs font-semibold pl-2.5 pr-6 rounded-[6px] focus:outline-none focus:border-[#F59E0B] transition-colors cursor-pointer shadow-2xs"
              >
                <option value="All" className="bg-white text-gray-900">All</option>
                <option value="4K" className="bg-white text-gray-900">4K UHD</option>
                <option value="1080p" className="bg-white text-gray-900">1080p FHD</option>
                <option value="HD" className="bg-white text-gray-900">HD Master</option>
                <option value="HQ" className="bg-white text-gray-900">HQ Scan</option>
              </select>
              <ChevronsUpDown
                size={13}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
              />
            </div>
          </div>

          {/* 2. Genre */}
          <div>
            <label className="text-gray-900 text-xs font-bold block mb-1 tracking-wide">
              Genre :
            </label>
            <div className="relative">
              <select
                value={genre}
                onChange={(e) => onGenreChange && onGenreChange(e.target.value)}
                className="w-full appearance-none h-8.5 bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-900 text-xs font-semibold pl-2.5 pr-6 rounded-[6px] focus:outline-none focus:border-[#F59E0B] transition-colors cursor-pointer shadow-2xs"
              >
                <option value="All" className="bg-white text-gray-900">All</option>
                <option value="Action" className="bg-white text-gray-900">Action</option>
                <option value="Adventure" className="bg-white text-gray-900">Adventure</option>
                <option value="Fantasy" className="bg-white text-gray-900">Fantasy</option>
                <option value="Sci-Fi" className="bg-white text-gray-900">Sci-Fi</option>
                <option value="RPG" className="bg-white text-gray-900">RPG</option>
                <option value="Shonen" className="bg-white text-gray-900">Shonen</option>
                <option value="Mystery" className="bg-white text-gray-900">Mystery</option>
                <option value="Military" className="bg-white text-gray-900">Military</option>
              </select>
              <ChevronsUpDown
                size={13}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
              />
            </div>
          </div>

          {/* 3. Rating */}
          <div>
            <label className="text-gray-900 text-xs font-bold block mb-1 tracking-wide">
              Rating:
            </label>
            <div className="relative">
              <select
                value={rating}
                onChange={(e) => onRatingChange && onRatingChange(e.target.value)}
                className="w-full appearance-none h-8.5 bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-900 text-xs font-semibold pl-2.5 pr-6 rounded-[6px] focus:outline-none focus:border-[#F59E0B] transition-colors cursor-pointer shadow-2xs"
              >
                <option value="All" className="bg-white text-gray-900">All</option>
                <option value="9.8" className="bg-white text-gray-900">9.8+ Masterpiece</option>
                <option value="9.5" className="bg-white text-gray-900">9.5+ Acclaimed</option>
                <option value="9.0" className="bg-white text-gray-900">9.0+ Excellent</option>
                <option value="8.0" className="bg-white text-gray-900">8.0+ Great</option>
              </select>
              <ChevronsUpDown
                size={13}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
              />
            </div>
          </div>

          {/* 4. Year */}
          <div>
            <label className="text-gray-900 text-xs font-bold block mb-1 tracking-wide">
              Year:
            </label>
            <div className="relative">
              <select
                value={year}
                onChange={(e) => onYearChange && onYearChange(e.target.value)}
                className="w-full appearance-none h-8.5 bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-900 text-xs font-semibold pl-2.5 pr-6 rounded-[6px] focus:outline-none focus:border-[#F59E0B] transition-colors cursor-pointer shadow-2xs"
              >
                <option value="All" className="bg-white text-gray-900">All</option>
                <option value="2026" className="bg-white text-gray-900">2026</option>
                <option value="2025" className="bg-white text-gray-900">2025</option>
                <option value="2024" className="bg-white text-gray-900">2024</option>
                <option value="2023" className="bg-white text-gray-900">2023</option>
                <option value="Classic" className="bg-white text-gray-900">Classic / Retro</option>
              </select>
              <ChevronsUpDown
                size={13}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
              />
            </div>
          </div>

          {/* 5. Language */}
          <div>
            <label className="text-gray-900 text-xs font-bold block mb-1 tracking-wide">
              Language
            </label>
            <div className="relative">
              <select
                value={language}
                onChange={(e) => onLanguageChange && onLanguageChange(e.target.value)}
                className="w-full appearance-none h-8.5 bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-900 text-xs font-semibold pl-2.5 pr-6 rounded-[6px] focus:outline-none focus:border-[#F59E0B] transition-colors cursor-pointer shadow-2xs"
              >
                <option value="All" className="bg-white text-gray-900">All</option>
                <option value="English" className="bg-white text-gray-900">English</option>
                <option value="Japanese" className="bg-white text-gray-900">Japanese (JP)</option>
                <option value="Korean" className="bg-white text-gray-900">Korean (KR)</option>
                <option value="Sub" className="bg-white text-gray-900">Subtitled</option>
                <option value="Dub" className="bg-white text-gray-900">Dubbed</option>
              </select>
              <ChevronsUpDown
                size={13}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
              />
            </div>
          </div>

          {/* 6. Order By */}
          <div>
            <label className="text-gray-900 text-xs font-bold block mb-1 tracking-wide">
              Order By:
            </label>
            <div className="relative">
              <select
                value={orderBy}
                onChange={(e) => onOrderByChange && onOrderByChange(e.target.value)}
                className="w-full appearance-none h-8.5 bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-900 text-xs font-semibold pl-2.5 pr-6 rounded-[6px] focus:outline-none focus:border-[#F59E0B] transition-colors cursor-pointer shadow-2xs"
              >
                <option value="Feature" className="bg-white text-gray-900">Feature</option>
                <option value="Most popular" className="bg-white text-gray-900">Most popular</option>
                <option value="Latest" className="bg-white text-gray-900">Latest</option>
                <option value="Rating" className="bg-white text-gray-900">Highest Rated</option>
                <option value="A-Z" className="bg-white text-gray-900">A-Z Name</option>
              </select>
              <ChevronsUpDown
                size={13}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export { FilterBar };
