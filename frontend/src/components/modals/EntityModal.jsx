import { useState } from "react";

export default function EntityModal({
  open,
  onClose,
  title,
  label,
  placeholder,
  onSubmit,
}) {
  const [value, setValue] = useState("");

  if (!open) return null;

  const handleSubmit = () => {
    onSubmit?.(value);
    setValue("");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-black/50" />

      <div
        className="relative z-50 bg-card rounded-[6px] w-full max-w-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 pt-6 pb-4 border-b border-border">
          <h2 className="text-lg font-bold">{title}</h2>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">{label}</label>

            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={placeholder}
              className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 px-6 py-4 border-t border-border bg-secondary/20">
          <button
            className="inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer border border-border bg-transparent rounded-[4px] min-h-9 px-4 hover:bg-secondary"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer bg-[#E60000] hover:bg-[#CC0000] text-white rounded-[4px] min-h-9 px-4"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
