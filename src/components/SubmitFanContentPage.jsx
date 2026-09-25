import { useState, useRef } from "react";
import {
  ChevronRight,
  Bold,
  Italic,
  Underline,
  Link as LinkIcon,
  List,
  ListOrdered,
  CloudUpload,
  Send,
  FileText,
  Image as ImageIcon,
  Lightbulb,
  ShieldCheck,
  CheckCircle2,
  Check,
  X,
  AlertCircle
} from "lucide-react";
const INITIAL_SUBMISSIONS = [
  {
    id: "sub-1",
    title: "The Lost City of Aether",
    category: "Anime",
    categoryStyle: "bg-[#FCE7F3] text-[#9D174D]",
    date: "May 15, 2025",
    status: "Pending",
    image: "/src/assets/images/aetheria_wanderer_1790282784893.jpg",
    content: "An in-depth lore investigation into the architecture of the floating spires and their mystical energy crystals.",
    adminNote: "Currently in queue for review by our Senior Anime Editor."
  },
  {
    id: "sub-2",
    title: "Echoes of the Void",
    category: "Gaming",
    categoryStyle: "bg-[#DCFCE7] text-[#15803D]",
    date: "May 10, 2025",
    status: "Approved",
    image: "/src/assets/images/orion_steel_1790281419734.jpg",
    content: "Guide to mastering class synergies in Sector 9 raids without losing speed.",
    adminNote: "Great article! Approved and published to the gaming hub."
  },
  {
    id: "sub-3",
    title: "Midnight at Coral Bay",
    category: "Movies",
    categoryStyle: "bg-[#DBEAFE] text-[#1E40AF]",
    date: "May 5, 2025",
    status: "Rejected",
    image: "/src/assets/images/kairo_hale_1790281602183.jpg",
    content: "Review of the independent sci-fi thriller screenplay.",
    adminNote: "Review did not meet our minimum word length requirement (minimum 500 words)."
  },
  {
    id: "sub-4",
    title: "Neon Hearts Festival Review",
    category: "K-Pop",
    categoryStyle: "bg-[#F3E8FF] text-[#7E22CE]",
    date: "Apr 28, 2025",
    status: "Pending",
    image: "/src/assets/images/sae_jihyun_1790281620416.jpg",
    content: "Visual diary and acoustic reflections from the main stage performances.",
    adminNote: "Under secondary review for photo copyright checks."
  }
];
const SubmitFanContentPage = ({
  onNavigateHome,
  onNavigateArticles,
  isLoggedIn = true,
  onOpenAuth
}) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [contentType, setContentType] = useState("Article");
  const [description, setDescription] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [submissions, setSubmissions] = useState(INITIAL_SUBMISSIONS);
  const [activeSubmissionModal, setActiveSubmissionModal] = useState(null);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  const handleFormatText = (tag) => {
    if (!textareaRef.current) return;
    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    const selected = description.substring(start, end);
    let replacement = "";
    if (tag === "b") replacement = `**${selected || "bold text"}**`;
    else if (tag === "i") replacement = `*${selected || "italic text"}*`;
    else if (tag === "u") replacement = `_${selected || "underlined text"}_`;
    else if (tag === "link") replacement = `[${selected || "link title"}](url)`;
    else if (tag === "ul") replacement = `
- ${selected || "list item"}`;
    else if (tag === "ol") replacement = `
1. ${selected || "list item"}`;
    const newText = description.substring(0, start) + replacement + description.substring(end);
    if (newText.length <= 5e3) {
      setDescription(newText);
    }
  };
  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setToastMessage("Image size exceeds 10MB limit.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result);
        setToastMessage("Image uploaded successfully!");
        setTimeout(() => setToastMessage(null), 2500);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      if (onOpenAuth) onOpenAuth("login");
      setToastMessage("Please sign in to submit fan content.");
      return;
    }
    if (!title.trim()) {
      setToastMessage("Please enter a title for your content.");
      return;
    }
    if (!category) {
      setToastMessage("Please select a category.");
      return;
    }
    if (!description.trim()) {
      setToastMessage("Please provide article description or text.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      let catStyle = "bg-[#FCE7F3] text-[#9D174D]";
      if (category === "Gaming") catStyle = "bg-[#DCFCE7] text-[#15803D]";
      else if (category === "Movies") catStyle = "bg-[#DBEAFE] text-[#1E40AF]";
      else if (category === "K-Pop") catStyle = "bg-[#F3E8FF] text-[#7E22CE]";
      else if (category === "TV Shows") catStyle = "bg-[#E0E7FF] text-[#3730A3]";
      const newSubmission = {
        id: `sub-${Date.now()}`,
        title: title.trim(),
        category,
        categoryStyle: catStyle,
        date: "Just now",
        status: "Pending",
        image: uploadedImage || "/src/assets/images/aetheria_wanderer_1790282784893.jpg",
        content: description,
        adminNote: "Your submission is now awaiting editorial evaluation."
      };
      setSubmissions([newSubmission, ...submissions]);
      setIsSubmitting(false);
      setTitle("");
      setCategory("");
      setDescription("");
      setUploadedImage(null);
      setToastMessage("Content submitted successfully for review!");
      setTimeout(() => setToastMessage(null), 3500);
    }, 400);
  };
  return <div className="w-full bg-[#FAF8F5] min-h-full py-6 px-4 sm:px-6 font-sans select-none text-[#171717]">
      <div className="max-w-7xl mx-auto space-y-6">
        {
    /* 1. BREADCRUMBS: Home > Submit Fan Content */
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
          <span className="text-[#171717] font-semibold">Submit Fan Content</span>
        </nav>

        {
    /* 2. TITLE SECTION (Tilted Pen Icon + Bold Uppercase Heading + Subtitle) */
  }
        <div className="pt-0.5">
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-[30px] font-black text-[#1C1917] tracking-tight uppercase font-titan leading-none">
              SUBMIT FAN CONTENT
            </h1>
          </div>
          <p className="text-xs sm:text-[13px] text-[#737373] font-medium mt-1">
            Share your creativity with the community! Submit your fan content or articles, and get it reviewed by our admin team before it goes live.
          </p>
        </div>

        {
    /* 3. MAIN TWO-COLUMN CONTENT GRID */
  }
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start pt-2">
          {
    /* LEFT 7 COLUMNS: SUBMISSION FORM */
  }
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-4">
              {
    /* Field 1: Title * */
  }
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#171717]">
                  Title <span className="text-[#EF4444]">*</span>
                </label>
                <input
    type="text"
    required
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    placeholder="Enter a title for your content"
    className="w-full text-xs sm:text-[13px] px-3 py-2.5 rounded-[8px] border border-[#E5E7EB] bg-white text-[#171717] placeholder:text-[#9CA3AF] outline-hidden focus:border-[#FFA800] focus:ring-1 focus:ring-[#FFA800]/20 transition-all shadow-2xs"
  />
              </div>

              {
    /* Field 2: Category * */
  }
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#171717]">
                  Category <span className="text-[#EF4444]">*</span>
                </label>
                <div className="relative">
                  <select
    required
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className="w-full appearance-none text-xs sm:text-[13px] px-3 py-2.5 rounded-[8px] border border-[#E5E7EB] bg-white text-[#171717] outline-hidden focus:border-[#FFA800] focus:ring-1 focus:ring-[#FFA800]/20 transition-all shadow-2xs cursor-pointer"
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
                  </select>
                  <ChevronRight size={14} className="rotate-90 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#737373]" />
                </div>
              </div>

              {
    /* Field 3: Content Type * */
  }
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#171717]">
                  Content Type <span className="text-[#EF4444]">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {
    /* Option 1: Article */
  }
                  <button
    type="button"
    onClick={() => setContentType("Article")}
    className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-[8px] text-xs font-bold transition-all cursor-pointer ${contentType === "Article" ? "bg-[#FEF3C7] border border-[#F59E0B] text-[#171717] shadow-2xs" : "bg-white border border-[#E5E7EB] text-[#525252] hover:bg-stone-50"}`}
  >
                    <FileText size={15} className={contentType === "Article" ? "text-[#D97706]" : "text-[#737373]"} />
                    <span>Article</span>
                  </button>

                  {
    /* Option 2: Image */
  }
                  <button
    type="button"
    onClick={() => setContentType("Image")}
    className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-[8px] text-xs font-bold transition-all cursor-pointer ${contentType === "Image" ? "bg-[#FEF3C7] border border-[#F59E0B] text-[#171717] shadow-2xs" : "bg-white border border-[#E5E7EB] text-[#525252] hover:bg-stone-50"}`}
  >
                    <ImageIcon size={15} className={contentType === "Image" ? "text-[#D97706]" : "text-[#737373]"} />
                    <span>Image</span>
                  </button>
                </div>
              </div>

              {
    /* Field 4: Description / Article Text * */
  }
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#171717]">
                  Description / Article Text <span className="text-[#EF4444]">*</span>
                </label>
                <div className="bg-white rounded-[8px] border border-[#E5E7EB] overflow-hidden shadow-2xs focus-within:border-[#FFA800] focus-within:ring-1 focus-within:ring-[#FFA800]/20 transition-all">
                  {
    /* Rich Text Toolbar */
  }
                  <div className="flex items-center gap-1 px-2.5 py-1.5 border-b border-[#F3F4F6] bg-white">
                    <button
    type="button"
    onClick={() => handleFormatText("b")}
    className="p-1.5 rounded hover:bg-stone-100 text-[#404040] hover:text-black cursor-pointer font-bold text-xs"
    title="Bold"
  >
                      <Bold size={13} className="stroke-[2.5]" />
                    </button>
                    <button
    type="button"
    onClick={() => handleFormatText("i")}
    className="p-1.5 rounded hover:bg-stone-100 text-[#404040] hover:text-black cursor-pointer"
    title="Italic"
  >
                      <Italic size={13} className="stroke-[2.5]" />
                    </button>
                    <button
    type="button"
    onClick={() => handleFormatText("u")}
    className="p-1.5 rounded hover:bg-stone-100 text-[#404040] hover:text-black cursor-pointer"
    title="Underline"
  >
                      <Underline size={13} className="stroke-[2.5]" />
                    </button>
                    <button
    type="button"
    onClick={() => handleFormatText("link")}
    className="p-1.5 rounded hover:bg-stone-100 text-[#404040] hover:text-black cursor-pointer"
    title="Insert Link"
  >
                      <LinkIcon size={13} className="stroke-[2.5]" />
                    </button>
                    <div className="w-[1px] h-4 bg-stone-200 mx-1" />
                    <button
    type="button"
    onClick={() => handleFormatText("ul")}
    className="p-1.5 rounded hover:bg-stone-100 text-[#404040] hover:text-black cursor-pointer"
    title="Bullet list"
  >
                      <List size={13} className="stroke-[2.5]" />
                    </button>
                    <button
    type="button"
    onClick={() => handleFormatText("ol")}
    className="p-1.5 rounded hover:bg-stone-100 text-[#404040] hover:text-black cursor-pointer"
    title="Numbered list"
  >
                      <ListOrdered size={13} className="stroke-[2.5]" />
                    </button>
                  </div>

                  {
    /* Textarea */
  }
                  <textarea
    ref={textareaRef}
    required
    rows={7}
    maxLength={5e3}
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    placeholder="Write your content here..."
    className="w-full text-xs sm:text-[13px] p-3 text-[#171717] placeholder:text-[#9CA3AF] bg-transparent outline-hidden resize-y min-h-[140px]"
  />

                  {
    /* Character Counter */
  }
                  <div className="px-3 py-1.5 text-right bg-stone-50/60 border-t border-stone-100">
                    <span className="text-[11px] text-[#9CA3AF] font-medium">
                      {description.length}/5000
                    </span>
                  </div>
                </div>
              </div>

              {
    /* Field 5: Image Upload (optional) */
  }
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#171717]">
                  <ImageIcon size={14} className="text-[#525252]" />
                  <span>Image Upload <span className="font-normal text-[#737373]">(optional)</span></span>
                </div>

                <div
    onClick={() => fileInputRef.current?.click()}
    className="border-2 border-dashed border-[#D1D5DB] rounded-[10px] bg-white/60 p-6 text-center hover:bg-white hover:border-[#FFA800] transition-all cursor-pointer relative group"
  >
                  <input
    ref={fileInputRef}
    type="file"
    accept="image/*"
    onChange={handleImageFileChange}
    className="hidden"
  />

                  {uploadedImage ? <div className="relative inline-block">
                      <img
    src={uploadedImage}
    alt="Upload preview"
    className="max-h-40 rounded-[8px] object-cover mx-auto shadow-xs border border-stone-200"
  />
                      <button
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      setUploadedImage(null);
    }}
    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow transition-colors cursor-pointer"
    title="Remove image"
  >
                        <X size={12} className="stroke-[3]" />
                      </button>
                    </div> : <div className="space-y-2">
                      <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-[#525252] group-hover:text-black group-hover:bg-[#FEF3C7] transition-colors">
                        <CloudUpload size={20} className="stroke-[2]" />
                      </div>
                      <p className="text-xs font-semibold text-[#171717]">
                        Drag and drop your image here
                      </p>
                      <span className="text-[11px] text-[#9CA3AF] block font-medium">or</span>
                      <div className="pt-0.5">
                        <span className="inline-block bg-[#FFA800] hover:bg-[#FFB51A] text-black font-extrabold text-xs py-1.5 px-4 rounded-[6px] shadow-2xs transition-all">
                          Browse files
                        </span>
                      </div>
                      <p className="text-[10.5px] text-[#9CA3AF] pt-1">
                        Supported formats: JPG, PNG, GIF &nbsp;|&nbsp; Max size: 10MB
                      </p>
                    </div>}
                </div>
              </div>

              {
    /* Action Buttons Row */
  }
              <div className="flex items-center gap-3 pt-2">
                <button
    type="submit"
    disabled={isSubmitting}
    className="inline-flex items-center justify-center gap-2 bg-[#FFA800] hover:bg-[#FFB51A] disabled:opacity-50 text-black font-extrabold text-xs sm:text-[13px] py-2.5 px-6 rounded-[8px] shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
  >
                  <Send size={14} className="stroke-[2.5]" />
                  <span>{isSubmitting ? "Submitting..." : "Submit for review"}</span>
                </button>

                <button
    type="button"
    onClick={() => {
      setTitle("");
      setCategory("");
      setDescription("");
      setUploadedImage(null);
      onNavigateArticles?.();
    }}
    className="py-2.5 px-6 rounded-[8px] text-xs sm:text-[13px] font-semibold text-[#525252] hover:text-black border border-[#E5E7EB] bg-white hover:bg-stone-50 transition-colors cursor-pointer shadow-2xs"
  >
                  Cancel
                </button>
              </div>
            </form>
          </div>

          {
    /* RIGHT 5 COLUMNS: TWO STACKED CARDS */
  }
          <div className="lg:col-span-5 space-y-5">
            {
    /* CARD 1: HOW IT WORKS (WITH ANIME ARTWORK ON THE RIGHT) */
  }
            <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-5 shadow-xs relative overflow-hidden">
              {
    /* Anime Character Working at Desk Illustration on Right Edge */
  }
              <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none overflow-hidden opacity-90 sm:opacity-95">
                <img
    src="/src/assets/images/anime_desk_study_1790284532931.jpg"
    alt="Anime creator at desk"
    className="w-full h-full object-cover object-left"
  />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent" />
              </div>

              {
    /* Card Content on Left Side */
  }
              <div className="relative z-10 max-w-[270px] space-y-4">
                {
    /* Header */
  }
                <div className="flex items-start gap-2">
                  <Lightbulb size={20} className="text-[#171717] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm sm:text-[15px] font-black uppercase tracking-tight font-titan text-[#171717]">
                      How it works
                    </h3>
                    <p className="text-[10.5px] text-[#737373] font-medium leading-tight">
                      Share your content with the community in 3 simple steps.
                    </p>
                  </div>
                </div>

                {
    /* 3 Steps */
  }
                <div className="relative pl-6 space-y-4">
                  {
    /* Vertical connecting line between step numbers */
  }
                  <div className="absolute left-[9px] top-2.5 bottom-2.5 w-[1.5px] bg-[#E5E7EB]" />

                  {
    /* Step 1: Submit */
  }
                  <div className="relative flex items-start gap-2.5">
                    <div className="absolute -left-6 top-0 w-[19px] h-[19px] rounded-full bg-[#FFA800] text-black font-extrabold text-[10px] flex items-center justify-center shadow-xs">
                      1
                    </div>
                    <div className="w-6 h-6 rounded bg-stone-100 flex items-center justify-center shrink-0 text-[#171717]">
                      <FileText size={13} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#171717] leading-tight">Submit</h4>
                      <p className="text-[10px] text-[#737373] leading-snug mt-0.5">
                        Fill out the form and upload your content. Make sure it follows our guidelines.
                      </p>
                    </div>
                  </div>

                  {
    /* Step 2: Admin review */
  }
                  <div className="relative flex items-start gap-2.5">
                    <div className="absolute -left-6 top-0 w-[19px] h-[19px] rounded-full bg-[#FFA800] text-black font-extrabold text-[10px] flex items-center justify-center shadow-xs">
                      2
                    </div>
                    <div className="w-6 h-6 rounded bg-stone-100 flex items-center justify-center shrink-0 text-[#171717]">
                      <ShieldCheck size={13} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#171717] leading-tight">Admin review</h4>
                      <p className="text-[10px] text-[#737373] leading-snug mt-0.5">
                        Our team will review your submission for quality, relevance and originality.
                      </p>
                    </div>
                  </div>

                  {
    /* Step 3: Published */
  }
                  <div className="relative flex items-start gap-2.5">
                    <div className="absolute -left-6 top-0 w-[19px] h-[19px] rounded-full bg-[#FFA800] text-black font-extrabold text-[10px] flex items-center justify-center shadow-xs">
                      3
                    </div>
                    <div className="w-6 h-6 rounded bg-stone-100 flex items-center justify-center shrink-0 text-[#171717]">
                      <CheckCircle2 size={13} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#171717] leading-tight">Published</h4>
                      <p className="text-[10px] text-[#737373] leading-snug mt-0.5">
                        Once approved, your content will be live on the platform for the community to enjoy!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {
    /* CARD 2: YOUR SUBMISSIONS */
  }
            <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-4 sm:p-5 shadow-xs space-y-3.5">
              {
    /* Header */
  }
              <div className="flex items-start gap-2">
                <div>
                  <h3 className="text-sm sm:text-[15px] font-black uppercase tracking-tight font-titan text-[#171717]">
                    Your submissions
                  </h3>
                  <p className="text-[10.5px] text-[#737373] font-medium leading-tight">
                    Track the status of your recent submissions.
                  </p>
                </div>
              </div>

              {
    /* Submissions List */
  }
              <div className="divide-y divide-[#F3F4F6]">
                {submissions.map((item) => <div
    key={item.id}
    onClick={() => setActiveSubmissionModal(item)}
    className="py-3 flex items-center gap-3 hover:bg-stone-50/80 -mx-2 px-2 rounded-lg transition-colors cursor-pointer group"
  >
                    {
    /* Thumbnail */
  }
                    <div className="w-14 h-11 rounded-[6px] overflow-hidden shrink-0 bg-stone-900 shadow-2xs">
                      <img
    src={item.image}
    alt={item.title}
    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
  />
                    </div>

                    {
    /* Meta */
  }
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs text-[#171717] truncate group-hover:text-[#E05315] transition-colors">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className={`text-[8.5px] font-black px-2 py-0.2 rounded-full uppercase tracking-wider ${item.categoryStyle}`}>
                          {item.category}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#9CA3AF] block mt-0.5">
                        {item.date}
                      </span>
                    </div>

                    {
    /* Status Pill & Arrow */
  }
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span
    className={`text-[9.5px] font-bold px-2.5 py-0.5 rounded-full border shadow-2xs ${item.status === "Approved" ? "bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]" : item.status === "Rejected" ? "bg-[#FEE2E2] text-[#DC2626] border-[#FECACA]" : "bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]"}`}
  >
                        {item.status}
                      </span>
                      <ChevronRight size={14} className="text-[#A3A3A3] group-hover:text-black transition-colors" />
                    </div>
                  </div>)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {
    /* TOAST NOTIFICATION */
  }
      {toastMessage && <div className="fixed bottom-6 right-6 z-50 bg-[#1A1D24] border border-[#2B2F3D] text-white text-xs px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <Check size={14} className="text-[#FFA800]" />
          <span>{toastMessage}</span>
        </div>}

      {
    /* SUBMISSION STATUS DETAIL MODAL */
  }
      {activeSubmissionModal && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-[#181A20] border border-[#2B2F3D] text-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl p-5 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase ${activeSubmissionModal.categoryStyle}`}>
                {activeSubmissionModal.category}
              </span>
              <button
    type="button"
    onClick={() => setActiveSubmissionModal(null)}
    className="text-stone-400 hover:text-white cursor-pointer"
  >
                <X size={18} />
              </button>
            </div>

            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-black">
              <img
    src={activeSubmissionModal.image}
    alt={activeSubmissionModal.title}
    className="w-full h-full object-cover"
  />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">{activeSubmissionModal.title}</h3>
                <span
    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${activeSubmissionModal.status === "Approved" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : activeSubmissionModal.status === "Rejected" ? "bg-red-500/20 text-red-400 border-red-500/30" : "bg-amber-500/20 text-amber-400 border-amber-500/30"}`}
  >
                  {activeSubmissionModal.status}
                </span>
              </div>
              <p className="text-[11px] text-stone-400">{activeSubmissionModal.date}</p>
            </div>

            {activeSubmissionModal.content && <div className="bg-[#121418] p-3 rounded-lg border border-[#262A36]">
                <h5 className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Your Submission Text</h5>
                <p className="text-xs text-stone-200">{activeSubmissionModal.content}</p>
              </div>}

            {activeSubmissionModal.adminNote && <div className="bg-stone-900/80 p-3 rounded-lg border border-stone-800 flex items-start gap-2">
                <AlertCircle size={15} className="text-[#FFA800] shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-[10px] font-bold text-stone-300 uppercase tracking-wider">Editorial Feedback</h5>
                  <p className="text-xs text-stone-300 mt-0.5">{activeSubmissionModal.adminNote}</p>
                </div>
              </div>}

            <div className="pt-1 flex justify-end">
              <button
    type="button"
    onClick={() => setActiveSubmissionModal(null)}
    className="px-4 py-1.5 bg-[#FFA800] text-black font-extrabold text-xs rounded-lg cursor-pointer"
  >
                Close
              </button>
            </div>
          </div>
        </div>}
    </div>;
};
export {
  SubmitFanContentPage
};
