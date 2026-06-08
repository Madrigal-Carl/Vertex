import { LuUpload as Upload } from "react-icons/lu";

export function ImageUploader({ className }) {
  return (
    <div
      className={`border-2 border-dashed rounded-[6px] p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors${className ? " " + className : ""}`}
    >
      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
        <Upload className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-sm font-semibold mb-1">
        Click to upload or drag and drop
      </h3>
      <p className="text-xs text-muted-foreground">
        SVG, PNG, JPG or GIF (max. 3MB)
      </p>
    </div>
  );
}
