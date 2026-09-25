import { useEffect } from "react";
import {
  X,
  FileText,
  Calendar,
  Check,
  Image as ImageIcon,
  Bug,
  Lightbulb,
  HelpCircle,
  Sparkles
} from "lucide-react";

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

const ReviewDetailDrawer = ({
  item,
  isOpen,
  onClose,
  onApprove,
  onReject,
  onResolve
}) => {
  // ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  const isSubmission = item.type === "submission";

  const getCategoryColor = (cat) => {
    return CATEGORY_COLORS[cat] || "bg-stone-100 text-stone-700";
  };

  const renderFeedbackTypeBadge = (fbType) => {
    const typeUpper = (fbType || "QUERY").toUpperCase();
    if (typeUpper === "BUG") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-[#FEE2E2] text-[#EF4444]">
          <Bug size={14} />
          <span>BUG</span>
        </span>
      );
    }
    if (typeUpper === "SUGGESTION") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-[#E0F2FE] text-[#0284C7]">
          <Lightbulb size={14} />
          <span>SUGGESTION</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-[#F3E8FF] text-[#9333EA]">
        <HelpCircle size={14} />
        <span>QUERY</span>
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-baloo select-none">
      {/* 1. DIMMED BACKDROP */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-[1px] transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 2. SLIDE-IN SIDE PANEL */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md sm:max-w-lg md:max-w-[490px] bg-white shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-in-out">
          
          {/* HEADER BAR */}
          <div className="border-b border-[#E5E7EB] px-6 py-4 flex items-center justify-between shrink-0 bg-white">
            <div className="flex items-center gap-2.5">
              <FileText size={22} className="text-[#1F2937]" strokeWidth={2} />
              <h2 className="text-xl font-black uppercase tracking-tight text-[#111827] font-titan">
                REVIEW
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-[#6B7280] hover:text-[#111827] p-1.5 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
              title="Close panel"
            >
              <X size={20} strokeWidth={2} />
            </button>
          </div>

          {/* MAIN SCROLLABLE CONTENT */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#E5E7EB]">
            
            {/* ITEM TYPE TAG & SUBMITTER SUMMARY */}
            <div className="px-6 py-5 bg-white space-y-3.5">
              {/* Type pill */}
              <div>
                {isSubmission ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E0F2FE] text-[#0284C7]">
                    <Sparkles size={12} />
                    <span>Submission</span>
                  </span>
                ) : (
                  renderFeedbackTypeBadge(item.feedbackType)
                )}
              </div>

              {/* Submitter & Date Card */}
              <div className="flex items-start justify-between gap-4 pt-1">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden border border-[#E5E7EB] bg-stone-100 shrink-0 shadow-2xs">
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
                    <p className="text-xs text-[#6B7280]">Submitted by:</p>
                    <p className="text-base font-bold text-[#111827] leading-tight">
                      {item.submittedBy?.name}
                    </p>
                    <p className="text-xs text-[#6B7280] leading-tight mt-0.5">
                      {item.submittedBy?.username}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center justify-end gap-1.5 text-xs text-[#6B7280]">
                    <Calendar size={13} className="text-[#9CA3AF]" />
                    <span>Date:</span>
                  </div>
                  <p className="text-xs font-mono font-semibold text-[#111827] mt-0.5">
                    {item.date}
                  </p>
                </div>
              </div>
            </div>

            {/* BODY: CONDITIONAL CONTENT FOR SUBMISSION VS FEEDBACK */}
            {isSubmission ? (
              /* SUBMISSION FIELDS */
              <div className="px-6 py-5 space-y-5 bg-white">
                {/* Category */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#6B7280] block mb-1.5">
                    Category
                  </label>
                  <span
                    className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold ${getCategoryColor(
                      item.category
                    )}`}
                  >
                    {item.category}
                  </span>
                </div>

                {/* Content Type */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#6B7280] block mb-1.5">
                    Content Type
                  </label>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-[#F3E8FF] text-[#9333EA]">
                    {item.contentType === "Image" ? (
                      <ImageIcon size={13} />
                    ) : (
                      <FileText size={13} />
                    )}
                    <span>{item.contentType || "Article"}</span>
                  </span>
                </div>

                {/* Content Preview */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#6B7280] block mb-1.5">
                    Content Preview
                  </label>
                  <div className="border border-[#E5E7EB] rounded-2xl p-4 bg-white space-y-3 shadow-2xs">
                    <h4 className="text-base font-bold text-[#111827]">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                      {item.content}
                    </p>
                    {item.image && (
                      <div className="rounded-xl overflow-hidden border border-[#E5E7EB] max-h-56 bg-stone-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* FEEDBACK FIELDS */
              <div className="px-6 py-5 space-y-5 bg-white">
                {/* Feedback Type */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#6B7280] block mb-1.5">
                    Feedback Type
                  </label>
                  <div>{renderFeedbackTypeBadge(item.feedbackType)}</div>
                </div>

                {/* Message */}
                <div>
                  <label className="text-sm font-bold text-[#111827] flex items-center gap-1 mb-2">
                    <span>Message</span>
                    <span className="text-red-500 font-bold">*</span>
                  </label>
                  <div className="border border-[#E5E7EB] rounded-2xl p-4 bg-white text-xs sm:text-sm text-[#4B5563] leading-relaxed shadow-2xs whitespace-pre-line">
                    {item.message}
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* FOOTER ACTION BUTTONS */}
          <div className="border-t border-[#E5E7EB] bg-white px-6 py-4 shrink-0">
            {isSubmission ? (
              /* TWO BUTTONS: REJECT & APPROVE */
              <div className="flex items-center gap-3 w-full">
                <button
                  type="button"
                  onClick={() => onReject(item.id)}
                  className="w-1/2 py-3 px-4 border border-[#EF4444] text-[#EF4444] hover:bg-red-50 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <X size={15} strokeWidth={2.5} />
                  <span>REJECT</span>
                </button>
                <button
                  type="button"
                  onClick={() => onApprove(item.id)}
                  className="w-1/2 py-3 px-4 bg-[#F59E0B] hover:bg-[#D97706] text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Check size={15} strokeWidth={2.5} />
                  <span>APPROVE</span>
                </button>
              </div>
            ) : (
              /* SINGLE FULL-WIDTH BUTTON: MARK AS RESOLVED */
              <button
                type="button"
                onClick={() => onResolve(item.id)}
                className="w-full py-3.5 px-6 bg-[#F59E0B] hover:bg-[#D97706] text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Check size={15} strokeWidth={2.5} />
                <span>MARK AS RESOLVED</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export { ReviewDetailDrawer };
