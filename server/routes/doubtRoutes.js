import express from "express";

import auth from "../middleware/auth.js";
import facultyAuth from "../middleware/facultyAuth.js";

import {
  askDoubt,
  getDoubtsByNote,
  getFacultyDoubts,
  getDoubtById,
  answerDoubt,
  deleteDoubt,
  getStudentDoubts,
} from "../controllers/doubtController.js";

const router = express.Router();

// ─────────────────────────────────────────────────────────────
// STUDENT ROUTES
// ─────────────────────────────────────────────────────────────

// Student asks a doubt on a note
router.post("/", auth, askDoubt);

// Students can see all doubts and answers for a particular note
router.get("/note/:noteId", auth, getDoubtsByNote);
router.get("/student", auth, getStudentDoubts);
// Student can delete their own unanswered doubt
router.delete("/:id", auth, deleteDoubt);

// ─────────────────────────────────────────────────────────────
// FACULTY ROUTES
// ─────────────────────────────────────────────────────────────

// Faculty gets all doubts related to their notes
router.get("/faculty", facultyAuth, getFacultyDoubts);

// Faculty gets one specific doubt
router.get("/faculty/:id", facultyAuth, getDoubtById);

// Faculty answers a doubt
router.patch("/:id/answer", facultyAuth, answerDoubt);

export default router;
