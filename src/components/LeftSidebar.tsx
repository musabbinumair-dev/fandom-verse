import React from 'react';
import { MoreFlyoutMenu } from './MoreFlyoutMenu';

interface LeftSidebarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  savedCount: number;
  isMoreOpen: boolean;
  onToggleMore: () => void;
  onCloseMore: () => void;
  onSelectCategory?: (category: string) => void;
  onStartWiki?: () => void;
  isLoggedIn?: boolean;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  activeTab,
  onSelectTab,
  savedCount,
  isMoreOpen,
  onToggleMore,
  onCloseMore,
  onSelectCategory,
  onStartWiki,
  isLoggedIn = true,
}) => {
  return (
    <div className="relative shrink-0 flex h-full z-20 select-none font-baloo">
      {/* 
        The Left Icon Rail (Clean Flat Architectural Design)
        Using our app's warm crisp palette (#FFFDF7 / #FFFFFF, #231C14 ink, #FF5F1F flame accent)
        Zero sloppy fuzzy shadows or glow rings.
      */}
      <aside className="w-16 h-full bg-white border-r border-[#F0E8DD] flex flex-col justify-between items-center py-3 shrink-0">
        {/* Top rail items: Home, Saved, Progress, Utilities */}
        <div className="flex flex-col items-center gap-3.5 w-full">
          {/* 1. Home */}
          <button
            type="button"
            onClick={() => {
              onSelectTab('home');
              onCloseMore();
            }}
            className={`flex flex-col items-center justify-center w-full py-1.5 group cursor-pointer transition-colors ${
              activeTab === 'home' && !isMoreOpen
                ? 'text-[#FF5F1F]'
                : 'text-[#7A6F64] hover:text-[#231C14]'
            }`}
            title="Home"
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
              <path d="M3 9.5L12 3L21 9.5V20C21 20.6 20.6 21 20 21H4C3.4 21 3 20.6 3 20V9.5Z" />
              <path d="M9 21V12H15V21" />
            </svg>
            <span className="text-[11px] mt-1 font-semibold tracking-tight">Home</span>
          </button>

          {/* 2. Dashboard - Shown only if isLoggedIn is true */}
          {isLoggedIn && (
            <button
              type="button"
              onClick={() => {
                onSelectTab('dashboard');
                onCloseMore();
              }}
              className={`flex flex-col items-center justify-center w-full py-1.5 group cursor-pointer transition-colors ${
                activeTab === 'dashboard' && !isMoreOpen
                  ? 'text-[#FF5F1F]'
                  : 'text-[#7A6F64] hover:text-[#231C14]'
              }`}
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
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
              </svg>
              <span className="text-[11px] mt-1 font-semibold tracking-tight">Dashboard</span>
            </button>
          )}

          {/* 3. Saved */}
          <button
            type="button"
            onClick={() => {
              onSelectTab('saved');
              onCloseMore();
            }}
            className={`flex flex-col items-center justify-center w-full py-1.5 group cursor-pointer transition-colors ${
              activeTab === 'saved' && !isMoreOpen
                ? 'text-[#FF5F1F]'
                : 'text-[#7A6F64] hover:text-[#231C14]'
            }`}
            title="Saved"
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
              {/* Notification dot in app accent color */}
              {savedCount > 0 && (
                <span className="absolute -top-0.5 -right-1 w-2 h-2 bg-[#FF5F1F] rounded-full ring-2 ring-white" />
              )}
            </div>
            <span className="text-[11px] mt-1 font-semibold tracking-tight">Saved</span>
          </button>

          {/* 4. Progress */}
          <button
            type="button"
            onClick={() => {
              onSelectTab('progress');
              onCloseMore();
            }}
            className={`flex flex-col items-center justify-center w-full py-1.5 group cursor-pointer transition-colors ${
              activeTab === 'progress' && !isMoreOpen
                ? 'text-[#FF5F1F]'
                : 'text-[#7A6F64] hover:text-[#231C14]'
            }`}
            title="Progress"
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
              <circle cx="12" cy="12" r="9" />
              <path d="M9 12L11 14L15 10" />
            </svg>
            <span className="text-[11px] mt-1 font-semibold tracking-tight">Progress</span>
          </button>

          {/* 5. Utilities */}
          <button
            type="button"
            onClick={() => {
              onSelectTab('utilities');
              onCloseMore();
            }}
            className={`flex flex-col items-center justify-center w-full py-1.5 group cursor-pointer transition-colors ${
              activeTab === 'utilities' && !isMoreOpen
                ? 'text-[#FF5F1F]'
                : 'text-[#7A6F64] hover:text-[#231C14]'
            }`}
            title="Utilities"
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
              <rect x="3" y="3" width="7" height="7" rx="2" />
              <rect x="14" y="3" width="7" height="7" rx="2" />
              <rect x="3" y="14" width="7" height="7" rx="2" />
              <rect x="14" y="14" width="7" height="7" rx="2" />
            </svg>
            <span className="text-[11px] mt-1 font-semibold tracking-tight">Utilities</span>
          </button>
        </div>

        {/* Bottom items: Settings & More */}
        <div className="flex flex-col items-center gap-3.5 w-full pb-1">
          {/* Settings */}
          <button
            type="button"
            onClick={() => {
              onSelectTab('settings');
              onCloseMore();
            }}
            className={`flex flex-col items-center justify-center w-full py-1.5 group cursor-pointer transition-colors ${
              activeTab === 'settings' && !isMoreOpen
                ? 'text-[#FF5F1F]'
                : 'text-[#7A6F64] hover:text-[#231C14]'
            }`}
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
            className={`flex flex-col items-center justify-center w-full py-1.5 group cursor-pointer transition-colors ${
              isMoreOpen
                ? 'text-[#FF5F1F]'
                : 'text-[#7A6F64] hover:text-[#231C14]'
            }`}
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
      />
    </div>
  );
};
