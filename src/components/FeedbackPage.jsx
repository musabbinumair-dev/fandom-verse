import { useState } from "react";
import {
  ChevronRight,
  Bug,
  Lightbulb,
  HelpCircle,
  Check,
  Send,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
const FeedbackPage = ({ onNavigateHome }) => {
  const [feedbackType, setFeedbackType] = useState("Suggestion");
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [toastMessage, setToastMessage] = useState(null);
  const feedbackConfig = {
    Suggestion: {
      subjectPlaceholder: "e.g. Add more anime categories",
      categoryQuestion: "Which category does your suggestion relate to?",
      ideaLabel: "Your Idea",
      ideaSubtitle: "Tell us your idea in detail. What would you like to see, and why?",
      ideaPlaceholder: "Share your idea here...",
      tipTitle: "Suggestion Tip",
      tipDescription: "Your ideas help us improve the platform, add new features, and make Fandomverse even more enjoyable for everyone.",
      tipBg: "bg-[#F3E8FF] text-[#7E22CE]",
      iconColor: "text-[#0284C7]"
    },
    Bug: {
      subjectPlaceholder: "e.g. Video player freezes on chapter 3",
      categoryQuestion: "Which category does this issue relate to?",
      ideaLabel: "Problem Description",
      ideaSubtitle: "Please describe the unexpected behavior, steps to reproduce, and what happened.",
      ideaPlaceholder: "Describe the bug here...",
      tipTitle: "Bug Report Tip",
      tipDescription: "Including clear reproduction steps and your browser or device details helps our engineers resolve issues much faster.",
      tipBg: "bg-[#FEE2E2] text-[#DC2626]",
      iconColor: "text-[#DC2626]"
    },
    Query: {
      subjectPlaceholder: "e.g. How do I apply for community verified creator?",
      categoryQuestion: "Which category does your question relate to?",
      ideaLabel: "Your Question",
      ideaSubtitle: "Please provide as much context as possible so our support team can answer accurately.",
      ideaPlaceholder: "Ask your question here...",
      tipTitle: "Query Tip",
      tipDescription: "Our community support team typically reviews and replies to general queries within 24 to 48 hours.",
      tipBg: "bg-[#DCFCE7] text-[#15803D]",
      iconColor: "text-[#16A34A]"
    }
  };
  const currentConfig = feedbackConfig[feedbackType];
  const validateForm = () => {
    const newErrors = {};
    if (!subject.trim()) {
      newErrors.subject = "Please provide a subject.";
    }
    if (!category) {
      newErrors.category = "Please select a related category.";
    }
    if (!description.trim()) {
      newErrors.description = "Please enter your feedback details.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setToastMessage("Feedback received! Thank you for helping us improve.");
      setTimeout(() => setToastMessage(null), 3500);
    }, 500);
  };
  const handleReset = () => {
    setSubject("");
    setCategory("");
    setDescription("");
    setErrors({});
    setIsSubmitted(false);
  };
  return <div className="w-full bg-[#FAF8F5] min-h-full py-6 px-4 sm:px-6 font-sans select-none text-[#171717]">
      <div className="max-w-7xl mx-auto space-y-6">
        {
    /* 1. BREADCRUMBS: Home > Feedback */
  }
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#737373] font-medium">
          <button
    type="button"
    onClick={onNavigateHome}
    className="hover:text-black transition-colors cursor-pointer"
  >
            Home
          </button>
          <ChevronRight size={13} className="text-[#A3A3A3] shrink-0" />
          <span className="text-[#171717] font-semibold">Feedback</span>
        </nav>

        {
    /* 2. TITLE SECTION (Speech Bubble with pulse waveform + Heading + Subtitle) */
  }
        <div className="pt-0.5">
          <div className="flex items-center gap-2.5">
            {
    /* Speech bubble with waveform icon matching screenshot */
  }
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-[#1C1917]">
              <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <path d="M8 10l2 2 2-3 2 2" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-[30px] font-black text-[#1C1917] tracking-tight uppercase font-titan leading-none">
              FEEDBACK
            </h1>
          </div>
          <p className="text-xs sm:text-[13px] text-[#737373] font-medium mt-1">
            Have something to share? Send us your feedback and help us make Fandomverse even better.
          </p>
        </div>

        {
    /* 3. MAIN TWO-COLUMN GRID */
  }
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch pt-1">
          {
    /* LEFT 7 COLUMNS: THE FORM CARD */
  }
          <div className="lg:col-span-7 bg-white rounded-[16px] border border-[#E5E7EB] p-5 sm:p-6 shadow-2xs flex flex-col justify-between">
            {isSubmitted ? (
    /* SUCCESS STATE */
    <div className="py-12 px-4 text-center space-y-4 my-auto animate-in fade-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 size={36} className="stroke-[2.5]" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-[#171717] font-titan uppercase tracking-tight">
                    Thank You For Your Feedback!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#737373] max-w-sm mx-auto">
                    Your {feedbackType.toLowerCase()} regarding "<strong>{subject}</strong>" has been submitted to the Fandomverse team (Ticket #{Math.floor(1e5 + Math.random() * 9e5)}).
                  </p>
                </div>
                <div className="pt-3 flex justify-center gap-3">
                  <button
      type="button"
      onClick={handleReset}
      className="px-5 py-2.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold text-xs rounded-[8px] transition-all cursor-pointer shadow-xs"
    >
                    Submit another response
                  </button>
                  <button
      type="button"
      onClick={onNavigateHome}
      className="px-5 py-2.5 bg-white border border-[#E5E7EB] hover:bg-stone-50 text-[#525252] font-semibold text-xs rounded-[8px] transition-colors cursor-pointer"
    >
                    Back to Home
                  </button>
                </div>
              </div>
  ) : (
    /* ACTIVE FORM STATE */
    <form onSubmit={handleSubmit} className="space-y-4">
                {
      /* Field 1: Feedback Type Cards */
    }
                <div className="space-y-2">
                  <div>
                    <h3 className="text-xs sm:text-[13px] font-bold text-[#171717]">
                      Feedback Type
                    </h3>
                    <p className="text-[11px] text-[#737373]">
                      Select the type of feedback you want to share.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                    {
      /* Option 1: Bug */
    }
                    <div
      onClick={() => setFeedbackType("Bug")}
      className={`relative rounded-[12px] p-3 sm:p-3.5 border transition-all cursor-pointer select-none ${feedbackType === "Bug" ? "border-[#2563EB] bg-blue-50/20 ring-1 ring-[#2563EB]/40 shadow-xs" : "border-[#E5E7EB] bg-white hover:border-stone-300"}`}
    >
                      {feedbackType === "Bug" && <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-[#2563EB] text-white flex items-center justify-center">
                          <Check size={10} className="stroke-[3]" />
                        </div>}
                      {
      /* Bug Icon (Purple/Violet) */
    }
                      <div className="text-[#6366F1] mb-2">
                        <Bug size={20} className="stroke-[2.2]" />
                      </div>
                      <h4 className="text-xs sm:text-[13px] font-bold text-[#171717] leading-tight">
                        Bug
                      </h4>
                      <p className="text-[10px] sm:text-[10.5px] text-[#737373] mt-0.5 leading-snug">
                        Report a problem or unexpected issue.
                      </p>
                    </div>

                    {
      /* Option 2: Suggestion */
    }
                    <div
      onClick={() => setFeedbackType("Suggestion")}
      className={`relative rounded-[12px] p-3 sm:p-3.5 border transition-all cursor-pointer select-none ${feedbackType === "Suggestion" ? "border-[#2563EB] bg-blue-50/20 ring-1 ring-[#2563EB]/40 shadow-xs" : "border-[#E5E7EB] bg-white hover:border-stone-300"}`}
    >
                      {feedbackType === "Suggestion" && <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-[#2563EB] text-white flex items-center justify-center">
                          <Check size={10} className="stroke-[3]" />
                        </div>}
                      {
      /* Lightbulb Icon (Sky Blue) */
    }
                      <div className="text-[#0284C7] mb-2">
                        <Lightbulb size={20} className="stroke-[2.2]" />
                      </div>
                      <h4 className="text-xs sm:text-[13px] font-bold text-[#171717] leading-tight">
                        Suggestion
                      </h4>
                      <p className="text-[10px] sm:text-[10.5px] text-[#737373] mt-0.5 leading-snug">
                        Share an idea to improve Fandomverse.
                      </p>
                    </div>

                    {
      /* Option 3: Query */
    }
                    <div
      onClick={() => setFeedbackType("Query")}
      className={`relative rounded-[12px] p-3 sm:p-3.5 border transition-all cursor-pointer select-none ${feedbackType === "Query" ? "border-[#2563EB] bg-blue-50/20 ring-1 ring-[#2563EB]/40 shadow-xs" : "border-[#E5E7EB] bg-white hover:border-stone-300"}`}
    >
                      {feedbackType === "Query" && <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-[#2563EB] text-white flex items-center justify-center">
                          <Check size={10} className="stroke-[3]" />
                        </div>}
                      {
      /* Question Icon (Green) */
    }
                      <div className="text-[#10B981] mb-2">
                        <HelpCircle size={20} className="stroke-[2.2]" />
                      </div>
                      <h4 className="text-xs sm:text-[13px] font-bold text-[#171717] leading-tight">
                        Query
                      </h4>
                      <p className="text-[10px] sm:text-[10.5px] text-[#737373] mt-0.5 leading-snug">
                        Ask a question about anything.
                      </p>
                    </div>
                  </div>
                </div>

                {
      /* Field 2: Subject * */
    }
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#171717]">
                    Subject <span className="text-[#EF4444]">*</span>
                  </label>
                  <p className="text-[11px] text-[#737373]">
                    Give your feedback a short, clear subject.
                  </p>
                  <input
      type="text"
      value={subject}
      onChange={(e) => {
        setSubject(e.target.value);
        if (errors.subject) setErrors({ ...errors, subject: "" });
      }}
      placeholder={currentConfig.subjectPlaceholder}
      className={`w-full text-xs sm:text-[13px] px-3 py-2 rounded-[8px] border bg-white text-[#171717] placeholder:text-[#9CA3AF] outline-hidden transition-all shadow-2xs ${errors.subject ? "border-[#EF4444] focus:ring-1 focus:ring-[#EF4444]" : "border-[#E5E7EB] focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/20"}`}
    />
                  {errors.subject && <p className="text-[10.5px] text-[#EF4444] flex items-center gap-1 font-medium pt-0.5">
                      <AlertCircle size={11} />
                      {errors.subject}
                    </p>}
                </div>

                {
      /* Field 3: Related Category * */
    }
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#171717]">
                    Related Category <span className="text-[#EF4444]">*</span>
                  </label>
                  <p className="text-[11px] text-[#737373]">
                    {currentConfig.categoryQuestion}
                  </p>
                  <div className="relative">
                    <select
      value={category}
      onChange={(e) => {
        setCategory(e.target.value);
        if (errors.category) setErrors({ ...errors, category: "" });
      }}
      className={`w-full appearance-none text-xs sm:text-[13px] px-3 py-2 rounded-[8px] border bg-white text-[#171717] outline-hidden transition-all shadow-2xs cursor-pointer ${errors.category ? "border-[#EF4444] focus:ring-1 focus:ring-[#EF4444]" : "border-[#E5E7EB] focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/20"}`}
    >
                      <option value="" disabled>Select a category</option>
                      <option value="Anime">Anime</option>
                      <option value="Gaming">Gaming</option>
                      <option value="Movies">Movies</option>
                      <option value="TV Shows">TV Shows</option>
                      <option value="K-Pop">K-Pop</option>
                      <option value="Comics">Comics</option>
                      <option value="Manga">Manga</option>
                      <option value="Cosplay">Cosplay</option>
                      <option value="General">General / Platform</option>
                      <option value="Account">Account & Security</option>
                    </select>
                    <ChevronRight size={14} className="rotate-90 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#737373]" />
                  </div>
                  {errors.category && <p className="text-[10.5px] text-[#EF4444] flex items-center gap-1 font-medium pt-0.5">
                      <AlertCircle size={11} />
                      {errors.category}
                    </p>}
                </div>

                {
      /* Field 4: Your Idea / Description * */
    }
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#171717]">
                    {currentConfig.ideaLabel} <span className="text-[#EF4444]">*</span>
                  </label>
                  <p className="text-[11px] text-[#737373]">
                    {currentConfig.ideaSubtitle}
                  </p>
                  <div className={`rounded-[8px] border bg-white transition-all shadow-2xs overflow-hidden ${errors.description ? "border-[#EF4444] focus-within:ring-1 focus-within:ring-[#EF4444]" : "border-[#E5E7EB] focus-within:border-[#4F46E5] focus-within:ring-1 focus-within:ring-[#4F46E5]/20"}`}>
                    <textarea
      rows={5}
      maxLength={1e3}
      value={description}
      onChange={(e) => {
        setDescription(e.target.value);
        if (errors.description) setErrors({ ...errors, description: "" });
      }}
      placeholder={currentConfig.ideaPlaceholder}
      className="w-full text-xs sm:text-[13px] p-3 text-[#171717] placeholder:text-[#9CA3AF] bg-transparent outline-hidden resize-none min-h-[110px]"
    />
                    <div className="px-3 py-1.5 text-right bg-stone-50/50 border-t border-stone-100">
                      <span className="text-[10.5px] text-[#9CA3AF] font-medium">
                        {description.length}/1000
                      </span>
                    </div>
                  </div>
                  {errors.description && <p className="text-[10.5px] text-[#EF4444] flex items-center gap-1 font-medium pt-0.5">
                      <AlertCircle size={11} />
                      {errors.description}
                    </p>}
                </div>

                {
      /* Action Buttons Row */
    }
                <div className="flex items-center gap-3 pt-2">
                  <button
      type="submit"
      disabled={isSubmitting}
      className="inline-flex items-center justify-center gap-2 bg-[#4F46E5] hover:bg-[#4338CA] disabled:opacity-50 text-white font-bold text-xs sm:text-[13px] py-2.5 px-5 rounded-[8px] shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
    >
                    <Send size={13} className="stroke-[2.5]" />
                    <span>{isSubmitting ? "Submitting..." : "Submit feedback"}</span>
                  </button>

                  <button
      type="button"
      onClick={handleReset}
      className="py-2.5 px-6 rounded-[8px] text-xs sm:text-[13px] font-semibold text-[#525252] hover:text-black border border-[#E5E7EB] bg-white hover:bg-stone-50 transition-colors cursor-pointer shadow-2xs"
    >
                    Cancel
                  </button>
                </div>
              </form>
  )}
          </div>

          {
    /* RIGHT 5 COLUMNS: STUNNING VISUAL CARD & DYNAMIC TIP */
  }
          <div className="lg:col-span-5 rounded-[20px] overflow-hidden border border-[#CBD5E1]/60 shadow-xs bg-[#1E293B] relative flex flex-col justify-between min-h-[440px]">
            {
    /* Background Anime Illustration */
  }
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <img
    src="/src/assets/images/feedback_cliff_sky_1790286020079.jpg"
    alt="Anime traveler on cliff"
    className="w-full h-full object-cover"
  />
              {
    /* Subtle top gradient for high contrast on the stylized text */
  }
              <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/40" />
            </div>

            {
    /* Stylized Handwritten Text at Top-Left */
  }
            <div className="relative z-10 p-6 pt-7 pointer-events-none">
              <div className="transform -rotate-2 select-none">
                <h3 className="text-white text-2xl sm:text-[27px] font-black italic tracking-wide leading-tight drop-shadow-md">
                  Great ideas<br />
                  build better<br />
                  <span className="relative inline-block">
                    communities
                    {
    /* Hand-drawn underline SVG */
  }
                    <svg
    className="absolute -bottom-1 left-0 w-full text-white/90 drop-shadow"
    height="6"
    viewBox="0 0 100 6"
    fill="none"
    preserveAspectRatio="none"
  >
                      <path
    d="M0 3 Q 50 6 100 2"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  />
                    </svg>
                  </span>
                </h3>
              </div>
            </div>

            {
    /* Floating Dynamic Tip Card at Bottom */
  }
            <div className="relative z-10 m-3.5 sm:m-4">
              <div className="bg-white rounded-[16px] p-4 border border-stone-200 shadow-xl flex items-start gap-3">
                {
    /* Round Purple Icon */
  }
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-2xs ${currentConfig.tipBg}`}>
                  {feedbackType === "Bug" ? <Bug size={18} className="stroke-[2.4]" /> : feedbackType === "Query" ? <HelpCircle size={18} className="stroke-[2.4]" /> : <Lightbulb size={18} className="stroke-[2.4]" />}
                </div>

                <div className="space-y-0.5">
                  <h4 className="font-bold text-xs sm:text-[13px] text-[#171717]">
                    {currentConfig.tipTitle}
                  </h4>
                  <p className="text-[11px] sm:text-[11.5px] text-[#737373] leading-relaxed">
                    {currentConfig.tipDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {
    /* TOAST NOTIFICATION */
  }
      {toastMessage && <div className="fixed bottom-6 right-6 z-50 bg-[#1A1D24] border border-[#2B2F3D] text-white text-xs px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <Sparkles size={14} className="text-[#FFA800]" />
          <span>{toastMessage}</span>
        </div>}
    </div>;
};
export {
  FeedbackPage
};
