import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Import all routes
import {
  almirahRouter,
  authRouter,
  batchRouter,
  bookRouter,
  categoryRouter,
  clearanceRouter,
  departementRouter,
  eBookRouter,
  genralRouter,
  studentRouter,
  teacherRouter,
  transactionRouter,
} from "./routes/index.js";

// Import error handling middleware
import { errorHandlerMiddleware } from "./middlewares/index.js";

// Constants from environment variables
const APP_PORT = process.env.PORT || 8080;
const MONGO_DB_URI = process.env.MONGO_DB_URI;
const NODE_ENV = process.env.NODE_ENV || "development";
const ALLOWED_ORIGINS = NODE_ENV === "production" ? [process.env.ORIGIN_1] : ["http://localhost:5173"];

// Initialize the Express application
const app = express();

// Middleware setup
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// CORS configuration
const corsOptions = {
  credentials: true,
  origin: ALLOWED_ORIGINS,
};
app.use(cors(corsOptions));

// Define the root path for static file serving
const __filename = fileURLToPath(import.meta.url);
export const ROOT_PATH = path.dirname(__filename);

// Serve static files
app.use("/public", express.static(path.join(ROOT_PATH, "public")));
app.use("/uploads", express.static(path.join(ROOT_PATH, "uploads")));
app.use("/documents", express.static(path.join(ROOT_PATH, "documents")));

// MongoDB connection
mongoose
  .connect(MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected successfully! 😊");

    // Start the server
    app.listen(APP_PORT, () => {
      console.log(`Server is running on http://localhost:${APP_PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit if DB connection fails
  });

// Define API routes
app.use("/api/auth", authRouter);
app.use("/api/batches", batchRouter);
app.use("/api/teachers", teacherRouter);
app.use("/api/departements", departementRouter);
app.use("/api/students", studentRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/almirahs", almirahRouter);
app.use("/api/books", bookRouter);
app.use("/api/ebooks", eBookRouter);
app.use("/api/transactions", transactionRouter);
app.use("/api/genral", genralRouter);
app.use("/api/clearance", clearanceRouter);



// Error handling middleware
app.use(errorHandlerMiddleware);
