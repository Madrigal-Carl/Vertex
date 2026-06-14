import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { SearchBar } from "@/components/admin/SearchBar";
import { Pagination } from "@/components/admin/Pagination";
import CategoryModal from "@/components/modals/CategoryModal";
import {
  useCreateCategory,
  useCategories,
  useUpdateCategory,
  useDeleteCategory,
} from "@/hooks/queries/useCategoryQueries";
import {
  LuPlus as Plus,
  LuPencil as Edit,
  LuTrash2 as Trash2,
  LuEllipsis as MoreHorizontal,
} from "react-icons/lu";

export default function ProductCategories() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [openDropdown, setOpenDropdown] = useState(null);
  const [dropdownRect, setDropdownRect] = useState(null);
  const dropdownButtonRefs = useRef({});

  const [editingCategory, setEditingCategory] = useState(null);

  const { data: categoriesData = {}, isLoading } = useCategories({
    page: currentPage,
    limit,
    search,
  });

  const createCategoryMutation = useCreateCategory(() => {
    setIsAddModalOpen(false);
  });

  const updateCategoryMutation = useUpdateCategory(() => {
    setIsEditModalOpen(false);
    setEditingCategory(null);
  });

  const deleteCategoryMutation = useDeleteCategory(() => {
    setOpenDropdown(null);
    setDropdownRect(null);
  });

  const handleCreateCategory = async (values) => {
    await createCategoryMutation.mutateAsync(values);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setIsEditModalOpen(true);
    setOpenDropdown(null);
    setDropdownRect(null);
  };

  const handleUpdateCategory = async (values) => {
    await updateCategoryMutation.mutateAsync({
      id: editingCategory._id,
      data: values,
    });
  };

  const handleDeleteCategory = async (id) => {
    await deleteCategoryMutation.mutateAsync(id);
  };

  const handleDropdownToggle = (id) => {
    if (openDropdown === id) {
      setOpenDropdown(null);
      setDropdownRect(null);
      return;
    }

    const rect = dropdownButtonRefs.current[id]?.getBoundingClientRect();
    setDropdownRect(rect || null);
    setOpenDropdown(id);
  };

  const activeCategory = categoriesData?.categories?.find(
    (c) => c._id === openDropdown,
  );

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Product Categories</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage and moderate product categories
          </p>
        </div>

        <button
          className="inline-flex items-center gap-2 text-sm font-medium bg-[#E60000] hover:bg-[#CC0000] text-white rounded-[4px] px-4 py-2"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      <CategoryModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Product Category"
        label="Category Name"
        placeholder="e.g. Electronics"
        onSubmit={handleCreateCategory}
      />

      {isEditModalOpen && (
        <CategoryModal
          open={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingCategory(null);
          }}
          title="Edit Product Category"
          label="Category Name"
          placeholder="e.g. Electronics"
          defaultValues={{ name: editingCategory?.name ?? "" }}
          onSubmit={handleUpdateCategory}
        />
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
            <thead className="bg-muted/50 text-muted-foreground border-b border-border">
              <tr>
                <th className="px-4 py-3 font-medium">Category Name</th>
                <th className="px-4 py-3 font-medium text-right">Products</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {categoriesData?.categories?.map((category) => (
                <tr
                  key={category._id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="px-4 py-3 font-medium">{category.name}</td>

                  <td className="px-4 py-3 text-right">
                    {category.productCount || 0}
                  </td>

                  <td className="px-4 py-3 text-right">
                    <button
                      ref={(el) =>
                        (dropdownButtonRefs.current[category._id] = el)
                      }
                      className="inline-flex items-center justify-center h-8 w-8 rounded-[4px] hover:bg-secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDropdownToggle(category._id);
                      }}
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={categoriesData?.totalPages || 1}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* PORTAL DROPDOWN */}
      {openDropdown &&
        dropdownRect &&
        createPortal(
          <>
            <div
              className="fixed inset-0 z-[9998]"
              onClick={() => {
                setOpenDropdown(null);
                setDropdownRect(null);
              }}
            />

            <div
              className="fixed z-[9999] w-36 rounded-[4px] border border-border bg-card shadow-md py-1"
              style={{
                top: dropdownRect.bottom + 4,
                left: dropdownRect.right - 144,
              }}
            >
              <button
                className="flex items-center gap-2 w-full px-3 py-1.5 text-sm hover:bg-secondary text-left"
                onClick={() => {
                  handleEditCategory(activeCategory);
                }}
              >
                <Edit className="w-4 h-4" /> Edit
              </button>

              <button
                className="flex items-center gap-2 w-full px-3 py-1.5 text-sm text-[#E60000] hover:bg-red-50 text-left"
                onClick={() => {
                  handleDeleteCategory(openDropdown);
                }}
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </>,
          document.body,
        )}
    </div>
  );
}
