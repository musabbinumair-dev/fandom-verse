import { useState, useMemo, useEffect } from "react";
import {
  Users,
  ShieldCheck,
  Ban,
  Search,
  ChevronDown,
  Eye,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  X,
  Check,
  Mail,
  ShieldAlert,
  UserCheck
} from "lucide-react";
import {
  fetchUsers,
  fetchUserStats,
  updateUserRole,
  updateUserStatus,
  createUser
} from "../../api/api.js";
import { UserDetailDrawer } from "./UserDetailDrawer.jsx";

const ManageUsersPage = () => {
  const [userList, setUserList] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: "1,248",
    totalUsersTrend: "+12%",
    totalUsersComparison: "vs. last month",
    activeUsers: "1,180",
    activeUsersTrend: "+8%",
    activeUsersComparison: "vs. last week",
    suspendedUsers: "68",
    suspendedUsersTrend: "-3%",
    suspendedUsersComparison: "vs. last week"
  });

  // Search and Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Selected User for Detail Drawer
  const [selectedUser, setSelectedUser] = useState(null);

  // Modal for adding a new user
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUserForm, setNewUserForm] = useState({
    name: "",
    username: "",
    email: "",
    role: "User",
    bio: ""
  });

  // Transient Toast Notification
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        const [usersData, statsData] = await Promise.all([
          fetchUsers(),
          fetchUserStats()
        ]);
        if (isMounted) {
          setUserList(usersData);
          setStats(statsData);
        }
      } catch (err) {
        console.error("Failed to load user management data", err);
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

  // Filtered Users
  const filteredUsers = useMemo(() => {
    return userList.filter((user) => {
      // Role Filter
      if (roleFilter !== "All Roles") {
        if (user.role.toUpperCase() !== roleFilter.toUpperCase()) return false;
      }

      // Status Filter
      if (statusFilter !== "All Statuses") {
        if (user.status.toUpperCase() !== statusFilter.toUpperCase()) return false;
      }

      // Search
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const matchName = user.name?.toLowerCase().includes(q);
      const matchUsername = user.username?.toLowerCase().includes(q);
      const matchEmail = user.email?.toLowerCase().includes(q);

      return matchName || matchUsername || matchEmail;
    });
  }, [userList, roleFilter, statusFilter, searchQuery]);

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / itemsPerPage));
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, currentPage, itemsPerPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  // Role / Status update handlers
  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole);
      setUserList((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      );
      if (selectedUser && selectedUser.id === userId) {
        setSelectedUser((prev) => (prev ? { ...prev, role: newRole } : null));
      }
      showToast(`User role updated to ${newRole}.`);
    } catch (err) {
      console.error("Failed to update role", err);
      showToast("Error updating user role.");
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      await updateUserStatus(userId, newStatus);
      setUserList((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u))
      );
      if (selectedUser && selectedUser.id === userId) {
        setSelectedUser((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
      showToast(`User status updated to ${newStatus}.`);
    } catch (err) {
      console.error("Failed to update status", err);
      showToast("Error updating user status.");
    }
  };

  // Add User submit handler
  const handleCreateUserSubmit = async (e) => {
    e.preventDefault();
    if (!newUserForm.name.trim() || !newUserForm.email.trim()) {
      showToast("Please fill in the required fields.");
      return;
    }

    try {
      const created = await createUser({
        ...newUserForm,
        username: newUserForm.username.startsWith("@")
          ? newUserForm.username
          : `@${newUserForm.username || newUserForm.name.toLowerCase().replace(/\s+/g, "")}`
      });
      setUserList((prev) => [created, ...prev]);
      setIsAddUserModalOpen(false);
      setNewUserForm({
        name: "",
        username: "",
        email: "",
        role: "User",
        bio: ""
      });
      showToast("New user added successfully!");
    } catch (err) {
      console.error("Failed to create user", err);
      showToast("Error creating new user.");
    }
  };

  // Role Badge Formatter
  const renderRoleBadge = (role) => {
    const r = role?.toUpperCase();
    if (r === "ADMIN") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-rose-500/20 text-rose-400 border border-rose-500/30">
          ADMIN
        </span>
      );
    }
    if (r === "MODERATOR") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-sky-500/20 text-sky-400 border border-sky-500/30">
          MODERATOR
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-gray-100 text-gray-500 border border-gray-200">
        USER
      </span>
    );
  };

  return (
    <div className="w-full bg-[#F8F9FA] min-h-full font-sans select-none pb-16 text-gray-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-white border border-gray-200 text-gray-900 px-4 py-2.5 rounded-xl shadow-sm border border-gray-200 flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2 duration-200">
          <UserCheck size={16} className="text-[#FFA800] shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-gray-500 hover:text-gray-900 cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* 1. TOP HEADER & METRIC CARDS ROW */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl sm:text-3.5xl font-black tracking-tight uppercase font-titan text-gray-900">
              USERS
            </h1>
            <p className="text-xs sm:text-sm font-medium text-gray-500 mt-0.5">
              Manage user accounts, assign roles, and view permissions.
            </p>
          </div>

          {/* 3 Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 shrink-0">
            {/* Card 1: TOTAL USERS */}
            <div className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center gap-4 shadow-sm border border-gray-200">
              <div className="text-[#FFA800] shrink-0">
                <Users size={24} strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  TOTAL USERS
                </p>
                <p className="text-2xl font-black text-gray-900 tracking-tight leading-tight">
                  {stats.totalUsers}
                </p>
                <p className="text-xs font-bold text-[#4ADE80] flex items-center gap-1 mt-0.5">
                  <span>↑ {stats.totalUsersTrend}</span>
                  <span className="text-gray-500 font-normal text-[11px]">
                    {stats.totalUsersComparison}
                  </span>
                </p>
              </div>
            </div>

            {/* Card 2: ACTIVE USERS */}
            <div className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center gap-4 shadow-sm border border-gray-200">
              <div className="text-[#4ADE80] shrink-0">
                <ShieldCheck size={24} strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  ACTIVE USERS
                </p>
                <p className="text-2xl font-black text-gray-900 tracking-tight leading-tight">
                  {stats.activeUsers}
                </p>
                <p className="text-xs font-bold text-[#4ADE80] flex items-center gap-1 mt-0.5">
                  <span>↑ {stats.activeUsersTrend}</span>
                  <span className="text-gray-500 font-normal text-[11px]">
                    {stats.activeUsersComparison}
                  </span>
                </p>
              </div>
            </div>

            {/* Card 3: SUSPENDED */}
            <div className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center gap-4 shadow-sm border border-gray-200">
              <div className="text-[#F87171] shrink-0">
                <Ban size={24} strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  SUSPENDED
                </p>
                <p className="text-2xl font-black text-gray-900 tracking-tight leading-tight">
                  {stats.suspendedUsers}
                </p>
                <p className="text-xs font-bold text-[#F87171] flex items-center gap-1 mt-0.5">
                  <span>↓ {stats.suspendedUsersTrend}</span>
                  <span className="text-gray-500 font-normal text-[11px]">
                    {stats.suspendedUsersComparison}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. FILTERS, SEARCH & ADD USER BUTTON ROW */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3 pt-2">
          {/* Role Filter */}
          <div className="relative shrink-0 sm:w-44">
            <label className="text-xs font-bold text-gray-500 mb-1.5 block">
              Role
            </label>
            <button
              type="button"
              onClick={() => {
                setIsRoleDropdownOpen(!isRoleDropdownOpen);
                setIsStatusDropdownOpen(false);
              }}
              className="w-full bg-white border border-gray-200 hover:border-[#FFA800] rounded-lg px-3.5 py-2 text-sm text-gray-900 font-medium flex items-center justify-between shadow-sm border border-gray-200 transition-colors cursor-pointer"
            >
              <span>{roleFilter}</span>
              <ChevronDown size={16} className="text-gray-500" />
            </button>

            {isRoleDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setIsRoleDropdownOpen(false)}
                />
                <div className="absolute left-0 top-full mt-1.5 w-full bg-white border border-gray-200 rounded-lg shadow-xl py-1 z-30 animate-in fade-in duration-100">
                  {["All Roles", "Admin", "Moderator", "User"].map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => {
                        setRoleFilter(role);
                        setIsRoleDropdownOpen(false);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-sm font-medium flex items-center justify-between transition-colors cursor-pointer ${
                        roleFilter === role
                          ? "bg-[#FFA800]/20 text-[#FFA800] font-bold"
                          : "text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      <span>{role}</span>
                      {roleFilter === role && (
                        <Check size={14} className="text-[#FFA800]" />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Status Filter */}
          <div className="relative shrink-0 sm:w-44">
            <label className="text-xs font-bold text-gray-500 mb-1.5 block">
              Status
            </label>
            <button
              type="button"
              onClick={() => {
                setIsStatusDropdownOpen(!isStatusDropdownOpen);
                setIsRoleDropdownOpen(false);
              }}
              className="w-full bg-white border border-gray-200 hover:border-[#FFA800] rounded-lg px-3.5 py-2 text-sm text-gray-900 font-medium flex items-center justify-between shadow-sm border border-gray-200 transition-colors cursor-pointer"
            >
              <span>{statusFilter}</span>
              <ChevronDown size={16} className="text-gray-500" />
            </button>

            {isStatusDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setIsStatusDropdownOpen(false)}
                />
                <div className="absolute left-0 top-full mt-1.5 w-full bg-white border border-gray-200 rounded-lg shadow-xl py-1 z-30 animate-in fade-in duration-100">
                  {["All Statuses", "Active", "Suspended"].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => {
                        setStatusFilter(st);
                        setIsStatusDropdownOpen(false);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-sm font-medium flex items-center justify-between transition-colors cursor-pointer ${
                        statusFilter === st
                          ? "bg-[#FFA800]/20 text-[#FFA800] font-bold"
                          : "text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      <span>{st}</span>
                      {statusFilter === st && (
                        <Check size={14} className="text-[#FFA800]" />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Search Input */}
          <div className="flex-1 relative">
            <div className="relative flex items-center">
              <Search
                size={18}
                className="absolute left-3.5 text-gray-500 pointer-events-none"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search users by name, username or email..."
                className="w-full bg-white border border-gray-200 hover:border-[#FFA800]/60 focus:border-[#FFA800] rounded-lg pl-10 pr-9 py-2 text-sm text-gray-900 placeholder:text-gray-500/60 focus:outline-none shadow-sm border border-gray-200 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 text-gray-500 hover:text-gray-900 cursor-pointer"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </div>

          {/* Add User Button */}
          <button
            type="button"
            onClick={() => setIsAddUserModalOpen(true)}
            className="bg-[#FFA800] hover:bg-[#FFB51A] active:scale-[0.98] text-black font-extrabold text-sm px-4 py-2 rounded-lg flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer shrink-0"
          >
            <UserPlus size={16} strokeWidth={2.5} />
            <span>Add User</span>
          </button>
        </div>

        {/* 3. USERS TABLE CARD */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[820px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-100 text-[11px] font-bold tracking-wider text-gray-500 uppercase">
                  <th className="py-3.5 px-5">USER</th>
                  <th className="py-3.5 px-5">EMAIL</th>
                  <th className="py-3.5 px-5 text-center">ROLE</th>
                  <th className="py-3.5 px-5 text-center">STATUS</th>
                  <th className="py-3.5 px-5">JOINED</th>
                  <th className="py-3.5 px-5 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Users size={28} className="text-gray-500" />
                        <p className="text-sm font-bold text-gray-900">
                          No users found matching your criteria.
                        </p>
                        <p className="text-xs text-gray-500">
                          Try clearing the search or filter settings.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-100/70 transition-colors group"
                    >
                      {/* 1. User Name & Avatar */}
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 bg-black shrink-0">
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
                          <div>
                            <p className="text-sm font-bold text-gray-900 leading-snug">
                              {user.name}
                            </p>
                            <p className="text-xs text-gray-500 font-normal leading-tight">
                              {user.username}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* 2. Email */}
                      <td className="py-3.5 px-5 text-sm text-gray-500 font-mono">
                        {user.email}
                      </td>

                      {/* 3. Role */}
                      <td className="py-3.5 px-5 text-center">
                        {renderRoleBadge(user.role)}
                      </td>

                      {/* 4. Status */}
                      <td className="py-3.5 px-5 text-center">
                        {user.status === "ACTIVE" ? (
                          <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            ACTIVE
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-red-500/20 text-red-400 border border-red-500/30">
                            SUSPENDED
                          </span>
                        )}
                      </td>

                      {/* 5. Joined Date */}
                      <td className="py-3.5 px-5 text-sm text-gray-500 font-mono tabular-nums">
                        {user.joinedDate}
                      </td>

                      {/* 6. Action */}
                      <td className="py-3.5 px-5 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedUser(user)}
                          className="p-1.5 text-gray-500 hover:text-[#FFA800] hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
                          title="View user details"
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
          <div className="px-5 py-3.5 border-t border-gray-200 bg-gray-100/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <div>
              {filteredUsers.length > 0 ? (
                <span>
                  Showing {(currentPage - 1) * itemsPerPage + 1}-
                  {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of{" "}
                  {filteredUsers.length} users
                </span>
              ) : (
                <span>Showing 0 of 0 users</span>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className={`w-8 h-8 rounded-md border border-gray-200 flex items-center justify-center transition-colors ${
                  currentPage <= 1
                    ? "text-gray-500/30 cursor-not-allowed bg-white"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100 cursor-pointer bg-white"
                }`}
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => {
                const isActive = pg === currentPage;
                return (
                  <button
                    key={pg}
                    type="button"
                    onClick={() => setCurrentPage(pg)}
                    className={`w-8 h-8 rounded-md text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#FFA800] text-black shadow-xs font-extrabold"
                        : "border border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-900 bg-white"
                    }`}
                  >
                    {pg}
                  </button>
                );
              })}

              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className={`w-8 h-8 rounded-md border border-gray-200 flex items-center justify-center transition-colors ${
                  currentPage >= totalPages
                    ? "text-gray-500/30 cursor-not-allowed bg-white"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100 cursor-pointer bg-white"
                }`}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* USER DETAIL SIDE PANEL DRAWER */}
      <UserDetailDrawer
        user={selectedUser}
        isOpen={Boolean(selectedUser)}
        onClose={() => setSelectedUser(null)}
        onSaveRole={handleRoleChange}
        onSaveStatus={handleStatusChange}
      />

      {/* ADD NEW USER MODAL */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white border border-gray-200 rounded-2xl max-w-md w-full p-6 shadow-sm border border-gray-200 animate-in zoom-in-95 duration-150 text-gray-900">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 mb-4">
              <div className="flex items-center gap-2">
                <UserPlus size={18} className="text-[#FFA800]" />
                <h3 className="text-base font-bold text-gray-900">Add New User</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddUserModalOpen(false)}
                className="text-gray-500 hover:text-gray-900 p-1 rounded-md"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateUserSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-gray-900 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eren Jaeger"
                  value={newUserForm.name}
                  onChange={(e) =>
                    setNewUserForm({ ...newUserForm, name: e.target.value })
                  }
                  className="w-full bg-[#F8F9FA] border border-gray-200 rounded-lg p-2.5 text-gray-900 focus:outline-none focus:border-[#FFA800]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-900 mb-1">
                  Username <span className="text-gray-500 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="@eren_founder"
                  value={newUserForm.username}
                  onChange={(e) =>
                    setNewUserForm({ ...newUserForm, username: e.target.value })
                  }
                  className="w-full bg-[#F8F9FA] border border-gray-200 rounded-lg p-2.5 text-gray-900 focus:outline-none focus:border-[#FFA800]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-900 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="eren@paradis.io"
                  value={newUserForm.email}
                  onChange={(e) =>
                    setNewUserForm({ ...newUserForm, email: e.target.value })
                  }
                  className="w-full bg-[#F8F9FA] border border-gray-200 rounded-lg p-2.5 text-gray-900 focus:outline-none focus:border-[#FFA800]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-900 mb-1">
                  Role
                </label>
                <select
                  value={newUserForm.role}
                  onChange={(e) =>
                    setNewUserForm({ ...newUserForm, role: e.target.value })
                  }
                  className="w-full bg-[#F8F9FA] border border-gray-200 rounded-lg p-2.5 text-gray-900 focus:outline-none focus:border-[#FFA800] cursor-pointer"
                >
                  <option value="User">User</option>
                  <option value="Moderator">Moderator</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-900 mb-1">
                  Bio <span className="text-gray-500 font-normal">(optional)</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Write a brief intro..."
                  value={newUserForm.bio}
                  onChange={(e) =>
                    setNewUserForm({ ...newUserForm, bio: e.target.value })
                  }
                  className="w-full bg-[#F8F9FA] border border-gray-200 rounded-lg p-2.5 text-gray-900 focus:outline-none focus:border-[#FFA800] resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-semibold text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#FFA800] hover:bg-[#FFB51A] text-black rounded-lg text-xs font-bold"
                >
                  Create User
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
