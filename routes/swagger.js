const express = require("express");
const router = express.Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

// Serve Swagger UI
router.use("/api-docs", swaggerUi.serve),
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

module.exports = router;