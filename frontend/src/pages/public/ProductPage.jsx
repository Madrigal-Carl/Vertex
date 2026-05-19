import { useState } from "react";
import { Search } from "lucide-react";
import { PRODUCTS } from "@/constants/products";
import ProductCard from "@/components/public/ProductCard";

const CATEGORIES = [
  "All",
  "Laptops",
  "Phones",
  "Tablets",
  "Accessories",
  "Audio",
];
const PER_PAGE = 8;

export default function Products() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);

  const filtered = PRODUCTS.filter((p) => {
    const matchesCat = category === "All" || p.category === category;
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function handleSearch(v) {
    setSearch(v);
    setPage(1);
  }
  function handleCategory(v) {
    setCategory(v);
    setPage(1);
  }

  return (
    <div className="min-h-screen bg-[#F0F5FA]">
      <div className="bg-[#0F2436] py-14 px-6 md:px-12 text-center">
        <p className="text-xs font-display tracking-[0.2em] text-[#E63946] uppercase mb-3">
          Browse
        </p>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white">
          All Products
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5E7386]"
            />
            <input
              data-testid="input-search"
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-[#0F2436]/20 text-[#0F2436] text-sm font-sans focus:outline-none focus:border-[#0F2436] transition-colors"
              style={{ borderRadius: "4px" }}
            />
          </div>
          <select
            data-testid="select-category"
            value={category}
            onChange={(e) => handleCategory(e.target.value)}
            className="px-4 py-3 bg-white border border-[#0F2436]/20 text-[#0F2436] text-sm font-sans focus:outline-none focus:border-[#0F2436] min-w-[180px] transition-colors cursor-pointer"
            style={{ borderRadius: "4px" }}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              data-testid={`pill-${c.toLowerCase()}`}
              onClick={() => handleCategory(c)}
              className={`px-4 py-1.5 font-display tracking-widest text-xs uppercase transition-all ${
                category === c
                  ? "bg-[#0F2436] text-white"
                  : "bg-white text-[#5E7386] border border-[#0F2436]/20 hover:border-[#0F2436]/50"
              }`}
              style={{ borderRadius: "2px" }}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-[#5E7386] font-sans">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {paged.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-display text-[#0F2436] text-xl mb-2">
              No products found
            </p>
            <p className="text-[#5E7386] text-sm">
              Try adjusting your search or category filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {paged.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              data-testid="btn-prev-page"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 border border-[#0F2436]/30 text-[#0F2436] font-display tracking-widest text-xs uppercase disabled:opacity-40 hover:bg-[#0F2436] hover:text-white transition-all"
              style={{ borderRadius: "4px" }}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                data-testid={`btn-page-${n}`}
                onClick={() => setPage(n)}
                className={`w-10 h-10 font-display text-sm transition-all ${
                  page === n
                    ? "bg-[#0F2436] text-white"
                    : "border border-[#0F2436]/30 text-[#0F2436] hover:bg-[#0F2436] hover:text-white"
                }`}
                style={{ borderRadius: "4px" }}
              >
                {n}
              </button>
            ))}
            <button
              data-testid="btn-next-page"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 border border-[#0F2436]/30 text-[#0F2436] font-display tracking-widest text-xs uppercase disabled:opacity-40 hover:bg-[#0F2436] hover:text-white transition-all"
              style={{ borderRadius: "4px" }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
