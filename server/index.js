// import express from "express";
// import mongoose from "mongoose";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import dotenv from "dotenv";
// import rateLimit from "express-rate-limit";
// import helmet from "helmet";
// import userRoutes from "./routes/userRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import feedbackRoutes from "./routes/feedbackRoutes.js";
// import contactRoutes from "./routes/contactRoutes.js";
// import adminAcademicRoutes from "./routes/adminAcademicRoutes.js";
// import noteRoutes from "./routes/noteRoutes.js";
// import adminFacultyRoutes from "./routes/adminFacultyRoutes.js";
// import facultyRoutes from "./routes/facultyRoutes.js";
// import doubtRoutes from "./routes/doubtRoutes.js";
// import facultyReviewRoutes from "./routes/facultyReviewRoutes.js";
// import gdRoutes from "./routes/gdRoutes.js";
// import placementRoutes from "./routes/placementRoutes.js";
// // import r2Routes from "./routes/r2Routes.js";
// dotenv.config();

// const app = express();

// // ─── SECURITY HEADERS ────────────────────────────────────
// app.use(helmet({
//   crossOriginResourcePolicy: { policy: "cross-origin" },
//   contentSecurityPolicy: false,
// }));

// // ─── RATE LIMITERS ───────────────────────────────────────
// const authLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   message: { message: "Too many attempts. Please try again after 15 minutes." },
//   standardHeaders: true,
//   legacyHeaders: false,
// });

// const generalLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 1000,
//   message: { message: "Too many requests. Please slow down." },
//   standardHeaders: true,
//   legacyHeaders: false,
// });

// // ─── NOSQL INJECTION SANITIZER ───────────────────────────
// // Strips keys starting with $ or containing . from body and params
// // Avoids touching req.query which is read-only in Express 5
// const sanitizeObject = (obj) => {
//   if (obj && typeof obj === "object") {
//     Object.keys(obj).forEach((key) => {
//       if (key.startsWith("$") || key.includes(".")) {
//         delete obj[key];
//       } else {
//         sanitizeObject(obj[key]);
//       }
//     });
//   }
// };

// const mongoSanitize = (req, res, next) => {
//   if (req.body) sanitizeObject(req.body);
//   if (req.params) sanitizeObject(req.params);
//   next();
// };

// // ─── MIDDLEWARE ──────────────────────────────────────────
// app.use(express.json());
// app.use(cookieParser());
// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://eklavyas.com",
//   "https://www.eklavyas.com",
//   process.env.CLIENT_URL,
// ].filter(Boolean);

// // ─── CORS — TEMPORARILY ALLOW ALL ORIGINS ────────────────
// app.use(
//   cors({
//     origin: true,
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );


// app.use(mongoSanitize);

// // ─── ROUTES ─────────────────────────────────────────────
// app.use("/api/auth/login", authLimiter);
// app.use("/api/auth/register", authLimiter);
// app.use("/api/auth/forgot-password", authLimiter);
// app.use("/api/auth", generalLimiter, userRoutes);
// app.use("/api/admin", generalLimiter, adminRoutes);
// app.use("/api/feedback", generalLimiter, feedbackRoutes);
// app.use("/api/contact", generalLimiter, contactRoutes);
// app.use("/api/academic", generalLimiter, adminAcademicRoutes);
// app.use("/api/facultyadmin", generalLimiter, adminFacultyRoutes);
// app.use("/api/faculty", generalLimiter, facultyRoutes);
// app.use("/api/notes", generalLimiter, noteRoutes);
// app.use("/api/doubts", generalLimiter, doubtRoutes);
// app.use("/api/faculty-reviews", generalLimiter, facultyReviewRoutes);
// app.use("/api/gd", gdRoutes);
// app.use("/api/placements", placementRoutes);
// // app.use("/api/storage", generalLimiter, r2Routes);
// // ─── HEALTH CHECK ────────────────────────────────────────
// app.get("/api/health", (req, res) => {
//   res.json({ status: "ok", message: "Server is running" });
// });

// // ─── ERROR HANDLER ───────────────────────────────────────
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: "Something went wrong." });
// });

// // ─── CONNECT DB + START SERVER ───────────────────────────
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDB connected");
//     app.listen(process.env.PORT || 5000, () => {
//       console.log(`Server running on port ${process.env.PORT }`);
//     });
//   })
//   .catch((err) => {
//     console.error("MongoDB connection error:", err.message);
//     process.exit(1);
//   });




import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import adminAcademicRoutes from "./routes/adminAcademicRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import adminFacultyRoutes from "./routes/adminFacultyRoutes.js";
import facultyRoutes from "./routes/facultyRoutes.js";
import doubtRoutes from "./routes/doubtRoutes.js";
import facultyReviewRoutes from "./routes/facultyReviewRoutes.js";
import gdRoutes from "./routes/gdRoutes.js";
import placementRoutes from "./routes/placementRoutes.js";
// import r2Routes from "./routes/r2Routes.js";

dotenv.config();

const app = express();

// ─────────────────────────────────────────────────────────
// SECURITY HEADERS
// ─────────────────────────────────────────────────────────

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
    contentSecurityPolicy: false,
  }),
);

// ─────────────────────────────────────────────────────────
// BODY PARSERS
// ─────────────────────────────────────────────────────────

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ─────────────────────────────────────────────────────────
// CORS
// TEMPORARILY ALLOW ALL ORIGINS FOR TESTING
// ─────────────────────────────────────────────────────────

const corsOptions = {
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Explicitly handle ALL preflight requests.
// This must be BEFORE rate limiters and routes.
app.options(/.*/, cors(corsOptions));

// ─────────────────────────────────────────────────────────
// RATE LIMITERS
// ─────────────────────────────────────────────────────────

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    message: "Too many attempts. Please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,

  // Do not rate-limit OPTIONS/preflight requests.
  skip: (req) => req.method === "OPTIONS",
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: {
    message: "Too many requests. Please slow down.",
  },
  standardHeaders: true,
  legacyHeaders: false,

  // Do not rate-limit OPTIONS/preflight requests.
  skip: (req) => req.method === "OPTIONS",
});

// ─────────────────────────────────────────────────────────
// NOSQL INJECTION SANITIZER
// ─────────────────────────────────────────────────────────

const sanitizeObject = (obj) => {
  if (!obj || typeof obj !== "object") {
    return;
  }

  Object.keys(obj).forEach((key) => {
    if (key.startsWith("$") || key.includes(".")) {
      delete obj[key];
    } else {
      sanitizeObject(obj[key]);
    }
  });
};

const mongoSanitize = (req, res, next) => {
  if (req.body) {
    sanitizeObject(req.body);
  }

  if (req.params) {
    sanitizeObject(req.params);
  }

  next();
};

app.use(mongoSanitize);

// ─────────────────────────────────────────────────────────
// TEMPORARY REQUEST LOGGING
// Useful for debugging Render/CORS.
// ─────────────────────────────────────────────────────────

app.use((req, res, next) => {
  console.log(
    `[REQUEST] ${req.method} ${req.originalUrl} | Origin: ${
      req.headers.origin || "none"
    }`,
  );

  next();
});

// ─────────────────────────────────────────────────────────
// HEALTH CHECK
// ─────────────────────────────────────────────────────────

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server is running",
  });
});

// ─────────────────────────────────────────────────────────
// ROUTES
// ─────────────────────────────────────────────────────────

// Authentication
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);
app.use("/api/auth/forgot-password", authLimiter);

app.use("/api/auth", generalLimiter, userRoutes);

// Admin
app.use("/api/admin", generalLimiter, adminRoutes);

// Feedback
app.use("/api/feedback", generalLimiter, feedbackRoutes);

// Contact
app.use("/api/contact", generalLimiter, contactRoutes);

// Academic
app.use("/api/academic", generalLimiter, adminAcademicRoutes);

// Faculty Admin
app.use("/api/facultyadmin", generalLimiter, adminFacultyRoutes);

// Faculty
app.use("/api/faculty", generalLimiter, facultyRoutes);

// Notes
app.use("/api/notes", generalLimiter, noteRoutes);

// Doubts
app.use("/api/doubts", generalLimiter, doubtRoutes);

// Faculty Reviews
app.use("/api/faculty-reviews", generalLimiter, facultyReviewRoutes);

// Group Discussion
app.use("/api/gd", gdRoutes);

// Placements
app.use("/api/placements", placementRoutes);

// Storage
// app.use("/api/storage", generalLimiter, r2Routes);

// ─────────────────────────────────────────────────────────
// 404 HANDLER
// ─────────────────────────────────────────────────────────

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
    path: req.originalUrl,
  });
});

// ─────────────────────────────────────────────────────────
// ERROR HANDLER
// ─────────────────────────────────────────────────────────

app.use((err, req, res, next) => {
  console.error("SERVER ERROR:");
  console.error(err);

  // Make sure CORS headers are present even when an error occurs.
  const origin = req.headers.origin;

  if (origin) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,PATCH,DELETE,OPTIONS",
    );
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  }

  res.status(err.status || 500).json({
    message: err.message || "Something went wrong.",
  });
});

// ─────────────────────────────────────────────────────────
// DATABASE + SERVER
// ─────────────────────────────────────────────────────────

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
