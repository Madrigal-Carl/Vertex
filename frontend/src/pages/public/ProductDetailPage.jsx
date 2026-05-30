import { useState } from "react";
import { ChevronLeft, Plus, Minus, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import StarRating from "@/components/public/StarRating";
import ProductCard from "@/components/public/ProductCard";
import { PRODUCTS } from "@/constants/products";
import { useCartStore } from "@/stores/useCartStore";

const COLORS = ["Midnight Blue", "Silver", "Matte Black"];
const SIZES = ["64GB", "128GB", "256GB"];

const images = [
  "from-indigo-800 to-slate-800",
  "from-blue-900 to-indigo-900",
  "from-slate-700 to-blue-900",
  "from-indigo-900 to-blue-800",
];

const reviews = [
  {
    name: "Paolo Cruz",
    rating: 5,
    date: "May 10, 2025",
    text: "Best phone I've ever owned. The camera is unreal and battery life lasts me all day.",
  },
  {
    name: "Anna Lim",
    rating: 4,
    date: "April 28, 2025",
    text: "Sleek design and super fast. Only minor issue was initial setup but support helped right away.",
  },
  {
    name: "Mark Tan",
    rating: 5,
    date: "April 15, 2025",
    text: "Arrived quickly and was packaged really well. Exactly as described. Very happy with the purchase.",
  },
];

function formatPrice(p) {
  return `₱${p.toLocaleString()}`;
}

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedSize, setSelectedSize] = useState(SIZES[1]);
  const [quantity, setQuantity] = useState(1);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const { addItem, openDrawer } = useCartStore();

  const recommended = PRODUCTS.slice(0, 4);

  function handleAddToCart() {
    addItem({
      id: "p3",
      name: "Vertex Nova 5G",
      price: 24999,
      quantity,
      color: selectedColor,
      size: selectedSize,
      imageColor: "from-indigo-800 to-slate-800",
    });
    openDrawer();
  }

  function handleReviewSubmit(e) {
    e.preventDefault();
    if (!reviewRating || !reviewText.trim()) return;
    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewSubmitted(false);
      setReviewRating(0);
      setReviewText("");
    }, 3000);
  }

  return (
    <div className="min-h-screen bg-[#F0F5FA]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        <Link href="/products">
          <button className="flex items-center gap-2 text-[#5E7386] hover:text-[#0F2436] transition-colors font-display tracking-widest text-xs uppercase mb-8">
            <ChevronLeft size={16} />
            Back to Products
          </button>
        </Link>

        {/* Product Main */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Gallery */}
          <div>
            <div
              className={`w-full h-80 md:h-96 bg-gradient-to-br ${images[selectedImage]} flex items-center justify-center mb-4`}
              style={{ borderRadius: "8px" }}
            >
              <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <span className="font-display text-white/60 text-sm tracking-widest">
                  PHN
                </span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  data-testid={`btn-thumb-${i}`}
                  onClick={() => setSelectedImage(i)}
                  className={`h-20 bg-gradient-to-br ${img} transition-all ${selectedImage === i ? "ring-2 ring-[#E63946]" : "opacity-60 hover:opacity-100"}`}
                  style={{ borderRadius: "4px" }}
                />
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="text-xs font-display tracking-[0.15em] text-[#5E7386] uppercase mb-2">
              Phones
            </p>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-[#0F2436] mb-3">
              Vertex Nova 5G
            </h1>
            <div className="flex items-center gap-3 mb-4">
              <StarRating value={4.5} readonly size={18} />
              <span className="text-sm text-[#5E7386] font-sans">
                (4.5) · 128 reviews
              </span>
            </div>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-display font-bold text-[#0F2436]">
                {formatPrice(24999)}
              </span>
              <span className="text-lg text-[#5E7386] line-through font-sans">
                {formatPrice(28999)}
              </span>
              <span
                className="text-xs font-display tracking-widest bg-[#E63946] text-white px-2 py-1 uppercase"
                style={{ borderRadius: "2px" }}
              >
                -14%
              </span>
            </div>

            <p className="text-[#5E7386] text-sm font-sans leading-relaxed mb-6">
              The Vertex Nova 5G redefines what a smartphone can be. Featuring a
              6.7-inch AMOLED display, a 200MP triple-camera system, and a
              5000mAh battery with 65W fast charging — this is the device
              serious users have been waiting for. Built on the latest 5G
              architecture, every experience is fast, fluid, and future-proof.
            </p>

            {/* Color */}
            <div className="mb-5">
              <p className="font-display tracking-widest text-xs text-[#0F2436] uppercase mb-3">
                Color — <span className="text-[#5E7386]">{selectedColor}</span>
              </p>
              <div className="flex gap-2">
                {COLORS.map((c) => (
                  <button
                    key={c}
                    data-testid={`btn-color-${c.toLowerCase().replace(/\s/g, "-")}`}
                    onClick={() => setSelectedColor(c)}
                    className={`px-3 py-2 text-xs font-sans border transition-all ${selectedColor === c ? "bg-[#0F2436] text-white border-[#0F2436]" : "border-[#0F2436]/30 text-[#5E7386] hover:border-[#0F2436]"}`}
                    style={{ borderRadius: "2px" }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mb-6">
              <p className="font-display tracking-widest text-xs text-[#0F2436] uppercase mb-3">
                Storage — <span className="text-[#5E7386]">{selectedSize}</span>
              </p>
              <div className="flex gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    data-testid={`btn-size-${s}`}
                    onClick={() => setSelectedSize(s)}
                    className={`px-4 py-2 text-xs font-display border transition-all ${selectedSize === s ? "bg-[#0F2436] text-white border-[#0F2436]" : "border-[#0F2436]/30 text-[#5E7386] hover:border-[#0F2436]"}`}
                    style={{ borderRadius: "2px" }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-8">
              <p className="font-display tracking-widest text-xs text-[#0F2436] uppercase">
                Quantity
              </p>
              <div
                className="flex items-center border border-[#0F2436]/30"
                style={{ borderRadius: "4px" }}
              >
                <button
                  data-testid="btn-qty-minus"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-[#F0F5FA] transition-colors"
                >
                  <Minus size={14} className="text-[#0F2436]" />
                </button>
                <span className="w-12 text-center font-display text-[#0F2436]">
                  {quantity}
                </span>
                <button
                  data-testid="btn-qty-plus"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-[#F0F5FA] transition-colors"
                >
                  <Plus size={14} className="text-[#0F2436]" />
                </button>
              </div>
            </div>

            <button
              data-testid="btn-add-to-cart"
              onClick={handleAddToCart}
              className="w-full py-4 bg-[#E63946] text-white font-display tracking-widest text-sm uppercase hover:bg-[#cc2f3b] transition-colors active:scale-95 flex items-center justify-center gap-3"
              style={{ borderRadius: "4px" }}
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>
          </div>
        </div>

        {/* Reviews */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-display font-bold text-[#0F2436]">
              Customer Reviews
            </h2>
            <div className="flex items-center gap-2">
              <StarRating value={4.5} readonly size={18} />
              <span className="font-display text-[#0F2436] font-bold">4.5</span>
              <span className="text-sm text-[#5E7386]">(128)</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="bg-white p-6 border border-[#0F2436]/10"
                style={{ borderRadius: "8px" }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 bg-[#0F2436] flex items-center justify-center"
                      style={{ borderRadius: "50%" }}
                    >
                      <span className="font-display text-white text-sm">
                        {r.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-display text-[#0F2436] text-sm">
                        {r.name}
                      </p>
                      <p className="text-xs text-[#5E7386]">{r.date}</p>
                    </div>
                  </div>
                </div>
                <StarRating value={r.rating} readonly size={14} />
                <p className="text-sm text-[#5E7386] mt-3 leading-relaxed">
                  {r.text}
                </p>
              </div>
            ))}
          </div>

          {/* Leave review */}
          <div
            className="bg-white p-6 border border-[#0F2436]/10"
            style={{ borderRadius: "8px" }}
          >
            <h3 className="font-display font-bold text-[#0F2436] text-xl mb-5">
              Write a Review
            </h3>
            {reviewSubmitted ? (
              <p className="text-[#0F2436] font-display py-4">
                Thank you for your review!
              </p>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-display tracking-widest text-[#5E7386] uppercase mb-2">
                    Your Rating
                  </label>
                  <StarRating
                    value={reviewRating}
                    onChange={setReviewRating}
                    size={24}
                  />
                </div>
                <div>
                  <label className="block text-xs font-display tracking-widest text-[#5E7386] uppercase mb-2">
                    Your Review
                  </label>
                  <textarea
                    data-testid="input-product-review"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share your experience with this product..."
                    rows={4}
                    className="w-full border border-[#0F2436]/20 text-[#0F2436] text-sm font-sans px-3 py-2.5 placeholder-[#5E7386]/50 focus:outline-none focus:border-[#0F2436] resize-none transition-colors"
                    style={{ borderRadius: "4px" }}
                  />
                </div>
                <button
                  data-testid="btn-submit-product-review"
                  type="submit"
                  disabled={!reviewRating || !reviewText.trim()}
                  className="px-8 py-3 bg-[#E63946] text-white font-display tracking-widest text-xs uppercase hover:bg-[#cc2f3b] transition-colors disabled:opacity-40"
                  style={{ borderRadius: "4px" }}
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Recommended */}
        <div>
          <h2 className="text-2xl font-display font-bold text-[#0F2436] mb-6">
            Recommended Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommended.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
