import React, { useState } from 'react';
import { 
  Plus, 
  ExternalLink, 
  Clock, 
  Edit3, 
  BookOpen, 
  Film, 
  Tv, 
  Music, 
  Book, 
  Gamepad2, 
  Sparkles,
  Check,
  AlertCircle,
  Star,
  SquarePen,
  ChevronRight
} from 'lucide-react';

interface DashboardPageProps {
  onNavigateToSaved?: () => void;
  onNavigateToExplore?: () => void;
  onOpenProfile?: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onNavigateToSaved,
  onNavigateToExplore,
  onOpenProfile,
}) => {
  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  
  // Submit state
  const [submitTitle, setSubmitTitle] = useState('');
  const [submitCategory, setSubmitCategory] = useState('ANIME');
  const [submitLink, setSubmitLink] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Favorites state list
  const [favorites, setFavorites] = useState([
    { id: 'anime', label: 'ANIME', image: '/src/assets/images/luffy_avatar_1790269807034.jpg', enabled: true },
    { id: 'gaming', label: 'GAMING', image: '/src/assets/images/elden_ring_thumb_1790269858443.jpg', enabled: true },
    { id: 'movies', label: 'MOVIES', image: '/src/assets/images/dune_part_two_1790270217047.jpg', enabled: true },
    { id: 'tv_shows', label: 'TV SHOWS', image: '/src/assets/images/stranger_things_thumb_1790269900192.jpg', enabled: true },
    { id: 'k_pop', label: 'K-POP', image: '/src/assets/images/newjeans_thumb_1790269920672.jpg', enabled: true },
    { id: 'comics', label: 'COMICS', image: '/src/assets/images/spiderman_comic_1790270342039.jpg', enabled: true },
    { id: 'manga', label: 'MANGA', image: '/src/assets/images/one_piece_climax_1790270185803.jpg', enabled: true },
    { id: 'cosplay', label: 'COSPLAY', image: '/src/assets/images/deku_mha_1790273094256.jpg', enabled: true },
  ]);

  // Handle saving new submission
  const handleSubmitContent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submitTitle) return;
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setIsSubmitModalOpen(false);
      setSubmitTitle('');
      setSubmitLink('');
    }, 1800);
  };

  const recentActivities = [
    {
      id: 1,
      category: 'ANIME',
      badgeBg: 'bg-emerald-600',
      title: 'My Hero Academia S7 Episode 4 - Review',
      time: '2 hours ago',
      thumbnail: '/src/assets/images/deku_mha_1790273094256.jpg'
    },
    {
      id: 2,
      category: 'GAMING',
      badgeBg: 'bg-indigo-600',
      title: 'Elden Ring: Shadow of the Erdtree - First Impressions',
      time: '5 hours ago',
      thumbnail: '/src/assets/images/elden_ring_thumb_1790269858443.jpg'
    },
    {
      id: 3,
      category: 'MOVIES',
      badgeBg: 'bg-amber-600',
      title: 'Dune: Part Two – A Visual Masterpiece',
      time: '8 hours ago',
      thumbnail: '/src/assets/images/dune_part_two_1790270217047.jpg'
    },
    {
      id: 4,
      category: 'TV SHOWS',
      badgeBg: 'bg-purple-600',
      title: 'Stranger Things S5 – What We Know So Far',
      time: '12 hours ago',
      thumbnail: '/src/assets/images/stranger_things_thumb_1790269900192.jpg'
    },
    {
      id: 5,
      category: 'K-POP',
      badgeBg: 'bg-rose-600',
      title: "IVE's New Comeback Teaser Breaks Records",
      time: '1 day ago',
      thumbnail: '/src/assets/images/newjeans_thumb_1790269920672.jpg'
    }
  ];

  const bookmarks = [
    {
      id: 'b1',
      category: 'ANIME',
      rating: '9.5',
      title: 'One Piece: Egghead Arc Breakdown',
      description: 'The Egghead Arc brings major revelations and sets up the next...',
      image: '/src/assets/images/one_piece_climax_1790270185803.jpg'
    },
    {
      id: 'b2',
      category: 'GAMING',
      rating: '8.7',
      title: 'Zelda: Tears of the Kingdom – Complete Guide',
      description: 'Everything you need to know about the game, from shrines to...',
      image: '/src/assets/images/zelda_tears_1790273114837.jpg'
    },
    {
      id: 'b3',
      category: 'MOVIES',
      rating: '8.9',
      title: 'Joker (2019) – Character Study',
      description: "A deep look into Arthur Fleck's journey and what makes this film...",
      image: '/src/assets/images/joker_arthur_1790273130213.jpg'
    },
    {
      id: 'b4',
      category: 'TV SHOWS',
      rating: '8.6',
      title: 'The Last of Us – Episode 1 Recap & Analysis',
      description: "How the series adapts the game and sets the tone for what's next.",
      image: '/src/assets/images/last_of_us_1790273144908.jpg'
    },
    {
      id: 'b5',
      category: 'K-POP',
      rating: '8.4',
      title: 'NewJeans: Supernatural Album Review',
      description: 'A fresh sound, bold visuals and another step forward for NewJeans.',
      image: '/src/assets/images/kpop_performance_1790270268548.jpg'
    }
  ];

  const trending = [
    {
      id: 't1',
      category: 'ANIME',
      rating: '9.2',
      title: 'Naruto: The Ultimate Guide to the Series',
      description: 'A complete guide for new and returning fans.',
      image: '/src/assets/images/naruto_kurama_1790273165067.jpg'
    },
    {
      id: 't2',
      category: 'GAMING',
      rating: '8.8',
      title: 'Black Myth: Wukong – All Bosses Ranked',
      description: 'The toughest bosses and how to beat them.',
      image: '/src/assets/images/black_myth_wukong_1790273181489.jpg'
    },
    {
      id: 't3',
      category: 'MOVIES',
      rating: '9.1',
      title: 'Interstellar – Still a Masterpiece',
      description: 'Why this sci-fi classic continues to stand the test of time.',
      image: '/src/assets/images/interstellar_space_1790270312783.jpg'
    },
    {
      id: 't4',
      category: 'TV SHOWS',
      rating: '8.7',
      title: 'Attack on Titan – Final Season Explained',
      description: 'The end, the meaning, and what it all means.',
      image: '/src/assets/images/attack_on_titan_final_1790273197403.jpg'
    },
    {
      id: 't5',
      category: 'COMICS',
      rating: '8.9',
      title: 'Spider-Man: Best Story Arcs of All Time',
      description: 'Must-read arcs for every Spider-Man fan.',
      image: '/src/assets/images/spiderman_comic_1790270342039.jpg'
    }
  ];

  return (
    <div className="w-full antialiased select-none">
      
      {/* SECTION 1: HERO WELCOME BANNER (100% exact layout as upload) */}
      <div className="relative w-full h-[180px] sm:h-[200px] overflow-hidden bg-zinc-950 border-b border-[#F0E8DD]">
        {/* Exact background characters montage */}
        <img 
          src="/src/assets/images/fandom_banner_1790273074334.jpg" 
          alt="Fandomverse Welcome Banner" 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.75] opacity-90 contrast-[1.1]"
        />
        {/* Dark linear gradient overlay on the left for maximum text contrast */}
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-black via-black/40 to-transparent" />

        {/* Content Container (Matches exact padding and font weights of the reference) */}
        <div className="absolute inset-0 flex items-center justify-between px-6 sm:px-12 z-10">
          <div className="flex flex-col text-white">
            <h1 className="text-3xl sm:text-4.5xl font-black tracking-wider uppercase font-titan drop-shadow-md text-white">
              HEY, MUSAB!
            </h1>
            <p className="text-sm sm:text-base font-extrabold text-amber-300 drop-shadow-xs mt-1">
              Welcome back to FandomVerse!
            </p>
            <p className="text-xs sm:text-sm font-semibold text-stone-300 mt-1">
              Explore. Discover. Be part of the fandom.
            </p>
          </div>

          <button 
            onClick={() => setIsSubmitModalOpen(true)}
            className="hidden sm:flex items-center gap-2 bg-[#FFCC00] hover:bg-[#F2C200] text-black font-black text-[12px] tracking-wider uppercase px-5 py-3.5 rounded-lg shadow-md border border-[#E6B800] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>SUBMIT CONTENT</span>
            <SquarePen size={14} className="stroke-[3]" />
          </button>
        </div>
      </div>

      {/* Main content body with standard grid responsive margins and spacing wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-7 pb-12 space-y-7.5">

        {/* MOBILE ONLY SUBMIT BUTTON */}
        <div className="block sm:hidden w-full">
          <button 
            onClick={() => setIsSubmitModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 bg-[#FFCC00] hover:bg-[#F2C200] text-black font-black text-xs tracking-widest uppercase py-3.5 rounded-lg shadow-sm border border-[#E6B800] cursor-pointer"
          >
            <span>SUBMIT CONTENT</span>
            <SquarePen size={14} className="stroke-[3]" />
          </button>
        </div>

        {/* SECTION 2: FAVORITE FANDOMS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#F0E8DD] pb-2">
            <h2 className="text-md sm:text-lg font-[900] tracking-wider text-[#231C14] uppercase">
              YOUR FAVORITE FANDOMS
            </h2>
            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="text-[11px] font-extrabold tracking-widest text-[#FF5F1F] hover:text-[#E04F13] transition-colors flex items-center gap-1 cursor-pointer uppercase"
            >
              <span>EDIT FAVORITES</span>
              <svg viewBox="0 0 24 24" fill="none" className="w-[12px] h-[12px] stroke-current" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
            {favorites.filter(f => f.enabled).map((fandom) => (
              <div 
                key={fandom.id}
                className="flex items-center gap-2.5 bg-[#FAF6EE] hover:bg-[#F2EAD9] border border-[#EAE2D2] rounded-lg p-2.5 transition-all cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
              >
                <div className="w-8 h-8 rounded-md overflow-hidden shrink-0 border border-[#DCD3C4]">
                  <img src={fandom.image} alt={fandom.label} className="w-full h-full object-cover" />
                </div>
                <span className="font-extrabold text-[11px] tracking-wider text-[#4A3E31] uppercase">
                  {fandom.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: RECENT ACTIVITY */}
        <div className="space-y-4">
          <div className="border-b border-[#F0E8DD] pb-2">
            <h2 className="text-md sm:text-lg font-[900] tracking-wider text-[#231C14] uppercase">
              RECENT ACTIVITY
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {recentActivities.map((act) => (
              <div 
                key={act.id} 
                className="rounded-xl overflow-hidden border border-[#EAE2D8] bg-[#121824] shadow-md flex flex-col justify-between group cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
                style={{ minHeight: '190px' }}
              >
                {/* Background Thumbnail Image */}
                <div className="relative w-full h-[115px] overflow-hidden">
                  <img 
                    src={act.thumbnail} 
                    alt={act.title} 
                    className="w-full h-full object-cover brightness-[0.85] group-hover:scale-105 transition-transform duration-500" 
                  />
                  {/* Category Tag overlay */}
                  <div className="absolute bottom-2.5 left-2.5 bg-white text-black font-[900] text-[9px] px-2 py-0.5 rounded-sm tracking-wider uppercase">
                    {act.category}
                  </div>
                </div>

                {/* Info Text */}
                <div className="p-3 flex-1 flex flex-col justify-between bg-[#111622] text-white">
                  <h3 className="font-extrabold text-[12px] leading-tight text-[#FAFBFD] uppercase tracking-wide line-clamp-2">
                    {act.title}
                  </h3>
                  <div className="flex items-center gap-1 text-[#8E99A8] text-[9px] font-bold mt-2 uppercase tracking-tight">
                    <Clock size={10} className="stroke-[2.5]" />
                    <span>{act.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4: YOUR BOOKMARKS (Exactly matches uploaded design) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#F0E8DD] pb-2">
            <h2 className="text-md sm:text-lg font-[900] tracking-wider text-[#231C14] uppercase">
              YOUR BOOKMARKS
            </h2>
            <button 
              onClick={onNavigateToSaved}
              className="text-[11px] font-extrabold tracking-widest text-[#FF5F1F] hover:text-[#E04F13] transition-colors uppercase flex items-center gap-0.5 cursor-pointer"
            >
              <span>SEE ALL</span>
              <ChevronRight size={14} className="stroke-[3]" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {bookmarks.map((bm) => (
              <div 
                key={bm.id}
                onClick={() => setSelectedArticle(bm)}
                className="relative rounded-xl overflow-hidden border border-[#EAE2D8] bg-[#121824] shadow-md flex flex-col justify-between group cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
                style={{ minHeight: '300px' }}
              >
                {/* Yellow accent stripe at top */}
                <div className="absolute top-0 left-0 right-0 h-[4px] bg-[#FFA500]" />

                {/* Image area */}
                <div className="relative w-full h-[140px] overflow-hidden">
                  <img 
                    src={bm.image} 
                    alt={bm.title} 
                    className="w-full h-full object-cover brightness-[0.85] group-hover:scale-105 transition-transform duration-500" 
                  />
                  
                  {/* Rating Tag (Gold Star) */}
                  <div className="absolute top-3 left-3 bg-black/60 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1 border border-white/5">
                    <span className="text-[#FFA500]">★</span>
                    <span>{bm.rating}</span>
                  </div>

                  {/* Category Tag overlay */}
                  <div className="absolute bottom-2.5 left-2.5 bg-white text-black font-[900] text-[9px] px-2 py-0.5 rounded-sm tracking-wider uppercase">
                    {bm.category}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-3.5 flex-1 flex flex-col justify-between bg-[#111622] text-white">
                  <div>
                    <h3 className="font-extrabold text-[12px] leading-tight text-[#FAFBFD] uppercase tracking-wide mb-1.5 line-clamp-2">
                      {bm.title}
                    </h3>
                    <p className="text-[11px] font-semibold text-[#8E99A8] leading-relaxed line-clamp-3">
                      {bm.description}
                    </p>
                  </div>

                  <div className="flex justify-end mt-4">
                    <button className="text-[9px] font-black tracking-widest text-[#FFFFFF] border border-[#FFFFFF]/30 px-3 py-1.5 rounded-xs hover:bg-white hover:text-[#111622] transition-all uppercase cursor-pointer">
                      READ MORE
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 5: TRENDING ACROSS FANDOMS (Exactly 5 columns with high-quality matching art) */}
        <div className="space-y-4">
          <div className="border-b border-[#F0E8DD] pb-2">
            <h2 className="text-md sm:text-lg font-[900] tracking-wider text-[#231C14] uppercase">
              TRENDING ACROSS FANDOMS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {trending.map((trend) => (
              <div 
                key={trend.id}
                onClick={() => setSelectedArticle(trend)}
                className="relative rounded-xl overflow-hidden border border-[#EAE2D8] bg-[#121824] shadow-md flex flex-col justify-between group cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
                style={{ minHeight: '300px' }}
              >
                {/* Yellow accent stripe at top */}
                <div className="absolute top-0 left-0 right-0 h-[4px] bg-[#FFA500]" />

                {/* Image area */}
                <div className="relative w-full h-[140px] overflow-hidden">
                  <img 
                    src={trend.image} 
                    alt={trend.title} 
                    className="w-full h-full object-cover brightness-[0.85] group-hover:scale-105 transition-transform duration-500" 
                  />
                  
                  {/* Rating Tag (Gold Star) */}
                  <div className="absolute top-3 left-3 bg-black/60 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1 border border-white/5">
                    <span className="text-[#FFA500]">★</span>
                    <span>{trend.rating}</span>
                  </div>

                  {/* Category Tag overlay */}
                  <div className="absolute bottom-2.5 left-2.5 bg-white text-black font-[900] text-[9px] px-2 py-0.5 rounded-sm tracking-wider uppercase">
                    {trend.category}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-3.5 flex-1 flex flex-col justify-between bg-[#111622] text-white">
                  <div>
                    <h3 className="font-extrabold text-[12px] leading-tight text-[#FAFBFD] uppercase tracking-wide mb-1.5 line-clamp-2">
                      {trend.title}
                    </h3>
                    <p className="text-[11px] font-semibold text-[#8E99A8] leading-relaxed line-clamp-3">
                      {trend.description}
                    </p>
                  </div>

                  <div className="flex justify-end mt-4">
                    <button className="text-[9px] font-black tracking-widest text-[#FFFFFF] border border-[#FFFFFF]/30 px-3 py-1.5 rounded-xs hover:bg-white hover:text-[#111622] transition-all uppercase cursor-pointer">
                      READ MORE
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* DETAILED CONTENT POPUP MODAL (When clicking Read More) */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-[#111622] text-white rounded-xl border border-[#EDE4D6]/20 shadow-2xl max-w-xl w-full overflow-hidden">
            {/* Header / Accent Bar */}
            <div className="h-[4px] bg-[#FFA500]" />
            
            {/* Hero Image inside Modal */}
            <div className="relative h-[220px] w-full">
              <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111622] to-transparent" />
              
              <div className="absolute top-4 left-4 bg-white text-black font-black text-[10px] px-2.5 py-1 rounded-sm tracking-widest uppercase">
                {selectedArticle.category}
              </div>

              {selectedArticle.rating && (
                <div className="absolute top-4 right-4 bg-black/60 text-white font-extrabold text-xs px-2.5 py-1 rounded-md flex items-center gap-1 border border-white/10">
                  <span className="text-[#FFA500]">★</span>
                  <span>{selectedArticle.rating} / 10 Rating</span>
                </div>
              )}
            </div>

            {/* Modal details */}
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-[950] uppercase tracking-tight text-white leading-snug">
                {selectedArticle.title}
              </h3>
              
              <p className="text-sm font-semibold text-[#8E99A8] leading-relaxed">
                {selectedArticle.description}
              </p>

              <div className="bg-[#1C2333] rounded-lg p-4 border border-white/5 space-y-2">
                <span className="text-[10px] font-bold text-[#FFA500] uppercase tracking-widest block">EXCLUSIVE FANDOM UPDATE</span>
                <p className="text-xs text-white/90 leading-relaxed font-medium">
                  Stay updated with live discussions, episode summaries, leaks, and lore discussions. Join the active thread on the FandomVerse communities channel!
                </p>
              </div>

              <div className="pt-2 flex justify-end gap-3 border-t border-white/5">
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="px-4 py-2 text-xs font-bold text-[#8E99A8] hover:text-white uppercase transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button 
                  onClick={() => {
                    alert('Successfully saved to reading list!');
                    setSelectedArticle(null);
                  }}
                  className="px-5 py-2.5 bg-[#FF5F1F] hover:bg-[#E04F13] text-white text-xs font-black tracking-widest uppercase rounded-lg shadow-md transition-colors cursor-pointer"
                >
                  ADD TO PROGRESS
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 1. EDIT FAVORITES MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl border border-[#F0E8DD] shadow-xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-[#F7F2EA] border-b border-[#F0E8DD] px-5 py-4 flex items-center justify-between">
              <h3 className="text-sm font-[900] tracking-wider text-[#231C14] uppercase">
                Configure Favorite Fandoms
              </h3>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="text-[#7A6F64] hover:text-black font-black text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-2.5 max-h-[350px] overflow-y-auto">
              {favorites.map((fandom) => (
                <div 
                  key={fandom.id}
                  onClick={() => {
                    setFavorites(prev => prev.map(f => f.id === fandom.id ? { ...f, enabled: !f.enabled } : f));
                  }}
                  className="flex items-center justify-between p-3 rounded-lg border border-[#EDE4D6] hover:bg-[#F7F2EA] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <img src={fandom.image} alt={fandom.label} className="w-8 h-8 rounded-md object-cover border border-[#DCD3C4]" />
                    <span className="text-xs font-extrabold text-[#231C14] tracking-wider uppercase">
                      {fandom.label}
                    </span>
                  </div>
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                    fandom.enabled ? 'bg-[#FF5F1F] border-[#FF5F1F] text-white' : 'border-[#D9D1C5] bg-stone-50'
                  }`}>
                    {fandom.enabled && <Check size={12} className="stroke-[3]" />}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#FDFBF7] border-t border-[#F0E8DD] px-5 py-3 flex justify-end gap-2">
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 bg-[#FF5F1F] hover:bg-[#E04F13] text-white text-[11px] font-extrabold tracking-widest uppercase rounded-lg cursor-pointer"
              >
                SAVE CHANGES
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. SUBMIT CONTENT MODAL */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl border border-[#F0E8DD] shadow-xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-[#F7F2EA] border-b border-[#F0E8DD] px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-[#FFCC00]" />
                <h3 className="text-sm font-[900] tracking-wider text-[#231C14] uppercase">
                  Submit Fandom Content
                </h3>
              </div>
              <button 
                onClick={() => setIsSubmitModalOpen(false)}
                className="text-[#7A6F64] hover:text-black font-black text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitContent} className="p-5 space-y-4">
              {submitSuccess ? (
                <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <Check size={24} className="stroke-[3]" />
                  </div>
                  <h4 className="text-base font-extrabold text-[#231C14] uppercase">Submission Successful!</h4>
                  <p className="text-xs text-[#7A6F64] font-medium">Your content has been shared with the FandomVerse community.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold tracking-wider text-[#7A6F64] uppercase block">
                      Content Title / Scoop
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g., Attack on Titan Movie Spin-off Announced!"
                      value={submitTitle}
                      onChange={(e) => setSubmitTitle(e.target.value)}
                      className="w-full text-xs font-bold px-3 py-2.5 rounded-lg border border-[#EDE4D6] focus:outline-none focus:border-[#FF5F1F] bg-stone-50"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold tracking-wider text-[#7A6F64] uppercase block">
                        Category
                      </label>
                      <select 
                        value={submitCategory}
                        onChange={(e) => setSubmitCategory(e.target.value)}
                        className="w-full text-xs font-bold px-2 py-2.5 rounded-lg border border-[#EDE4D6] focus:outline-none focus:border-[#FF5F1F] bg-stone-50 cursor-pointer"
                      >
                        <option value="ANIME">ANIME</option>
                        <option value="GAMING">GAMING</option>
                        <option value="MOVIES">MOVIES</option>
                        <option value="TV SHOWS">TV SHOWS</option>
                        <option value="K-POP">K-POP</option>
                        <option value="COMICS">COMICS</option>
                        <option value="MANGA">MANGA</option>
                        <option value="COSPLAY">COSPLAY</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold tracking-wider text-[#7A6F64] uppercase block">
                        Source/Reference URL
                      </label>
                      <input 
                        type="url" 
                        placeholder="https://fandomverse.com/scoop"
                        value={submitLink}
                        onChange={(e) => setSubmitLink(e.target.value)}
                        className="w-full text-xs font-bold px-3 py-2.5 rounded-lg border border-[#EDE4D6] focus:outline-none focus:border-[#FF5F1F] bg-stone-50"
                      />
                    </div>
                  </div>

                  <div className="bg-[#F7F2EA] border border-[#EDE4D6] rounded-lg p-3 flex items-start gap-2">
                    <AlertCircle size={14} className="text-[#FF5F1F] shrink-0 mt-0.5" />
                    <p className="text-[10px] font-medium text-[#7A6F64] leading-relaxed">
                      All community submissions undergo instant verification. Be sure to select the correct fandom category to appear in the corresponding search channels!
                    </p>
                  </div>

                  <div className="pt-2 flex justify-end gap-2.5">
                    <button 
                      type="button"
                      onClick={() => setIsSubmitModalOpen(false)}
                      className="px-4 py-2 text-[10px] font-extrabold tracking-widest text-[#7A6F64] hover:text-black uppercase cursor-pointer"
                    >
                      CANCEL
                    </button>
                    <button 
                      type="submit"
                      className="px-5 py-2.5 bg-[#FFCC00] hover:bg-[#F2C200] text-black font-extrabold text-[10px] tracking-widest uppercase rounded-lg border border-[#E6B800] cursor-pointer"
                    >
                      PUBLISH SCOOP
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
