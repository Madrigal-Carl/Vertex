import { useState } from "react";
import { SearchBar } from "@/components/admin/SearchBar";
import { Pagination } from "@/components/admin/Pagination";
import EntityModal from "@/components/modals/EntityModal";
import { useCreateCategory } from "@/hooks/queries/useCategoryQueries";
import { createCategory } from "@/services/category.service";
import {
  LuPlus as Plus,
  LuPencil as Edit,
  LuTrash2 as Trash2,
  LuEllipsis as MoreHorizontal,
} from "react-icons/lu";

const categoriesData = [
  { id: "CAT-001", name: "Electronics", productCount: 45 },
  { id: "CAT-002", name: "Accessories", productCount: 128 },
  { id: "CAT-003", name: "Apparel", productCount: 32 },
  { id: "CAT-004", name: "Home", productCount: 64 },
];

export default function ProductCategories() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const createCategoryMutation = useCreateCategory(() => {
    setIsAddModalOpen(false);
  });

  const handleCreateCategory = async (name) => {
    await createCategoryMutation.mutateAsync({
      name,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Product Categories</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Manage and moderate product categories
            </p>
          </div>
        </div>
        <button
          className="inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer bg-[#E60000] hover:bg-[#CC0000] text-white rounded-[4px] min-h-9 px-4 py-2"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      <EntityModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Product Category"
        label="Category Name"
        placeholder="e.g. Electronics"
        onSubmit={handleCreateCategory}
      />

      <div className="bg-card border border-border rounded-[6px] overflow-hidden flex flex-col">
        <div className="p-4 border-b border-border">
          <SearchBar
            placeholder="Search categories..."
            value={search}
            onChange={setSearch}
            className="w-full sm:w-80"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground border-b border-border">
              <tr>
                <th className="px-4 py-3 font-medium">Category Name</th>
                <th className="px-4 py-3 font-medium text-right">Products</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {categoriesData.map((category) => (
                <tr
                  key={category.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="px-4 py-3">
                    <p className="font-medium">{category.name}</p>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {category.productCount}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="relative inline-block">
                      <button
                        className="inline-flex items-center justify-center h-8 w-8 rounded-[4px] border border-transparent bg-transparent hover:bg-secondary cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdown(
                            openDropdown === category.id ? null : category.id,
                          );
                        }}
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                      {openDropdown === category.id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setOpenDropdown(null)}
                          />
                          <div className="absolute right-0 z-20 mt-1 w-36 rounded-[4px] border border-border bg-card shadow-md py-1">
                            <button
                              className="flex items-center gap-2 w-full px-3 py-1.5 text-sm hover:bg-secondary text-left cursor-pointer"
                              onClick={() => setOpenDropdown(null)}
                            >
                              <Edit className="w-4 h-4" /> Edit
                            </button>
                            <button
                              className="flex items-center gap-2 w-full px-3 py-1.5 text-sm text-[#E60000] hover:bg-red-50 text-left cursor-pointer"
                              onClick={() => setOpenDropdown(null)}
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
          totalPages={1}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
