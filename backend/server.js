import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import cors from "cors";
// Import environment variables
import { VITE_BASE_URL, APP_PORT, MONGO_DB_URI } from "./config/index.js";
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
import { errorHandlerMiddleware } from "./middlewares/index.js";
import dotenv from "dotenv";
dotenv.config();


// Initialize the Express application
const app = express();

// Middleware configuration
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// CORS setup
const allowedOrigins = process.env.NODE_ENV === 'production' 
  ? [process.env.ORIGIN_1] 
  : ['http://localhost:5173'];


  const corsOptions = {
    credentials: true,
    origin: allowedOrigins,
  };

app.use(cors(corsOptions));

// Define absolute path for backend folder
const __filename = fileURLToPath(import.meta.url);
export const ROOT_PATH = path.dirname(__filename);

// Serve static files
app.use("/public", express.static(path.join(ROOT_PATH, "public")));
app.use("/uploads", express.static(path.join(ROOT_PATH, "uploads")));
app.use("/documents", express.static(path.join(ROOT_PATH, "documents")));
// MongoDB connection
mongoose.connect(MONGO_DB_URI)
  .then(() => {
    console.log("MongoDB connected successfully! 😊");
    // Start the server
    app.listen(APP_PORT, () => {
      console.log(`Server is listening on port ${APP_PORT}`);
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

