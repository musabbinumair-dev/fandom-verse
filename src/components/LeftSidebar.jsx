import { MoreFlyoutMenu } from "./MoreFlyoutMenu";

const LeftSidebar = ({
  activeTab,
  onSelectTab,
  savedCount,
  isMoreOpen,
  onToggleMore,
  onCloseMore,
  onSelectCategory,
  onStartWiki,
  isLoggedIn = true,
  theme = "light"
}) => {
  const isDark = theme === "dark";

  // Helper for tab button styles
  const getTabClass = (tabKey) => {
    const isActive = activeTab === tabKey && !isMoreOpen;
    if (isDark) {
      return `flex flex-col items-center justify-center w-full py-1.5 group cursor-pointer transition-colors ${
        isActive ? "text-[#FFCC00]" : "text-stone-300 hover:text-[#FFCC00]"
      }`;
    }
    return `flex flex-col items-center justify-center w-full py-1.5 group cursor-pointer transition-colors ${
      isActive ? "text-[#FF5F1F]" : "text-[#7A6F64] hover:text-[#231C14]"
    }`;
  };

  const moreButtonClass = isDark
    ? `flex flex-col items-center justify-center w-full py-1.5 group cursor-pointer transition-colors ${
        isMoreOpen ? "text-[#FFCC00]" : "text-stone-300 hover:text-[#FFCC00]"
      }`
    : `flex flex-col items-center justify-center w-full py-1.5 group cursor-pointer transition-colors ${
        isMoreOpen ? "text-[#FF5F1F]" : "text-[#7A6F64] hover:text-[#231C14]"
      }`;

  return (
    <div className="relative shrink-0 flex h-full z-20 select-none font-baloo">
      <aside
        className={`w-16 h-full flex flex-col justify-between items-center py-3 shrink-0 transition-colors duration-200 ${
          isDark
            ? "bg-[#1a1a1a] border-r border-[#2a2a2a]"
            : "bg-white border-r border-[#F0E8DD]"
        }`}
      >
        {/* Top rail items */}
        <div className="flex flex-col items-center gap-3.5 w-full">
          {isLoggedIn ? (
            <>
              {/* 1. Explorer */}
              <button
                type="button"
                onClick={() => {
                  onSelectTab("home");
                  onCloseMore();
                }}
                className={getTabClass("home")}
                title="Explorer"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                </svg>
                <span className="text-[11px] mt-1 font-semibold tracking-tight">Explorer</span>
              </button>

              {/* 2a. Dashboard */}
              <button
                type="button"
                onClick={() => {
                  onSelectTab("dashboard");
                  onCloseMore();
                }}
                className={getTabClass("dashboard")}
                title="Dashboard"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="7" height="9" rx="1" />
                  <rect x="14" y="3" width="7" height="5" rx="1" />
                  <rect x="14" y="12" width="7" height="9" rx="1" />
                  <rect x="3" y="16" width="7" height="5" rx="1" />
                </svg>
                <span className="text-[10px] mt-1 font-semibold tracking-tight">Dashboard</span>
              </button>

              {/* 2b. Categories */}
              <button
                type="button"
                onClick={() => {
                  onSelectTab("category");
                  onCloseMore();
                }}
                className={getTabClass("category")}
                title="Categories"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
                </svg>
                <span className="text-[10px] mt-1 font-semibold tracking-tight">Categories</span>
              </button>

              {/* 3. Characters */}
              <button
                type="button"
                onClick={() => {
                  onSelectTab("characters");
                  onCloseMore();
                }}
                className={getTabClass("characters")}
                title="Characters"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span className="text-[10px] mt-1 font-semibold tracking-tight">Characters</span>
              </button>

              {/* 4. Multimedia Center */}
              <button
                type="button"
                onClick={() => {
                  onSelectTab("multimedia");
                  onCloseMore();
                }}
                className={getTabClass("multimedia")}
                title="Multimedia Center"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2.5" />
                  <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
                </svg>
                <span className="text-[11px] mt-1 font-semibold tracking-tight">Media</span>
              </button>

              {/* Articles & Events */}
              <button
                type="button"
                onClick={() => {
                  onSelectTab("articles-events");
                  onCloseMore();
                }}
                className={getTabClass("articles-events")}
                title="Articles & Events"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
                <span className="text-[10px] mt-1 font-semibold tracking-tight">Articles</span>
              </button>

              {/* Events */}
              <button
                type="button"
                onClick={() => {
                  onSelectTab("events");
                  onCloseMore();
                }}
                className={getTabClass("events")}
                title="Events"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span className="text-[10px] mt-1 font-semibold tracking-tight">Events</span>
              </button>

              {/* Merchandise */}
              <button
                type="button"
                onClick={() => {
                  onSelectTab("merchandise");
                  onCloseMore();
                }}
                className={getTabClass("merchandise")}
                title="Merchandise"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <span className="text-[10px] mt-1 font-semibold tracking-tight">Merch</span>
              </button>

              {/* Feedback */}
              <button
                type="button"
                onClick={() => {
                  onSelectTab("feedback");
                  onCloseMore();
                }}
                className={getTabClass("feedback")}
                title="Feedback"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  <path d="M8 10l2 2 2-3 2 2" />
                </svg>
                <span className="text-[10px] mt-1 font-semibold tracking-tight">Feedback</span>
              </button>

              {/* Bookmarks */}
              <button
                type="button"
                onClick={() => {
                  onSelectTab("saved");
                  onCloseMore();
                }}
                className={getTabClass("saved")}
                title="Bookmarks"
              >
                <div className="relative">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21L12 16L5 21V5C5 3.9 5.9 3 7 3H17C18.1 3 19 3.9 19 5V21Z" />
                  </svg>
                  {savedCount > 0 && (
                    <span
                      className={`absolute -top-0.5 -right-1 w-2 h-2 rounded-full ring-2 ${
                        isDark ? "bg-[#FFCC00] ring-[#1a1a1a]" : "bg-[#FF5F1F] ring-white"
                      }`}
                    />
                  )}
                </div>
                <span className="text-[11px] mt-1 font-semibold tracking-tight">Bookmarks</span>
              </button>

              {/* Profile */}
              <button
                type="button"
                onClick={() => {
                  onSelectTab("profile");
                  onCloseMore();
                }}
                className={getTabClass("profile")}
                title="Profile"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span className="text-[11px] mt-1 font-semibold tracking-tight">Profile</span>
              </button>
            </>
          ) : (
            <>
              {/* Guest: Explorer */}
              <button
                type="button"
                onClick={() => {
                  onSelectTab("home");
                  onCloseMore();
                }}
                className={getTabClass("home")}
                title="Explorer"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                </svg>
                <span className="text-[11px] mt-1 font-semibold tracking-tight">Explorer</span>
              </button>

              {/* Guest: Categories */}
              <button
                type="button"
                onClick={() => {
                  onSelectTab("category");
                  onCloseMore();
                }}
                className={getTabClass("category")}
                title="Categories"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
                </svg>
                <span className="text-[10px] mt-1 font-semibold tracking-tight">Categories</span>
              </button>

              {/* Guest: Bookmarks */}
              <button
                type="button"
                onClick={() => {
                  onSelectTab("saved");
                  onCloseMore();
                }}
                className={getTabClass("saved")}
                title="Bookmarks"
              >
                <div className="relative">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21L12 16L5 21V5C5 3.9 5.9 3 7 3H17C18.1 3 19 3.9 19 5V21Z" />
                  </svg>
                  {savedCount > 0 && (
                    <span
                      className={`absolute -top-0.5 -right-1 w-2 h-2 rounded-full ring-2 ${
                        isDark ? "bg-[#FFCC00] ring-[#1a1a1a]" : "bg-[#FF5F1F] ring-white"
                      }`}
                    />
                  )}
                </div>
                <span className="text-[11px] mt-1 font-semibold tracking-tight">Bookmarks</span>
              </button>
            </>
          )}
        </div>

        {/* Bottom items: Settings & More */}
        <div className="flex flex-col items-center gap-3.5 w-full pb-1">
          {/* Settings */}
          <button
            type="button"
            onClick={() => {
              onSelectTab("settings");
              onCloseMore();
            }}
            className={getTabClass("settings")}
            title="Settings"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
            <span className="text-[11px] mt-1 font-semibold tracking-tight">Settings</span>
          </button>

          {/* More Button */}
          <button
            type="button"
            onClick={onToggleMore}
            className={moreButtonClass}
            title="Toggle More Menu"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="5" cy="12" r="1.5" fill="currentColor" />
              <circle cx="12" cy="12" r="1.5" fill="currentColor" />
              <circle cx="19" cy="12" r="1.5" fill="currentColor" />
            </svg>
            <span className="text-[11px] mt-1 font-semibold tracking-tight">More</span>
          </button>
        </div>
      </aside>

      {/* Expanded More Menu Panel */}
      <MoreFlyoutMenu
        isOpen={isMoreOpen}
        onClose={onCloseMore}
        onSelectCategory={onSelectCategory}
        onStartWiki={onStartWiki}
        theme={theme}
      />
    </div>
  );
};

export { LeftSidebar };
