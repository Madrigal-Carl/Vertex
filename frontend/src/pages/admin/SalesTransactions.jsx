import { useState } from "react";
import { SearchBar } from "@/components/admin/SearchBar";
import { Pagination } from "@/components/admin/Pagination";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { FilterPanel } from "@/components/admin/FilterPanel";
import { LuDownload as Download } from "react-icons/lu";
const transactionsData = [
  {
    id: "TXN-1001",
    type: "Product",
    customer: "John Doe",
    amount: 150.0,
    status: "Completed",
    date: "2023-10-25 14:30",
  },
  {
    id: "TXN-1002",
    type: "Service",
    customer: "Jane Smith",
    amount: 80.0,
    status: "Completed",
    date: "2023-10-25 10:15",
  },
  {
    id: "TXN-1003",
    type: "Product",
    customer: "Bob Johnson",
    amount: 210.0,
    status: "Pending",
    date: "2023-10-24 16:45",
  },
  {
    id: "TXN-1004",
    type: "Product",
    customer: "Alice Williams",
    amount: 45.0,
    status: "Completed",
    date: "2023-10-24 11:20",
  },
  {
    id: "TXN-1005",
    type: "Service",
    customer: "Charlie Brown",
    amount: 120.0,
    status: "Failed",
    date: "2023-10-23 09:10",
  },
];
export default function SalesTransactions() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <button className="inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer border border-border bg-transparent rounded-[4px] min-h-9 px-4 py-2 hover:bg-secondary">
          <Download className="w-4 h-4" /> Export
        </button>
      </div>

      <div className="bg-card border border-border rounded-[6px] overflow-hidden flex flex-col">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <SearchBar
            placeholder="Search transactions..."
            value={search}
            onChange={setSearch}
            className="w-full sm:w-80"
          />
          <FilterPanel>
            <select
              defaultValue="all"
              className="flex h-9 w-[140px] rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm cursor-pointer focus-visible:outline-none"
            >
              <option value="all">All Types</option>
              <option value="product">Product</option>
              <option value="service">Service</option>
            </select>
            <select
              defaultValue="all"
              className="flex h-9 w-[140px] rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm cursor-pointer focus-visible:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </FilterPanel>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground border-b border-border">
              <tr>
                <th className="px-4 py-3 font-medium">Transaction ID</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium text-right">Amount</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {transactionsData.map((txn) => (
                <tr
                  key={txn.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="px-4 py-3 font-medium">{txn.id}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {txn.type}
                  </td>
                  <td className="px-4 py-3">{txn.customer}</td>
                  <td className="px-4 py-3 text-right font-medium">
                    ${txn.amount.toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={txn.status} />
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {txn.date}
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
