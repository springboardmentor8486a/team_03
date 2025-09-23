import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";
import { userRoutes } from "./src/routes/userRoutes.js";
import { complaintRoutes } from "./src/routes/complaintRoutes.js";

dotenv.config();
const app = express();

// CORS middleware
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5173"], // Add your frontend URLs
    credentials: true,
}));

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/complaints", complaintRoutes);

// Error handler to return JSON instead of HTML
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode).json({
        message: err.message || "Server Error",
    });
});

const PORT = process.env.PORT || 5000;

// Connect to DB first, then start server
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB:", err);
        process.exit(1);
    });