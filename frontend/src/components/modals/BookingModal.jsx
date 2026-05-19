import { useState } from "react";
import { X, CalendarCheck } from "lucide-react";

export default function BookingModal({ service, onClose }) {
  const [form, setForm] = useState({
    contact: "",
    date: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.contact.trim() || !form.date) return;
    setSubmitted(true);
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div
        className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto"
        style={{ borderRadius: "8px" }}
      >
        <div
          className="flex items-center justify-between px-6 py-4 border-b border-[#F0F5FA] bg-[#0F2436]"
          style={{ borderRadius: "8px 8px 0 0" }}
        >
          <div>
            <h3 className="font-display font-bold text-white tracking-wide">
              Book a Service
            </h3>
            <p className="text-white/50 text-xs mt-0.5">{service}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {submitted ? (
          <div className="px-6 py-12 text-center">
            <div
              className="w-16 h-16 bg-[#0F2436] flex items-center justify-center mx-auto mb-4"
              style={{ borderRadius: "50%" }}
            >
              <CalendarCheck size={28} className="text-[#E63946]" />
            </div>
            <h4 className="font-display font-bold text-[#0F2436] text-xl mb-2">
              Booking Received!
            </h4>
            <p className="text-[#5E7386] text-sm font-sans leading-relaxed mb-1">
              We'll send you a confirmation via{" "}
              <span className="text-[#0F2436] font-semibold">SMS or email</span>{" "}
              within 24 hours.
            </p>
            <p className="text-[#5E7386] text-sm font-sans leading-relaxed">
              Our team will follow up to finalize your schedule and any
              additional details needed.
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-8 py-2.5 bg-[#E63946] text-white font-display tracking-widest text-xs uppercase hover:bg-[#cc2f3b] transition-colors"
              style={{ borderRadius: "4px" }}
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
            <div>
              <label className="block text-xs font-display tracking-widest text-[#5E7386] uppercase mb-2">
                Phone / Email
              </label>
              <input
                required
                value={form.contact}
                onChange={(e) =>
                  setForm((f) => ({ ...f, contact: e.target.value }))
                }
                placeholder="+63 9XX XXX XXXX or email@example.com"
                className="w-full border border-[#0F2436]/20 px-3 py-2.5 text-sm font-sans text-[#0F2436] focus:outline-none focus:border-[#0F2436]"
                style={{ borderRadius: "4px" }}
              />
            </div>
            <div>
              <label className="block text-xs font-display tracking-widest text-[#5E7386] uppercase mb-2">
                Preferred Date
              </label>
              <input
                required
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm((f) => ({ ...f, date: e.target.value }))
                }
                className="w-full border border-[#0F2436]/20 px-3 py-2.5 text-sm font-sans text-[#0F2436] focus:outline-none focus:border-[#0F2436]"
                style={{ borderRadius: "4px" }}
              />
            </div>
            <div>
              <label className="block text-xs font-display tracking-widest text-[#5E7386] uppercase mb-2">
                Notes{" "}
                <span className="normal-case font-sans tracking-normal">
                  (optional)
                </span>
              </label>
              <textarea
                value={form.notes}
                onChange={(e) =>
                  setForm((f) => ({ ...f, notes: e.target.value }))
                }
                placeholder="Describe your issue or any additional details..."
                rows={3}
                className="w-full border border-[#0F2436]/20 px-3 py-2.5 text-sm font-sans text-[#0F2436] focus:outline-none focus:border-[#0F2436] resize-none"
                style={{ borderRadius: "4px" }}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#E63946] text-white font-display tracking-widest text-sm uppercase hover:bg-[#cc2f3b] transition-colors"
              style={{ borderRadius: "4px" }}
            >
              Confirm Booking
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
