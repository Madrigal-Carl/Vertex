import { useState } from "react";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { SearchBar } from "@/components/admin/SearchBar";
import { Pagination } from "@/components/admin/Pagination";
import { StarRating } from "@/components/admin/StarRating";
import { LuCheck as Check, LuX as X } from "react-icons/lu";
const websiteReviewsData = [
  {
    id: "WR-001",
    name: "David Miller",
    email: "david@example.com",
    rating: 5,
    message: "The website is so easy to use, found what I needed in seconds!",
    date: "2023-10-25",
    status: "Pending",
  },
  {
    id: "WR-002",
    name: "Sarah Connor",
    email: "sarah@example.com",
    rating: 4,
    message: "Good experience overall, but checkout could be faster.",
    date: "2023-10-24",
    status: "Approved",
  },
  {
    id: "WR-003",
    name: "Mike Tyson",
    email: "mike@example.com",
    rating: 5,
    message: "Love the new redesign.",
    date: "2023-10-23",
    status: "Approved",
  },
  {
    id: "WR-004",
    name: "Ellen Ripley",
    email: "ellen@example.com",
    rating: 2,
    message: "Had trouble logging into my account today.",
    date: "2023-10-22",
    status: "Rejected",
  },
];
export default function WebsiteReviews() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Website Reviews</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            General reviews and feedback about the website experience
          </p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-[6px] overflow-hidden flex flex-col">
        <div className="p-4 border-b border-border">
          <SearchBar
            placeholder="Search reviews..."
            value={search}
            onChange={setSearch}
            className="w-full sm:w-80"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-secondary/60 text-muted-foreground border-b border-border">
              <tr>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Rating</th>
                <th className="px-4 py-3 font-medium">Message</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {websiteReviewsData.map((review) => (
                <tr
                  key={review.id}
                  className="hover:bg-secondary/30 transition-colors"
                  data-testid={`row-review-${review.id}`}
                >
                  <td className="px-4 py-3">
                    <p className="font-medium">{review.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {review.email}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <StarRating rating={review.rating} />
                  </td>
                  <td className="px-4 py-3 max-w-xs">
                    <p className="truncate text-muted-foreground">
                      {review.message}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {review.date}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={review.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-1">
                      <button
                        className="inline-flex items-center justify-center h-8 w-8 rounded-[4px] border border-transparent bg-transparent text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 cursor-pointer"
                        data-testid={`button-approve-${review.id}`}
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        className="inline-flex items-center justify-center h-8 w-8 rounded-[4px] border border-transparent bg-transparent text-[#E60000] hover:text-[#CC0000] hover:bg-red-50 cursor-pointer"
                        data-testid={`button-reject-${review.id}`}
                      >
                        <X className="w-4 h-4" />
                      </button>
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
