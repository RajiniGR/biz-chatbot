import { Router } from "express";
import { login, logout, me, register } from "./auth.controller";
import { authenticate } from "../../middleware/authMiddleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticate, me);
router.post("/logout", logout);

export default router;
