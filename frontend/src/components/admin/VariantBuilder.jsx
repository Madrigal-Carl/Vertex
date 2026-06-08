import { useState } from "react";
import { LuPlus as Plus, LuX as X } from "react-icons/lu";

export function VariantBuilder() {
  const [attributes, setAttributes] = useState([{ name: "", values: [] }]);
  const [generated, setGenerated] = useState(false);
  const addAttribute = () =>
    setAttributes([...attributes, { name: "", values: [] }]);
  const removeAttribute = (index) =>
    setAttributes(attributes.filter((_, i) => i !== index));
  const updateAttributeName = (index, name) => {
    const newAttrs = [...attributes];
    newAttrs[index].name = name;
    setAttributes(newAttrs);
  };
  const updateAttributeValues = (index, valueStr) => {
    const newAttrs = [...attributes];
    newAttrs[index].values = valueStr
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    setAttributes(newAttrs);
  };
  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {attributes.map((attr, index) => (
          <div key={index} className="flex gap-4 items-start">
            <div className="flex-1">
              <input
                placeholder="e.g. Color"
                value={attr.name}
                onChange={(e) => updateAttributeName(index, e.target.value)}
                className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
            <div className="flex-[2]">
              <input
                placeholder="e.g. Black, White, Red (comma separated)"
                defaultValue={attr.values.join(", ")}
                onBlur={(e) => updateAttributeValues(index, e.target.value)}
                className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
            <button
              onClick={() => removeAttribute(index)}
              className="inline-flex items-center justify-center h-9 w-9 rounded-[4px] border border-transparent bg-transparent hover:bg-secondary cursor-pointer"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <button
          onClick={addAttribute}
          className="inline-flex items-center justify-center gap-2 text-xs font-medium cursor-pointer border border-border bg-transparent rounded-[4px] min-h-8 px-3 hover:bg-secondary"
        >
          <Plus className="w-4 h-4" /> Add Attribute
        </button>
        <button
          onClick={() => setGenerated(true)}
          className="inline-flex items-center justify-center gap-2 text-xs font-medium cursor-pointer border border-border rounded-[4px] min-h-8 px-3 bg-secondary text-foreground hover:bg-secondary/80"
        >
          Generate Combinations
        </button>
      </div>
      {generated && attributes[0]?.values.length > 0 && (
        <div className="mt-6 border rounded-[6px] overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="px-4 py-2 font-medium">Variant</th>
                <th className="px-4 py-2 font-medium">Price Override</th>
                <th className="px-4 py-2 font-medium">SKU</th>
                <th className="px-4 py-2 font-medium">Stock</th>
              </tr>
            </thead>
            <tbody>
              {attributes[0].values.map((v1, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="px-4 py-2">{v1}</td>
                  <td className="px-4 py-2">
                    <input
                      className="h-8 rounded-[4px] w-32 border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      className="h-8 rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none"
                      placeholder={`SKU-${v1.toUpperCase()}`}
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      className="h-8 rounded-[4px] w-24 border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none"
                      placeholder="0"
                      type="number"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
