import React, { useState } from 'react';
import { X, Heart, MessageSquare, Send } from 'lucide-react';
import { DiscussionItem } from '../data/fandomData';

interface DiscussionModalProps {
  discussion: DiscussionItem | null;
  isCreateMode?: boolean;
  onClose: () => void;
  onPostNewDiscussion?: (title: string, body: string, community: string) => void;
  onLike: (id: string) => void;
  isLiked: boolean;
}

export const DiscussionModal: React.FC<DiscussionModalProps> = ({
  discussion,
  isCreateMode = false,
  onClose,
  onPostNewDiscussion,
  onLike,
  isLiked,
}) => {
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState<Array<{ id: string; user: string; text: string; time: string }>>([
    {
      id: 'r-1',
      user: 'PikachuFanatic',
      text: 'The balloon texture makes so much sense since it learns Stockpile and Minimize! Love the shiny eye reflection too.',
      time: '1h ago',
    },
    {
      id: 'r-2',
      user: 'RetroGamer_2000',
      text: 'Super cute! Would love to see an animated bobbing idle sprite in this art style.',
      time: '25m ago',
    },
  ]);

  const [createTitle, setCreateTitle] = useState('');
  const [createBody, setCreateBody] = useState('');
  const [createCommunity, setCreateCommunity] = useState('Pokémon Community');

  const handleAddReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setReplies([
      ...replies,
      {
        id: `r-${Date.now()}`,
        user: 'You',
        text: replyText.trim(),
        time: 'Just now',
      },
    ]);
    setReplyText('');
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!createTitle.trim() || !createBody.trim()) return;
    if (onPostNewDiscussion) {
      onPostNewDiscussion(createTitle.trim(), createBody.trim(), createCommunity);
    }
    onClose();
  };

  if (!discussion && !isCreateMode) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 my-auto animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#fa005a]">
              {isCreateMode ? 'Start New Discussion' : discussion?.community}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Create Mode */}
        {isCreateMode ? (
          <form onSubmit={handleCreateSubmit} className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Choose Community
              </label>
              <select
                value={createCommunity}
                onChange={(e) => setCreateCommunity(e.target.value)}
                className="w-full text-xs border border-slate-300 rounded-lg p-2.5 bg-white focus:outline-none focus:border-[#fa005a]"
              >
                <option value="Pokémon Community">Pokémon Community</option>
                <option value="One Piece Community">One Piece Community</option>
                <option value="Elden Ring Community">Elden Ring Community</option>
                <option value="Star Wars Community">Star Wars Community</option>
                <option value="General Fandomverse Hub">General Fandomverse Hub</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Discussion Title
              </label>
              <input
                type="text"
                required
                value={createTitle}
                onChange={(e) => setCreateTitle(e.target.value)}
                placeholder="What would you like to discuss or share?"
                className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:border-[#fa005a]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Your Post & Details
              </label>
              <textarea
                required
                rows={5}
                value={createBody}
                onChange={(e) => setCreateBody(e.target.value)}
                placeholder="Share your theories, artwork, character analysis, or question for fellow fans..."
                className="w-full text-xs border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:border-[#fa005a]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold bg-[#fa005a] hover:bg-[#e00050] text-white rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Send size={13} />
                <span>Publish to Community</span>
              </button>
            </div>
          </form>
        ) : (
          /* View Discussion Mode with Real Picture */
          <div className="p-5 sm:p-6 overflow-y-auto flex-1">
            {/* Thread Header */}
            <div className="flex items-start gap-3.5 mb-4">
              <div className="shrink-0 w-16 h-16 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-xs">
                <img
                  src={discussion?.thumbnail}
                  alt={discussion?.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                  {discussion?.title}
                </h3>
                <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-500">
                  <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center font-bold text-[10px] text-slate-700">
                    {discussion?.author[0].toUpperCase()}
                  </div>
                  <span className="font-semibold text-slate-700">{discussion?.author}</span>
                  <span>•</span>
                  <span>{discussion?.timeAgo}</span>
                </div>
              </div>
            </div>

            {/* Post Content */}
            <div className="bg-slate-50/80 rounded-xl p-4 text-xs sm:text-sm text-slate-800 leading-relaxed border border-slate-100 mb-5">
              {discussion?.body}
            </div>

            {/* Like and Stats action */}
            <div className="flex items-center justify-between py-2 border-b border-slate-100 mb-5 text-xs">
              <button
                onClick={() => discussion && onLike(discussion.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                  isLiked
                    ? 'bg-rose-50 text-[#fa005a]'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Heart size={14} fill={isLiked ? '#fa005a' : 'none'} />
                <span>{(discussion?.likes || 0) + (isLiked ? 1 : 0)} Likes</span>
              </button>

              <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                <MessageSquare size={14} />
                <span>{replies.length} Replies</span>
              </div>
            </div>

            {/* Replies List */}
            <div className="space-y-3 mb-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Thread Replies
              </h4>
              {replies.map((r) => (
                <div key={r.id} className="p-3 bg-white rounded-lg border border-slate-100 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-800">{r.user}</span>
                    <span className="text-[10px] text-slate-400">{r.time}</span>
                  </div>
                  <p className="text-slate-600">{r.text}</p>
                </div>
              ))}
            </div>

            {/* Post Reply */}
            <form onSubmit={handleAddReply} className="flex gap-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply to the author..."
                className="flex-1 text-xs border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#fa005a]"
              />
              <button
                type="submit"
                disabled={!replyText.trim()}
                className="bg-[#fa005a] hover:bg-[#e00050] disabled:opacity-40 text-white text-xs font-bold px-4 py-2.5 rounded-lg flex items-center gap-1 transition-colors"
              >
                <Send size={13} />
                <span>Reply</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
