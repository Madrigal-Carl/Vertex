import { useState } from "react";
import { inventorySerialNumbers } from "@/constants/mockData";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { SearchBar } from "@/components/admin/SearchBar";
import { Pagination } from "@/components/admin/Pagination";
import { LuPencil as Edit, LuX as X, LuHash as Hash } from "react-icons/lu";

export default function InventorySerialNumbers() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingItem, setEditingItem] = useState(null);
  const [editValue, setEditValue] = useState("");

  const filtered = inventorySerialNumbers.filter(
    (item) =>
      !search ||
      item.serial.toLowerCase().includes(search.toLowerCase()) ||
      item.product.toLowerCase().includes(search.toLowerCase()),
  );

  function openEdit(item) {
    setEditingItem(item);
    setEditValue(item.serial);
  }

  function closeEdit() {
    setEditingItem(null);
    setEditValue("");
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Inventory Serial Numbers</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            All tracked serial numbers across inventory
          </p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-[6px] overflow-hidden flex flex-col">
        <div className="p-4 border-b border-border">
          <SearchBar
            placeholder="Search serial numbers..."
            value={search}
            onChange={setSearch}
            className="w-full sm:w-80"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-secondary/60 text-muted-foreground border-b border-border">
              <tr>
                <th className="px-4 py-3 font-medium">Serial Number</th>
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Variant</th>
                <th className="px-4 py-3 font-medium">Date Added</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((item, i) => (
                <tr
                  key={i}
                  className="hover:bg-secondary/30 transition-colors"
                  data-testid={`row-serial-${i}`}
                >
                  <td className="px-4 py-3">
                    <span className="text-xs tracking-wider font-semibold">
                      {item.serial}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium">{item.product}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {item.variant}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {item.date}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => openEdit(item)}
                      className="inline-flex items-center justify-center h-7 w-7 rounded-[4px] border border-transparent hover:bg-secondary cursor-pointer text-muted-foreground hover:text-foreground"
                      title="Edit serial number"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
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

      {/* ── EDIT SERIAL NUMBER MODAL ── */}
      {editingItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closeEdit}
        >
          <div className="fixed inset-0 bg-black/50" />
          <div
            className="relative z-50 bg-card rounded-[8px] w-full max-w-xl shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-border">
              <div>
                <h2 className="text-lg font-bold">Edit Serial Number</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Update the serial number for this stock entry.
                </p>
              </div>
              <button
                className="inline-flex items-center justify-center h-8 w-8 rounded-[4px] hover:bg-secondary cursor-pointer mt-0.5"
                onClick={closeEdit}
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-5 max-h-[72vh] overflow-y-auto">
              {/* Preview card */}
              <div className="flex items-center gap-4 p-4 bg-secondary/40 rounded-[8px] border border-border">
                <div className="w-14 h-14 rounded-[8px] bg-[#E60000]/10 border-2 border-[#E60000]/20 flex items-center justify-center shrink-0">
                  <Hash className="w-6 h-6 text-[#E60000]/40" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{editingItem.product}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {editingItem.variant} · {editingItem.date}
                  </p>
                  <p className="font-mono text-xs tracking-wider font-semibold mt-1">
                    {editValue || editingItem.serial}
                  </p>
                </div>
              </div>

              {/* Serial Number field */}
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-3 flex items-center gap-1.5">
                  <Hash className="w-3 h-3" /> Serial Number
                </p>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium">Serial Number</label>
                  <input
                    autoFocus
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") closeEdit();
                      if (e.key === "Escape") closeEdit();
                    }}
                    className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 font-mono text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E60000]/30"
                  />
                  <p className="text-[11px] text-muted-foreground">
                    Enter the exact manufacturer serial number for this unit.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 px-6 py-4 border-t border-border bg-secondary/20">
              <button
                className="inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer border border-border bg-transparent rounded-[4px] min-h-9 px-4 hover:bg-secondary"
                onClick={closeEdit}
              >
                Cancel
              </button>
              <button
                className="inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer bg-[#E60000] hover:bg-[#CC0000] text-white rounded-[4px] min-h-9 px-4"
                onClick={closeEdit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
