import React, { useState } from 'react';
import { 
  Swords, 
  Layers, 
  Egg, 
  ListOrdered, 
  GitFork, 
  Compass, 
  ExternalLink, 
  X,
  Play
} from 'lucide-react';

interface ToolItem {
  id: string;
  title: string;
  tagline: string;
  category: string;
  badge?: string;
  image: string;
  description: string;
}

export const FANDOM_TOOLS: ToolItem[] = [
  {
    id: 'resonance-clash',
    title: 'Resonance Clash',
    tagline: 'Pick two Wuthering Waves Resonators, compare their stats, and simulate an Arena battle to see who comes out on top.',
    category: 'Gaming Simulator',
    badge: 'ARENA SIM',
    image: '/src/assets/images/halo_master_chief_1790180155350.jpg',
    description: 'Stat calculator and damage multiplier comparison engine for Wuthering Waves characters including Jiyan, Yinlin, and Changli.',
  },
  {
    id: 'shindo-life',
    title: 'Shindo Life Build Maker',
    tagline: 'Plan your Shindo Life loadout: pick bloodlines, elements, and moves, check for GCD conflicts, and share your build via link.',
    category: 'Build Planner',
    badge: 'PLAN YOUR BUILD',
    image: '/src/assets/images/sledgehammer_red_game_1790180174083.jpg',
    description: 'Optimize sub-abilities, companion synergies, and global cooldown timers for Roblox Shindo Life competitive PvP.',
  },
  {
    id: 'steal-an-egg',
    title: 'Steal An Egg Pet Index',
    tagline: 'A Pet Index guide for the Roblox game Steal An Egg — browse all pets and eggs by biome and rarity, track which ones you\'ve collected.',
    category: 'Database & Tracker',
    badge: 'COLLECTION TRACKER',
    image: '/src/assets/images/pokeball_real_render_1790180829855.jpg',
    description: 'Complete drop rates, hatching probabilities, secret multipliers, and biome maps for all collectible pets.',
  },
  {
    id: 'tier-list-maker',
    title: 'Tier List Maker',
    tagline: 'Create, rank, and share! Drag-and-drop tier lists for any Fandom in seconds, share your rankings with the world.',
    category: 'Community Tool',
    badge: 'S A B C D',
    image: '/src/assets/images/one_piece_luffy_1790180189080.jpg',
    description: 'Preloaded with anime power scalers, Pokémon competitive tiers, Elden Ring weapon rankings, and movie franchises.',
  },
  {
    id: 'vtmb2-planner',
    title: 'VTMB2 Build Planner',
    tagline: 'Plan your Bloodlines 2 build on an interactive skill tree: order unlocks, track AP, Blood Resonance and trainer visits, and share builds via link.',
    category: 'Skill Tree',
    badge: 'SKILL TREE',
    image: '/src/assets/images/elden_ring_tarnished_1790180785046.jpg',
    description: 'Vampire: The Masquerade – Bloodlines 2 clan discipline matrix, feeding affinities, and social stealth trees.',
  },
  {
    id: 'warp-factor',
    title: 'Warp Factor',
    tagline: 'Find the shortest connection path between any two Star Trek characters through shared episode appearances.',
    category: 'Six Degrees Game',
    badge: 'PLAY DAILY',
    image: '/src/assets/images/christina_chong_dog_1790180818784.jpg',
    description: 'Six Degrees of the Federation — test your Star Trek canon trivia by linking Picard, Spock, Janeway, and La\'an Noonien-Singh.',
  },
];

interface UtilitiesViewProps {
  onBackToHome: () => void;
  onOpenToolModal: (tool: ToolItem) => void;
}

export const UtilitiesView: React.FC<UtilitiesViewProps> = ({
  onBackToHome,
  onOpenToolModal,
}) => {
  return (
    <div className="py-2">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Fandomverse Utilities & Tools
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Interactive calculators, build planners, pet indexes, and community games
          </p>
        </div>
        <button
          onClick={onBackToHome}
          className="text-xs font-semibold text-[#fa005a] hover:underline"
        >
          Back to Feed
        </button>
      </div>

      {/* Grid of 6 Tools matching Screenshot_20260923-211251.png */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {FANDOM_TOOLS.map((tool) => (
          <div
            key={tool.id}
            onClick={() => onOpenToolModal(tool)}
            className="group bg-white rounded-xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            {/* Visual Header */}
            <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden">
              <img
                src={tool.image}
                alt={tool.title}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

              {/* Badge top right like PLAN YOUR BUILD */}
              {tool.badge && (
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-slate-900 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow-sm">
                  {tool.badge}
                </div>
              )}

              {/* Title overlay at bottom of image */}
              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-[10px] font-bold text-[#fa005a] uppercase tracking-wider bg-black/60 px-1.5 py-0.5 rounded">
                  {tool.category}
                </span>
                <h3 className="text-base font-bold text-white mt-1 drop-shadow-sm group-hover:text-pink-200 transition-colors">
                  {tool.title}
                </h3>
              </div>
            </div>

            {/* Description Body */}
            <div className="p-3.5 flex-1 flex flex-col justify-between">
              <p className="text-xs text-slate-600 leading-relaxed">
                {tool.tagline}
              </p>

              <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-100 text-xs">
                <span className="text-[11px] text-slate-400 font-medium">Free interactive tool</span>
                <span className="text-xs font-bold text-[#fa005a] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Launch Tool &rarr;
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
