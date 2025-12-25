import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.router";
import chatRoutes from "./modules/chat/chat.router";
import adminRoutes from "./modules/admin/admin.route";

const app = express();
app.use(express.json());
app.use(cors({ 
    origin: process.env.FRONTEND_ORIGIN || "*" ,
    credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/admin", adminRoutes);
app.get("/health", (_req, res) => {
  res.json({ status: "OK" });
});

export default app;