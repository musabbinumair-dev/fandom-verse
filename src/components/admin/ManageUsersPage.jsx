import { useState, useMemo, useEffect } from "react";
import {
  Users,
  UserCheck,
  Star,
  Search,
  ChevronDown,
  Eye,
  Pencil,
  Ban,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  AlertCircle
} from "lucide-react";
import {
  fetchUsers,
  fetchUserStats,
  updateUserStatus,
  updateUserDetails
} from "../../api/api.js";
import { UserDetailDrawer } from "./UserDetailDrawer.jsx";

const FANDOM_COLORS = {
  Anime: "bg-[#FEF3C7] text-[#92400E]",
  Gaming: "bg-[#E0F2FE] text-[#0369A1]",
  Comics: "bg-[#CCFBF1] text-[#0F766E]",
  "K-Pop": "bg-[#F3E8FF] text-[#7E22CE]",
  Movies: "bg-[#E0F2FE] text-[#0284C7]",
  "TV Shows": "bg-[#EDE9FE] text-[#6D28D9]",
  Manga: "bg-[#FFE4E6] text-[#BE123C]",
  Cosplay: "bg-[#FCE7F3] text-[#BE185D]"
};

const ALL_FANDOMS = [
  "Anime",
  "Gaming",
  "Comics",
  "K-Pop",
  "Movies",
  "TV Shows",
  "Manga",
  "Cosplay"
];

const ManageUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: "2,847",
    totalUsersTrend: "+12%",
    totalUsersComparison: "vs. last month",
    activeToday: "642",
    activeTodayTrend: "+8%",
    activeTodayComparison: "vs. yesterday",
    newThisWeek: "318",
    newThisWeekTrend: "+15%",
    newThisWeekComparison: "vs. last week"
  });
  const [isLoading, setIsLoading] = useState(true);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  // Modals state
  const [viewingUser, setViewingUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Load initial data
  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        const [usersData, statsData] = await Promise.all([
          fetchUsers(),
          fetchUserStats()
        ]);
        if (isMounted) {
          setUsers(usersData);
          setStats(statsData);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Failed to fetch users data", err);
        if (isMounted) setIsLoading(false);
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

  // Filtered users list
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      // Status match
      if (statusFilter === "Active" && user.status !== "ACTIVE") return false;
      if (statusFilter === "Banned" && user.status !== "BANNED") return false;

      // Search query match
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const matchName = user.name.toLowerCase().includes(q);
      const matchUsername = user.username.toLowerCase().includes(q);
      const matchEmail = user.email.toLowerCase().includes(q);
      const matchFandom = user.favoriteFandoms.some((f) =>
        f.toLowerCase().includes(q)
      );

      return matchName || matchUsername || matchEmail || matchFandom;
    });
  }, [users, statusFilter, searchQuery]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / usersPerPage));
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * usersPerPage;
    return filteredUsers.slice(startIndex, startIndex + usersPerPage);
  }, [filteredUsers, currentPage, usersPerPage]);

  // Adjust page if filters reduce total pages
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  // Toggle user status (Ban / Unban)
  const handleToggleStatus = async (user) => {
    const newStatus = user.status === "ACTIVE" ? "BANNED" : "ACTIVE";
    try {
      await updateUserStatus(user.id, newStatus);
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, status: newStatus } : u))
      );
      showToast(
        newStatus === "BANNED"
          ? `User ${user.name} has been banned.`
          : `User ${user.name} has been reinstated to active status.`
      );
    } catch (err) {
      console.error("Failed to update user status", err);
      showToast("Error updating user status.");
    }
  };

  // Handle Edit form submission
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingUser) return;
    try {
      await updateUserDetails(editingUser.id, editingUser);
      setUsers((prev) =>
        prev.map((u) => (u.id === editingUser.id ? { ...editingUser } : u))
      );
      setEditingUser(null);
      showToast(`User ${editingUser.name} updated successfully.`);
    } catch (err) {
      console.error("Failed to update user details", err);
      showToast("Error saving user details.");
    }
  };

  // Handle Save from UserDetailDrawer
  const handleSaveUserDetail = async (updatedUser) => {
    try {
      await updateUserDetails(updatedUser.id, updatedUser);
      setUsers((prev) =>
        prev.map((u) => (u.id === updatedUser.id ? { ...u, ...updatedUser } : u))
      );
      setViewingUser(null);
      showToast(`User ${updatedUser.name} updated successfully.`);
    } catch (err) {
      console.error("Failed to update user details", err);
      showToast("Error updating user details.");
    }
  };

  // Helper for fandom chip colors
  const getFandomColor = (fandomName) => {
    return FANDOM_COLORS[fandomName] || "bg-stone-100 text-stone-700";
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
            className="ml-2 text-stone-400 hover:text-white"
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
              MANAGE USERS
            </h1>
            <p className="text-xs sm:text-sm font-medium text-[#6B7280] mt-0.5">
              View and manage registered users on the platform.
            </p>
          </div>

          {/* Right: 3 Summary Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 shrink-0">
            {/* Card 1: TOTAL USERS */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl px-5 py-4 flex items-center gap-4 shadow-2xs">
              <div className="text-[#1F2937] shrink-0">
                <Users size={24} strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                  TOTAL USERS
                </p>
                <p className="text-2xl font-black text-[#111827] tracking-tight leading-tight">
                  {stats.totalUsers}
                </p>
                <p className="text-xs font-bold text-[#10B981] flex items-center gap-1 mt-0.5">
                  <span>↑ {stats.totalUsersTrend}</span>
                  <span className="text-[#9CA3AF] font-normal text-[11px]">
                    {stats.totalUsersComparison}
                  </span>
                </p>
              </div>
            </div>

            {/* Card 2: ACTIVE TODAY */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl px-5 py-4 flex items-center gap-4 shadow-2xs">
              <div className="text-[#1F2937] shrink-0">
                <UserCheck size={24} strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                  ACTIVE TODAY
                </p>
                <p className="text-2xl font-black text-[#111827] tracking-tight leading-tight">
                  {stats.activeToday}
                </p>
                <p className="text-xs font-bold text-[#10B981] flex items-center gap-1 mt-0.5">
                  <span>↑ {stats.activeTodayTrend}</span>
                  <span className="text-[#9CA3AF] font-normal text-[11px]">
                    {stats.activeTodayComparison}
                  </span>
                </p>
              </div>
            </div>

            {/* Card 3: NEW THIS WEEK */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl px-5 py-4 flex items-center gap-4 shadow-2xs">
              <div className="text-[#1F2937] shrink-0">
                <Star size={24} strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                  NEW THIS WEEK
                </p>
                <p className="text-2xl font-black text-[#111827] tracking-tight leading-tight">
                  {stats.newThisWeek}
                </p>
                <p className="text-xs font-bold text-[#10B981] flex items-center gap-1 mt-0.5">
                  <span>↑ {stats.newThisWeekTrend}</span>
                  <span className="text-[#9CA3AF] font-normal text-[11px]">
                    {stats.newThisWeekComparison}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. FILTERS & SEARCH ROW */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3 pt-2">
          {/* Status Dropdown Filter */}
          <div className="relative shrink-0 sm:w-56">
            <label className="text-xs font-bold text-[#374151] mb-1.5 block">
              Status
            </label>
            <button
              type="button"
              onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
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
                  {["All Statuses", "Active", "Banned"].map((status) => (
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
                placeholder="Search by name, email or fandom..."
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

        {/* 3. MAIN USERS DATA TABLE CARD */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[840px]">
              <thead>
                <tr className="border-b border-[#E5E7EB] text-[11px] font-bold tracking-wider text-[#6B7280] uppercase">
                  <th className="py-3.5 px-5 w-20">AVATAR</th>
                  <th className="py-3.5 px-5">NAME</th>
                  <th className="py-3.5 px-5">EMAIL</th>
                  <th className="py-3.5 px-5">JOINED DATE</th>
                  <th className="py-3.5 px-5">FAVORITE FANDOMS</th>
                  <th className="py-3.5 px-5 text-center">STATUS</th>
                  <th className="py-3.5 px-5 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6]">
                {paginatedUsers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-[#6B7280]">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <AlertCircle size={28} className="text-[#9CA3AF]" />
                        <p className="text-sm font-bold text-[#374151]">
                          No users found matching your filters.
                        </p>
                        <p className="text-xs text-[#6B7280]">
                          Try adjusting your search query or status filter.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-[#FAF9F6]/80 transition-colors group"
                    >
                      {/* 1. Avatar */}
                      <td className="py-3.5 px-5">
                        <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#E5E7EB] bg-stone-100 shrink-0">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src =
                                "/src/assets/images/luffy_avatar_1790269807034.jpg";
                            }}
                          />
                        </div>
                      </td>

                      {/* 2. Name & Handle */}
                      <td className="py-3.5 px-5">
                        <p className="text-sm font-bold text-[#111827] leading-snug">
                          {user.name}
                        </p>
                        <p className="text-xs text-[#6B7280] font-normal leading-tight">
                          {user.username}
                        </p>
                      </td>

                      {/* 3. Email */}
                      <td className="py-3.5 px-5 text-sm text-[#4B5563]">
                        {user.email}
                      </td>

                      {/* 4. Joined Date */}
                      <td className="py-3.5 px-5 text-sm text-[#4B5563] font-mono tabular-nums">
                        {user.joinedDate}
                      </td>

                      {/* 5. Favorite Fandoms Badges */}
                      <td className="py-3.5 px-5">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {user.favoriteFandoms.map((fandom) => (
                            <span
                              key={fandom}
                              className={`px-2.5 py-0.5 rounded text-xs font-semibold ${getFandomColor(
                                fandom
                              )}`}
                            >
                              {fandom}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* 6. Status Pill */}
                      <td className="py-3.5 px-5 text-center">
                        {user.status === "ACTIVE" ? (
                          <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#DCFCE7] text-[#15803D]">
                            ACTIVE
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#FEE2E2] text-[#B91C1C]">
                            BANNED
                          </span>
                        )}
                      </td>

                      {/* 7. Action Icons */}
                      <td className="py-3.5 px-5 text-right">
                        <div className="flex items-center justify-end gap-2.5">
                          {/* View details */}
                          <button
                            type="button"
                            onClick={() => setViewingUser(user)}
                            className="p-1.5 text-[#4B5563] hover:text-[#111827] hover:bg-stone-100 rounded-md transition-colors cursor-pointer"
                            title="View user details"
                          >
                            <Eye size={17} strokeWidth={1.75} />
                          </button>

                          {/* Edit user */}
                          <button
                            type="button"
                            onClick={() => setEditingUser({ ...user })}
                            className="p-1.5 text-[#4B5563] hover:text-[#111827] hover:bg-stone-100 rounded-md transition-colors cursor-pointer"
                            title="Edit user"
                          >
                            <Pencil size={17} strokeWidth={1.75} />
                          </button>

                          {/* Ban / Unban toggle */}
                          {user.status === "ACTIVE" ? (
                            <button
                              type="button"
                              onClick={() => handleToggleStatus(user)}
                              className="p-1.5 text-[#EF4444] hover:text-[#DC2626] hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                              title="Ban user"
                            >
                              <Ban size={17} strokeWidth={1.75} />
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleToggleStatus(user)}
                              className="p-1.5 text-[#10B981] hover:text-[#059669] hover:bg-emerald-50 rounded-md transition-colors cursor-pointer"
                              title="Unban user"
                            >
                              <CheckCircle2 size={17} strokeWidth={1.75} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* 4. TABLE PAGINATION FOOTER */}
          <div className="px-5 py-3.5 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6B7280]">
            <div>
              {filteredUsers.length > 0 ? (
                <span>
                  Showing {(currentPage - 1) * usersPerPage + 1}-
                  {Math.min(currentPage * usersPerPage, filteredUsers.length)} of{" "}
                  {filteredUsers.length} users
                </span>
              ) : (
                <span>Showing 0 of 0 users</span>
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

      {/* 5. USER DETAIL SIDE PANEL (DRAWER) */}
      <UserDetailDrawer
        user={viewingUser}
        isOpen={Boolean(viewingUser)}
        onClose={() => setViewingUser(null)}
        onSave={handleSaveUserDetail}
      />

      {/* 6. EDIT USER MODAL */}
      {editingUser && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-2xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setEditingUser(null)}
        >
          <div
            className="bg-white rounded-2xl border border-[#EDE4D6] max-w-lg w-full p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-3">
              <h2 className="text-lg font-bold text-[#111827]">
                Edit User: {editingUser.name}
              </h2>
              <button
                onClick={() => setEditingUser(null)}
                className="text-[#9CA3AF] hover:text-[#111827] p-1 rounded-lg cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-bold text-[#374151] mb-1 block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editingUser.name}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, name: e.target.value })
                    }
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-xs text-[#111827] focus:outline-none focus:border-[#FF5F1F]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#374151] mb-1 block">
                    Username
                  </label>
                  <input
                    type="text"
                    required
                    value={editingUser.username}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        username: e.target.value
                      })
                    }
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-xs text-[#111827] focus:outline-none focus:border-[#FF5F1F]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#374151] mb-1 block">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={editingUser.email}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, email: e.target.value })
                  }
                  className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-xs text-[#111827] focus:outline-none focus:border-[#FF5F1F]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#374151] mb-1 block">
                  Account Status
                </label>
                <select
                  value={editingUser.status}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, status: e.target.value })
                  }
                  className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-xs text-[#111827] focus:outline-none focus:border-[#FF5F1F]"
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="BANNED">BANNED</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#374151] mb-1.5 block">
                  Favorite Fandoms (Select up to 4)
                </label>
                <div className="flex flex-wrap gap-2">
                  {ALL_FANDOMS.map((fandom) => {
                    const isSelected =
                      editingUser.favoriteFandoms.includes(fandom);
                    return (
                      <button
                        key={fandom}
                        type="button"
                        onClick={() => {
                          const current = [...editingUser.favoriteFandoms];
                          if (isSelected) {
                            setEditingUser({
                              ...editingUser,
                              favoriteFandoms: current.filter((f) => f !== fandom)
                            });
                          } else {
                            if (current.length < 4) {
                              setEditingUser({
                                ...editingUser,
                                favoriteFandoms: [...current, fandom]
                              });
                            }
                          }
                        }}
                        className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer border ${
                          isSelected
                            ? `${getFandomColor(fandom)} border-transparent ring-1 ring-black/20`
                            : "bg-white text-stone-600 border-[#E5E7EB] hover:bg-stone-50"
                        }`}
                      >
                        {fandom} {isSelected && "✓"}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#F3F4F6]">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 rounded-lg text-xs font-bold border border-[#E5E7EB] text-[#4B5563] hover:bg-stone-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-xs font-bold bg-[#FF5F1F] text-white hover:bg-[#E04F13] shadow-xs transition-colors cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export { ManageUsersPage };
