import { useState } from "react";
import { LuPlus as Plus, LuX as X } from "react-icons/lu";

function cartesian(arrays) {
  if (arrays.length === 0) return [[]];
  const [first, ...rest] = arrays;
  const restProduct = cartesian(rest);
  return first.flatMap((v) => restProduct.map((combo) => [v, ...combo]));
}

export function VariantBuilder() {
  const [attributes, setAttributes] = useState([{ name: "", values: [] }]);
  const [generated, setGenerated] = useState(false);
  const [comboPrices, setComboPrices] = useState({});

  const addAttribute = () =>
    setAttributes([...attributes, { name: "", values: [] }]);
  const removeAttribute = (i) =>
    setAttributes(attributes.filter((_, idx) => idx !== i));
  const updateName = (i, name) => {
    const a = [...attributes];
    a[i].name = name;
    setAttributes(a);
  };
  const updateValues = (i, str) => {
    const a = [...attributes];
    a[i].values = str
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    setAttributes(a);
  };

  const validAttrs = attributes.filter((a) => a.values.length > 0);
  const combos = cartesian(validAttrs.map((a) => a.values));

  function setComboField(key, field, val) {
    setComboPrices((prev) => ({
      ...prev,
      [key]: { ...prev[key], [field]: val },
    }));
  }

  function effectivePrice(key) {
    const { price = "", discount = "" } = comboPrices[key] ?? {};
    const p = parseFloat(price);
    const d = parseFloat(discount);
    if (!price || isNaN(p)) return null;
    if (!discount || isNaN(d) || d === 0) return null;
    const final = p * (1 - Math.min(d, 100) / 100);
    return final.toFixed(2);
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {attributes.map((attr, i) => (
          <div key={i} className="flex gap-3 items-start">
            <div className="w-36 shrink-0">
              <input
                placeholder="e.g. Color"
                value={attr.name}
                onChange={(e) => updateName(i, e.target.value)}
                className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
            <div className="flex-1">
              <input
                placeholder="e.g. Black, White, Red (comma separated)"
                defaultValue={attr.values.join(", ")}
                onBlur={(e) => updateValues(i, e.target.value)}
                className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
            <button
              onClick={() => removeAttribute(i)}
              className="inline-flex items-center justify-center h-9 w-9 rounded-[4px] border border-transparent bg-transparent hover:bg-secondary cursor-pointer shrink-0"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={addAttribute}
          className="inline-flex items-center justify-center gap-1.5 text-xs font-medium cursor-pointer border border-border bg-transparent rounded-[4px] min-h-8 px-3 hover:bg-secondary"
        >
          <Plus className="w-3.5 h-3.5" /> Add Attribute
        </button>
        <button
          onClick={() => setGenerated(true)}
          className="inline-flex items-center justify-center gap-1.5 text-xs font-medium cursor-pointer border border-border rounded-[4px] min-h-8 px-3 bg-secondary text-foreground hover:bg-secondary/80"
        >
          Generate Combinations
        </button>
      </div>

      {generated && combos.length > 0 && (
        <div className="mt-2 border border-border rounded-[6px] overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-secondary/60 text-muted-foreground border-b border-border">
              <tr>
                <th className="px-4 py-2.5 font-medium">Variant</th>
                <th className="px-4 py-2.5 font-medium">Price ($)</th>
                <th className="px-4 py-2.5 font-medium">Discount (%)</th>
                <th className="px-4 py-2.5 font-medium text-muted-foreground">
                  Effective Price
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {combos.map((combo, i) => {
                const label = combo.join(" · ");
                const key = combo.join("::");
                const ep = effectivePrice(key);
                const rawPrice = comboPrices[key]?.price ?? "";
                return (
                  <tr key={i} className="hover:bg-secondary/20">
                    <td className="px-4 py-2.5">
                      <div className="flex flex-wrap gap-1">
                        {combo.map((v, vi) => (
                          <span
                            key={vi}
                            className="inline-flex items-center text-[11px] font-medium px-1.5 py-0.5 rounded-[3px] bg-secondary border border-border"
                          >
                            {v}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-2.5">
                      <input
                        type="number"
                        placeholder="0.00"
                        min={0}
                        step="0.01"
                        value={rawPrice}
                        onChange={(e) =>
                          setComboField(key, "price", e.target.value)
                        }
                        className="h-8 rounded-[4px] w-28 border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none"
                      />
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="relative w-24">
                        <input
                          type="number"
                          placeholder="0"
                          min={0}
                          max={100}
                          value={comboPrices[key]?.discount ?? ""}
                          onChange={(e) =>
                            setComboField(key, "discount", e.target.value)
                          }
                          className="h-8 rounded-[4px] w-full border border-input bg-transparent px-3 pr-7 py-1 text-sm focus-visible:outline-none"
                        />
                        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                          %
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">
                      {ep != null ? (
                        <div className="flex gap-2">
                          <span className="text-sm font-semibold text-emerald-700">
                            ${ep}
                          </span>
                          {rawPrice && (
                            <span className="text-[11px] text-muted-foreground line-through">
                              ${parseFloat(rawPrice).toFixed(2)}
                            </span>
                          )}
                        </div>
                      ) : rawPrice ? (
                        <span className="text-sm font-semibold">
                          ${parseFloat(rawPrice).toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {generated && combos.length === 0 && (
        <p className="text-sm text-muted-foreground italic">
          No combinations yet — add at least one attribute with values above.
        </p>
      )}
    </div>
  );
}
