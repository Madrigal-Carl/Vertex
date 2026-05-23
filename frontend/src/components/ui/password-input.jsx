import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput({
  name,
  value,
  onChange,
  placeholder = "••••••••",
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-[#0F2436]/20 px-3 py-2.5 pr-10 text-sm font-sans text-[#0F2436] placeholder-[#5E7386]/50 focus:outline-none focus:border-[#0F2436] transition-colors"
        style={{ borderRadius: "4px" }}
      />

      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5E7386] hover:text-[#0F2436]"
      >
        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
}
