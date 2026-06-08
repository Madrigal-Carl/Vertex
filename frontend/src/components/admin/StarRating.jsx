import { LuStar as Star, LuStarHalf as StarHalf } from "react-icons/lu";

export function StarRating({ rating, max = 5, className }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  return (
    <div className={`flex items-center${className ? " " + className : ""}`}>
      {[...Array(max)].map((_, i) => {
        if (i < fullStars) {
          return (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          );
        }
        if (i === fullStars && hasHalfStar) {
          return (
            <StarHalf
              key={i}
              className="w-4 h-4 fill-yellow-400 text-yellow-400"
            />
          );
        }
        return (
          <Star key={i} className="w-4 h-4 text-gray-300 dark:text-gray-600" />
        );
      })}
    </div>
  );
}
