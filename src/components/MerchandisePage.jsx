import { useState } from "react";
import {
  ChevronRight,
  ShoppingBag,
  Calendar,
  Bookmark,
  Check,
  X,
  Package,
  Sparkles
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
const TAG_FILTERS = [
  "Limited Edition",
  "Pre-Order",
  "Collectible"
];
const UPCOMING_RELEASES = [
  {
    id: "rel-1",
    title: "The Wandering Lights",
    subtitle: "A new journey begins in the skies.",
    type: "Anime",
    typeStyle: "bg-[#F3E8FF] text-[#7E22CE]",
    category: "Anime",
    categoryStyle: "bg-[#FCE7F3] text-[#9D174D]",
    releaseDate: "May 17, 2025",
    image: "/src/assets/images/solaris_rise_sunset_1790283958868.jpg"
  },
  {
    id: "rel-2",
    title: "Realm of Echoes",
    subtitle: "Explore, build, survive.",
    type: "Game",
    typeStyle: "bg-[#DCFCE7] text-[#15803D]",
    category: "Gaming",
    categoryStyle: "bg-[#DCFCE7] text-[#15803D]",
    releaseDate: "May 20, 2025",
    image: "/src/assets/images/orion_steel_1790281419734.jpg"
  },
  {
    id: "rel-3",
    title: "The Last Horizon",
    subtitle: "A story about hope, beyond the stars.",
    type: "Movie",
    typeStyle: "bg-[#E0F2FE] text-[#0369A1]",
    category: "Movies",
    categoryStyle: "bg-[#E0F2FE] text-[#0369A1]",
    releaseDate: "May 23, 2025",
    image: "/src/assets/images/kairo_hale_1790281602183.jpg"
  },
  {
    id: "rel-4",
    title: "City of Shadows",
    subtitle: "New episodes. New mysteries.",
    type: "Show",
    typeStyle: "bg-[#EDE9FE] text-[#6B21A8]",
    category: "TV Shows",
    categoryStyle: "bg-[#EDE9FE] text-[#6B21A8]",
    releaseDate: "May 25, 2025",
    image: "/src/assets/images/jace_rivers_1790281454743.jpg"
  },
  {
    id: "rel-5",
    title: "Harmony Rising",
    subtitle: "A new chapter, a new sound.",
    type: "Merch Drop",
    typeStyle: "bg-[#FEE2E2] text-[#DC2626]",
    category: "K-Pop",
    categoryStyle: "bg-[#F3E8FF] text-[#7E22CE]",
    releaseDate: "May 28, 2025",
    image: "/src/assets/images/lumiere_stage_debut_1790283998932.jpg"
  },
  {
    id: "rel-6",
    title: "The Crimson Scrolls #4",
    subtitle: "The story continues.",
    type: "Comic",
    typeStyle: "bg-[#FFE4E6] text-[#BE123C]",
    category: "Comics",
    categoryStyle: "bg-[#FFE4E6] text-[#BE123C]",
    releaseDate: "May 30, 2025",
    image: "/src/assets/images/nix_ember_1790281532486.jpg"
  }
];
const MerchandisePage = ({
  onNavigateHome
}) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState("Limited Edition");
  const [bookmarkedIds, setBookmarkedIds] = useState(/* @__PURE__ */ new Set(["merch-1", "merch-4", "merch-8", "rel-1", "rel-2", "rel-3", "rel-4", "rel-5", "rel-6"]));
  const [toastMessage, setToastMessage] = useState(null);
  const [activeModalItem, setActiveModalItem] = useState(null);
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
  return <div className="w-full bg-[#FAF8F5] min-h-full py-6 px-4 sm:px-6 font-sans select-none text-[#171717]">
      <div className="max-w-7xl mx-auto space-y-6">
        {
    /* 1. BREADCRUMBS: Home > Merchandise */
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
          <span className="text-[#171717] font-semibold">Merchandise</span>
        </nav>

        {
    /* 2. TITLE SECTION (Shopping Bag Icon + Heading + Subtitle) */
  }
        <div className="pt-0.5">
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-[30px] font-black text-[#1C1917] tracking-tight uppercase font-titan leading-none">
              MERCHANDISE AND UPCOMING RELEASES
            </h1>
          </div>
          <p className="text-xs sm:text-[13px] text-[#737373] font-medium mt-1">
            Discover exclusive merchandise, limited editions, and upcoming releases from your favorite fandoms.
          </p>
        </div>

        {
    /* 3. FILTERS ROW: Category Filter on Left | Tag Filter on Right */
  }
        <div className="pt-1 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          {
    /* Filter by Category */
  }
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <span className="font-bold text-[#171717] shrink-0 whitespace-nowrap">Filter by Category:</span>
            <div className="flex items-center gap-1.5 shrink-0">
              {CATEGORIES.map((cat) => {
    const isActive = selectedCategory === cat;
    return <button
      key={cat}
      type="button"
      onClick={() => setSelectedCategory(cat)}
      className={`px-3 py-1 rounded-[7px] text-xs transition-all cursor-pointer whitespace-nowrap ${isActive ? "bg-[#FFA800] text-black font-extrabold shadow-2xs" : "bg-white text-[#525252] border border-[#E5E7EB] hover:bg-stone-50"}`}
    >
                    {cat}
                  </button>;
  })}
            </div>
          </div>

          {
    /* Filter by Tag */
  }
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-bold text-[#171717] shrink-0 whitespace-nowrap">Filter by Tag:</span>
            <div className="flex items-center gap-1.5">
              {TAG_FILTERS.map((tag) => {
    const isActive = selectedTag === tag;
    return <button
      key={tag}
      type="button"
      onClick={() => setSelectedTag(tag)}
      className={`px-3 py-1 rounded-[7px] text-xs transition-all cursor-pointer whitespace-nowrap ${isActive ? "bg-[#FFA800] text-black font-extrabold shadow-2xs" : "bg-white text-[#525252] border border-[#E5E7EB] hover:bg-stone-50"}`}
    >
                    {tag}
                  </button>;
  })}
            </div>
          </div>
        </div>

        {
    /* 4. SECTION 1: MERCHANDISE SHOWCASE */
  }
        <section className="space-y-3 pt-2">
          {
    /* Header: Merchandise icon + MERCHANDISE SHOWCASE */
  }
          <div className="flex items-center gap-2">
            <h2 className="text-[15px] font-black uppercase tracking-tight font-titan text-[#171717]">
              MERCHANDISE SHOWCASE
            </h2>
          </div>

          {
    /* EXACT MULTI-COLUMN MASONRY GRID MATCHING SCREENSHOT */
  }
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-start">
            {
    /* === COLUMN 1 (3 Cols): Tall Figure + Frostbite Blade + Airship Model === */
  }
            <div className="md:col-span-3 space-y-3.5">
              {
    /* 1. Celestial Archer Figure (Tall Card) */
  }
              <div
    onClick={() => setActiveModalItem({
      title: "Celestial Archer Figure",
      tag: "LIMITED EDITION",
      tagStyle: "bg-[#FCE7F3] text-[#9D174D]",
      category: "Anime",
      categoryStyle: "bg-[#EDE9FE] text-[#6B21A8]",
      image: "/src/assets/images/celestial_archer_fig_1790285506979.jpg",
      price: "$189.99",
      description: "Hand-painted 1/7th scale collector figure featuring the Celestial Archer with glowing cyan bow and crystalline arrow on a carved marble display base."
    })}
    className="relative rounded-[14px] overflow-hidden bg-stone-900 border border-[#CBD5E1]/60 shadow-xs cursor-pointer group aspect-[3/4.2]"
  >
                <img
    src="/src/assets/images/celestial_archer_fig_1790285506979.jpg"
    alt="Celestial Archer Figure"
    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
  />

                {
    /* Top-Left Tag: LIMITED EDITION */
  }
                <div className="absolute top-2.5 left-2.5">
                  <span className="bg-[#FCE7F3] text-[#9D174D] text-[8.5px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                    LIMITED EDITION
                  </span>
                </div>

                {
    /* Top-Right Bookmark */
  }
                <button
    type="button"
    onClick={(e) => toggleBookmark(e, "merch-1")}
    className="absolute top-2.5 right-2.5 p-1 text-white hover:text-[#FFA800] transition-colors cursor-pointer"
  >
                  <Bookmark
    size={15}
    className={bookmarkedIds.has("merch-1") ? "fill-[#FFA800] text-[#FFA800]" : "stroke-[2.2]"}
  />
                </button>

                {
    /* Bottom Overlay Title & Category Badge */
  }
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 pt-7 space-y-1">
                  <h3 className="font-bold text-xs sm:text-[13px] text-white leading-tight">
                    Celestial Archer Figure
                  </h3>
                  <div>
                    <span className="bg-[#EDE9FE] text-[#6B21A8] text-[8.5px] font-black px-2 py-0.2 rounded-full uppercase tracking-wider inline-block">
                      Anime
                    </span>
                  </div>
                </div>
              </div>

              {
    /* 2. Frostbite Blade Replica */
  }
              <div
    onClick={() => setActiveModalItem({
      title: "Frostbite Blade Replica",
      tag: "PRE-ORDER",
      tagStyle: "bg-[#BAE6FD] text-[#0369A1]",
      category: "Anime",
      categoryStyle: "bg-[#EDE9FE] text-[#6B21A8]",
      image: "/src/assets/images/frostbite_blade_1790285550719.jpg",
      price: "$249.00",
      description: "Authentic 1:1 collector replica crafted with translucent cold-frost acrylic and internal LED illumination. Includes wooden display stand."
    })}
    className="relative rounded-[14px] overflow-hidden bg-stone-900 border border-[#CBD5E1]/60 shadow-xs cursor-pointer group aspect-[16/10]"
  >
                <img
    src="/src/assets/images/frostbite_blade_1790285550719.jpg"
    alt="Frostbite Blade Replica"
    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
  />

                <div className="absolute top-2.5 left-2.5">
                  <span className="bg-[#BAE6FD] text-[#0369A1] text-[8.5px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                    PRE-ORDER
                  </span>
                </div>

                <button
    type="button"
    onClick={(e) => toggleBookmark(e, "merch-2")}
    className="absolute top-2.5 right-2.5 p-1 text-white hover:text-[#FFA800] transition-colors cursor-pointer"
  >
                  <Bookmark
    size={15}
    className={bookmarkedIds.has("merch-2") ? "fill-[#FFA800] text-[#FFA800]" : "stroke-[2.2]"}
  />
                </button>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 pt-6 space-y-1">
                  <h3 className="font-bold text-xs sm:text-[13px] text-white leading-tight">
                    Frostbite Blade Replica
                  </h3>
                  <div>
                    <span className="bg-[#EDE9FE] text-[#6B21A8] text-[8.5px] font-black px-2 py-0.2 rounded-full uppercase tracking-wider inline-block">
                      Anime
                    </span>
                  </div>
                </div>
              </div>

              {
    /* 3. Starfall Airship Model */
  }
              <div
    onClick={() => setActiveModalItem({
      title: "Starfall Airship Model",
      tag: "COLLECTIBLE",
      tagStyle: "bg-[#FEF3C7] text-[#D97706]",
      category: "Movies",
      categoryStyle: "bg-[#DBEAFE] text-[#1E40AF]",
      image: "/src/assets/images/starfall_airship_1790285629735.jpg",
      price: "$129.50",
      description: "Collector wooden galleon airship model with working brass gears, multi-tier canvas rigging, and display stand."
    })}
    className="relative rounded-[14px] overflow-hidden bg-stone-900 border border-[#CBD5E1]/60 shadow-xs cursor-pointer group aspect-[16/9.5]"
  >
                <img
    src="/src/assets/images/starfall_airship_1790285629735.jpg"
    alt="Starfall Airship Model"
    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
  />

                <div className="absolute top-2.5 left-2.5">
                  <span className="bg-[#FEF3C7] text-[#D97706] text-[8.5px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                    COLLECTIBLE
                  </span>
                </div>

                <button
    type="button"
    onClick={(e) => toggleBookmark(e, "merch-3")}
    className="absolute top-2.5 right-2.5 p-1 text-white hover:text-[#FFA800] transition-colors cursor-pointer"
  >
                  <Bookmark
    size={15}
    className={bookmarkedIds.has("merch-3") ? "fill-[#FFA800] text-[#FFA800]" : "stroke-[2.2]"}
  />
                </button>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 pt-6 space-y-1">
                  <h3 className="font-bold text-xs sm:text-[13px] text-white leading-tight">
                    Starfall Airship Model
                  </h3>
                  <div>
                    <span className="bg-[#DBEAFE] text-[#1E40AF] text-[8.5px] font-black px-2 py-0.2 rounded-full uppercase tracking-wider inline-block">
                      Movies
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {
    /* === MIDDLE AREA (6 Cols): Grid of Headset, Poster, Vinyl, Artbook + Cloud Drake Plush === */
  }
            <div className="md:col-span-6 space-y-3.5">
              {
    /* Row 1: Headset (Col 2) & Skyreach Poster (Col 3) */
  }
              <div className="grid grid-cols-2 gap-3.5">
                {
    /* Voidwave Gaming Headset */
  }
                <div
    onClick={() => setActiveModalItem({
      title: "Voidwave Gaming Headset",
      tag: "PRE-ORDER",
      tagStyle: "bg-[#BAE6FD] text-[#0369A1]",
      category: "Gaming",
      categoryStyle: "bg-[#DCFCE7] text-[#15803D]",
      image: "/src/assets/images/voidwave_headset_1790285522992.jpg",
      price: "$159.00",
      description: "Wireless planar-magnetic esports audio with 2.4GHz ultra-low latency, detachable noise-canceling mic, and customizable cyan illumination."
    })}
    className="relative rounded-[14px] overflow-hidden bg-stone-900 border border-[#CBD5E1]/60 shadow-xs cursor-pointer group aspect-square"
  >
                  <img
    src="/src/assets/images/voidwave_headset_1790285522992.jpg"
    alt="Voidwave Gaming Headset"
    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
  />

                  <div className="absolute top-2.5 left-2.5">
                    <span className="bg-[#BAE6FD] text-[#0369A1] text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                      PRE-ORDER
                    </span>
                  </div>

                  <button
    type="button"
    onClick={(e) => toggleBookmark(e, "merch-4")}
    className="absolute top-2.5 right-2.5 p-1 text-white hover:text-[#FFA800] transition-colors cursor-pointer"
  >
                    <Bookmark
    size={14}
    className={bookmarkedIds.has("merch-4") ? "fill-[#FFA800] text-[#FFA800]" : "stroke-[2.2]"}
  />
                  </button>

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-2.5 pt-5 space-y-1">
                    <h3 className="font-bold text-xs text-white leading-tight">
                      Voidwave Gaming Headset
                    </h3>
                    <div>
                      <span className="bg-[#DCFCE7] text-[#15803D] text-[8px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-wider inline-block">
                        Gaming
                      </span>
                    </div>
                  </div>
                </div>

                {
    /* Skyreach Poster Print */
  }
                <div
    onClick={() => setActiveModalItem({
      title: "Skyreach Poster Print",
      tag: "COLLECTIBLE",
      tagStyle: "bg-[#FEF3C7] text-[#D97706]",
      category: "Movies",
      categoryStyle: "bg-[#DBEAFE] text-[#1E40AF]",
      image: "/src/assets/images/aetheria_wanderer_1790282784893.jpg",
      price: "$35.00",
      description: "Limited archival museum-grade metallic foil lithograph poster of the Skyreach floating castles at dawn."
    })}
    className="relative rounded-[14px] overflow-hidden bg-stone-900 border border-[#CBD5E1]/60 shadow-xs cursor-pointer group aspect-square"
  >
                  <img
    src="/src/assets/images/aetheria_wanderer_1790282784893.jpg"
    alt="Skyreach Poster Print"
    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
  />

                  <div className="absolute top-2.5 left-2.5">
                    <span className="bg-[#FEF3C7] text-[#D97706] text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                      COLLECTIBLE
                    </span>
                  </div>

                  <button
    type="button"
    onClick={(e) => toggleBookmark(e, "merch-5")}
    className="absolute top-2.5 right-2.5 p-1 text-white hover:text-[#FFA800] transition-colors cursor-pointer"
  >
                    <Bookmark
    size={14}
    className={bookmarkedIds.has("merch-5") ? "fill-[#FFA800] text-[#FFA800]" : "stroke-[2.2]"}
  />
                  </button>

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-2.5 pt-5 space-y-1">
                    <h3 className="font-bold text-xs text-white leading-tight">
                      Skyreach Poster Print
                    </h3>
                    <div>
                      <span className="bg-[#DBEAFE] text-[#1E40AF] text-[8px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-wider inline-block">
                        Movies
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {
    /* Row 2: Neon Skies Vinyl & The Lost Realm Artbook */
  }
              <div className="grid grid-cols-2 gap-3.5">
                {
    /* Neon Skies Vinyl */
  }
                <div
    onClick={() => setActiveModalItem({
      title: "Neon Skies Vinyl",
      tag: "COLLECTIBLE",
      tagStyle: "bg-[#FEF3C7] text-[#D97706]",
      category: "K-Pop",
      categoryStyle: "bg-[#F3E8FF] text-[#7E22CE]",
      image: "/src/assets/images/neon_skies_vinyl_1790285603580.jpg",
      price: "$42.00",
      description: "Deluxe double LP pressed on translucent sunset pink and purple marble wax. Includes foldout poster and exclusive trading cards."
    })}
    className="relative rounded-[14px] overflow-hidden bg-stone-900 border border-[#CBD5E1]/60 shadow-xs cursor-pointer group aspect-square"
  >
                  <img
    src="/src/assets/images/neon_skies_vinyl_1790285603580.jpg"
    alt="Neon Skies Vinyl"
    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
  />

                  <div className="absolute top-2.5 left-2.5">
                    <span className="bg-[#FEF3C7] text-[#D97706] text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                      COLLECTIBLE
                    </span>
                  </div>

                  <button
    type="button"
    onClick={(e) => toggleBookmark(e, "merch-6")}
    className="absolute top-2.5 right-2.5 p-1 text-white hover:text-[#FFA800] transition-colors cursor-pointer"
  >
                    <Bookmark
    size={14}
    className={bookmarkedIds.has("merch-6") ? "fill-[#FFA800] text-[#FFA800]" : "stroke-[2.2]"}
  />
                  </button>

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-2.5 pt-5 space-y-1">
                    <h3 className="font-bold text-xs text-white leading-tight">
                      Neon Skies Vinyl
                    </h3>
                    <div>
                      <span className="bg-[#F3E8FF] text-[#7E22CE] text-[8px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-wider inline-block">
                        K-Pop
                      </span>
                    </div>
                  </div>
                </div>

                {
    /* The Lost Realm Artbook */
  }
                <div
    onClick={() => setActiveModalItem({
      title: "The Lost Realm Artbook",
      tag: "LIMITED EDITION",
      tagStyle: "bg-[#FCE7F3] text-[#9D174D]",
      category: "Manga",
      categoryStyle: "bg-[#EDE9FE] text-[#6B21A8]",
      image: "/src/assets/images/lost_realm_artbook_1790285617809.jpg",
      price: "$55.00",
      description: "280-page premium hardcover compilation featuring early character concept sketches, environment worldbuilding matte paintings, and creator commentaries."
    })}
    className="relative rounded-[14px] overflow-hidden bg-stone-900 border border-[#CBD5E1]/60 shadow-xs cursor-pointer group aspect-square"
  >
                  <img
    src="/src/assets/images/lost_realm_artbook_1790285617809.jpg"
    alt="The Lost Realm Artbook"
    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
  />

                  <div className="absolute top-2.5 left-2.5">
                    <span className="bg-[#FCE7F3] text-[#9D174D] text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                      LIMITED EDITION
                    </span>
                  </div>

                  <button
    type="button"
    onClick={(e) => toggleBookmark(e, "merch-7")}
    className="absolute top-2.5 right-2.5 p-1 text-white hover:text-[#FFA800] transition-colors cursor-pointer"
  >
                    <Bookmark
    size={14}
    className={bookmarkedIds.has("merch-7") ? "fill-[#FFA800] text-[#FFA800]" : "stroke-[2.2]"}
  />
                  </button>

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-2.5 pt-5 space-y-1">
                    <h3 className="font-bold text-xs text-white leading-tight">
                      The Lost Realm Artbook
                    </h3>
                    <div>
                      <span className="bg-[#EDE9FE] text-[#6B21A8] text-[8px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-wider inline-block">
                        Manga
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {
    /* Row 3: Cloud Drake Plush (Spans Full Width of Middle Section) */
  }
              <div
    onClick={() => setActiveModalItem({
      title: "Cloud Drake Plush",
      tag: "LIMITED EDITION",
      tagStyle: "bg-[#FCE7F3] text-[#9D174D]",
      category: "Gaming",
      categoryStyle: "bg-[#DCFCE7] text-[#15803D]",
      image: "/src/assets/images/cloud_drake_plush_1790285563088.jpg",
      price: "$38.00",
      description: "Ultra-soft 12-inch fluffy baby cloud drake with sparkly embroidered eyes and posable wings."
    })}
    className="relative rounded-[14px] overflow-hidden bg-stone-900 border border-[#CBD5E1]/60 shadow-xs cursor-pointer group aspect-[16/8.5]"
  >
                <img
    src="/src/assets/images/cloud_drake_plush_1790285563088.jpg"
    alt="Cloud Drake Plush"
    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
  />

                <div className="absolute top-2.5 left-2.5">
                  <span className="bg-[#FCE7F3] text-[#9D174D] text-[8.5px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                    LIMITED EDITION
                  </span>
                </div>

                <button
    type="button"
    onClick={(e) => toggleBookmark(e, "merch-8")}
    className="absolute top-2.5 right-2.5 p-1 text-white hover:text-[#FFA800] transition-colors cursor-pointer"
  >
                  <Bookmark
    size={15}
    className={bookmarkedIds.has("merch-8") ? "fill-[#FFA800] text-[#FFA800]" : "stroke-[2.2]"}
  />
                </button>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 pt-6 space-y-1">
                  <h3 className="font-bold text-xs sm:text-[13px] text-white leading-tight">
                    Cloud Drake Plush
                  </h3>
                  <div>
                    <span className="bg-[#DCFCE7] text-[#15803D] text-[8.5px] font-black px-2 py-0.2 rounded-full uppercase tracking-wider inline-block">
                      Gaming
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {
    /* === COLUMN 4 (3 Cols): Emberwing Hoodie + Moonlight Ears + Faction Pins Set === */
  }
            <div className="md:col-span-3 space-y-3.5">
              {
    /* 1. Emberwing Hoodie */
  }
              <div
    onClick={() => setActiveModalItem({
      title: "Emberwing Hoodie",
      tag: "LIMITED EDITION",
      tagStyle: "bg-[#FCE7F3] text-[#9D174D]",
      category: "Gaming",
      categoryStyle: "bg-[#DCFCE7] text-[#15803D]",
      image: "/src/assets/images/emberwing_hoodie_1790285536763.jpg",
      price: "$85.00",
      description: "Heavyweight 450 GSM organic cotton fleece hoodie featuring luminescent cyan wing motif on chest and custom engraved hardware."
    })}
    className="relative rounded-[14px] overflow-hidden bg-stone-900 border border-[#CBD5E1]/60 shadow-xs cursor-pointer group aspect-square"
  >
                <img
    src="/src/assets/images/emberwing_hoodie_1790285536763.jpg"
    alt="Emberwing Hoodie"
    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
  />

                <div className="absolute top-2.5 left-2.5">
                  <span className="bg-[#FCE7F3] text-[#9D174D] text-[8.5px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                    LIMITED EDITION
                  </span>
                </div>

                <button
    type="button"
    onClick={(e) => toggleBookmark(e, "merch-9")}
    className="absolute top-2.5 right-2.5 p-1 text-white hover:text-[#FFA800] transition-colors cursor-pointer"
  >
                  <Bookmark
    size={14}
    className={bookmarkedIds.has("merch-9") ? "fill-[#FFA800] text-[#FFA800]" : "stroke-[2.2]"}
  />
                </button>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 pt-6 space-y-1">
                  <h3 className="font-bold text-xs sm:text-[13px] text-white leading-tight">
                    Emberwing Hoodie
                  </h3>
                  <div>
                    <span className="bg-[#DCFCE7] text-[#15803D] text-[8.5px] font-black px-2 py-0.2 rounded-full uppercase tracking-wider inline-block">
                      Gaming
                    </span>
                  </div>
                </div>
              </div>

              {
    /* 2. Moonlight Ears (Cosplay) */
  }
              <div
    onClick={() => setActiveModalItem({
      title: "Moonlight Ears (Cosplay)",
      tag: "PRE-ORDER",
      tagStyle: "bg-[#BAE6FD] text-[#0369A1]",
      category: "Cosplay",
      categoryStyle: "bg-[#CCFBF1] text-[#0F766E]",
      image: "/src/assets/images/moonlight_ears_1790285575967.jpg",
      price: "$45.00",
      description: "Ergonomic cosplay ears headpiece adorned with dark purple ambient crystals and flexible inner wire structure."
    })}
    className="relative rounded-[14px] overflow-hidden bg-stone-900 border border-[#CBD5E1]/60 shadow-xs cursor-pointer group aspect-square"
  >
                <img
    src="/src/assets/images/moonlight_ears_1790285575967.jpg"
    alt="Moonlight Ears (Cosplay)"
    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
  />

                <div className="absolute top-2.5 left-2.5">
                  <span className="bg-[#BAE6FD] text-[#0369A1] text-[8.5px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                    PRE-ORDER
                  </span>
                </div>

                <button
    type="button"
    onClick={(e) => toggleBookmark(e, "merch-10")}
    className="absolute top-2.5 right-2.5 p-1 text-white hover:text-[#FFA800] transition-colors cursor-pointer"
  >
                  <Bookmark
    size={14}
    className={bookmarkedIds.has("merch-10") ? "fill-[#FFA800] text-[#FFA800]" : "stroke-[2.2]"}
  />
                </button>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 pt-6 space-y-1">
                  <h3 className="font-bold text-xs sm:text-[13px] text-white leading-tight">
                    Moonlight Ears (Cosplay)
                  </h3>
                  <div>
                    <span className="bg-[#CCFBF1] text-[#0F766E] text-[8.5px] font-black px-2 py-0.2 rounded-full uppercase tracking-wider inline-block">
                      Cosplay
                    </span>
                  </div>
                </div>
              </div>

              {
    /* 3. Faction Pins Set */
  }
              <div
    onClick={() => setActiveModalItem({
      title: "Faction Pins Set",
      tag: "PRE-ORDER",
      tagStyle: "bg-[#BAE6FD] text-[#0369A1]",
      category: "Comics",
      categoryStyle: "bg-[#FFE4E6] text-[#BE123C]",
      image: "/src/assets/images/faction_pins_set_1790285590548.jpg",
      price: "$28.00",
      description: "Set of four zinc alloy hard enamel lapel pins with gold and antique silver plating, presented on a velvet collector box insert."
    })}
    className="relative rounded-[14px] overflow-hidden bg-stone-900 border border-[#CBD5E1]/60 shadow-xs cursor-pointer group aspect-[16/10]"
  >
                <img
    src="/src/assets/images/faction_pins_set_1790285590548.jpg"
    alt="Faction Pins Set"
    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
  />

                <div className="absolute top-2.5 left-2.5">
                  <span className="bg-[#BAE6FD] text-[#0369A1] text-[8.5px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                    PRE-ORDER
                  </span>
                </div>

                <button
    type="button"
    onClick={(e) => toggleBookmark(e, "merch-11")}
    className="absolute top-2.5 right-2.5 p-1 text-white hover:text-[#FFA800] transition-colors cursor-pointer"
  >
                  <Bookmark
    size={14}
    className={bookmarkedIds.has("merch-11") ? "fill-[#FFA800] text-[#FFA800]" : "stroke-[2.2]"}
  />
                </button>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 pt-6 space-y-1">
                  <h3 className="font-bold text-xs sm:text-[13px] text-white leading-tight">
                    Faction Pins Set
                  </h3>
                  <div>
                    <span className="bg-[#FFE4E6] text-[#BE123C] text-[8.5px] font-black px-2 py-0.2 rounded-full uppercase tracking-wider inline-block">
                      Comics
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {
    /* 5. SECTION 2: UPCOMING RELEASES */
  }
        <section className="space-y-3 pt-6 pb-8">
          {
    /* Header: Calendar Icon + UPCOMING RELEASES */
  }
          <div className="flex items-center gap-2">
            <h2 className="text-[15px] font-black uppercase tracking-tight font-titan text-[#171717]">
              UPCOMING RELEASES
            </h2>
          </div>

          {
    /* Table Container */
  }
          <div className="bg-white rounded-[14px] border border-[#E5E7EB] overflow-hidden shadow-2xs">
            {
    /* Table Header */
  }
            <div className="grid grid-cols-12 px-4 py-2.5 border-b border-[#F3F4F6] text-[11px] font-bold text-[#737373]">
              <div className="col-span-6 sm:col-span-5">Title</div>
              <div className="col-span-2 text-center">Type</div>
              <div className="col-span-2 text-center">Category</div>
              <div className="col-span-2 sm:col-span-3 text-right pr-6">Release Date</div>
            </div>

            {
    /* Table Rows */
  }
            <div className="divide-y divide-[#F3F4F6]">
              {UPCOMING_RELEASES.map((item) => <div
    key={item.id}
    className="grid grid-cols-12 px-4 py-3 items-center hover:bg-stone-50/70 transition-colors"
  >
                  {
    /* Left: Thumbnail + Title + Subtitle */
  }
                  <div className="col-span-6 sm:col-span-5 flex items-center gap-3 min-w-0 pr-2">
                    <div className="w-14 h-10 rounded-[6px] overflow-hidden shrink-0 bg-stone-900 shadow-2xs">
                      <img
    src={item.image}
    alt={item.title}
    className="w-full h-full object-cover"
  />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs sm:text-[13px] text-[#171717] truncate leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-[#737373] truncate mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  {
    /* Type Badge */
  }
                  <div className="col-span-2 text-center">
                    <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full inline-block ${item.typeStyle}`}>
                      {item.type}
                    </span>
                  </div>

                  {
    /* Category Badge */
  }
                  <div className="col-span-2 text-center">
                    <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full inline-block ${item.categoryStyle}`}>
                      {item.category}
                    </span>
                  </div>

                  {
    /* Release Date + Bookmark */
  }
                  <div className="col-span-2 sm:col-span-3 flex items-center justify-end gap-3 text-right">
                    <span className="text-[11px] text-[#737373] font-medium whitespace-nowrap">
                      {item.releaseDate}
                    </span>
                    <button
    type="button"
    onClick={(e) => toggleBookmark(e, item.id)}
    className="text-stone-400 hover:text-black p-0.5 cursor-pointer"
    title="Bookmark"
  >
                      <Bookmark
    size={14}
    className={bookmarkedIds.has(item.id) ? "fill-[#FFA800] text-[#FFA800]" : "stroke-[1.8]"}
  />
                    </button>
                  </div>
                </div>)}
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
    /* PRODUCT / RELEASE DETAIL MODAL */
  }
      {activeModalItem && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-[#181A20] border border-[#2B2F3D] text-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl p-5 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {activeModalItem.tag && <span className={`text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase ${activeModalItem.tagStyle}`}>
                    {activeModalItem.tag}
                  </span>}
                {activeModalItem.category && <span className={`text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase ${activeModalItem.categoryStyle}`}>
                    {activeModalItem.category}
                  </span>}
              </div>
              <button
    type="button"
    onClick={() => setActiveModalItem(null)}
    className="text-stone-400 hover:text-white cursor-pointer"
  >
                <X size={18} />
              </button>
            </div>

            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-black">
              <img
    src={activeModalItem.image}
    alt={activeModalItem.title}
    className="w-full h-full object-cover"
  />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">{activeModalItem.title}</h3>
                {activeModalItem.price && <span className="font-extrabold text-[#FFA800] text-sm">
                    {activeModalItem.price}
                  </span>}
              </div>
              {activeModalItem.description && <p className="text-xs text-stone-300 leading-relaxed pt-1">
                  {activeModalItem.description}
                </p>}
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
    type="button"
    onClick={() => setActiveModalItem(null)}
    className="px-4 py-1.5 border border-stone-700 text-xs font-semibold rounded-lg text-stone-300 hover:text-white"
  >
                Close
              </button>
              <button
    type="button"
    onClick={() => {
      setToastMessage(`Added ${activeModalItem.title} to wishlist!`);
      setActiveModalItem(null);
      setTimeout(() => setToastMessage(null), 2500);
    }}
    className="px-5 py-1.5 bg-[#FFA800] hover:bg-[#FFB51A] text-black font-extrabold text-xs rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5"
  >
                <Sparkles size={13} />
                <span>Pre-Order / Wishlist</span>
              </button>
            </div>
          </div>
        </div>}
    </div>;
};
export {
  MerchandisePage
};
