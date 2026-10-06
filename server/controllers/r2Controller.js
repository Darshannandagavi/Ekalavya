import {
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import r2Client, { R2_BUCKET_NAME } from "../config/r2Config.js";

import crypto from "crypto";
import path from "path";

// ─────────────────────────────────────────────
// UPLOAD PPTX
// ─────────────────────────────────────────────

export const uploadPptx = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No PPT/PPTX file provided.",
      });
    }

    const extension = path.extname(req.file.originalname).toLowerCase();

    const safeName = path
      .basename(req.file.originalname, extension)
      .replace(/[^a-zA-Z0-9-_]/g, "-")
      .substring(0, 80);

    const uniqueId = crypto.randomUUID();

    const key = `presentations/${Date.now()}-${uniqueId}-${safeName}${extension}`;

    const command = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,

      Key: key,

      Body: req.file.buffer,

      ContentType: req.file.mimetype,

      ContentLength: req.file.size,

      Metadata: {
        originalName: encodeURIComponent(req.file.originalname),
      },
    });

    await r2Client.send(command);

    res.status(201).json({
      message: "PPT uploaded successfully.",

      file: {
        key,
        originalName: req.file.originalname,
        size: req.file.size,
        mimeType: req.file.mimetype,
      },
    });
  } catch (error) {
    console.error("R2 PPT upload error:", error);

    res.status(500).json({
      message: "PPT upload failed.",
      error: error.message,
    });
  }
};

// ─────────────────────────────────────────────
// GET SIGNED URL
// ─────────────────────────────────────────────

export const getPptxUrl = async (req, res) => {
  try {
    const { key } = req.query;

    if (!key) {
      return res.status(400).json({
        message: "File key is required.",
      });
    }

    const command = new GetObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
    });

    const url = await getSignedUrl(r2Client, command, {
      expiresIn: 60 * 60, // 1 hour
    });

    res.status(200).json({
      url,
    });
  } catch (error) {
    console.error("R2 signed URL error:", error);

    res.status(500).json({
      message: "Unable to generate file URL.",
      error: error.message,
    });
  }
};

// ─────────────────────────────────────────────
// DELETE PPTX
// ─────────────────────────────────────────────

export const deletePptx = async (req, res) => {
  try {
    const { key } = req.body;

    if (!key) {
      return res.status(400).json({
        message: "File key is required.",
      });
    }

    const command = new DeleteObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
    });

    await r2Client.send(command);

    res.status(200).json({
      message: "PPT deleted successfully.",
    });
  } catch (error) {
    console.error("R2 PPT delete error:", error);

    res.status(500).json({
      message: "Failed to delete PPT.",
      error: error.message,
    });
  }
};
