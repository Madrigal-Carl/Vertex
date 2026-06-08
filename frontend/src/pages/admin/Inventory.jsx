import { useState } from "react";
import { inventorySerialNumbers } from "@/constants/mockData";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { SearchBar } from "@/components/admin/SearchBar";
import { Pagination } from "@/components/admin/Pagination";
import { FilterPanel } from "@/components/admin/FilterPanel";
import {
  LuPlus as Plus,
  LuSearch as Search,
  LuPackage as Package,
  LuX as X,
  LuHash as Hash,
  LuChevronDown as ChevronDown,
  LuCheck as Check,
} from "react-icons/lu";

const cn = (...c) => c.filter(Boolean).join(" ");

function ProductCombobox({ value, onChange, productsList }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const filtered = productsList.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.id.toLowerCase().includes(query.toLowerCase()),
  );
  const selected = productsList.find((p) => p.id === value);
  return (
    <div className="relative">
      <button
        type="button"
        className="flex h-9 w-full items-center justify-between rounded-[4px] border border-input bg-transparent px-3 py-2 text-sm text-left cursor-pointer focus-visible:outline-none"
        onClick={() => setOpen(!open)}
      >
        {selected ? (
          selected.name
        ) : (
          <span className="text-muted-foreground">Select product...</span>
        )}
        <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 right-0 z-20 mt-1 rounded-[6px] border border-border bg-card shadow-md overflow-hidden">
            <div className="p-2 border-b border-border">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  autoFocus
                  placeholder="Search product..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-7 h-8 w-full rounded border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none"
                />
              </div>
            </div>
            <div className="max-h-48 overflow-y-auto">
              {filtered.length === 0 ? (
                <p className="py-4 text-center text-sm text-muted-foreground">
                  No product found.
                </p>
              ) : (
                filtered.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className={cn(
                      "flex w-full items-center px-3 py-2 text-sm cursor-pointer hover:bg-secondary text-left",
                      value === p.id && "bg-secondary font-medium",
                    )}
                    onClick={() => {
                      onChange(p.id);
                      setOpen(false);
                      setQuery("");
                    }}
                  >
                    <Package className="mr-2 h-4 w-4 text-muted-foreground shrink-0" />
                    {p.name}
                  </button>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const mockProductsList = [
  {
    id: "PROD-001",
    name: "Wireless Headphones",
    variants: [
      { id: "v1", label: "Black" },
      { id: "v2", label: "White" },
      { id: "v3", label: "Midnight Blue" },
    ],
  },
  {
    id: "PROD-002",
    name: "Smart Watch",
    variants: [
      { id: "v1", label: "Silver / 40mm" },
      { id: "v2", label: "Gold / 40mm" },
      { id: "v3", label: "Black / 44mm" },
    ],
  },
  {
    id: "PROD-003",
    name: "USB-C Hub",
    variants: [
      { id: "v1", label: "7-in-1" },
      { id: "v2", label: "10-in-1" },
    ],
  },
  {
    id: "PROD-004",
    name: "Mechanical Keyboard",
    variants: [
      { id: "v1", label: "Black / Brown Switch" },
      { id: "v2", label: "White / Red Switch" },
      { id: "v3", label: "Gray / Blue Switch" },
    ],
  },
];

export default function Inventory() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedVariant, setSelectedVariant] = useState("");
  const [serialInput, setSerialInput] = useState("");

  const currentProduct = mockProductsList.find((p) => p.id === selectedProduct);

  const parsedSerials = serialInput
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  function closeModal() {
    setIsAddModalOpen(false);
    setSelectedProduct("");
    setSelectedVariant("");
    setSerialInput("");
  }

  function handleProductChange(id) {
    setSelectedProduct(id);
    setSelectedVariant("");
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Inventory</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {inventorySerialNumbers.length} serial numbers tracked
          </p>
        </div>
        <button
          className="inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer bg-[#E60000] hover:bg-[#CC0000] text-white rounded-[4px] min-h-9 px-4 py-2"
          onClick={() => setIsAddModalOpen(true)}
          data-testid="button-add-stock"
        >
          <Plus className="w-4 h-4" /> Add Stock
        </button>
      </div>

      {/* ── ADD STOCK MODAL ── */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="fixed inset-0 bg-black/50" />
          <div
            className="relative z-50 bg-card rounded-[8px] w-full max-w-lg shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-border">
              <div>
                <h2 className="text-lg font-bold">Add Stock Entry</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Register new serial numbers for a product.
                </p>
              </div>
              <button
                className="inline-flex items-center justify-center h-8 w-8 rounded-[4px] hover:bg-secondary cursor-pointer mt-0.5"
                onClick={closeModal}
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-5">
              {/* Product */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Product</label>
                <ProductCombobox
                  value={selectedProduct}
                  onChange={handleProductChange}
                  productsList={mockProductsList}
                />
              </div>

              {/* Variant selector — shown only when a product is selected */}
              {currentProduct && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Variant</label>
                  <div className="flex flex-wrap gap-2">
                    {currentProduct.variants.map((v) => {
                      const active = selectedVariant === v.id;
                      return (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setSelectedVariant(active ? "" : v.id)}
                          className={cn(
                            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-xs font-medium border transition-colors cursor-pointer",
                            active
                              ? "bg-[#E60000] text-white border-[#E60000]"
                              : "bg-transparent text-foreground border-border hover:border-[#E60000]/50 hover:bg-red-50/60",
                          )}
                        >
                          {active && <Check className="w-3 h-3 shrink-0" />}
                          {v.label}
                        </button>
                      );
                    })}
                  </div>
                  {!selectedVariant && (
                    <p className="text-[11px] text-amber-600 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />{" "}
                      Select a variant to continue
                    </p>
                  )}
                </div>
              )}

              {/* Quantity display */}
              <div className="flex items-center gap-3 px-4 py-3 bg-secondary/50 rounded-[6px] border border-border">
                <div className="w-9 h-9 rounded-full bg-[#E60000]/10 flex items-center justify-center shrink-0">
                  <Hash className="w-4 h-4 text-[#E60000]" />
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    {parsedSerials.length} serial
                    {parsedSerials.length !== 1 ? "s" : ""} entered
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Each line or comma = one serial number
                  </p>
                </div>
              </div>

              {/* Serial numbers input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Serial Numbers</label>
                  {parsedSerials.length > 0 && (
                    <span className="text-[10px] font-semibold text-[#E60000] bg-red-50 px-2 py-0.5 rounded-full">
                      {parsedSerials.length} added
                    </span>
                  )}
                </div>
                <textarea
                  placeholder={
                    "SN-1001\nSN-1002\nSN-1003\n\nor paste comma-separated: SN-1001, SN-1002"
                  }
                  value={serialInput}
                  onChange={(e) => setSerialInput(e.target.value)}
                  className="flex w-full rounded-[4px] border border-input bg-transparent px-3 py-2 text-sm font-mono placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E60000]/30 min-h-[120px] resize-none"
                  data-testid="input-serial-numbers"
                />
                <p className="text-[11px] text-muted-foreground">
                  Enter one serial per line, or separate with commas.
                </p>
              </div>

              {/* Parsed preview */}
              {parsedSerials.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Preview
                  </p>
                  <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto p-3 bg-secondary/40 rounded-[6px] border border-border">
                    {parsedSerials.map((s, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 text-[11px] font-mono bg-card border border-border rounded-[4px] px-2 py-0.5 text-foreground"
                      >
                        <Hash className="w-2.5 h-2.5 text-muted-foreground" />
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 px-6 py-4 border-t border-border bg-secondary/20">
              <button
                className="inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer border border-border bg-transparent rounded-[4px] min-h-9 px-4 hover:bg-secondary"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer bg-[#E60000] hover:bg-[#CC0000] text-white rounded-[4px] min-h-9 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={
                  !selectedProduct ||
                  !selectedVariant ||
                  parsedSerials.length === 0
                }
                onClick={closeModal}
                data-testid="button-save-stock"
              >
                Add {parsedSerials.length > 0 ? `${parsedSerials.length} ` : ""}
                Serial{parsedSerials.length !== 1 ? "s" : ""}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── TABLE ── */}
      <div className="bg-card border border-border rounded-[6px] overflow-hidden flex flex-col">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
          <SearchBar
            placeholder="Search by serial number or product..."
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
              <option value="in-stock">In Stock</option>
              <option value="sold">Sold</option>
              <option value="reserved">Reserved</option>
            </select>
          </FilterPanel>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-secondary/60 text-muted-foreground border-b border-border">
              <tr>
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Variant</th>
                <th className="px-4 py-3 font-medium">No. of Stock</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Date Added</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {Object.values(
                inventorySerialNumbers.reduce((acc, item) => {
                  const key = `${item.product}::${item.variant}`;
                  if (!acc[key])
                    acc[key] = {
                      product: item.product,
                      variant: item.variant,
                      status: item.status,
                      date: item.date,
                      count: 0,
                    };
                  acc[key].count++;
                  return acc;
                }, {}),
              ).map((row, i) => (
                <tr key={i} className="hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3 font-medium">{row.product}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {row.variant}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center justify-center font-semibold text-sm bg-secondary/60 border border-border rounded-[4px] px-2.5 py-0.5 min-w-[2rem]">
                      {row.count}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {row.date}
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
