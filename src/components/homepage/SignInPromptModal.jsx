import { useState, useRef } from "react";
import { X, CheckCircle2 } from "lucide-react";

const SignInPromptModal = ({
  isOpen,
  onClose,
  initialMode = "login",
  onSuccess,
  onOpenAdmin
}) => {
  const [mode, setMode] = useState(initialMode); // "login" | "signup" | "forgot" | "otp" | "reset_password"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  if (!isOpen) return null;

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-advance to next input
    if (value && index < 3) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === "forgot") {
      setMode("otp");
      return;
    }

    if (mode === "otp") {
      if (otp.join("").length < 4) {
        alert("Please enter the complete 4-digit OTP code.");
        return;
      }
      setMode("reset_password");
      return;
    }

    if (mode === "reset_password") {
      if (newPassword !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
      }
      setSuccessMsg("Password reset successfully!");
    } else if (mode === "signup") {
      setSuccessMsg("Account created successfully!");
    } else {
      setSuccessMsg("Welcome back!");
    }

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setMode("login");
      if (onSuccess) {
        onSuccess();
      }
      onClose();
    }, 1200);
  };

  const handleUserClick = () => {
    if (onSuccess) {
      onSuccess();
    }
    onClose();
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden select-none font-sans">
      {/* Full-Screen Anime Background with Dark Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-black">
        <img
          src="/src/assets/images/anime_sunset_banner_1790269825004.jpg"
          alt="Anime Background"
          className="w-full h-full object-cover object-center opacity-85 filter brightness-[0.7] scale-105"
        />
        {/* Dark Overlay ensuring high legibility of floating text & fields */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" />
      </div>

      {/* Main Content Area - NO CARD BOX, ONLY FLOATING FIELDS & TEXT */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md px-4 py-6 text-white animate-in fade-in duration-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-2 right-2 p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white transition-all cursor-pointer active:scale-90"
        >
          <X size={18} />
        </button>

        {isSubmitted ? (
          <div className="py-12 text-center space-y-3">
            <CheckCircle2 size={48} className="text-[#FF5F1F] mx-auto animate-bounce" />
            <h3 className="text-2xl font-extrabold text-white">
              {successMsg}
            </h3>
            <p className="text-xs text-slate-300 font-medium">
              Redirecting to FandomVerse...
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-md">
                {mode === "login" && "Welcome Back"}
                {mode === "signup" && "Create Account"}
                {mode === "forgot" && "Forgot Password"}
                {mode === "otp" && "Verify OTP"}
                {mode === "reset_password" && "Reset Password"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                {mode === "login" && "Log in to continue your fandom journey"}
                {mode === "signup" && "Sign up to continue your fandom journey"}
                {mode === "forgot" && "Enter your email to receive a 4-digit code"}
                {mode === "otp" && `Enter the 4-digit code sent to ${email || "your email"}`}
                {mode === "reset_password" && "Enter a new strong password for your account"}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input (Register Only) */}
              {mode === "signup" && (
                <div className="text-left">
                  <label className="text-xs font-semibold text-slate-200 block mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full h-11 px-5 rounded-full bg-white/15 border border-white/30 focus:bg-white/25 focus:border-white text-sm font-medium text-white placeholder:text-slate-300/80 shadow-sm backdrop-blur-md transition-all outline-none"
                  />
                </div>
              )}

              {/* Email Input (Login, Signup, Forgot) */}
              {(mode === "login" || mode === "signup" || mode === "forgot") && (
                <div className="text-left">
                  <label className="text-xs font-semibold text-slate-200 block mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full h-11 px-5 rounded-full bg-white/15 border border-white/30 focus:bg-white/25 focus:border-white text-sm font-medium text-white placeholder:text-slate-300/80 shadow-sm backdrop-blur-md transition-all outline-none"
                  />
                </div>
              )}

              {/* Password Input (Login, Signup) */}
              {(mode === "login" || mode === "signup") && (
                <div className="text-left">
                  <label className="text-xs font-semibold text-slate-200 block mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full h-11 px-5 rounded-full bg-white/15 border border-white/30 focus:bg-white/25 focus:border-white text-sm font-medium text-white placeholder:text-slate-300/80 shadow-sm backdrop-blur-md transition-all outline-none"
                  />
                  {mode === "login" && (
                    <div className="flex justify-end mt-1.5">
                      <button
                        type="button"
                        onClick={() => setMode("forgot")}
                        className="text-xs font-medium text-slate-300 hover:text-white hover:underline cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* OTP Confirmation Inputs */}
              {mode === "otp" && (
                <div className="py-2">
                  <label className="text-xs font-semibold text-slate-200 block mb-2 text-center">
                    4-Digit Verification Code
                  </label>
                  <div className="flex items-center justify-center gap-3">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={otpRefs[idx]}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        className="w-12 h-12 text-center text-xl font-bold rounded-2xl bg-white/15 border border-white/30 focus:bg-white/25 focus:border-white text-white shadow-sm backdrop-blur-md transition-all outline-none"
                      />
                    ))}
                  </div>
                  <div className="text-center mt-3">
                    <button
                      type="button"
                      onClick={() => alert("A new 4-digit code has been sent to your email.")}
                      className="text-xs font-medium text-slate-300 hover:text-white hover:underline cursor-pointer"
                    >
                      Didn't receive code? Resend Code
                    </button>
                  </div>
                </div>
              )}

              {/* New Password & Confirm Password Inputs */}
              {mode === "reset_password" && (
                <>
                  <div className="text-left">
                    <label className="text-xs font-semibold text-slate-200 block mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full h-11 px-5 rounded-full bg-white/15 border border-white/30 focus:bg-white/25 focus:border-white text-sm font-medium text-white placeholder:text-slate-300/80 shadow-sm backdrop-blur-md transition-all outline-none"
                    />
                  </div>
                  <div className="text-left">
                    <label className="text-xs font-semibold text-slate-200 block mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full h-11 px-5 rounded-full bg-white/15 border border-white/30 focus:bg-white/25 focus:border-white text-sm font-medium text-white placeholder:text-slate-300/80 shadow-sm backdrop-blur-md transition-all outline-none"
                    />
                  </div>
                </>
              )}

              {/* Primary Action Button */}
              <button
                type="submit"
                className="w-full h-11 sm:h-12 bg-black/80 hover:bg-black border border-white/20 text-white font-bold text-sm tracking-wide rounded-full shadow-lg transition-all cursor-pointer active:scale-98 flex items-center justify-center mt-2"
              >
                {mode === "login" && "Log In"}
                {mode === "signup" && "Sign Up"}
                {mode === "forgot" && "Send Verification Code"}
                {mode === "otp" && "Verify Code"}
                {mode === "reset_password" && "Save New Password"}
              </button>
            </form>

            {/* OR Divider (Login & Register Only) */}
            {(mode === "login" || mode === "signup") && (
              <>
                <div className="flex items-center my-4 sm:my-5 gap-3">
                  <div className="flex-1 h-px bg-white/25" />
                  <span className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">
                    OR
                  </span>
                  <div className="flex-1 h-px bg-white/25" />
                </div>

                {/* Google Login Button */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full h-11 sm:h-12 bg-white/15 border border-white/30 hover:bg-white/25 text-white font-bold text-sm rounded-full backdrop-blur-md shadow-sm transition-all cursor-pointer active:scale-98 flex items-center justify-center gap-2.5"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>
              </>
            )}

            {/* Navigation / Mode Toggle Links */}
            <div className="text-center text-xs font-semibold text-slate-300 mt-5 sm:mt-6">
              {mode === "login" && (
                <span>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("signup")}
                    className="font-bold text-white hover:underline cursor-pointer"
                  >
                    Sign up
                  </button>
                </span>
              )}

              {mode === "signup" && (
                <span>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className="font-bold text-white hover:underline cursor-pointer"
                  >
                    Log in
                  </button>
                </span>
              )}

              {(mode === "forgot" || mode === "otp" || mode === "reset_password") && (
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="font-bold text-white hover:underline cursor-pointer"
                >
                  ← Back to Log In
                </button>
              )}
            </div>

            {/* Quick Switch Row */}
            <div className="flex items-center justify-center gap-2 mt-4 text-xs font-semibold text-slate-300">
              <span className="text-slate-300">Quick switch:</span>
              <button
                type="button"
                onClick={handleUserClick}
                className="px-3.5 py-1 bg-white/15 border border-white/30 hover:bg-white/30 text-white rounded-full font-bold shadow-xs backdrop-blur-xs transition-all cursor-pointer"
              >
                User Panel
              </button>
              <button
                type="button"
                onClick={handleAdminClick}
                className="px-3.5 py-1 bg-white/15 border border-white/30 hover:bg-white/30 text-white rounded-full font-bold shadow-xs backdrop-blur-xs transition-all cursor-pointer"
              >
                Admin Panel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export { SignInPromptModal };
