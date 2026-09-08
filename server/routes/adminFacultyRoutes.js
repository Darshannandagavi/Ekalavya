import express from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

import {
  getAllFaculty,
  approveFaculty,
  rejectFaculty,
} from "../controllers/adminFacultyController.js";

const adminFacultyRoutes = express.Router();

adminFacultyRoutes.use(auth, admin);

adminFacultyRoutes.get("/faculty", getAllFaculty);

adminFacultyRoutes.put(
  "/faculty/approve/:id",
  approveFaculty
);

adminFacultyRoutes.delete(
  "/faculty/reject/:id",
  rejectFaculty
);

export default adminFacultyRoutes;