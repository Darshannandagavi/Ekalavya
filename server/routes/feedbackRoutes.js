import express from "express";
import auth from "../middleware/auth.js";
import {
  submit,
  getMyFeedbacks,
  getAllFeedbacks,
  deleteFeedback,
} from "../controllers/feedbackController.js";
import authAny from "../middleware/authMany.js";

const router = express.Router();

router.post("/", auth, submit);
router.get("/my", auth, getMyFeedbacks);
router.get("/all", authAny, getAllFeedbacks);
router.delete("/:id", auth, deleteFeedback);

export default router;
