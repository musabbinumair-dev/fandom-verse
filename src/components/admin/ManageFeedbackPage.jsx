import { useState, useMemo, useEffect } from "react";
import {
  MessageSquare,
  Sparkles,
  CheckCircle2,
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
  AlertCircle
} from "lucide-react";
import {
  fetchFeedbackItems,
  fetchFeedbackStats,
  updateFeedbackStatus
} from "../../api/api.js";
import { FeedbackDetailDrawer } from "./FeedbackDetailDrawer.jsx";

const ManageFeedbackPage = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [stats, setStats] = useState({
    totalFeedback: "247",
    totalFeedbackTrend: "+12%",
    totalFeedbackComparison: "vs. last month",
    newCount: "68",
    newTrend: "+18%",
    newComparison: "vs. last week",
    resolvedCount: "179",
    resolvedTrend: "+9%",
    resolvedComparison: "vs. last week"
  });

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Selected feedback for Detail Drawer
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        const [items, statsData] = await Promise.all([
          fetchFeedbackItems(),
          fetchFeedbackStats()
        ]);
        if (isMounted) {
          setFeedbackList(items);
          setStats(statsData);
        }
      } catch (err) {
        console.error("Failed to load feedback", err);
      }
    };
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Show transient toast
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 3000);
  };

  // Filter logic
  const filteredItems = useMemo(() => {
    return feedbackList.filter((item) => {
      // Type match
      if (typeFilter !== "All Types") {
        if (item.type.toUpperCase() !== typeFilter.toUpperCase()) return false;
      }

      // Status match
      if (statusFilter === "New" && item.status !== "NEW") return false;
      if (statusFilter === "Resolved" && item.status !== "RESOLVED") return false;

      // Search match
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const matchSubject = item.subject.toLowerCase().includes(q);
      const matchUser =
        item.submittedBy?.name?.toLowerCase().includes(q) ||
        item.submittedBy?.username?.toLowerCase().includes(q);
      const matchMessage = item.message?.toLowerCase().includes(q);
      const matchType = item.type.toLowerCase().includes(q);

      return matchSubject || matchUser || matchMessage || matchType;
    });
  }, [feedbackList, typeFilter, statusFilter, searchQuery]);

  // Pagination
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

  // Update status handler
  const handleUpdateStatus = async (feedbackId, newStatus) => {
    try {
      const currentItem = feedbackList.find((f) => f.id === feedbackId);
      const prevStatus = currentItem ? currentItem.status : null;

      await updateFeedbackStatus(feedbackId, newStatus);
      setFeedbackList((prev) =>
        prev.map((f) => (f.id === feedbackId ? { ...f, status: newStatus } : f))
      );
      if (selectedFeedback && selectedFeedback.id === feedbackId) {
        setSelectedFeedback((prev) => (prev ? { ...prev, status: newStatus } : null));
      }

      if (prevStatus && prevStatus !== newStatus) {
        setStats((prev) => {
          let newCountNum = parseInt(prev.newCount, 10) || 68;
          let resolvedCountNum = parseInt(prev.resolvedCount, 10) || 179;
          if (newStatus === "RESOLVED" && prevStatus === "NEW") {
            newCountNum = Math.max(0, newCountNum - 1);
            resolvedCountNum += 1;
          } else if (newStatus === "NEW" && prevStatus === "RESOLVED") {
            newCountNum += 1;
            resolvedCountNum = Math.max(0, resolvedCountNum - 1);
          }
          return {
            ...prev,
            newCount: String(newCountNum),
            resolvedCount: String(resolvedCountNum)
          };
        });
      }

      showToast(
        newStatus === "RESOLVED"
          ? "Feedback marked as Resolved."
          : "Feedback marked as New."
      );
    } catch (err) {
      console.error("Failed to update status", err);
      showToast("Error updating feedback status.");
    }
  };

  // Render Type Badge in Table
  const renderTableTypeBadge = (type) => {
    switch (type) {
      case "BUG":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-[#FEE2E2] text-[#EF4444]">
            <Bug size={14} />
            <span>BUG</span>
          </span>
        );
      case "SUGGESTION":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-[#E0F2FE] text-[#0284C7]">
            <Lightbulb size={14} />
            <span>SUGGESTION</span>
          </span>
        );
      case "QUERY":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-[#F3E8FF] text-[#9333EA]">
            <HelpCircle size={14} />
            <span>QUERY</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-stone-100 text-stone-700">
            <span>{type}</span>
          </span>
        );
    }
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
        
        {/* 1. TOP HEADER & METRIC CARDS ROW */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left Title & Subtitle */}
          <div>
            <h1 className="text-2xl sm:text-3.5xl font-black tracking-tight uppercase font-titan text-[#111827]">
              FEEDBACK
            </h1>
            <p className="text-xs sm:text-sm font-medium text-[#6B7280] mt-0.5">
              Review and manage feedback submitted by users.
            </p>
          </div>

          {/* Right: 3 Summary Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 shrink-0">
            
            {/* Card 1: TOTAL FEEDBACK */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl px-5 py-4 flex items-center gap-4 shadow-2xs">
              <div className="text-[#1F2937] shrink-0">
                <MessageSquare size={24} strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                  TOTAL FEEDBACK
                </p>
                <p className="text-2xl font-black text-[#111827] tracking-tight leading-tight">
                  {stats.totalFeedback}
                </p>
                <p className="text-xs font-bold text-[#10B981] flex items-center gap-1 mt-0.5">
                  <span>↑ {stats.totalFeedbackTrend}</span>
                  <span className="text-[#9CA3AF] font-normal text-[11px]">
                    {stats.totalFeedbackComparison}
                  </span>
                </p>
              </div>
            </div>

            {/* Card 2: NEW */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl px-5 py-4 flex items-center gap-4 shadow-2xs">
              <div className="text-[#1F2937] shrink-0">
                <Sparkles size={24} strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                  NEW
                </p>
                <p className="text-2xl font-black text-[#111827] tracking-tight leading-tight">
                  {stats.newCount}
                </p>
                <p className="text-xs font-bold text-[#10B981] flex items-center gap-1 mt-0.5">
                  <span>↑ {stats.newTrend}</span>
                  <span className="text-[#9CA3AF] font-normal text-[11px]">
                    {stats.newComparison}
                  </span>
                </p>
              </div>
            </div>

            {/* Card 3: RESOLVED */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl px-5 py-4 flex items-center gap-4 shadow-2xs">
              <div className="text-[#1F2937] shrink-0">
                <CheckCircle2 size={24} strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                  RESOLVED
                </p>
                <p className="text-2xl font-black text-[#111827] tracking-tight leading-tight">
                  {stats.resolvedCount}
                </p>
                <p className="text-xs font-bold text-[#10B981] flex items-center gap-1 mt-0.5">
                  <span>↑ {stats.resolvedTrend}</span>
                  <span className="text-[#9CA3AF] font-normal text-[11px]">
                    {stats.resolvedComparison}
                  </span>
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* 2. FILTERS & SEARCH ROW */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3 pt-2">
          
          {/* Type Dropdown */}
          <div className="relative shrink-0 sm:w-48">
            <label className="text-xs font-bold text-[#374151] mb-1.5 block">
              Type
            </label>
            <button
              type="button"
              onClick={() => {
                setIsTypeDropdownOpen(!isTypeDropdownOpen);
                setIsStatusDropdownOpen(false);
              }}
              className="w-full bg-white border border-[#E5E7EB] hover:border-[#D1D5DB] rounded-lg px-3.5 py-2 text-sm text-[#111827] font-medium flex items-center justify-between shadow-2xs transition-colors cursor-pointer"
            >
              <span>{typeFilter}</span>
              <ChevronDown size={16} className="text-[#6B7280]" />
            </button>

            {isTypeDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setIsTypeDropdownOpen(false)}
                />
                <div className="absolute left-0 top-full mt-1.5 w-full bg-white border border-[#E5E7EB] rounded-lg shadow-lg py-1 z-30 animate-in fade-in duration-100">
                  {["All Types", "Bug", "Suggestion", "Query"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        setTypeFilter(type);
                        setIsTypeDropdownOpen(false);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-sm font-medium flex items-center justify-between transition-colors ${
                        typeFilter === type
                          ? "bg-amber-50 text-[#B45309] font-bold"
                          : "text-[#374151] hover:bg-stone-50"
                      }`}
                    >
                      <span>{type}</span>
                      {typeFilter === type && (
                        <Check size={14} className="text-[#B45309]" />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Status Dropdown */}
          <div className="relative shrink-0 sm:w-48">
            <label className="text-xs font-bold text-[#374151] mb-1.5 block">
              Status
            </label>
            <button
              type="button"
              onClick={() => {
                setIsStatusDropdownOpen(!isStatusDropdownOpen);
                setIsTypeDropdownOpen(false);
              }}
              className="w-full bg-white border border-[#E5E7EB] hover:border-[#D1D5DB] rounded-lg px-3.5 py-2 text-sm text-[#111827] font-medium flex items-center justify-between shadow-2xs transition-colors cursor-pointer"
            >
              <span>{statusFilter}</span>
              <ChevronDown size={16} className="text-[#6B7280]" />
            </button>

            {isStatusDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setIsStatusDropdownOpen(false)}
                />
                <div className="absolute left-0 top-full mt-1.5 w-full bg-white border border-[#E5E7EB] rounded-lg shadow-lg py-1 z-30 animate-in fade-in duration-100">
                  {["All Statuses", "New", "Resolved"].map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => {
                        setStatusFilter(status);
                        setIsStatusDropdownOpen(false);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-sm font-medium flex items-center justify-between transition-colors ${
                        statusFilter === status
                          ? "bg-amber-50 text-[#B45309] font-bold"
                          : "text-[#374151] hover:bg-stone-50"
                      }`}
                    >
                      <span>{status}</span>
                      {statusFilter === status && (
                        <Check size={14} className="text-[#B45309]" />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

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
                placeholder="Search by subject, user or keyword..."
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

        </div>

        {/* 3. MAIN FEEDBACK TABLE CARD */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[760px]">
              <thead>
                <tr className="border-b border-[#E5E7EB] text-[11px] font-bold tracking-wider text-[#6B7280] uppercase">
                  <th className="py-3.5 px-5 w-32">TYPE</th>
                  <th className="py-3.5 px-5">SUBJECT</th>
                  <th className="py-3.5 px-5">SUBMITTED BY</th>
                  <th className="py-3.5 px-5">DATE</th>
                  <th className="py-3.5 px-5 text-center">STATUS</th>
                  <th className="py-3.5 px-5 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6]">
                {paginatedItems.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-[#6B7280]">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <AlertCircle size={28} className="text-[#9CA3AF]" />
                        <p className="text-sm font-bold text-[#374151]">
                          No feedback items found matching your filters.
                        </p>
                        <p className="text-xs text-[#6B7280]">
                          Try adjusting your search query, type or status filter.
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
                      {/* 1. Type */}
                      <td className="py-3.5 px-5">
                        {renderTableTypeBadge(item.type)}
                      </td>

                      {/* 2. Subject */}
                      <td className="py-3.5 px-5 text-sm font-medium text-[#111827]">
                        {item.subject}
                      </td>

                      {/* 3. Submitted By */}
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
                            <p className="text-sm font-bold text-[#111827] leading-snug">
                              {item.submittedBy?.name}
                            </p>
                            <p className="text-xs text-[#6B7280] font-normal leading-tight">
                              {item.submittedBy?.username}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* 4. Date */}
                      <td className="py-3.5 px-5 text-sm text-[#4B5563] font-mono tabular-nums">
                        {item.date}
                      </td>

                      {/* 5. Status Badge */}
                      <td className="py-3.5 px-5 text-center">
                        {item.status === "RESOLVED" ? (
                          <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#DCFCE7] text-[#15803D]">
                            RESOLVED
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#FEE2E2] text-[#EF4444]">
                            NEW
                          </span>
                        )}
                      </td>

                      {/* 6. Action Button (Eye Icon) */}
                      <td className="py-3.5 px-5 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedFeedback(item)}
                          className="p-1.5 text-[#4B5563] hover:text-[#111827] hover:bg-stone-100 rounded-md transition-colors cursor-pointer"
                          title="View feedback details"
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

          {/* 4. PAGINATION FOOTER */}
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
              {/* Prev Button */}
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

              {/* Page Numbers */}
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

              {/* Next Button */}
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

      {/* FEEDBACK DETAIL SIDE PANEL DRAWER */}
      <FeedbackDetailDrawer
        feedback={selectedFeedback}
        isOpen={Boolean(selectedFeedback)}
        onClose={() => setSelectedFeedback(null)}
        onSaveStatus={handleUpdateStatus}
      />
    </div>
  );
};

export { ManageFeedbackPage };
