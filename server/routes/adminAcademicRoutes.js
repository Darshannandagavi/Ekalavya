import express from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

import {
  addUniversity, updateUniversity, deleteUniversity, getUniversities,
  addCourse,      updateCourse,      deleteCourse,      getCoursesByUniversity,
  addSubject,     updateSubject,     deleteSubject,      getSubjects,
} from "../controllers/adminAcademicController.js";

const router = express.Router();

// ── Universities ──────────────────────────────────────────────────────────────
router.get(   "/universities",          getUniversities);
router.post(  "/universities",          auth, admin, addUniversity);
router.put(   "/universities/:id",      auth, admin, updateUniversity);
router.delete("/universities/:id",      auth, admin, deleteUniversity);

// ── Courses ───────────────────────────────────────────────────────────────────
router.get(   "/courses/:universityId", getCoursesByUniversity);
router.post(  "/courses",              auth, admin, addCourse);
router.put(   "/courses/:id",          auth, admin, updateCourse);
router.delete("/courses/:id",          auth, admin, deleteCourse);

// ── Subjects ──────────────────────────────────────────────────────────────────
router.get(   "/subjects/:courseId/:semester", getSubjects);
router.post(  "/subjects",             auth, admin, addSubject);
router.put(   "/subjects/:id",         auth, admin, updateSubject);
router.delete("/subjects/:id",         auth, admin, deleteSubject);

export default router;