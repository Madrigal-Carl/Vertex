function FieldRow({ label, hint, children }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start py-5 border-b border-border last:border-0 last:pb-0">
      <div className="md:pt-0.5">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {hint && (
          <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
            {hint}
          </p>
        )}
      </div>
      <div className="md:col-span-2">{children}</div>
    </div>
  );
}

export default function Store() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Store</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage your store details visible to customers.
        </p>
      </div>

      <section className="bg-card border border-border rounded-[6px] overflow-hidden">
        <div className="px-6 py-5 border-b border-border">
          <h2 className="text-base font-semibold">Store Information</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Basic details about your store visible to customers.
          </p>
        </div>
        <div className="px-6">
          <FieldRow label="Store Name" hint="The public name of your store.">
            <input
              defaultValue="Vertex Store"
              className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E60000]/30"
            />
          </FieldRow>
          <FieldRow
            label="Store Description"
            hint="A short blurb shown on your storefront."
          >
            <textarea
              defaultValue="Your one-stop shop for electronics and accessories."
              className="flex w-full rounded-[4px] border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E60000]/30 resize-none min-h-[80px]"
            />
          </FieldRow>
          <FieldRow
            label="Contact Email"
            hint="Customer-facing support email address."
          >
            <input
              type="email"
              defaultValue="contact@vertex.com"
              className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E60000]/30"
            />
          </FieldRow>
          <FieldRow label="Phone Number">
            <input
              type="tel"
              defaultValue="+1 (555) 123-4567"
              className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E60000]/30"
            />
          </FieldRow>
          <FieldRow label="Store Address">
            <textarea
              defaultValue="123 Vertex Way, San Francisco, CA 94105"
              className="flex w-full rounded-[4px] border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E60000]/30 resize-none min-h-[72px]"
            />
          </FieldRow>
          <FieldRow
            label="Currency"
            hint="Currency used for all pricing and transactions."
          >
            <select
              defaultValue="usd"
              className="flex h-9 rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none cursor-pointer w-full md:w-48"
            >
              <option value="usd">USD — US Dollar ($)</option>
              <option value="eur">EUR — Euro (€)</option>
              <option value="gbp">GBP — British Pound (£)</option>
              <option value="php">PHP — Philippine Peso (₱)</option>
              <option value="sgd">SGD — Singapore Dollar (S$)</option>
            </select>
          </FieldRow>
        </div>
        <div className="px-6 py-4 border-t border-border bg-secondary/20 flex justify-end">
          <button className="inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer bg-[#E60000] hover:bg-[#CC0000] text-white rounded-[4px] h-8 px-4">
            Save Store Info
          </button>
        </div>
      </section>
    </div>
  );
}
