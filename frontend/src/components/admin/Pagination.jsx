import {
  LuChevronLeft as ChevronLeft,
  LuChevronRight as ChevronRight,
} from "react-icons/lu";

export function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-card">
      <p className="text-xs text-muted-foreground">
        Page <span className="font-medium text-foreground">{currentPage}</span>{" "}
        of <span className="font-medium text-foreground">{totalPages}</span>
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="inline-flex items-center justify-center rounded-[4px] h-7 w-7 border border-border bg-transparent text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`inline-flex items-center justify-center rounded-[4px] h-7 w-7 text-xs cursor-pointer border transition-colors${page === currentPage ? " bg-[#E60000] hover:bg-[#CC0000] text-white border-[#E60000]" : " border-transparent text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="inline-flex items-center justify-center rounded-[4px] h-7 w-7 border border-border bg-transparent text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
