import { useState } from "react";
import { servicesList } from "@/constants/mockData";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { SearchBar } from "@/components/admin/SearchBar";
import { Pagination } from "@/components/admin/Pagination";
import { FilterPanel } from "@/components/admin/FilterPanel";
import {
  LuPencil as Edit,
  LuTrash2 as Trash2,
  LuEllipsis as MoreHorizontal,
  LuPlus as Plus,
  LuX as X,
  LuWrench as Wrench,
  LuTag as Tag,
  LuDollarSign as DollarSign,
  LuAlignLeft as AlignLeft,
  LuToggleLeft as Toggle,
} from "react-icons/lu";

export default function Services() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [serviceName, setServiceName] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("active");

  function closeModal() {
    setIsAddModalOpen(false);
    setServiceName("");
    setCategory("");
    setStatus("active");
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">All Services</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {servicesList.length} services available
          </p>
        </div>
        <button
          className="inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer bg-[#E60000] hover:bg-[#CC0000] text-white rounded-[4px] min-h-9 px-4 py-2"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>

      {/* ── ADD SERVICE MODAL ── */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="fixed inset-0 bg-black/50" />
          <div
            className="relative z-50 bg-card rounded-[8px] w-full max-w-xl shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-border">
              <div>
                <h2 className="text-lg font-bold">Add Service</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Create a new service offering with pricing and details.
                </p>
              </div>
              <button
                className="inline-flex items-center justify-center h-8 w-8 rounded-[4px] hover:bg-secondary cursor-pointer mt-0.5"
                onClick={closeModal}
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-5 max-h-[72vh] overflow-y-auto">
              {/* Preview card */}
              <div className="flex items-center gap-4 p-4 bg-secondary/40 rounded-[8px] border border-border">
                <div className="w-14 h-14 rounded-[8px] bg-[#E60000]/10 border-2 border-[#E60000]/20 flex items-center justify-center shrink-0">
                  <Wrench className="w-6 h-6 text-[#E60000]/40" />
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    {serviceName || "New Service"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {category || "No category selected"}
                  </p>
                </div>
              </div>

              {/* Service details */}
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-3 flex items-center gap-1.5">
                  <Wrench className="w-3 h-3" /> Service Details
                </p>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium">
                        Service Name
                      </label>
                      <input
                        value={serviceName}
                        onChange={(e) => setServiceName(e.target.value)}
                        placeholder="e.g. Screen Replacement"
                        className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E60000]/30"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium flex items-center gap-1.5">
                        <Tag className="w-3 h-3" /> Category
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm cursor-pointer focus-visible:outline-none"
                      >
                        <option value="">Select category</option>
                        <option value="Repair">Repair</option>
                        <option value="Setup">Setup</option>
                        <option value="Consultation">Consultation</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium flex items-center gap-1.5">
                      <AlignLeft className="w-3 h-3" /> Description
                    </label>
                    <textarea
                      placeholder="Brief description of what this service includes..."
                      className="flex w-full rounded-[4px] border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E60000]/30 min-h-[80px] resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-3 flex items-center gap-1.5">
                  <DollarSign className="w-3 h-3" /> Pricing
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium">
                      Base Price (₱)
                    </label>
                    <input
                      type="number"
                      placeholder="0.00"
                      min={0}
                      step="0.01"
                      className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E60000]/30"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium">
                      Duration (mins)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 60"
                      min={0}
                      className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E60000]/30"
                    />
                  </div>
                </div>
              </div>

              {/* Availability toggle */}
              <div className="border border-border rounded-[6px] overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3">
                  <div>
                    <p className="text-sm font-medium">
                      Active &amp; Available
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Allow this service to be booked by customers
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setStatus((s) => (s === "active" ? "draft" : "active"))
                    }
                    className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer shrink-0 ${status === "active" ? "bg-[#E60000]" : "bg-border"}`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${status === "active" ? "translate-x-5" : "translate-x-0"}`}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 px-6 py-4 border-t border-border bg-secondary/20">
              <button
                className="inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer border border-border bg-transparent rounded-[4px] min-h-9 px-4 hover:bg-secondary"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer bg-[#E60000] hover:bg-[#CC0000] text-white rounded-[4px] min-h-9 px-4"
                onClick={closeModal}
              >
                Save Service
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-card border border-border rounded-[6px] overflow-hidden flex flex-col">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <SearchBar
            placeholder="Search services..."
            value={search}
            onChange={setSearch}
            className="w-full sm:w-80"
          />
          <FilterPanel>
            <select
              defaultValue="all"
              className="flex h-9 w-[140px] rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm cursor-pointer focus-visible:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
            </select>
          </FilterPanel>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground border-b border-border">
              <tr>
                <th className="px-4 py-3 font-medium">Service Name</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Bookings</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {servicesList.map((service) => (
                <tr
                  key={service.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="px-4 py-3">
                    <p className="font-medium">{service.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {service.id}
                    </p>
                  </td>
                  <td className="px-4 py-3">{service.category}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {service.bookings}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={service.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="relative inline-block">
                      <button
                        className="inline-flex items-center justify-center h-8 w-8 rounded-[4px] border border-transparent bg-transparent hover:bg-secondary cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdown(
                            openDropdown === service.id ? null : service.id,
                          );
                        }}
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                      {openDropdown === service.id && (
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
