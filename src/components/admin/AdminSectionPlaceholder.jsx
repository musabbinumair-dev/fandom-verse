import {
  FileText,
  Video,
  Users,
  BookOpen,
  ShoppingBag,
  Calendar,
  UserCheck,
  MessageSquare,
  Inbox,
  Bot,
  Settings,
  Plus
} from "lucide-react";

const SECTION_CONFIGS = {
  multimedia: { title: "MANAGE MULTIMEDIA", icon: Video, desc: "Upload and organize video trailers, gameplay clips, and fan audio." },
  characters: { title: "MANAGE CHARACTERS", icon: Users, desc: "Create, edit, and maintain wiki character profiles across all fandoms." },
  articles: { title: "MANAGE ARTICLES", icon: BookOpen, desc: "Review, publish, and schedule lore breakdowns and featured news." },
  merchandise: { title: "MANAGE MERCHANDISE", icon: ShoppingBag, desc: "Manage featured fan merchandise, action figures, and apparel listings." },
  events: { title: "MANAGE EVENTS", icon: Calendar, desc: "Schedule upcoming community conventions, watch parties, and livestreams." },
  users: { title: "MANAGE USERS", icon: UserCheck, desc: "Review registered user accounts, role permissions, and moderator access." },
  feedback: { title: "USER FEEDBACK", icon: MessageSquare, desc: "Review user suggestions, bug reports, and platform experience ratings." },
  submissions: { title: "PENDING SUBMISSIONS", icon: Inbox, desc: "Approve or reject fan-submitted wiki entries, artwork, and articles." },
  "chatbot-faqs": { title: "CHATBOT & FAQS", icon: Bot, desc: "Configure AI assistant prompt knowledge bases and FAQ responses." },
  settings: { title: "ADMIN SETTINGS", icon: Settings, desc: "Manage site-wide configurations, branding, and API key proxy settings." },
};

const AdminSectionPlaceholder = ({ tabKey = "settings" }) => {
  const config = SECTION_CONFIGS[tabKey] || SECTION_CONFIGS.settings;
  const Icon = config.icon;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EBE6DD] pb-5">
        <div>
          <h1 className="text-2xl sm:text-3.5xl font-black tracking-tight uppercase font-titan text-[#171717] flex items-center gap-3">
            <Icon size={28} className="text-[#FF5F1F]" />
            <span>{config.title}</span>
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-[#7A6F64] mt-1">
            {config.desc}
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert(`Adding new entry to ${config.title}`)}
          className="bg-[#FFCC00] hover:bg-[#F2C200] text-black font-black text-xs uppercase tracking-wider px-5 py-3 rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus size={16} className="stroke-[3]" />
          <span>NEW ENTRY</span>
        </button>
      </div>

      {/* Admin Panel Summary Card */}
      <div className="bg-white rounded-2xl border border-[#EBE6DD] p-8 shadow-2xs text-center space-y-3 py-16">
        <div className="w-14 h-14 rounded-2xl bg-[#FFEBE5] text-[#FF5F1F] flex items-center justify-center mx-auto shadow-xs">
          <Icon size={28} />
        </div>
        <h3 className="text-lg font-black text-[#171717] font-titan uppercase">
          {config.title} MANAGEMENT
        </h3>
        <p className="text-xs sm:text-sm font-semibold text-[#7A6F64] max-w-md mx-auto leading-relaxed">
          Full management controls and real-time database sync for {config.title.toLowerCase()} are active in this separate Admin Portal.
        </p>
      </div>
    </div>
  );
};

export { AdminSectionPlaceholder };
