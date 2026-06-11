import { VariantBuilder } from "@/components/admin/VariantBuilder";
import { ImageUploader } from "@/components/admin/ImageUploader";

export default function ProductModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-black/50" />
      <div
        className="relative z-50 bg-card rounded-[6px] w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 pt-6 pb-4 border-b border-border sticky top-0 bg-card z-10">
          <h2 className="text-lg font-bold">Add New Product</h2>
          <p className="text-sm text-muted-foreground">
            Fill in the details below to create a new product listing.
          </p>
        </div>

        <div className="px-6 py-6 space-y-8">
          {/* 1. Basic Information */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <span className="w-5 h-5 rounded-full bg-[#E60000] text-white text-[10px] font-bold flex items-center justify-center">
                1
              </span>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Basic Information
              </h3>
            </div>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Product Name</label>
                <input
                  placeholder="e.g. Wireless Noise-Cancelling Headphones"
                  className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  data-testid="input-product-name"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  placeholder="Describe the product — features, specifications, use cases..."
                  className="flex w-full rounded-[4px] border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-[110px] resize-none"
                  data-testid="input-product-description"
                />
              </div>
            </div>
          </section>

          {/* 2. Organization */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <span className="w-5 h-5 rounded-full bg-[#E60000] text-white text-[10px] font-bold flex items-center justify-center">
                2
              </span>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Organization
              </h3>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Category</label>
              <select
                className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm cursor-pointer focus-visible:outline-none"
                data-testid="select-product-category"
              >
                <option value="">Select category</option>
                <option value="electronics">Electronics</option>
                <option value="accessories">Accessories</option>
                <option value="apparel">Apparel</option>
                <option value="home">Home</option>
              </select>
            </div>
          </section>

          {/* 3. Variant Combinations */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <span className="w-5 h-5 rounded-full bg-[#E60000] text-white text-[10px] font-bold flex items-center justify-center">
                3
              </span>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Variant Combinations
              </h3>
            </div>
            <VariantBuilder />
          </section>

          {/* 4. Media */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <span className="w-5 h-5 rounded-full bg-[#E60000] text-white text-[10px] font-bold flex items-center justify-center">
                4
              </span>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Media
              </h3>
            </div>
            <ImageUploader />
          </section>
        </div>

        <div className="flex justify-end gap-2 px-6 py-4 border-t border-border bg-secondary/20 sticky bottom-0">
          <button
            className="inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer border border-border bg-transparent rounded-[4px] min-h-9 px-4 hover:bg-secondary"
            onClick={onClose}
            data-testid="button-cancel-product"
          >
            Cancel
          </button>
          <button
            className="inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer bg-[#E60000] hover:bg-[#CC0000] text-white rounded-[4px] min-h-9 px-4"
            onClick={onClose}
            data-testid="button-save-product"
          >
            Save Product
          </button>
        </div>
      </div>
    </div>
  );
}
