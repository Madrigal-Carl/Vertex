import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useProducts } from "@/hooks/queries/useProductQueries";
import { useCategories } from "@/hooks/queries/useCategoryQueries";
import ProductCard from "@/components/public/ProductCard";
import { useSearchParams } from "react-router-dom";
import { ChevronDown } from "lucide-react";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "All";
  const page = Number(searchParams.get("page") || 1);

  const [input, setInput] = useState(search);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const PER_PAGE = 8;

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(input);

      setSearchParams((prev) => {
        const params = Object.fromEntries(prev);

        const updated = {
          ...params,
          search: input,
          page: 1,
        };

        return cleanParams(updated);
      });
    }, 400);

    return () => clearTimeout(t);
  }, [input]);

  const { data } = useProducts({
    page,
    limit: PER_PAGE,
    category,
    search: debouncedSearch,
  });

  const products = data?.products || [];
  const pagination = data?.pagination || {};
  const totalPages = pagination.pages || 1;

  const { data: categoriesData } = useCategories();
  const CATEGORIES = ["All", ...(categoriesData?.map((c) => c.name) || [])];

  function handleCategory(v) {
    setSearchParams((prev) => {
      const params = Object.fromEntries(prev);

      const updated = {
        ...params,
        category: v,
        page: 1,
      };

      return cleanParams(updated);
    });
  }

  function updatePage(p) {
    setSearchParams((prev) => {
      const params = Object.fromEntries(prev);

      const updated = {
        ...params,
        page: String(p),
      };

      return cleanParams(updated);
    });
  }

  function cleanParams(params) {
    const cleaned = {};

    Object.entries(params).forEach(([key, value]) => {
      if (value && value !== "All" && value !== "") {
        cleaned[key] = value;
      }
    });

    return cleaned;
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
              placeholder="Search products..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-[#0F2436]/20 text-[#0F2436] text-sm font-sans focus:outline-none focus:border-[#0F2436] transition-colors"
              style={{ borderRadius: "4px" }}
            />
          </div>
          <div className="relative min-w-[180px]">
            <select
              value={category}
              onChange={(e) => handleCategory(e.target.value)}
              className="w-full appearance-none px-4 py-3 pr-10 bg-white border border-[#0F2436]/20 text-[#0F2436] text-sm font-sans focus:outline-none focus:border-[#0F2436] transition-colors cursor-pointer"
              style={{ borderRadius: "4px" }}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5E7386] pointer-events-none"
            />
          </div>
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
            {pagination.total || 0} product{pagination.total !== 1 ? "s" : ""}{" "}
            found
          </p>
        </div>

        {products.length === 0 ? (
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
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              data-testid="btn-prev-page"
              onClick={() => updatePage(page - 1)}
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
                onClick={() => updatePage(n)}
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
              onClick={() => updatePage(page + 1)}
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
