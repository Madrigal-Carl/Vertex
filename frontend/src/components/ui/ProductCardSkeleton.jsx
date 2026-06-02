export default function ProductCardSkeleton() {
  return (
    <div
      className="bg-card border border-border flex flex-col animate-pulse"
      style={{ borderRadius: "8px", overflow: "hidden" }}
    >
      {/* Image */}
      <div className="h-44 bg-gray-200" />

      <div className="p-4 flex flex-col flex-1 gap-3">
        {/* Category */}
        <div className="h-3 w-20 bg-gray-200 rounded" />

        {/* Title */}
        <div className="space-y-2">
          <div className="h-4 w-3/4 bg-gray-200 rounded" />
          <div className="h-4 w-1/2 bg-gray-200 rounded" />
        </div>

        {/* Rating */}
        <div className="h-3 w-24 bg-gray-200 rounded" />

        {/* Description */}
        <div className="space-y-2 flex-1">
          <div className="h-3 w-full bg-gray-200 rounded" />
          <div className="h-3 w-5/6 bg-gray-200 rounded" />
        </div>

        {/* Price */}
        <div className="flex gap-2 items-center">
          <div className="h-5 w-24 bg-gray-200 rounded" />
          <div className="h-3 w-16 bg-gray-200 rounded" />
        </div>

        {/* Button */}
        <div className="h-10 w-full bg-gray-200 rounded" />
      </div>
    </div>
  );
}
