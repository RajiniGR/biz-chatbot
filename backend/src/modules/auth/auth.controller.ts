import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "./user.model";
import { AuthRequest } from "../../middleware/authMiddleware";

const JWT_SECRET = process.env.JWT_SECRET!;

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    email,
    password: hashedPassword
  });

  res.status(201).json({ message: "User registered successfully" });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false, // HTTP (Elastic IP)
    path: "/",
    maxAge: 24 * 60 * 60 * 1000
  });

  res.json({ token, message: "Login successful", user: { id: user._id, email: user.email, role: user.role } });
};

export const logout = (_req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};

export const me = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    return res.status(200).json({
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
  // res.json({ user: req.user });
};
