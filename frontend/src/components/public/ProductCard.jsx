import { Link } from "react-router-dom";

function formatPrice(p) {
  return `₱${p.toLocaleString()}`;
}

function StarRating({ rating = 0, reviewCount = 0 }) {
  const full = Math.floor(rating);
  const partial = rating - full;
  const empty = 5 - Math.ceil(rating);

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: full }).map((_, i) => (
          <svg
            key={`f-${i}`}
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="#E63946"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
        {partial >= 0.25 && partial < 0.75 && (
          <svg key="half" width="12" height="12" viewBox="0 0 24 24">
            <defs>
              <linearGradient id={`half-${rating}`}>
                <stop offset="50%" stopColor="#E63946" />
                <stop offset="50%" stopColor="#D1DCE8" />
              </linearGradient>
            </defs>
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"
              fill={`url(#half-${rating})`}
            />
          </svg>
        )}
        {partial >= 0.75 && (
          <svg
            key="full-extra"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="#E63946"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        )}
        {Array.from({
          length: partial < 0.25 ? empty : partial >= 0.75 ? empty : empty,
        }).map((_, i) => (
          <svg
            key={`e-${i}`}
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="#D1DCE8"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
      <span className="text-[11px] font-display text-[#0F2436] font-semibold">
        {(rating || 0).toFixed(1)}
      </span>
      <span className="text-[10px] text-[#5E7386] font-sans">
        ({(reviewCount || 0).toLocaleString()})
      </span>
    </div>
  );
}

export default function ProductCard({ product }) {
  return (
    <div
      data-testid={`card-product-${product._id}`}
      className="bg-card border border-border flex flex-col group transition-shadow hover:shadow-md"
      style={{ borderRadius: "8px", overflow: "hidden" }}
    >
      <div
        className="relative h-44 flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${
            product.images?.find((img) => img.isPrimary)?.url ||
            product.images?.[0]?.url ||
            ""
          })`,
        }}
      >
        {product.discount > 0 && (
          <span
            className="absolute top-3 left-3 bg-[#E63946] text-white text-xs font-display tracking-widest px-2 py-1 uppercase"
            style={{ borderRadius: "2px" }}
          >
            -{product.discount}%
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1 gap-2">
        <p className="text-xs font-display tracking-[0.12em] text-[#5E7386] uppercase">
          {product.categoryId?.name}
        </p>
        <h3 className="font-display font-semibold text-[#0F2436] text-base leading-tight">
          {product.name}
        </h3>
        <StarRating
          rating={product.averageRating}
          reviewCount={product.reviewCount}
        />
        <p className="text-xs text-[#5E7386] font-sans leading-relaxed flex-1">
          {product.description}
        </p>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="font-display font-bold text-[#0F2436] text-lg">
            {formatPrice(product.price * (1 - (product.discount || 0) / 100))}
          </span>
          {product.price && (
            <span className="text-xs text-[#5E7386] line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
        <Link to={`/product/${product._id}`}>
          <button
            data-testid={`btn-view-${product._id}`}
            className="w-full mt-2 py-2.5 border border-[#0F2436] text-[#0F2436] font-display tracking-widest text-xs uppercase transition-all hover:bg-[#0F2436] hover:text-white active:scale-95"
            style={{ borderRadius: "4px" }}
          >
            View
          </button>
        </Link>
      </div>
    </div>
  );
}
