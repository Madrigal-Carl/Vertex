import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";

export default function AuthPage() {
  const [tab, setTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const { location } = useLocation();
  const { navigate } = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // sample role logic
    let role = "customer";

    if (email === "admin@vertex.com") {
      role = "admin";
    } else if (email === "cashier@vertex.com") {
      role = "cashier";
    } else if (email === "tech@vertex.com") {
      role = "technician";
    }

    login({
      fullname: email.split("@")[0],
      email,
      role,
    });

    navigate("/");
  }

  function handleRegister(e) {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirm) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    login({
      fullname: name,
      email,
      role: "customer",
    });

    navigate("/");
  }

  function handleGoogle() {
    login({
      fullname: "Google User",
      email: "googleuser@gmail.com",
      role: "customer",
    });

    navigate("/");
  }

  return (
    <div className="min-h-screen bg-[#F0F5FA] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div
              className="w-12 h-12 bg-[#E63946] flex items-center justify-center"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 65%, 65% 100%, 0 100%)",
              }}
            >
              <span className="font-display font-bold text-white text-2xl">
                V
              </span>
            </div>
            <span className="font-display font-bold tracking-[0.12em] text-2xl text-[#0F2436] uppercase">
              Vertex
            </span>
          </div>
          <p className="text-[#5E7386] text-sm font-sans">
            {tab === "login"
              ? "Welcome back — sign in to continue."
              : "Create your Vertex account."}
          </p>
        </div>

        <div
          className="bg-white border border-[#0F2436]/10 p-8"
          style={{ borderRadius: "8px" }}
        >
          {/* Tab Toggle */}
          <div className="flex mb-8 border-b border-[#F0F5FA]">
            {["login", "register"].map((t) => (
              <button
                key={t}
                data-testid={`tab-${t}`}
                onClick={() => {
                  setTab(t);
                  setError("");
                }}
                className={`flex-1 py-3 font-display tracking-widest text-xs uppercase transition-all border-b-2 -mb-px ${
                  tab === t
                    ? "border-[#E63946] text-[#E63946]"
                    : "border-transparent text-[#5E7386] hover:text-[#0F2436]"
                }`}
              >
                {t === "login" ? "Sign In" : "Register"}
              </button>
            ))}
          </div>

          {error && (
            <div
              className="mb-4 px-4 py-3 bg-[#E63946]/10 border border-[#E63946]/30 text-[#E63946] text-sm font-sans"
              style={{ borderRadius: "4px" }}
            >
              {error}
            </div>
          )}

          {tab === "login" ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-display tracking-widest text-[#5E7386] uppercase mb-2">
                  Email
                </label>
                <input
                  data-testid="input-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full border border-[#0F2436]/20 px-3 py-2.5 text-sm font-sans text-[#0F2436] placeholder-[#5E7386]/50 focus:outline-none focus:border-[#0F2436] transition-colors"
                  style={{ borderRadius: "4px" }}
                />
              </div>
              <div>
                <label className="block text-xs font-display tracking-widest text-[#5E7386] uppercase mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    data-testid="input-password"
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full border border-[#0F2436]/20 px-3 py-2.5 pr-10 text-sm font-sans text-[#0F2436] placeholder-[#5E7386]/50 focus:outline-none focus:border-[#0F2436] transition-colors"
                    style={{ borderRadius: "4px" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5E7386] hover:text-[#0F2436]"
                  >
                    {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                <button
                  type="button"
                  className="mt-1 text-xs text-[#5E7386] hover:text-[#E63946] transition-colors font-sans"
                >
                  Forgot password?
                </button>
              </div>
              <button
                data-testid="btn-signin"
                type="submit"
                className="w-full py-3 bg-[#E63946] text-white font-display tracking-widest text-sm uppercase hover:bg-[#cc2f3b] transition-colors mt-2"
                style={{ borderRadius: "4px" }}
              >
                Sign In
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-display tracking-widest text-[#5E7386] uppercase mb-2">
                  Full Name
                </label>
                <input
                  data-testid="input-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Juan Dela Cruz"
                  className="w-full border border-[#0F2436]/20 px-3 py-2.5 text-sm font-sans text-[#0F2436] placeholder-[#5E7386]/50 focus:outline-none focus:border-[#0F2436] transition-colors"
                  style={{ borderRadius: "4px" }}
                />
              </div>
              <div>
                <label className="block text-xs font-display tracking-widest text-[#5E7386] uppercase mb-2">
                  Email
                </label>
                <input
                  data-testid="input-reg-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full border border-[#0F2436]/20 px-3 py-2.5 text-sm font-sans text-[#0F2436] placeholder-[#5E7386]/50 focus:outline-none focus:border-[#0F2436] transition-colors"
                  style={{ borderRadius: "4px" }}
                />
              </div>
              <div>
                <label className="block text-xs font-display tracking-widest text-[#5E7386] uppercase mb-2">
                  Password
                </label>
                <input
                  data-testid="input-reg-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-[#0F2436]/20 px-3 py-2.5 text-sm font-sans text-[#0F2436] placeholder-[#5E7386]/50 focus:outline-none focus:border-[#0F2436] transition-colors"
                  style={{ borderRadius: "4px" }}
                />
              </div>
              <div>
                <label className="block text-xs font-display tracking-widest text-[#5E7386] uppercase mb-2">
                  Confirm Password
                </label>
                <input
                  data-testid="input-confirm-password"
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-[#0F2436]/20 px-3 py-2.5 text-sm font-sans text-[#0F2436] placeholder-[#5E7386]/50 focus:outline-none focus:border-[#0F2436] transition-colors"
                  style={{ borderRadius: "4px" }}
                />
              </div>
              <button
                data-testid="btn-register"
                type="submit"
                className="w-full py-3 bg-[#E63946] text-white font-display tracking-widest text-sm uppercase hover:bg-[#cc2f3b] transition-colors mt-2"
                style={{ borderRadius: "4px" }}
              >
                Create Account
              </button>
            </form>
          )}

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#F0F5FA]" />
            <span className="text-xs text-[#5E7386] font-sans uppercase tracking-widest">
              or
            </span>
            <div className="flex-1 h-px bg-[#F0F5FA]" />
          </div>

          <button
            data-testid="btn-google"
            onClick={handleGoogle}
            className="w-full py-3 border border-[#0F2436]/20 flex items-center justify-center gap-3 text-[#0F2436] font-sans text-sm hover:bg-[#F0F5FA] transition-colors"
            style={{ borderRadius: "4px" }}
          >
            <FcGoogle className="text-[#4285F4] w-6 h-6" />
            {tab === "login" ? "Sign in with Google" : "Sign up with Google"}
          </button>
        </div>
      </div>
    </div>
  );
}
