const router = require("express").Router();

// Base route - simple test message
router.get("/", (req, res) => {
  res.send("Hello World");
});

// Swagger documentation route
router.use("/api-docs", require("./swagger"));

// Contacts API route
router.use("/contacts", require("./contacts"));

// Optional: Fallback route for unknown endpoints
router.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = router;
