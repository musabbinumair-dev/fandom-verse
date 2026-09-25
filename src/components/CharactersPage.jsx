import { useState } from "react";
import {
  Users,
  ChevronRight,
  Sparkles,
  Filter,
  RotateCcw,
  Bookmark,
  Eye,
  Star,
  Shield,
  Moon,
  Gamepad2,
  BookOpen,
  X,
  Check,
  Search
} from "lucide-react";
const CHARACTERS_DATA = [
  // ROW 1
  {
    id: "char-1",
    name: "Kael Vex",
    image: "/src/assets/images/kael_vex_1790281397401.jpg",
    fandom: "Star Chasers",
    fandomIcon: "star",
    category: "ANIME",
    categoryBg: "bg-[#FCE7F3] text-[#171717]",
    bio: "A dreamer with a troubled past, Kael fights for a better tomorrow among the stars.",
    lore: "Born on the outer rim colony of Vespera, Kael discovered the dormant Celestial Core embedded in his ancestral starship. Now chased by the Galactic Coalition, he searches the cosmos for the forgotten sanctuary of the First Voyagers.",
    role: "Starship Navigator & Cosmic Blade",
    abilities: ["Starlight Resonance", "Gravitational Rift", "Hyper-spatial Reflexes"]
  },
  {
    id: "char-2",
    name: "Orion Steel",
    image: "/src/assets/images/orion_steel_1790281419734.jpg",
    fandom: "Neon Knights",
    fandomIcon: "shield",
    category: "GAMING",
    categoryBg: "bg-[#DCFCE7] text-[#171717]",
    bio: "A skilled warrior with a mysterious past, Orion fights to protect the realm.",
    lore: "The sole remaining guardian of the Neo-Aegis protocol, Orion wears power armor forged from celestial alloys. His memories were fragmented during the Fall of Sector 7, driving his relentless quest to uncover his origin.",
    role: "Heavy Vanguard Defender",
    abilities: ["Plasma Barrier", "Overcharge Slam", "Cybernetic Aegis"]
  },
  {
    id: "char-3",
    name: "Seraphine Vale",
    image: "/src/assets/images/seraphine_vale_1790281437502.jpg",
    fandom: "Shadow Realm",
    fandomIcon: "moon",
    category: "MOVIES",
    categoryBg: "bg-[#E0F2FE] text-[#171717]",
    bio: "A former thief turned hero, Seraphine now fights for a brighter future.",
    lore: "Once whispered to be the phantom lockpick of the Undercity, Seraphine stumbled upon an obsidian prism containing primordial flame. She channeled the ember to save orphans from abyssal demons, irrevocably altering her path.",
    role: "Crimson Pyromancer & Rogue",
    abilities: ["Ember Step", "Shadow Flame Cascade", "Ignited Daggers"]
  },
  {
    id: "char-4",
    name: "Jace Rivers",
    image: "/src/assets/images/jace_rivers_1790281454743.jpg",
    fandom: "Mystic Legends",
    fandomIcon: "spiral",
    category: "TV SHOWS",
    categoryBg: "bg-[#F3E8FF] text-[#171717]",
    bio: "A quiet boy with a dangerous secret, Jace uncovers the truth about his world.",
    lore: "An archivist student by day, Jace secretly deciphers the runes that hold the fabric of spacetime together. When an anomaly threatens to unravel the metropolis, his forbidden kinetic sorcery awakens.",
    role: "Runic Cipher Specialist",
    abilities: ["Temporal Glitch", "Kinetic Pulse", "Rune of Clairvoyance"]
  },
  // ROW 2
  {
    id: "char-5",
    name: "Lumi",
    image: "/src/assets/images/lumi_idol_1790281470774.jpg",
    fandom: "Star Chasers",
    fandomIcon: "star",
    category: "K-POP",
    categoryBg: "bg-[#FCE7F3] text-[#171717]",
    bio: "With a voice like starlight, Lumi turns dreams into reality on stage.",
    lore: "A prodigy singer from Seoul whose harmonious vibrations can calm violent astral storms. Supported by millions of fans worldwide, she channels positive psychic energy to shield humanity from cosmic anomalies.",
    role: "Lead Vocalist & Light Harmonizer",
    abilities: ["Sonic Starlight Wave", "Aura Euphoria", "Harmonic Shield"]
  },
  {
    id: "char-6",
    name: "Rex Valentine",
    image: "/src/assets/images/rex_valentine_1790281490056.jpg",
    fandom: "Crimson Order",
    fandomIcon: "shield",
    category: "COMICS",
    categoryBg: "bg-[#CFFAFE] text-[#171717]",
    bio: "A symbol of hope, Rex fights for justice in a world full of chaos.",
    lore: "Commander of the Crimson Vanguard, Rex carries the legendary solar blade passed down through forty generations. He stands as an unshakable bastion against corrupt syndicates.",
    role: "Vanguard Paladin & Leader",
    abilities: ["Solar Cleave", "Shield of the Just", "Unyielding Resolve"]
  },
  {
    id: "char-7",
    name: "Sora Hayashi",
    image: "/src/assets/images/sora_hayashi_1790281509190.jpg",
    fandom: "Moonlit Pages",
    fandomIcon: "book",
    category: "MANGA",
    categoryBg: "bg-[#EDE9FE] text-[#171717]",
    bio: "Determined and fearless, Sora's journey is one of courage and self-discovery.",
    lore: "Apprenticed to the Ghost Blade Master atop Mount Tsukimi, Sora learned to slice through spiritual miasma with pure white steel. His journey tests whether mercy or judgment prevails.",
    role: "Moonlit Kenshi (Swordsman)",
    abilities: ["Crescent Moon Strike", "Phantom Petal Dash", "Soul Reflection"]
  },
  {
    id: "char-8",
    name: "Nix Ember",
    image: "/src/assets/images/nix_ember_1790281532486.jpg",
    fandom: "Pixel Warriors",
    fandomIcon: "game",
    category: "COSPLAY",
    categoryBg: "bg-[#FFE4E6] text-[#171717]",
    bio: "Creative, bold, and always ready for the next challenge in costume.",
    lore: "World championship prop maker and virtual idol who builds fully functional cybernetic battle-gear for conventions. Her viral showcases have inspired youth across five continents.",
    role: "Cyberpunk Artificer & Streamer",
    abilities: ["Holo-Suit Overdrive", "Neon EMP Trap", "Pro-Player Reflexes"]
  },
  // ROW 3
  {
    id: "char-9",
    name: "Ryo Takeda",
    image: "/src/assets/images/ryo_takeda_1790281551040.jpg",
    fandom: "Star Chasers",
    fandomIcon: "star",
    category: "ANIME",
    categoryBg: "bg-[#FCE7F3] text-[#171717]",
    bio: "A skilled swordsman with a kind heart, Ryo fights to protect what matters.",
    lore: "Wandering the frontier moons in his family haori, Ryo protects humble farmers from space raiders. His calm demeanor belies lightning-fast iaido strikes that can cut through blast doors.",
    role: "Wandering Ronin",
    abilities: ["Solar Flash Draw", "Windbreak Stance", "Protective Ki"]
  },
  {
    id: "char-10",
    name: "Zane Rook",
    image: "/src/assets/images/zane_rook_1790281570770.jpg",
    fandom: "Neon Knights",
    fandomIcon: "shield",
    category: "GAMING",
    categoryBg: "bg-[#DCFCE7] text-[#171717]",
    bio: "A brilliant strategist, Zane leads his team to victory in every battle.",
    lore: "Master hacker and electronic warfare specialist who predicts combat moves fifteen seconds before they occur. His neural headset allows him to coordinate orbital strikes while sip-drinking boba.",
    role: "Tactical Cyber Specialist",
    abilities: ["System Override", "Drone Swarm Uplink", "Predictive Matrix"]
  },
  {
    id: "char-11",
    name: "Elara Voss",
    image: "/src/assets/images/elara_voss_1790281586127.jpg",
    fandom: "Shadow Realm",
    fandomIcon: "moon",
    category: "MOVIES",
    categoryBg: "bg-[#E0F2FE] text-[#171717]",
    bio: "A mysterious loner, Elara's past holds the key to a greater destiny.",
    lore: "Scouting the twilight borders of the ruined empire, Elara wields a bow strung with twilight silk. Her silent arrows silence corrupted titans before their roars can summon reinforcements.",
    role: "Twilight Ranger & Tracker",
    abilities: ["Shadow Arrow", "Veil of Nightfall", "Silent Stalker"]
  },
  {
    id: "char-12",
    name: "Kairo Hale",
    image: "/src/assets/images/kairo_hale_1790281602183.jpg",
    fandom: "Mystic Legends",
    fandomIcon: "spiral",
    category: "TV SHOWS",
    categoryBg: "bg-[#F3E8FF] text-[#171717]",
    bio: "Charming and ambitious, Kairo navigates a world of secrets and power.",
    lore: "A high-society diplomatic emissary who secretly commands the clandestine Veil Bureau. Known for outsmarting warlords with smiles and contracts written in invisible alchemical ink.",
    role: "Diplomatic Strategist",
    abilities: ["Mind Web Illusion", "Silver Tongue Hex", "Teleport Contract"]
  },
  // ROW 4
  {
    id: "char-13",
    name: "Sae Jihyun",
    image: "/src/assets/images/sae_jihyun_1790281620416.jpg",
    fandom: "Star Chasers",
    fandomIcon: "star",
    category: "K-POP",
    categoryBg: "bg-[#FCE7F3] text-[#171717]",
    bio: "A rising star with a powerful voice, Sae inspires millions with her music.",
    lore: "Vocal powerhouse whose live broadcasts reach across star systems. She uses her influential platform to fund refugee sanctuaries and broadcast hope across war-torn quadrants.",
    role: "Vocal Sensation & Ambassador",
    abilities: ["Resonant High Note", "Healing Melody", "Starfire Flash"]
  },
  {
    id: "char-14",
    name: "Viktor Cross",
    image: "/src/assets/images/viktor_cross_1790281640638.jpg",
    fandom: "Crimson Order",
    fandomIcon: "shield",
    category: "COMICS",
    categoryBg: "bg-[#CFFAFE] text-[#171717]",
    bio: "A vigilante driven by justice, Viktor never backs down from a fight.",
    lore: "Operating in the darkest shadows of Gotham-esque mega-cities, Viktor wears a ballistic cowl with glowing thermal optics. His unrelenting pursuit of crime bosses has made him a legendary myth.",
    role: "Urban Vigilante",
    abilities: ["Grapple Strike", "Thermite Blast", "Intimidation Aura"]
  },
  {
    id: "char-15",
    name: "Renji Sato",
    image: "/src/assets/images/renji_sato_1790281655238.jpg",
    fandom: "Moonlit Pages",
    fandomIcon: "book",
    category: "MANGA",
    categoryBg: "bg-[#EDE9FE] text-[#171717]",
    bio: "A quiet genius, Renji's mind is as sharp as his blade.",
    lore: "A prodigy tactician from the Imperial Academy who retired to study ancient scrolls in seclusion. When warlords threaten peace, he picks up his single-edged sword to defend innocence.",
    role: "Master Strategist & Blade Scholar",
    abilities: ["Ten-Fold Strike", "Tactical Analysis", "Absolute Focus"]
  },
  {
    id: "char-16",
    name: "Kira Soleil",
    image: "/src/assets/images/kira_soleil_1790281669840.jpg",
    fandom: "Pixel Warriors",
    fandomIcon: "game",
    category: "COSPLAY",
    categoryBg: "bg-[#FFE4E6] text-[#171717]",
    bio: "Full of energy and creativity, Kira brings her favorite characters to life.",
    lore: "An energetic costumer and performer whose joyful energy lights up every convention hall. She crafts hyper-realistic animal kinetic armor that responds to emotional brainwaves.",
    role: "Kitsune Cosplay Artificer",
    abilities: ["Spirit Fox Agility", "Prismatic Tail Whip", "Cheering Aura"]
  },
  // ROW 5 (Making total 24 characters exactly as indicated by counter)
  {
    id: "char-17",
    name: "Caelum Drake",
    image: "/src/assets/images/luffy_avatar_1790269807034.jpg",
    fandom: "Star Chasers",
    fandomIcon: "star",
    category: "ANIME",
    categoryBg: "bg-[#FCE7F3] text-[#171717]",
    bio: "Captain of the Astral Voyager, Caelum laughs in the face of impossible galactic odds.",
    lore: "Renowned explorer whose crew charts undiscovered wormholes across the Andromeda arm.",
    role: "Cosmic Captain",
    abilities: ["Aether Cannon", "Fleet Rally", "Nebula Drift"]
  },
  {
    id: "char-18",
    name: "Nova Sinclair",
    image: "/src/assets/images/elden_ring_thumb_1790269858443.jpg",
    fandom: "Neon Knights",
    fandomIcon: "shield",
    category: "GAMING",
    categoryBg: "bg-[#DCFCE7] text-[#171717]",
    bio: "Master of plasma artillery and siege tactics, Nova breaks any defensive fortress.",
    lore: "Former head engineer for Neo-Tokyo who converted heavy machinery into devastating defense units.",
    role: "Siege Artificer",
    abilities: ["Plasma Mortar", "Fortress Protocol", "Titan Shield"]
  },
  {
    id: "char-19",
    name: "Vespera Thorne",
    image: "/src/assets/images/dune_part_two_1790270217047.jpg",
    fandom: "Shadow Realm",
    fandomIcon: "moon",
    category: "MOVIES",
    categoryBg: "bg-[#E0F2FE] text-[#171717]",
    bio: "Keeper of the obsidian dunes, Vespera commands the whispering sands of eternity.",
    lore: "High priestess of the sunken desert temples who safeguards ancient prophetic scrolls.",
    role: "Desert Seer",
    abilities: ["Sandstorm Veil", "Echo of the Past", "Mirage Blade"]
  },
  {
    id: "char-20",
    name: "Aiden Cross",
    image: "/src/assets/images/stranger_things_thumb_1790269900192.jpg",
    fandom: "Mystic Legends",
    fandomIcon: "spiral",
    category: "TV SHOWS",
    categoryBg: "bg-[#F3E8FF] text-[#171717]",
    bio: "Investigator into unexplained paranormal breaches, Aiden leaves no stone unturned.",
    lore: "Special investigator for the Department of Anomalies who survived contact with the Upside.",
    role: "Occult Detective",
    abilities: ["Psychic Ping", "Runic Ward", "Aura Sight"]
  },
  {
    id: "char-21",
    name: "Minho Park",
    image: "/src/assets/images/bts_icons_1790277885253.jpg",
    fandom: "Star Chasers",
    fandomIcon: "star",
    category: "K-POP",
    categoryBg: "bg-[#FCE7F3] text-[#171717]",
    bio: "Choreography genius whose stage presence hypnotizes stadiums across continents.",
    lore: "Global dancer and music producer whose rhythmic synchronization controls elemental beats.",
    role: "Lead Dancer & Composer",
    abilities: ["Beat Sync", "Flash Step", "Stadium Reverberation"]
  },
  {
    id: "char-22",
    name: "Damian Vance",
    image: "/src/assets/images/spiderman_comic_1790270342039.jpg",
    fandom: "Crimson Order",
    fandomIcon: "shield",
    category: "COMICS",
    categoryBg: "bg-[#CFFAFE] text-[#171717]",
    bio: "Agile rooftop acrobat with web-like neural tethers protecting ordinary citizens.",
    lore: "Vigilante chemist who patented elastic polymers to incapacitate villains without harm.",
    role: "Webbed Guardian",
    abilities: ["Neural Tether", "Wall Run", "Acrobatic Counter"]
  },
  {
    id: "char-23",
    name: "Kaede Shiro",
    image: "/src/assets/images/gojo_satoru_1790270284794.jpg",
    fandom: "Moonlit Pages",
    fandomIcon: "book",
    category: "MANGA",
    categoryBg: "bg-[#EDE9FE] text-[#171717]",
    bio: "Unmatched sorcerer possessing the limitless sight of infinity and boundless energy.",
    lore: "The strongest sorcerer of modern times whose mere presence maintains global balance.",
    role: "Special Grade Sorcerer",
    abilities: ["Limitless Barrier", "Hollow Technique", "Domain Expansion"]
  },
  {
    id: "char-24",
    name: "Maya Spark",
    image: "/src/assets/images/pikachu_explainer_1790279251212.jpg",
    fandom: "Pixel Warriors",
    fandomIcon: "game",
    category: "COSPLAY",
    categoryBg: "bg-[#FFE4E6] text-[#171717]",
    bio: "Electric cosplayer bringing joyful sparks and yellow creature warmth to thousands of fans.",
    lore: "Costume technician celebrated for integrating fiber-optic lightning and battery packs into cute suits.",
    role: "Electric Mascot Specialist",
    abilities: ["Thunderbolt Charm", "Static Charge", "Warm Mascot Hug"]
  }
];
const CharactersPage = ({
  onNavigateHome,
  onOpenCharacter
}) => {
  const [fandomFilters, setFandomFilters] = useState({
    "Star Chasers": false,
    "Neon Knights": false,
    "Shadow Realm": false,
    "Mystic Legends": false,
    "Pixel Warriors": false
  });
  const [categoryFilters, setCategoryFilters] = useState({
    "Anime": false,
    "Gaming": false,
    "Movies": false,
    "TV Shows": false,
    "K-Pop": false,
    "Comics": false,
    "Manga": false,
    "Cosplay": false
  });
  const [bookmarkedIds, setBookmarkedIds] = useState(/* @__PURE__ */ new Set(["char-1"]));
  const [toastMessage, setToastMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const toggleFandom = (fandom) => {
    setFandomFilters((prev) => ({
      ...prev,
      [fandom]: !prev[fandom]
    }));
  };
  const toggleCategory = (category) => {
    setCategoryFilters((prev) => ({
      ...prev,
      [category]: !prev[category]
    }));
  };
  const handleClearFilters = () => {
    setFandomFilters({
      "Star Chasers": false,
      "Neon Knights": false,
      "Shadow Realm": false,
      "Mystic Legends": false,
      "Pixel Warriors": false
    });
    setCategoryFilters({
      "Anime": false,
      "Gaming": false,
      "Movies": false,
      "TV Shows": false,
      "K-Pop": false,
      "Comics": false,
      "Manga": false,
      "Cosplay": false
    });
  };
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
  const activeFandoms = Object.keys(fandomFilters).filter((k) => fandomFilters[k]);
  const activeCategories = Object.keys(categoryFilters).filter((k) => categoryFilters[k]);
  const filteredCharacters = CHARACTERS_DATA.filter((char) => {
    const fandomMatch = activeFandoms.length === 0 || activeFandoms.includes(char.fandom);
    const categoryMatch = activeCategories.length === 0 || activeCategories.some((cat) => cat.toUpperCase() === char.category);
    const searchMatch = !searchQuery.trim() || char.name.toLowerCase().includes(searchQuery.toLowerCase()) || char.bio.toLowerCase().includes(searchQuery.toLowerCase());
    return fandomMatch && categoryMatch && searchMatch;
  });
  const renderFandomIcon = (iconType) => {
    switch (iconType) {
      case "star":
        return <Star size={12} className="fill-[#FFA800] text-[#FFA800] shrink-0" />;
      case "shield":
        return <Shield size={12} className="text-[#3B82F6] shrink-0" />;
      case "moon":
        return <Moon size={12} className="fill-[#171717] text-[#171717] shrink-0" />;
      case "spiral":
        return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#171717" strokeWidth="2.5" className="shrink-0">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a7 7 0 0 1 7 7c0 4-3 7-7 7s-7-3-7-7a5 5 0 0 1 5-5c3 0 5 2 5 5s-2 5-5 5" />
          </svg>;
      case "game":
        return <Gamepad2 size={12} className="text-[#171717] shrink-0" />;
      case "book":
        return <BookOpen size={12} className="text-[#171717] shrink-0" />;
      default:
        return <Star size={12} className="fill-[#FFA800] text-[#FFA800] shrink-0" />;
    }
  };
  return <div className="w-full bg-[#FAF8F5] min-h-full py-6 px-4 sm:px-6 select-none font-sans">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* PAGE HEADER TITLE */}
        <div className="pt-2 pb-1">
          <h1 className="text-2xl sm:text-3.5xl font-black tracking-tight uppercase font-titan text-[#171717]">
            CHARACTERS
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-[#7A6F64] mt-0.5">
            Discover and explore your favorite characters from across all fandoms.
          </p>
        </div>

        {/* Small Page-specific Search Bar */}
        <div className="max-w-md w-full relative">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#737373] pointer-events-none">
            <Search size={14} />
          </span>
          <input
            type="text"
            placeholder="Search characters..."
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
    /* TOAST NOTIFICATION */
  }
        {toastMessage && <div className="fixed bottom-6 right-6 z-50 bg-[#1A1D24] border border-[#2B2F3D] text-white text-xs px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-150">
            <Check size={14} className="text-[#FFA800]" />
            <span>{toastMessage}</span>
          </div>}

        {
    /* 3. MAIN CONTENT: LEFT FILTER SIDEBAR + RIGHT 4-COLUMN CARDS GRID */
  }
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {
            /* LEFT 3 COLUMNS: FILTER SIDEBAR */
          }
          <aside className="lg:col-span-3 space-y-5 bg-transparent lg:sticky lg:top-24">
            {
              /* Filter by Fandom */
            }
            <div className="space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#171717]">
                <Sparkles size={14} className="text-[#171717]" />
                <span>Filter by Fandom</span>
              </div>

              <div className="space-y-2">
                {[
                  "Star Chasers",
                  "Neon Knights",
                  "Shadow Realm",
                  "Mystic Legends",
                  "Pixel Warriors"
                ].map((fandom) => {
                  const isChecked = !!fandomFilters[fandom];
                  return (
                    <div
                      key={fandom}
                      onClick={() => toggleFandom(fandom)}
                      className="flex items-center gap-2.5 text-[12px] text-[#404040] hover:text-[#171717] font-medium cursor-pointer"
                    >
                      <div
                        className={`w-4 h-4 rounded-none flex items-center justify-center transition-all ${isChecked ? "bg-[#FFA800] border border-[#FFA800]" : "bg-white border border-[#D4D4D8] hover:border-[#A1A1AA]"}`}
                      >
                        {isChecked && <Check size={11} className="text-white stroke-[3.5]" />}
                      </div>
                      <span>{fandom}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {
              /* Filter by Category */
            }
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#171717]">
                <Filter size={14} className="text-[#171717]" />
                <span>Filter by Category</span>
              </div>

              <div className="space-y-2">
                {[
                  "Anime",
                  "Gaming",
                  "Movies",
                  "TV Shows",
                  "K-Pop",
                  "Comics",
                  "Manga",
                  "Cosplay"
                ].map((cat) => {
                  const isChecked = !!categoryFilters[cat];
                  return (
                    <div
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className="flex items-center gap-2.5 text-[12px] text-[#404040] hover:text-[#171717] font-medium cursor-pointer"
                    >
                      <div
                        className={`w-4 h-4 rounded-none flex items-center justify-center transition-all ${isChecked ? "bg-[#FFA800] border border-[#FFA800]" : "bg-white border border-[#D4D4D8] hover:border-[#A1A1AA]"}`}
                      >
                        {isChecked && <Check size={11} className="text-white stroke-[3.5]" />}
                      </div>
                      <span>{cat}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {
              /* Clear filters Button (Exact yellow rounded-xl button) */
            }
            <div className="pt-2">
              <button
                type="button"
                onClick={handleClearFilters}
                className="w-full bg-[#FFA800] hover:bg-[#FFB51A] active:scale-[0.98] text-black font-extrabold text-[12px] py-2 px-3.5 rounded-none flex items-center justify-center gap-2 shadow-[0_1px_2px_rgba(0,0,0,0.06)] transition-all cursor-pointer"
              >
                <RotateCcw size={13} className="stroke-[2.5]" />
                <span>Clear filters</span>
              </button>
            </div>
          </aside>

          {
    /* RIGHT 9 COLUMNS: CHARACTERS CARDS */
  }
          <main className="lg:col-span-9 space-y-3.5">
            {
    /* Header: Showing 24 characters */
  }
            <div className="text-[12px] text-[#737373] font-medium">
              Showing {filteredCharacters.length} {filteredCharacters.length === 1 ? "character" : "characters"}
            </div>

            {
    /* 4-Column Grid */
  }
            {filteredCharacters.length === 0 ? <div className="text-center py-20 bg-white rounded-none border border-[#E5E7EB] p-8 shadow-xs">
                <Users size={36} className="mx-auto mb-3 text-stone-400 stroke-1" />
                <h3 className="text-sm font-bold text-stone-800">No characters match the selected filters</h3>
                <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                  Try adjusting your checkboxes or click Clear filters to reset the list.
                </p>
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="mt-4 px-4 py-2 bg-[#FFA800] text-black font-bold text-xs rounded-none hover:brightness-105 transition cursor-pointer"
                >
                  Clear filters
                </button>
              </div> : <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredCharacters.map((char) => {
                  const isBookmarked = bookmarkedIds.has(char.id);
                  return (
                    <div
                      key={char.id}
                      onClick={() => onOpenCharacter && onOpenCharacter(char)}
                      className="bg-white rounded-none overflow-hidden border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-200 flex flex-col justify-between group cursor-pointer"
                    >
                      {/* Top Character Image with Bookmark Button */}
                      <div className="relative aspect-square w-full overflow-hidden bg-[#181A20]">
                        <img
                          src={char.image}
                          alt={char.name}
                          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
                          loading="lazy"
                        />

                        {/* Bookmark Button Top Right */}
                        <button
                          type="button"
                          onClick={(e) => handleToggleBookmark(e, char.id)}
                          className="absolute top-2.5 right-2.5 w-[26px] h-[26px] rounded-none bg-black/50 hover:bg-black/75 backdrop-blur-[2px] flex items-center justify-center text-white transition-colors cursor-pointer shadow-xs"
                          title={isBookmarked ? "Bookmarked" : "Save bookmark"}
                        >
                          <Bookmark
                            size={13}
                            className={isBookmarked ? "fill-[#FFA800] text-[#FFA800]" : "text-white stroke-[2]"}
                          />
                        </button>
                      </div>

                      {/* Content Section */}
                      <div className="p-3.5 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Character Name */}
                          <h3 className="font-bold text-[15px] text-[#171717] tracking-tight leading-snug truncate">
                            {char.name}
                          </h3>

                          {/* Fandom Row */}
                          <div className="flex items-center gap-1.5 text-[11px] text-[#737373] font-medium mt-1">
                            {renderFandomIcon(char.fandomIcon)}
                            <span className="truncate">{char.fandom}</span>
                          </div>

                          {/* Category Badge */}
                          <div className="mt-2 mb-2">
                            <span
                              className={`text-[9px] font-black px-2 py-0.5 rounded-none uppercase tracking-wider inline-block ${char.categoryBg}`}
                            >
                              {char.category}
                            </span>
                          </div>

                          {/* Bio Description (Exact 3-line clamp) */}
                          <p className="text-[11px] text-[#737373] font-normal leading-[1.4] line-clamp-3 min-h-[44px]">
                            {char.bio}
                          </p>
                        </div>

                        {/* View Profile Button (Exact matching dark #181A20 pill) */}
                        <div className="pt-3">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onOpenCharacter) onOpenCharacter(char);
                            }}
                            className="w-full bg-[#181A20] hover:bg-[#252834] active:scale-[0.98] text-white font-bold text-[12px] py-2 px-3 rounded-none flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Eye size={13} className="stroke-[2.2]" />
                            <span>View profile</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>}
          </main>
        </div>
      </div>
    </div>;
};
export {
  CHARACTERS_DATA,
  CharactersPage
};
