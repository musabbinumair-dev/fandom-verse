const AdminSidebar = ({
  activeTab = "dashboard",
  onSelectTab,
  onNavigateToUserPanel,
  theme = "light"
}) => {
  const isDark = theme === "dark";

  // Helper for tab button styles - EXACT clone of LeftSidebar's getTabClass
  const getTabClass = (tabKey) => {
    const isActive = activeTab === tabKey;
    if (isDark) {
      return `flex flex-col items-center justify-center w-full py-1.5 group cursor-pointer transition-colors ${
        isActive ? "text-[#FFCC00]" : "text-stone-300 hover:text-[#FFCC00]"
      }`;
    }
    return `flex flex-col items-center justify-center w-full py-1.5 group cursor-pointer transition-colors ${
      isActive ? "text-[#FF5F1F]" : "text-[#7A6F64] hover:text-[#231C14]"
    }`;
  };

  return (
    <div className="relative shrink-0 flex h-full z-20 select-none font-baloo">
      <aside
        className={`w-16 h-full flex flex-col justify-between items-center py-3 shrink-0 transition-colors duration-200 ${
          isDark
            ? "bg-[#1a1a1a] border-r border-[#2a2a2a]"
            : "bg-white border-r border-[#F0E8DD]"
        }`}
      >
        {/* Top rail items: Dashboard & Manage Content */}
        <div className="flex flex-col items-center gap-3.5 w-full">
          {/* 1. Dashboard */}
          <button
            type="button"
            onClick={() => onSelectTab && onSelectTab("dashboard")}
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
            <span className="text-[11px] mt-1 font-semibold tracking-tight">Dashboard</span>
          </button>

          {/* 2. Manage Content */}
          <button
            type="button"
            onClick={() => onSelectTab && onSelectTab("content")}
            className={getTabClass("content")}
            title="Manage Content"
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
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <line x1="10" y1="9" x2="8" y2="9" />
            </svg>
            <span className="text-[10px] mt-1 font-semibold tracking-tight">Content</span>
          </button>
        </div>

        {/* Bottom rail item: Return to User Site */}
        <div className="flex flex-col items-center gap-3.5 w-full pb-1">
          {onNavigateToUserPanel && (
            <button
              type="button"
              onClick={onNavigateToUserPanel}
              className={`flex flex-col items-center justify-center w-full py-1.5 group cursor-pointer transition-colors ${
                isDark ? "text-stone-300 hover:text-[#FFCC00]" : "text-[#7A6F64] hover:text-[#231C14]"
              }`}
              title="View User Site"
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
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              <span className="text-[10px] mt-1 font-semibold tracking-tight">User Site</span>
            </button>
          )}
        </div>
      </aside>
    </div>
  );
};

export { AdminSidebar };
