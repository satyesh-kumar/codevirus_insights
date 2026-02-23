import express from "express";
import { createQuestion ,getAllQuestions } from "../controllers/questionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// The "protect" guard runs BEFORE the "createQuestion" logic
router.post("/", protect, createQuestion);
// Get All Questions (Public)
router.get("/", getAllQuestions);
export default router;