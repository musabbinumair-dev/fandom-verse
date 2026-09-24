import React, { useState } from 'react';
import { LeftSidebar } from './components/LeftSidebar';
import { TopHeader } from './components/TopHeader';
import { NewReleaseCategories } from './components/homepage/NewReleaseCategories';
import { Hero } from './components/homepage/Hero';
import { FilterBar } from './components/homepage/FilterBar';
import { ContentCard } from './components/homepage/ContentCard';
import { Footer } from './components/homepage/Footer';
import { SignInPromptModal } from './components/homepage/SignInPromptModal';
import { ContentDetailModal } from './components/homepage/ContentDetailModal';
import { DashboardPage } from './components/DashboardPage';
import { SavedBookmarksPage } from './components/SavedBookmarksPage';
import { UtilitiesView } from './components/UtilitiesView';
import { ProfilePage } from './components/ProfilePage';
import { ExplorePage } from './components/ExplorePage';
import { ContentDetailPage } from './components/ContentDetailPage';
import {
  NotificationsDrawer,
  ProfileDrawer,
  SettingsDrawer,
} from './components/SideDrawers';
import { StartWikiModal } from './components/StartWikiModal';
import {
  TRENDING_CONTENT,
  HERO_FEATURED,
  ContentItem,
} from './data/homepageData';

export default function App() {
  // Navigation tabs: 'home' | 'dashboard' | 'saved' | 'progress' | 'utilities' | 'profile'
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isMoreOpen, setIsMoreOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  // Search query from TopHeader
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Visitor role navigation & filter states for homepage
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filterSort, setFilterSort] = useState<string>('Most popular');
  const [filterType, setFilterType] = useState<string>('All Types');
  const [filterQuality, setFilterQuality] = useState<string>('All');
  const [filterGenre, setFilterGenre] = useState<string>('All');
  const [filterRating, setFilterRating] = useState<string>('All');
  const [filterYear, setFilterYear] = useState<string>('All');
  const [filterLanguage, setFilterLanguage] = useState<string>('All');
  const [filterOrderBy, setFilterOrderBy] = useState<string>('Feature');

  // Modals and Drawers
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [infoModal, setInfoModal] = useState<{ title: string; desc: string } | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isStartWikiOpen, setIsStartWikiOpen] = useState<boolean>(false);
  const [savedCount, setSavedCount] = useState<number>(3);
  const [savedItemIds, setSavedItemIds] = useState<Set<string>>(
    new Set(['trend-1', 'trend-3'])
  );

  const handleOpenAuth = (mode: 'login' | 'signup' = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('home');
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setActiveTab('dashboard');
  };

  const handleToggleSaveItem = (item: ContentItem) => {
    setSavedItemIds((prev) => {
      const next = new Set(prev);
      if (next.has(item.id)) {
        next.delete(item.id);
        setSavedCount((c) => Math.max(0, c - 1));
      } else {
        next.add(item.id);
        setSavedCount((c) => c + 1);
      }
      return next;
    });
  };

  const handleSelectTab = (tab: string) => {
    if (tab === 'settings') {
      setIsSettingsOpen(true);
    } else {
      setActiveTab(tab);
    }
    setIsMoreOpen(false);
  };

  // Filter & Sort content based on category, type, genre, rating, year, and search query
  const filtered = TRENDING_CONTENT.filter((item) => {
    const matchesCat =
      selectedCategory === 'All' ||
      item.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesType =
      filterType === 'All Types' || item.type === filterType;
    const matchesGenre =
      filterGenre === 'All' ||
      (item.genre && item.genre.toLowerCase().includes(filterGenre.toLowerCase())) ||
      item.category.toLowerCase().includes(filterGenre.toLowerCase());
    const matchesRating =
      filterRating === 'All' ||
      parseFloat(item.rating) >= parseFloat(filterRating);
    const matchesYear =
      filterYear === 'All' || item.year.includes(filterYear);
    const matchesSearch =
      !searchQuery.trim() ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.genre && item.genre.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.publisher && item.publisher.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesType && matchesGenre && matchesRating && matchesYear && matchesSearch;
  });

  const displayedContent = [...filtered].sort((a, b) => {
    if (filterOrderBy === 'A-Z' || filterSort === 'A-Z') return a.title.localeCompare(b.title);
    if (filterOrderBy === 'Latest' || filterSort === 'Latest') return b.year.localeCompare(a.year);
    if (filterOrderBy === 'Rating' || filterOrderBy === 'Most popular' || filterSort === 'Most popular') {
      return parseFloat(b.rating) - parseFloat(a.rating);
    }
    return 0;
  });

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#FFFDF7] text-[#231C14] font-baloo select-none">
      {/* 1. TOP HEADER BAR */}
      <TopHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenProfile={() => setActiveTab('profile')}
        unreadCount={2}
        onOpenAuth={handleOpenAuth}
        onOpenSaved={() => handleSelectTab('saved')}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />

      {/* 2. CONDITIONAL BODY CONTENT CHASSIS */}
      {isLoggedIn ? (
        /* ========================================================================= */
        /*   REGISTERED USER PANEL CHASSIS                                           */
        /* ========================================================================= */
        <div className="flex-1 flex h-full min-h-0 overflow-hidden" data-panel="registered">
          {/* LEFT ICON SIDEBAR (Includes Dashboard default tab) */}
          <LeftSidebar
            activeTab={activeTab}
            onSelectTab={handleSelectTab}
            savedCount={savedCount}
            isMoreOpen={isMoreOpen}
            onToggleMore={() => setIsMoreOpen(!isMoreOpen)}
            onCloseMore={() => setIsMoreOpen(false)}
            onSelectCategory={(category) => {
              setActiveTab('home');
              setSelectedCategory(category);
              setIsMoreOpen(false);
            }}
            onStartWiki={() => setIsStartWikiOpen(true)}
            isLoggedIn={true}
          />

          {/* Registered Workspace Router */}
          <div className="flex-1 h-full min-w-0 overflow-y-auto bg-[#FFFDF7]">
            {selectedItem ? (
              <div className="w-full">
                <ContentDetailPage 
                  item={{
                    id: selectedItem.id,
                    title: selectedItem.title,
                    category: selectedItem.category,
                    type: selectedItem.type || 'VIDEO',
                    year: selectedItem.year || '2024',
                    popularity: selectedItem.popularity || '9.5K',
                    image: selectedItem.posterImage,
                    genre: (selectedItem as any).genre,
                    desc: (selectedItem as any).desc
                  }}
                  onBack={() => setSelectedItem(null)}
                  onOpenArticle={(item) => {
                    setSelectedItem({
                      id: item.id,
                      title: item.title,
                      category: item.category,
                      year: item.year,
                      rating: '9.0',
                      popularity: item.popularity,
                      posterImage: item.image,
                      type: item.type,
                    });
                  }}
                />
              </div>
            ) : (
              <>
                {/* VIEW 1: PERSONALIZED DASHBOARD (Default Landing) */}
                {activeTab === 'dashboard' && (
                  <div className="w-full">
                    <DashboardPage
                      onNavigateToSaved={() => setActiveTab('saved')}
                      onNavigateToExplore={() => setActiveTab('home')}
                      onOpenProfile={() => setActiveTab('profile')}
                    />
                  </div>
                )}

                {/* VIEW 2: 100% MATCHING PROFILE PAGE */}
                {activeTab === 'profile' && (
                  <div className="w-full">
                    <ProfilePage
                      onBackToHome={() => setActiveTab('dashboard')}
                      onSaveSuccess={() => {
                        alert('Profile preferences and fandom settings successfully saved!');
                        setActiveTab('dashboard');
                      }}
                    />
                  </div>
                )}

                {/* VIEW 3: 100% MATCHING CONTENT EXPLORER PAGE */}
                {activeTab === 'home' && (
                  <div className="w-full">
                    <ExplorePage 
                      onOpenArticle={(item) => {
                        setSelectedItem({
                          id: item.id,
                          title: item.title,
                          category: item.category,
                          year: item.year,
                          rating: '9.0',
                          popularity: item.popularity,
                          posterImage: item.image,
                          type: item.type,
                        });
                      }} 
                    />
                  </div>
                )}

                {/* VIEW 4: SAVED BOOKMARKS */}
                {activeTab === 'saved' && (
                  <div className="p-4 sm:p-6 max-w-7xl mx-auto">
                    <SavedBookmarksPage
                      savedStories={[]}
                      onSelectStory={(story) => {
                        setSelectedItem({
                          id: story.id,
                          title: story.title,
                          category: story.category,
                          year: '2024',
                          rating: '9.0',
                          popularity: story.readTime || '5 min read',
                          posterImage: story.image,
                          type: 'Series',
                        });
                      }}
                      onRemoveSavedStory={(id) => {
                        setSavedCount((prev) => Math.max(0, prev - 1));
                      }}
                    />
                  </div>
                )}

                {/* VIEW 5: UTILITIES */}
                {activeTab === 'utilities' && (
                  <div className="p-4 sm:p-6 max-w-7xl mx-auto">
                    <UtilitiesView
                      onBackToHome={() => setActiveTab('home')}
                      onOpenToolModal={(tool) => {
                        setSelectedItem({
                          id: tool.id,
                          title: tool.title,
                          category: tool.category,
                          year: '2024',
                          rating: '9.5',
                          popularity: tool.tagline,
                          posterImage: tool.image,
                          type: 'Game',
                        });
                      }}
                    />
                  </div>
                )}

                {/* VIEW 6: PROGRESS */}
                {activeTab === 'progress' && (
                  <div className="p-6 max-w-4xl mx-auto space-y-6">
                    <div>
                      <h1 className="font-archivo text-xl sm:text-2xl text-[#14162B]">Fan Achievements & Progress</h1>
                      <p className="text-xs text-[#5C5F73] mt-1">Track your wiki contributions, lore mastery, and community reputation.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-[#F7F7F9] border border-[#E5E5EA] p-4 rounded-xl shadow-xs">
                        <span className="text-[10px] text-[#5C5F73] uppercase tracking-wider font-semibold">Wikis Explored</span>
                        <p className="text-2xl font-bold text-[#14162B] mt-1">28</p>
                        <span className="text-[11px] text-[#2A428C] font-semibold">Top 10% in Anime</span>
                      </div>
                      <div className="bg-[#F7F7F9] border border-[#E5E5EA] p-4 rounded-xl shadow-xs">
                        <span className="text-[10px] text-[#5C5F73] uppercase tracking-wider font-semibold">Reputation Level</span>
                        <p className="text-2xl font-bold text-[#14162B] mt-1">Lvl 18</p>
                        <span className="text-[11px] text-[#5C5F73]">2,400 XP to Lvl 19</span>
                      </div>
                      <div className="bg-[#F7F7F9] border border-[#E5E5EA] p-4 rounded-xl shadow-xs">
                        <span className="text-[10px] text-[#5C5F73] uppercase tracking-wider font-semibold">Badges Earned</span>
                        <p className="text-2xl font-bold text-[#14162B] mt-1">7</p>
                        <span className="text-[11px] text-[#5C5F73]">Next: Lore Keeper</span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /*   GUEST / VISITOR USER PANEL CHASSIS                                      */
        /* ========================================================================= */
        <div className="flex-1 flex h-full min-h-0 overflow-hidden" data-panel="guest">
          {/* LEFT ICON SIDEBAR (No Dashboard tab) */}
          <LeftSidebar
            activeTab={activeTab === 'dashboard' ? 'home' : activeTab}
            onSelectTab={(tab) => {
              if (tab === 'dashboard' || tab === 'progress') {
                handleOpenAuth('login');
              } else {
                handleSelectTab(tab);
              }
            }}
            savedCount={savedCount}
            isMoreOpen={isMoreOpen}
            onToggleMore={() => setIsMoreOpen(!isMoreOpen)}
            onCloseMore={() => setIsMoreOpen(false)}
            onSelectCategory={(category) => {
              setActiveTab('home');
              setSelectedCategory(category);
              setIsMoreOpen(false);
            }}
            onStartWiki={() => handleOpenAuth('login')}
            isLoggedIn={false}
          />

          {/* Guest Workspace Router */}
          <div className="flex-1 h-full min-w-0 overflow-y-auto bg-[#FFFDF7]">
            {/* VIEW 1: EXPLORE HOMEPAGE */}
            {(activeTab === 'home' || activeTab === 'dashboard') && (
              <div className="flex flex-col min-h-full bg-[#FFFDF7]">
                <Hero
                  onOpenArticle={() => {
                    setSelectedItem({
                      id: HERO_FEATURED.id,
                      title: HERO_FEATURED.title,
                      category: HERO_FEATURED.category,
                      year: HERO_FEATURED.releaseYear,
                      rating: HERO_FEATURED.rating,
                      popularity: '240K pre-ordered',
                      posterImage: HERO_FEATURED.posterImage,
                      type: 'Comic',
                    });
                  }}
                  onOpenAuth={handleOpenAuth}
                />

                <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-8 pb-16 space-y-12">
                  <NewReleaseCategories
                    onSelectItem={(item) => setSelectedItem(item)}
                    onSeeMore={() => {
                      document.getElementById('trending-heading')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  />

                  <section className="w-full space-y-5" aria-labelledby="trending-heading">
                    <div className="flex items-center justify-between pb-3 sm:pb-4 border-b-2 border-[#231C14]/10 mb-4 sm:mb-6">
                      <div className="flex items-center gap-2">
                        <h2 id="trending-heading" className="text-[#231C14] text-xl sm:text-2xl font-black tracking-wider uppercase font-titan">
                          TRENDING ACROSS FANDOMS
                        </h2>
                      </div>
                    </div>

                    <FilterBar
                      searchTerm={searchQuery}
                      onSearchChange={setSearchQuery}
                      quality={filterQuality}
                      onQualityChange={setFilterQuality}
                      genre={filterGenre}
                      onGenreChange={setFilterGenre}
                      rating={filterRating}
                      onRatingChange={setFilterRating}
                      year={filterYear}
                      onYearChange={setFilterYear}
                      language={filterLanguage}
                      onLanguageChange={setFilterLanguage}
                      orderBy={filterOrderBy}
                      onOrderByChange={setFilterOrderBy}
                      onReset={() => {
                        setSelectedCategory('All');
                        setSearchQuery('');
                      }}
                    />

                    {displayedContent.length === 0 ? (
                      <p className="text-sm font-bold text-stone-500 text-center py-8">No matching fandoms found.</p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pt-2">
                        {displayedContent.map((item) => (
                          <ContentCard
                            key={item.id}
                            item={item}
                            isSaved={savedItemIds.has(item.id)}
                            onSelect={(content) => setSelectedItem(content)}
                            onOpenAuth={handleOpenAuth}
                            onToggleSave={handleToggleSaveItem}
                          />
                        ))}
                      </div>
                    )}
                  </section>
                </main>
                <Footer onOpenInfo={(title, desc) => setInfoModal({ title, desc })} />
              </div>
            )}

            {/* VIEW 2: SAVED BOOKMARKS */}
            {activeTab === 'saved' && (
              <div className="p-4 sm:p-6 max-w-7xl mx-auto">
                <SavedBookmarksPage
                  savedStories={[]}
                  onSelectStory={(story) => {
                    setSelectedItem({
                      id: story.id,
                      title: story.title,
                      category: story.category,
                      year: '2024',
                      rating: '9.0',
                      popularity: story.readTime || '5 min read',
                      posterImage: story.image,
                      type: 'Series',
                    });
                  }}
                  onRemoveSavedStory={(id) => {
                    setSavedCount((prev) => Math.max(0, prev - 1));
                  }}
                />
              </div>
            )}

            {/* VIEW 3: UTILITIES */}
            {activeTab === 'utilities' && (
              <div className="p-4 sm:p-6 max-w-7xl mx-auto">
                <UtilitiesView
                  onBackToHome={() => setActiveTab('home')}
                  onOpenToolModal={(tool) => {
                    setSelectedItem({
                      id: tool.id,
                      title: tool.title,
                      category: tool.category,
                      year: '2024',
                      rating: '9.5',
                      popularity: tool.tagline,
                      posterImage: tool.image,
                      type: 'Game',
                    });
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* GLOBAL OVERLAYS & DRAWERS (Shared Layout Architecture) */}
      <SignInPromptModal
        isOpen={isAuthOpen}
        initialMode={authMode}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={handleLoginSuccess}
      />

      <ContentDetailModal
        item={isLoggedIn ? null : selectedItem}
        onClose={() => setSelectedItem(null)}
        onOpenAuth={handleOpenAuth}
      />

      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      <ProfileDrawer
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onNavigateToDashboard={() => {
          setActiveTab('dashboard');
          setIsProfileOpen(false);
        }}
      />

      <SettingsDrawer
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      <StartWikiModal
        isOpen={isStartWikiOpen}
        onClose={() => setIsStartWikiOpen(false)}
        onCreateWiki={(name) => {
          alert(`Successfully started wiki draft for "${name}"! Your proposal is undergoing review.`);
          setIsStartWikiOpen(false);
        }}
      />
    </div>
  );
}
