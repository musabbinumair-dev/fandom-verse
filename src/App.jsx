import { useState, useEffect } from "react";
import { LeftSidebar } from "./components/LeftSidebar";
import { TopHeader } from "./components/TopHeader";
import { UserLayout } from "./components/UserLayout";
import { NewReleaseCategories } from "./components/homepage/NewReleaseCategories";
import { Hero } from "./components/homepage/Hero";
import { FilterBar } from "./components/homepage/FilterBar";
import { ContentCard } from "./components/homepage/ContentCard";
import { Footer } from "./components/homepage/Footer";
import { SignInPromptModal } from "./components/homepage/SignInPromptModal";
import { DashboardPage } from "./components/DashboardPage";
import { UserDashboardPage } from "./components/UserDashboardPage";
import { ManageContentPage } from "./components/ManageContentPage";
import { AdminLayout } from "./components/admin/AdminLayout";
import { AdminSectionPlaceholder } from "./components/admin/AdminSectionPlaceholder";
import { SavedBookmarksPage } from "./components/SavedBookmarksPage";
import { UtilitiesView } from "./components/UtilitiesView";
import { ProfilePage } from "./components/ProfilePage";
import { ExplorePage } from "./components/ExplorePage";
import { ContentDetailPage } from "./components/ContentDetailPage";
import { CategoryPage } from "./components/CategoryPage";
import { MultimediaCenterPage } from "./components/MultimediaCenterPage";
import { CharactersPage } from "./components/CharactersPage";
import { ArticlesAndEventsPage } from "./components/ArticlesAndEventsPage";
import { SubmitFanContentPage } from "./components/SubmitFanContentPage";
import { EventsPage } from "./components/EventsPage";
import { MerchandisePage } from "./components/MerchandisePage";
import { FeedbackPage } from "./components/FeedbackPage";
import {
  NotificationsDrawer,
  ProfileDrawer,
  SettingsDrawer
} from "./components/SideDrawers";
import { StartWikiModal } from "./components/StartWikiModal";
import {
  TRENDING_CONTENT,
  HERO_FEATURED
} from "./data/homepageData";

function App() {
  // Panel mode: "user" | "admin"
  const [panelMode, setPanelMode] = useState(() => {
    return window.location.pathname.startsWith("/admin") ? "admin" : "user";
  });

  // Admin routing tab (/admin/dashboard, /admin/content, etc.)
  const [adminTab, setAdminTab] = useState(() => {
    const path = window.location.pathname;
    if (path.includes("/admin/content")) return "content";
    if (path.includes("/admin/multimedia")) return "multimedia";
    if (path.includes("/admin/characters")) return "characters";
    if (path.includes("/admin/articles")) return "articles";
    if (path.includes("/admin/merchandise")) return "merchandise";
    if (path.includes("/admin/events")) return "events";
    if (path.includes("/admin/users")) return "users";
    if (path.includes("/admin/feedback")) return "feedback";
    if (path.includes("/admin/submissions")) return "submissions";
    if (path.includes("/admin/chatbot-faqs")) return "chatbot-faqs";
    if (path.includes("/admin/settings")) return "settings";
    return "dashboard";
  });

  // User panel active tab
  const [activeTab, setActiveTab] = useState(() => {
    const path = window.location.pathname;
    if (path === "/dashboard") return "dashboard";
    if (path.includes("/category")) return "category";
    if (path.includes("/characters")) return "characters";
    if (path.includes("/multimedia")) return "multimedia";
    if (path.includes("/articles")) return "articles-events";
    if (path.includes("/events")) return "events";
    if (path.includes("/merchandise")) return "merchandise";
    if (path.includes("/feedback")) return "feedback";
    if (path.includes("/saved")) return "saved";
    if (path.includes("/profile")) return "profile";
    return "home";
  });
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filterSort, setFilterSort] = useState("Most popular");
  const [filterType, setFilterType] = useState("All Types");
  const [filterQuality, setFilterQuality] = useState("All");
  const [filterGenre, setFilterGenre] = useState("All");
  const [filterRating, setFilterRating] = useState("All");
  const [filterYear, setFilterYear] = useState("All");
  const [filterLanguage, setFilterLanguage] = useState("All");
  const [filterOrderBy, setFilterOrderBy] = useState("Feature");
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [selectedItem, setSelectedItem] = useState(null);
  const [infoModal, setInfoModal] = useState(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isStartWikiOpen, setIsStartWikiOpen] = useState(false);
  const [savedCount, setSavedCount] = useState(3);
  const [savedItemIds, setSavedItemIds] = useState(
    new Set(["trend-1", "trend-3"])
  );

  // Synchronize browser history / URL paths
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.startsWith("/admin")) {
        setPanelMode("admin");
        if (path.includes("/admin/content")) setAdminTab("content");
        else setAdminTab("dashboard");
      } else {
        setPanelMode("user");
        if (path === "/dashboard") setActiveTab("dashboard");
        else if (path.includes("/category")) setActiveTab("category");
        else if (path.includes("/characters")) setActiveTab("characters");
        else if (path.includes("/multimedia")) setActiveTab("multimedia");
        else if (path.includes("/articles")) setActiveTab("articles-events");
        else if (path.includes("/events")) setActiveTab("events");
        else if (path.includes("/merchandise")) setActiveTab("merchandise");
        else if (path.includes("/feedback")) setActiveTab("feedback");
        else if (path.includes("/saved")) setActiveTab("saved");
        else if (path.includes("/profile")) setActiveTab("profile");
        else setActiveTab("home");
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleOpenAuth = (mode = "login") => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab("home");
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setActiveTab("home");
  };

  const handleToggleSaveItem = (item) => {
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

  const handleOpenItem = (item) => {
    if (!item) return;
    setSelectedItem({
      id: item.id || `item-${Date.now()}`,
      title: item.title || item.name || "Fandom Feature",
      category: item.category || item.fandom || "Fandom",
      year: item.year || item.releaseYear || "2025",
      rating: item.rating || "9.5",
      popularity: item.popularity || item.views || "10K",
      posterImage: item.image || item.posterImage || item.thumbnail || item.videoThumbnail,
      image: item.image || item.posterImage || item.thumbnail || item.videoThumbnail,
      videoThumbnail: item.videoThumbnail || item.image || item.posterImage || item.thumbnail,
      backgroundImage: item.backgroundImage,
      type: item.type || "VIDEO",
      genre: item.genre || item.category || "Lore & Action",
      desc: item.desc || item.description || item.content || item.synopsis || item.lore || item.bio,
    });
  };

  const handleSelectTab = (tab) => {
    setSelectedItem(null);
    if (tab === "settings") {
      setIsSettingsOpen(true);
    } else {
      setActiveTab(tab);
    }
    setIsMoreOpen(false);
  };

  const handleAdminSelectTab = (tabKey) => {
    setAdminTab(tabKey);
    window.history.pushState({}, "", `/admin/${tabKey}`);
  };

  const handleNavigateToUserPanel = () => {
    setPanelMode("user");
    window.history.pushState({}, "", "/");
  };

  const filtered = TRENDING_CONTENT.filter((item) => {
    const matchesCat = selectedCategory === "All" || item.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesType = filterType === "All Types" || item.type === filterType;
    const matchesGenre = filterGenre === "All" || (item.genre && item.genre.toLowerCase().includes(filterGenre.toLowerCase())) || item.category.toLowerCase().includes(filterGenre.toLowerCase());
    const matchesRating = filterRating === "All" || parseFloat(item.rating) >= parseFloat(filterRating);
    const matchesYear = filterYear === "All" || item.year.includes(filterYear);
    const matchesSearch = !searchQuery.trim() || item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.category.toLowerCase().includes(searchQuery.toLowerCase()) || (item.genre && item.genre.toLowerCase().includes(searchQuery.toLowerCase())) || (item.publisher && item.publisher.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesType && matchesGenre && matchesRating && matchesYear && matchesSearch;
  });

  const displayedContent = [...filtered].sort((a, b) => {
    if (filterOrderBy === "A-Z" || filterSort === "A-Z") return a.title.localeCompare(b.title);
    if (filterOrderBy === "Latest" || filterSort === "Latest") return b.year.localeCompare(a.year);
    if (filterOrderBy === "Rating" || filterOrderBy === "Most popular" || filterSort === "Most popular") {
      return parseFloat(b.rating) - parseFloat(a.rating);
    }
    return 0;
  });

  /* ========================================================================= */
  /*   1. COMPLETELY SEPARATE ADMIN PANEL ROUTING & LAYOUT                     */
  /* ========================================================================= */
  if (panelMode === "admin") {
    return (
      <AdminLayout
        activeTab={adminTab === "content" ? "content" : "dashboard"}
        onSelectTab={handleAdminSelectTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNavigateToUserPanel={handleNavigateToUserPanel}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenProfile={() => setAdminTab("dashboard")}
        onLogout={handleLogout}
        onOpenLinkModal={(title, desc) => setInfoModal({ title, desc })}
      >
        {adminTab === "content" ? (
          <ManageContentPage onOpenArticle={handleOpenItem} />
        ) : (
          <DashboardPage onOpenArticle={handleOpenItem} />
        )}
      </AdminLayout>
    );
  }

  /* ========================================================================= */
  /*   2. USER PANEL (REGISTERED & GUEST) WITH NO TRACE OF ADMIN PAGES        */
  /* ========================================================================= */
  return (
    <>
      {isLoggedIn ? (
        /* REGISTERED USER PANEL WRAPPED IN SHARED UserLayout CHASSIS */
        <UserLayout
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
          savedCount={savedCount}
          isMoreOpen={isMoreOpen}
          onToggleMore={() => setIsMoreOpen(!isMoreOpen)}
          onCloseMore={() => setIsMoreOpen(false)}
          onSelectCategory={(category) => {
            setSelectedItem(null);
            setActiveTab("category");
            setSelectedCategory(category);
            setIsMoreOpen(false);
          }}
          onStartWiki={() => setIsStartWikiOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenProfile={() => {
            setSelectedItem(null);
            setActiveTab("profile");
          }}
          onOpenAuth={handleOpenAuth}
          onOpenSaved={() => handleSelectTab("saved")}
          isLoggedIn={true}
          onLogout={handleLogout}
          unreadCount={2}
          onOpenLinkModal={(title, desc) => setInfoModal({ title, desc })}
          navTheme={selectedItem ? "dark" : "light"}
        >
          {selectedItem ? (
            <div className="w-full">
              <ContentDetailPage
                item={{
                  id: selectedItem.id,
                  title: selectedItem.title,
                  category: selectedItem.category,
                  type: selectedItem.type || "VIDEO",
                  year: selectedItem.year || "2024",
                  popularity: selectedItem.popularity || "9.5K",
                  image: selectedItem.image || selectedItem.posterImage,
                  videoThumbnail: selectedItem.videoThumbnail || selectedItem.posterImage || selectedItem.image,
                  backgroundImage: selectedItem.backgroundImage,
                  genre: selectedItem.genre,
                  desc: selectedItem.desc,
                }}
                onBack={() => setSelectedItem(null)}
                onOpenArticle={handleOpenItem}
              />
            </div>
          ) : (
            <>
              {/* VIEW 1: USER EXPLORER PAGE */}
              {activeTab === "home" && (
                <div className="w-full">
                  <ExplorePage
                    onOpenArticle={handleOpenItem}
                  />
                </div>
              )}

              {/* VIEW 2: PROFILE PAGE */}
              {activeTab === "profile" && (
                <div className="w-full">
                  <ProfilePage
                    onBackToHome={() => setActiveTab("home")}
                    onSaveSuccess={() => {
                      alert("Profile preferences and fandom settings successfully saved!");
                      setActiveTab("home");
                    }}
                  />
                </div>
              )}

              {/* VIEW 3: EXACT CATEGORY PAGE */}
              {activeTab === "category" && (
                <div className="w-full">
                  <CategoryPage
                    categoryName={selectedCategory !== "All" ? selectedCategory : "ANIME"}
                    categoryDesc={`Explore a world of amazing stories, unique characters, and breathtaking animation in ${selectedCategory !== "All" ? selectedCategory : "ANIME"}.`}
                    onOpenArticle={handleOpenItem}
                    onOpenAuth={handleOpenAuth}
                  />
                </div>
              )}

              {/* VIEW 4: CHARACTERS PAGE */}
              {activeTab === "characters" && (
                <div className="w-full">
                  <CharactersPage
                    onNavigateHome={() => setActiveTab("home")}
                    onOpenArticle={handleOpenItem}
                  />
                </div>
              )}

              {/* VIEW 5: MULTIMEDIA CENTER */}
              {activeTab === "multimedia" && (
                <div className="w-full">
                  <MultimediaCenterPage
                    onNavigateHome={() => setActiveTab("home")}
                    onOpenArticle={handleOpenItem}
                  />
                </div>
              )}

              {/* VIEW 6: FEATURED ARTICLES & EVENT HIGHLIGHTS */}
              {activeTab === "articles-events" && (
                <div className="w-full">
                  <ArticlesAndEventsPage
                    onNavigateHome={() => setActiveTab("home")}
                    onNavigateSubmit={() => setActiveTab("submit-content")}
                    onOpenArticle={handleOpenItem}
                  />
                </div>
              )}

              {/* VIEW 7: SUBMIT FAN CONTENT */}
              {activeTab === "submit-content" && (
                <div className="w-full">
                  <SubmitFanContentPage
                    onNavigateHome={() => setActiveTab("home")}
                    onNavigateArticles={() => setActiveTab("articles-events")}
                  />
                </div>
              )}

              {/* VIEW 8: EVENTS PAGE */}
              {activeTab === "events" && (
                <div className="w-full">
                  <EventsPage
                    onNavigateHome={() => setActiveTab("home")}
                    onNavigateSubmit={() => setActiveTab("submit-content")}
                    onOpenArticle={handleOpenItem}
                  />
                </div>
              )}

              {/* VIEW 9: MERCHANDISE PAGE */}
              {activeTab === "merchandise" && (
                <div className="w-full">
                  <MerchandisePage
                    onNavigateHome={() => setActiveTab("home")}
                    onOpenArticle={handleOpenItem}
                  />
                </div>
              )}

              {/* VIEW 10: FEEDBACK PAGE */}
              {activeTab === "feedback" && (
                <div className="w-full">
                  <FeedbackPage
                    onNavigateHome={() => setActiveTab("home")}
                  />
                </div>
              )}

              {/* VIEW 11: SAVED BOOKMARKS */}
              {activeTab === "saved" && (
                <div className="w-full">
                  <SavedBookmarksPage
                    parentLabel="Explorer"
                    onNavigateHome={() => setActiveTab("home")}
                    onSelectStory={handleOpenItem}
                    onRemoveSavedStory={() => {
                      setSavedCount((prev) => Math.max(0, prev - 1));
                    }}
                  />
                </div>
              )}

              {/* VIEW 12: UTILITIES */}
              {activeTab === "utilities" && (
                <div className="p-4 sm:p-6 max-w-7xl mx-auto w-full">
                  <UtilitiesView
                    onBackToHome={() => setActiveTab("home")}
                    onOpenToolModal={handleOpenItem}
                  />
                </div>
              )}
            </>
          )}
        </UserLayout>
      ) : (
        /* GUEST / VISITOR USER PANEL CHASSIS */
        <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#FFFDF7] text-[#231C14] font-baloo select-none">
          <TopHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onOpenNotifications={() => setIsNotificationsOpen(true)}
            onOpenProfile={() => handleOpenAuth("login")}
            unreadCount={0}
            onOpenAuth={handleOpenAuth}
            onOpenSaved={() => handleOpenAuth("login")}
            isLoggedIn={false}
            onLogout={handleLogout}
          />
          <div className="flex-1 flex h-full min-h-0 overflow-hidden" data-panel="guest">
            <LeftSidebar
              activeTab={activeTab}
              onSelectTab={(tab) => {
                if (tab === "progress") {
                  handleOpenAuth("login");
                } else {
                  handleSelectTab(tab);
                }
              }}
              savedCount={savedCount}
              isMoreOpen={isMoreOpen}
              onToggleMore={() => setIsMoreOpen(!isMoreOpen)}
              onCloseMore={() => setIsMoreOpen(false)}
              onSelectCategory={(category) => {
                setSelectedItem(null);
                setActiveTab("category");
                setSelectedCategory(category);
                setIsMoreOpen(false);
              }}
              onStartWiki={() => handleOpenAuth("login")}
              isLoggedIn={false}
            />

            <div className="flex-1 h-full min-w-0 overflow-y-auto bg-[#FFFDF7]">
              {selectedItem ? (
                <div className="w-full">
                  <ContentDetailPage
                    item={selectedItem}
                    onBack={() => setSelectedItem(null)}
                    onOpenArticle={handleOpenItem}
                    onOpenAuth={handleOpenAuth}
                    isLoggedIn={false}
                  />
                </div>
              ) : (
                <>
                  {activeTab === "home" && (
                    <div className="flex flex-col min-h-full bg-[#FFFDF7]">
                      <Hero
                        onOpenArticle={() => {
                          setSelectedItem({
                            id: HERO_FEATURED.id,
                            title: HERO_FEATURED.title,
                            category: HERO_FEATURED.category,
                            year: HERO_FEATURED.releaseYear,
                            rating: HERO_FEATURED.rating,
                            popularity: "240K pre-ordered",
                            posterImage: HERO_FEATURED.posterImage,
                            type: "Comic",
                          });
                        }}
                        onOpenAuth={handleOpenAuth}
                      />

                      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-8 pb-16 space-y-12">
                        <NewReleaseCategories
                          onSelectItem={(item) => setSelectedItem(item)}
                          onSelectCategory={(category) => {
                            setSelectedItem(null);
                            setActiveTab("category");
                            setSelectedCategory(category);
                            setIsMoreOpen(false);
                          }}
                          onSeeMore={() => {
                            const heading = document.getElementById("trending-heading");
                            if (heading) heading.scrollIntoView({ behavior: "smooth" });
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
                              setSelectedCategory("All");
                              setSearchQuery("");
                            }}
                          />

                          {displayedContent.length === 0 ? (
                            <p className="text-sm font-bold text-stone-500 text-center py-8">No matching fandoms found.</p>
                          ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pt-2">
                              {displayedContent.map((item) => {
                                return (
                                  <ContentCard
                                    key={item.id}
                                    item={item}
                                    isSaved={savedItemIds.has(item.id)}
                                    onSelect={(content) => setSelectedItem(content)}
                                    onOpenAuth={handleOpenAuth}
                                    onToggleSave={handleToggleSaveItem}
                                  />
                                );
                              })}
                            </div>
                          )}
                        </section>
                      </main>
                      <Footer onOpenInfo={(title, desc) => setInfoModal({ title, desc })} />
                    </div>
                  )}

                  {activeTab === "category" && (
                    <div className="w-full">
                      <CategoryPage
                        categoryName={selectedCategory !== "All" ? selectedCategory : "ANIME"}
                        categoryDesc={`Explore a world of amazing stories, unique characters, and breathtaking animation in ${selectedCategory !== "All" ? selectedCategory : "ANIME"}.`}
                        onOpenArticle={handleOpenItem}
                        onOpenAuth={handleOpenAuth}
                      />
                    </div>
                  )}

                  {activeTab === "multimedia" && (
                    <div className="w-full">
                      <MultimediaCenterPage onNavigateHome={() => setActiveTab("home")} onOpenArticle={handleOpenItem} />
                    </div>
                  )}

                  {activeTab === "characters" && (
                    <div className="w-full">
                      <CharactersPage onNavigateHome={() => setActiveTab("home")} onOpenArticle={handleOpenItem} />
                    </div>
                  )}

                  {activeTab === "articles-events" && (
                    <div className="w-full">
                      <ArticlesAndEventsPage
                        onNavigateHome={() => setActiveTab("home")}
                        onNavigateSubmit={() => setActiveTab("submit-content")}
                        onOpenArticle={handleOpenItem}
                      />
                    </div>
                  )}

                  {activeTab === "submit-content" && (
                    <div className="w-full">
                      <SubmitFanContentPage
                        onNavigateHome={() => setActiveTab("home")}
                        onNavigateArticles={() => setActiveTab("articles-events")}
                      />
                    </div>
                  )}

                  {activeTab === "events" && (
                    <div className="w-full">
                      <EventsPage
                        onNavigateHome={() => setActiveTab("home")}
                        onNavigateSubmit={() => setActiveTab("submit-content")}
                        onOpenArticle={handleOpenItem}
                      />
                    </div>
                  )}

                  {activeTab === "merchandise" && (
                    <div className="w-full">
                      <MerchandisePage onNavigateHome={() => setActiveTab("home")} onOpenArticle={handleOpenItem} />
                    </div>
                  )}

                  {activeTab === "feedback" && (
                    <div className="w-full">
                      <FeedbackPage onNavigateHome={() => setActiveTab("home")} />
                    </div>
                  )}

                  {activeTab === "saved" && (
                    <div className="w-full">
                      <SavedBookmarksPage
                        parentLabel="Explorer"
                        onNavigateHome={() => setActiveTab("home")}
                        onSelectStory={handleOpenItem}
                        onRemoveSavedStory={() => {
                          setSavedCount((prev) => Math.max(0, prev - 1));
                        }}
                      />
                    </div>
                  )}

                  {activeTab === "utilities" && (
                    <div className="p-4 sm:p-6 max-w-7xl mx-auto w-full">
                      <UtilitiesView
                        onBackToHome={() => setActiveTab("home")}
                        onOpenToolModal={handleOpenItem}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* GLOBAL OVERLAYS & DRAWERS */}
      <SignInPromptModal
        isOpen={isAuthOpen}
        initialMode={authMode}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={handleLoginSuccess}
        onOpenAdmin={() => {
          setIsAuthOpen(false);
          setPanelMode("admin");
          setAdminTab("dashboard");
          window.history.pushState(null, "", "/admin/dashboard");
        }}
      />

      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      <ProfileDrawer
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onOpenEditProfile={() => setActiveTab("profile")}
        onOpenBookmarks={() => setActiveTab("saved")}
      />

      <SettingsDrawer
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      <StartWikiModal
        isOpen={isStartWikiOpen}
        onClose={() => setIsStartWikiOpen(false)}
      />

      {infoModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setInfoModal(null)}
        >
          <div
            className="bg-white rounded-2xl border border-[#EDE4D6] p-6 max-w-md w-full shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#EDE4D6] pb-3">
              <h3 className="text-lg font-black tracking-tight text-[#231C14] font-titan uppercase">
                {infoModal.title}
              </h3>
              <button
                onClick={() => setInfoModal(null)}
                className="text-stone-400 hover:text-stone-600 text-xs font-bold px-2 py-1 bg-stone-100 rounded-md cursor-pointer"
              >
                ESC
              </button>
            </div>
            <p className="text-xs sm:text-sm text-[#7A6F64] leading-relaxed">
              {infoModal.desc}
            </p>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setInfoModal(null)}
                className="px-4 py-2 bg-[#FF5F1F] hover:bg-[#E04F13] text-white font-extrabold text-xs tracking-wider uppercase rounded-lg cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
