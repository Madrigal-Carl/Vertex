import { useState } from "react";
import { productsList } from "@/constants/mockData";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { SearchBar } from "@/components/admin/SearchBar";
import { Pagination } from "@/components/admin/Pagination";
import { FilterPanel } from "@/components/admin/FilterPanel";
import { VariantBuilder } from "@/components/admin/VariantBuilder";
import { ImageUploader } from "@/components/admin/ImageUploader";
import {
  LuPencil as Edit,
  LuTrash2 as Trash2,
  LuEllipsis as MoreHorizontal,
  LuPlus as Plus,
} from "react-icons/lu";

export default function Products() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">All Products</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {productsList.length} total products
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
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div className="fixed inset-0 bg-black/50" />
          <div
            className="relative z-50 bg-card rounded-[6px] w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 pt-6 pb-4 border-b border-border sticky top-0 bg-card z-10">
              <h2 className="text-lg font-black">Add New Product</h2>
              <p className="text-sm text-muted-foreground">
                Fill in the details below to create a new product listing.
              </p>
            </div>

            <div className="px-6 py-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                  <section className="space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-border">
                      <span className="w-5 h-5 rounded-full bg-[#E60000] text-white text-[10px] font-bold flex items-center justify-center">
                        1
                      </span>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Basic Information
                      </h3>
                    </div>
                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium">
                          Product Name
                        </label>
                        <input
                          placeholder="e.g. Wireless Noise-Cancelling Headphones"
                          className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                          data-testid="input-product-name"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium">
                          Description
                        </label>
                        <textarea
                          placeholder="Describe the product — features, specifications, use cases..."
                          className="flex w-full rounded-[4px] border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-[110px] resize-none"
                          data-testid="input-product-description"
                        />
                      </div>
                    </div>
                  </section>

                  <section className="space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-border">
                      <span className="w-5 h-5 rounded-full bg-[#E60000] text-white text-[10px] font-bold flex items-center justify-center">
                        2
                      </span>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Media
                      </h3>
                    </div>
                    <ImageUploader />
                  </section>

                  <section className="space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-border">
                      <span className="w-5 h-5 rounded-full bg-[#E60000] text-white text-[10px] font-bold flex items-center justify-center">
                        3
                      </span>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Variant Combinations
                      </h3>
                    </div>
                    <VariantBuilder />
                  </section>
                </div>

                <div className="space-y-6">
                  <section className="space-y-3 bg-secondary/40 rounded-[6px] p-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Organization
                    </h3>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium">Category</label>
                      <select
                        className="flex h-9 w-full rounded-[4px] border border-input bg-card px-3 py-1 text-sm cursor-pointer focus-visible:outline-none"
                        data-testid="select-product-category"
                      >
                        <option value="">Select category</option>
                        <option value="electronics">Electronics</option>
                        <option value="accessories">Accessories</option>
                        <option value="apparel">Apparel</option>
                        <option value="home">Home</option>
                      </select>
                    </div>
                  </section>

                  <section className="space-y-3 bg-secondary/40 rounded-[6px] p-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Pricing
                    </h3>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium">
                        Base Price ($)
                      </label>
                      <input
                        type="number"
                        placeholder="0.00"
                        className="flex h-9 w-full rounded-[4px] border border-input bg-card px-3 py-1 text-sm focus-visible:outline-none"
                        data-testid="input-product-price"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium">
                        Discount (%)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          placeholder="0"
                          min={0}
                          max={100}
                          className="flex h-9 w-full rounded-[4px] border border-input bg-card px-3 py-1 pr-8 text-sm focus-visible:outline-none"
                          data-testid="input-product-discount"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                          %
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground">
                        Enter 0 for no discount, max 100.
                      </p>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium">
                        Compare at Price ($)
                      </label>
                      <input
                        type="number"
                        placeholder="0.00"
                        className="flex h-9 w-full rounded-[4px] border border-input bg-card px-3 py-1 text-sm focus-visible:outline-none"
                      />
                    </div>
                  </section>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 px-6 py-4 border-t border-border bg-secondary/20 sticky bottom-0">
              <button
                className="inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer border border-border bg-transparent rounded-[4px] min-h-9 px-4 hover:bg-secondary"
                onClick={() => setIsAddModalOpen(false)}
                data-testid="button-cancel-product"
              >
                Cancel
              </button>
              <button
                className="inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer bg-[#E60000] hover:bg-[#CC0000] text-white rounded-[4px] min-h-9 px-4"
                onClick={() => setIsAddModalOpen(false)}
                data-testid="button-save-product"
              >
                Save Product
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-card border border-border rounded-[6px] overflow-hidden flex flex-col">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
          <SearchBar
            placeholder="Search products..."
            value={search}
            onChange={setSearch}
            className="w-full sm:w-80"
          />
          <FilterPanel>
            <select
              defaultValue="all"
              className="flex h-9 w-[140px] rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm cursor-pointer focus-visible:outline-none"
              data-testid="filter-category"
            >
              <option value="all">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="accessories">Accessories</option>
              <option value="apparel">Apparel</option>
            </select>
            <select
              defaultValue="all"
              className="flex h-9 w-[140px] rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm cursor-pointer focus-visible:outline-none"
              data-testid="filter-status"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </FilterPanel>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-secondary/60 text-muted-foreground border-b border-border">
              <tr>
                <th className="px-4 py-3 font-medium w-12"></th>
                <th className="px-4 py-3 font-medium">Product Name</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Variants</th>
                <th className="px-4 py-3 font-medium">Stock</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {productsList.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-secondary/30 transition-colors"
                  data-testid={`row-product-${product.id}`}
                >
                  <td className="px-4 py-3">
                    <div className="w-10 h-10 rounded-[4px] bg-secondary flex items-center justify-center border border-border">
                      <span className="text-xs text-muted-foreground font-mono">
                        IMG
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {product.id}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {product.category}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {product.variantsCount}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        product.stock < 10 ? "text-[#E60000] font-semibold" : ""
                      }
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium">
                    ${product.price}
                    {product.discount > 0 && (
                      <span className="ml-2 text-[11px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-[3px] font-semibold">
                        -{product.discount}%
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={product.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="relative inline-block">
                      <button
                        className="inline-flex items-center justify-center h-8 w-8 rounded-[4px] border border-transparent bg-transparent hover:bg-secondary cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdown(
                            openDropdown === product.id ? null : product.id,
                          );
                        }}
                        data-testid={`button-actions-${product.id}`}
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                      {openDropdown === product.id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setOpenDropdown(null)}
                          />
                          <div className="absolute right-0 z-20 mt-1 w-36 rounded-[4px] border border-border bg-card shadow-md py-1">
                            <button
                              className="flex items-center gap-2 w-full px-3 py-1.5 text-sm hover:bg-secondary text-left cursor-pointer"
                              onClick={() => setOpenDropdown(null)}
                              data-testid={`button-edit-${product.id}`}
                            >
                              <Edit className="w-4 h-4" /> Edit
                            </button>
                            <button
                              className="flex items-center gap-2 w-full px-3 py-1.5 text-sm text-[#E60000] hover:bg-red-50 text-left cursor-pointer"
                              onClick={() => setOpenDropdown(null)}
                              data-testid={`button-delete-${product.id}`}
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
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={2}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
