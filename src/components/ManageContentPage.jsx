import { useState, useRef } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  FileText,
  User,
  ShoppingBag,
  Upload,
  Folder,
  X,
  ChevronsUpDown
} from "lucide-react";

/* ========================================================================= */
/*   MOCK DATA FOR ALL 4 TABS: CONTENT, CHARACTERS, MERCHANDISE, CATEGORY   */
/* ========================================================================= */

const INITIAL_CONTENT_DATA = [
  {
    id: "cnt-1",
    title: "The Floating Realms",
    subtitle: "A breathtaking journey through sky islands.",
    contentType: "Article",
    type: "Article",
    category: "ANIME",
    categoryBadge: "bg-[#F5EADF] text-[#B87033]",
    date: "May 28, 2025",
    status: "PUBLISHED",
    statusBadge: "bg-[#DCFCE7] text-[#16A34A]",
    image: "/src/assets/images/aetheria_wanderer_1790282784893.jpg"
  },
  {
    id: "cnt-2",
    title: "Neon Drift Racing Trailer",
    subtitle: "High-speed racing in a futuristic city.",
    contentType: "Trailer",
    type: "Trailer",
    category: "GAMING",
    categoryBadge: "bg-[#E2E8F0] text-[#475569]",
    date: "May 27, 2025",
    status: "PUBLISHED",
    statusBadge: "bg-[#DCFCE7] text-[#16A34A]",
    image: "/src/assets/images/cyberpunk_2077_art_1790255907017.jpg"
  },
  {
    id: "cnt-3",
    title: "Interstellar Space Theme",
    subtitle: "Space exploration orchestral theme.",
    contentType: "Audio",
    type: "Audio",
    category: "MOVIES",
    categoryBadge: "bg-[#DCEEFE] text-[#0284C7]",
    date: "May 26, 2025",
    status: "DRAFT",
    statusBadge: "bg-[#F5EADF] text-[#B87033]",
    image: "/src/assets/images/interstellar_space_1790270312783.jpg"
  },
  {
    id: "cnt-4",
    title: "Aetheria Sky Islands Breakdown",
    subtitle: "Breathtaking world exploration video.",
    contentType: "Video",
    type: "Video",
    category: "ANIME",
    categoryBadge: "bg-[#F5EADF] text-[#B87033]",
    date: "May 25, 2025",
    status: "PUBLISHED",
    statusBadge: "bg-[#DCFCE7] text-[#16A34A]",
    image: "/src/assets/images/aetheria_wanderer_1790282784893.jpg"
  },
  {
    id: "cnt-5",
    title: "Voices from the Beyond",
    subtitle: "An in-depth look at the science of space exploration.",
    contentType: "Article",
    type: "Article",
    category: "MOVIES",
    categoryBadge: "bg-[#DCEEFE] text-[#0284C7]",
    date: "May 24, 2025",
    status: "DRAFT",
    statusBadge: "bg-[#F5EADF] text-[#B87033]",
    image: "/src/assets/images/interstellar_space_1790270312783.jpg"
  },
  {
    id: "cnt-6",
    title: "The Hidden City Lore Wiki",
    subtitle: "Secrets, legends and the people who keep it alive.",
    contentType: "Media",
    type: "Media",
    category: "TV SHOWS",
    categoryBadge: "bg-[#F3E8FF] text-[#9333EA]",
    date: "May 21, 2025",
    status: "PUBLISHED",
    statusBadge: "bg-[#DCFCE7] text-[#16A34A]",
    image: "/src/assets/images/midnight_signal_rain_1790283977485.jpg"
  },
  {
    id: "cnt-7",
    title: "Starlight Live Concert Highlight",
    subtitle: "K-Pop concert highlight performance.",
    contentType: "Video",
    type: "Video",
    category: "K-POP",
    categoryBadge: "bg-[#FCE7F3] text-[#C026D3]",
    date: "May 18, 2025",
    status: "PUBLISHED",
    statusBadge: "bg-[#DCFCE7] text-[#16A34A]",
    image: "/src/assets/images/neon_beat_festival_1790282824470.jpg"
  },
  {
    id: "cnt-8",
    title: "The Art of Heroism Artwork",
    subtitle: "High resolution digital art gallery showcase.",
    contentType: "Image",
    type: "Image",
    category: "COMICS",
    categoryBadge: "bg-[#CCFBF1] text-[#0F766E]",
    date: "May 15, 2025",
    status: "DRAFT",
    statusBadge: "bg-[#F5EADF] text-[#B87033]",
    image: "/src/assets/images/spiderman_comic_1790270342039.jpg"
  }
];

const CHARACTERS_DATA = [
  {
    id: "char-1",
    title: "Sora Hayashi",
    subtitle: "Master sky pilot and adventurer.",
    fandom: "Skybound Aetheria",
    bio: "Chief aviator of the cloud fleet.",
    category: "ANIME",
    categoryBadge: "bg-[#F5EADF] text-[#B87033]",
    status: "PUBLISHED",
    statusBadge: "bg-[#DCFCE7] text-[#16A34A]",
    image: "/src/assets/images/sora_hayashi_1790281509190.jpg"
  },
  {
    id: "char-2",
    title: "Vex Cyber-Rider",
    subtitle: "Legendary street racer in Neon City.",
    fandom: "Neon Drift 2077",
    bio: "Champion of the midnight circuit.",
    category: "GAMING",
    categoryBadge: "bg-[#E2E8F0] text-[#475569]",
    status: "PUBLISHED",
    statusBadge: "bg-[#DCFCE7] text-[#16A34A]",
    image: "/src/assets/images/cyberpunk_2077_art_1790255907017.jpg"
  },
  {
    id: "char-3",
    title: "Commander Vance",
    subtitle: "Deep space expedition leader.",
    fandom: "Horizon Protocol",
    bio: "Veteran pilot of outer galactic trips.",
    category: "MOVIES",
    categoryBadge: "bg-[#DCEEFE] text-[#0284C7]",
    status: "DRAFT",
    statusBadge: "bg-[#F5EADF] text-[#B87033]",
    image: "/src/assets/images/interstellar_space_1790270312783.jpg"
  },
  {
    id: "char-4",
    title: "Inspector Rain",
    subtitle: "Veteran noir detective.",
    fandom: "Midnight City",
    bio: "Uncovers secrets in urban shadows.",
    category: "TV SHOWS",
    categoryBadge: "bg-[#F3E8FF] text-[#9333EA]",
    status: "PUBLISHED",
    statusBadge: "bg-[#DCFCE7] text-[#16A34A]",
    image: "/src/assets/images/midnight_signal_rain_1790283977485.jpg"
  }
];

const MERCHANDISE_DATA = [
  {
    id: "merch-1",
    title: "Aetheria Sky Compass",
    subtitle: "Authentic metallic collector prop with LED lights.",
    tag: "Prop Replica",
    releaseStatus: "In Stock",
    category: "ANIME",
    categoryBadge: "bg-[#F5EADF] text-[#B87033]",
    status: "PUBLISHED",
    statusBadge: "bg-[#DCFCE7] text-[#16A34A]",
    image: "/src/assets/images/cloud_drake_plush_1790285563088.jpg"
  },
  {
    id: "merch-2",
    title: "Neon Drift Bomber Jacket",
    subtitle: "Waterproof cyberpunk jacket with embroidered crest.",
    tag: "Apparel",
    releaseStatus: "Pre-order",
    category: "GAMING",
    categoryBadge: "bg-[#E2E8F0] text-[#475569]",
    status: "PUBLISHED",
    statusBadge: "bg-[#DCFCE7] text-[#16A34A]",
    image: "/src/assets/images/emberwing_hoodie_1790285536763.jpg"
  },
  {
    id: "merch-3",
    title: "Commander Vance Diecast Model",
    subtitle: "1:18 scale metallic spaceship model with stand.",
    tag: "Collectible",
    releaseStatus: "In Stock",
    category: "MOVIES",
    categoryBadge: "bg-[#DCEEFE] text-[#0284C7]",
    status: "DRAFT",
    statusBadge: "bg-[#F5EADF] text-[#B87033]",
    image: "/src/assets/images/celestial_archer_fig_1790285506979.jpg"
  }
];

const CATEGORIES_DATA = [
  {
    id: "cat-1",
    title: "Anime",
    subtitle: "Japanese animated series, movies & OVA lore.",
    itemCount: "142 items",
    description: "Japanese animated series, films, and OVA lore.",
    category: "ANIME",
    categoryBadge: "bg-[#F5EADF] text-[#B87033]",
    status: "PUBLISHED",
    statusBadge: "bg-[#DCFCE7] text-[#16A34A]",
    image: "/src/assets/images/category_anime_1790259342339.jpg"
  },
  {
    id: "cat-2",
    title: "Gaming",
    subtitle: "Video games, mechanics & esports.",
    itemCount: "289 items",
    description: "Video games, speedruns, esports, and mechanics.",
    category: "GAMING",
    categoryBadge: "bg-[#E2E8F0] text-[#475569]",
    status: "PUBLISHED",
    statusBadge: "bg-[#DCFCE7] text-[#16A34A]",
    image: "/src/assets/images/category_gaming_1790259361539.jpg"
  },
  {
    id: "cat-3",
    title: "Movies",
    subtitle: "Cinematic universes & feature films.",
    itemCount: "95 items",
    description: "Feature films, cinematic universes, and directors.",
    category: "MOVIES",
    categoryBadge: "bg-[#DCEEFE] text-[#0284C7]",
    status: "PUBLISHED",
    statusBadge: "bg-[#DCFCE7] text-[#16A34A]",
    image: "/src/assets/images/category_movies_1790259375752.jpg"
  },
  {
    id: "cat-4",
    title: "TV Shows",
    subtitle: "Drama, sci-fi & streaming hits.",
    itemCount: "110 items",
    description: "Television series, drama, sci-fi, and streaming hits.",
    category: "TV SHOWS",
    categoryBadge: "bg-[#F3E8FF] text-[#9333EA]",
    status: "PUBLISHED",
    statusBadge: "bg-[#DCFCE7] text-[#16A34A]",
    image: "/src/assets/images/category_tvshows_1790259388971.jpg"
  },
  {
    id: "cat-5",
    title: "K-Pop",
    subtitle: "Korean idol groups, MVs & culture.",
    itemCount: "76 items",
    description: "Korean idol groups, music videos, and fan culture.",
    category: "K-POP",
    categoryBadge: "bg-[#FCE7F3] text-[#C026D3]",
    status: "PUBLISHED",
    statusBadge: "bg-[#DCFCE7] text-[#16A34A]",
    image: "/src/assets/images/category_kpop_1790259404900.jpg"
  },
  {
    id: "cat-6",
    title: "Comics",
    subtitle: "Graphic novels & superheroes.",
    itemCount: "124 items",
    description: "Graphic novels, Western superheroes, and indie comics.",
    category: "COMICS",
    categoryBadge: "bg-[#CCFBF1] text-[#0F766E]",
    status: "PUBLISHED",
    statusBadge: "bg-[#DCFCE7] text-[#16A34A]",
    image: "/src/assets/images/category_comics_1790259419220.jpg"
  },
  {
    id: "cat-7",
    title: "Manga",
    subtitle: "Serialized Japanese comics & manhwa.",
    itemCount: "205 items",
    description: "Serialized Japanese comics and graphic storytelling.",
    category: "MANGA",
    categoryBadge: "bg-[#FEF3C7] text-[#92400E]",
    status: "PUBLISHED",
    statusBadge: "bg-[#DCFCE7] text-[#16A34A]",
    image: "/src/assets/images/category_manga_1790259433020.jpg"
  },
  {
    id: "cat-8",
    title: "Cosplay",
    subtitle: "Costume craft & conventions.",
    itemCount: "68 items",
    description: "Costume craft, armor making, wig design, and conventions.",
    category: "COSPLAY",
    categoryBadge: "bg-[#FFE4E6] text-[#E11D48]",
    status: "PUBLISHED",
    statusBadge: "bg-[#DCFCE7] text-[#16A34A]",
    image: "/src/assets/images/category_cosplay_1790259445408.jpg"
  }
];

/* ========================================================================= */
/*   DATA-DRIVEN COLUMN CONFIGURATIONS FOR THE ONE DYNAMIC TABLE COMPONENT   */
/* ========================================================================= */

const TAB_CONFIGS = {
  content: {
    label: "CONTENT",
    searchPlaceholder: "Search content by title, type, category or keyword...",
    columns: [
      { key: "thumbnail", header: "THUMBNAIL" },
      { key: "title", header: "TITLE" },
      { key: "contentType", header: "CONTENT TYPE" },
      { key: "category", header: "CATEGORY" },
      { key: "date", header: "DATE" },
      { key: "status", header: "STATUS" },
      { key: "actions", header: "ACTIONS", align: "right" }
    ]
  },
  characters: {
    label: "CHARACTERS",
    searchPlaceholder: "Search characters by name, fandom or role...",
    columns: [
      { key: "thumbnail", header: "THUMBNAIL" },
      { key: "title", header: "CHARACTER NAME" },
      { key: "fandom", header: "FANDOM" },
      { key: "bio", header: "BIO / ROLE" },
      { key: "category", header: "CATEGORY" },
      { key: "status", header: "STATUS" },
      { key: "actions", header: "ACTIONS", align: "right" }
    ]
  },
  merchandise: {
    label: "MERCHANDISE",
    searchPlaceholder: "Search merchandise by product name or tag...",
    columns: [
      { key: "thumbnail", header: "THUMBNAIL" },
      { key: "title", header: "PRODUCT NAME" },
      { key: "tag", header: "TAG" },
      { key: "releaseStatus", header: "RELEASE STATUS" },
      { key: "category", header: "CATEGORY" },
      { key: "status", header: "STATUS" },
      { key: "actions", header: "ACTIONS", align: "right" }
    ]
  },
  category: {
    label: "CATEGORY",
    searchPlaceholder: "Search categories by title or description...",
    columns: [
      { key: "thumbnail", header: "COVER" },
      { key: "title", header: "CATEGORY NAME" },
      { key: "itemCount", header: "TOTAL ITEMS" },
      { key: "description", header: "DESCRIPTION" },
      { key: "status", header: "STATUS" },
      { key: "actions", header: "ACTIONS", align: "right" }
    ]
  }
};

const ManageContentPage = ({ onOpenArticle }) => {
  const [activeTab, setActiveTab] = useState("content");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);

  const fileInputRef = useRef(null);

  // Store data per tab
  const [allData, setAllData] = useState({
    content: INITIAL_CONTENT_DATA,
    characters: CHARACTERS_DATA,
    merchandise: MERCHANDISE_DATA,
    category: CATEGORIES_DATA
  });

  // Modal Form State
  const [modalType, setModalType] = useState("content");
  const [formData, setFormData] = useState({
    title: "The Forgotten Island",
    category: "Anime",
    contentType: "Article",
    mediaType: "Article",
    duration: "02:35",
    fandom: "Skybound Aetheria",
    roleTitle: "Master Sky Pilot",
    tag: "Collectible",
    releaseStatus: "In Stock",
    tags: ["Adventure", "Drama", "Sci-Fi"],
    tagInput: "",
    releaseDate: "2025-07-18",
    popularityScore: "8.7",
    description:
      "A young explorer sets out on a mysterious island where ancient ruins, strange creatures and forgotten secrets await.",
    status: "Published",
    image: "/src/assets/images/interstellar_space_1790270312783.jpg"
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchQuery("");
  };

  const currentTabItems = allData[activeTab] || [];
  const filteredList = currentTabItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" ||
      (item.category && item.category.toLowerCase() === selectedCategory.toLowerCase());
    const matchesStatus =
      selectedStatus === "All" ||
      (item.status && item.status.toLowerCase() === selectedStatus.toLowerCase());
    const matchesSearch =
      !searchQuery.trim() ||
      (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.contentType && item.contentType.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.type && item.type.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.fandom && item.fandom.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.tag && item.tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesStatus && matchesSearch;
  });

  const handleOpenAddModal = () => {
    setModalType(activeTab);
    setFormData({
      title: "",
      category: "Anime",
      contentType: "Article",
      mediaType: "Article",
      duration: "02:35",
      fandom: "Skybound Aetheria",
      roleTitle: "Master Sky Pilot",
      tag: "Collectible",
      releaseStatus: "In Stock",
      tags: ["Adventure", "Drama"],
      tagInput: "",
      releaseDate: "2025-07-18",
      popularityScore: "8.5",
      description: "",
      status: "Published",
      image: "/src/assets/images/interstellar_space_1790270312783.jpg"
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setEditingItem(item);
    setModalType(activeTab);
    setFormData({
      title: item.title,
      category: item.category ? item.category.charAt(0).toUpperCase() + item.category.slice(1).toLowerCase() : "Anime",
      contentType: item.contentType || item.type || "Article",
      mediaType: item.type || "Article",
      duration: item.duration || "02:35",
      fandom: item.fandom || "Skybound Aetheria",
      roleTitle: item.subtitle || "Master Sky Pilot",
      tag: item.tag || "Collectible",
      releaseStatus: item.releaseStatus || "In Stock",
      tags: ["Adventure", "Drama"],
      tagInput: "",
      releaseDate: "2025-07-18",
      popularityScore: "8.7",
      description: item.subtitle || item.description || item.bio || "",
      status: item.status === "DRAFT" || item.status === "Draft" ? "Draft" : "Published",
      image: item.image || "/src/assets/images/interstellar_space_1790270312783.jpg"
    });
  };

  const handleSaveAdd = (e) => {
    e.preventDefault();
    if (!formData.title) return;

    const newItem = {
      id: `${modalType}-${Date.now()}`,
      title: formData.title,
      subtitle: formData.description || "Fandom feature content",
      contentType: formData.contentType,
      type: formData.contentType,
      category: formData.category.toUpperCase(),
      categoryBadge: getCategoryBadgeStyle(formData.category),
      date: formData.releaseDate ? "Jul 18, 2025" : "May 28, 2025",
      status: formData.status === "Published" ? "PUBLISHED" : "DRAFT",
      statusBadge: formData.status === "Published" ? "bg-[#DCFCE7] text-[#16A34A]" : "bg-[#F5EADF] text-[#B87033]",
      image: formData.image || "/src/assets/images/interstellar_space_1790270312783.jpg",
      duration: formData.duration || "02:35",
      fandom: formData.fandom || "Skybound Aetheria",
      bio: formData.description,
      tag: formData.tag || "Collectible",
      releaseStatus: formData.releaseStatus || "In Stock",
      itemCount: "1 item",
      description: formData.description
    };

    setAllData((prev) => ({
      ...prev,
      [modalType]: [newItem, ...prev[modalType]]
    }));
    setIsAddModalOpen(false);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingItem || !formData.title) return;

    setAllData((prev) => ({
      ...prev,
      [modalType]: prev[modalType].map((item) => {
        if (item.id === editingItem.id) {
          return {
            ...item,
            title: formData.title,
            subtitle: formData.description,
            contentType: formData.contentType,
            type: formData.contentType,
            category: formData.category.toUpperCase(),
            categoryBadge: getCategoryBadgeStyle(formData.category),
            status: formData.status === "Published" ? "PUBLISHED" : "DRAFT",
            statusBadge: formData.status === "Published" ? "bg-[#DCFCE7] text-[#16A34A]" : "bg-[#F5EADF] text-[#B87033]",
            description: formData.description
          };
        }
        return item;
      })
    }));
    setEditingItem(null);
  };

  const handleDeleteConfirm = () => {
    if (!deletingItem) return;
    setAllData((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab].filter((item) => item.id !== deletingItem.id)
    }));
    setDeletingItem(null);
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" && formData.tagInput.trim()) {
      e.preventDefault();
      const newTag = formData.tagInput.trim();
      if (!formData.tags.includes(newTag)) {
        setFormData({
          ...formData,
          tags: [...formData.tags, newTag],
          tagInput: ""
        });
      } else {
        setFormData({
          ...formData,
          tagInput: ""
        });
      }
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tagToRemove)
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        image: objectUrl
      }));
    }
  };

  const getCategoryBadgeStyle = (cat) => {
    switch (cat.toUpperCase()) {
      case "ANIME":
        return "bg-[#F5EADF] text-[#B87033]";
      case "GAMING":
        return "bg-[#E2E8F0] text-[#475569]";
      case "MOVIES":
        return "bg-[#DCEEFE] text-[#0284C7]";
      case "TV SHOWS":
        return "bg-[#F3E8FF] text-[#9333EA]";
      case "K-POP":
        return "bg-[#FCE7F3] text-[#C026D3]";
      case "COMICS":
        return "bg-[#CCFBF1] text-[#0F766E]";
      case "MANGA":
        return "bg-[#FEF3C7] text-[#92400E]";
      case "COSPLAY":
        return "bg-[#FFE4E6] text-[#E11D48]";
      default:
        return "bg-[#F1F5F9] text-[#475569]";
    }
  };

  const currentConfig = TAB_CONFIGS[activeTab] || TAB_CONFIGS.content;

  // Helper to render cell content dynamically based on column key
  const renderCellContent = (item, colKey) => {
    switch (colKey) {
      case "thumbnail":
        return (
          <div
            onClick={() => onOpenArticle && onOpenArticle(item)}
            className="w-16 h-10 rounded-lg overflow-hidden border border-[#EBE6DD] bg-stone-900 cursor-pointer shrink-0"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        );

      case "title":
        return (
          <div onClick={() => onOpenArticle && onOpenArticle(item)} className="cursor-pointer">
            <h3 className="font-extrabold text-xs text-[#171717] group-hover:text-[#FF5F1F] transition-colors line-clamp-1">
              {item.title}
            </h3>
            <p className="text-[11px] font-semibold text-[#7A6F64] line-clamp-1 mt-0.5">
              {item.subtitle || item.description || item.bio}
            </p>
          </div>
        );

      case "contentType":
        return (
          <span className="text-xs font-bold text-[#171717] bg-[#EAE6DE] px-2.5 py-1 rounded-md uppercase text-[10px] tracking-wider inline-block">
            {item.contentType || item.type || "Article"}
          </span>
        );

      case "category":
        return (
          <span className={`text-[10px] font-black px-3 py-1 rounded-md uppercase tracking-wider inline-block ${item.categoryBadge}`}>
            {item.category}
          </span>
        );

      case "date":
        return <span className="text-xs font-semibold text-[#7A6F64]">{item.date || "May 28, 2025"}</span>;

      case "fandom":
        return <span className="text-xs font-bold text-[#171717]">{item.fandom}</span>;

      case "bio":
        return <span className="text-xs font-semibold text-[#7A6F64] line-clamp-1">{item.bio}</span>;

      case "tag":
        return <span className="text-xs font-bold text-[#171717]">{item.tag}</span>;

      case "releaseStatus":
        return (
          <span className="text-xs font-bold text-[#FF5F1F] bg-[#FFF2ED] px-2.5 py-1 rounded-md inline-block">
            {item.releaseStatus}
          </span>
        );

      case "itemCount":
        return <span className="text-xs font-extrabold text-[#171717]">{item.itemCount || "100+ items"}</span>;

      case "description":
        return <span className="text-xs font-semibold text-[#7A6F64] line-clamp-1">{item.description || item.subtitle}</span>;

      case "status":
        return (
          <span className={`text-[10px] font-black px-3 py-1 rounded-md uppercase tracking-wider inline-block ${item.statusBadge}`}>
            {item.status}
          </span>
        );

      case "actions":
        return (
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => handleOpenEditModal(item)}
              className="p-1.5 rounded-lg border border-[#EDE4D6] bg-white hover:bg-[#F7F2EA] text-[#171717] transition-colors cursor-pointer shadow-2xs"
              title="Edit"
            >
              <Pencil size={13} />
            </button>
            <button
              type="button"
              onClick={() => setDeletingItem(item)}
              className="p-1.5 rounded-lg border border-[#EDE4D6] bg-white hover:bg-[#FFEBEB] text-[#E11D48] transition-colors cursor-pointer shadow-2xs"
              title="Delete"
            >
              <Trash2 size={13} />
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-[#FFFDF7] min-h-screen text-[#231C14] font-baloo pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        
        {/* 1. HEADER ROW */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3.5xl font-black tracking-tight uppercase font-titan text-[#171717]">
              MANAGE CONTENT
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-[#7A6F64] mt-0.5">
              Add, edit and remove content, characters, merchandise and categories.
            </p>
          </div>

          {/* Add Content Button */}
          <button
            type="button"
            onClick={handleOpenAddModal}
            className="bg-[#FFCC00] hover:bg-[#F2C200] text-black font-black text-xs uppercase tracking-wider px-5 py-3 rounded-xl shadow-2xs transition-all active:scale-95 cursor-pointer flex items-center gap-2 shrink-0 self-start sm:self-auto"
          >
            <Plus size={16} className="stroke-[3]" />
            <span>ADD NEW</span>
          </button>
        </div>

        {/* 2. SEGMENTED TAB BAR WITH EXACT 4 REQUESTED BUTTONS */}
        <div className="space-y-2">
          <div className="bg-[#F0EBE1] border border-[#E5DFD3] rounded-2xl p-1.5 flex flex-wrap items-center gap-1.5 shadow-2xs">
            {/* 1. Content Button */}
            <button
              type="button"
              onClick={() => handleTabChange("content")}
              className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === "content"
                  ? "bg-[#FFCC00] text-black shadow-2xs font-titan"
                  : "text-[#7A6F64] hover:bg-[#E2DDD3] hover:text-[#171717]"
              }`}
            >
              <FileText size={16} className="stroke-[2.2]" />
              <span>CONTENT</span>
            </button>

            {/* 2. Characters Button */}
            <button
              type="button"
              onClick={() => handleTabChange("characters")}
              className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === "characters"
                  ? "bg-[#FFCC00] text-black shadow-2xs font-titan"
                  : "text-[#7A6F64] hover:bg-[#E2DDD3] hover:text-[#171717]"
              }`}
            >
              <User size={16} className="stroke-[2.2]" />
              <span>CHARACTERS</span>
            </button>

            {/* 3. Merchandise Button */}
            <button
              type="button"
              onClick={() => handleTabChange("merchandise")}
              className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === "merchandise"
                  ? "bg-[#FFCC00] text-black shadow-2xs font-titan"
                  : "text-[#7A6F64] hover:bg-[#E2DDD3] hover:text-[#171717]"
              }`}
            >
              <ShoppingBag size={16} className="stroke-[2.2]" />
              <span>MERCHANDISE</span>
            </button>

            {/* 4. Category Button */}
            <button
              type="button"
              onClick={() => handleTabChange("category")}
              className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === "category"
                  ? "bg-[#FFCC00] text-black shadow-2xs font-titan"
                  : "text-[#7A6F64] hover:bg-[#E2DDD3] hover:text-[#171717]"
              }`}
            >
              <Folder size={16} className="stroke-[2.2]" />
              <span>CATEGORY</span>
            </button>
          </div>

          {/* Tab Helper Description */}
          <p className="text-[11px] font-semibold text-[#9C8F82] pl-1">
            Content allows selecting Content Type (Media, Article, Audio, Video, Trailer, Image, etc.) &nbsp;·&nbsp; Manage Characters, Merchandise &amp; Categories.
          </p>
        </div>

        {/* 3. FILTER CONTROLS ROW */}
        <div className="flex flex-wrap items-end gap-3.5 pt-1">
          {/* Category Dropdown */}
          <div className="flex flex-col gap-1 w-full sm:w-[220px]">
            <label className="text-[11px] font-bold text-[#7A6F64] uppercase tracking-wider pl-0.5">
              Category
            </label>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-xs font-bold px-3.5 py-2.5 rounded-xl border border-[#EDE4D6] bg-white text-[#171717] appearance-none focus:outline-none focus:border-[#FF5F1F] cursor-pointer shadow-2xs pr-8"
              >
                <option value="All">All Categories</option>
                <option value="Anime">Anime</option>
                <option value="Gaming">Gaming</option>
                <option value="Movies">Movies</option>
                <option value="TV Shows">TV Shows</option>
                <option value="K-Pop">K-Pop</option>
                <option value="Comics">Comics</option>
                <option value="Manga">Manga</option>
                <option value="Cosplay">Cosplay</option>
              </select>
              <ChevronsUpDown size={14} className="absolute right-3 top-3 text-[#A09485] pointer-events-none" />
            </div>
          </div>

          {/* Search Input */}
          <div className="flex-1 min-w-[260px] relative">
            <Search size={14} className="absolute left-3.5 top-3.5 text-[#A09485] pointer-events-none" />
            <input
              type="text"
              placeholder={currentConfig.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs font-semibold pl-9 pr-4 py-2.5 rounded-xl border border-[#EDE4D6] bg-white text-[#171717] placeholder:text-[#A09485] focus:outline-none focus:border-[#FF5F1F] shadow-2xs"
            />
          </div>

          {/* Status Dropdown */}
          <div className="flex flex-col gap-1 w-full sm:w-[220px]">
            <label className="text-[11px] font-bold text-[#7A6F64] uppercase tracking-wider pl-0.5">
              Status
            </label>
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full text-xs font-bold px-3.5 py-2.5 rounded-xl border border-[#EDE4D6] bg-white text-[#171717] appearance-none focus:outline-none focus:border-[#FF5F1F] cursor-pointer shadow-2xs pr-8"
              >
                <option value="All">All Statuses</option>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
              <ChevronsUpDown size={14} className="absolute right-3 top-3 text-[#A09485] pointer-events-none" />
            </div>
          </div>
        </div>

        {/* 4. DATA-DRIVEN DYNAMIC CONTENT TABLE */}
        <div className="bg-white border border-[#EBE6DD] rounded-2xl overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#F0E8DD] bg-[#FAF8F5]">
                  {currentConfig.columns.map((col) => (
                    <th
                      key={col.key}
                      className={`text-[10px] font-black text-[#A09485] uppercase tracking-wider py-3.5 px-4 ${
                        col.align === "right" ? "text-right" : ""
                      }`}
                    >
                      {col.header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-[#F0E8DD]">
                {filteredList.length === 0 ? (
                  <tr>
                    <td colSpan={currentConfig.columns.length} className="py-8 text-center text-xs font-bold text-[#7A6F64]">
                      No items found matching filters.
                    </td>
                  </tr>
                ) : (
                  filteredList.map((item) => (
                    <tr key={item.id} className="hover:bg-[#FAF8F5] transition-colors group">
                      {currentConfig.columns.map((col) => (
                        <td
                          key={col.key}
                          className={`py-3.5 px-4 ${col.align === "right" ? "text-right" : ""}`}
                        >
                          {renderCellContent(item, col.key)}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* 5. TABLE FOOTER & PAGINATION */}
          <div className="px-4 sm:px-6 py-4 border-t border-[#F0E8DD] bg-[#FAF8F5] flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-bold text-[#7A6F64]">
              Showing 1-{filteredList.length} of {filteredList.length} items
            </span>

            {/* Page Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                className="w-7 h-7 rounded-md border border-[#EBE6DD] bg-[#F3EFE6] text-[#7A6F64] hover:bg-white text-xs font-bold flex items-center justify-center cursor-pointer transition-colors"
              >
                &lt;
              </button>

              <button
                type="button"
                className="w-7 h-7 rounded-md bg-[#FFCC00] text-black font-black text-xs flex items-center justify-center shadow-2xs"
              >
                1
              </button>

              <button
                type="button"
                className="w-7 h-7 rounded-md border border-[#EBE6DD] bg-[#F3EFE6] text-[#7A6F64] hover:bg-white text-xs font-bold flex items-center justify-center cursor-pointer transition-colors"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* ADD / EDIT CONTENT MODAL POPUP */}
      {(isAddModalOpen || editingItem) && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-stone-200 max-w-2xl w-full shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200 text-stone-900 font-sans">
            
            {/* 1. Modal Header */}
            <div className="px-6 py-4 border-b border-stone-200 flex items-start justify-between bg-white">
              <div className="flex items-start gap-3">
                <FileText className="w-6 h-6 text-stone-900 stroke-[2.2] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xl sm:text-2xl font-black font-titan uppercase tracking-tight text-stone-900 leading-none">
                    {editingItem ? "EDIT ITEM" : "ADD NEW ITEM"}
                  </h3>
                  <p className="text-xs font-medium text-stone-500 mt-1">
                    Manage content, category, characters or merchandise item for the platform.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingItem(null);
                }}
                className="p-1 rounded-md text-stone-400 hover:text-stone-900 transition-colors cursor-pointer"
              >
                <X size={20} className="stroke-[2.5]" />
              </button>
            </div>

            {/* 2. Form Body */}
            <form onSubmit={editingItem ? handleSaveEdit : handleSaveAdd} className="p-6 space-y-4">
              
              {/* Row 1: Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Title */}
                <div>
                  <label className="text-xs font-bold text-stone-800 block mb-1.5">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter item title..."
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#FAF9F5] text-stone-900 focus:outline-none focus:border-[#FF5F1F] shadow-2xs"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="text-xs font-bold text-stone-800 block mb-1.5">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#FAF9F5] text-stone-900 appearance-none focus:outline-none focus:border-[#FF5F1F] cursor-pointer pr-9 shadow-2xs font-bold"
                    >
                      <option value="Anime">Anime</option>
                      <option value="Gaming">Gaming</option>
                      <option value="Movies">Movies</option>
                      <option value="TV Shows">TV Shows</option>
                      <option value="K-Pop">K-Pop</option>
                      <option value="Comics">Comics</option>
                      <option value="Manga">Manga</option>
                      <option value="Cosplay">Cosplay</option>
                    </select>
                    <ChevronsUpDown size={14} className="absolute right-3 top-3 text-stone-500 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Row 2: Content Type Selector (Media, Article, Audio, Video, Trailer, Image, etc.) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Content Type Selector */}
                <div>
                  <label className="text-xs font-bold text-stone-800 block mb-1.5">
                    Content Type <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={formData.contentType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contentType: e.target.value,
                          mediaType: e.target.value
                        })
                      }
                      className="w-full text-xs font-bold px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#FAF9F5] text-stone-900 appearance-none focus:outline-none focus:border-[#FF5F1F] cursor-pointer pr-9 shadow-2xs"
                    >
                      <option value="Article">Article</option>
                      <option value="Media">Media</option>
                      <option value="Audio">Audio</option>
                      <option value="Video">Video</option>
                      <option value="Trailer">Trailer</option>
                      <option value="Image">Image</option>
                      <option value="Wiki / Review">Wiki / Review</option>
                    </select>
                    <ChevronsUpDown size={14} className="absolute right-3 top-3 text-stone-500 pointer-events-none" />
                  </div>
                </div>

                {/* Genre / Tags */}
                <div>
                  <label className="text-xs font-bold text-stone-800 block mb-1.5">
                    Genre / Tags
                  </label>
                  <div className="w-full min-h-[40px] px-2.5 py-1.5 rounded-xl border border-stone-200 bg-[#FAF9F5] flex flex-wrap items-center gap-1.5 focus-within:border-[#FF5F1F] shadow-2xs">
                    {formData.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-[#EBE5D8] text-stone-800 text-[11px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 shrink-0"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:text-red-600 cursor-pointer text-stone-500 font-bold"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      placeholder="Add tags..."
                      value={formData.tagInput}
                      onChange={(e) => setFormData({ ...formData, tagInput: e.target.value })}
                      onKeyDown={handleAddTag}
                      className="flex-1 min-w-[80px] bg-transparent text-xs font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none py-1"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Description */}
              <div>
                <label className="text-xs font-bold text-stone-800 block mb-1.5">
                  Description / Subtitle <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  maxLength={1000}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter content summary, lore details or description..."
                  className="w-full text-xs font-medium p-3 rounded-xl border border-stone-200 bg-[#FAF9F5] text-stone-900 leading-relaxed focus:outline-none focus:border-[#FF5F1F] shadow-2xs resize-y"
                />
              </div>

              {/* Row 4: Media / Image */}
              <div>
                <label className="text-xs font-bold text-stone-800 block mb-1.5">
                  Cover Image / Media Asset <span className="text-red-500">*</span>
                </label>
                
                {/* Drag and Drop Zone */}
                <div className="border-2 border-dashed border-stone-300 bg-[#FAF9F5] rounded-2xl p-5 flex flex-col items-center justify-center text-center space-y-2 relative transition-colors hover:border-stone-400">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*,video/*,audio/*"
                    className="hidden"
                  />

                  <div className="w-9 h-9 rounded-full border border-stone-300 bg-white flex items-center justify-center text-stone-700 shadow-2xs">
                    <Upload size={16} className="stroke-[2.2]" />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-stone-800">
                      Drag &amp; drop media file here
                    </p>
                    <p className="text-[10px] font-medium text-stone-500">
                      (JPG, PNG, MP4, MP3)
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-[#FFCC00] hover:bg-[#F2C200] text-black font-black text-[11px] uppercase tracking-wider px-4 py-1.5 rounded-xl shadow-2xs flex items-center gap-1.5 cursor-pointer transition-transform active:scale-95"
                  >
                    <Folder size={13} className="fill-black" />
                    <span>BROWSE FILES</span>
                  </button>
                </div>
              </div>

              {/* Row 5: Status */}
              <div>
                <label className="text-xs font-bold text-stone-800 block mb-1.5">
                  Status <span className="text-red-500">*</span>
                </label>

                <div className="bg-[#EAE6DE] p-1 inline-flex items-center rounded-full border border-stone-200/60 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, status: "Published" })}
                    className={`px-5 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
                      formData.status === "Published"
                        ? "bg-[#0B6636] text-white shadow-xs"
                        : "text-stone-700 hover:text-stone-900"
                    }`}
                  >
                    <span>Published</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, status: "Draft" })}
                    className={`px-5 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
                      formData.status === "Draft"
                        ? "bg-[#0B6636] text-white shadow-xs"
                        : "text-stone-700 hover:text-stone-900"
                    }`}
                  >
                    <span>Draft</span>
                  </button>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingItem(null);
                  }}
                  className="px-6 py-2.5 border border-stone-300 bg-white hover:bg-stone-50 text-stone-900 font-extrabold text-xs uppercase tracking-wider rounded-xl cursor-pointer transition-colors shadow-2xs"
                >
                  CANCEL
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#FFCC00] hover:bg-[#F2C200] text-black font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-2xs transition-transform active:scale-95"
                >
                  SAVE ITEM
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {deletingItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#EDE4D6] p-6 max-w-sm w-full shadow-2xl space-y-4">
            <h3 className="text-base font-black text-[#171717] font-titan uppercase">
              Confirm Delete
            </h3>
            <p className="text-xs text-[#7A6F64] font-medium leading-relaxed">
              Are you sure you want to delete <strong className="text-[#171717]">"{deletingItem.title}"</strong>? This action cannot be undone.
            </p>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeletingItem(null)}
                className="px-4 py-2 border border-[#EDE4D6] text-xs font-bold text-[#7A6F64] hover:bg-stone-50 uppercase rounded-lg cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="px-5 py-2 bg-[#E11D48] hover:bg-[#BE123C] text-white font-extrabold text-xs tracking-wider uppercase rounded-lg cursor-pointer shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export { ManageContentPage };
