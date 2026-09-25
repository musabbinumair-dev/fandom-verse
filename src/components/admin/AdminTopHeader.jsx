import { useState } from "react";
import { Search, Bell, User, Bookmark, X, LogOut, ChevronDown, ExternalLink } from "lucide-react";

const AdminTopHeader = ({
  searchQuery = "",
  onSearchChange,
  onOpenNotifications,
  onOpenProfile,
  onNavigateHome,
  onNavigateToUserPanel,
  unreadCount = 2,
  isLoggedIn = true,
  onLogout,
  theme = "light"
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const isDark = theme === "dark";

  return (
    <header
      className={`sticky top-0 z-30 px-4 sm:px-6 h-14 flex items-center justify-between gap-4 font-baloo select-none shrink-0 transition-colors duration-200 ${
        isDark
          ? "bg-[#1a1a1a] border-b border-[#2a2a2a] text-stone-200"
          : "bg-white border-b border-[#F0E8DD] text-[#231C14]"
      }`}
    >
      {/* Brand logo at top left: Clicking navigates to admin dashboard */}
      <div className="flex items-center gap-2.5 shrink-0">
        <button
          type="button"
          onClick={() => {
            if (onNavigateHome) {
              onNavigateHome();
            }
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2 cursor-pointer transition-transform hover:opacity-90 active:scale-95"
        >
          {/* Accent heart glyph */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill={isDark ? "#FFCC00" : "#FF5F1F"}
            />
          </svg>

          {/* Clean lowercase text + ADMIN tag */}
          <span className="text-lg sm:text-xl font-bold tracking-tight flex items-center gap-1.5">
            <span className={isDark ? "text-stone-200 group-hover:text-white" : "text-[#231C14]"}>fandom</span>
            <span className={isDark ? "text-[#FFCC00]" : "text-[#FF5F1F]"}>verse</span>
            <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-[#FF5F1F] text-white">ADMIN</span>
          </span>
        </button>
      </div>

      {/* Center Search Bar: Identical structure */}
      <div className="flex-1 max-w-xl mx-2 sm:mx-6">
        <div
          className={`flex items-center gap-2 px-3 py-1.5 sm:py-2 rounded-xl border transition-colors ${
            isDark
              ? `bg-[#242424] ${isFocused ? "border-[#FFCC00]" : "border-[#333333] hover:border-[#FFCC00]/60"}`
              : `bg-white ${isFocused ? "border-[#FF5F1F]" : "border-[#F0E8DD] hover:border-[#D6C9BB]"}`
          }`}
        >
          <Search
            size={16}
            className={`shrink-0 transition-colors ${isDark ? "text-stone-400 group-hover:text-[#FFCC00]" : "text-[#7A6F64]"}`}
            strokeWidth={2}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search Admin..."
            className={`w-full bg-transparent text-sm font-baloo focus:outline-none ${
              isDark ? "text-white placeholder:text-stone-400" : "text-[#231C14] placeholder:text-[#9C8F82]"
            }`}
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange && onSearchChange("")}
              className={`p-0.5 cursor-pointer ${isDark ? "text-stone-400 hover:text-[#FFCC00]" : "text-[#7A6F64] hover:text-[#231C14]"}`}
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
        {/* View User Site Button */}
        {onNavigateToUserPanel && (
          <button
            type="button"
            onClick={onNavigateToUserPanel}
            title="Switch to User Site"
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
              isDark
                ? "bg-[#242424] border-[#383838] text-stone-200 hover:border-[#FFCC00]"
                : "bg-[#FFFDF7] border-[#EDE4D6] text-[#231C14] hover:border-[#FF5F1F]"
            }`}
          >
            <span>User View</span>
            <ExternalLink size={12} className="text-[#FF5F1F]" />
          </button>
        )}

        {/* Notifications Bell with dot */}
        <button
          type="button"
          onClick={onOpenNotifications}
          title="Notifications"
          className={`relative p-1.5 rounded-full transition-colors cursor-pointer active:scale-95 ${
            isDark
              ? "text-stone-300 hover:text-[#FFCC00]"
              : "text-[#7A6F64] hover:text-[#FF5F1F]"
          }`}
        >
          <Bell size={20} strokeWidth={2} />
          {unreadCount > 0 && (
            <span
              className={`absolute top-1 right-1 w-2 h-2 rounded-full ring-2 ${
                isDark ? "bg-[#FFCC00] ring-[#1a1a1a]" : "bg-[#FF5F1F] ring-white"
              }`}
            />
          )}
        </button>

        {/* Admin Profile Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className={`flex items-center gap-1.5 p-0.5 rounded-full transition-all cursor-pointer ${
              isDark ? "hover:ring-2 hover:ring-[#FFCC00]/40" : "hover:ring-2 hover:ring-[#FF5F1F]/30"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full overflow-hidden border flex items-center justify-center shrink-0 shadow-sm ${
                isDark ? "border-[#444] bg-stone-800" : "border-[#D9D1C5] bg-amber-100"
              }`}
            >
              <img
                src="/src/assets/images/luffy_avatar_1790269807034.jpg"
                alt="Admin"
                className="w-full h-full object-cover scale-105"
              />
            </div>
            <span
              className={`hidden md:inline text-xs font-black tracking-wide transition-colors ${
                isDark ? "text-stone-300 hover:text-[#FFCC00]" : "text-[#231C14]"
              }`}
            >
              Admin
            </span>
            <ChevronDown size={14} className={isDark ? "text-stone-400 hover:text-[#FFCC00]" : "text-[#625547]"} />
          </button>

          {/* Avatar Dropdown */}
          {showDropdown && (
            <div
              className={`absolute right-0 mt-2.5 w-48 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150 ${
                isDark
                  ? "bg-[#242424] border border-[#383838] text-stone-200"
                  : "bg-white border border-[#F0E8DD] text-[#231C14]"
              }`}
            >
              <div className={`px-4 py-2 border-b ${isDark ? "border-[#383838]" : "border-[#F0E8DD]"}`}>
                <p className={`text-[10px] uppercase font-bold tracking-wider ${isDark ? "text-stone-400" : "text-[#7A6F64]"}`}>
                  Signed in as
                </p>
                <p className={`text-xs font-black mt-0.5 truncate ${isDark ? "text-white" : "text-[#231C14]"}`}>
                  System Administrator
                </p>
              </div>

              {onNavigateToUserPanel && (
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    onNavigateToUserPanel();
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer ${
                    isDark
                      ? "text-stone-300 hover:bg-[#2e2e2e] hover:text-[#FFCC00]"
                      : "text-[#4A3E31] hover:bg-[#F7F2EA]"
                  }`}
                >
                  <ExternalLink size={14} />
                  <span>View User Site</span>
                </button>
              )}

              {onLogout && (
                <button
                  onClick={() => {
                    onLogout();
                    setShowDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-black flex items-center gap-2 transition-colors cursor-pointer ${
                    isDark
                      ? "text-[#FFCC00] hover:bg-[#2e2e2e]"
                      : "text-[#FF5F1F] hover:bg-[#FDF3EE]"
                  }`}
                >
                  <LogOut size={14} />
                  <span>Log Out</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export { AdminTopHeader };
