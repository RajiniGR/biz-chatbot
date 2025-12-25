import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "./user.model";

const JWT_EXPIRES_IN = "1d";

export async function registerUser(email: string, password: string) {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new Error("User already exists");
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashed,
  });

  return user;
}

export async function loginUser(email: string, password: string) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error("Invalid credentials");
  }

  const secret = process.env.JWT_SECRET as string;

  const token = jwt.sign(
    { id: user._id.toString(), role: user.role },
    secret,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return { token, user };
}
