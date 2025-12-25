import { Router } from "express";
import { askBot, getHistory } from "./chat.controller";
import { authenticate } from "../../middleware/authMiddleware";

const router = Router();

router.post("/ask", authenticate, askBot);
router.get("/history", authenticate, getHistory);

export default router;
