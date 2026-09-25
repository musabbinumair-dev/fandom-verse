import { useState } from "react";
import { X, Star, BookmarkPlus, Check } from "lucide-react";
const WikiModal = ({
  wiki,
  onClose,
  onPinToRecent,
  isPinned
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  if (!wiki) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 my-auto animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        {
    /* Header Cover Banner with Real Picture */
  }
        <div className="relative h-44 sm:h-52 w-full bg-slate-900 overflow-hidden shrink-0">
          <img
    src={wiki.image || wiki.avatar || "/src/assets/images/pokeball_real_render_1790180829855.jpg"}
    alt={wiki.name}
    referrerPolicy="no-referrer"
    className="w-full h-full object-cover"
  />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

          {
    /* Close button */
  }
          <button
    onClick={onClose}
    className="absolute top-3 right-3 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
  >
            <X size={20} />
          </button>

          {
    /* Banner bottom details */
  }
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div>
              <span className="inline-block bg-[#fa005a] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-1">
                {wiki.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white drop-shadow-md">
                {wiki.name}
              </h2>
              <p className="text-white/80 text-xs">{wiki.articlesCount}</p>
            </div>

            <button
    onClick={() => onPinToRecent(wiki.id)}
    className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm transition-all ${isPinned ? "bg-emerald-600 text-white" : "bg-white text-slate-900 hover:bg-slate-100"}`}
  >
              {isPinned ? <>
                  <Check size={14} />
                  <span>Pinned</span>
                </> : <>
                  <BookmarkPlus size={14} />
                  <span>Pin to Recent</span>
                </>}
            </button>
          </div>
        </div>

        {
    /* Tab selection */
  }
        <div className="flex border-b border-slate-100 px-6 bg-slate-50/70 text-xs font-semibold">
          <button
    onClick={() => setActiveTab("overview")}
    className={`py-3 px-3 border-b-2 transition-colors ${activeTab === "overview" ? "border-[#fa005a] text-[#fa005a]" : "border-transparent text-slate-500 hover:text-slate-900"}`}
  >
            Overview & Lore
          </button>
          <button
    onClick={() => setActiveTab("popular")}
    className={`py-3 px-3 border-b-2 transition-colors ${activeTab === "popular" ? "border-[#fa005a] text-[#fa005a]" : "border-transparent text-slate-500 hover:text-slate-900"}`}
  >
            Essential Articles
          </button>
          <button
    onClick={() => setActiveTab("guidelines")}
    className={`py-3 px-3 border-b-2 transition-colors ${activeTab === "guidelines" ? "border-[#fa005a] text-[#fa005a]" : "border-transparent text-slate-500 hover:text-slate-900"}`}
  >
            Community Bureaucrats
          </button>
        </div>

        {
    /* Modal content body */
  }
        <div className="p-6 overflow-y-auto flex-1 text-sm text-slate-700">
          {activeTab === "overview" && <div>
              <p className="leading-relaxed mb-4">{wiki.description}</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4">
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                  <span className="text-[11px] text-slate-400 uppercase font-semibold">Total Articles</span>
                  <div className="text-base font-bold text-slate-900">{wiki.articlesCount}</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                  <span className="text-[11px] text-slate-400 uppercase font-semibold">Active Editors</span>
                  <div className="text-base font-bold text-slate-900">1,420+</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 col-span-2 sm:col-span-1">
                  <span className="text-[11px] text-slate-400 uppercase font-semibold">Quality Tier</span>
                  <div className="text-base font-bold text-amber-500 flex items-center gap-1">
                    <Star size={15} fill="currentColor" />
                    <span>Gold Standard</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 rounded-xl bg-purple-50/50 border border-purple-100 text-xs text-purple-950">
                <span className="font-bold">Contribute to this Wiki: </span>
                Anyone can edit and propose revisions. Adhere to community manual of style and maintain citations.
              </div>
            </div>}

          {activeTab === "popular" && <div className="space-y-2">
              {[
    { title: "Protagonists & Factions Breakdown", views: "1.2M views", status: "Featured" },
    { title: "Timeline of Major Canon Events", views: "840K views", status: "Comprehensive" },
    { title: "Artifacts, Powers, and Mechanics Guide", views: "610K views", status: "Guide" },
    { title: "Infobox Templates & Formatting Standard", views: "320K views", status: "Meta" }
  ].map((item, idx) => <div
    key={idx}
    className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer"
  >
                  <div>
                    <h4 className="font-semibold text-slate-900 text-xs sm:text-sm">{item.title}</h4>
                    <span className="text-[11px] text-slate-400">{item.views}</span>
                  </div>
                  <span className="text-[10px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded">
                    {item.status}
                  </span>
                </div>)}
            </div>}

          {activeTab === "guidelines" && <div>
              <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">Wiki Bureaucracy</h4>
              <p className="text-xs text-slate-600 mb-4">
                Maintained by dedicated volunteer sysops, admins, and content moderators.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded">
                  <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-[10px]">A</div>
                  <div>
                    <div className="font-bold text-slate-800">Archmage_Editor (Admin)</div>
                    <div className="text-[10px] text-slate-400">14,291 edits • Active today</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded">
                  <div className="w-6 h-6 rounded-full bg-pink-600 text-white flex items-center justify-center font-bold text-[10px]">L</div>
                  <div>
                    <div className="font-bold text-slate-800">Lorekeeper_Prime (Bureaucrat)</div>
                    <div className="text-[10px] text-slate-400">9,810 edits • Active 2h ago</div>
                  </div>
                </div>
              </div>
            </div>}
        </div>
      </div>
    </div>;
};
export {
  WikiModal
};
