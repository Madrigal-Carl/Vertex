import { useState } from "react";
import { X, Star } from "lucide-react";
import StarRating from "@/components/public/StarRating";

export default function ReviewModal({ onClose }) {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (rating === 0 || !message.trim()) return;
    setSubmitted(true);
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md" style={{ borderRadius: "8px" }}>
        <div
          className="flex items-center justify-between px-6 py-4 border-b border-[#F0F5FA] bg-[#0F2436]"
          style={{ borderRadius: "8px 8px 0 0" }}
        >
          <h3 className="font-display font-bold text-white tracking-wide">
            Leave a Review
          </h3>
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
              <Star size={28} className="text-[#E63946] fill-[#E63946]" />
            </div>
            <h4 className="font-display font-bold text-[#0F2436] text-xl mb-2">
              Thank You!
            </h4>
            <p className="text-[#5E7386] text-sm font-sans">
              Your review helps us improve and helps other customers make the
              right choice.
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-8 py-2.5 bg-[#E63946] text-white font-display tracking-widest text-xs uppercase hover:bg-[#cc2f3b] transition-colors"
              style={{ borderRadius: "4px" }}
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
            <div>
              <label className="block text-xs font-display tracking-widest text-[#5E7386] uppercase mb-3">
                Your Rating
              </label>
              <StarRating value={rating} onChange={setRating} size={28} />
            </div>
            <div>
              <label className="block text-xs font-display tracking-widest text-[#5E7386] uppercase mb-2">
                Your Message
              </label>
              <textarea
                data-testid="input-review-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your experience with Vertex..."
                rows={4}
                className="w-full border border-[#0F2436]/20 text-[#0F2436] text-sm font-sans px-3 py-2.5 placeholder-[#5E7386]/50 focus:outline-none focus:border-[#0F2436] resize-none"
                style={{ borderRadius: "4px" }}
              />
            </div>
            <button
              data-testid="btn-submit-review"
              type="submit"
              disabled={rating === 0 || !message.trim()}
              className="w-full py-3 bg-[#E63946] text-white font-display tracking-widest text-sm uppercase hover:bg-[#cc2f3b] transition-colors disabled:opacity-40"
              style={{ borderRadius: "4px" }}
            >
              Submit Review
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
