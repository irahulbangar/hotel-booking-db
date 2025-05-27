import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";

connectDB();

const app = express();
app.use(cors()); // Enable cross-origin resource sharing

// Middleware
app.use(express.json());
app.use(clerkMiddleware());

// Api to listen to clerk Webhooks
app.use("/api/clerk", clerkWebhooks);

app.get("/", (req, res) => {
  res.send("API is working");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
