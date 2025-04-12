import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./authRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
console.log("mongo uri", process.env.MONGO_URI);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("✅ Auth Service is up and running!");
});

app.listen(PORT, () => {
  console.log(`✅ Auth Service running at http://localhost:${PORT}`);
});
