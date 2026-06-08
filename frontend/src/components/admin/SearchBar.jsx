import { LuSearch as Search } from "react-icons/lu";
export function SearchBar({ placeholder = "Search...", value, onChange, className }) {
    return (<div className={`relative${className ? ' ' + className : ''}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none"/>
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="pl-9 h-8 rounded-[4px] text-sm bg-secondary/60 border border-border w-full px-3 py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E60000]/30"
      />
    </div>);
}
