import api from "@/api/axios";

export async function uploadImages(files) {
    const formData = new FormData();

    files.forEach((file) => {
        formData.append("images", file);
    });

    const res = await api.post(
        "/uploads/images",
        formData,
        {
            headers: {
                "Content-Type":
                    "multipart/form-data",
            },
        }
    );

    return res.data.images;
}