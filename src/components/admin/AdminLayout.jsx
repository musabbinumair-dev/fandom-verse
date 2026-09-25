import { AdminSidebar } from "./AdminSidebar";
import { AdminTopHeader } from "./AdminTopHeader";
import { FandomFooter } from "../FandomFooter";

const AdminLayout = ({
  children,
  activeTab = "dashboard",
  onSelectTab,
  searchQuery = "",
  onSearchChange,
  onNavigateToUserPanel,
  onOpenNotifications,
  onOpenProfile,
  onLogout,
  onOpenLinkModal,
  navTheme = "light"
}) => {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden font-baloo select-none bg-[#F8F9FA] text-[#1E293B]">
      {/* 1. TOP NAVBAR / HEADER */}
      <AdminTopHeader
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onOpenNotifications={onOpenNotifications}
        onOpenProfile={onOpenProfile}
        onNavigateHome={() => onSelectTab && onSelectTab("dashboard")}
        onNavigateToUserPanel={onNavigateToUserPanel}
        onLogout={onLogout}
        theme="light"
      />

      {/* 2. BODY CONTENT CHASSIS: Left Sidebar + Main Content Area */}
      <div className="flex-1 flex h-full min-h-0 overflow-hidden" data-panel="admin-panel">
        {/* Left Sidebar Rail */}
        <AdminSidebar
          activeTab={activeTab}
          onSelectTab={onSelectTab}
          onNavigateToUserPanel={onNavigateToUserPanel}
          theme="light"
        />

        {/* Main Content Scrollable Viewport */}
        <main className="flex-1 h-full min-w-0 overflow-y-auto flex flex-col justify-between bg-[#F8F9FA]">
          <div className="w-full flex-1">
            {children}
          </div>

          {/* Shared Standardized Footer */}
          <FandomFooter onOpenLinkModal={onOpenLinkModal} />
        </main>
      </div>
    </div>
  );
};

export { AdminLayout };
export default AdminLayout;
