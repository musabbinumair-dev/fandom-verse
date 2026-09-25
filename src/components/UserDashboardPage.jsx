import {
  Clock,
  Star,
  SquarePen,
  Pencil,
  ChevronRight
} from "lucide-react";
import { getCategoryBadgeClass } from "../utils/categoryColors.js";

export const UserDashboardPage = ({
  onNavigateHome,
  onNavigateCategory,
  onNavigateSaved,
  onNavigateSubmit,
  onNavigateProfile,
  onOpenArticle
}) => {
  // 1. Favorite Fandoms pills mock data (8 categories)
  const favoriteCategories = [
    { name: "ANIME", image: "/src/assets/images/luffy_avatar_1790269807034.jpg" },
    { name: "GAMING", image: "/src/assets/images/category_gaming_1790259361539.jpg" },
    { name: "MOVIES", image: "/src/assets/images/category_movies_1790259375752.jpg" },
    { name: "TV SHOWS", image: "/src/assets/images/category_tvshows_1790259388971.jpg" },
    { name: "K-POP", image: "/src/assets/images/category_kpop_1790259404900.jpg" },
    { name: "COMICS", image: "/src/assets/images/category_comics_1790259419220.jpg" },
    { name: "MANGA", image: "/src/assets/images/category_manga_1790259433020.jpg" },
    { name: "COSPLAY", image: "/src/assets/images/category_cosplay_1790259445408.jpg" }
  ];

  // 2. Recent Activity mock items (5 cards)
  const recentActivities = [
    {
      id: "recent-1",
      title: "My Hero Academia S7 Episode 4 - Review",
      category: "Anime",
      time: "2 hours ago",
      image: "/src/assets/images/deku_mha_1790273094256.jpg"
    },
    {
      id: "recent-2",
      title: "Elden Ring: Shadow of the Erdtree - First Impressions",
      category: "Gaming",
      time: "5 hours ago",
      image: "/src/assets/images/elden_ring_thumb_1790269858443.jpg"
    },
    {
      id: "recent-3",
      title: "Dune: Part Two - A Visual Masterpiece",
      category: "Movies",
      time: "8 hours ago",
      image: "/src/assets/images/dune_part_two_1790270217047.jpg"
    },
    {
      id: "recent-4",
      title: "Stranger Things S5 - What We Know So Far",
      category: "TV Shows",
      time: "12 hours ago",
      image: "/src/assets/images/stranger_things_thumb_1790269900192.jpg"
    },
    {
      id: "recent-5",
      title: "IVE's New Comeback Teaser Breaks Records",
      category: "K-Pop",
      time: "1 day ago",
      image: "/src/assets/images/newjeans_thumb_1790269920672.jpg"
    }
  ];

  // 3. Your Bookmarks mock items (5 cards)
  const bookmarkedItems = [
    {
      id: "bookmark-1",
      title: "One Piece: Egghead Arc Breakdown",
      category: "Anime",
      rating: "9.5",
      desc: "The Egghead Arc brings major revelations and sets up the next...",
      image: "/src/assets/images/one_piece_climax_1790270185803.jpg"
    },
    {
      id: "bookmark-2",
      title: "Zelda: Tears of the Kingdom - Complete Guide",
      category: "Gaming",
      rating: "8.7",
      desc: "Everything you need to know about the game, from shrines to...",
      image: "/src/assets/images/zelda_tears_1790273114837.jpg"
    },
    {
      id: "bookmark-3",
      title: "Joker (2019) - Character Study",
      category: "Movies",
      rating: "8.9",
      desc: "A deep look into Arthur Fleck's journey and what makes this film...",
      image: "/src/assets/images/joker_arthur_1790273130213.jpg"
    },
    {
      id: "bookmark-4",
      title: "The Last of Us - Episode 1 Recap & Analysis",
      category: "TV Shows",
      rating: "8.6",
      desc: "How the series adapts the game and sets the tone for what's next.",
      image: "/src/assets/images/last_of_us_1790273144908.jpg"
    },
    {
      id: "bookmark-5",
      title: "NewJeans: Supernatural Album Review",
      category: "K-Pop",
      rating: "8.4",
      desc: "A fresh sound, bold visuals and another step forward for NewJeans.",
      image: "/src/assets/images/kpop_performance_1790270268548.jpg"
    }
  ];

  // 4. Trending Across Fandoms mock items (5 cards)
  const trendingItems = [
    {
      id: "trend-1",
      title: "Naruto: The Ultimate Guide to the Series",
      category: "Anime",
      rating: "9.2",
      desc: "A complete guide for new and returning fans.",
      image: "/src/assets/images/naruto_kurama_1790273165067.jpg"
    },
    {
      id: "trend-2",
      title: "Black Myth: Wukong - All Bosses Ranked",
      category: "Gaming",
      rating: "8.8",
      desc: "The toughest bosses and how to beat them.",
      image: "/src/assets/images/black_myth_wukong_1790273181489.jpg"
    },
    {
      id: "trend-3",
      title: "Interstellar - Still a Masterpiece",
      category: "Movies",
      rating: "9.1",
      desc: "Why this sci-fi classic continues to stand the test of time.",
      image: "/src/assets/images/interstellar_space_1790270312783.jpg"
    },
    {
      id: "trend-4",
      title: "Attack on Titan - Final Season Explained",
      category: "TV Shows",
      rating: "8.7",
      desc: "The end, the meaning, and what it all means.",
      image: "/src/assets/images/attack_on_titan_final_1790273197403.jpg"
    },
    {
      id: "trend-5",
      title: "Spider-Man: Best Story Arcs of All Time",
      category: "Comics",
      rating: "8.9",
      desc: "Must-read arcs for every Spider-Man fan.",
      image: "/src/assets/images/spiderman_comic_1790270342039.jpg"
    }
  ];

  return (
    <div className="w-full bg-[#F8F9FA] min-h-full font-baloo select-none pb-16 text-gray-900">
      {/* 1. TOP GREETING BANNER */}
      <div className="relative w-full h-44 sm:h-48 md:h-52 overflow-hidden bg-white border-b border-gray-200">
        <img
          src="/src/assets/images/fandom_banner_1790273074334.jpg"
          alt="Fandom Banner"
          className="absolute inset-0 w-full h-full object-cover opacity-80 object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/95 via-gray-950/75 to-transparent" />

        <div className="absolute inset-0 max-w-[1400px] mx-auto px-4 sm:px-6 flex items-center justify-between z-10">
          <div className="space-y-1 max-w-xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-titan uppercase text-gray-900 tracking-wide leading-none">
              HEY, MUSAB!
            </h1>
            <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900 pt-1">
              Welcome back to FandomVerse!
            </p>
            <p className="text-xs sm:text-sm font-medium text-gray-500">
              Explore. Discover. Be part of the fandom.
            </p>
          </div>

          <div className="shrink-0">
            <button
              type="button"
              onClick={() => onNavigateSubmit && onNavigateSubmit()}
              className="bg-[#F59E0B] hover:bg-[#D97706] text-black font-black text-xs sm:text-[13px] uppercase tracking-wider px-4 sm:px-5 py-2.5 sm:py-3 rounded-none transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>SUBMIT CONTENT</span>
              <SquarePen size={15} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-6 space-y-7">
        {/* 2. SECTION: YOUR FAVORITE FANDOMS */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight font-titan text-gray-900">
              YOUR FAVORITE FANDOMS
            </h2>
            <button
              type="button"
              onClick={() => onNavigateCategory && onNavigateCategory("All")}
              className="text-xs font-bold text-[#F59E0B] hover:underline uppercase tracking-wider cursor-pointer flex items-center gap-1.5"
            >
              <span>EDIT FAVORITES</span>
              <Pencil size={12} strokeWidth={2.5} className="text-[#F59E0B]" />
            </button>
          </div>

          {/* 8 Categories sharp square cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-3">
            {favoriteCategories.map((cat) => (
              <button
                key={cat.name}
                type="button"
                onClick={() => onNavigateCategory && onNavigateCategory(cat.name)}
                className="bg-white hover:bg-gray-100 border border-gray-200 rounded-none px-2.5 py-1.5 flex items-center gap-2.5 transition-all cursor-pointer shadow-theme-card group text-left"
              >
                <div className="w-8 h-8 rounded-none overflow-hidden shrink-0 border border-gray-200 bg-[#F8F9FA]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    onError={(e) => {
                      e.currentTarget.src = "/src/assets/images/luffy_avatar_1790269807034.jpg";
                    }}
                  />
                </div>
                <span className="font-black text-[11px] text-gray-900 tracking-wider truncate">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* 3. SECTION: RECENT ACTIVITY */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight font-titan text-gray-900">
              RECENT ACTIVITY
            </h2>
          </div>

          {/* 5 Dark sharp square cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {recentActivities.map((item) => (
              <div
                key={item.id}
                onClick={() => onOpenArticle && onOpenArticle(item)}
                className="bg-white hover:bg-gray-100 rounded-none p-3 flex flex-col justify-between shadow-theme-card transition-all cursor-pointer group border border-gray-200 text-gray-900"
              >
                <div className="relative h-32 w-full rounded-none overflow-hidden mb-2.5 bg-[#F8F9FA] shrink-0 border border-gray-200">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Category Pill Tag inside image bottom-left */}
                  <span className={`absolute bottom-2 left-2 text-[9.5px] font-black uppercase tracking-wider px-2 py-0.5 rounded-none shadow-sm ${getCategoryBadgeClass(item.category)}`}>
                    {item.category}
                  </span>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <h3 className="font-bold text-xs sm:text-[13px] leading-snug text-gray-900 group-hover:text-[#F59E0B] transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium mt-3">
                    <Clock size={12} strokeWidth={2} className="text-gray-500 shrink-0" />
                    <span>{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. SECTION: YOUR BOOKMARKS */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight font-titan text-gray-900">
              YOUR BOOKMARKS
            </h2>
            <button
              type="button"
              onClick={() => onNavigateSaved && onNavigateSaved()}
              className="text-xs font-bold text-[#F59E0B] hover:underline uppercase tracking-wider cursor-pointer flex items-center gap-1"
            >
              <span>SEE ALL</span>
              <ChevronRight size={14} strokeWidth={2.5} />
            </button>
          </div>

          {/* 5 Dark sharp square cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {bookmarkedItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onOpenArticle && onOpenArticle(item)}
                className="bg-white hover:bg-gray-100 rounded-none p-3 flex flex-col justify-between shadow-theme-card transition-all cursor-pointer group border border-gray-200 text-gray-900"
              >
                {/* Thumbnail with Star Rating on top-left */}
                <div className="relative h-32 w-full rounded-none overflow-hidden mb-2.5 bg-[#F8F9FA] shrink-0 border border-gray-200">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Star Rating Badge */}
                  <span className="absolute top-2 left-2 bg-[#F8F9FA]/90 backdrop-blur-xs text-gray-900 text-[10px] font-black px-1.5 py-0.5 rounded-none flex items-center gap-1 border border-gray-200">
                    <Star size={10} className="fill-[#F59E0B] text-[#F59E0B]" />
                    <span>{item.rating}</span>
                  </span>
                </div>

                {/* Content body with Category badge */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className={`inline-block text-[9.5px] font-black uppercase tracking-wider px-2 py-0.5 rounded-none w-fit mb-1.5 shadow-2xs ${getCategoryBadgeClass(item.category)}`}>
                      {item.category}
                    </span>

                    <h3 className="font-bold text-xs sm:text-[13px] leading-snug text-gray-900 group-hover:text-[#F59E0B] transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-gray-500 font-normal line-clamp-2 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-3 mt-1 border-t border-gray-200">
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-500 group-hover:text-gray-900 transition-colors">
                      READ MORE
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. SECTION: TRENDING ACROSS FANDOMS */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight font-titan text-gray-900">
              TRENDING ACROSS FANDOMS
            </h2>
          </div>

          {/* 5 Dark sharp square cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {trendingItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onOpenArticle && onOpenArticle(item)}
                className="bg-white hover:bg-gray-100 rounded-none p-3 flex flex-col justify-between shadow-theme-card transition-all cursor-pointer group border border-gray-200 text-gray-900"
              >
                {/* Thumbnail with Star Rating on top-left */}
                <div className="relative h-32 w-full rounded-none overflow-hidden mb-2.5 bg-[#F8F9FA] shrink-0 border border-gray-200">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Star Rating Badge */}
                  <span className="absolute top-2 left-2 bg-[#F8F9FA]/90 backdrop-blur-xs text-gray-900 text-[10px] font-black px-1.5 py-0.5 rounded-none flex items-center gap-1 border border-gray-200">
                    <Star size={10} className="fill-[#F59E0B] text-[#F59E0B]" />
                    <span>{item.rating}</span>
                  </span>
                </div>

                {/* Content body with Category badge */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className={`inline-block text-[9.5px] font-black uppercase tracking-wider px-2 py-0.5 rounded-none w-fit mb-1.5 shadow-2xs ${getCategoryBadgeClass(item.category)}`}>
                      {item.category}
                    </span>

                    <h3 className="font-bold text-xs sm:text-[13px] leading-snug text-gray-900 group-hover:text-[#F59E0B] transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-gray-500 font-normal line-clamp-2 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-3 mt-1 border-t border-gray-200">
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-500 group-hover:text-gray-900 transition-colors">
                      READ MORE
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default UserDashboardPage;
