import { useMutation } from "@tanstack/react-query";
import { uploadImages } from "@/services/upload.service";

export const useUploadImages = () => {
    return useMutation({
        mutationFn: uploadImages,
    });
};