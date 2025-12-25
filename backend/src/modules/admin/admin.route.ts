import { Router } from "express";
import {
  createFAQ,
  deleteFAQ,
  getFAQs,
  updateFAQ,
} from "./admin.controller";
import { authenticate } from "../../middleware/authMiddleware";
import { requireAdmin } from "../../middleware/adminMiddleware";

const router = Router();

router.use(authenticate, requireAdmin);

router.post("/faq", createFAQ);
router.get("/faq", getFAQs);
router.put("/faq/:id", updateFAQ);
router.delete("/faq/:id", deleteFAQ);

export default router;
