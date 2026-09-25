/**
 * Centralized API service for FandomVerse
 * 
 * Uses mock data for now with BASE_URL configured so it can be connected
 * to the Node/Express + MongoDB backend seamlessly later.
 */

export const BASE_URL = "http://localhost:5000/api";

export const MOCK_CONTENT_ITEMS = [
  {
    id: "c-1",
    title: "One Piece: Egghead Arc Breakdown",
    category: "Anime",
    badgeColor: "bg-blue-600",
    type: "ARTICLE",
    year: "2025",
    popularity: "9.2K",
    rating: "9.9",
    genre: "Action, Adventure, Shounen",
    desc: "Deep breakdown of Egghead Island climax, Vegapunk revelations, ancient technology, and Gear 5 Luffy fights.",
    videoThumbnail: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&auto=format&fit=crop&q=80",
    posterImage: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&auto=format&fit=crop&q=80",
    backgroundImage: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&auto=format&fit=crop&q=85"
  },
  {
    id: "c-2",
    title: "Elden Ring: Shadow of the Erdtree - First Impressions",
    category: "Gaming",
    badgeColor: "bg-violet-600",
    type: "VIDEO",
    year: "2024",
    popularity: "8.7K",
    rating: "9.8",
    genre: "Dark Fantasy, Action RPG",
    desc: "Our first hands-on impressions of Land of Shadow, new legacy dungeons, and grueling boss fights against Messmer.",
    videoThumbnail: "https://images.unsplash.com/photo-1563089145-599997674d42?w=1200&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1563089145-599997674d42?w=1200&auto=format&fit=crop&q=80",
    posterImage: "https://images.unsplash.com/photo-1563089145-599997674d42?w=1200&auto=format&fit=crop&q=80",
    backgroundImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&auto=format&fit=crop&q=85"
  },
  {
    id: "c-3",
    title: "Dune: Part Two - A Visual Masterpiece",
    category: "Movies",
    badgeColor: "bg-rose-600",
    type: "ARTICLE",
    year: "2024",
    popularity: "7.5K",
    rating: "9.7",
    genre: "Sci-Fi, Epic Adventure",
    desc: "Cinematography breakdown of Denis Villeneuve’s epic sequel, Arrakis desert warfare, sandstorms, and worm-riding effects.",
    videoThumbnail: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1200&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1200&auto=format&fit=crop&q=80",
    posterImage: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1200&auto=format&fit=crop&q=80",
    backgroundImage: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1920&auto=format&fit=crop&q=85"
  },
  {
    id: "c-4",
    title: "Stranger Things S5 - What We Know So Far",
    category: "TV Shows",
    badgeColor: "bg-purple-600",
    type: "VIDEO",
    year: "2025",
    popularity: "12.3K",
    rating: "9.6",
    genre: "Thriller, Sci-Fi, Horror",
    desc: "The final showdown in Hawkins. Cast announcements, release windows, Vecna's revenge, and Upside Down theories.",
    videoThumbnail: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&auto=format&fit=crop&q=80",
    posterImage: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&auto=format&fit=crop&q=80",
    backgroundImage: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1920&auto=format&fit=crop&q=85"
  },
  {
    id: "c-5",
    title: "IVE's New Comeback Teaser Breaks Records",
    category: "K-Pop",
    badgeColor: "bg-emerald-600",
    type: "ARTICLE",
    year: "2025",
    popularity: "10.1K",
    rating: "9.5",
    genre: "Music, Pop Performance",
    desc: "Analyzing the record-breaking teaser statistics and conceptual visuals of IVE’s upcoming world tour album.",
    videoThumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&auto=format&fit=crop&q=80",
    posterImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&auto=format&fit=crop&q=80",
    backgroundImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1920&auto=format&fit=crop&q=85"
  },
  {
    id: "c-6",
    title: "Zoro's Greatest Fights Ranked",
    category: "Anime",
    badgeColor: "bg-blue-600",
    type: "VIDEO",
    year: "2024",
    popularity: "6.8K",
    rating: "9.6",
    genre: "Action, Swordsmanship",
    desc: "From Mihawk to King, ranking Roronoa Zoro’s most legendary three-sword style duels and Conqueror's Haki bursts.",
    videoThumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
    posterImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
    backgroundImage: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1920&auto=format&fit=crop&q=85"
  },
  {
    id: "c-7",
    title: "Final Fantasy 7 Rebirth: What Makes It Special",
    category: "Gaming",
    badgeColor: "bg-violet-600",
    type: "ARTICLE",
    year: "2024",
    popularity: "5.6K",
    rating: "9.4",
    genre: "Fantasy, JRPG",
    desc: "Cloud Strife’s open-world adventure analyzed. Minigames, synergy skills, combat depth, and Aerith's destiny.",
    videoThumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&auto=format&fit=crop&q=80",
    posterImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&auto=format&fit=crop&q=80",
    backgroundImage: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1920&auto=format&fit=crop&q=85"
  },
  {
    id: "c-8",
    title: "Spider-Man: Across the Spider-Verse - A Deeper Look",
    category: "Movies",
    badgeColor: "bg-rose-600",
    type: "VIDEO",
    year: "2023",
    popularity: "11.9K",
    rating: "9.8",
    genre: "Sci-Fi, Multiverse Animation",
    desc: "Breaking down the diverse animation styles, multiverse anomalies, cameos, and tragic canon events of Miles Morales.",
    videoThumbnail: "https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?w=1200&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?w=1200&auto=format&fit=crop&q=80",
    posterImage: "https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?w=1200&auto=format&fit=crop&q=80",
    backgroundImage: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&auto=format&fit=crop&q=85"
  },
  {
    id: "c-9",
    title: "Attack on Titan - Final Season Explained",
    category: "TV Shows",
    badgeColor: "bg-purple-600",
    type: "ARTICLE",
    year: "2023",
    popularity: "14.2K",
    rating: "9.7",
    genre: "Action, Dark Fantasy, Drama",
    desc: "The complex moral dilemma of Eren Yeager, the Rumbling, Ymir's curse, and the final emotional sacrifice explained.",
    videoThumbnail: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&auto=format&fit=crop&q=80",
    posterImage: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&auto=format&fit=crop&q=80",
    backgroundImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&auto=format&fit=crop&q=85"
  },
  {
    id: "c-10",
    title: "Naruto: The Ultimate Guide to the Series",
    category: "Manga",
    badgeColor: "bg-amber-600",
    type: "IMAGE",
    year: "2020",
    popularity: "18.7K",
    rating: "9.6",
    genre: "Fantasy, Ninja Shounen",
    desc: "The complete reading and watch guide for Naruto Uzumaki’s journey from outcast to the Seventh Hokage.",
    videoThumbnail: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1200&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1200&auto=format&fit=crop&q=80",
    posterImage: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1200&auto=format&fit=crop&q=80",
    backgroundImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&auto=format&fit=crop&q=85"
  },
  {
    id: "trend-cyberpunk",
    title: "Cyberpunk 2077: Phantom Liberty",
    category: "Gaming",
    year: "2024",
    rating: "9.8",
    popularity: "15.4K",
    type: "VIDEO",
    genre: "Cyberpunk RPG",
    desc: "Night City opens its clandestine sub-district of Dogtown with an espionage thriller storyline featuring Solomon Reed.",
    videoThumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=80",
    posterImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=80",
    backgroundImage: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1920&auto=format&fit=crop&q=85"
  },
  {
    id: "trend-rdr2",
    title: "Red Dead Redemption 2: Van der Linde Saga",
    category: "Gaming",
    year: "2024",
    rating: "9.9",
    popularity: "22.1K",
    type: "ARTICLE",
    genre: "Western Adventure",
    desc: "Relive the golden age of American outlaws fleeing federal agents across an unforgiving frontier in Dutch's gang.",
    videoThumbnail: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&auto=format&fit=crop&q=80",
    posterImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&auto=format&fit=crop&q=80",
    backgroundImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&auto=format&fit=crop&q=85"
  }
];

export const fetchContentItems = async () => {
  return Promise.resolve(MOCK_CONTENT_ITEMS);
};

export const fetchContentById = async (id) => {
  const item = MOCK_CONTENT_ITEMS.find((c) => c.id === id);
  return Promise.resolve(item || MOCK_CONTENT_ITEMS[0]);
};
