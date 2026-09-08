import express from "express";
import upload from "../middleware/upload.js";
import facultyAuth from "../middleware/facultyAuth.js";

import {
  facultyRegister,
  facultyLogin,
  facultyLogout,
  getFacultyMe,
  updateFacultyProfile,
  changeFacultyPassword,
  uploadFacultyProfilePic,
  facultyForgotPassword,
} from "../controllers/facultyController.js";

const facultyRoutes = express.Router();

// Public Routes
facultyRoutes.post("/register", facultyRegister);
facultyRoutes.post("/login", facultyLogin);
facultyRoutes.post("/logout",facultyAuth, facultyLogout);
facultyRoutes.post("/forgot-password", facultyForgotPassword);

// Protected Routes
facultyRoutes.get("/me", facultyAuth, getFacultyMe);

facultyRoutes.put(
  "/profile",
  facultyAuth,
  updateFacultyProfile
);

facultyRoutes.put(
  "/change-password",
  facultyAuth,
  changeFacultyPassword
);

facultyRoutes.put(
  "/profile-pic",
  facultyAuth,
  upload.single("profilePic"),
  uploadFacultyProfilePic
);

export default facultyRoutes;