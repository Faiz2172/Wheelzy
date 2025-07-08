import express from "express";
import cors from "cors";
import "dotenv/config.js"
import { ENV } from "./config/env.js";
import {db} from "./config/database.js"
import blogRoutes from "./routes/blogs.js";
import reviewRoutes from "./routes/reviews.js";
import carRoutes from "./routes/carListings.js";
import carImages from "./routes/carImages.js";
import job from "./config/cron.js";

const app = express();
const PORT = process.env.PORT || 5001

// Start cron job in production
if (ENV.NODE_ENV === "production") job.start();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://wheelzy.onrender.com',
    'https://wheelzy.vercel.app'
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: "CarDekho API is running",
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use("/api/blogs", blogRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/carListings",carRoutes);
app.use('/api/carImages', carImages);

// Global error handler
app.use((error, req, res, next) => {
  console.error("Global error handler:", error);
  res.status(500).json({ 
    success: false,
    error: "Something went wrong",
    message: ENV.NODE_ENV === "development" ? error.message : "Internal server error"
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json(
    {
      "success": true,
      "message": "CarDekho API is running",
      "timestamp": "..."
    }
);
});

app.listen(PORT, () => {
  console.log("CarDekho Server is running on PORT:", PORT);
  console.log(`Environment: ${ENV.NODE_ENV || 'development'}`);
  console.log(`Database connected: ${ENV.DATABASE_URL ? 'Yes' : 'No'}`);
});
