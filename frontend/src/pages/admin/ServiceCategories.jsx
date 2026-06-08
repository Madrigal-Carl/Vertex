import { useState } from "react";
import { SearchBar } from "@/components/admin/SearchBar";
import { Pagination } from "@/components/admin/Pagination";
import {
  LuPlus as Plus,
  LuPencil as Edit,
  LuTrash2 as Trash2,
  LuEllipsis as MoreHorizontal,
} from "react-icons/lu";
const serviceCategoriesData = [
  { id: "SC-001", name: "Repair", serviceCount: 12 },
  { id: "SC-002", name: "Installation", serviceCount: 8 },
  { id: "SC-003", name: "Consultation", serviceCount: 5 },
  { id: "SC-004", name: "Maintenance", serviceCount: 9 },
  { id: "SC-005", name: "Setup & Configuration", serviceCount: 6 },
];
export default function ServiceCategories() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Service Categories</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {serviceCategoriesData.length} categories
          </p>
        </div>
        <button
          className="inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer bg-[#E60000] hover:bg-[#CC0000] text-white rounded-[4px] min-h-9 px-4 py-2"
          onClick={() => setIsAddModalOpen(true)}
          data-testid="button-add-service-category"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div className="fixed inset-0 bg-black/50" />
          <div
            className="relative z-50 bg-card rounded-[6px] w-full max-w-md shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 pt-6 pb-4 border-b border-border">
              <h2 className="text-lg font-bold">Add Service Category</h2>
              <p className="text-sm text-muted-foreground">
                Create a new category to organise your services.
              </p>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Category Name</label>
                <input
                  placeholder="e.g. Maintenance"
                  className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  data-testid="input-service-category-name"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 px-6 py-4 border-t border-border bg-secondary/20">
              <button
                className="inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer border border-border bg-transparent rounded-[4px] min-h-9 px-4 hover:bg-secondary"
                onClick={() => setIsAddModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer bg-[#E60000] hover:bg-[#CC0000] text-white rounded-[4px] min-h-9 px-4"
                onClick={() => setIsAddModalOpen(false)}
                data-testid="button-save-service-category"
              >
                Save Category
              </button>
            </div>
          </div>
        </div>
      )}

      {editingCategory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setEditingCategory(null)}
        >
          <div className="fixed inset-0 bg-black/50" />
          <div
            className="relative z-50 bg-card rounded-[6px] w-full max-w-md shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 pt-6 pb-4 border-b border-border">
              <h2 className="text-lg font-bold">Edit Service Category</h2>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Category Name</label>
                <input
                  defaultValue={editingCategory.name}
                  className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  data-testid="input-edit-service-category-name"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 px-6 py-4 border-t border-border bg-secondary/20">
              <button
                className="inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer border border-border bg-transparent rounded-[4px] min-h-9 px-4 hover:bg-secondary"
                onClick={() => setEditingCategory(null)}
              >
                Cancel
              </button>
              <button
                className="inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer bg-[#E60000] hover:bg-[#CC0000] text-white rounded-[4px] min-h-9 px-4"
                onClick={() => setEditingCategory(null)}
                data-testid="button-update-service-category"
              >
                Update Category
              </button>
            </div>
          </div>
        </div>
      )}

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
            <thead className="bg-secondary/60 text-muted-foreground border-b border-border">
              <tr>
                <th className="px-4 py-3 font-medium">Category Name</th>
                <th className="px-4 py-3 font-medium text-right">Services</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {serviceCategoriesData.map((category) => (
                <tr
                  key={category.id}
                  className="hover:bg-secondary/30 transition-colors"
                  data-testid={`row-service-category-${category.id}`}
                >
                  <td className="px-4 py-3">
                    <p className="font-medium">{category.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {category.id}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-right text-muted-foreground">
                    {category.serviceCount}
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
                        data-testid={`button-actions-${category.id}`}
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
                              onClick={() => {
                                setEditingCategory(category);
                                setOpenDropdown(null);
                              }}
                              data-testid={`button-edit-${category.id}`}
                            >
                              <Edit className="w-4 h-4" /> Edit
                            </button>
                            <button
                              className="flex items-center gap-2 w-full px-3 py-1.5 text-sm text-[#E60000] hover:bg-red-50 text-left cursor-pointer"
                              onClick={() => setOpenDropdown(null)}
                              data-testid={`button-delete-${category.id}`}
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
