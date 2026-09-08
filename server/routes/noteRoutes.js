import express from "express";
import auth from "../middleware/auth.js";
import uploadMemory from "../middleware/uploadMemory.js";

import {
  createNote,
  getFacultyNotes,
  getFacultyNoteById,
  updateNote,
  deleteNote,
  getNotesBySubject,
  getStudentNotes,
} from "../controllers/noteController.js";
import { uploadNoteImage } from "../controllers/uploadController.js";
import facultyAuth from "../middleware/facultyAuth.js";
import { facultyLogin } from "../controllers/facultyController.js";

const noteRoutes = express.Router();

// ── Media upload ──────────────────────────────────────────────────────────────
noteRoutes.post("/upload-image", facultyAuth, uploadMemory.single("image"), uploadNoteImage);

// ── Static routes FIRST (before any /:id routes) ─────────────────────────────
noteRoutes.get("/faculty",   facultyAuth, getFacultyNotes);    // ← MUST be before /:id
noteRoutes.get("/student",   auth, getStudentNotes);    // ← MUST be before /:id

// ── Faculty CRUD ──────────────────────────────────────────────────────────────
noteRoutes.post("/",         facultyAuth, createNote);
noteRoutes.get("/",          auth, getNotesBySubject);
noteRoutes.get("/:id",       auth, getFacultyNoteById); // ← dynamic param LAST
noteRoutes.put("/:id",       facultyAuth, updateNote);
noteRoutes.delete("/:id", facultyAuth, deleteNote);

export default noteRoutes;