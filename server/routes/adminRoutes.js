import express from "express";
import auth from "../middleware/auth.js";
import {
  getUsers,
  getStats,
  deleteUser,
  toggleBanUser,
  changeUserRole,
  adminDeleteFeedback,
} from "../controllers/adminController.js";
import admin from "../middleware/admin.js";
import authAny from "../middleware/authMany.js";

const router = express.Router();

router.get("/users", authAny, getUsers);
router.get("/stats", authAny, getStats);
router.delete("/users/:id", authAny, deleteUser);
router.put("/users/:id/ban", authAny, toggleBanUser);
router.put("/users/:id/role", authAny, changeUserRole);
router.delete("/feedback/:id", authAny, adminDeleteFeedback);

export default router;
