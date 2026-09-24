import React from 'react';
import { X, ExternalLink, ShieldCheck, Heart } from 'lucide-react';
import { FandomFlameIcon } from './FandomArt';

interface FooterInfoModalProps {
  info: { title: string; text: string } | null;
  onClose: () => void;
}

export const FooterInfoModal: React.FC<FooterInfoModalProps> = ({ info, onClose }) => {
  if (!info) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <FandomFlameIcon size={20} />
            <h3 className="font-bold text-slate-900 text-base">{info.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded-full text-slate-500 hover:text-slate-800"
          >
            <X size={18} />
          </button>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          {info.text}
        </p>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-xs text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-600" />
            <span>Official Fandomverse Documentation & Verification</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#fa005a] hover:bg-[#e00050] text-white font-semibold rounded-lg text-xs transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
