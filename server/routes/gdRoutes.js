import express from "express";

import {
  createDomain,
  getAllDomains,
  getMyDomains,
  updateDomain,
  deleteDomain,
  createTopic,
  getAllTopics,
  getTopicsByDomain,
  getMyTopics,
  updateTopic,
  deleteTopic,
} from "../controllers/gdController.js";
import facultyAuth from "../middleware/facultyAuth.js";



const router = express.Router();

// ============================================================
// DOMAINS
// ============================================================

// All faculty can see all domains
router.get("/domains", facultyAuth, getAllDomains);

// Logged-in faculty's domains
router.get("/domains/my", facultyAuth, getMyDomains);

// Create domain
router.post("/domains", facultyAuth, createDomain);

// Update own domain
router.put("/domains/:domainId", facultyAuth, updateDomain);

// Delete own domain + its topics
router.delete("/domains/:domainId", facultyAuth, deleteDomain);

// ============================================================
// TOPICS
// ============================================================

// All faculty can see all topics
router.get("/topics", facultyAuth, getAllTopics);

// All topics under one domain
router.get("/domains/:domainId/topics", facultyAuth, getTopicsByDomain);

// Logged-in faculty's topics
router.get("/topics/my", facultyAuth, getMyTopics);

// Create topic inside domain
router.post("/domains/:domainId/topics", facultyAuth, createTopic);

// Update own topic
router.put("/topics/:topicId", facultyAuth, updateTopic);

// Delete own topic
router.delete("/topics/:topicId", facultyAuth, deleteTopic);

export default router;
