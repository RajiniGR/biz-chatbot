import { Router } from "express";
import { askChat, getChatHistory, resetChat} from "./chat.controller";
import { authenticate } from "../../middleware/authMiddleware";

const router = Router();

router.post("/ask", authenticate, askChat);
router.get("/history", authenticate, getChatHistory);
router.delete("/reset", authenticate, resetChat);

export default router;
