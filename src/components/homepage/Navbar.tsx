import React from 'react';
import { Search } from 'lucide-react';
import { CategoryChips } from './CategoryChips';

interface NavbarProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAuth,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <header className="w-full bg-[#FFFDF7] border-b-2 border-[#F0E8DD] sticky top-0 z-40 select-none">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <a href="/" className="flex items-center gap-1.5 text-xl tracking-tight hover:scale-105 transition-transform">
            <span className="font-titan text-[#231C14]">FANDOM</span>
            <span className="font-titan text-[#FF5F1F]">VERSE</span>
          </a>
        </div>

        {/* Search Bar - fully rounded */}
        <div className="flex-1 max-w-lg mx-auto hidden sm:block">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A7B6C] pointer-events-none"
            />
            <input
              type="text"
              readOnly
              placeholder="Search anime, games, movies, characters..."
              onClick={() => onOpenAuth('login')}
              className="w-full h-10 pl-11 pr-4 bg-white border-2 border-[#F0E8DD] text-xs font-semibold text-[#231C14] placeholder-[#8A7B6C] rounded-full focus:outline-none focus:border-[#FF5F1F] focus:ring-2 focus:ring-[#FF5F1F]/20 cursor-pointer hover:border-[#FF5F1F]/50 transition-colors"
            />
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => onOpenAuth('login')}
            className="h-10 px-4 text-xs font-bold text-[#231C14] hover:text-[#FF5F1F] bg-transparent border-2 border-[#F0E8DD] hover:border-[#FF5F1F] rounded-full hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            Log in
          </button>
          <button
            type="button"
            onClick={() => onOpenAuth('signup')}
            className="h-10 px-5 text-xs font-bold text-white bg-[#FF5F1F] hover:bg-[#E54F13] rounded-full hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            Sign up
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Category Pill Strip Below Nav */}
      <div className="border-t-2 border-[#F0E8DD] bg-[#FFFDF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <CategoryChips
            selectedCategory={selectedCategory}
            onSelectCategory={onSelectCategory}
          />
        </div>
      </div>
    </header>
  );
};

