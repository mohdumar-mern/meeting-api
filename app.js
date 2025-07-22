import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";





const app = express();

import { limiter } from "./utils/rateLimiter.js";
// Routes
import meetingRoutes from './routes/meetingRoutes.js';
import authRoutes from './routes/authRoutes.js';

// Middlewares
app.use(helmet()); 
app.use(compression());
app.disable("x-powered-by"); 
app.use(express.json());
app.use(limiter)
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  'http://localhost:5173',
  'https://meeting-puce.vercel.app'
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running..." });
});

app.use("/api/auth", authRoutes);
app.use("/api/meetings", meetingRoutes);

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

export default app;
