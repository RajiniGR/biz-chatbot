import { Request, Response } from "express";
import { registerUser, loginUser } from "./auth.service";
import { AuthRequest } from "../../middleware/authMiddleware";

export async function register(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await registerUser(email, password);
    res.status(201).json({ message: "User registered", user });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const {token, user } = await loginUser(email, password);
    res.cookie("token", token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000 // 7 days 
    });
    res.json({
      message: "Login successful",
      user: { email: user.email, role: user.role }
    });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
}

export async function me(req: AuthRequest, res: Response) {
  res.json({ user: req.user});
}

export async function logout(req: Request, res: Response) {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
}
