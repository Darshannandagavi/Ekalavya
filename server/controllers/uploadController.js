import cloudinary from "../config/cloudinaryConfig.js";
import { Readable } from "stream";

/**
 * Uploads a single image buffer to Cloudinary and returns the secure URL.
 * Route: POST /api/notes/upload-image
 * Middleware: auth, upload.single("image")   ← multer in memory storage
 */
export const uploadNoteImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file provided" });
    }

    // Stream the buffer to Cloudinary (avoids writing to disk)
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "ekalavya/notes",
          allowed_formats: ["jpg", "jpeg", "png", "webp", "gif", "svg"],
          transformation: [{ quality: "auto", fetch_format: "auto" }],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      // Pipe the in-memory buffer into the Cloudinary stream
      Readable.from(req.file.buffer).pipe(stream);
    });

    res.status(200).json({
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      width: uploadResult.width,
      height: uploadResult.height,
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    res.status(500).json({ message: "Image upload failed", error: error.message });
  }
};