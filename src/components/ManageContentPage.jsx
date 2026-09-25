import { useState, useRef } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  FileText,
  PlaySquare,
  User,
  ShoppingBag,
  Upload,
  Folder,
  X,
  ChevronsUpDown,
  Check
} from "lucide-react";

/* ========================================================================= */
/*   MOCK DATA FOR ALL 4 CONTENT TABS (ARTICLES, MEDIA, CHARACTERS, MERCH)  */
/* ========================================================================= */

const ARTICLES_DATA = [
  {
    id: "art-1",
    title: "The Floating Realms",
    subtitle: "A breathtaking journey through sky islands.",
    category: "ANIME",
    categoryBadge: "bg-[#F5EADF] text-[#B87033]",
    date: "May 28, 2025",
    status: "PUBLISHED",
    statusBadge: "bg-[#DCFCE7] text-[#16A34A]",
    image: "/src/assets/images/aetheria_wanderer_1790282784893.jpg"
  },
  {
    id: "art-2",
    title: "The Next Level: Future of Gaming",
    subtitle: "How innovation is shaping the next generation.",
    category: "GAMING",
    categoryBadge: "bg-[#E2E8F0] text-[#475569]",
    date: "May 26, 2025",
    status: "PUBLISHED",
    statusBadge: "bg-[#DCFCE7] text-[#16A34A]",
    image: "/src/assets/images/cyberpunk_2077_art_1790255907017.jpg"
  },
  {
    id: "art-3",
    title: "Voices from the Beyond",
    subtitle: "An in-depth look at the science of space exploration.",
    category: "MOVIES",
    categoryBadge: "bg-[#DCEEFE] text-[#0284C7]",
    date: "May 24, 2025",
    status: "DRAFT",
    statusBadge: "bg-[#F5EADF] text-[#B87033]",
    image: "/src/assets/images/interstellar_space_1790270312783.jpg"
  },
  {
    id: "art-4",
    title: "The Hidden City",
    subtitle: "Secrets, legends and the people who keep it alive.",
    category: "TV SHOWS",
    categoryBadge: "bg-[#F3E8FF] text-[#9333EA]",
    date: "May 21, 2025",
    status: "PUBLISHED",
    statusBadge: "bg-[#DCFCE7] text-[#16A34A]",
    image: "/src/assets/images/midnight_signal_rain_1790283977485.jpg"
  },
  {
    id: "art-5",
    title: "Rising Stars: The Next Wave",
    subtitle: "Meet the artists shaping tomorrow's sound.",
    category: "K-POP",
    categoryBadge: "bg-[#FCE7F3] text-[#C026D3]",
    date: "May 18, 2025",
    status: "PUBLISHED",
    statusBadge: "bg-[#DCFCE7] text-[#16A34A]",
    image: "/src/assets/images/neon_beat_festival_1790282824470.jpg"
  },
  {
    id: "art-6",
    title: "The Art of Heroism",
    subtitle: "What makes a hero in today's world?",
    category: "COMICS",
    categoryBadge: "bg-[#CCFBF1] text-[#0F766E]",
    date: "May 15, 2025",
    status: "DRAFT",
    statusBadge: "bg-[#F5EADF] text-[#B87033]",
    image: "/src/assets/images/spiderman_comic_1790270342039.jpg"
  },
  {
    id: "art-7",
    title: "The Silent Library",
    subtitle: "A story about memory, time and forgotten books.",
    category: "MANGA",
    categoryBadge: "bg-[#FEF3C7] text-[#92400E]",
    date: "May 12, 2025",
    status: "PUBLISHED",
    statusBadge: "bg-[#DCFCE7] text-[#16A34A]",
    image: "/src/assets/images/sora_hayashi_1790281509190.jpg"
  },
  {
    id: "art-8",
    title: "Beyond the Costume",
    subtitle: "How cosplay builds community and confidence.",
    category: "COSPLAY",
    categoryBadge: "bg-[#FFE4E6] text-[#E11D48]",
    date: "May 10, 2025",
    status: "PUBLISHED",
    statusBadge: "bg-[#DCFCE7] text-[#16A34A]",
    image: "/src/assets/images/sae_jihyun_1790281620416.jpg"
  }
];

const MEDIA_DATA = [
  {
    id: "med-1",
    title: "Neon Drift Racing",
    subtitle: "High-speed racing in a futuristic city.",
    type: "Trailer",
    duration: "02:35",
    category: "GAMING",
    categoryBadge: "bg-[#E2E8F0] text-[#475569]",
    status: "PUBLISHED",
    statusBadge: "bg-[#DCFCE7] text-[#16A34A]",
    image: "/src/assets/images/cyberpunk_2077_art_1790255907017.jpg"
  },
  {
    id: "med-2",
    title: "Aetheria Sky Islands",
    subtitle: "Breathtaking world exploration video.",
    type: "Video",
    duration: "08:42",
    category: "ANIME",
    categoryBadge: "bg-[#F5EADF] text-[#B87033]",
    status: "PUBLISHED",
    statusBadge: "bg-[#DCFCE7] text-[#16A34A]",
    image: "/src/assets/images/aetheria_wanderer_1790282784893.jpg"
  },
  {
    id: "med-3",
    title: "Interstellar Journey",
    subtitle: "Space exploration orchestral theme.",
    type: "Audio",
    duration: "04:15",
    category: "MOVIES",
    categoryBadge: "bg-[#DCEEFE] text-[#0284C7]",
    status: "DRAFT",
    statusBadge: "bg-[#F5EADF] text-[#B87033]",
    image: "/src/assets/images/interstellar_space_1790270312783.jpg"
  },
  {
    id: "med-4",
    title: "Midnight City OST",
    subtitle: "Rain ambient city audio recording.",
    type: "Audio",
    duration: "05:20",
    category: "TV SHOWS",
    categoryBadge: "bg-[#F3E8FF] text-[#9333EA]",
    status: "PUBLISHED",
    statusBadge: "bg-[#DCFCE7] text-[#16A34A]",
    image: "/src/assets/images/midnight_signal_rain_1790283977485.jpg"
  },
  {
    id: "med-5",
    title: "Starlight Live Concert",
    subtitle: "K-Pop concert highlight performance.",
    type: "Video",
    duration: "12:56",
    category: "K-POP",
    categoryBadge: "bg-[#FCE7F3] text-[#C026D3]",
    status: "PUBLISHED",
    statusBadge: "bg-[#DCFCE7] text-[#16A34A]",
    image: "/src/assets/images/neon_beat_festival_1790282824470.jpg"
  },
  {
    id: "med-6",
    title: "Crimson Shield Motion Comic",
    subtitle: "Animated comic teaser trailer.",
    type: "Trailer",
    duration: "01:45",
    category: "COMICS",
    categoryBadge: "bg-[#CCFBF1] text-[#0F766E]",
    status: "DRAFT",
    statusBadge: "bg-[#F5EADF] text-[#B87033]",
    image: "/src/assets/images/spiderman_comic_1790270342039.jpg"
  },
  {
    id: "med-7",
    title: "Whispers of Moon Lore",
    subtitle: "Manga explainer video breakdowns.",
    type: "Video",
    duration: "06:10",
    category: "MANGA",
    categoryBadge: "bg-[#FEF3C7] text-[#92400E]",
    status: "PUBLISHED",
    statusBadge: "bg-[#DCFCE7] text-[#16A34A]",
    image: "/src/assets/images/sora_hayashi_1790281509190.jpg"
  },
  {
    id: "med-8",
    title: "Realm Walker Cosplay Showcase",
    subtitle: "Costume craftsmanship video tutorial.",
    type: "Video",
    duration: "07:30",
    category: "COSPLAY",
    categoryBadge: "bg-[#FFE4E6] text-[#E11D48]",
    status: "PUBLISHED",
    statusBadge: "bg-[#DCFCE7] text-[#16A34A]",
    image: "/src/assets/images/sae_jihyun_1790281620416.jpg"
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
  },
  {
    id: "char-5",
    title: "Min-jun Star",
    subtitle: "Lead vocalist and main dancer.",
    fandom: "Starlight Idol Group",
    bio: "Global icon of modern pop culture.",
    category: "K-POP",
    categoryBadge: "bg-[#FCE7F3] text-[#C026D3]",
    status: "PUBLISHED",
    statusBadge: "bg-[#DCFCE7] text-[#16A34A]",
    image: "/src/assets/images/neon_beat_festival_1790282824470.jpg"
  },
  {
    id: "char-6",
    title: "Captain Aegis",
    subtitle: "Protector of the realm.",
    fandom: "Crimson Vanguard",
    bio: "Wields the unbreakable shield.",
    category: "COMICS",
    categoryBadge: "bg-[#CCFBF1] text-[#0F766E]",
    status: "DRAFT",
    statusBadge: "bg-[#F5EADF] text-[#B87033]",
    image: "/src/assets/images/spiderman_comic_1790270342039.jpg"
  },
  {
    id: "char-7",
    title: "Tsukiko Moon",
    subtitle: "Ancient shrine priestess.",
    fandom: "Moonlit Whispers",
    bio: "Guardian of ancestral magic.",
    category: "MANGA",
    categoryBadge: "bg-[#FEF3C7] text-[#92400E]",
    status: "PUBLISHED",
    statusBadge: "bg-[#DCFCE7] text-[#16A34A]",
    image: "/src/assets/images/sora_hayashi_1790281509190.jpg"
  },
  {
    id: "char-8",
    title: "Sae Jihyun",
    subtitle: "Artisan armorsmith & cosplayer.",
    fandom: "Realm Walker",
    bio: "Crafts fantasy costumes and props.",
    category: "COSPLAY",
    categoryBadge: "bg-[#FFE4E6] text-[#E11D48]",
    status: "PUBLISHED",
    statusBadge: "bg-[#DCFCE7] text-[#16A34A]",
    image: "/src/assets/images/sae_jihyun_1790281620416.jpg"
  }
];

const MERCHANDISE_DATA = [
  {
    id: "merch-1",
    title: "Skybound Pilot Figurine",
    subtitle: "Limited Edition Hand-Painted Model.",
    tag: "Collectible",
    releaseStatus: "Pre-Order",
    category: "ANIME",
    categoryBadge: "bg-[#F5EADF] text-[#B87033]",
    status: "PUBLISHED",
    statusBadge: "bg-[#DCFCE7] text-[#16A34A]",
    image: "/src/assets/images/aetheria_wanderer_1790282784893.jpg"
  },
  {
    id: "merch-2",
    title: "Neon Cyberpunk Jacket",
    subtitle: "Futuristic glow LED embroidered wear.",
    tag: "Apparel",
    releaseStatus: "In Stock",
    category: "GAMING",
    categoryBadge: "bg-[#E2E8F0] text-[#475569]",
    status: "PUBLISHED",
    statusBadge: "bg-[#DCFCE7] text-[#16A34A]",
    image: "/src/assets/images/cyberpunk_2077_art_1790255907017.jpg"
  },
  {
    id: "merch-3",
    title: "Space Horizon Poster",
    subtitle: "High-grade metallic foil art print.",
    tag: "Poster",
    releaseStatus: "In Stock",
    category: "MOVIES",
    categoryBadge: "bg-[#DCEEFE] text-[#0284C7]",
    status: "DRAFT",
    statusBadge: "bg-[#F5EADF] text-[#B87033]",
    image: "/src/assets/images/interstellar_space_1790270312783.jpg"
  },
  {
    id: "merch-4",
    title: "Midnight Noir Vinyl OST",
    subtitle: "Double 180g heavy vinyl record set.",
    tag: "Vinyl",
    releaseStatus: "Limited Stock",
    category: "TV SHOWS",
    categoryBadge: "bg-[#F3E8FF] text-[#9333EA]",
    status: "PUBLISHED",
    statusBadge: "bg-[#DCFCE7] text-[#16A34A]",
    image: "/src/assets/images/midnight_signal_rain_1790283977485.jpg"
  },
  {
    id: "merch-5",
    title: "Starlight Lightstick v2",
    subtitle: "Official wireless bluetooth concert rod.",
    tag: "Lightstick",
    releaseStatus: "In Stock",
    category: "K-POP",
    categoryBadge: "bg-[#FCE7F3] text-[#C026D3]",
    status: "PUBLISHED",
    statusBadge: "bg-[#DCFCE7] text-[#16A34A]",
    image: "/src/assets/images/neon_beat_festival_1790282824470.jpg"
  },
  {
    id: "merch-6",
    title: "Crimson Shield Replica",
    subtitle: "1:1 scale metal alloy prop shield.",
    tag: "Replica Prop",
    releaseStatus: "Out of Stock",
    category: "COMICS",
    categoryBadge: "bg-[#CCFBF1] text-[#0F766E]",
    status: "DRAFT",
    statusBadge: "bg-[#F5EADF] text-[#B87033]",
    image: "/src/assets/images/spiderman_comic_1790270342039.jpg"
  },
  {
    id: "merch-7",
    title: "Moonlit Lore Artbook",
    subtitle: "250-page collector hardcover edition.",
    tag: "Artbook",
    releaseStatus: "In Stock",
    category: "MANGA",
    categoryBadge: "bg-[#FEF3C7] text-[#92400E]",
    status: "PUBLISHED",
    statusBadge: "bg-[#DCFCE7] text-[#16A34A]",
    image: "/src/assets/images/sora_hayashi_1790281509190.jpg"
  },
  {
    id: "merch-8",
    title: "Realm Walker Cosplay Wig",
    subtitle: "Heat-resistant styled cosplay hair.",
    tag: "Cosplay Prop",
    releaseStatus: "In Stock",
    category: "COSPLAY",
    categoryBadge: "bg-[#FFE4E6] text-[#E11D48]",
    status: "PUBLISHED",
    statusBadge: "bg-[#DCFCE7] text-[#16A34A]",
    image: "/src/assets/images/sae_jihyun_1790281620416.jpg"
  }
];

/* ========================================================================= */
/*   DATA-DRIVEN COLUMN CONFIGURATIONS FOR THE ONE DYNAMIC TABLE COMPONENT   */
/* ========================================================================= */

const TAB_CONFIGS = {
  articles: {
    label: "ARTICLES",
    searchPlaceholder: "Search articles by title, author or keyword...",
    columns: [
      { key: "thumbnail", header: "THUMBNAIL" },
      { key: "title", header: "TITLE" },
      { key: "category", header: "CATEGORY" },
      { key: "date", header: "DATE" },
      { key: "status", header: "STATUS" },
      { key: "actions", header: "ACTIONS", align: "right" }
    ]
  },
  media: {
    label: "MEDIA",
    searchPlaceholder: "Search media by title, type or keyword...",
    columns: [
      { key: "thumbnail", header: "THUMBNAIL" },
      { key: "title", header: "TITLE" },
      { key: "type", header: "TYPE" },
      { key: "duration", header: "DURATION" },
      { key: "category", header: "CATEGORY" },
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
  }
};

const ManageContentPage = ({ onOpenArticle }) => {
  const [activeTab, setActiveTab] = useState("articles");
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
    articles: ARTICLES_DATA,
    media: MEDIA_DATA,
    characters: CHARACTERS_DATA,
    merchandise: MERCHANDISE_DATA
  });

  // Modal Form State
  const [modalType, setModalType] = useState("articles"); // "articles" | "media" | "characters" | "merchandise"
  const [formData, setFormData] = useState({
    title: "The Forgotten Island",
    category: "Anime",
    mediaType: "Trailer",
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
      "A young explorer sets out on a mysterious island where ancient ruins, strange creatures and forgotten secrets await. This is a journey of discovery, courage and the unknown.",
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
      (item.type && item.type.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.fandom && item.fandom.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.tag && item.tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesStatus && matchesSearch;
  });

  const handleOpenAddModal = () => {
    setModalType(activeTab);
    setFormData({
      title: "The Forgotten Island",
      category: "Anime",
      mediaType: "Trailer",
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
        "A young explorer sets out on a mysterious island where ancient ruins, strange creatures and forgotten secrets await. This is a journey of discovery, courage and the unknown.",
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
      mediaType: item.type || "Trailer",
      duration: item.duration || "02:35",
      fandom: item.fandom || "Skybound Aetheria",
      roleTitle: item.subtitle || "Master Sky Pilot",
      tag: item.tag || "Collectible",
      releaseStatus: item.releaseStatus || "In Stock",
      tags: ["Adventure", "Drama", "Sci-Fi"],
      tagInput: "",
      releaseDate: "2025-07-18",
      popularityScore: "8.7",
      description: item.subtitle || item.bio || "Content details and descriptions.",
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
      category: formData.category.toUpperCase(),
      categoryBadge: getCategoryBadgeStyle(formData.category),
      date: formData.releaseDate ? "Jul 18, 2025" : "May 28, 2025",
      status: formData.status === "Published" ? "PUBLISHED" : "DRAFT",
      statusBadge: formData.status === "Published" ? "bg-[#DCFCE7] text-[#16A34A]" : "bg-[#F5EADF] text-[#B87033]",
      image: formData.image || "/src/assets/images/interstellar_space_1790270312783.jpg",
      type: formData.mediaType,
      duration: formData.duration || "02:35",
      fandom: formData.fandom || "Skybound Aetheria",
      bio: formData.description,
      tag: formData.tag || "Collectible",
      releaseStatus: formData.releaseStatus || "In Stock"
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
            category: formData.category.toUpperCase(),
            categoryBadge: getCategoryBadgeStyle(formData.category),
            status: formData.status === "Published" ? "PUBLISHED" : "DRAFT",
            statusBadge: formData.status === "Published" ? "bg-[#DCFCE7] text-[#16A34A]" : "bg-[#F5EADF] text-[#B87033]"
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

  const currentConfig = TAB_CONFIGS[activeTab];

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
              {item.subtitle}
            </p>
          </div>
        );

      case "category":
        return (
          <span className={`text-[10px] font-black px-3 py-1 rounded-md uppercase tracking-wider inline-block ${item.categoryBadge}`}>
            {item.category}
          </span>
        );

      case "date":
        return <span className="text-xs font-semibold text-[#7A6F64]">{item.date}</span>;

      case "type":
        return <span className="text-xs font-bold text-[#171717]">{item.type}</span>;

      case "duration":
        return <span className="text-xs font-semibold text-[#7A6F64]">{item.duration}</span>;

      case "fandom":
        return <span className="text-xs font-bold text-[#171717]">{item.fandom}</span>;

      case "bio":
        return <span className="text-[11px] font-semibold text-[#7A6F64] line-clamp-1">{item.bio}</span>;

      case "tag":
        return <span className="text-xs font-bold text-[#171717]">{item.tag}</span>;

      case "releaseStatus":
        return <span className="text-xs font-semibold text-[#7A6F64]">{item.releaseStatus}</span>;

      case "status":
        return (
          <span className={`text-[9.5px] font-black px-3 py-1 rounded-full uppercase tracking-wider inline-block ${item.statusBadge}`}>
            {item.status}
          </span>
        );

      case "actions":
        return (
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => handleOpenEditModal(item)}
              className="p-1.5 rounded-md hover:bg-[#F0E8DD] text-[#7A6F64] hover:text-[#171717] transition-colors cursor-pointer"
              title="Edit Item"
            >
              <Pencil size={15} className="stroke-[2.2]" />
            </button>
            <button
              type="button"
              onClick={() => setDeletingItem(item)}
              className="p-1.5 rounded-md hover:bg-rose-50 text-[#E11D48] transition-colors cursor-pointer"
              title="Delete Item"
            >
              <Trash2 size={15} className="stroke-[2.2]" />
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-[#FAF8F5] min-h-full font-sans select-none pb-16 text-[#171717]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-6">

        {/* 1. PAGE TITLE & TOP ACTION BUTTON */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3.5xl font-black tracking-tight uppercase font-titan text-[#171717]">
              MANAGE CONTENT
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-[#7A6F64] mt-0.5">
              Add, edit and remove content across all types and categories.
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

        {/* 2. SEGMENTED TAB BAR */}
        <div className="space-y-2">
          <div className="bg-[#F0EBE1] border border-[#E5DFD3] rounded-2xl p-1.5 flex flex-wrap items-center gap-1.5 shadow-2xs">
            {/* Articles Tab */}
            <button
              type="button"
              onClick={() => handleTabChange("articles")}
              className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === "articles"
                  ? "bg-[#FFCC00] text-black shadow-2xs font-titan"
                  : "text-[#7A6F64] hover:bg-[#E2DDD3] hover:text-[#171717]"
              }`}
            >
              <FileText size={16} className="stroke-[2.2]" />
              <span>ARTICLES</span>
            </button>

            {/* Media Tab */}
            <button
              type="button"
              onClick={() => handleTabChange("media")}
              className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === "media"
                  ? "bg-[#FFCC00] text-black shadow-2xs font-titan"
                  : "text-[#7A6F64] hover:bg-[#E2DDD3] hover:text-[#171717]"
              }`}
            >
              <PlaySquare size={16} className="stroke-[2.2]" />
              <span>MEDIA</span>
            </button>

            {/* Characters Tab */}
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

            {/* Merchandise Tab */}
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
          </div>

          {/* Tab Helper Description */}
          <p className="text-[11px] font-semibold text-[#9C8F82] pl-1">
            Media adds Type &amp; Duration &nbsp;·&nbsp; Characters adds Fandom &amp; Bio &nbsp;·&nbsp; Merchandise adds Tag &amp; Release status.
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
                      No content items found matching filters.
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
                    ADD NEW CONTENT
                  </h3>
                  <p className="text-xs font-medium text-stone-500 mt-1">
                    Create a new content item for the platform.
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
                    placeholder="Enter content title..."
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
                      className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#FAF9F5] text-stone-900 appearance-none focus:outline-none focus:border-[#FF5F1F] cursor-pointer pr-9 shadow-2xs"
                    >
                      <option value="Movies">Movies</option>
                      <option value="Anime">Anime</option>
                      <option value="Gaming">Gaming</option>
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

              {/* Row 2: Content Type & Genre / Tags */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Content Type */}
                <div>
                  <label className="text-xs font-bold text-stone-800 block mb-1.5">
                    Content Type <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#FAF9F5] text-stone-900 appearance-none focus:outline-none focus:border-[#FF5F1F] cursor-pointer pr-9 shadow-2xs"
                    >
                      <option value="Article">Article</option>
                      <option value="Video">Video</option>
                      <option value="Image">Image</option>
                      <option value="Audio">Audio</option>
                    </select>
                    <ChevronsUpDown size={14} className="absolute right-3 top-3 text-stone-500 pointer-events-none" />
                  </div>
                </div>

                {/* Genre / Tags */}
                <div>
                  <label className="text-xs font-bold text-stone-800 block mb-1.5">
                    Genre / Tags <span className="text-red-500">*</span>
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

              {/* Row 3: Release Date & Popularity Score */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Release Date */}
                <div>
                  <label className="text-xs font-bold text-stone-800 block mb-1.5">
                    Release Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.releaseDate}
                    onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
                    className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#FAF9F5] text-stone-900 focus:outline-none focus:border-[#FF5F1F] shadow-2xs"
                  />
                </div>

                {/* Popularity Score */}
                <div>
                  <label className="text-xs font-bold text-stone-800 block mb-1.5">
                    Popularity Score <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    required
                    placeholder="8.7"
                    value={formData.popularityScore}
                    onChange={(e) => setFormData({ ...formData, popularityScore: e.target.value })}
                    className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#FAF9F5] text-stone-900 focus:outline-none focus:border-[#FF5F1F] shadow-2xs"
                  />
                </div>
              </div>

              {/* Row 4: Description */}
              <div>
                <label className="text-xs font-bold text-stone-800 block mb-1.5">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  maxLength={1000}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="A group of explorers discover a mysterious island..."
                  className="w-full text-xs font-medium p-3 rounded-xl border border-stone-200 bg-[#FAF9F5] text-stone-900 leading-relaxed focus:outline-none focus:border-[#FF5F1F] shadow-2xs resize-y"
                />
                <div className="text-[11px] font-medium text-stone-400 text-right mt-1">
                  {formData.description.length}/1000
                </div>
              </div>

              {/* Row 5: Media / Image */}
              <div>
                <label className="text-xs font-bold text-stone-800 block mb-1.5">
                  Media / Image <span className="text-red-500">*</span>
                </label>
                
                {/* Drag and Drop Zone */}
                <div className="border-2 border-dashed border-stone-300 bg-[#FAF9F5] rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-2 relative transition-colors hover:border-stone-400">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*,video/*,audio/*"
                    className="hidden"
                  />

                  {/* Icon */}
                  <div className="w-10 h-10 rounded-full border border-stone-300 bg-white flex items-center justify-center text-stone-700 shadow-2xs">
                    <Upload size={18} className="stroke-[2.2]" />
                  </div>

                  {/* Instruction text */}
                  <div>
                    <p className="text-xs font-bold text-stone-800">
                      Drag & drop file here
                    </p>
                    <p className="text-[11px] font-medium text-stone-500">
                      or click to browse
                    </p>
                    <p className="text-[10px] font-medium text-stone-400 mt-0.5">
                      (JPG, PNG, MP4, MP3)
                    </p>
                  </div>

                  {/* Browse files yellow button */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-[#FFCC00] hover:bg-[#F2C200] text-black font-black text-[11px] uppercase tracking-wider px-4 py-2 rounded-xl shadow-2xs flex items-center gap-1.5 cursor-pointer transition-transform active:scale-95 mt-1"
                  >
                    <Folder size={14} className="fill-black" />
                    <span>BROWSE FILES</span>
                  </button>
                </div>
              </div>

              {/* Row 6: Status */}
              <div>
                <label className="text-xs font-bold text-stone-800 block mb-1.5">
                  Status <span className="text-red-500">*</span>
                </label>

                {/* Pill Switcher */}
                <div className="bg-[#EAE6DE] p-1 inline-flex items-center rounded-full border border-stone-200/60 shadow-2xs">
                  {/* Published Pill */}
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, status: "Published" })}
                    className={`px-5 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-3 transition-all cursor-pointer ${
                      formData.status === "Published"
                        ? "bg-[#0B6636] text-white shadow-xs"
                        : "text-stone-700 hover:text-stone-900"
                    }`}
                  >
                    <span>Published</span>
                    {formData.status === "Published" && (
                      <span className="w-2.5 h-2.5 rounded-full bg-white shadow-2xs" />
                    )}
                  </button>

                  {/* Draft Pill */}
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, status: "Draft" })}
                    className={`px-5 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
                      formData.status === "Draft"
                        ? "bg-[#0B6636] text-white shadow-xs"
                        : "text-stone-700 hover:text-stone-900"
                    }`}
                  >
                    {formData.status !== "Draft" && (
                      <span className="w-3 h-3 rounded-full border-2 border-stone-400 inline-block" />
                    )}
                    <span>Draft</span>
                    {formData.status === "Draft" && (
                      <span className="w-2.5 h-2.5 rounded-full bg-white shadow-2xs" />
                    )}
                  </button>
                </div>
              </div>

              {/* Footer Divider & Action Buttons */}
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
                  SAVE CONTENT
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
