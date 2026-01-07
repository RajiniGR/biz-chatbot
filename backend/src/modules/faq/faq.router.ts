import { Router } from "express";
import {
  getFAQs,
  createFAQHandler,
  updateFAQHandler,
  deleteFAQHandler,
} from "./faq.controller";
import { authenticate } from "../../middleware/authMiddleware";
import { requireAdmin } from "../../middleware/adminMiddleware";

const router = Router();

router.get("/", getFAQs);
router.post("/", authenticate, requireAdmin, createFAQHandler);
router.put("/:id", authenticate, requireAdmin, updateFAQHandler);
router.delete("/:id", authenticate, requireAdmin, deleteFAQHandler);

export default router;
