import React, { useState } from 'react';
import { X, Lock, CheckCircle2 } from 'lucide-react';

interface SignInPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
  onSuccess?: () => void;
}

export const SignInPromptModal: React.FC<SignInPromptModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      if (onSuccess) {
        onSuccess();
      }
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white border-2 border-[#F0E8DD] rounded-[20px] max-w-md w-full p-6 text-[#231C14] relative animate-in fade-in zoom-in-95 duration-150">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-[#8A7B6C] hover:text-[#231C14] hover:bg-[#FFFDF7] border border-[#F0E8DD] transition-all hover:scale-105 cursor-pointer"
        >
          <X size={16} />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 size={40} className="text-[#FF5F1F] mx-auto animate-bounce" />
            <h3 className="text-lg font-bold text-[#231C14]">
              {mode === 'login' ? 'Signed in successfully!' : 'Account created!'}
            </h3>
            <p className="text-xs text-[#8A7B6C] font-medium">
              Switching from Visitor to Member role...
            </p>
          </div>
        ) : (
          <>
            {/* Header with Visitor Role Indicator */}
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 rounded-full bg-[#FF5F1F]/10 text-[#FF5F1F]">
                <Lock size={14} />
              </span>
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#FF5F1F]">
                Visitor Access Notice
              </span>
            </div>

            <h2 className="text-xl font-titan uppercase text-[#231C14] mb-1">
              {mode === 'login' ? 'Sign in to FandomVerse' : 'Create a FandomVerse Account'}
            </h2>

            <p className="text-xs text-[#8A7B6C] font-medium mb-6 leading-relaxed">
              Per platform access rules, visitors have browse-only permissions. Sign in to save titles to your watchlist, rate items, and join community discussions.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#231C14] block mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="fan@fandomverse.com"
                  className="w-full h-10 px-3.5 bg-[#FFFDF7] border-2 border-[#F0E8DD] text-xs font-medium text-[#231C14] placeholder-[#8A7B6C] rounded-xl focus:outline-none focus:border-[#FF5F1F] focus:bg-white focus:ring-2 focus:ring-[#FF5F1F]/20"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#231C14] block mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-10 px-3.5 bg-[#FFFDF7] border-2 border-[#F0E8DD] text-xs font-medium text-[#231C14] placeholder-[#8A7B6C] rounded-xl focus:outline-none focus:border-[#FF5F1F] focus:bg-white focus:ring-2 focus:ring-[#FF5F1F]/20"
                />
              </div>

              <button
                type="submit"
                className="w-full h-11 mt-2 text-xs font-bold text-white bg-[#FF5F1F] hover:bg-[#E54F13] rounded-full hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                {mode === 'login' ? 'Continue to Sign In' : 'Create Free Account'}
              </button>
            </form>

            {/* Switch mode */}
            <div className="mt-4 pt-4 border-t-2 border-[#F0E8DD] text-center text-xs text-[#8A7B6C] font-medium">
              {mode === 'login' ? (
                <span>
                  New to FandomVerse?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className="text-[#FF5F1F] font-bold hover:underline cursor-pointer"
                  >
                    Sign up
                  </button>
                </span>
              ) : (
                <span>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-[#FF5F1F] font-bold hover:underline cursor-pointer"
                  >
                    Log in
                  </button>
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

