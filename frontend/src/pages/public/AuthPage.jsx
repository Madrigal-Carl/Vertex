import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import PasswordInput from "@/components/ui/password-input";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { GoogleLogin } from "@react-oauth/google";

export default function AuthPage() {
  const navigate = useNavigate();
  const { login, register, googleLogin } = useAuth();

  const [tab, setTab] = useState("login");
  const [error, setError] = useState("");

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleLoginChange(e) {
    setLoginForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleRegisterChange(e) {
    setRegisterForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleLogin(e) {
    e.preventDefault();

    setError("");

    try {
      await login(loginForm);

      navigate("/");
    } catch (err) {
      setError(getErrorMessage(err, "Login failed"));
    }
  }

  async function handleRegister(e) {
    e.preventDefault();

    setError("");

    const { email, password, confirmPassword } = registerForm;

    if (password !== confirmPassword) {
      setError("Passwords do not match");

      return;
    }

    try {
      const response = await register({
        email,
        password,
      });

      setTab("login");
    } catch (err) {
      setError(getErrorMessage(err, "Register failed"));
    }
  }

  return (
    <div className="min-h-screen bg-[#F0F5FA] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Header */}
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

        {/* Card */}
        <div
          className="bg-white border border-[#0F2436]/10 p-8"
          style={{ borderRadius: "8px" }}
        >
          {/* Tabs */}
          <div className="flex mb-8 border-b border-[#F0F5FA]">
            {["login", "register"].map((t) => (
              <button
                key={t}
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

          {/* Error */}
          {error && (
            <div
              className="mb-4 px-4 py-3 bg-[#E63946]/10 border border-[#E63946]/30 text-[#E63946] text-sm font-sans"
              style={{ borderRadius: "4px" }}
            >
              {error}
            </div>
          )}

          {/* Login Form */}
          {tab === "login" ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-display tracking-widest text-[#5E7386] uppercase mb-2">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  placeholder="you@example.com"
                  className="w-full border border-[#0F2436]/20 px-3 py-2.5 text-sm font-sans text-[#0F2436] placeholder-[#5E7386]/50 focus:outline-none focus:border-[#0F2436] transition-colors"
                  style={{ borderRadius: "4px" }}
                />
              </div>

              <div>
                <label className="block text-xs font-display tracking-widest text-[#5E7386] uppercase mb-2">
                  Password
                </label>

                <PasswordInput
                  key="login-password"
                  name="password"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                />

                <button
                  type="button"
                  className="mt-1 text-xs text-[#5E7386] hover:text-[#E63946] transition-colors font-sans"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#E63946] text-white font-display tracking-widest text-sm uppercase hover:bg-[#cc2f3b] transition-colors mt-2"
                style={{ borderRadius: "4px" }}
              >
                Sign In
              </button>
            </form>
          ) : (
            /* Register Form */
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-display tracking-widest text-[#5E7386] uppercase mb-2">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={registerForm.email}
                  onChange={handleRegisterChange}
                  placeholder="you@example.com"
                  className="w-full border border-[#0F2436]/20 px-3 py-2.5 text-sm font-sans text-[#0F2436] placeholder-[#5E7386]/50 focus:outline-none focus:border-[#0F2436] transition-colors"
                  style={{ borderRadius: "4px" }}
                />
              </div>

              <div>
                <label className="block text-xs font-display tracking-widest text-[#5E7386] uppercase mb-2">
                  Password
                </label>

                <PasswordInput
                  key="register-password"
                  name="password"
                  value={registerForm.password}
                  onChange={handleRegisterChange}
                />
              </div>

              <div>
                <label className="block text-xs font-display tracking-widest text-[#5E7386] uppercase mb-2">
                  Confirm Password
                </label>

                <PasswordInput
                  key="confirm-password"
                  name="confirmPassword"
                  value={registerForm.confirmPassword}
                  onChange={handleRegisterChange}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#E63946] text-white font-display tracking-widest text-sm uppercase hover:bg-[#cc2f3b] transition-colors mt-2"
                style={{ borderRadius: "4px" }}
              >
                Create Account
              </button>
            </form>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#F0F5FA]" />

            <span className="text-xs text-[#5E7386] font-sans uppercase tracking-widest">
              or
            </span>

            <div className="flex-1 h-px bg-[#F0F5FA]" />
          </div>

          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              try {
                await googleLogin(credentialResponse.credential);

                navigate("/");
              } catch (err) {
                setError(getErrorMessage(err, "Google login failed"));
              }
            }}
            onError={() => {
              setError("Google login failed");
            }}
          />
        </div>
      </div>
    </div>
  );
}
