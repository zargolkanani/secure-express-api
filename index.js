import express from "express";
import userRoutes from "./routes/user.js";
import { apiKeyAuth } from "./middleware/auth.js";
import { logger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import rateLimit from "express-rate-limit";

const app = express();

// برای Codespaces / proxy
app.set("trust proxy", 1);

app.use(express.json());
app.use(logger);

// 🔹 API Key middleware قبل از routes
app.use(apiKeyAuth);

// Rate limit بعد از API Key
const limiter = rateLimit({
  windowMs: 10 * 1000, // 10 ثانیه
  max: 3, // بیش از 3 درخواست در 10 ثانیه → 429
  message: { error: "Too many requests" }
});
app.use(limiter);

// Routes
app.use("/users", userRoutes);

// Error handler
app.use(errorHandler);

// Start server
app.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});
