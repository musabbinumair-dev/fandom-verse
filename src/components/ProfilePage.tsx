import React, { useState } from 'react';
import { 
  Camera, 
  Trash2, 
  User, 
  Mail, 
  Sun, 
  Moon, 
  Check, 
  Save, 
  X,
  Plus,
  Gamepad2,
  Film,
  Tv,
  Music,
  BookOpen,
  Book,
  Sparkles
} from 'lucide-react';

interface ProfilePageProps {
  onBackToHome?: () => void;
  onSaveSuccess?: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  onBackToHome,
  onSaveSuccess,
}) => {
  // Input fields state
  const [userName, setUserName] = useState('Musab');
  const [userEmail, setUserEmail] = useState('musab@example.com');
  const [userAvatar, setUserAvatar] = useState('/src/assets/images/attack_on_titan_final_1790273197403.jpg'); // Eren portrait
  
  // Display Preferences state
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');

  // Favorites state
  const [favorites, setFavorites] = useState([
    { label: 'Anime', enabled: true },
    { label: 'Gaming', enabled: true },
    { label: 'Movies', enabled: true },
    { label: 'K-Pop', enabled: true },
    { label: 'Manga', enabled: true },
    { label: 'TV Shows', enabled: false },
    { label: 'Comics', enabled: false },
    { label: 'Cosplay', enabled: false },
  ]);

  // Categories of Interest selection states
  const [categories, setCategories] = useState([
    { id: 'anime', label: 'Anime', checked: true, icon: 'swirl' },
    { id: 'gaming', label: 'Gaming', checked: true, icon: 'gamepad' },
    { id: 'movies', label: 'Movies', checked: true, icon: 'film' },
    { id: 'tv', label: 'TV Shows', checked: true, icon: 'tv' },
    { id: 'kpop', label: 'K-Pop', checked: true, icon: 'music' },
    { id: 'comics', label: 'Comics', checked: true, icon: 'book' },
    { id: 'manga', label: 'Manga', checked: true, icon: 'book-open' },
    { id: 'cosplay', label: 'Cosplay', checked: true, icon: 'sparkles' },
  ]);

  const toggleFavorite = (index: number) => {
    setFavorites(prev => prev.map((fav, idx) => idx === index ? { ...fav, enabled: !fav.enabled } : fav));
  };

  const toggleCategory = (id: string) => {
    setCategories(prev => prev.map(cat => cat.id === id ? { ...cat, checked: !cat.checked } : cat));
  };

  const handleSave = () => {
    if (onSaveSuccess) {
      onSaveSuccess();
    } else {
      alert('Changes saved successfully!');
    }
    if (onBackToHome) {
      onBackToHome();
    }
  };

  const renderCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'swirl':
        return (
          <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 stroke-[#231C14]" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 15a5 5 0 1 1 5-5 5 5 0 0 1-5 5z" />
            <path d="M12 10a2 2 0 1 0 2 2 2 2 0 0 0-2-2z" />
            <path d="M17 12a5 5 0 0 1-5 5" />
          </svg>
        );
      case 'gamepad':
        return <Gamepad2 size={26} className="text-[#231C14]" />;
      case 'film':
        return <Film size={26} className="text-[#231C14]" />;
      case 'tv':
        return <Tv size={26} className="text-[#231C14]" />;
      case 'music':
        return <Music size={26} className="text-[#231C14]" />;
      case 'book':
        return <Book size={26} className="text-[#231C14]" />;
      case 'book-open':
        return <BookOpen size={26} className="text-[#231C14]" />;
      default:
        return (
          <span className="w-7 h-7 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-[26px] h-[26px] stroke-[#231C14] fill-[#231C14]/10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-3 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-6 4s1.5 2.5 3 2.5 3-2.5 3-2.5" />
            </svg>
          </span>
        );
    }
  };

  return (
    <div className="w-full antialiased select-none bg-[#FAF8F5] min-h-screen font-baloo pb-12">
      
      {/* BREADCRUMB HEADER (Pure flat, matches exact font styles) */}
      <div className="px-6 py-3.5 text-[11px] font-black tracking-wider text-[#8E8272] flex items-center gap-2 bg-[#FAF8F5]">
        <button onClick={onBackToHome} className="hover:text-[#FF5F1F] transition-colors uppercase cursor-pointer">Home</button>
        <span className="text-stone-300 font-bold">&gt;</span>
        <span className="text-[#231C14] uppercase">Profile</span>
      </div>

      {/* Profile Header Welcome Banner (Exact cover image proportions & overlays matching the Dashboard banner) */}
      <div className="relative w-full h-[180px] sm:h-[200px] overflow-hidden bg-zinc-950 border-b border-[#F0E8DD]">
        <img 
          src="/src/assets/images/fandom_banner_1790273074334.jpg" 
          alt="Profile Cover Background" 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.75] opacity-90 contrast-[1.1]"
        />
        {/* Dark mask overlay for optimal text contrast */}
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-black via-black/40 to-transparent" />

        {/* Content Inside Banner */}
        <div className="absolute inset-0 flex items-center justify-between px-6 sm:px-12 z-10">
          <div className="flex flex-col text-white">
            <h1 className="text-3xl sm:text-4.5xl font-black tracking-wider uppercase font-titan drop-shadow-md text-white">
              PROFILE
            </h1>
            <p className="text-sm sm:text-base font-extrabold text-amber-300 drop-shadow-xs mt-1">
              Manage your account details, preferences and fandoms.
            </p>
            <p className="text-xs sm:text-sm font-semibold text-stone-300 mt-1">
              Customize your viewing experience.
            </p>
          </div>

          <div className="hidden md:block text-right">
            <p className="font-titan text-white/95 text-md leading-tight uppercase max-w-xs drop-shadow-sm rotate-[-2deg] tracking-wide text-amber-300">
              SAME FANDOM.
              <br />
              DIFFERENT STORIES.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid Wrapper Layout - Forcing Tablet responsiveness to stay side-by-side exactly like desktop */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        
        {/* Row 1: Profile Photo, Personal Details & Preferences Cards (Side-by-side on both tablet sm/md and lg screens) */}
        <div className="grid grid-cols-12 gap-5.5">
          
          {/* Column 1: Profile Photo Card (col-span-12 on mobile, col-span-3 on tablet/desktop) */}
          <div className="col-span-12 sm:col-span-3 bg-white border border-[#EDE4D6] rounded-xl p-5.5 flex flex-col items-center justify-center text-center shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-md bg-stone-100 flex-shrink-0">
              <img 
                src={userAvatar} 
                alt="Musab Avatar" 
                className="w-full h-full object-cover rounded-full"
              />
              {/* Photo Indicator camera circle */}
              <div className="absolute bottom-0.5 right-0.5 w-7.5 h-7.5 rounded-full bg-stone-900 border-2 border-white flex items-center justify-center shadow-md">
                <Camera size={13} className="text-white" />
              </div>
            </div>

            <div className="w-full mt-5 space-y-2">
              <button 
                onClick={() => {
                  const options = [
                    '/src/assets/images/luffy_avatar_1790269807034.jpg',
                    '/src/assets/images/deku_mha_1790273094256.jpg',
                    '/src/assets/images/attack_on_titan_final_1790273197403.jpg'
                  ];
                  const currentIdx = options.indexOf(userAvatar);
                  const nextIdx = (currentIdx + 1) % options.length;
                  setUserAvatar(options[nextIdx]);
                }}
                className="w-full flex items-center justify-center gap-1.5 bg-[#FFCC00] hover:bg-[#F2C200] text-black font-black text-[11px] tracking-wider uppercase py-2.5 rounded-lg border border-[#E6B800] transition-colors cursor-pointer"
              >
                <Camera size={13} className="stroke-[2.5]" />
                <span>UPLOAD PHOTO</span>
              </button>
              
              <button 
                onClick={() => setUserAvatar('/src/assets/images/luffy_avatar_1790269807034.jpg')}
                className="w-full flex items-center justify-center gap-1.5 bg-transparent hover:bg-red-50 text-red-600 font-extrabold text-[11px] tracking-wider uppercase py-2 rounded-lg transition-all cursor-pointer"
              >
                <Trash2 size={12} />
                <span>REMOVE PHOTO</span>
              </button>
            </div>
          </div>

          {/* Column 2: Personal Details Card (col-span-12 on mobile, col-span-5 on tablet/desktop) */}
          <div className="col-span-12 sm:col-span-5 bg-white border border-[#EDE4D6] rounded-xl p-5.5 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
            <div>
              <h2 className="text-sm font-black tracking-wider text-[#231C14] uppercase">
                PERSONAL DETAILS
              </h2>
              <p className="text-[11px] font-bold text-[#8E8272] mt-0.5">Your basic information</p>

              <div className="space-y-4 mt-5">
                {/* Name field */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-extrabold text-[#7A6F64] uppercase tracking-wider block">Name</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#7A6F64] pointer-events-none">
                      <User size={14} />
                    </span>
                    <input 
                      type="text" 
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full text-xs font-bold pl-9 pr-4 py-2.5 rounded-lg border border-[#EAE2D2] focus:outline-none focus:border-[#FF5F1F] bg-[#FAF9F5]"
                    />
                  </div>
                </div>

                {/* Email field */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-extrabold text-[#7A6F64] uppercase tracking-wider block">Email</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#7A6F64] pointer-events-none">
                      <Mail size={14} />
                    </span>
                    <input 
                      type="email" 
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="w-full text-xs font-bold pl-9 pr-4 py-2.5 rounded-lg border border-[#EAE2D2] focus:outline-none focus:border-[#FF5F1F] bg-[#FAF9F5]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Display Preferences Card (col-span-12 on mobile, col-span-4 on tablet/desktop) */}
          <div className="col-span-12 sm:col-span-4 bg-white border border-[#EDE4D6] rounded-xl p-5.5 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
            <div>
              <h2 className="text-sm font-black tracking-wider text-[#231C14] uppercase">
                DISPLAY PREFERENCES
              </h2>
              <p className="text-[11px] font-bold text-[#8E8272] mt-0.5">Customize your viewing experience</p>

              <div className="space-y-4.5 mt-5">
                {/* Theme selection toggle buttons */}
                <div className="space-y-2">
                  <span className="text-[10px] font-extrabold text-[#7A6F64] uppercase tracking-wider block">Theme</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => setTheme('light')}
                      className={`flex items-center justify-center gap-2 py-2.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                        theme === 'light' 
                          ? 'bg-[#FEF2CF] border-[#F2C200] text-amber-900 shadow-xs font-extrabold' 
                          : 'bg-white border-[#EAE2D2] text-[#4A3E31] hover:bg-stone-50'
                      }`}
                    >
                      <Sun size={13} className="text-[#B45309]" />
                      <span>Light</span>
                    </button>
                    
                    <button 
                      onClick={() => setTheme('dark')}
                      className={`flex items-center justify-center gap-2 py-2.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                        theme === 'dark' 
                          ? 'bg-[#121824] border-[#313B4D] text-white shadow-xs font-extrabold' 
                          : 'bg-white border-[#EAE2D2] text-[#4A3E31] hover:bg-stone-50'
                      }`}
                    >
                      <Moon size={13} />
                      <span>Dark</span>
                    </button>
                  </div>
                </div>

                {/* Font Size selection toggle buttons */}
                <div className="space-y-2">
                  <span className="text-[10px] font-extrabold text-[#7A6F64] uppercase tracking-wider block">Font Size</span>
                  <div className="grid grid-cols-3 gap-2">
                    <button 
                      onClick={() => setFontSize('small')}
                      className={`py-2.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                        fontSize === 'small' 
                          ? 'bg-[#FEF2CF] border-[#F2C200] text-amber-900 shadow-xs font-extrabold' 
                          : 'bg-white border-[#EAE2D2] text-[#4A3E31] hover:bg-stone-50'
                      }`}
                    >
                      A- Small
                    </button>
                    
                    <button 
                      onClick={() => setFontSize('medium')}
                      className={`py-2.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                        fontSize === 'medium' 
                          ? 'bg-[#FEF2CF] border-[#F2C200] text-amber-900 shadow-xs font-extrabold' 
                          : 'bg-white border-[#EAE2D2] text-[#4A3E31] hover:bg-stone-50'
                      }`}
                    >
                      A Medium
                    </button>

                    <button 
                      onClick={() => setFontSize('large')}
                      className={`py-2.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                        fontSize === 'large' 
                          ? 'bg-[#FEF2CF] border-[#F2C200] text-amber-900 shadow-xs font-extrabold' 
                          : 'bg-white border-[#EAE2D2] text-[#4A3E31] hover:bg-stone-50'
                      }`}
                    >
                      A+ Large
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Row 2: FAVORITE FANDOMS SECTION */}
        <div className="bg-white border border-[#EDE4D6] rounded-xl p-5.5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-3.5">
          <div className="flex items-center justify-between border-b border-[#F0E8DD] pb-2">
            <div>
              <h2 className="text-sm font-black tracking-wider text-[#231C14] uppercase">
                FAVORITE FANDOMS
              </h2>
              <p className="text-[11px] font-bold text-[#8E8272] mt-0.5">
                Select your favorite fandoms. You can add or remove them anytime.
              </p>
            </div>
            
            <button 
              onClick={() => alert('Add or toggle fandom tags directly by tapping them!')}
              className="text-[11px] font-extrabold tracking-widest text-[#FF5F1F] hover:text-[#E04F13] transition-colors flex items-center gap-1 cursor-pointer uppercase font-sans"
            >
              <span>MANAGE FAVORITES</span>
              <svg viewBox="0 0 24 24" fill="none" className="w-[12px] h-[12px] stroke-current" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            </button>
          </div>

          {/* Yellow / White Pill list (Exactly matching colors) */}
          <div className="flex flex-wrap gap-2 pt-1.5">
            {favorites.map((fav, index) => (
              <button
                key={fav.label}
                onClick={() => toggleFavorite(index)}
                className={`flex items-center gap-1.5 text-[11px] font-black px-4 py-2 rounded-full tracking-wider uppercase border transition-all cursor-pointer ${
                  fav.enabled 
                    ? 'bg-[#FFCC00] border-[#E6B800] text-black font-black' 
                    : 'bg-white border-[#EDE4D6] text-[#4A3E31] hover:bg-stone-50 font-extrabold'
                }`}
              >
                <span>{fav.label}</span>
                {fav.enabled ? (
                  <X size={12} className="stroke-[3.5] text-black/70" />
                ) : (
                  <Plus size={12} className="stroke-[3.5] text-[#FF5F1F]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Row 3: CATEGORIES OF INTEREST SECTION (Laid out in a single horizontal row on tablet and desktop) */}
        <div className="bg-white border border-[#EDE4D6] rounded-xl p-5.5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-3.5">
          <div className="border-b border-[#F0E8DD] pb-2">
            <h2 className="text-sm font-black tracking-wider text-[#231C14] uppercase">
              CATEGORIES OF INTEREST
            </h2>
            <p className="text-[11px] font-bold text-[#8E8272] mt-0.5">
              Choose the content categories you're most interested in.
            </p>
          </div>

          {/* Exactly 8 side-by-side columns on tablet and desktop screens */}
          <div className="grid grid-cols-2 sm:grid-cols-8 gap-3 pt-1.5">
            {categories.map((cat) => (
              <div 
                key={cat.id}
                onClick={() => toggleCategory(cat.id)}
                className={`relative flex flex-col items-center justify-center p-4 rounded-xl border transition-all cursor-pointer ${
                  cat.checked 
                    ? 'bg-white border-[#D9D1C5] shadow-[0_1px_3px_rgba(0,0,0,0.01)]' 
                    : 'bg-white border-[#EAE2D2] opacity-70 hover:opacity-100'
                }`}
                style={{ minHeight: '110px' }}
              >
                {/* Red-Orange checkbox in the top-right corner exactly like image */}
                <div className={`absolute top-2.5 right-2.5 w-4.5 h-4.5 rounded-md border flex items-center justify-center transition-all ${
                  cat.checked ? 'bg-[#FF5F1F] border-[#FF5F1F]' : 'border-[#C4BBAF] bg-white'
                }`}>
                  {cat.checked && <Check size={12} className="stroke-[4.5] text-white" />}
                </div>

                {/* Big Category Icon */}
                <div className="mb-2 text-[#231C14]">
                  {renderCategoryIcon(cat.icon)}
                </div>

                {/* Category label */}
                <span className="font-extrabold text-[12px] tracking-wider text-[#231C14] uppercase">
                  {cat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Panel Action Buttons (Replicating style & size exactly) */}
        <div className="flex items-center gap-3 pt-3">
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 bg-[#FFCC00] hover:bg-[#F2C200] text-black font-black text-xs tracking-wider uppercase px-6 py-3.5 rounded-lg shadow-md border border-[#E6B800] transition-colors cursor-pointer"
          >
            <Save size={14} className="stroke-[3]" />
            <span>SAVE CHANGES</span>
          </button>
          
          <button 
            onClick={onBackToHome}
            className="px-6 py-3.5 bg-white hover:bg-stone-50 text-[#4A3E31] font-black text-xs tracking-wider uppercase rounded-lg border border-[#EDE4D6] transition-colors cursor-pointer"
          >
            <span>CANCEL</span>
          </button>
        </div>

      </div>

    </div>
  );
};
