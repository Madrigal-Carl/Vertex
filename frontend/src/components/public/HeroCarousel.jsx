import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const slides = [
  {
    colors: ["#0F2436", "#1a3a56", "#0a1a28"],
    pattern:
      "radial-gradient(circle at 70% 50%, rgba(230,57,70,0.15) 0%, transparent 60%)",
    title: "Next-Gen Performance",
    subtitle:
      "Discover the latest tech at Vertex — built for those who demand the best.",
  },
  {
    colors: ["#1a2535", "#0F2436", "#0d1e30"],
    pattern:
      "radial-gradient(circle at 30% 60%, rgba(94,115,134,0.25) 0%, transparent 55%)",
    title: "Your Everyday Companion",
    subtitle:
      "From powerful laptops to precision audio — everything you need, one destination.",
  },
  {
    colors: ["#0a1520", "#0F2436", "#162030"],
    pattern:
      "radial-gradient(circle at 80% 30%, rgba(240,245,250,0.08) 0%, transparent 50%)",
    title: "Deals That Move Fast",
    subtitle:
      "Limited-time offers on premium gadgets and accessories. Shop before they're gone.",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrent((c) => (c + 1) % slides.length),
      4000,
    );
    return () => clearInterval(interval);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  const slide = slides[current];

  return (
    <div className="relative w-full h-[520px] md:h-[620px] overflow-hidden">
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}
          style={{
            background: `linear-gradient(135deg, ${s.colors[0]}, ${s.colors[1]}, ${s.colors[2]})`,
          }}
        >
          <div
            className="absolute inset-0"
            style={{ backgroundImage: s.pattern }}
          />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.03) 40px, rgba(255,255,255,0.03) 80px)`,
            }}
          />
        </div>
      ))}

      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.2em] text-white/50 font-display mb-3 uppercase">
              Vertex Store
            </p>
            <h1
              className="text-4xl md:text-6xl font-display font-bold text-white leading-tight mb-4 transition-all duration-500"
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
            >
              {slide.title}
            </h1>
            <p className="text-base md:text-lg text-white/70 font-sans mb-10 max-w-lg leading-relaxed">
              {slide.subtitle}
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link to="/products">
                <button
                  data-testid="hero-shop-now"
                  className="px-8 py-3 bg-[#E63946] text-white font-display tracking-widest text-sm uppercase transition-all hover:bg-[#cc2f3b] active:scale-95"
                  style={{ borderRadius: "4px" }}
                >
                  Shop Now
                </button>
              </Link>
              <Link to="/about">
                <button
                  data-testid="hero-learn-more"
                  className="px-8 py-3 border border-white/40 text-white font-display tracking-widest text-sm uppercase transition-all hover:border-white/80 hover:bg-white/10 active:scale-95"
                  style={{ borderRadius: "4px" }}
                >
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <button
        data-testid="carousel-prev"
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20"
        style={{ borderRadius: "4px" }}
      >
        <ChevronLeft size={20} />
      </button>
      <button
        data-testid="carousel-next"
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20"
        style={{ borderRadius: "4px" }}
      >
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            data-testid={`carousel-dot-${i}`}
            className={`transition-all duration-300 ${i === current ? "w-8 h-2 bg-[#E63946]" : "w-2 h-2 bg-white/40"}`}
            style={{ borderRadius: "2px" }}
          />
        ))}
      </div>
    </div>
  );
}
