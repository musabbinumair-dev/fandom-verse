import React, { useState } from 'react';
import { 
  Bookmark, 
  Share2, 
  Calendar, 
  Flame, 
  Star, 
  Play, 
  Volume2, 
  Tv, 
  Maximize2, 
  Tag, 
  Layers, 
  User, 
  ChevronLeft,
  Settings,
  HelpCircle
} from 'lucide-react';

interface ContentDetailPageProps {
  item: {
    id: string;
    title: string;
    category: string;
    type: string;
    year: string;
    popularity: string;
    image: string;
    genre?: string;
    desc?: string;
  };
  onBack: () => void;
  onOpenArticle?: (item: any) => void;
}

export const ContentDetailPage: React.FC<ContentDetailPageProps> = ({ 
  item, 
  onBack,
  onOpenArticle
}) => {
  const [personalNote, setPersonalNote] = useState('');
  const [userRating, setUserRating] = useState(4);
  const [isSaved, setIsSaved] = useState(false);

  // Related content data cards for the 4-column row at the bottom
  const relatedContent = [
    {
      id: 'r-1',
      title: 'The Complete Guide to the One Piece Universe',
      category: 'Anime',
      type: 'ARTICLE',
      year: '2024',
      popularity: '9.8K',
      image: '/src/assets/images/one_piece_climax_1790270185803.jpg'
    },
    {
      id: 'r-2',
      title: "Zoro's Greatest Fights Ranked",
      category: 'Anime',
      type: 'VIDEO',
      year: '2024',
      popularity: '6.8K',
      image: '/src/assets/images/zoro_fights_1790274082919.jpg'
    },
    {
      id: 'r-3',
      title: 'The Straw Hat Crew: Each Member Explained',
      category: 'Anime',
      type: 'ARTICLE',
      year: '2024',
      popularity: '5.6K',
      image: '/src/assets/images/deku_mha_1790273094256.jpg'
    },
    {
      id: 'r-4',
      title: "Sanji's Best Moments in Egghead Arc",
      category: 'Anime',
      type: 'VIDEO',
      year: '2024',
      popularity: '4.2K',
      image: '/src/assets/images/luffy_avatar_1790269807034.jpg'
    }
  ];

  // Helper to render star rating row with half star support
  const renderStars = () => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4].map((star) => (
          <Star 
            key={star} 
            size={18} 
            className="fill-[#FFCC00] text-[#FFCC00] cursor-pointer active:scale-95 transition-transform"
            onClick={() => setUserRating(star)}
          />
        ))}
        {/* Half Star placeholder */}
        <div className="relative w-4.5 h-4.5 overflow-hidden flex shrink-0">
          <Star size={18} className="text-[#D3CCD6] fill-[#D3CCD6] absolute top-0 left-0" />
          <div className="w-[50%] overflow-hidden absolute top-0 left-0">
            <Star size={18} className="text-[#FFCC00] fill-[#FFCC00]" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full antialiased select-none bg-[#FAF8F5] min-h-screen font-baloo pb-16">
      
      {/* 1. BREADCRUMBS ROW (Exactly matching breadcrumbs in image) */}
      <div className="px-6 py-3.5 text-[11px] font-black tracking-wider text-[#8E8272] flex items-center gap-2 border-b border-[#EBE6DD]">
        <button onClick={onBack} className="hover:text-[#FF5F1F] transition-colors uppercase cursor-pointer">Home</button>
        <span className="text-stone-300 font-bold">&gt;</span>
        <button onClick={onBack} className="hover:text-[#FF5F1F] transition-colors uppercase cursor-pointer">Explore</button>
        <span className="text-stone-300 font-bold">&gt;</span>
        <span className="text-[#8E8272] uppercase">{item.category}</span>
        <span className="text-stone-300 font-bold">&gt;</span>
        <span className="text-[#231C14] uppercase font-black truncate max-w-xs">{item.title}</span>
      </div>

      {/* BACK NAVIGATION FLOATING BUTTON */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5">
        <button 
          onClick={onBack}
          className="flex items-center gap-1 text-xs font-black text-[#FF5F1F] hover:text-[#E04F13] tracking-widest uppercase cursor-pointer bg-white px-3 py-2 rounded-lg border border-[#EDE4D6]"
        >
          <ChevronLeft size={14} className="stroke-[3]" />
          <span>Back to Explore</span>
        </button>
      </div>

      {/* 2. TWO-COLUMN SPLIT CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-4 grid grid-cols-1 lg:grid-cols-12 gap-7">
        
        {/* LEFT COLUMN: MAIN MEDIA & DESCRIPTION (lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Media Player / Video Player Container */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-lg group">
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-full object-cover brightness-[0.92]" 
            />

            {/* Translucent overlay mask */}
            <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-all duration-300" />

            {/* Big Centered Play Button exactly as mockup */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/25 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-2xl hover:scale-105 transition-transform duration-300 pointer-events-auto cursor-pointer">
                <Play size={32} className="fill-white text-white ml-1.5" />
              </div>
            </div>

            {/* Top Right Floating Badge Tag */}
            <div className="absolute top-4 right-4 bg-white/95 text-black font-black text-[10px] px-3.5 py-1 rounded-full tracking-widest uppercase shadow-md">
              {item.category.toUpperCase()}
            </div>

            {/* Bottom Media Controls Bar exactly matching image */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/85 to-transparent px-4 pt-8 pb-3.5 flex items-center justify-between text-white text-xs font-medium font-sans">
              <div className="flex items-center gap-3.5">
                <button className="hover:text-[#FF5F1F] cursor-pointer transition-colors">
                  <Play size={16} className="fill-white" />
                </button>
                <button className="hover:text-[#FF5F1F] cursor-pointer transition-colors">
                  <Volume2 size={16} />
                </button>
                <span className="text-[11px] font-semibold text-stone-300">0:00 / 12:34</span>
              </div>

              <div className="flex items-center gap-3.5">
                <button className="hover:text-[#FF5F1F] cursor-pointer transition-colors">
                  <Volume2 size={16} />
                </button>
                <span className="bg-white/10 text-white font-black text-[10px] px-1 py-0.5 rounded-sm scale-95 border border-white/10">CC</span>
                <button className="hover:text-[#FF5F1F] cursor-pointer transition-colors">
                  <Settings size={15} />
                </button>
                <button className="hover:text-[#FF5F1F] cursor-pointer transition-colors">
                  <Tv size={15} />
                </button>
                <button className="hover:text-[#FF5F1F] cursor-pointer transition-colors">
                  <Maximize2 size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Title Area */}
          <div className="space-y-3.5">
            <h2 className="text-2xl sm:text-3xl font-[950] tracking-tight uppercase font-titan text-[#231C14] leading-tight">
              {item.title}
            </h2>

            {/* Tag Pills row under title */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="bg-[#FED7E2] text-[#702459] text-[10px] font-black tracking-widest uppercase px-3.5 py-1.5 rounded-full">
                {item.category}
              </span>
              <span className="bg-[#1C2333] text-stone-200 text-[10px] font-black tracking-widest uppercase px-3.5 py-1.5 rounded-full">
                {item.type}
              </span>
              <span className="bg-white border border-[#EDE4D6] text-[#7A6F64] text-[10.5px] font-extrabold px-3 py-1.5 rounded-full uppercase">
                Action
              </span>
              <span className="bg-white border border-[#EDE4D6] text-[#7A6F64] text-[10.5px] font-extrabold px-3 py-1.5 rounded-full uppercase">
                Adventure
              </span>
              <span className="bg-white border border-[#EDE4D6] text-[#7A6F64] text-[10.5px] font-extrabold px-3 py-1.5 rounded-full uppercase">
                Shounen
              </span>
              <span className="bg-white border border-[#EDE4D6] text-[#7A6F64] text-[10.5px] font-extrabold px-3 py-1.5 rounded-full flex items-center gap-1.5 uppercase">
                <Calendar size={12} />
                <span>{item.year}</span>
              </span>
            </div>
          </div>

          {/* Divider line */}
          <div className="border-t border-[#F0E8DD]" />

          {/* Description Section */}
          <div className="space-y-2">
            <h3 className="text-md sm:text-lg font-black tracking-wider text-[#231C14] uppercase">
              Description
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-[#5C554E] leading-relaxed">
              {item.desc || "The Egghead Arc brings the Straw Hat crew to the futuristic island of Egghead, where they encounter Dr. Vegapunk, ancient technology, and the imminent threat of the World Government. This breakdown covers the key events, character moments, and major reveals from the arc, along with what to expect next in the story."}
            </p>
          </div>

          {/* Secondary artwork illustration matching the mockup exactly */}
          <div className="relative w-full rounded-2xl overflow-hidden border border-[#EDE4D6] shadow-md h-[180px] sm:h-[220px]">
            <img 
              src="/src/assets/images/luffy_sea_dream_1790274895834.jpg" 
              alt="The Sea Is My Dream artwork" 
              className="w-full h-full object-cover" 
            />
          </div>

        </div>

        {/* RIGHT COLUMN: RATING, NOTES & SIDEBAR DETAILS (lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* 1. Rating & Action Panel */}
          <div className="bg-white border border-[#EDE4D6] rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-4">
            <div className="space-y-1.5">
              <span className="text-[10px] font-extrabold text-[#8E8272] uppercase tracking-wider block">Your Rating</span>
              <div className="flex items-center justify-between">
                {renderStars()}
                <span className="text-[13px] font-black text-[#231C14]">
                  4.2 <span className="text-stone-400 font-bold text-xs">(1.4k ratings)</span>
                </span>
              </div>
            </div>

            {/* Bookmark & Share Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => setIsSaved(!isSaved)}
                className={`flex items-center justify-center gap-2 py-3 rounded-lg border text-xs font-black transition-all cursor-pointer tracking-wider uppercase ${
                  isSaved 
                    ? 'bg-[#FEF2CF] border-[#F2C200] text-amber-900 shadow-xs' 
                    : 'bg-[#FFCC00] border-[#E6B800] text-black shadow-md hover:bg-[#F2C200]'
                }`}
              >
                <Bookmark size={13} className="stroke-[3]" />
                <span>BOOKMARK</span>
              </button>

              <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Content link copied to clipboard!');
                }}
                className="flex items-center justify-center gap-2 bg-white border border-[#EDE4D6] hover:bg-stone-50 text-[#4A3E31] py-3 rounded-lg text-xs font-black tracking-wider uppercase cursor-pointer transition-colors"
              >
                <Share2 size={13} className="stroke-[2.5]" />
                <span>SHARE</span>
              </button>
            </div>

            {/* Note Area */}
            <div className="space-y-2 border-t border-[#F0E8DD] pt-4.5">
              <label className="text-[10px] font-extrabold text-[#8E8272] uppercase tracking-wider block">Add a personal note</label>
              <textarea 
                rows={3}
                placeholder="Write your thoughts about this content..."
                value={personalNote}
                onChange={(e) => setPersonalNote(e.target.value)}
                className="w-full text-xs font-semibold p-3.5 rounded-lg border border-[#EDE4D6] focus:outline-none focus:border-[#FF5F1F] bg-[#FAF9F5] text-[#231C14] resize-none"
              />
              <button 
                onClick={() => {
                  alert('Your personal note has been saved to your bookmark settings!');
                  setPersonalNote('');
                }}
                className="w-full bg-[#FFCC00] hover:bg-[#F2C200] text-black font-black text-xs tracking-wider uppercase py-3 rounded-lg border border-[#E6B800] transition-colors cursor-pointer"
              >
                SAVE NOTE
              </button>
            </div>
          </div>

          {/* 2. Detail Fields Panel */}
          <div className="bg-white border border-[#EDE4D6] rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
            <h3 className="text-sm font-black tracking-wider text-[#231C14] uppercase border-b border-[#F0E8DD] pb-2.5 mb-4">
              Details
            </h3>

            <div className="space-y-4">
              {/* Category */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-[#FAF8F5] border border-[#EDE4D6] flex items-center justify-center text-[#231C14] shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px] stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 15a5 5 0 1 1 5-5 5 5 0 0 1-5 5z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[9.5px] font-black text-[#8E8272] uppercase tracking-wider block">Category</span>
                  <span className="text-xs font-extrabold text-[#231C14]">{item.category}</span>
                </div>
              </div>

              {/* Content Type */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-[#FAF8F5] border border-[#EDE4D6] flex items-center justify-center text-[#231C14] shrink-0">
                  <Play size={16} className="stroke-[2.5]" />
                </div>
                <div>
                  <span className="text-[9.5px] font-black text-[#8E8272] uppercase tracking-wider block">Content Type</span>
                  <span className="text-xs font-extrabold text-[#231C14]">{item.type}</span>
                </div>
              </div>

              {/* Genre */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-[#FAF8F5] border border-[#EDE4D6] flex items-center justify-center text-[#231C14] shrink-0">
                  <Tag size={16} className="stroke-[2.5]" />
                </div>
                <div>
                  <span className="text-[9.5px] font-black text-[#8E8272] uppercase tracking-wider block">Genre</span>
                  <span className="text-xs font-extrabold text-[#231C14]">{item.genre || 'Action, Adventure, Shounen'}</span>
                </div>
              </div>

              {/* Release Year */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-[#FAF8F5] border border-[#EDE4D6] flex items-center justify-center text-[#231C14] shrink-0">
                  <Calendar size={16} className="stroke-[2.5]" />
                </div>
                <div>
                  <span className="text-[9.5px] font-black text-[#8E8272] uppercase tracking-wider block">Release Year</span>
                  <span className="text-xs font-extrabold text-[#231C14]">{item.year}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 3. Related Content Cards Row at Bottom (Exactly 4 cards matching layout) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 space-y-4">
        <h3 className="text-lg font-[950] tracking-wider text-[#231C14] uppercase border-b border-[#F0E8DD] pb-2">
          Related Content
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1.5">
          {relatedContent.map((card) => (
            <div 
              key={card.id}
              onClick={() => onOpenArticle && onOpenArticle(card)}
              className="rounded-xl overflow-hidden border border-[#EAE2D8]/10 bg-[#121824] shadow-md flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:scale-[1.01]"
              style={{ minHeight: '265px' }}
            >
              {/* Image */}
              <div className="relative w-full h-[125px] overflow-hidden">
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className="w-full h-full object-cover brightness-[0.85] group-hover:scale-105 transition-transform duration-500" 
                />

                {/* Bottom Left Category Overlay */}
                <div className="absolute bottom-2 left-2 bg-white text-black font-black text-[9px] px-2 py-0.5 rounded-sm tracking-wider uppercase">
                  {card.category}
                </div>

                {/* Bottom Right Type Tag */}
                <div className="absolute bottom-2 right-2 bg-black/55 text-[#DCDCDC] font-black text-[8.5px] px-1.5 py-0.5 rounded-sm tracking-wider uppercase border border-white/5">
                  {card.type}
                </div>
              </div>

              {/* Text detail */}
              <div className="p-3.5 flex-1 flex flex-col justify-between bg-[#111622] text-white">
                <h4 className="font-extrabold text-[11.5px] leading-tight text-[#FAFBFD] uppercase tracking-wide mb-1.5 line-clamp-2">
                  {card.title}
                </h4>

                <div className="flex items-center justify-between border-t border-white/5 pt-2 mt-1">
                  <div className="flex items-center gap-1 text-[#8E99A8] text-[9px] font-bold uppercase tracking-tight">
                    <Calendar size={10} className="stroke-[2.5]" />
                    <span>{card.year}</span>
                  </div>

                  <div className="flex items-center gap-1 text-orange-400 text-[9px] font-black uppercase tracking-tight">
                    <Flame size={10} className="stroke-[2.5]" />
                    <span>{card.popularity}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
