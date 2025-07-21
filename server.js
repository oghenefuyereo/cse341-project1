const express = require("express");
const dotenv = require("dotenv");
const mongodb = require("./data/database");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Swagger API docs route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Main routes
app.use("/", require("./routes"));

mongodb.initDb((err) => {
  if (err) {
    console.error("Failed to initialize database:", err);
  } else {
    app.listen(port, () => {
      console.log(`Server running and database connected on port ${port}`);
    });
  }
});
