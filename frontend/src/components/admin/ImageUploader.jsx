import { useRef, useState } from "react";
import {
  LuUpload as Upload,
  LuX as X,
  LuStar,
  LuStarOff,
} from "react-icons/lu";

export function ImageUploader({ className }) {
  const [images, setImages] = useState([]);
  const [primaryIndex, setPrimaryIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  function addFiles(files) {
    const incoming = Array.from(files).filter((f) =>
      f.type.startsWith("image/"),
    );
    if (!incoming.length) return;
    const newEntries = incoming.map((file) => ({
      id: crypto.randomUUID(),
      file,
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setImages((prev) => {
      const updated = [...prev, ...newEntries];
      return updated;
    });
  }

  function removeImage(idx) {
    setImages((prev) => {
      URL.revokeObjectURL(prev[idx].url);
      const next = prev.filter((_, i) => i !== idx);
      if (primaryIndex >= next.length)
        setPrimaryIndex(Math.max(0, next.length - 1));
      else if (idx < primaryIndex) setPrimaryIndex(primaryIndex - 1);
      return next;
    });
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  }

  return (
    <div className={`space-y-3${className ? " " + className : ""}`}>
      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-[6px] p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
          dragging ? "border-[#E60000] bg-red-50/40" : "hover:bg-muted/50"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
          <Upload className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-sm font-semibold mb-1">
          Click to upload or drag and drop
        </h3>
        <p className="text-xs text-muted-foreground">
          SVG, PNG, JPG or GIF (max. 3MB each)
        </p>
      </div>

      {/* Image grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 md:grid-cols-6">
          {images.map((img, idx) => (
            <div key={img.id} className="relative group">
              <div
                className={`relative rounded-[4px] overflow-hidden border-2 transition-colors cursor-pointer aspect-square ${
                  idx === primaryIndex
                    ? "border-[#E60000]"
                    : "border-border hover:border-muted-foreground/50"
                }`}
                onClick={() => setPrimaryIndex(idx)}
                title="Click to set as primary"
              >
                <img
                  src={img.url}
                  alt={img.name}
                  className="w-full h-full object-cover"
                />

                {/* Primary badge */}
                {idx === primaryIndex && (
                  <div className="absolute bottom-0 left-0 right-0 bg-[#E60000] text-white text-[9px] font-bold text-center py-0.5 leading-tight">
                    PRIMARY
                  </div>
                )}

                {/* Star icon overlay */}
                <div className="absolute top-1 left-1">
                  {idx === primaryIndex ? (
                    <LuStar className="w-3.5 h-3.5 text-white drop-shadow fill-white" />
                  ) : (
                    <LuStarOff className="w-3.5 h-3.5 text-white/70 drop-shadow opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              </div>

              {/* Remove button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(idx);
                }}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-card border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:border-destructive hover:text-white cursor-pointer shadow-sm z-10"
              >
                <X className="w-3 h-3" />
              </button>

              {/* Filename tooltip */}
              <p className="mt-1 text-[10px] text-muted-foreground truncate text-center leading-tight">
                {img.name}
              </p>
            </div>
          ))}
        </div>
      )}

      {images.length > 0 && (
        <p className="text-xs text-muted-foreground">
          {images.length} image{images.length !== 1 ? "s" : ""} selected. Click
          any image to set it as the primary.
        </p>
      )}
    </div>
  );
}
