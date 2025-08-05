const express = require("express");
const cors = require("cors");
const mongodb = require("./data/database");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/", require("./routes"));

// Start MongoDB and server
mongodb.initDb((err) => {
  if (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  } else {
    app.listen(port, () => {
      const baseUrl = process.env.NODE_ENV === "production"
        ? `https://cse341-project1-yjhh.onrender.com`
        : `http://localhost:${port}`;
      console.log(`Server running at ${baseUrl}`);
    });
  }
});
