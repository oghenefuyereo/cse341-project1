const express = require("express");
const cors = require("cors");
const mongodb = require("./data/database");

const app = express();
const port = process.env.PORT || 3000;

// Use CORS and JSON parsing middleware
app.use(cors());
app.use(express.json());

// Register main routes
app.use("/", require("./routes"));

// Start server after DB connection
mongodb.initDb((err) => {
  if (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  } else {
    app.listen(port, () => {
      const host = process.env.NODE_ENV === "production"
        ? "https://cse341-project1-yjhh.onrender.com"
        : `http://localhost:${port}`;

      console.log(`Server running at ${host}`);
    });
  }
});

// Simple error handler middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});
