import {
  Globe,
  ArrowRight
} from "lucide-react";
import {
  GameSpotLogo,
  MetacriticLogo,
  TVGuideLogo,
  GameFAQsLogo,
  ComicVineLogo,
  FanaticalLogo
} from "./BrandLogos";
const FandomFooter = ({ onOpenLinkModal }) => {
  const handleLinkClick = (e, title, text) => {
    e.preventDefault();
    if (onOpenLinkModal) {
      onOpenLinkModal(title, text);
    }
  };
  const partnerBrands = [
    {
      name: "GameSpot",
      desc: "Reviews, walkthroughs & news",
      logo: <GameSpotLogo size={16} />,
      topic: "GameSpot",
      text: "Video game reviews, news, gameplay previews, walkthroughs, and industry reporting."
    },
    {
      name: "Metacritic",
      desc: "Critic & user review scores",
      logo: <MetacriticLogo size={16} />,
      topic: "Metacritic",
      text: "Aggregated review scores and critical consensus for games, movies, television, and music."
    },
    {
      name: "TV Guide",
      desc: "Episode recaps & streaming",
      logo: <TVGuideLogo size={16} />,
      topic: "TV Guide",
      text: "Television episode recaps, streaming recommendations, and schedule listings."
    },
    {
      name: "GameFAQs",
      desc: "Community guides & boards",
      logo: <GameFAQsLogo size={16} />,
      topic: "GameFAQs",
      text: "Extensive video game walkthroughs, message boards, community FAQs, and cheat codes."
    },
    {
      name: "Comic Vine",
      desc: "Character lore & issues",
      logo: <ComicVineLogo size={16} />,
      topic: "Comic Vine",
      text: "The largest comic book wiki covering superhero arcs, publisher timelines, and character biographies."
    },
    {
      name: "Fanatical",
      desc: "Licensed PC game deals",
      logo: <FanaticalLogo size={16} />,
      topic: "Fanatical",
      text: "Officially licensed Steam keys, curated bundles, and exclusive digital gaming promotions."
    }
  ];
  return <footer className="bg-[#0B0B0D] text-[#8A8A8E] pt-12 pb-10 px-4 sm:px-8 border-t border-[#232326] select-none">
      <div className="max-w-5xl mx-auto">
        {
    /* Brand Header */
  }
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-[#232326] gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl tracking-tight text-[#F5F5F5]">
              Fan<span className="text-[#E1121E]">dom</span>
            </span>
            <span className="text-xs text-[#8A8A8E] pl-2 border-l border-[#232326]">
              Entertainment Wiki Platform
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
    onClick={(e) => handleLinkClick(e, "Language", "Select your regional language.")}
    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#151517] border border-[#232326] text-[#F5F5F5] hover:border-[#35353a] transition-colors"
  >
              <Globe size={13} className="text-[#8A8A8E]" />
              <span>English (US)</span>
            </button>
          </div>
        </div>

        {
    /* Partner Brands Grid: Charcoal #151517, 1px border #232326 */
  }
        <div className="py-8 border-b border-[#232326]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#F5F5F5]">
              Network
            </span>
            <span className="text-[11px] text-[#8A8A8E]">
              Editorial & community databases
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {partnerBrands.map((brand) => <a
    key={brand.name}
    href={`#${brand.name.toLowerCase()}`}
    onClick={(e) => handleLinkClick(e, brand.topic, brand.text)}
    className="group p-2.5 rounded bg-[#151517] border border-[#232326] hover:border-[#35353a] transition-colors flex flex-col justify-between"
  >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    {brand.logo}
                    <ArrowRight
    size={11}
    className="text-[#8A8A8E] opacity-0 group-hover:opacity-100 transition-opacity"
  />
                  </div>
                  <h4 className="text-xs font-semibold text-[#F5F5F5]">
                    {brand.name}
                  </h4>
                </div>
                <p className="text-[10px] text-[#8A8A8E] mt-1 line-clamp-1">
                  {brand.desc}
                </p>
              </a>)}
          </div>
        </div>

        {
    /* 4 Navigation Columns: small, sentence case */
  }
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-8 border-b border-[#232326] text-xs">
          {
    /* Column 1 */
  }
          <div className="space-y-2.5">
            <h5 className="text-xs font-semibold text-[#F5F5F5]">
              Explore
            </h5>
            <ul className="space-y-1.5 text-[#8A8A8E]">
              <li>
                <a
    href="#anime"
    onClick={(e) => handleLinkClick(e, "Anime", "Seasonal charts, characters, and manga lore.")}
    className="hover:text-[#F5F5F5] transition-colors"
  >
                  Anime & Manga
                </a>
              </li>
              <li>
                <a
    href="#gaming"
    onClick={(e) => handleLinkClick(e, "Gaming", "Walkthroughs, patch notes, and boss guides.")}
    className="hover:text-[#F5F5F5] transition-colors"
  >
                  Gaming
                </a>
              </li>
              <li>
                <a
    href="#movies"
    onClick={(e) => handleLinkClick(e, "Movies", "Episode guides and cinematic databases.")}
    className="hover:text-[#F5F5F5] transition-colors"
  >
                  Movies & TV
                </a>
              </li>
              <li>
                <a
    href="#comics"
    onClick={(e) => handleLinkClick(e, "Comics", "Comic timelines and character biographies.")}
    className="hover:text-[#F5F5F5] transition-colors"
  >
                  Comics
                </a>
              </li>
            </ul>
          </div>

          {
    /* Column 2 */
  }
          <div className="space-y-2.5">
            <h5 className="text-xs font-semibold text-[#F5F5F5]">
              Company
            </h5>
            <ul className="space-y-1.5 text-[#8A8A8E]">
              <li>
                <a
    href="#press"
    onClick={(e) => handleLinkClick(e, "Press", "Company announcements and press kits.")}
    className="hover:text-[#F5F5F5] transition-colors"
  >
                  Press
                </a>
              </li>
              <li>
                <a
    href="#careers"
    onClick={(e) => handleLinkClick(e, "Careers", "Open engineering and editorial roles.")}
    className="hover:text-[#F5F5F5] transition-colors"
  >
                  Careers
                </a>
              </li>
              <li>
                <a
    href="#contact"
    onClick={(e) => handleLinkClick(e, "Contact", "Direct staff and community inquiries.")}
    className="hover:text-[#F5F5F5] transition-colors"
  >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {
    /* Column 3 */
  }
          <div className="space-y-2.5">
            <h5 className="text-xs font-semibold text-[#F5F5F5]">
              Community
            </h5>
            <ul className="space-y-1.5 text-[#8A8A8E]">
              <li>
                <a
    href="#help"
    onClick={(e) => handleLinkClick(e, "Help", "Knowledge base and editing syntax.")}
    className="hover:text-[#F5F5F5] transition-colors"
  >
                  Help center
                </a>
              </li>
              <li>
                <a
    href="#guidelines"
    onClick={(e) => handleLinkClick(e, "Guidelines", "Community standards and moderation.")}
    className="hover:text-[#F5F5F5] transition-colors"
  >
                  Guidelines
                </a>
              </li>
              <li>
                <a
    href="#dsa"
    onClick={(e) => handleLinkClick(e, "DSA", "EU Digital Services Act compliance.")}
    className="hover:text-[#F5F5F5] transition-colors"
  >
                  Digital Services Act
                </a>
              </li>
            </ul>
          </div>

          {
    /* Column 4 */
  }
          <div className="space-y-2.5">
            <h5 className="text-xs font-semibold text-[#F5F5F5]">
              Legal
            </h5>
            <ul className="space-y-1.5 text-[#8A8A8E]">
              <li>
                <a
    href="#terms"
    onClick={(e) => handleLinkClick(e, "Terms", "User terms and contribution licensing.")}
    className="hover:text-[#F5F5F5] transition-colors"
  >
                  Terms of use
                </a>
              </li>
              <li>
                <a
    href="#privacy"
    onClick={(e) => handleLinkClick(e, "Privacy", "Privacy policy and data handling.")}
    className="hover:text-[#F5F5F5] transition-colors"
  >
                  Privacy policy
                </a>
              </li>
              <li>
                <a
    href="#cookies"
    onClick={(e) => handleLinkClick(e, "Cookies", "Manage cookie preferences.")}
    className="hover:text-[#F5F5F5] transition-colors"
  >
                  Cookie settings
                </a>
              </li>
            </ul>
          </div>
        </div>

        {
    /* Bottom Bar: Clean copyright and minimal channels */
  }
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#8A8A8E]">
          <p>&copy; 2026 Fandom, Inc. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {["Discord", "YouTube", "Twitch", "Reddit"].map((social) => <button
    key={social}
    onClick={(e) => handleLinkClick(e, social, `Official ${social} community.`)}
    className="hover:text-[#F5F5F5] transition-colors cursor-pointer"
  >
                {social}
              </button>)}
          </div>
        </div>
      </div>
    </footer>;
};
export {
  FandomFooter
};
