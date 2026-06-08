import { useState } from "react";
import { SearchBar } from "@/components/admin/SearchBar";
import { Pagination } from "@/components/admin/Pagination";

const movementsData = [
  {
    id: "MOV-001",
    product: "Wireless Headphones",
    type: "In",
    quantity: 50,
    reference: "PO-10023",
    date: "2023-10-25",
  },
  {
    id: "MOV-002",
    product: "USB-C Cable",
    type: "Out",
    quantity: 2,
    reference: "ORD-001",
    date: "2023-10-25",
  },
  {
    id: "MOV-003",
    product: "Bluetooth Mouse",
    type: "In",
    quantity: 20,
    reference: "PO-10024",
    date: "2023-10-24",
  },
  {
    id: "MOV-004",
    product: "Wireless Headphones",
    type: "Out",
    quantity: 1,
    reference: "ORD-003",
    date: "2023-10-24",
  },
];

export default function InventoryMovements() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Inventory Movements</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Track all stock movements across inventory
          </p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-[6px] overflow-hidden flex flex-col">
        <div className="p-4 border-b border-border">
          <SearchBar
            placeholder="Search movements..."
            value={search}
            onChange={setSearch}
            className="w-full sm:w-80"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground border-b border-border">
              <tr>
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium text-right">Quantity</th>
                <th className="px-4 py-3 font-medium">Reference</th>
                <th className="px-4 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {movementsData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="px-4 py-3 font-medium">{item.product}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-xs rounded font-medium ${item.type === "In" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                    >
                      {item.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-medium">
                    {item.type === "In" ? "+" : "-"}
                    {item.quantity}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {item.reference}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {item.date}
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
