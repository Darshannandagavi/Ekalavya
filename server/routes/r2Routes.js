import express from "express";

import facultyAuth from "../middleware/facultyAuth.js";
import auth from "../middleware/auth.js";

import r2Upload from "../middleware/r2Upload.js";

import {
  uploadPptx,
  getPptxUrl,
  deletePptx,
} from "../controllers/r2Controller.js";

const router = express.Router();

// Faculty uploads PPT/PPTX
router.post("/ppt", facultyAuth, r2Upload.single("ppt"), uploadPptx);

// Student gets temporary URL
router.get("/ppt-url", auth, getPptxUrl);

// Faculty deletes PPT
router.delete("/ppt", facultyAuth, deletePptx);

export default router;
