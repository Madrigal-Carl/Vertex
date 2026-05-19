import { useState } from "react";
import useAuth from "@/hooks/useAuth";

export default function Settings() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  function handleSave(e) {
    e.preventDefault();
    setError("");
    if (newPw && newPw !== confirmPw) {
      setError("New passwords do not match.");
      return;
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="min-h-screen bg-[#F0F5FA]">
      <div className="bg-[#0F2436] py-14 px-6 text-center">
        <h1 className="text-4xl font-display font-bold text-white">
          Account Settings
        </h1>
      </div>

      <div className="max-w-xl mx-auto px-6 py-10 space-y-6">
        {saved && (
          <div
            className="px-4 py-3 bg-green-50 border border-green-200 text-green-800 text-sm font-sans"
            style={{ borderRadius: "4px" }}
          >
            Settings saved successfully.
          </div>
        )}
        {error && (
          <div
            className="px-4 py-3 bg-[#E63946]/10 border border-[#E63946]/30 text-[#E63946] text-sm font-sans"
            style={{ borderRadius: "4px" }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <div
            className="bg-white p-8 border border-[#0F2436]/10"
            style={{ borderRadius: "8px" }}
          >
            <p className="font-display font-bold text-[#0F2436] text-lg mb-5 border-b border-[#F0F5FA] pb-4">
              Profile Information
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-display tracking-widest text-[#5E7386] uppercase mb-2">
                  Full Name
                </label>
                <input
                  data-testid="input-settings-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Juan Dela Cruz"
                  className="w-full border border-[#0F2436]/20 px-3 py-2.5 text-sm font-sans text-[#0F2436] focus:outline-none focus:border-[#0F2436]"
                  style={{ borderRadius: "4px" }}
                />
              </div>
              <div>
                <label className="block text-xs font-display tracking-widest text-[#5E7386] uppercase mb-2">
                  Email Address
                </label>
                <input
                  data-testid="input-settings-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full border border-[#0F2436]/20 px-3 py-2.5 text-sm font-sans text-[#0F2436] focus:outline-none focus:border-[#0F2436]"
                  style={{ borderRadius: "4px" }}
                />
              </div>
              <div>
                <label className="block text-xs font-display tracking-widest text-[#5E7386] uppercase mb-2">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <span
                    className="flex items-center px-3 bg-[#F0F5FA] border border-[#0F2436]/20 text-sm text-[#5E7386] font-sans flex-shrink-0"
                    style={{ borderRadius: "4px" }}
                  >
                    +63
                  </span>
                  <input
                    data-testid="input-settings-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9XX XXX XXXX"
                    maxLength={10}
                    className="flex-1 border border-[#0F2436]/20 px-3 py-2.5 text-sm font-sans text-[#0F2436] focus:outline-none focus:border-[#0F2436]"
                    style={{ borderRadius: "4px" }}
                  />
                </div>
                <p className="text-[10px] text-[#5E7386] mt-1.5 font-sans">
                  Used for order updates and service follow-ups.
                </p>
              </div>
            </div>
          </div>

          <div
            className="bg-white p-8 border border-[#0F2436]/10"
            style={{ borderRadius: "8px" }}
          >
            <p className="font-display font-bold text-[#0F2436] text-lg mb-5 border-b border-[#F0F5FA] pb-4">
              Change Password
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-display tracking-widest text-[#5E7386] uppercase mb-2">
                  Current Password
                </label>
                <input
                  data-testid="input-current-pw"
                  type="password"
                  value={currentPw}
                  onChange={(e) => setCurrentPw(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-[#0F2436]/20 px-3 py-2.5 text-sm font-sans text-[#0F2436] focus:outline-none focus:border-[#0F2436]"
                  style={{ borderRadius: "4px" }}
                />
              </div>
              <div>
                <label className="block text-xs font-display tracking-widest text-[#5E7386] uppercase mb-2">
                  New Password
                </label>
                <input
                  data-testid="input-new-pw"
                  type="password"
                  value={newPw}
                  onChange={(e) => setNewPw(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-[#0F2436]/20 px-3 py-2.5 text-sm font-sans text-[#0F2436] focus:outline-none focus:border-[#0F2436]"
                  style={{ borderRadius: "4px" }}
                />
              </div>
              <div>
                <label className="block text-xs font-display tracking-widest text-[#5E7386] uppercase mb-2">
                  Confirm New Password
                </label>
                <input
                  data-testid="input-confirm-pw"
                  type="password"
                  value={confirmPw}
                  onChange={(e) => setConfirmPw(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-[#0F2436]/20 px-3 py-2.5 text-sm font-sans text-[#0F2436] focus:outline-none focus:border-[#0F2436]"
                  style={{ borderRadius: "4px" }}
                />
              </div>
            </div>
          </div>

          <button
            data-testid="btn-save-settings"
            type="submit"
            className="w-full py-3 bg-[#E63946] text-white font-display tracking-widest text-sm uppercase hover:bg-[#cc2f3b] transition-colors"
            style={{ borderRadius: "4px" }}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
