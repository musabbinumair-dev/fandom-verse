import { useState } from "react";
import { X, Lock, CheckCircle2, Shield } from "lucide-react";

const SignInPromptModal = ({
  isOpen,
  onClose,
  initialMode = "login",
  onSuccess,
  onOpenAdmin
}) => {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
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

  const handleAdminClick = () => {
    onClose();
    if (onOpenAdmin) {
      onOpenAdmin();
    } else {
      window.history.pushState(null, "", "/admin/dashboard");
      window.dispatchEvent(new Event("popstate"));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white border-2 border-[#F0E8DD] rounded-[20px] max-w-md w-full p-6 text-[#231C14] relative animate-in fade-in zoom-in-95 duration-150 shadow-2xl">
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
              {mode === "login" ? "Signed in successfully!" : "Account created!"}
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
              {mode === "login" ? "Sign in to FandomVerse" : "Create a FandomVerse Account"}
            </h2>

            <p className="text-xs text-[#8A7B6C] font-medium mb-5 leading-relaxed">
              Per platform access rules, visitors have browse-only permissions. Sign in to save titles to your watchlist, rate items, and join community discussions.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
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
                className="w-full h-11 mt-1 text-xs font-bold text-white bg-[#FF5F1F] hover:bg-[#E54F13] rounded-full hover:scale-102 active:scale-95 transition-all cursor-pointer shadow-xs"
              >
                {mode === "login" ? "Continue to Sign In" : "Create Free Account"}
              </button>
            </form>

            {/* Admin Panel Direct Access Button */}
            <div className="mt-4 pt-3.5 border-t border-[#F0E8DD]">
              <button
                type="button"
                onClick={handleAdminClick}
                className="w-full h-10 flex items-center justify-center gap-2 bg-[#171717] hover:bg-black text-white text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all hover:scale-101 active:scale-95 cursor-pointer shadow-sm border border-stone-800"
              >
                <Shield size={14} className="text-[#FFCC00]" />
                <span>ACCESS ADMIN PANEL</span>
              </button>
            </div>

            {/* Switch mode */}
            <div className="mt-3 text-center text-xs text-[#8A7B6C] font-medium">
              {mode === "login" ? (
                <span>
                  New to FandomVerse?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("signup")}
                    className="text-[#FF5F1F] font-bold hover:underline cursor-pointer"
                  >
                    Sign up
                  </button>
                </span>
              ) : (
                <span>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("login")}
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

export { SignInPromptModal };
