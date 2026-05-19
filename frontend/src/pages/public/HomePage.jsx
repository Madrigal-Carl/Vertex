import { useState } from "react";
import { Link } from "react-router-dom";
import HeroCarousel from "@/components/public/HeroCarousel";
import ProductCard from "@/components/public/ProductCard";
import StarRating from "@/components/public/StarRating";
import { PRODUCTS } from "@/constants/products";
import ReviewModal from "@/components/modals/ReviewModal";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import useProtectedAction from "@/hooks/useProtectedAction";
import {
  X,
  Star,
  Truck,
  Shield,
  Lock,
  HeadphonesIcon,
  Wrench,
  Cpu,
  Wifi,
  Monitor,
} from "lucide-react";

const deals = PRODUCTS.filter((p) => p.originalPrice).slice(0, 4);
const popular = PRODUCTS.slice(4, 8);

const offers = [
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Same-day and next-day delivery available in Metro Manila.",
  },
  {
    icon: Shield,
    title: "2-Year Warranty",
    desc: "All products backed by our comprehensive warranty program.",
  },
  {
    icon: Lock,
    title: "Secure Payments",
    desc: "Your transactions are protected with 256-bit SSL encryption.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    desc: "Our tech experts are always here to help you out.",
  },
];

const services = [
  {
    icon: Wrench,
    title: "Device Repair",
    desc: "Fast, reliable repair service for all major brands.",
  },
  {
    icon: Cpu,
    title: "Custom Builds",
    desc: "We configure setups optimized for your workflow.",
  },
  {
    icon: Wifi,
    title: "Network Setup",
    desc: "Home and office network installation and optimization.",
  },
  {
    icon: Monitor,
    title: "Software Setup",
    desc: "OS installation, updates, and software configuration.",
  },
];

const reviews = [
  {
    name: "Maria Santos",
    rating: 5,
    text: "Incredible service and fast delivery! My laptop arrived the next day and was exactly as described. Will definitely order again.",
    location: "Quezon City",
  },
  {
    name: "James Reyes",
    rating: 5,
    text: "The BassCore Earbuds are phenomenal. Sound quality is top-tier and the price is unbeatable. Vertex is now my go-to store.",
    location: "Makati City",
  },
  {
    name: "Carla Mendoza",
    rating: 4,
    text: "Great product selection and easy checkout process. The packaging was secure and arrived in perfect condition.",
    location: "Pasig City",
  },
];

export default function Home() {
  const [showReviewModal, setShowReviewModal] = useState(false);

  const navigate = useNavigate();
  const protectedAction = useProtectedAction();
  const { user } = useAuth();

  const handleLeaveReview = () => {
    protectedAction({
      role: "customer",
      unauthorizedMessage: "Only customers can leave reviews.",
      onSuccess: () => setShowReviewModal(true),
    });
  };

  return (
    <div>
      <HeroCarousel />

      {/* Offers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-10">
            <p className="text-xs font-display tracking-[0.2em] text-[#E63946] uppercase mb-2">
              Why Choose Us
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#0F2436]">
              The Vertex Advantage
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {offers.map((o) => (
              <div
                key={o.title}
                className="p-6 bg-[#F0F5FA] border border-transparent hover:border-[#0F2436]/20 transition-all group"
                style={{ borderRadius: "8px" }}
              >
                <div
                  className="w-12 h-12 bg-[#0F2436] flex items-center justify-center mb-4 group-hover:bg-[#E63946] transition-colors"
                  style={{ borderRadius: "4px" }}
                >
                  <o.icon size={20} className="text-white" />
                </div>
                <h3 className="font-display font-semibold text-[#0F2436] text-base mb-2">
                  {o.title}
                </h3>
                <p className="text-sm text-[#5E7386] leading-relaxed">
                  {o.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deals */}
      <section className="py-16 bg-[#F0F5FA]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-display tracking-[0.2em] text-[#E63946] uppercase mb-2">
                Limited Time
              </p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-[#0F2436]">
                Today's Deals
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {deals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="text-center">
            <Link to="/products">
              <button
                className="px-8 py-3 border-2 border-[#0F2436] text-[#0F2436] font-display tracking-widest text-sm uppercase hover:bg-[#0F2436] hover:text-white transition-all active:scale-95"
                style={{ borderRadius: "4px" }}
              >
                View More
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Most Popular */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-display tracking-[0.2em] text-[#E63946] uppercase mb-2">
                Best Sellers
              </p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-[#0F2436]">
                Most Popular
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {popular.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="text-center">
            <Link to="/products">
              <button
                className="px-8 py-3 border-2 border-[#0F2436] text-[#0F2436] font-display tracking-widest text-sm uppercase hover:bg-[#0F2436] hover:text-white transition-all active:scale-95"
                style={{ borderRadius: "4px" }}
              >
                View More
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-[#0F2436]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-10">
            <p className="text-xs font-display tracking-[0.2em] text-[#E63946] uppercase mb-2">
              What We Offer
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
              Our Services
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <div
                key={s.title}
                className="p-6 border border-white/10 hover:border-[#E63946]/60 transition-all group"
                style={{ borderRadius: "8px" }}
              >
                <div
                  className="w-12 h-12 bg-white/10 flex items-center justify-center mb-4 group-hover:bg-[#E63946] transition-colors"
                  style={{ borderRadius: "4px" }}
                >
                  <s.icon size={20} className="text-white" />
                </div>
                <h3 className="font-display font-semibold text-white text-base mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/services">
              <button
                className="px-8 py-3 border border-[#E63946] text-[#E63946] font-display tracking-widest text-sm uppercase hover:bg-[#E63946] hover:text-white transition-all active:scale-95"
                style={{ borderRadius: "4px" }}
              >
                Explore Services
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 bg-[#F0F5FA]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-display tracking-[0.2em] text-[#E63946] uppercase mb-2">
                Testimonials
              </p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-[#0F2436]">
                What Customers Say
              </h2>
            </div>
            <button
              data-testid="btn-leave-review"
              onClick={handleLeaveReview}
              className="flex-shrink-0 px-6 py-3 bg-[#0F2436] text-white font-display tracking-widest text-xs uppercase hover:bg-[#E63946] transition-all active:scale-95"
              style={{ borderRadius: "4px" }}
            >
              Leave a Review
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="bg-white p-6 border border-[#0F2436]/10"
                style={{ borderRadius: "8px" }}
              >
                <StarRating value={r.rating} readonly size={16} />
                <p className="text-sm text-[#5E7386] leading-relaxed mt-4 mb-6 italic">
                  "{r.text}"
                </p>
                <div className="flex items-center gap-3 border-t border-[#F0F5FA] pt-4">
                  <div
                    className="w-10 h-10 bg-[#0F2436] flex items-center justify-center flex-shrink-0"
                    style={{ borderRadius: "50%" }}
                  >
                    <span className="font-display font-bold text-white text-sm">
                      {r.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-display text-[#0F2436] text-sm">
                      {r.name}
                    </p>
                    <p className="text-xs text-[#5E7386]">{r.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-[#E63946]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
            Ready to Upgrade Your Tech?
          </h2>
          <p className="text-white/80 mb-8 text-lg font-sans">
            Browse our full catalog of premium products.
          </p>
          <Link to="/products">
            <button
              className="px-10 py-4 bg-white text-[#E63946] font-display tracking-widest text-sm uppercase hover:bg-white/90 transition-all active:scale-95"
              style={{ borderRadius: "4px" }}
            >
              Shop Now
            </button>
          </Link>
        </div>
      </section>

      {showReviewModal && (
        <ReviewModal onClose={() => setShowReviewModal(false)} />
      )}
    </div>
  );
}
