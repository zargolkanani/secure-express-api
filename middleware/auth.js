export function apiKeyAuth(req, res, next) {
  console.log("🔑 auth middleware called"); // برای debug
  const apiKey = req.headers["x-api-key"];
  if (!apiKey) {
    return res.status(401).json({ error: "Unauthorized: Missing API Key" });
  }
  if (apiKey !== "12345") {
    return res.status(401).json({ error: "Unauthorized: Invalid API Key" });
  }
  next();
}
