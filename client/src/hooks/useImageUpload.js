import { useCallback } from "react";
import API from "../axiosConfig";

/**
 * Returns an `uploadImage(file) → Promise<string>` function.
 * The promise resolves to the Cloudinary secure URL.
 */
export function useImageUpload() {
  const uploadImage = useCallback(async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await API.post("/notes/upload-image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data.url; // Cloudinary secure_url
  }, []);

  return { uploadImage };
}