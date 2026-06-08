import {
  LuArrowDownRight as ArrowDownRight,
  LuArrowUpRight as ArrowUpRight,
} from "react-icons/lu";

export function KPICard({ title, value, trend, trendLabel, className }) {
  const isPositive = trend !== undefined && trend >= 0;
  const isNegative = trend !== undefined && trend < 0;
  return (
    <div
      className={`bg-card border border-border rounded-[6px] p-5 flex flex-col gap-3${className ? " " + className : ""}`}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
        {title}
      </p>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
        <p className="text-xl md:text-2xl font-bold tracking-tight text-foreground leading-none">
          {value}
        </p>
        {trend !== undefined && (
          <div
            className={`flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-[4px] leading-none shrink-0${isPositive ? " text-emerald-700 bg-emerald-50" : ""}${isNegative ? " text-red-700 bg-red-50" : ""}`}
          >
            {isPositive ? (
              <ArrowUpRight className="w-3 h-3" />
            ) : (
              <ArrowDownRight className="w-3 h-3" />
            )}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      {trendLabel && (
        <p className="text-[11px] text-muted-foreground leading-none">
          {trendLabel}
        </p>
      )}
    </div>
  );
}
