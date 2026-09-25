import React from 'react';
import { TopHeader } from './TopHeader.jsx';
import { LeftSidebar } from './LeftSidebar.jsx';
import { FandomFooter } from './FandomFooter.jsx';

/**
 * UserLayout - Shared Chassis for all User-Panel Pages
 * 
 * Standardizes the viewport layout:
 * 1. Fixed TopHeader navbar at top (supports navTheme="light" | "dark")
 * 2. Left icon rail / sidebar (LeftSidebar, supports theme="light" | "dark")
 * 3. Main scrollable content area stretching full width next to sidebar
 * 4. FandomFooter at the bottom
 */
export const UserLayout = ({
  children,
  activeTab,
  onSelectTab,
  savedCount = 0,
  isMoreOpen = false,
  onToggleMore,
  onCloseMore,
  onSelectCategory,
  onStartWiki,
  searchQuery = '',
  onSearchChange,
  onOpenNotifications,
  onOpenProfile,
  onNavigateHome,
  onNavigateToDashboard,
  onOpenAuth,
  onOpenSaved,
  isLoggedIn = true,
  onLogout,
  unreadCount = 2,
  onOpenLinkModal,
  navTheme = 'light',
}) => {
  const isDark = navTheme === 'dark';

  return (
    <div className={`flex flex-col h-screen w-screen overflow-hidden font-baloo select-none ${
      isDark ? 'bg-[#121212] text-stone-200' : 'bg-[#FFFDF7] text-[#231C14]'
    }`}>
      {/* 1. TOP NAVBAR / HEADER */}
      <TopHeader
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onOpenNotifications={onOpenNotifications}
        onOpenProfile={onOpenProfile}
        onOpenDashboard={onNavigateToDashboard}
        onNavigateHome={onNavigateHome}
        unreadCount={unreadCount}
        onOpenAuth={onOpenAuth}
        onOpenSaved={onOpenSaved}
        isLoggedIn={isLoggedIn}
        onLogout={onLogout}
        theme={navTheme}
      />

      {/* 2. BODY CONTENT CHASSIS: Left Sidebar + Main Content Area */}
      <div className="flex-1 flex h-full min-h-0 overflow-hidden" data-panel="user-panel">
        {/* Left Sidebar Rail */}
        <LeftSidebar
          activeTab={activeTab}
          onSelectTab={onSelectTab}
          savedCount={savedCount}
          isMoreOpen={isMoreOpen}
          onToggleMore={onToggleMore}
          onCloseMore={onCloseMore}
          onSelectCategory={onSelectCategory}
          onStartWiki={onStartWiki}
          isLoggedIn={isLoggedIn}
          theme={navTheme}
        />

        {/* Main Content Scrollable Viewport (Background fixed behind scrolling content) */}
        <main className={`flex-1 h-full min-w-0 overflow-y-auto flex flex-col justify-between ${
          isDark ? 'bg-[#121212]' : 'bg-[#FFFDF7]'
        }`}>
          <div className="w-full flex-1">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
