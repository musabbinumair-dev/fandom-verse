import React, { useState } from 'react';
import { Search, Bell, User, Bookmark, X, LogOut, ChevronDown } from 'lucide-react';

interface TopHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  unreadCount?: number;
  onOpenAuth?: (mode: 'login' | 'signup') => void;
  onOpenSaved?: () => void;
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  searchQuery,
  onSearchChange,
  onOpenNotifications,
  onOpenProfile,
  unreadCount = 2,
  onOpenAuth,
  onOpenSaved,
  isLoggedIn = true,
  onLogout,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[#F0E8DD] px-4 sm:px-6 h-14 flex items-center justify-between gap-4 text-[#231C14] font-baloo select-none shrink-0">
      {/* Brand logo at top left: Heart glyph + fandomverse matching the collapsed sidebar font and colors */}
      <div className="flex items-center gap-2.5 shrink-0">
        <button
          type="button"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 cursor-pointer transition-transform hover:opacity-90 active:scale-95"
        >
          {/* Accent heart glyph */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="#FF5F1F"
            />
          </svg>

          {/* Clean lowercase text */}
          <span className="text-lg sm:text-xl font-bold tracking-tight">
            <span className="text-[#231C14]">fandom</span>
            <span className="text-[#FF5F1F]">verse</span>
          </span>
        </button>
      </div>

      {/* Center Search Bar: Crisp white surface with 1px border matching sidebar */}
      <div className="flex-1 max-w-xl mx-2 sm:mx-6">
        <div
          className={`flex items-center gap-2 px-3 py-1.5 sm:py-2 rounded-xl bg-white border transition-colors ${
            isFocused
              ? 'border-[#FF5F1F]'
              : 'border-[#F0E8DD] hover:border-[#D6C9BB]'
          }`}
        >
          <Search size={16} className="text-[#7A6F64] shrink-0" strokeWidth={2} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search"
            className="w-full bg-transparent text-sm text-[#231C14] placeholder:text-[#9C8F82] font-baloo focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="text-[#7A6F64] hover:text-[#231C14] p-0.5 cursor-pointer"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Right controls: matching the collapsed sidebar styling exactly */}
      <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
        {/* Saved Bookmark button */}
        <button
          type="button"
          onClick={onOpenSaved}
          title="Saved items"
          className="p-1.5 text-[#7A6F64] hover:text-[#FF5F1F] rounded-full transition-colors cursor-pointer active:scale-95"
        >
          <Bookmark size={20} strokeWidth={2} />
        </button>

        {/* Notifications Bell with dot */}
        <button
          type="button"
          onClick={onOpenNotifications}
          title="Notifications"
          className="relative p-1.5 text-[#7A6F64] hover:text-[#FF5F1F] rounded-full transition-colors cursor-pointer active:scale-95"
        >
          <Bell size={20} strokeWidth={2} />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF5F1F] rounded-full ring-2 ring-white" />
          )}
        </button>

        {/* User Profile / Auth State Panel */}
        {isLoggedIn ? (
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-1.5 p-0.5 rounded-full hover:ring-2 hover:ring-[#FF5F1F]/30 transition-all cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border border-[#D9D1C5] bg-amber-100 flex items-center justify-center shrink-0 shadow-sm">
                <img src="/src/assets/images/luffy_avatar_1790269807034.jpg" alt="Musab" className="w-full h-full object-cover scale-105" />
              </div>
              <span className="hidden md:inline text-xs font-black tracking-wide text-[#231C14]">Musab</span>
              <ChevronDown size={14} className="text-[#625547]" />
            </button>

            {/* Avatar Dropdown */}
            {showDropdown && (
              <div className="absolute right-0 mt-2.5 w-48 bg-white border border-[#F0E8DD] rounded-xl shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="px-4 py-2 border-b border-[#F0E8DD]">
                  <p className="text-[10px] uppercase font-bold text-[#7A6F64] tracking-wider">Signed in as</p>
                  <p className="text-xs font-black text-[#231C14] mt-0.5 truncate">Musab Fandom</p>
                </div>
                <button
                  onClick={() => {
                    onOpenProfile();
                    setShowDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-bold text-[#4A3E31] hover:bg-[#F7F2EA] flex items-center gap-2 transition-colors"
                >
                  <User size={14} />
                  <span>My Profile Drawer</span>
                </button>
                {onLogout && (
                  <button
                    onClick={() => {
                      onLogout();
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-black text-[#FF5F1F] hover:bg-[#FDF3EE] flex items-center gap-2 transition-colors"
                  >
                    <LogOut size={14} />
                    <span>Log Out</span>
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => onOpenAuth?.('login')}
            className="flex items-center gap-1.5 bg-[#FF5F1F] hover:bg-[#E04F13] text-white font-extrabold text-[11px] tracking-widest uppercase px-4 py-2 rounded-lg transition-all active:scale-[0.98] shadow-sm cursor-pointer"
          >
            <User size={13} className="stroke-[2.5]" />
            <span>SIGN IN</span>
          </button>
        )}
      </div>
    </header>
  );
};
