import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT || 10000; // Render uses PORT env
const __dirname = path.resolve();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

// ✅ Allow both local dev & deployed frontend
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://realtime-chat-app-full-stack.onrender.com"
    ],
    credentials: true,
  })
);

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// ✅ Always serve frontend build (not just in production)
app.use(express.static(path.join(__dirname, "../Forntend_pro/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Forntend_pro", "dist", "index.html"));
});

// Start server
server.listen(PORT, () => {
  console.log("server is running on PORT: " + PORT);
  connectDB();
});
