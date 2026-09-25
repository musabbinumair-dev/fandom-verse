import { useState } from "react";
import {
  Users,
  FileText,
  Star,
  MessageSquare,
  Image as ImageIcon,
  Settings,
  ChevronDown,
  Search,
  Bell,
  Sun,
  Check
} from "lucide-react";
import { getCategoryBadgeClass, CATEGORY_COLORS } from "../utils/categoryColors.js";

const DashboardPage = ({
  onOpenArticle,
  onNavigateTab
}) => {
  const [activeTab, setActiveTab] = useState("submissions");
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  // Sparkline generator helper
  const renderSparkline = () => (
    <svg className="w-16 h-8 text-[#F59E0B] shrink-0" viewBox="0 0 60 30" fill="none">
      <path
        d="M2 24 L14 18 L26 22 L38 12 L50 16 L58 4"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="58" cy="4" r="3" fill="#F59E0B" />
    </svg>
  );

  // Data for Pending Content Submissions
  const submissions = [
    {
      id: "sub-1",
      title: "The Last Horizon",
      type: "Anime",
      submittedBy: "SkyRider_22",
      date: "May 27, 2025",
      image: "/src/assets/images/interstellar_space_1790270312783.jpg"
    },
    {
      id: "sub-2",
      title: "Shadow Realms",
      type: "Gaming",
      submittedBy: "PixelNomad",
      date: "May 26, 2025",
      image: "/src/assets/images/shadow_realm_ruins_1790282841812.jpg"
    },
    {
      id: "sub-3",
      title: "The Silent Library",
      type: "Movies",
      submittedBy: "CineLover88",
      date: "May 25, 2025",
      image: "/src/assets/images/anime_desk_study_1790284532931.jpg"
    },
    {
      id: "sub-4",
      title: "Neon Hearts",
      type: "K-Pop",
      submittedBy: "StarDust99",
      date: "May 24, 2025",
      image: "/src/assets/images/neon_beat_festival_1790282824470.jpg"
    },
    {
      id: "sub-5",
      title: "Dragon's Code",
      type: "Manga",
      submittedBy: "InkScribe",
      date: "May 23, 2025",
      image: "/src/assets/images/emberfall_dragon_sky_1790284017457.jpg"
    }
  ];

  // Data for Feedback Items
  const feedbackItems = [
    {
      id: "fb-1",
      title: "Navigation menu feedback",
      type: "FEEDBACK",
      submittedBy: "dusk_lover",
      date: "May 27, 2025",
      image: "/src/assets/images/sora_hayashi_1790281509190.jpg"
    },
    {
      id: "fb-2",
      title: "Mobile layout optimization",
      type: "UI/UX",
      submittedBy: "alex_design",
      date: "May 26, 2025",
      image: "/src/assets/images/cyberpunk_2077_art_1790255907017.jpg"
    },
    {
      id: "fb-3",
      title: "Video player buffering bug report",
      type: "BUG",
      submittedBy: "tech_guru",
      date: "May 25, 2025",
      image: "/src/assets/images/one_piece_climax_1790270185803.jpg"
    }
  ];

  // Data for Recent Activity List
  const recentActivities = [
    {
      id: 1,
      icon: <Users size={16} />,
      iconBg: "bg-[#F59E0B]/15 text-[#F59E0B]",
      title: "New user registered",
      subtitle: "user_4587 joined the platform",
      time: "2 hours ago"
    },
    {
      id: 2,
      icon: <FileText size={16} />,
      iconBg: "bg-[#60A5FA]/15 text-[#60A5FA]",
      title: "Content published",
      subtitle: '"The Silent Library" was published',
      time: "4 hours ago"
    },
    {
      id: 3,
      icon: <Star size={16} />,
      iconBg: "bg-[#C084FC]/15 text-[#C084FC]",
      title: "Category updated",
      subtitle: "K-Pop category settings were updated",
      time: "6 hours ago"
    },
    {
      id: 4,
      icon: <MessageSquare size={16} />,
      iconBg: "bg-[#4ADE80]/15 text-[#4ADE80]",
      title: "New feedback received",
      subtitle: "Feedback from dusk_lover",
      time: "8 hours ago"
    },
    {
      id: 5,
      icon: <ImageIcon size={16} />,
      iconBg: "bg-[#FF6B9D]/15 text-[#FF6B9D]",
      title: "Media uploaded",
      subtitle: "12 new images were added",
      time: "10 hours ago"
    },
    {
      id: 6,
      icon: <Settings size={16} />,
      iconBg: "bg-gray-100 text-gray-500",
      title: "Settings updated",
      subtitle: "Site configuration was updated",
      time: "12 hours ago"
    }
  ];

  // Data for Content by Category Bar Chart
  const categoryStats = [
    { label: "Anime", count: 248, percentage: 82, color: "#FF6B9D" },
    { label: "Gaming", count: 192, percentage: 64, color: "#4ADE80" },
    { label: "Movies", count: 158, percentage: 52, color: "#FBBF24" },
    { label: "TV Shows", count: 134, percentage: 44, color: "#60A5FA" },
    { label: "K-Pop", count: 118, percentage: 39, color: "#C084FC" },
    { label: "Comics", count: 96, percentage: 32, color: "#F87171" },
    { label: "Manga", count: 82, percentage: 27, color: "#FB923C" },
    { label: "Cosplay", count: 56, percentage: 18, color: "#2DD4BF" }
  ];

  return (
    <div className="w-full bg-[#F8F9FA] min-h-full font-sans select-none pb-16 text-gray-900">
      {/* 2. PAGE HEADER TITLE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-2">
        <h1 className="text-2xl sm:text-3.5xl font-black tracking-tight uppercase font-titan text-gray-900">
          ADMIN DASHBOARD
        </h1>
        <p className="text-xs sm:text-sm font-semibold text-gray-500 mt-0.5">
          Overview of your platform's activity and performance.
        </p>
      </div>

      {/* 3. MAIN DASHBOARD CONTENT GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 space-y-6">

        {/* 3A. TOP METRICS ROW (4 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          
          {/* Metric 1: ACTIVE USERS */}
          <div
            onClick={() => onNavigateTab && onNavigateTab("users")}
            className="bg-white border border-gray-200 hover:border-[#F59E0B]/50 rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-200 flex items-center justify-between gap-3 cursor-pointer transition-colors group"
            title="Manage Users"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#F59E0B]/15 text-[#F59E0B] flex items-center justify-center shrink-0">
                  <Users size={16} />
                </div>
                <span className="text-[10px] font-black tracking-wider text-gray-500 uppercase">
                  ACTIVE USERS
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 font-titan tracking-tight pt-1">
                48,732
              </h2>

              <p className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                <span>▲ +12.5%</span>
                <span className="text-gray-500 font-semibold">vs. last 30 days</span>
              </p>
            </div>

            {renderSparkline()}
          </div>

          {/* Metric 2: TOTAL CONTENT ITEMS */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-200 flex items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#60A5FA]/15 text-[#60A5FA] flex items-center justify-center shrink-0">
                  <FileText size={16} />
                </div>
                <span className="text-[10px] font-black tracking-wider text-gray-500 uppercase">
                  TOTAL CONTENT ITEMS
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 font-titan tracking-tight pt-1">
                1,284
              </h2>

              <p className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                <span>▲ +8.3%</span>
                <span className="text-gray-500 font-semibold">vs. last 30 days</span>
              </p>
            </div>

            {renderSparkline()}
          </div>

          {/* Metric 3: POPULAR CATEGORY */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-200 flex items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#FF6B9D]/15 text-[#FF6B9D] flex items-center justify-center shrink-0">
                  <Star size={16} />
                </div>
                <span className="text-[10px] font-black tracking-wider text-gray-500 uppercase">
                  POPULAR CATEGORY
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-[#FF6B9D] font-titan tracking-tight pt-1">
                ANIME
              </h2>

              <p className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                <span>▲ +18.7%</span>
                <span className="text-gray-500 font-semibold">vs. last 30 days</span>
              </p>
            </div>

            {renderSparkline()}
          </div>

          {/* Metric 4: CHATBOT INTERACTIONS */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-200 flex items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#C084FC]/15 text-[#C084FC] flex items-center justify-center shrink-0">
                  <MessageSquare size={16} />
                </div>
                <span className="text-[9.5px] font-black tracking-wider text-gray-500 uppercase">
                  CHATBOT INTERACTIONS (THIS MONTH)
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 font-titan tracking-tight pt-1">
                24,891
              </h2>

              <p className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                <span>▲ +21.4%</span>
                <span className="text-gray-500 font-semibold">vs. last month</span>
              </p>
            </div>

            {renderSparkline()}
          </div>

        </div>

        {/* 3B. CHARTS SECTION (2 Large Side-by-Side Panels) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          
          {/* USER ACTIVITY LINE GRAPH PANEL */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm border border-gray-200 space-y-4 flex flex-col justify-between">
            <h3 className="text-sm sm:text-base font-black text-gray-900 uppercase tracking-wider font-titan">
              USER ACTIVITY (LAST 30 DAYS)
            </h3>

            {/* Line Chart Container */}
            <div className="relative w-full h-[220px] pt-2 pb-6 px-2 flex flex-col justify-between">
              {/* Dashed Grid Lines */}
              <div className="absolute inset-x-8 top-3 bottom-8 flex flex-col justify-between pointer-events-none opacity-30">
                <div className="border-b border-dashed border-gray-200 w-full" />
                <div className="border-b border-dashed border-gray-200 w-full" />
                <div className="border-b border-dashed border-gray-200 w-full" />
                <div className="border-b border-dashed border-gray-200 w-full" />
                <div className="border-b border-dashed border-gray-200 w-full" />
              </div>

              {/* Y-Axis Labels & SVG Vector Line */}
              <div className="relative z-10 w-full h-full flex items-stretch">
                {/* Y-Axis Labels */}
                <div className="flex flex-col justify-between text-[10px] font-bold text-gray-500 pr-3 shrink-0">
                  <span>10K</span>
                  <span>8K</span>
                  <span>6K</span>
                  <span>4K</span>
                  <span>2K</span>
                  <span>0</span>
                </div>

                {/* SVG Line Graph */}
                <div className="flex-1 relative h-full">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 500 160" preserveAspectRatio="none">
                    <path
                      d="M 10 130 L 50 110 L 90 128 L 130 95 L 170 70 L 210 85 L 250 100 L 290 70 L 330 65 L 370 82 L 410 90 L 450 72 L 490 35"
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Interactive Data Points */}
                    {[
                      { x: 10, y: 130 },
                      { x: 50, y: 110 },
                      { x: 90, y: 128 },
                      { x: 130, y: 95 },
                      { x: 170, y: 70 },
                      { x: 210, y: 85 },
                      { x: 250, y: 100 },
                      { x: 290, y: 70 },
                      { x: 330, y: 65 },
                      { x: 370, y: 82 },
                      { x: 410, y: 90 },
                      { x: 450, y: 72 },
                      { x: 490, y: 35 }
                    ].map((pt, idx) => (
                      <circle
                        key={idx}
                        cx={pt.x}
                        cy={pt.y}
                        r="4.5"
                        className="fill-[#F59E0B] stroke-white stroke-[2] hover:r-6 transition-all cursor-pointer"
                      />
                    ))}
                  </svg>
                </div>
              </div>

              {/* X-Axis Dates Row */}
              <div className="flex items-center justify-between text-[10px] font-bold text-gray-500 pl-8 pt-2 border-t border-gray-200">
                <span>Apr 27</span>
                <span>May 3</span>
                <span>May 9</span>
                <span>May 15</span>
                <span>May 21</span>
                <span>May 27</span>
              </div>
            </div>
          </div>

          {/* CONTENT BY CATEGORY BAR GRAPH PANEL */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm border border-gray-200 space-y-4 flex flex-col justify-between">
            <h3 className="text-sm sm:text-base font-black text-gray-900 uppercase tracking-wider font-titan">
              CONTENT BY CATEGORY
            </h3>

            {/* Bar Chart Container */}
            <div className="relative w-full h-[220px] pt-2 pb-2 flex flex-col justify-between">
              <div className="flex items-stretch w-full h-full">
                {/* Y-Axis Labels */}
                <div className="flex flex-col justify-between text-[10px] font-bold text-gray-500 pr-3 shrink-0">
                  <span>300</span>
                  <span>250</span>
                  <span>200</span>
                  <span>150</span>
                  <span>100</span>
                  <span>50</span>
                  <span>0</span>
                </div>

                {/* Bars Area */}
                <div className="flex-1 flex items-end justify-between gap-1.5 sm:gap-3 pl-2 border-b border-gray-200">
                  {categoryStats.map((cat, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer">
                      {/* Count value label on top of bar */}
                      <span className="text-[10px] font-black text-gray-900 mb-1 group-hover:text-[#F59E0B] transition-colors">
                        {cat.count}
                      </span>

                      {/* Bar Fill */}
                      <div
                        className="w-full rounded-t-md transition-all duration-300 opacity-85 group-hover:opacity-100"
                        style={{ height: `${cat.percentage}%`, backgroundColor: cat.color }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* X-Axis Category Labels */}
              <div className="flex items-center justify-between text-[10px] font-bold text-gray-500 pl-8 pt-2">
                {categoryStats.map((cat, idx) => (
                  <span key={idx} className="flex-1 text-center truncate">
                    {cat.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* 3C. BOTTOM PANELS (PENDING ACTIONS & RECENT ACTIVITY) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          
          {/* LEFT PANEL: PENDING ACTIONS (lg:col-span-7) */}
          <div className="lg:col-span-7 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm border border-gray-200 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-black text-gray-900 uppercase tracking-wider font-titan">
                PENDING ACTIONS
              </h3>
              <button
                type="button"
                className="text-xs font-black tracking-widest text-[#F59E0B] hover:underline uppercase cursor-pointer"
              >
                SEE ALL
              </button>
            </div>

            {/* Tab Switcher Pills */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("submissions")}
                className={`text-xs font-extrabold px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeTab === "submissions"
                    ? "bg-[#F59E0B] text-black shadow-xs font-black"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                Content Submissions (5)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("feedback")}
                className={`text-xs font-extrabold px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeTab === "feedback"
                    ? "bg-[#F59E0B] text-black shadow-xs font-black"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                Feedback (3)
              </button>
            </div>

            {/* Submissions Data Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-[10px] font-black text-gray-500 uppercase tracking-wider py-2 pr-3">TITLE</th>
                    <th className="text-[10px] font-black text-gray-500 uppercase tracking-wider py-2 px-3">TYPE</th>
                    <th className="text-[10px] font-black text-gray-500 uppercase tracking-wider py-2 px-3">SUBMITTED BY</th>
                    <th className="text-[10px] font-black text-gray-500 uppercase tracking-wider py-2 px-3">DATE</th>
                    <th className="text-[10px] font-black text-gray-500 uppercase tracking-wider py-2 pl-3 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {(activeTab === "submissions" ? submissions : feedbackItems).map((row) => (
                    <tr key={row.id} className="hover:bg-gray-100 transition-colors group">
                      {/* Title + Thumbnail */}
                      <td className="py-3 pr-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0 border border-gray-200 bg-[#F8F9FA]">
                            <img src={row.image} alt={row.title} className="w-full h-full object-cover" />
                          </div>
                          <span className="font-extrabold text-xs text-gray-900 group-hover:text-[#F59E0B] transition-colors line-clamp-1">
                            {row.title}
                          </span>
                        </div>
                      </td>

                      {/* Type Badge */}
                      <td className="py-3 px-3">
                        <span className={`text-[9.5px] font-black px-2.5 py-0.5 rounded-sm uppercase tracking-wider inline-block ${getCategoryBadgeClass(row.type)}`}>
                          {row.type}
                        </span>
                      </td>

                      {/* Submitted By */}
                      <td className="py-3 px-3 text-xs font-semibold text-gray-500">
                        {row.submittedBy}
                      </td>

                      {/* Date */}
                      <td className="py-3 px-3 text-xs font-semibold text-gray-500">
                        {row.date}
                      </td>

                      {/* Review Action Button */}
                      <td className="py-3 pl-3 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            if (onOpenArticle) onOpenArticle(row);
                            else setSelectedSubmission(row);
                          }}
                          className="bg-[#EF4444] hover:bg-[#DC2626] text-white text-[10px] font-black uppercase px-3.5 py-1.5 rounded-md transition-all active:scale-95 cursor-pointer shadow-2xs"
                        >
                          REVIEW
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* RIGHT PANEL: RECENT ACTIVITY (lg:col-span-5) */}
          <div className="lg:col-span-5 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm border border-gray-200 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-black text-gray-900 uppercase tracking-wider font-titan">
                RECENT ACTIVITY
              </h3>
              <button
                type="button"
                className="text-xs font-black tracking-widest text-[#F59E0B] hover:underline uppercase cursor-pointer"
              >
                SEE ALL
              </button>
            </div>

            {/* Recent Activity List Items */}
            <div className="space-y-3.5 pt-1">
              {recentActivities.map((act) => (
                <div key={act.id} className="flex items-center justify-between gap-3 p-1.5 hover:bg-gray-100 rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${act.iconBg}`}>
                      {act.icon}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs text-gray-900">
                        {act.title}
                      </h4>
                      <p className="text-[11px] font-semibold text-gray-500">
                        {act.subtitle}
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold text-gray-500 shrink-0">
                    {act.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* REVIEW ACTION POPUP MODAL */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 max-w-md w-full shadow-xl border border-gray-200 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <h3 className="text-lg font-black tracking-tight text-gray-900 font-titan uppercase">
                Review Submission
              </h3>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="text-gray-500 hover:text-gray-900 text-xs font-bold px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-xl border border-gray-200">
              <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-gray-200">
                <img src={selectedSubmission.image} alt={selectedSubmission.title} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-gray-900">{selectedSubmission.title}</h4>
                <p className="text-xs text-gray-500 font-medium">Submitted by {selectedSubmission.submittedBy}</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                onClick={() => setSelectedSubmission(null)}
                className="px-4 py-2 border border-gray-200 text-xs font-bold text-gray-500 hover:bg-gray-100 hover:text-gray-900 uppercase rounded-lg cursor-pointer"
              >
                Reject
              </button>
              <button
                onClick={() => {
                  alert("Submission successfully approved and published!");
                  setSelectedSubmission(null);
                }}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs tracking-wider uppercase rounded-lg cursor-pointer flex items-center gap-1.5"
              >
                <Check size={14} className="stroke-[3]" />
                <span>Approve & Publish</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export { DashboardPage };
