export function StatusBadge({ status, className }) {
  const s = status.toLowerCase();
  const styles = (() => {
    if (["active", "completed", "paid", "in stock"].includes(s))
      return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";
    if (["pending", "reserved", "draft"].includes(s))
      return "bg-amber-50 text-amber-700 ring-1 ring-amber-200";
    if (["cancelled", "rejected", "failed", "inactive", "archived"].includes(s))
      return "bg-red-50 text-red-700 ring-1 ring-red-200";
    if (["processing", "sold"].includes(s))
      return "bg-blue-50 text-blue-700 ring-1 ring-blue-200";
    return "bg-secondary text-muted-foreground ring-1 ring-border";
  })();
  const dotColor = (() => {
    if (["active", "completed", "paid", "in stock"].includes(s))
      return "bg-emerald-500";
    if (["pending", "reserved", "draft"].includes(s)) return "bg-amber-500";
    if (["cancelled", "rejected", "failed", "inactive", "archived"].includes(s))
      return "bg-red-500";
    if (["processing", "sold"].includes(s)) return "bg-blue-500";
    return "bg-muted-foreground";
  })();
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${styles}${className ? " " + className : ""}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`} />
      {status}
    </span>
  );
}
