import { useState } from "react";
import { Plus, MapPin, Check, Pencil, Trash2, X } from "lucide-react";

const INITIAL_ADDRESSES = [
  {
    id: "addr-1",
    label: "Home",
    street: "Unit 4B, 123 Rizal Avenue",
    barangay: "Barangay San Lorenzo",
    city: "Makati City",
    province: "Metro Manila",
    zip: "1229",
    isDefault: true,
  },
  {
    id: "addr-2",
    label: "Work",
    street: "5F Vertex Tower, 88 Ayala Avenue",
    barangay: "Barangay Bel-Air",
    city: "Makati City",
    province: "Metro Manila",
    zip: "1226",
    isDefault: false,
  },
];

const EMPTY_FORM = {
  label: "Home",
  street: "",
  barangay: "",
  city: "",
  province: "",
  zip: "",
};

function AddressForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial ?? EMPTY_FORM);
  const f = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  return (
    <div
      className="bg-white border-2 border-[#0F2436] p-6 space-y-4"
      style={{ borderRadius: "8px" }}
    >
      <div className="flex items-center justify-between mb-1">
        <p className="font-display font-bold text-[#0F2436] text-base">
          {initial ? "Edit Address" : "Add New Address"}
        </p>
        <button
          onClick={onCancel}
          className="text-[#5E7386] hover:text-[#0F2436] transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      <div>
        <label className="block text-xs font-display tracking-widest text-[#5E7386] uppercase mb-2">
          Address Label
        </label>
        <div className="flex gap-2">
          {["Home", "Work", "Other"].map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setForm((a) => ({ ...a, label: l }))}
              className={`px-4 py-2 text-xs font-display tracking-widest uppercase border transition-all ${form.label === l ? "bg-[#0F2436] text-white border-[#0F2436]" : "border-[#0F2436]/20 text-[#5E7386] hover:border-[#0F2436]/50"}`}
              style={{ borderRadius: "2px" }}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-xs font-display tracking-widest text-[#5E7386] uppercase mb-2">
          Street / Unit No.
        </label>
        <input
          value={form.street}
          onChange={f("street")}
          placeholder="Unit 4B, 123 Rizal Avenue"
          className="w-full border border-[#0F2436]/20 px-3 py-2.5 text-sm font-sans text-[#0F2436] focus:outline-none focus:border-[#0F2436]"
          style={{ borderRadius: "4px" }}
        />
      </div>
      <div>
        <label className="block text-xs font-display tracking-widest text-[#5E7386] uppercase mb-2">
          Barangay
        </label>
        <input
          value={form.barangay}
          onChange={f("barangay")}
          placeholder="Barangay San Lorenzo"
          className="w-full border border-[#0F2436]/20 px-3 py-2.5 text-sm font-sans text-[#0F2436] focus:outline-none focus:border-[#0F2436]"
          style={{ borderRadius: "4px" }}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-display tracking-widest text-[#5E7386] uppercase mb-2">
            City
          </label>
          <input
            value={form.city}
            onChange={f("city")}
            placeholder="Makati City"
            className="w-full border border-[#0F2436]/20 px-3 py-2.5 text-sm font-sans text-[#0F2436] focus:outline-none focus:border-[#0F2436]"
            style={{ borderRadius: "4px" }}
          />
        </div>
        <div>
          <label className="block text-xs font-display tracking-widest text-[#5E7386] uppercase mb-2">
            Province
          </label>
          <input
            value={form.province}
            onChange={f("province")}
            placeholder="Metro Manila"
            className="w-full border border-[#0F2436]/20 px-3 py-2.5 text-sm font-sans text-[#0F2436] focus:outline-none focus:border-[#0F2436]"
            style={{ borderRadius: "4px" }}
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-display tracking-widest text-[#5E7386] uppercase mb-2">
          ZIP Code
        </label>
        <input
          value={form.zip}
          onChange={f("zip")}
          placeholder="1229"
          className="w-full border border-[#0F2436]/20 px-3 py-2.5 text-sm font-sans text-[#0F2436] focus:outline-none focus:border-[#0F2436]"
          style={{ borderRadius: "4px" }}
        />
      </div>
      <div className="flex gap-3 pt-1">
        <button
          onClick={() => onSave(form)}
          disabled={!form.street.trim() || !form.city.trim()}
          className="flex-1 py-2.5 bg-[#E63946] text-white font-display tracking-widest text-xs uppercase hover:bg-[#cc2f3b] transition-colors disabled:opacity-40"
          style={{ borderRadius: "4px" }}
        >
          Save Address
        </button>
        <button
          onClick={onCancel}
          className="px-5 py-2.5 border border-[#0F2436]/20 text-[#5E7386] font-display tracking-widest text-xs uppercase hover:border-[#0F2436]/50 transition-colors"
          style={{ borderRadius: "4px" }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default function Address() {
  const [addresses, setAddresses] = useState(INITIAL_ADDRESSES);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  function handleAdd(form) {
    const newAddr = {
      id: `addr-${Date.now()}`,
      ...form,
      isDefault: addresses.length === 0,
    };
    setAddresses((prev) => [...prev, newAddr]);
    setShowForm(false);
  }

  function handleEdit(id, form) {
    setAddresses((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...form } : a)),
    );
    setEditingId(null);
  }

  function handleDelete(id) {
    setAddresses((prev) => {
      const filtered = prev.filter((a) => a.id !== id);
      if (filtered.length > 0 && !filtered.some((a) => a.isDefault)) {
        filtered[0].isDefault = true;
      }
      return filtered;
    });
  }

  function handleSetDefault(id) {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
  }

  return (
    <div className="min-h-screen bg-[#F0F5FA]">
      <div className="bg-[#0F2436] py-14 px-6 text-center">
        <h1 className="text-4xl font-display font-bold text-white">
          My Addresses
        </h1>
        <p className="text-white/50 text-sm font-sans mt-2">
          Manage your delivery addresses
        </p>
      </div>

      <div className="max-w-xl mx-auto px-6 py-10 space-y-4">
        {/* Address list */}
        {addresses.map((addr) =>
          editingId === addr.id ? (
            <AddressForm
              key={addr.id}
              initial={{
                label: addr.label,
                street: addr.street,
                barangay: addr.barangay,
                city: addr.city,
                province: addr.province,
                zip: addr.zip,
              }}
              onSave={(form) => handleEdit(addr.id, form)}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <div
              key={addr.id}
              className={`bg-white border-2 p-5 transition-all ${addr.isDefault ? "border-[#0F2436]" : "border-[#0F2436]/10"}`}
              style={{ borderRadius: "8px" }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 flex items-center justify-center flex-shrink-0 ${addr.isDefault ? "bg-[#0F2436]" : "bg-[#F0F5FA]"}`}
                    style={{ borderRadius: "4px" }}
                  >
                    <MapPin
                      size={14}
                      className={
                        addr.isDefault ? "text-white" : "text-[#5E7386]"
                      }
                    />
                  </div>
                  <div>
                    <span className="font-display font-bold text-[#0F2436] text-sm">
                      {addr.label}
                    </span>
                    {addr.isDefault && (
                      <span
                        className="ml-2 text-[9px] bg-[#0F2436] text-white px-2 py-0.5 font-display tracking-widest uppercase"
                        style={{ borderRadius: "2px" }}
                      >
                        Default
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingId(addr.id)}
                    className="w-7 h-7 flex items-center justify-center text-[#5E7386] hover:text-[#0F2436] transition-colors"
                    title="Edit"
                  >
                    <Pencil size={13} />
                  </button>
                  {!addr.isDefault && (
                    <button
                      onClick={() => handleDelete(addr.id)}
                      className="w-7 h-7 flex items-center justify-center text-[#5E7386] hover:text-[#E63946] transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              </div>

              <div className="pl-10 space-y-0.5">
                <p className="text-sm text-[#0F2436] font-sans">
                  {addr.street}
                </p>
                <p className="text-sm text-[#5E7386] font-sans">
                  {addr.barangay}
                </p>
                <p className="text-sm text-[#5E7386] font-sans">
                  {addr.city}, {addr.province} {addr.zip}
                </p>
              </div>

              {!addr.isDefault && (
                <div className="pl-10 mt-3 pt-3 border-t border-[#F0F5FA]">
                  <button
                    onClick={() => handleSetDefault(addr.id)}
                    className="flex items-center gap-1.5 text-xs font-display tracking-widest text-[#5E7386] uppercase hover:text-[#0F2436] transition-colors"
                  >
                    <Check size={12} /> Set as Default
                  </button>
                </div>
              )}
            </div>
          ),
        )}

        {/* Add new address */}
        {showForm ? (
          <AddressForm onSave={handleAdd} onCancel={() => setShowForm(false)} />
        ) : (
          <button
            data-testid="btn-add-address"
            onClick={() => setShowForm(true)}
            className="w-full py-4 border-2 border-dashed border-[#0F2436]/20 text-[#5E7386] font-display tracking-widest text-xs uppercase hover:border-[#0F2436]/50 hover:text-[#0F2436] transition-all flex items-center justify-center gap-2"
            style={{ borderRadius: "8px" }}
          >
            <Plus size={14} /> Add New Address
          </button>
        )}
      </div>
    </div>
  );
}
