import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productFormSchema } from "@/schemas/product.schema";
import { VariantBuilder } from "@/components/admin/VariantBuilder";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { useAllCategories } from "@/hooks/queries/useCategoryQueries";
import { useCreateProduct } from "@/hooks/queries/useProductQueries";
import { useUploadImages } from "@/hooks/queries/useUploadMutations";
import { LuChevronDown } from "react-icons/lu";

export default function ProductModal({ onClose }) {
  const { data: categoriesData } = useAllCategories();
  const categories = categoriesData ?? [];

  const form = useForm({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      description: "",
      categoryId: "",
      images: [],
      variants: [],
    },
  });

  const { setValue, register, handleSubmit, watch } = form;
  const [images, setImages] = useState([]);
  const [primaryIndex, setPrimaryIndex] = useState(0);
  const [variants, setVariants] = useState([]);
  const handleVariantsChange = useCallback((v) => {
    setVariants(v);
  }, []);

  const { mutateAsync: uploadImagesMutation } = useUploadImages();
  const { mutateAsync: createProductMutation } = useCreateProduct();

  const onSubmit = async (values) => {
    try {
      const uploadedImages = await uploadImagesMutation(
        images.map((img) => img.file),
      );

      const formattedImages = uploadedImages.map((img, index) => ({
        ...img,
        isPrimary: index === primaryIndex,
      }));

      await createProductMutation({
        ...values,
        images: formattedImages,
      });

      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const formatted = images.map((img, index) => ({
      url: img.uploadedUrl || img.url,
      publicId: img.publicId || "",
      isPrimary: index === primaryIndex,
    }));

    setValue("images", formatted, { shouldValidate: true });
  }, [images, primaryIndex, setValue]);

  useEffect(() => {
    setValue("variants", variants, { shouldValidate: true });
  }, [variants, setValue]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-black/50" />
      <form
        onSubmit={handleSubmit(onSubmit)}
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
                  {...register("name")}
                  placeholder="e.g. Wireless Noise-Cancelling Headphones"
                  className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  {...register("description")}
                  placeholder="Describe the product — features, specifications, use cases..."
                  className="flex w-full rounded-[4px] border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-[110px] resize-none"
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
              <div className="relative w-full">
                <select
                  {...register("categoryId")}
                  className="flex h-9 w-full appearance-none rounded-[4px] border border-input bg-transparent px-3 pr-10 py-1 text-sm cursor-pointer focus-visible:outline-none"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>

                <LuChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
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
            <VariantBuilder onVariantsChange={handleVariantsChange} />
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
            <ImageUploader
              images={images}
              setImages={setImages}
              primaryIndex={primaryIndex}
              setPrimaryIndex={setPrimaryIndex}
            />
          </section>
        </div>

        <div className="flex justify-end gap-2 px-6 py-4 border-t border-border bg-secondary/20 sticky bottom-0">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer border border-border bg-transparent rounded-[4px] min-h-9 px-4 hover:bg-secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer bg-[#E60000] hover:bg-[#CC0000] text-white rounded-[4px] min-h-9 px-4"
          >
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
}
