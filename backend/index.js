// index.js
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./src/lib/db.js";
import authRoutes from "./src/routes/auth.route.js";
import messageRoutes from "./src/routes/message.route.js";
import { app, server } from "./src/lib/socket.js";
import express from "express";
dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

console.log("Current Directory: ", __dirname);

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
    res.send("API is running....");
});

// ✅ Use app.listen-like syntax
app.listen = function (port, cb) {
    return server.listen(port, cb);
};
const startServer = async () => {
  try {
    await connectDB(); // ✅ Wait until Mongo connects
    app.listen(PORT, () => {
      console.log("Server is running on PORT: " + PORT);
    });
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB", err);
    process.exit(1);
  }
};

startServer();
