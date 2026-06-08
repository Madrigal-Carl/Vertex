export function FilterPanel({ children, className }) {
  return (
    <div
      className={`flex flex-wrap items-center gap-2${className ? " " + className : ""}`}
    >
      {children}
    </div>
  );
}
