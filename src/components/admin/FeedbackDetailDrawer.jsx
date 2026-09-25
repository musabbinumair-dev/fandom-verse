import { useState, useEffect } from "react";
import {
  X,
  FileText,
  Calendar,
  Bug,
  Lightbulb,
  HelpCircle,
  Sparkle
} from "lucide-react";

const FeedbackDetailDrawer = ({
  feedback,
  isOpen,
  onClose,
  onSaveStatus
}) => {
  const [status, setStatus] = useState("NEW");

  useEffect(() => {
    if (feedback) {
      setStatus(feedback.status || "NEW");
    }
  }, [feedback, isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !feedback) return null;

  // Mark as Resolved handler
  const handleMarkAsResolved = () => {
    onSaveStatus(feedback.id, "RESOLVED");
    onClose();
  };

  // Toggle status
  const handleToggleStatus = (newStatus) => {
    setStatus(newStatus);
    onSaveStatus(feedback.id, newStatus);
  };

  // Render Type Badge
  const renderTypeBadge = () => {
    switch (feedback.type) {
      case "BUG":
        return (
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#FEE2E2] text-[#EF4444] shadow-2xs">
            <Bug size={16} />
            <span>BUG</span>
          </span>
        );
      case "SUGGESTION":
        return (
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#E0F2FE] text-[#0284C7] shadow-2xs">
            <Lightbulb size={16} />
            <span>SUGGESTION</span>
          </span>
        );
      case "QUERY":
        return (
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#F3E8FF] text-[#9333EA] shadow-2xs">
            <HelpCircle size={16} />
            <span>QUERY</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-stone-100 text-stone-700">
            <span>{feedback.type}</span>
          </span>
        );
    }
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
                FEEDBACK DETAIL
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
            
            {/* SUBJECT & SUBMITTER SUMMARY ROW */}
            <div className="px-6 py-5 bg-white flex items-start gap-4">
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden border border-[#E5E7EB] bg-stone-100 shrink-0 shadow-2xs">
                <img
                  src={feedback.submittedBy?.avatar}
                  alt={feedback.submittedBy?.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "/src/assets/images/luffy_avatar_1790269807034.jpg";
                  }}
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base sm:text-lg font-bold text-[#111827] leading-snug">
                  {feedback.subject}
                </h3>
                <p className="text-xs text-[#4B5563] mt-1">
                  Submitted by: {feedback.submittedBy?.name}
                </p>
                <p className="text-xs text-[#6B7280]">
                  {feedback.submittedBy?.username}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-[#6B7280] font-medium mt-1.5">
                  <Calendar size={13} className="text-[#6B7280] shrink-0" />
                  <span>Date: {feedback.date}</span>
                </div>
              </div>
            </div>

            {/* FORM BODY SECTIONS */}
            <div className="px-6 py-5 space-y-6 bg-white">
              
              {/* SECTION 1: TYPE */}
              <div>
                <label className="text-sm font-bold text-[#111827] flex items-center gap-1 mb-2.5">
                  <span>Type</span>
                  <span className="text-red-500 font-bold">*</span>
                </label>
                <div>{renderTypeBadge()}</div>
              </div>

              {/* SECTION 2: MESSAGE */}
              <div>
                <label className="text-sm font-bold text-[#111827] flex items-center gap-1 mb-2.5">
                  <span>Message</span>
                  <span className="text-red-500 font-bold">*</span>
                </label>
                <div className="p-4 border border-[#E5E7EB] rounded-2xl bg-white text-sm text-[#4B5563] leading-relaxed shadow-2xs">
                  {feedback.message}
                </div>
              </div>

              {/* SECTION 3: STATUS */}
              <div>
                <label className="text-sm font-bold text-[#111827] flex items-center gap-1 mb-2.5">
                  <span>Status</span>
                  <span className="text-red-500 font-bold">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {/* NEW OPTION */}
                  <button
                    type="button"
                    onClick={() => handleToggleStatus("NEW")}
                    className={`py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-all cursor-pointer ${
                      status === "NEW"
                        ? "bg-[#FEE2E2] text-[#E11D48] shadow-2xs"
                        : "bg-[#F3F4F6] text-[#4B5563] hover:bg-[#E5E7EB]"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Sparkle size={14} className={status === "NEW" ? "text-[#E11D48]" : "text-[#6B7280]"} />
                      <span>NEW</span>
                    </span>
                    {status === "NEW" ? (
                      <span className="w-5 h-5 rounded-full border-2 border-[#E11D48] flex items-center justify-center shrink-0">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#E11D48]" />
                      </span>
                    ) : (
                      <span className="w-4.5 h-4.5 rounded-full border-2 border-[#9CA3AF] shrink-0" />
                    )}
                  </button>

                  {/* RESOLVED OPTION */}
                  <button
                    type="button"
                    onClick={() => handleToggleStatus("RESOLVED")}
                    className={`py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-all cursor-pointer ${
                      status === "RESOLVED"
                        ? "bg-[#DCFCE7] text-[#15803D] shadow-2xs"
                        : "bg-[#F3F4F6] text-[#4B5563] hover:bg-[#E5E7EB]"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {status !== "RESOLVED" && (
                        <span className="w-4 h-4 rounded-full border-2 border-[#9CA3AF] shrink-0" />
                      )}
                      <span>RESOLVED</span>
                    </span>
                    {status === "RESOLVED" && (
                      <span className="w-5 h-5 rounded-full border-2 border-[#15803D] flex items-center justify-center shrink-0">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#15803D]" />
                      </span>
                    )}
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* FOOTER ACTION BUTTONS */}
          <div className="border-t border-[#E5E7EB] bg-white px-6 py-4 flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-3 px-4 border border-[#D1D5DB] rounded-lg text-xs font-bold text-[#374151] hover:bg-stone-50 uppercase tracking-wider transition-colors cursor-pointer text-center"
            >
              CLOSE
            </button>
            <button
              type="button"
              onClick={handleMarkAsResolved}
              className="w-1/2 py-3 px-4 bg-[#F59E0B] hover:bg-[#D97706] text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow-xs transition-colors cursor-pointer text-center"
            >
              MARK AS RESOLVED
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export { FeedbackDetailDrawer };
