import React from 'react';
import { X, ChevronDown, Share2, Bookmark, MoreVertical, Wifi, BatteryCharging } from 'lucide-react';

interface MobileBrowserBarProps {
  onClose?: () => void;
  isSaved?: boolean;
  onToggleSave?: () => void;
  onShare?: () => void;
}

export const MobileBrowserBar: React.FC<MobileBrowserBarProps> = ({
  onClose,
  isSaved = false,
  onToggleSave,
  onShare,
}) => {
  return (
    <div className="bg-[#121214] text-white select-none shrink-0 border-b border-white/10">
      {/* Top Phone Status Bar (Time, Wifi, Battery) */}
      <div className="flex items-center justify-between px-6 pt-2 pb-1 text-xs font-semibold tracking-tight">
        <span>9:11</span>
        <div className="flex items-center gap-2">
          {/* Signal bars */}
          <div className="flex items-end gap-0.5 h-3">
            <span className="w-0.5 h-1.5 bg-white rounded-xs" />
            <span className="w-0.5 h-2 bg-white rounded-xs" />
            <span className="w-0.5 h-2.5 bg-white rounded-xs" />
            <span className="w-0.5 h-3 bg-white/40 rounded-xs" />
          </div>
          <Wifi size={13} />
          {/* Battery 44% with charging bolt */}
          <div className="flex items-center gap-1 bg-green-500/20 text-emerald-400 px-1.5 py-0.5 rounded text-[11px] font-bold">
            <span>44</span>
            <BatteryCharging size={13} />
          </div>
        </div>
      </div>

      {/* Browser Navigation Row */}
      <div className="flex items-center justify-between px-4 py-2">
        {/* Left actions: Close X and Down Chevron */}
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
            title="Close"
          >
            <X size={20} />
          </button>
          <button
            className="text-white/80 hover:text-white transition-colors"
            title="Expand"
          >
            <ChevronDown size={20} />
          </button>
        </div>

        {/* Center: Title and domain */}
        <div className="flex flex-col items-center max-w-[160px] truncate">
          <span className="text-sm font-semibold text-white truncate">
            Personal Homep...
          </span>
          <span className="text-[11px] text-white/60 tracking-tight">
            fandomverse.com
          </span>
        </div>

        {/* Right actions: Share, Bookmark, More */}
        <div className="flex items-center gap-4">
          <button
            onClick={onShare}
            className="text-white/80 hover:text-white transition-colors"
            title="Share Page"
          >
            <Share2 size={19} />
          </button>
          <button
            onClick={onToggleSave}
            className={`transition-colors ${
              isSaved ? 'text-[#fa005a]' : 'text-white/80 hover:text-white'
            }`}
            title="Bookmark"
          >
            <Bookmark size={19} fill={isSaved ? '#fa005a' : 'none'} />
          </button>
          <button
            className="text-white/80 hover:text-white transition-colors"
            title="Menu"
          >
            <MoreVertical size={19} />
          </button>
        </div>
      </div>
    </div>
  );
};
