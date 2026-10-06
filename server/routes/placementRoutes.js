import express from "express";

import {
  createPlacement,
  getAllPlacementsAdmin,
  getAllPlacements,
  getPlacementById,
  updatePlacement,
  deletePlacement,
} from "../controllers/placementController.js";

import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

const router = express.Router();

// ======================================================
// ADMIN
// ======================================================

router.post("/", auth, admin, createPlacement);

router.get("/admin", auth, admin, getAllPlacementsAdmin);

router.put("/:placementId", auth, admin, updatePlacement);

router.delete("/:placementId", auth, admin, deletePlacement);

router.get("/", auth, getAllPlacements);

router.get("/:placementId", auth, getPlacementById);

export default router;
