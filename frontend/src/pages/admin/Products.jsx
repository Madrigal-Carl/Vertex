import { useState } from "react";
import { useAllCategories } from "@/hooks/queries/useCategoryQueries";
import { useProducts } from "@/hooks/queries/useProductQueries";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { SearchBar } from "@/components/admin/SearchBar";
import { Pagination } from "@/components/admin/Pagination";
import { StarRating } from "@/components/admin/StarRating";
import ProductModal from "@/components/modals/ProductModal";
import {
  LuPencil as Edit,
  LuTrash2 as Trash2,
  LuEllipsis as MoreHorizontal,
  LuPlus as Plus,
  LuChevronDown,
} from "react-icons/lu";

export default function Products() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: categoriesData } = useAllCategories();
  const { data, isLoading, isFetching } = useProducts({
    page: currentPage,
    limit: 10,
    category,
    search,
  });

  const categories = categoriesData ?? [];
  const products = data?.products ?? [];
  const pagination = data?.pagination;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">All Products</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {pagination?.total ?? 0} total products
          </p>
        </div>
        <button
          className="inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer bg-[#E60000] hover:bg-[#CC0000] text-white rounded-[4px] min-h-9 px-4 py-2"
          onClick={() => setIsAddModalOpen(true)}
          data-testid="button-add-product"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {isAddModalOpen && (
        <ProductModal onClose={() => setIsAddModalOpen(false)} />
      )}

      <div className="bg-card border border-border rounded-[6px] overflow-hidden flex flex-col">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
          <SearchBar
            placeholder="Search products..."
            value={search}
            onChange={setSearch}
            className="w-full sm:w-80"
          />

          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex h-9 w-[140px] appearance-none rounded-[4px] border border-input bg-transparent px-3 pr-8 py-1 text-sm cursor-pointer focus-visible:outline-none"
              data-testid="filter-category"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>

            <LuChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-8 text-center">Loading products...</div>
          ) : (
            <table className="w-full text-sm text-left">
              <thead className="bg-secondary/60 text-muted-foreground border-b border-border">
                <tr>
                  <th className="px-4 py-3 font-medium w-12"></th>
                  <th className="px-4 py-3 font-medium">Product Name</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Stock</th>
                  <th className="px-4 py-3 font-medium">Price</th>
                  <th className="px-4 py-3 font-medium">Rating</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-secondary/30 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="w-10 h-10 rounded-[4px] bg-secondary flex items-center justify-center border border-border">
                        <img
                          src={
                            product.images?.find((img) => img.isPrimary)?.url ||
                            product.images?.[0]?.url
                          }
                          alt={product.name}
                          className="w-10 h-10 rounded-[4px] object-cover border border-border"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {product._id.slice(-8)}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {product.categoryId?.name}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          product.stock < 10
                            ? "text-[#E60000] font-semibold"
                            : ""
                        }
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium">
                      ₱{" "}
                      {(
                        product.price -
                        (product.price * product.discount) / 100
                      ).toLocaleString()}
                      {product.discount > 0 && (
                        <span className="ml-2 text-[11px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-[3px] font-semibold">
                          -{product.discount}%
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <StarRating
                        rating={Math.floor(product.averageRating || 0)}
                      />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="relative inline-block">
                        <button
                          className="inline-flex items-center justify-center h-8 w-8 rounded-[4px] border border-transparent bg-transparent hover:bg-secondary cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenDropdown(
                              openDropdown === product._id ? null : product._id,
                            );
                          }}
                          data-testid={`button-actions-${product._id}`}
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                        {openDropdown === product._id && (
                          <>
                            <div
                              className="fixed inset-0 z-10"
                              onClick={() => setOpenDropdown(null)}
                            />
                            <div className="absolute right-0 z-20 mt-1 w-36 rounded-[4px] border border-border bg-card shadow-md py-1">
                              <button
                                className="flex items-center gap-2 w-full px-3 py-1.5 text-sm hover:bg-secondary text-left cursor-pointer"
                                onClick={() => setOpenDropdown(null)}
                                data-testid={`button-edit-${product._id}`}
                              >
                                <Edit className="w-4 h-4" /> Edit
                              </button>
                              <button
                                className="flex items-center gap-2 w-full px-3 py-1.5 text-sm text-[#E60000] hover:bg-red-50 text-left cursor-pointer"
                                onClick={() => setOpenDropdown(null)}
                                data-testid={`button-delete-${product._id}`}
                              >
                                <Trash2 className="w-4 h-4" /> Delete
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={pagination?.pages ?? 1}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
