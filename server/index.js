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

// // ─────────────────────────────────────────────────────────
// // CORS / PREFLIGHT
// // TEMPORARY: ALLOW ALL ORIGINS FOR TESTING
// // ─────────────────────────────────────────────────────────

// // Handle OPTIONS BEFORE ANY OTHER MIDDLEWARE.
// // This completely bypasses rate limiters, routes, etc.
// app.use((req, res, next) => {
//   if (req.method !== "OPTIONS") {
//     return next();
//   }

//   const origin = req.headers.origin;

//   console.log(
//     `[CORS PREFLIGHT] ${req.method} ${req.originalUrl} | Origin: ${
//       origin || "none"
//     }`,
//   );

//   if (origin) {
//     res.setHeader("Access-Control-Allow-Origin", origin);
//     res.setHeader("Access-Control-Allow-Credentials", "true");
//   }

//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET,POST,PUT,PATCH,DELETE,OPTIONS",
//   );

//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     req.headers["access-control-request-headers"] ||
//       "Content-Type, Authorization",
//   );

//   res.setHeader("Access-Control-Max-Age", "86400");

//   return res.status(204).end();
// });

// // CORS for normal requests
// app.use(
//   cors({
//     origin: true,
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   }),
// );

// // ─────────────────────────────────────────────────────────
// // SECURITY HEADERS
// // ─────────────────────────────────────────────────────────

// app.use(
//   helmet({
//     crossOriginResourcePolicy: {
//       policy: "cross-origin",
//     },
//     contentSecurityPolicy: false,
//   }),
// );

// // ─────────────────────────────────────────────────────────
// // BODY PARSERS
// // ─────────────────────────────────────────────────────────

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // ─────────────────────────────────────────────────────────
// // RATE LIMITERS
// // ─────────────────────────────────────────────────────────

// const authLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   message: {
//     message: "Too many attempts. Please try again after 15 minutes.",
//   },
//   standardHeaders: true,
//   legacyHeaders: false,

//   skip: (req) => req.method === "OPTIONS",
// });

// const generalLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 1000,
//   message: {
//     message: "Too many requests. Please slow down.",
//   },
//   standardHeaders: true,
//   legacyHeaders: false,

//   skip: (req) => req.method === "OPTIONS",
// });

// // ─────────────────────────────────────────────────────────
// // NOSQL INJECTION SANITIZER
// // ─────────────────────────────────────────────────────────

// const sanitizeObject = (obj) => {
//   if (!obj || typeof obj !== "object") {
//     return;
//   }

//   Object.keys(obj).forEach((key) => {
//     if (key.startsWith("$") || key.includes(".")) {
//       delete obj[key];
//     } else {
//       sanitizeObject(obj[key]);
//     }
//   });
// };

// const mongoSanitize = (req, res, next) => {
//   if (req.body) {
//     sanitizeObject(req.body);
//   }

//   if (req.params) {
//     sanitizeObject(req.params);
//   }

//   next();
// };

// app.use(mongoSanitize);

// // ─────────────────────────────────────────────────────────
// // REQUEST LOGGING
// // ─────────────────────────────────────────────────────────

// app.use((req, res, next) => {
//   console.log(
//     `[REQUEST] ${req.method} ${req.originalUrl} | Origin: ${
//       req.headers.origin || "none"
//     }`,
//   );

//   next();
// });

// // ─────────────────────────────────────────────────────────
// // HEALTH CHECK
// // ─────────────────────────────────────────────────────────

// app.get("/api/health", (req, res) => {
//   res.status(200).json({
//     status: "ok",
//     message: "Server is running",
//   });
// });

// // ─────────────────────────────────────────────────────────
// // AUTH ROUTES
// // ─────────────────────────────────────────────────────────

// app.use("/api/auth/login", authLimiter);
// app.use("/api/auth/register", authLimiter);
// app.use("/api/auth/forgot-password", authLimiter);

// app.use("/api/auth", generalLimiter, userRoutes);

// // ─────────────────────────────────────────────────────────
// // OTHER ROUTES
// // ─────────────────────────────────────────────────────────

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

// // ─────────────────────────────────────────────────────────
// // 404 HANDLER
// // ─────────────────────────────────────────────────────────

// app.use((req, res) => {
//   res.status(404).json({
//     message: "Route not found",
//     path: req.originalUrl,
//   });
// });

// // ─────────────────────────────────────────────────────────
// // ERROR HANDLER
// // ─────────────────────────────────────────────────────────

// app.use((err, req, res, next) => {
//   console.error("SERVER ERROR:");
//   console.error(err);

//   // Always add CORS headers to error responses.
//   const origin = req.headers.origin;

//   if (origin) {
//     res.setHeader("Access-Control-Allow-Origin", origin);
//     res.setHeader("Access-Control-Allow-Credentials", "true");
//   }

//   res.status(err.status || 500).json({
//     message: err.message || "Something went wrong.",
//   });
// });

// // ─────────────────────────────────────────────────────────
// // DATABASE + SERVER
// // ─────────────────────────────────────────────────────────

// const PORT = process.env.PORT || 5000;

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDB connected");

//     app.listen(PORT, "0.0.0.0", () => {
//       console.log(`Server running on port ${PORT}`);
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
// import doubtRoutes from "./routes/doubtRoutes.js";
import facultyReviewRoutes from "./routes/facultyReviewRoutes.js";
import gdRoutes from "./routes/gdRoutes.js";
import placementRoutes from "./routes/placementRoutes.js";
// import r2Routes from "./routes/r2Routes.js";

dotenv.config();

const app = express();

// ─────────────────────────────────────────────────────────
// CORS
// ─────────────────────────────────────────────────────────

const allowedOrigins = [
  "https://www.eklavyas.com",
  "https://eklavyas.com",
  "eklavyas.com",
  ""
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests without an Origin header.
    // Useful for Postman, server-to-server requests, health checks, etc.
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.log(`[CORS BLOCKED] Origin: ${origin}`);

    return callback(new Error("Not allowed by CORS"));
  },

  credentials: true,

  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

  allowedHeaders: ["Content-Type", "Authorization"],

  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

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

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(cookieParser());

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
// REQUEST LOGGING
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
// AUTH ROUTES
// ─────────────────────────────────────────────────────────

app.use("/api/auth/login", authLimiter);

app.use("/api/auth/register", authLimiter);

app.use("/api/auth/forgot-password", authLimiter);

app.use("/api/auth", generalLimiter, userRoutes);

// ─────────────────────────────────────────────────────────
// OTHER ROUTES
// ─────────────────────────────────────────────────────────

app.use("/api/admin", generalLimiter, adminRoutes);

app.use("/api/feedback", generalLimiter, feedbackRoutes);

app.use("/api/contact", generalLimiter, contactRoutes);

app.use("/api/academic", generalLimiter, adminAcademicRoutes);

app.use("/api/facultyadmin", generalLimiter, adminFacultyRoutes);

app.use("/api/faculty", generalLimiter, facultyRoutes);

app.use("/api/notes", generalLimiter, noteRoutes);

// app.use("/api/doubts", generalLimiter, doubtRoutes);

app.use("/api/faculty-reviews", generalLimiter, facultyReviewRoutes);

app.use("/api/gd", gdRoutes);

app.use("/api/placements", placementRoutes);

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

  // Only add CORS headers for allowed origins.
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);

    res.setHeader("Access-Control-Allow-Credentials", "true");
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
