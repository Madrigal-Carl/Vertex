import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "@/schemas/category.schema";

export default function CategoryModal({
  open,
  onClose,
  title,
  label,
  placeholder,
  defaultValues = { name: "" },
  onSubmit,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues,
    mode: "onTouched",
  });

  useEffect(() => {
    if (open) {
      reset(defaultValues);
    }
  }, [open, reset, defaultValues.name]);

  if (!open) return null;

  const handleFormSubmit = async (values) => {
    await onSubmit?.(values);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-black/50" />

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
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
              {...register("name")}
              placeholder={placeholder}
              className={`flex h-9 w-full rounded-[4px] border px-3 py-1 text-sm bg-transparent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${
                errors.name ? "border-red-300" : "border-input"
              }`}
            />

            {errors.name?.message && (
              <p className="text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 px-6 py-4 border-t border-border bg-secondary/20">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer border border-border bg-transparent rounded-[4px] min-h-9 px-4 hover:bg-secondary"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer bg-[#E60000] hover:bg-[#CC0000] text-white rounded-[4px] min-h-9 px-4"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
