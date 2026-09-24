import React from 'react';

interface FooterProps {
  onOpenInfo: (title: string, desc: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInfo }) => {
  return (
    <footer className="w-full bg-[#FFFDF7] border-t-2 border-[#F0E8DD] mt-16 py-12 px-4 sm:px-6 select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo (left) */}
        <div className="flex items-center gap-2">
          <span className="font-titan text-lg tracking-tight text-[#231C14]">
            FANDOM<span className="text-[#FF5F1F]">VERSE</span>
          </span>
          <span className="text-xs text-[#8A7B6C] font-medium hidden sm:inline-block">
            — Entertainment Fan Platform
          </span>
        </div>

        {/* Nav Links (About, Categories, Feedback) */}
        <div className="flex items-center gap-6 text-xs font-bold text-[#8A7B6C]">
          <button
            type="button"
            onClick={() =>
              onOpenInfo(
                'About FandomVerse',
                'FandomVerse is a dedicated entertainment platform uniting fans across anime, gaming, television, cinema, comics, and pop culture.'
              )
            }
            className="hover:text-[#FF5F1F] transition-colors cursor-pointer"
          >
            About
          </button>
          <button
            type="button"
            onClick={() =>
              onOpenInfo(
                'Fandom Categories',
                'Browse curated community hubs spanning Anime, Video Games, Films, Television, K-Pop, Comics, Manga, and Cosplay.'
              )
            }
            className="hover:text-[#FF5F1F] transition-colors cursor-pointer"
          >
            Categories
          </button>
          <button
            type="button"
            onClick={() =>
              onOpenInfo(
                'Community Feedback',
                'Share your suggestions, report issues, or propose new fandom hubs directly to our community team.'
              )
            }
            className="hover:text-[#FF5F1F] transition-colors cursor-pointer"
          >
            Feedback
          </button>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-2.5">
          {/* Discord */}
          <a
            href="#discord"
            onClick={(e) => {
              e.preventDefault();
              onOpenInfo('Discord Community', 'Join our official Discord server for real-time discussion and watch parties.');
            }}
            aria-label="Discord"
            className="w-9 h-9 rounded-full bg-white border-2 border-[#F0E8DD] hover:border-[#FF5F1F] text-[#8A7B6C] hover:text-[#FF5F1F] flex items-center justify-center transition-all hover:scale-105"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.009c.12.098.246.195.373.288a.077.077 0 0 1-.006.127c-.598.35-1.22.648-1.873.891a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
          </a>

          {/* X / Twitter */}
          <a
            href="#twitter"
            onClick={(e) => {
              e.preventDefault();
              onOpenInfo('X / Twitter', 'Follow @FandomVerse for breaking news and community announcements.');
            }}
            aria-label="X"
            className="w-9 h-9 rounded-full bg-white border-2 border-[#F0E8DD] hover:border-[#FF5F1F] text-[#8A7B6C] hover:text-[#FF5F1F] flex items-center justify-center transition-all hover:scale-105"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>

          {/* YouTube */}
          <a
            href="#youtube"
            onClick={(e) => {
              e.preventDefault();
              onOpenInfo('YouTube Channel', 'Watch official trailers, lore breakdowns, and episode discussions on our YouTube channel.');
            }}
            aria-label="YouTube"
            className="w-9 h-9 rounded-full bg-white border-2 border-[#F0E8DD] hover:border-[#FF5F1F] text-[#8A7B6C] hover:text-[#FF5F1F] flex items-center justify-center transition-all hover:scale-105"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t-2 border-[#F0E8DD] text-center sm:text-left text-xs text-[#8A7B6C] font-medium">
        <p>© 2026 FandomVerse. All rights reserved. Created for entertainment communities worldwide.</p>
      </div>
    </footer>
  );
};

