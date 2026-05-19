import { useState } from "react";
import { Star } from "lucide-react";

export default function StarRating({
  value,
  onChange,
  readonly = false,
  size = 16,
}) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = (hovered || value) >= star;
        return (
          <Star
            key={star}
            size={size}
            className={`transition-colors ${filled ? "text-amber-400 fill-amber-400" : "text-gray-300"} ${!readonly ? "cursor-pointer" : ""}`}
            onMouseEnter={() => !readonly && setHovered(star)}
            onMouseLeave={() => !readonly && setHovered(0)}
            onClick={() => !readonly && onChange?.(star)}
          />
        );
      })}
    </div>
  );
}
