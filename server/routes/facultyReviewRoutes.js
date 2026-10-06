import express from "express";
import auth from "../middleware/auth.js";

import {
  getFacultyRating,
  rateFaculty,
} from "../controllers/facultyReviewController.js";

const router = express.Router();

// GET FACULTY RATING
router.get("/faculty/:facultyId", auth, getFacultyRating);

// POST / UPDATE FACULTY RATING
router.post("/faculty/:facultyId", auth, rateFaculty);

export default router;
