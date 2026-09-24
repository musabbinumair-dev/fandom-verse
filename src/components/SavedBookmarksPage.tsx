import React, { useState } from 'react';
import { Plus, Check, ChevronDown, User, Sparkles, FolderPlus, ArrowLeft, Bookmark } from 'lucide-react';
import { NewsStory, WikiItem } from '../data/fandomData';

// Pixelated Heart Inside Flame graphic matching Screenshot_20260923-211212.jpg
export const PixelFlameHeart: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer Pixelated Flame (#fa005a) */}
      <path
        d="M11 2h2v2h-2V2zm-2 2h2v2H9V4zm6 0h-2v2h2V4zm-6 2H7v2h2V6zm8 0h-2v2h2V6zm-8 2H5v4h2V8zm10 0h-2v4h2V8zm-12 4H3v4h2v-4zm14 0h-2v4h2v-4zm-14 4H3v2h2v-2zm14 0h-2v2h2v-2zm-12 2H5v2h2v-2zm10 0h-2v2h2v-2zm-8 2H7v2h2v-2zm6 0h-2v2h2v-2zm-4 2h2v2h-2v-2z"
        fill="#fa005a"
      />
      <rect x="7" y="8" width="10" height="10" fill="#fa005a" />
      <rect x="5" y="12" width="14" height="4" fill="#fa005a" />

      {/* Inner Pixelated Heart (#ffd836 / #facc15) */}
      <rect x="10" y="12" width="2" height="2" fill="#ffd836" />
      <rect x="12" y="12" width="2" height="2" fill="#ffd836" />
      <rect x="9" y="11" width="2" height="2" fill="#ffd836" />
      <rect x="13" y="11" width="2" height="2" fill="#ffd836" />
      <rect x="9" y="12" width="1" height="2" fill="#ffd836" />
      <rect x="14" y="12" width="1" height="2" fill="#ffd836" />
      <rect x="10" y="14" width="4" height="1" fill="#ffd836" />
      <rect x="11" y="15" width="2" height="1" fill="#ffd836" />
    </svg>
  );
};

// Fandom circular user avatar icon matching Screenshot_20260923-211212~2.jpg
export const FandomAvatarIcon: React.FC<{ customImage?: string }> = ({ customImage }) => {
  if (customImage) {
    return (
      <img
        src={customImage}
        alt="Avatar"
        className="w-4 h-4 rounded-full object-cover shrink-0 border border-slate-200"
      />
    );
  }
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="shrink-0 text-slate-700">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="9" r="3.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M6.5 18.5C7.8 15.8 9.7 14.5 12 14.5C14.3 14.5 16.2 15.8 17.5 18.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
};

export interface CollectionItem {
  id: string;
  title: string;
  itemCount: number;
  author: string;
  avatarIcon?: string;
  image: string;
  isQuickSaves?: boolean;
  isOwn?: boolean;
  category?: string;
  items?: { title: string; category: string; description: string }[];
}

const INITIAL_COLLECTIONS: CollectionItem[] = [
  {
    id: 'pokemon-family',
    title: 'Pokémon Family',
    itemCount: 10,
    author: 'DecisivePelican695',
    image: '/src/assets/images/pokemon_family_grid_1790188678999.jpg',
    category: 'Gaming & Anime',
    items: [
      { title: 'Arbok & Poison Types', category: 'Kanto Species', description: 'Complete evolutions, regional movesets, and competitive battle strategies.' },
      { title: 'Nidoran Family Tree', category: 'Gender Evolutions', description: 'Moon stone divergence lore and early Generation 1 tournament usage.' },
      { title: 'Lapras Transport Lore', category: 'Ocean Lore', description: 'Silph Co. rescue event, Sing utility, and Gigantamax form.' },
      { title: 'Cloyster Defense Matrix', category: 'Shell Armor', description: 'Skill Link Shell Smash metagame analysis.' },
    ],
  },
  {
    id: 'pokemon-trainers',
    title: 'Pokemon',
    itemCount: 124,
    author: 'RenownedDove970',
    image: '/src/assets/images/pokemon_trainers_grid_1790188697828.jpg',
    category: 'Character Lore',
    items: [
      { title: 'Liko & Roy Horizons Journey', category: 'Anime Lore', description: 'Terapagos mystery pendant and Rising Volt Tacklers episodes.' },
      { title: 'N (Natural Harmonia Gropius)', category: 'Unova Lore', description: 'Team Plasma ideological clash, castle confrontation, and Zekrom bonding.' },
      { title: 'Red (Mt. Silver Legend)', category: 'Champions', description: 'The silent master at the summit of Johto and Pokémon Origins.' },
      { title: 'Poké Ball Mechanics & Rarity', category: 'Item Guide', description: 'Catch rate calculation formulas from Master Ball to Heavy Ball.' },
    ],
  },
  {
    id: 'best-characters',
    title: 'Best Top Characters Ever',
    itemCount: 64,
    author: 'Ultraman9000',
    avatarIcon: '/src/assets/images/halo_master_chief_1790180155350.jpg',
    image: '/src/assets/images/best_top_characters_1790188715557.jpg',
    category: 'Anime & Manga',
    items: [
      { title: 'Loid Forger (Twilight)', category: 'Spy x Family', description: 'WISE agent code name Twilight, Operation Strix objectives, and combat tactics.' },
      { title: 'Denji & Pochita', category: 'Chainsaw Man', description: 'Public Safety Devil Hunter contract and hybrid transformations.' },
      { title: 'Son Goku (Super Saiyan)', category: 'Dragon Ball', description: 'Iconic transformations from Namek to Ultra Instinct.' },
      { title: 'Yor Forger (Thorn Princess)', category: 'Garden Assassin', description: 'Ostania underworld combat mastery and Briar family lore.' },
    ],
  },
  {
    id: 'matteus-avatar',
    title: 'MATTEUS YAGO WINGERD',
    itemCount: 635,
    author: 'ProtectiveVulture119',
    image: '/src/assets/images/roblox_matteus_avatar_1790188659547.jpg',
    category: 'Roblox Avatars',
    items: [
      { title: 'Vintage Fedora & Striped Scarf Combo', category: 'UGC Items', description: 'Limited collectible accessory history and marketplace resale values.' },
      { title: 'Classic Trench & Combat Trousers', category: 'Custom Texture', description: 'Custom layered clothing outfit ID codes.' },
      { title: 'Steal An Egg Event Loadout', category: 'Game Setup', description: 'Optimized movement speed gear for pet catching raids.' },
    ],
  },
  {
    id: 'fandom-foods',
    title: 'Fandom Foods Drinks Potions And More',
    itemCount: 406,
    author: '24AnimeFan24',
    image: '/src/assets/images/garlic_bulb_food_1790188639547.jpg',
    category: 'Food & Cooking Lore',
    items: [
      { title: 'Garlic Butter Roast & Vampire Ward', category: 'Fantasy Cooking', description: 'Alchemical ingredient in Castlevania, Skyrim potions, and Ghibli feasts.' },
      { title: 'Ichiraku Ramen Special Recipe', category: 'Anime Cuisine', description: 'Rich miso pork broth, chashu slices, and Naruto narutomaki swirl.' },
      { title: 'Nuka-Cola Quantum Glowing Tonic', category: 'Gaming Drinks', description: 'Fallout radioactive isotope soft drink history and bottling caps lore.' },
      { title: 'Elixir of Giant Strength', category: 'D&D Alchemical', description: 'Hill giant fingernail brewing recipe and combat buffs.' },
    ],
  },
];

interface SavedBookmarksPageProps {
  savedStories: NewsStory[];
  onSelectStory: (story: NewsStory) => void;
  onRemoveSavedStory?: (storyId: string) => void;
}

export const SavedBookmarksPage: React.FC<SavedBookmarksPageProps> = ({
  savedStories,
  onSelectStory,
  onRemoveSavedStory,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'yours' | 'shared'>('all');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'recent' | 'name' | 'items'>('recent');
  
  // Followed collection IDs
  const [followedCollectionIds, setFollowedCollectionIds] = useState<Set<string>>(new Set());

  // Interactive Create Collection Modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Gaming & Anime');
  const [userCreatedCollections, setUserCreatedCollections] = useState<CollectionItem[]>([]);

  // Selected collection for detail view
  const [selectedCollection, setSelectedCollection] = useState<CollectionItem | null>(null);
  const [isQuickSavesModalOpen, setIsQuickSavesModalOpen] = useState(false);

  const handleToggleFollow = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFollowedCollectionIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newCol: CollectionItem = {
      id: `custom-${Date.now()}`,
      title: newTitle.trim(),
      itemCount: 0,
      author: 'You (FandomExplorer)',
      image: '/src/assets/images/one_piece_luffy_1790180189080.jpg',
      isOwn: true,
      category: newCategory,
      items: [],
    };

    setUserCreatedCollections([newCol, ...userCreatedCollections]);
    setNewTitle('');
    setIsCreateModalOpen(false);
  };

  // Filter collections based on pills
  let displayedExplore = INITIAL_COLLECTIONS;
  if (activeFilter === 'yours') {
    displayedExplore = userCreatedCollections;
  } else if (activeFilter === 'shared') {
    displayedExplore = INITIAL_COLLECTIONS.filter((c) => followedCollectionIds.has(c.id));
  } else {
    displayedExplore = [...userCreatedCollections, ...INITIAL_COLLECTIONS];
  }

  // Sort collections
  const sortedCollections = [...displayedExplore].sort((a, b) => {
    if (sortBy === 'name') return a.title.localeCompare(b.title);
    if (sortBy === 'items') return b.itemCount - a.itemCount;
    return 0;
  });

  const yourCollectionCount = 1 + userCreatedCollections.length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 select-none">
      {/* 
        1. Top Title Bar matching Screenshot_20260923-211212.jpg:
        Saved [BETA] on left, + ADD button on right
      */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <h1 className="text-2xl font-black text-[#11081f] tracking-tight">
            Saved
          </h1>
          <span className="bg-[#e2e1e7] text-slate-700 text-[10px] font-extrabold px-1.5 py-0.5 rounded tracking-wider uppercase">
            BETA
          </span>
        </div>

        {/* Dark Purple + ADD button */}
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-[#490c4f] hover:bg-[#3b083e] active:scale-95 text-white text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
        >
          <Plus size={15} strokeWidth={2.8} />
          <span>ADD</span>
        </button>
      </div>

      {/* 
        2. Filter Pills: All, Yours, Shared with you
      */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setActiveFilter('all')}
          className={`text-xs font-semibold px-3.5 py-1 rounded-full transition-all cursor-pointer ${
            activeFilter === 'all'
              ? 'bg-[#3f3e44] text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/60'
          }`}
        >
          All
        </button>

        <button
          onClick={() => setActiveFilter('yours')}
          className={`text-xs font-semibold px-3.5 py-1 rounded-full transition-all cursor-pointer ${
            activeFilter === 'yours'
              ? 'bg-[#3f3e44] text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/60'
          }`}
        >
          Yours
        </button>

        <button
          onClick={() => setActiveFilter('shared')}
          className={`text-xs font-semibold px-3.5 py-1 rounded-full transition-all cursor-pointer ${
            activeFilter === 'shared'
              ? 'bg-[#3f3e44] text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/60'
          }`}
        >
          Shared with you
        </button>
      </div>

      {/* 
        3. Subheader: "1 Collection" and "SORT ▾"
      */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 mb-4">
        <span className="text-xs font-bold text-slate-900">
          {activeFilter === 'yours' ? `${yourCollectionCount} Collections` : '1 Collection'}
        </span>

        {/* Sort Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="text-[11px] font-bold text-slate-700 hover:text-slate-950 flex items-center gap-1 tracking-wider uppercase cursor-pointer"
          >
            <span>SORT</span>
            <ChevronDown size={14} strokeWidth={2.5} />
          </button>

          {isSortOpen && (
            <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-20 text-xs">
              <button
                onClick={() => {
                  setSortBy('recent');
                  setIsSortOpen(false);
                }}
                className={`w-full text-left px-3 py-1.5 hover:bg-slate-50 font-medium ${
                  sortBy === 'recent' ? 'text-[#fa005a] font-bold' : 'text-slate-700'
                }`}
              >
                Recently Updated
              </button>
              <button
                onClick={() => {
                  setSortBy('name');
                  setIsSortOpen(false);
                }}
                className={`w-full text-left px-3 py-1.5 hover:bg-slate-50 font-medium ${
                  sortBy === 'name' ? 'text-[#fa005a] font-bold' : 'text-slate-700'
                }`}
              >
                Alphabetical (A-Z)
              </button>
              <button
                onClick={() => {
                  setSortBy('items');
                  setIsSortOpen(false);
                }}
                className={`w-full text-left px-3 py-1.5 hover:bg-slate-50 font-medium ${
                  sortBy === 'items' ? 'text-[#fa005a] font-bold' : 'text-slate-700'
                }`}
              >
                Most Items
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 
        4. Quick Saves Card matching Screenshot_20260923-211212.jpg:
        Dark plum box with pixelated heart inside flame logo
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-8">
        <div
          onClick={() => setIsQuickSavesModalOpen(true)}
          className="group bg-white rounded-lg overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          {/* Deep Plum Artwork Header */}
          <div className="w-full aspect-[16/10] bg-[#2b0230] flex items-center justify-center relative overflow-hidden group-hover:bg-[#34033b] transition-colors">
            <PixelFlameHeart className="w-18 h-18 drop-shadow-md group-hover:scale-110 transition-transform duration-200" />
          </div>

          {/* Card Body */}
          <div className="p-3">
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#fa005a] transition-colors">
              Quick Saves
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {savedStories.length} {savedStories.length === 1 ? 'item' : 'items'}
            </p>
          </div>
        </div>

        {/* User created collections in Yours filter */}
        {activeFilter === 'yours' && userCreatedCollections.map((col) => (
          <div
            key={col.id}
            onClick={() => setSelectedCollection(col)}
            className="group bg-white rounded-lg overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="w-full aspect-[16/10] bg-slate-900 overflow-hidden relative">
              <img
                src={col.image}
                alt={col.title}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform"
              />
            </div>
            <div className="p-3">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#fa005a] transition-colors">
                {col.title}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {col.itemCount} items
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 
        5. Explore Collections Section matching Screenshot_20260923-234858.png
      */}
      {activeFilter !== 'yours' && (
        <section className="border-t border-[#e2e1e7] pt-5 mt-6">
          <div className="mb-3.5">
            <h2 className="text-[15px] sm:text-[16px] font-bold text-[#1a191f] tracking-tight">
              Explore Collections
            </h2>
            <p className="text-[13px] text-[#5e5d67] mt-0.5">
              Get inspired by what others are collecting across Fandom.
            </p>
          </div>

          {/* 3-Column Grid matching Screenshot Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4.5 sm:gap-5">
            {sortedCollections.map((collection) => {
              const isFollowed = followedCollectionIds.has(collection.id);

              return (
                <div
                  key={collection.id}
                  onClick={() => setSelectedCollection(collection)}
                  className="group bg-white rounded-xl overflow-hidden border border-[#e5e4ea] shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
                >
                  {/* Image area with 16:10 aspect ratio filling width edge-to-edge */}
                  <div className="w-full aspect-[16/10] bg-white overflow-hidden flex items-center justify-center">
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                  </div>

                  {/* Card Info matching Screenshot_20260923-234858.png exactly */}
                  <div className="px-3.5 pt-2.5 pb-3.5 flex-1 flex flex-col justify-between">
                    {/* Row 1: Title (wraps naturally) + Minimalist + Icon */}
                    <div className="flex items-start justify-between gap-2 min-h-[36px]">
                      <h3 className="text-[14px] sm:text-[15px] font-bold text-[#141318] leading-[1.2] group-hover:text-[#fa005a] transition-colors">
                        {collection.title}
                      </h3>

                      {/* Exact minimalist + icon button from screenshot */}
                      <button
                        onClick={(e) => handleToggleFollow(e, collection.id)}
                        className={`text-[#141318] hover:text-[#fa005a] pt-0.5 shrink-0 transition-transform active:scale-90 cursor-pointer ${
                          isFollowed ? 'text-emerald-600' : ''
                        }`}
                        title={isFollowed ? 'Saved to your collections' : 'Add collection to your library'}
                      >
                        {isFollowed ? (
                          <Check size={18} strokeWidth={2.4} />
                        ) : (
                          <Plus size={20} strokeWidth={1.6} />
                        )}
                      </button>
                    </div>

                    {/* Row 2: Author in grey pill capsule badge + item count directly adjacent */}
                    <div className="flex items-center gap-2 mt-2.5">
                      {/* Pill Capsule Author Badge matching screenshot */}
                      <div className="inline-flex items-center gap-1.5 bg-[#e4e3e9] text-[#1c1b20] text-[11px] font-medium px-2.5 py-0.5 rounded-full shrink-0">
                        <FandomAvatarIcon customImage={collection.avatarIcon} />
                        <span className="truncate max-w-[130px] sm:max-w-[145px]">
                          {collection.author}
                        </span>
                      </div>

                      {/* Item count placed right next to the pill capsule */}
                      <span className="text-[11px] text-[#5e5d66] font-normal shrink-0">
                        {collection.itemCount} items
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 
        Interactive Modal 1: Quick Saves List Detail Modal
      */}
      {isQuickSavesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="bg-[#2b0230] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <PixelFlameHeart className="w-9 h-9" />
                <div>
                  <h3 className="text-lg font-bold">Quick Saves</h3>
                  <p className="text-xs text-white/70">
                    {savedStories.length} {savedStories.length === 1 ? 'article saved' : 'articles saved'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsQuickSavesModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-4 divide-y divide-slate-100">
              {savedStories.length === 0 ? (
                <div className="py-12 text-center text-slate-400">
                  <Bookmark size={36} className="mx-auto mb-2 opacity-40" />
                  <p className="text-sm font-semibold">No quick saves yet</p>
                  <p className="text-xs mt-1">Tap the bookmark icon on any news story or wiki to save it here.</p>
                </div>
              ) : (
                savedStories.map((story) => (
                  <div key={story.id} className="py-3 flex items-center justify-between gap-3">
                    <div
                      onClick={() => {
                        setIsQuickSavesModalOpen(false);
                        onSelectStory(story);
                      }}
                      className="flex-1 cursor-pointer hover:text-[#fa005a] transition-colors"
                    >
                      <span className="text-[10px] font-bold text-[#fa005a] uppercase">
                        {story.category}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 leading-snug mt-0.5">
                        {story.title}
                      </h4>
                      <span className="text-[10px] text-slate-400">{story.date}</span>
                    </div>

                    {onRemoveSavedStory && (
                      <button
                        onClick={() => onRemoveSavedStory(story.id)}
                        className="text-xs text-slate-400 hover:text-red-500 px-2 py-1 cursor-pointer"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* 
        Interactive Modal 2: Create New Collection Modal (+ ADD)
      */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#11081f]">Create New Collection</h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCollection} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Collection Name
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. My Favorite Anime Lore"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#fa005a]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#fa005a] bg-white"
                >
                  <option value="Gaming & Anime">Gaming & Anime</option>
                  <option value="Comics & Superheroes">Comics & Superheroes</option>
                  <option value="Movies & TV Shows">Movies & TV Shows</option>
                  <option value="Guides & Build Planners">Guides & Build Planners</option>
                  <option value="Roblox & Avatars">Roblox & Avatars</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="text-xs font-medium px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-xs font-bold px-4 py-2 rounded-lg bg-[#490c4f] hover:bg-[#3b083e] text-white shadow-xs cursor-pointer"
                >
                  Create Collection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 
        Interactive Modal 3: View Collection Items Detail Modal
      */}
      {selectedCollection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-150">
            {/* Header with image */}
            <div className="relative aspect-[16/9] w-full bg-slate-100 overflow-hidden">
              <img
                src={selectedCollection.image}
                alt={selectedCollection.title}
                className="w-full h-full object-contain p-2"
              />
              <button
                onClick={() => setSelectedCollection(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer shadow-md"
              >
                ✕
              </button>
            </div>

            {/* Info */}
            <div className="p-5 flex-1 overflow-y-auto">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-slate-900">
                  {selectedCollection.title}
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  {selectedCollection.itemCount} items
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-4 flex items-center gap-1.5">
                <User size={13} />
                Curated by <span className="font-semibold text-slate-700">{selectedCollection.author}</span>
              </p>

              {/* Items List */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Featured Bookmarks
                </h4>
                {selectedCollection.items && selectedCollection.items.length > 0 ? (
                  selectedCollection.items.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="text-[10px] font-bold text-[#fa005a] uppercase">
                        {item.category}
                      </span>
                      <h5 className="text-xs font-bold text-slate-900 mt-0.5">
                        {item.title}
                      </h5>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 italic py-4 text-center">
                    This collection is newly created. Save articles or wikis to add items here.
                  </p>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
              <button
                onClick={(e) => handleToggleFollow(e, selectedCollection.id)}
                className={`text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                  followedCollectionIds.has(selectedCollection.id)
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#490c4f] hover:bg-[#3b083e] text-white'
                }`}
              >
                {followedCollectionIds.has(selectedCollection.id) ? (
                  <>
                    <Check size={14} />
                    <span>Saved to Library</span>
                  </>
                ) : (
                  <>
                    <Plus size={14} />
                    <span>Save Collection</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setSelectedCollection(null)}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
