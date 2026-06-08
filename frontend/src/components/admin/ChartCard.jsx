export function ChartCard({ title, subtitle, action, children, className }) {
  return (
    <div
      className={`bg-card border border-border rounded-[6px] overflow-hidden${className ? " " + className : ""}`}
    >
      <div className="flex items-start justify-between px-5 pt-5 pb-4 border-b border-border">
        <div>
          <p className="text-sm font-semibold text-foreground">{title}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}
