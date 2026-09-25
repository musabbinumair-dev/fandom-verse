import { useState } from "react";
import { Search, Bell, X, LogOut, ChevronDown, ExternalLink } from "lucide-react";

const AdminTopHeader = ({
  searchQuery = "",
  onSearchChange,
  onOpenNotifications,
  onNavigateHome,
  onNavigateToUserPanel,
  unreadCount = 2,
  onLogout
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-30 px-4 sm:px-6 h-14 flex items-center justify-between gap-4 font-baloo select-none shrink-0 transition-colors duration-200 bg-white border-b border-gray-200 text-gray-800">
      {/* Brand logo at top left */}
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
              fill="#F59E0B"
            />
          </svg>

          {/* Clean lowercase text + ADMIN tag */}
          <span className="text-lg sm:text-xl font-bold tracking-tight flex items-center gap-1.5">
            <span className="text-gray-900">fandom</span>
            <span className="text-[#F59E0B]">verse</span>
            <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-[#F59E0B] text-black">
              ADMIN
            </span>
          </span>
        </button>
      </div>

      {/* Center Search Bar */}
      <div className="flex-1 max-w-xl mx-2 sm:mx-6">
        <div
          className={`flex items-center gap-2 px-3 py-1.5 sm:py-2 rounded-xl border transition-colors bg-gray-100 ${
            isFocused ? "border-[#F59E0B] bg-white ring-2 ring-[#F59E0B]/20" : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <Search
            size={16}
            className="shrink-0 transition-colors text-gray-400"
            strokeWidth={2}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search users, submissions, wikis..."
            className="w-full bg-transparent text-sm font-baloo focus:outline-none text-gray-900 placeholder:text-gray-400"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange && onSearchChange("")}
              className="p-0.5 cursor-pointer text-gray-400 hover:text-gray-600"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
        {/* Portal switch button */}
        <button
          type="button"
          onClick={onNavigateToUserPanel}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-300 bg-amber-50 text-amber-800 text-xs font-bold hover:bg-amber-100 transition-colors"
          title="Return to Main Portal"
        >
          <ExternalLink size={13} />
          <span>User Portal</span>
        </button>

        {/* Notifications Bell */}
        <button
          type="button"
          onClick={onOpenNotifications}
          title="Notifications"
          className="relative p-1.5 rounded-full transition-colors cursor-pointer active:scale-95 text-gray-500 hover:text-[#F59E0B] hover:bg-gray-100"
        >
          <Bell size={20} strokeWidth={2} />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full ring-2 bg-[#F59E0B] ring-white" />
          )}
        </button>

        {/* Admin Avatar */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-1.5 p-0.5 rounded-full transition-all cursor-pointer hover:ring-2 hover:ring-[#F59E0B]/40"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border flex items-center justify-center shrink-0 shadow-sm border-amber-400 bg-amber-100 text-amber-900 font-black text-xs">
              AD
            </div>
            <span className="hidden md:inline text-xs font-bold tracking-wide transition-colors text-gray-800 hover:text-[#F59E0B]">
              Admin
            </span>
            <ChevronDown size={14} className="text-gray-500 hover:text-[#F59E0B]" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2.5 w-48 rounded-xl shadow-lg py-2 z-50 bg-white border border-gray-200 text-gray-800 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-[10px] uppercase font-bold tracking-wider text-amber-600">
                  Administrator
                </p>
                <p className="text-xs font-bold mt-0.5 truncate text-gray-900">
                  Admin Console
                </p>
              </div>
              <button
                onClick={() => {
                  onNavigateToUserPanel && onNavigateToUserPanel();
                  setShowDropdown(false);
                }}
                className="w-full text-left px-4 py-2 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer text-gray-700 hover:bg-amber-50 hover:text-[#F59E0B]"
              >
                <ExternalLink size={14} className="text-[#F59E0B]" />
                <span>Open User Portal</span>
              </button>
              {onLogout && (
                <button
                  onClick={() => {
                    onLogout();
                    setShowDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer text-red-600 hover:bg-red-50"
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
export default AdminTopHeader;
