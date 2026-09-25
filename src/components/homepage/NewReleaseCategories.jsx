const POPULAR_FANDOMS = [
  {
    id: "category-anime",
    title: "Anime",
    subTitle: "Top Tier Animation & Shonen",
    category: "Anime",
    posterImage: "/src/assets/images/anime_category_cover_1790259649949.jpg",
    year: "2025",
    rating: "9.9",
    popularity: "4.2M fans",
    synopsis: "Immerse yourself in world-class anime universes, breathtaking fight choreography, and emotional narrative arcs across top fandoms.",
    type: "Series"
  },
  {
    id: "category-gaming",
    title: "Gaming",
    subTitle: "AAA Masterpieces & RPGs",
    category: "Gaming",
    posterImage: "/src/assets/images/gaming_category_cover_1790259666171.jpg",
    year: "2025",
    rating: "9.8",
    popularity: "3.8M fans",
    synopsis: "Explore groundbreaking next-gen gaming universes, competitive esports tournaments, and expansive open-world fantasy epics.",
    type: "Game"
  },
  {
    id: "category-movies",
    title: "Movies",
    subTitle: "Cinematic Blockbusters & Sci-Fi",
    category: "Movies",
    posterImage: "/src/assets/images/movies_category_cover_1790259679359.jpg",
    year: "2025",
    rating: "9.7",
    popularity: "3.1M fans",
    synopsis: "Experience thrilling Hollywood releases, indie cinematic gems, and visually spectacular superhero epics on the big screen.",
    type: "Movie"
  },
  {
    id: "category-tvshows",
    title: "TV Shows",
    subTitle: "Prestige Drama & Streaming Hits",
    category: "TV Shows",
    posterImage: "/src/assets/images/tv_shows_cover_1790259693928.jpg",
    year: "2025",
    rating: "9.6",
    popularity: "2.7M fans",
    synopsis: "Binge the most discussed premium television shows, fantasy sagas, and intense multi-season serialized storytelling.",
    type: "Series"
  },
  {
    id: "category-kpop",
    title: "K-Pop",
    subTitle: "Idol Groups, Music & Stages",
    category: "K-Pop",
    posterImage: "/src/assets/images/kpop_category_cover_1790259706108.jpg",
    year: "2025",
    rating: "9.9",
    popularity: "5.1M fans",
    synopsis: "Celebrate electrifying stadium comeback tours, chart-topping pop singles, mesmerizing choreographies, and global fandom communities.",
    type: "Album"
  },
  {
    id: "category-comics",
    title: "Comics",
    subTitle: "Graphic Novels & Superheroes",
    category: "Comics",
    posterImage: "/src/assets/images/comics_category_cover_1790259720421.jpg",
    year: "2025",
    rating: "9.5",
    popularity: "2.4M fans",
    synopsis: "Dive into legendary graphic novels, multiverse superhero crossovers, and timeless comic book illustrations.",
    type: "Comic"
  },
  {
    id: "category-manga",
    title: "Manga",
    subTitle: "Tank\u014Dbon, Manhwa & Webtoons",
    category: "Manga",
    posterImage: "/src/assets/images/manga_category_cover_1790259734131.jpg",
    year: "2025",
    rating: "9.9",
    popularity: "4.7M fans",
    synopsis: "Read weekly manga serialized chapters, acclaimed seinen masterpieces, and vibrant vertical-scroll digital webtoons.",
    type: "Comic"
  },
  {
    id: "category-cosplay",
    title: "Cosplay",
    subTitle: "Costume Craft & Conventions",
    category: "Cosplay",
    posterImage: "/src/assets/images/cosplay_category_cover_1790259747723.jpg",
    year: "2025",
    rating: "9.8",
    popularity: "1.9M fans",
    synopsis: "Marvel at hyper-detailed handmade armor props, stunning wig styling, and transformative cosplay photography from major fan expos.",
    type: "Series"
  }
];
const RECENT_UPDATES_LIST = [
  {
    rank: "01",
    title: "ONE PIECE : CH. 1130 LORE",
    tags: ["CH. 1130", "ANIME", "25M AGO", "LORE"],
    image: "/src/assets/images/one_piece_luffy_1790180189080.jpg",
    category: "Anime",
    rating: "9.9"
  },
  {
    rank: "02",
    title: "ELDEN RING : PATCH 1.14",
    tags: ["PATCH 1.14", "RPG", "1H AGO", "NOTES"],
    image: "/src/assets/images/elden_ring_tarnished_1790180785046.jpg",
    category: "Gaming",
    rating: "9.9"
  },
  {
    rank: "03",
    title: "SOLO LEVELING : ARRISE",
    tags: ["CH. 28", "MANHWA", "2H AGO", "ACTION"],
    image: "/src/assets/images/solo_leveling_jinwoo_1790251801155.jpg",
    category: "Manhwa",
    rating: "9.7"
  },
  {
    rank: "04",
    title: "TWISTED WONDERLAND : EP 4",
    tags: ["EP. 4", "MANGA", "3H AGO", "SUBBED"],
    image: "/src/assets/images/ace_trappola_card_1790180897062.jpg",
    category: "Manga",
    rating: "9.4"
  },
  {
    rank: "05",
    title: "HALO CANON : BLUE TEAM",
    tags: ["DOSSIER #42", "LORE", "5H AGO", "SCI-FI"],
    image: "/src/assets/images/halo_master_chief_1790180155350.jpg",
    category: "Gaming",
    rating: "9.2"
  },
  {
    rank: "06",
    title: "JUJUTSU KAISEN : CLIMAX",
    tags: ["CH. 271", "MANGA", "6H AGO", "SHONEN"],
    image: "/src/assets/images/jjk_manga_cover_1790257065556.jpg",
    category: "Manga",
    rating: "9.8"
  },
  {
    rank: "07",
    title: "OMNISCIENT READER",
    tags: ["CH. 210", "MANHWA", "7H AGO", "SYSTEM"],
    image: "/src/assets/images/orv_manhwa_cover_1790257082053.jpg",
    category: "Manhwa",
    rating: "9.6"
  },
  {
    rank: "08",
    title: "SILENT HILL : TOWNFALL",
    tags: ["TEASER #2", "HORROR", "8H AGO", "NEWS"],
    image: "/src/assets/images/silent_hill_townfall_1790180807707.jpg",
    category: "Gaming",
    rating: "9.5"
  },
  {
    rank: "09",
    title: "CYBERPUNK 2077 : LOG 2.2",
    tags: ["UPDATE 2.2", "SCI-FI", "10H AGO", "18+"],
    image: "/src/assets/images/cyberpunk_2077_art_1790255907017.jpg",
    category: "Gaming",
    rating: "9.8"
  },
  {
    rank: "10",
    title: "GINTAMA : FINAL BROADCAST",
    tags: ["SPECIAL", "ANIME", "12H AGO", "COMEDY"],
    image: "/src/assets/images/gintama_the_final_poster_1790257117068.jpg",
    category: "Anime",
    rating: "9.8"
  }
];
const NewReleaseCategories = ({
  onSelectItem,
  onSeeMore,
  onSelectCategory
}) => {
  const handleSeeMore = () => {
    if (onSeeMore) {
      onSeeMore();
    } else {
      const el = document.getElementById("trending-heading");
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };
  return <section className="w-full font-baloo select-none">
      {
    /* 2-Column Responsive Grid: Categories on Left + TOP TRENDING on Right in same row */
  }
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-6 lg:gap-8 items-start">
        
        {
    /* ================= LEFT SECTION: POPULAR FANDOMS (8 Square Cards) ================= */
  }
        <div className="md:col-span-8">
          
          {/* Section Header: POPULAR FANDOMS on Left, SEE MORE on Right */}
          <div className="flex items-center justify-between pb-2 mb-3.5 sm:mb-4 border-b border-gray-200">
            <h2 className="text-gray-900 text-lg sm:text-xl font-black tracking-wider uppercase font-titan">
              POPULAR FANDOMS
            </h2>
            <button
              type="button"
              onClick={handleSeeMore}
              className="text-[#F59E0B] hover:text-[#D97706] transition-colors text-xs sm:text-[13px] font-bold tracking-wider uppercase cursor-pointer hover:underline"
            >
              SEE MORE
            </button>
          </div>

          {/* 8 Square Cards in Responsive Grid with Increased Size & 0 Radius Sharp Corners */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4.5 md:gap-5">
            {POPULAR_FANDOMS.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectCategory ? onSelectCategory(item.title) : onSelectItem(item)}
                className="group cursor-pointer flex flex-col"
              >
                {/* 100% Square Cover Card with 0 radius (sharp square corners) & increased visual presence */}
                <div className="relative w-full aspect-square overflow-hidden rounded-none bg-white border border-gray-200 shadow-theme-card transition-all duration-300 group-hover:border-[#F59E0B] group-hover:shadow-md group-hover:-translate-y-1">
                  <img
                    src={item.posterImage}
                    alt={item.title}
                    className="w-full h-full object-cover object-center rounded-none transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Left-aligned title underneath */}
                <div className="mt-2">
                  <h3 className="text-gray-900 group-hover:text-[#F59E0B] text-xs sm:text-sm md:text-[14px] font-bold tracking-tight truncate transition-colors font-baloo">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* ================= RIGHT SECTION: RECENT ================= */}
        <div className="md:col-span-4 flex flex-col">
          {/* Header */}
          <div className="pb-2 mb-3.5 sm:mb-4 flex items-center justify-between border-b border-gray-200">
            <h2 className="text-gray-900 text-lg sm:text-xl font-black tracking-wider uppercase font-titan">
              RECENT
            </h2>
          </div>

          {/* Numbered List 01 to 10 for Recent Updates */}
          <div className="flex flex-col">
            {RECENT_UPDATES_LIST.map((item) => (
              <div
                key={item.rank}
                onClick={() => onSelectItem({
                  id: `recent-rank-${item.rank}`,
                  title: item.title,
                  category: item.category,
                  year: "2024",
                  rating: item.rating,
                  popularity: `Updated recently`,
                  posterImage: item.image,
                  type: "Series"
                })}
                className="group flex items-center gap-3 sm:gap-3.5 py-2.5 sm:py-3 border-b border-gray-200 last:border-b-0 hover:bg-gray-100 transition-all duration-150 cursor-pointer"
              >
                {/* 1. Large Outline / Stencil Rank Number (01, 02, etc.) */}
                <span className="font-stencil-rank text-3xl sm:text-[34px] md:text-[36px] font-extrabold text-outline-rank w-8 sm:w-9 text-center shrink-0 transition-all leading-none select-none">
                  {item.rank}
                </span>

                {/* 2. 100% Square Thumbnail Cover (0-Radius) */}
                <div className="w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 aspect-square rounded-none overflow-hidden bg-white shrink-0 border border-gray-200 shadow-2xs">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center rounded-none group-hover:scale-108 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                {/* 3. Uppercase Title & Tag Chips */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-gray-900 group-hover:text-[#F59E0B] text-xs sm:text-[13px] md:text-[13.5px] font-extrabold uppercase tracking-tight truncate transition-colors font-baloo leading-tight">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-[8.5px] sm:text-[9.5px] text-gray-500 font-bold mt-1 tracking-wider uppercase truncate">
                    {item.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-none border border-gray-200 shrink-0"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>;
};
export {
  NewReleaseCategories,
  POPULAR_FANDOMS,
  RECENT_UPDATES_LIST
};
