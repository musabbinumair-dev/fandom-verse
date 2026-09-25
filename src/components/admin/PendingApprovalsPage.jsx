import { useState, useMemo, useEffect } from "react";
import {
  LayoutGrid,
  FileText,
  MessageSquare,
  Clock,
  Search,
  ChevronDown,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  Bug,
  Lightbulb,
  HelpCircle,
  Image as ImageIcon,
  CheckCircle2,
  Calendar
} from "lucide-react";
import {
  fetchPendingApprovals,
  updatePendingApprovalStatus
} from "../../api/api.js";
import { ReviewDetailDrawer } from "./ReviewDetailDrawer.jsx";

const CATEGORY_COLORS = {
  Anime: "bg-[#FEF3C7] text-[#92400E]",
  Gaming: "bg-[#E0F2FE] text-[#0369A1]",
  Movies: "bg-[#EDE9FE] text-[#6D28D9]",
  "TV Shows": "bg-[#EDE9FE] text-[#6D28D9]",
  "K-Pop": "bg-[#F3E8FF] text-[#7E22CE]",
  Comics: "bg-[#CCFBF1] text-[#0F766E]",
  Manga: "bg-[#FFE4E6] text-[#BE123C]",
  Cosplay: "bg-[#FCE7F3] text-[#BE185D]"
};

const ALL_CATEGORIES = [
  "All Categories",
  "Anime",
  "Gaming",
  "Movies",
  "TV Shows",
  "K-Pop",
  "Comics",
  "Manga",
  "Cosplay"
];

const ALL_FEEDBACK_TYPES = ["All Types", "Bug", "Suggestion", "Query"];

const PendingApprovalsPage = () => {
  const [items, setItems] = useState([]);
  const [activeTab, setActiveTab] = useState("all"); // "all" | "submissions" | "feedback"

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [feedbackTypeFilter, setFeedbackTypeFilter] = useState("All Types");
  const [sortBy, setSortBy] = useState("Date (Newest First)");

  // Dropdown states
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isFeedbackTypeOpen, setIsFeedbackTypeOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Selected item for Review Side Panel
  const [reviewItem, setReviewItem] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Load items
  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        const data = await fetchPendingApprovals();
        if (isMounted) {
          setItems(data);
        }
      } catch (err) {
        console.error("Failed to fetch pending approvals", err);
      }
    };
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3000);
  };

  // Live stat counts derived directly from mock data (Requirement 4)
  const totalPendingCount = useMemo(() => {
    return items.filter((i) => i.status === "PENDING").length;
  }, [items]);

  const submissionPendingCount = useMemo(() => {
    return items.filter((i) => i.type === "submission" && i.status === "PENDING").length;
  }, [items]);

  const feedbackPendingCount = useMemo(() => {
    return items.filter((i) => i.type === "feedback" && i.status === "PENDING").length;
  }, [items]);

  // Filtered and sorted items for active tab
  const filteredItems = useMemo(() => {
    // Only pending items in moderation queue (Requirement 6)
    let list = items.filter((i) => i.status === "PENDING");

    // Tab filter
    if (activeTab === "submissions") {
      list = list.filter((i) => i.type === "submission");
    } else if (activeTab === "feedback") {
      list = list.filter((i) => i.type === "feedback");
    }

    // Category filter (for All and Submissions tabs)
    if (activeTab !== "feedback" && categoryFilter !== "All Categories") {
      list = list.filter((i) => i.category === categoryFilter);
    }

    // Feedback Type filter (for Feedback tab)
    if (activeTab === "feedback" && feedbackTypeFilter !== "All Types") {
      list = list.filter(
        (i) => i.feedbackType?.toLowerCase() === feedbackTypeFilter.toLowerCase()
      );
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((i) => {
        const titleMatch = (i.title || i.subject || "").toLowerCase().includes(q);
        const subMatch = (i.subtitle || "").toLowerCase().includes(q);
        const userMatch =
          i.submittedBy?.name?.toLowerCase().includes(q) ||
          i.submittedBy?.username?.toLowerCase().includes(q);
        const catMatch = (i.category || i.feedbackType || "").toLowerCase().includes(q);
        const contentMatch = (i.content || i.message || "").toLowerCase().includes(q);
        return titleMatch || subMatch || userMatch || catMatch || contentMatch;
      });
    }

    // Sorting
    list = [...list].sort((a, b) => {
      if (sortBy === "Date (Newest First)") {
        return new Date(b.date) - new Date(a.date);
      }
      return new Date(a.date) - new Date(b.date);
    });

    return list;
  }, [items, activeTab, categoryFilter, feedbackTypeFilter, searchQuery, sortBy]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(start, start + itemsPerPage);
  }, [filteredItems, currentPage, itemsPerPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  // Reset page when tab or filters change
  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    setCurrentPage(1);
    setSearchQuery("");
  };

  // Actions for Review side panel (Requirement 6)
  const handleApprove = async (id) => {
    try {
      await updatePendingApprovalStatus(id, "APPROVED");
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: "APPROVED" } : i))
      );
      setReviewItem(null);
      showToast("Submission approved and published!");
    } catch (err) {
      console.error(err);
      showToast("Error approving submission.");
    }
  };

  const handleReject = async (id) => {
    try {
      await updatePendingApprovalStatus(id, "REJECTED");
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: "REJECTED" } : i))
      );
      setReviewItem(null);
      showToast("Submission rejected.");
    } catch (err) {
      console.error(err);
      showToast("Error rejecting submission.");
    }
  };

  const handleResolve = async (id) => {
    try {
      await updatePendingApprovalStatus(id, "RESOLVED");
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: "RESOLVED" } : i))
      );
      setReviewItem(null);
      showToast("Feedback marked as Resolved.");
    } catch (err) {
      console.error(err);
      showToast("Error resolving feedback.");
    }
  };

  const getCategoryColor = (cat) => {
    return CATEGORY_COLORS[cat] || "bg-stone-100 text-stone-700";
  };

  return (
    <div className="w-full bg-[#FAF8F5] min-h-full font-sans select-none pb-16 text-[#171717]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1F2937] text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 size={16} className="text-[#10B981] shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-stone-400 hover:text-white cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        
        {/* 1. TOP HEADER & 3 LIVE STAT CARDS */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl sm:text-3.5xl font-black tracking-tight uppercase font-titan text-[#111827]">
              PENDING APPROVALS
            </h1>
            <p className="text-xs sm:text-sm font-medium text-[#6B7280] mt-0.5">
              Review and approve fan submissions and user feedback in one place.
            </p>
          </div>

          {/* 3 Summary Stat Cards (pulling live counts) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 shrink-0">
            {/* Card 1: TOTAL PENDING */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl px-5 py-4 flex items-center gap-4 shadow-2xs">
              <div className="text-[#1F2937] shrink-0">
                <Clock size={24} strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                  TOTAL PENDING
                </p>
                <p className="text-2xl font-black text-[#111827] tracking-tight leading-tight">
                  {totalPendingCount}
                </p>
                <p className="text-xs font-bold text-[#10B981] flex items-center gap-1 mt-0.5">
                  <span>↑ +12%</span>
                  <span className="text-[#9CA3AF] font-normal text-[11px]">
                    vs. last week
                  </span>
                </p>
              </div>
            </div>

            {/* Card 2: FAN SUBMISSIONS PENDING */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl px-5 py-4 flex items-center gap-4 shadow-2xs">
              <div className="text-[#1F2937] shrink-0">
                <FileText size={24} strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                  FAN SUBMISSIONS PENDING
                </p>
                <p className="text-2xl font-black text-[#111827] tracking-tight leading-tight">
                  {submissionPendingCount}
                </p>
                <p className="text-xs font-bold text-[#10B981] flex items-center gap-1 mt-0.5">
                  <span>↑ +17%</span>
                  <span className="text-[#9CA3AF] font-normal text-[11px]">
                    vs. last week
                  </span>
                </p>
              </div>
            </div>

            {/* Card 3: FEEDBACK PENDING */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl px-5 py-4 flex items-center gap-4 shadow-2xs">
              <div className="text-[#1F2937] shrink-0">
                <MessageSquare size={24} strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                  FEEDBACK PENDING
                </p>
                <p className="text-2xl font-black text-[#111827] tracking-tight leading-tight">
                  {feedbackPendingCount}
                </p>
                <p className="text-xs font-bold text-[#10B981] flex items-center gap-1 mt-0.5">
                  <span>↑ +6%</span>
                  <span className="text-[#9CA3AF] font-normal text-[11px]">
                    vs. last week
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. TAB BAR (All / Fan Submissions / Feedback) */}
        <div className="flex items-center gap-2 pt-2">
          {/* Tab 1: All */}
          <button
            type="button"
            onClick={() => handleTabChange("all")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "all"
                ? "bg-[#F59E0B] text-white shadow-xs"
                : "bg-white border border-[#E5E7EB] text-[#4B5563] hover:bg-stone-50"
            }`}
          >
            <LayoutGrid size={16} />
            <span>All</span>
          </button>

          {/* Tab 2: Fan Submissions */}
          <button
            type="button"
            onClick={() => handleTabChange("submissions")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "submissions"
                ? "bg-[#F59E0B] text-white shadow-xs"
                : "bg-white border border-[#E5E7EB] text-[#4B5563] hover:bg-stone-50"
            }`}
          >
            <FileText size={16} />
            <span>Fan Submissions</span>
          </button>

          {/* Tab 3: Feedback */}
          <button
            type="button"
            onClick={() => handleTabChange("feedback")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "feedback"
                ? "bg-[#F59E0B] text-white shadow-xs"
                : "bg-white border border-[#E5E7EB] text-[#4B5563] hover:bg-stone-50"
            }`}
          >
            <MessageSquare size={16} />
            <span>Feedback</span>
          </button>
        </div>

        {/* 3. FILTERS & SEARCH ROW */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3">
          
          {/* Left Dropdown (Category for All/Submissions, Feedback Type for Feedback) */}
          {activeTab !== "feedback" ? (
            /* Category Dropdown */
            <div className="relative shrink-0 sm:w-52">
              <label className="text-xs font-bold text-[#374151] mb-1.5 block">
                Category
              </label>
              <button
                type="button"
                onClick={() => {
                  setIsCategoryOpen(!isCategoryOpen);
                  setIsSortOpen(false);
                }}
                className="w-full bg-white border border-[#E5E7EB] hover:border-[#D1D5DB] rounded-lg px-3.5 py-2 text-sm text-[#111827] font-medium flex items-center justify-between shadow-2xs transition-colors cursor-pointer"
              >
                <span>{categoryFilter}</span>
                <ChevronDown size={16} className="text-[#6B7280]" />
              </button>

              {isCategoryOpen && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setIsCategoryOpen(false)}
                  />
                  <div className="absolute left-0 top-full mt-1.5 w-full bg-white border border-[#E5E7EB] rounded-lg shadow-lg py-1 z-30 animate-in fade-in duration-100 max-h-60 overflow-y-auto">
                    {ALL_CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          setCategoryFilter(cat);
                          setIsCategoryOpen(false);
                          setCurrentPage(1);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-sm font-medium flex items-center justify-between transition-colors ${
                          categoryFilter === cat
                            ? "bg-amber-50 text-[#B45309] font-bold"
                            : "text-[#374151] hover:bg-stone-50"
                        }`}
                      >
                        <span>{cat}</span>
                        {categoryFilter === cat && (
                          <Check size={14} className="text-[#B45309]" />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            /* Feedback Type Dropdown */
            <div className="relative shrink-0 sm:w-52">
              <label className="text-xs font-bold text-[#374151] mb-1.5 block">
                Feedback Type
              </label>
              <button
                type="button"
                onClick={() => {
                  setIsFeedbackTypeOpen(!isFeedbackTypeOpen);
                  setIsSortOpen(false);
                }}
                className="w-full bg-white border border-[#E5E7EB] hover:border-[#D1D5DB] rounded-lg px-3.5 py-2 text-sm text-[#111827] font-medium flex items-center justify-between shadow-2xs transition-colors cursor-pointer"
              >
                <span>{feedbackTypeFilter}</span>
                <ChevronDown size={16} className="text-[#6B7280]" />
              </button>

              {isFeedbackTypeOpen && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setIsFeedbackTypeOpen(false)}
                  />
                  <div className="absolute left-0 top-full mt-1.5 w-full bg-white border border-[#E5E7EB] rounded-lg shadow-lg py-1 z-30 animate-in fade-in duration-100">
                    {ALL_FEEDBACK_TYPES.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          setFeedbackTypeFilter(type);
                          setIsFeedbackTypeOpen(false);
                          setCurrentPage(1);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-sm font-medium flex items-center justify-between transition-colors ${
                          feedbackTypeFilter === type
                            ? "bg-amber-50 text-[#B45309] font-bold"
                            : "text-[#374151] hover:bg-stone-50"
                        }`}
                      >
                        <span>{type}</span>
                        {feedbackTypeFilter === type && (
                          <Check size={14} className="text-[#B45309]" />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Search Input Bar */}
          <div className="flex-1 relative">
            <div className="relative flex items-center">
              <Search
                size={18}
                className="absolute left-3.5 text-[#9CA3AF] pointer-events-none"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder={
                  activeTab === "all"
                    ? "Search by title, subject, user or category..."
                    : activeTab === "submissions"
                    ? "Search by title, category, or user..."
                    : "Search by subject, user or feedback type..."
                }
                className="w-full bg-white border border-[#E5E7EB] hover:border-[#D1D5DB] focus:border-[#FF5F1F] rounded-lg pl-10 pr-9 py-2 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none shadow-2xs transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 text-[#9CA3AF] hover:text-[#4B5563] cursor-pointer"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </div>

          {/* Right Dropdown: Sort by */}
          <div className="relative shrink-0 sm:w-56">
            <label className="text-xs font-bold text-[#374151] mb-1.5 block">
              Sort by
            </label>
            <button
              type="button"
              onClick={() => {
                setIsSortOpen(!isSortOpen);
                setIsCategoryOpen(false);
                setIsFeedbackTypeOpen(false);
              }}
              className="w-full bg-white border border-[#E5E7EB] hover:border-[#D1D5DB] rounded-lg px-3.5 py-2 text-sm text-[#111827] font-medium flex items-center justify-between shadow-2xs transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Calendar size={15} className="text-[#6B7280]" />
                <span>{sortBy}</span>
              </div>
              <ChevronDown size={16} className="text-[#6B7280]" />
            </button>

            {isSortOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setIsSortOpen(false)}
                />
                <div className="absolute right-0 top-full mt-1.5 w-full bg-white border border-[#E5E7EB] rounded-lg shadow-lg py-1 z-30 animate-in fade-in duration-100">
                  {["Date (Newest First)", "Date (Oldest First)"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        setSortBy(s);
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-sm font-medium flex items-center justify-between transition-colors ${
                        sortBy === s
                          ? "bg-amber-50 text-[#B45309] font-bold"
                          : "text-[#374151] hover:bg-stone-50"
                      }`}
                    >
                      <span>{s}</span>
                      {sortBy === s && (
                        <Check size={14} className="text-[#B45309]" />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

        </div>

        {/* 4. ADAPTIVE TABLE CONTAINER (Requirement 3) */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-[#E5E7EB] text-[11px] font-bold tracking-wider text-[#6B7280] uppercase">
                  {activeTab === "all" ? (
                    <>
                      <th className="py-3.5 px-5 w-28">TYPE</th>
                      <th className="py-3.5 px-5">TITLE / SUBJECT</th>
                      <th className="py-3.5 px-5">CATEGORY / FEEDBACK TYPE</th>
                      <th className="py-3.5 px-5">SUBMITTED BY</th>
                      <th className="py-3.5 px-5">DATE</th>
                      <th className="py-3.5 px-5 text-center">STATUS</th>
                      <th className="py-3.5 px-5 text-right">ACTIONS</th>
                    </>
                  ) : activeTab === "submissions" ? (
                    <>
                      <th className="py-3.5 px-5 w-32">CONTENT TYPE</th>
                      <th className="py-3.5 px-5">TITLE</th>
                      <th className="py-3.5 px-5">CATEGORY</th>
                      <th className="py-3.5 px-5">SUBMITTED BY</th>
                      <th className="py-3.5 px-5">DATE</th>
                      <th className="py-3.5 px-5 text-center">STATUS</th>
                      <th className="py-3.5 px-5 text-right">ACTIONS</th>
                    </>
                  ) : (
                    <>
                      <th className="py-3.5 px-5 w-36">FEEDBACK TYPE</th>
                      <th className="py-3.5 px-5">SUBJECT</th>
                      <th className="py-3.5 px-5">SUBMITTED BY</th>
                      <th className="py-3.5 px-5">DATE</th>
                      <th className="py-3.5 px-5 text-center">STATUS</th>
                      <th className="py-3.5 px-5 text-right">ACTIONS</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6]">
                {paginatedItems.length === 0 ? (
                  /* EMPTY STATE (Requirement 7) */
                  <tr>
                    <td colSpan={7} className="py-16 text-center text-[#6B7280]">
                      <div className="flex flex-col items-center justify-center gap-2.5">
                        <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#10B981] flex items-center justify-center">
                          <CheckCircle2 size={26} strokeWidth={2} />
                        </div>
                        <p className="text-base font-bold text-[#111827]">
                          All caught up!
                        </p>
                        <p className="text-xs text-[#6B7280]">
                          There are no pending approvals matching your current filters.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedItems.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-[#FAF9F6]/80 transition-colors group"
                    >
                      {/* === TAB 1: ALL === */}
                      {activeTab === "all" && (
                        <>
                          {/* Col 1: Type */}
                          <td className="py-3.5 px-5">
                            {item.type === "submission" ? (
                              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#E0F2FE] text-[#0284C7] inline-block">
                                Submission
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#F3E8FF] text-[#9333EA] inline-block">
                                Feedback
                              </span>
                            )}
                          </td>

                          {/* Col 2: Title / Subject */}
                          <td className="py-3.5 px-5">
                            <p className="text-sm font-bold text-[#111827] leading-snug">
                              {item.title || item.subject}
                            </p>
                            <p className="text-xs text-[#6B7280] leading-tight line-clamp-1">
                              {item.subtitle}
                            </p>
                          </td>

                          {/* Col 3: Category / Feedback Type */}
                          <td className="py-3.5 px-5">
                            {item.type === "submission" ? (
                              <span
                                className={`px-2.5 py-0.5 rounded text-xs font-semibold ${getCategoryColor(
                                  item.category
                                )}`}
                              >
                                {item.category}
                              </span>
                            ) : (
                              <span
                                className={`px-2.5 py-0.5 rounded text-xs font-semibold ${
                                  item.feedbackType === "Bug"
                                    ? "bg-[#FEE2E2] text-[#EF4444]"
                                    : item.feedbackType === "Suggestion"
                                    ? "bg-[#E0F2FE] text-[#0284C7]"
                                    : "bg-[#F3E8FF] text-[#9333EA]"
                                }`}
                              >
                                {item.feedbackType}
                              </span>
                            )}
                          </td>
                        </>
                      )}

                      {/* === TAB 2: FAN SUBMISSIONS === */}
                      {activeTab === "submissions" && (
                        <>
                          {/* Col 1: Content Type */}
                          <td className="py-3.5 px-5">
                            <span
                              className={`px-2.5 py-1 rounded-md text-xs font-semibold inline-flex items-center gap-1.5 ${
                                item.contentType === "Article"
                                  ? "bg-[#E0F2FE] text-[#0284C7]"
                                  : "bg-[#F3E8FF] text-[#9333EA]"
                              }`}
                            >
                              {item.contentType === "Article" ? (
                                <FileText size={14} />
                              ) : (
                                <ImageIcon size={14} />
                              )}
                              <span>{item.contentType}</span>
                            </span>
                          </td>

                          {/* Col 2: Title */}
                          <td className="py-3.5 px-5">
                            <p className="text-sm font-bold text-[#111827] leading-snug">
                              {item.title}
                            </p>
                            <p className="text-xs text-[#6B7280] leading-tight line-clamp-1">
                              {item.subtitle}
                            </p>
                          </td>

                          {/* Col 3: Category */}
                          <td className="py-3.5 px-5">
                            <span
                              className={`px-2.5 py-0.5 rounded text-xs font-semibold ${getCategoryColor(
                                item.category
                              )}`}
                            >
                              {item.category}
                            </span>
                          </td>
                        </>
                      )}

                      {/* === TAB 3: FEEDBACK === */}
                      {activeTab === "feedback" && (
                        <>
                          {/* Col 1: Feedback Type Badge */}
                          <td className="py-3.5 px-5">
                            {item.feedbackType === "Bug" ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-[#FEE2E2] text-[#EF4444]">
                                <Bug size={14} />
                                <span>BUG</span>
                              </span>
                            ) : item.feedbackType === "Suggestion" ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-[#E0F2FE] text-[#0284C7]">
                                <Lightbulb size={14} />
                                <span>SUGGESTION</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-[#F3E8FF] text-[#9333EA]">
                                <HelpCircle size={14} />
                                <span>QUERY</span>
                              </span>
                            )}
                          </td>

                          {/* Col 2: Subject */}
                          <td className="py-3.5 px-5">
                            <p className="text-sm font-bold text-[#111827] leading-snug">
                              {item.subject}
                            </p>
                            <p className="text-xs text-[#6B7280] leading-tight line-clamp-1">
                              {item.subtitle}
                            </p>
                          </td>
                        </>
                      )}

                      {/* === SHARED COLUMNS === */}
                      {/* Submitted By */}
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full overflow-hidden border border-[#E5E7EB] bg-stone-100 shrink-0">
                            <img
                              src={item.submittedBy?.avatar}
                              alt={item.submittedBy?.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src =
                                  "/src/assets/images/luffy_avatar_1790269807034.jpg";
                              }}
                            />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#111827] leading-tight">
                              {item.submittedBy?.name}
                            </p>
                            <p className="text-xs text-[#6B7280] leading-tight">
                              {item.submittedBy?.username}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-5 text-sm text-[#4B5563] font-mono tabular-nums">
                        {item.date}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-5 text-center">
                        <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#FEF3C7] text-[#D97706]">
                          PENDING
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-5 text-right">
                        <button
                          type="button"
                          onClick={() => setReviewItem(item)}
                          className="p-1.5 text-[#4B5563] hover:text-[#111827] hover:bg-stone-100 rounded-md transition-colors cursor-pointer"
                          title="Review"
                        >
                          <Eye size={17} strokeWidth={1.75} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* 5. TABLE PAGINATION FOOTER */}
          <div className="px-5 py-3.5 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6B7280]">
            <div>
              {filteredItems.length > 0 ? (
                <span>
                  Showing {(currentPage - 1) * itemsPerPage + 1}-
                  {Math.min(currentPage * itemsPerPage, filteredItems.length)} of{" "}
                  {filteredItems.length} items
                </span>
              ) : (
                <span>Showing 0 of 0 items</span>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              {/* Prev */}
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className={`w-8 h-8 rounded-md border border-[#E5E7EB] flex items-center justify-center transition-colors ${
                  currentPage <= 1
                    ? "text-[#D1D5DB] cursor-not-allowed bg-stone-50"
                    : "text-[#4B5563] hover:text-[#111827] hover:bg-stone-50 cursor-pointer bg-white"
                }`}
              >
                <ChevronLeft size={16} />
              </button>

              {/* Pages */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => {
                const isActive = pg === currentPage;
                return (
                  <button
                    key={pg}
                    type="button"
                    onClick={() => setCurrentPage(pg)}
                    className={`w-8 h-8 rounded-md text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#F59E0B] text-white shadow-xs"
                        : "border border-[#E5E7EB] text-[#4B5563] hover:bg-stone-50 bg-white"
                    }`}
                  >
                    {pg}
                  </button>
                );
              })}

              {/* Next */}
              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className={`w-8 h-8 rounded-md border border-[#E5E7EB] flex items-center justify-center transition-colors ${
                  currentPage >= totalPages
                    ? "text-[#D1D5DB] cursor-not-allowed bg-stone-50"
                    : "text-[#4B5563] hover:text-[#111827] hover:bg-stone-50 cursor-pointer bg-white"
                }`}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* 6. REVIEW DETAIL SIDE PANEL (DRAWER) */}
      <ReviewDetailDrawer
        item={reviewItem}
        isOpen={Boolean(reviewItem)}
        onClose={() => setReviewItem(null)}
        onApprove={handleApprove}
        onReject={handleReject}
        onResolve={handleResolve}
      />
    </div>
  );
};

export { PendingApprovalsPage };
