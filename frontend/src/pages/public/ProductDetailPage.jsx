import { useState } from "react";
import { ChevronLeft, Plus, Minus, ShoppingCart } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useProduct,
  usePopularProducts,
} from "@/hooks/queries/useProductQueries.js";
import StarRating from "@/components/public/StarRating";
import ProductCard from "@/components/public/ProductCard";
import { useCart } from "@/hooks/useCart";

const COLORS = ["Midnight Blue", "Silver", "Matte Black"];
const SIZES = ["64GB", "128GB", "256GB"];

function formatPrice(p) {
  return `₱${p.toLocaleString()}`;
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ProductDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: product, isLoading, error } = useProduct(id);
  const { data: popularProducts, isLoading: popularLoading } =
    usePopularProducts();

  const [selectedImage, setSelectedImage] = useState(0);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedSize, setSelectedSize] = useState(SIZES[1]);
  const [quantity, setQuantity] = useState(1);
  const { addItem, openDrawer } = useCart();

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

  return (
    <div className="min-h-screen bg-[#F0F5FA]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#5E7386] hover:text-[#0F2436] transition-colors font-display tracking-widest text-xs uppercase mb-8"
        >
          <ChevronLeft size={16} />
          Back to Products
        </button>

        {/* Product Main */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Gallery */}
          <div>
            <div
              className="w-full h-80 md:h-96 overflow-hidden bg-white border border-[#0F2436]/10 mb-4"
              style={{ borderRadius: "8px" }}
            >
              <img
                src={product?.images?.[selectedImage]?.url}
                alt={product?.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-4 gap-3">
              {product?.images?.map((image, index) => (
                <button
                  key={index}
                  data-testid={`btn-thumb-${index}`}
                  onClick={() => setSelectedImage(index)}
                  className={`h-20 overflow-hidden border transition-all ${
                    selectedImage === index
                      ? "ring-2 ring-[#E63946]"
                      : "opacity-60 hover:opacity-100"
                  }`}
                  style={{ borderRadius: "4px" }}
                >
                  <img
                    src={image.url}
                    alt={`${product?.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="text-xs font-display tracking-[0.15em] text-[#5E7386] uppercase mb-2">
              {product?.categoryId?.name}
            </p>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-[#0F2436] mb-3">
              {product?.name}
            </h1>
            <div className="flex items-center gap-3 mb-4">
              <StarRating value={product?.averageRating} readonly size={18} />
              <span className="text-sm text-[#5E7386] font-sans">
                ({product?.averageRating}) · {product?.reviewCount} reviews
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
              {product?.description}
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

            <p className="text-sm text-[#5E7386] mb-6">24 items available</p>

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
          {/* Most Popular */}
          <div className="mb-12">
            <h2 className="text-2xl font-display font-bold text-[#0F2436] mb-6">
              Most Popular
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularProducts?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>

          {/* Leave review */}
          <div
            className="bg-white p-6 border border-[#0F2436]/10 mb-10"
            style={{ borderRadius: "8px" }}
          >
            <h3 className="font-display font-bold text-[#0F2436] text-xl mb-5">
              Write a Review
            </h3>
            <form className="space-y-4">
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
          </div>

          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-display font-bold text-[#0F2436]">
              Customer Reviews
            </h2>
            <div className="flex items-center gap-2">
              <StarRating
                value={product?.averageRating || 0}
                readonly
                size={18}
              />
              <span className="font-display text-[#0F2436] font-bold">
                {product?.averageRating || 0}
              </span>
              <span className="text-sm text-[#5E7386]">
                ({product?.reviewCount || 0})
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {product?.reviews?.map((review, i) => (
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
                        {review.userId.fullname.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-display text-[#0F2436] text-sm">
                        {review.userId.fullname}
                      </p>
                      <p className="text-xs text-[#5E7386]">
                        {formatDate(review.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
                <StarRating value={review.rating} readonly size={14} />
                <p className="text-sm text-[#5E7386] mt-3 leading-relaxed">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
