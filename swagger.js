const swaggerAutogen = require("swagger-autogen")();

// Determine if we're in production (e.g., Render)
const isProduction = process.env.NODE_ENV === "production";

// Set host based on environment
const host = isProduction
  ? "cse341-project1-yjhh.onrender.com"
  : "localhost:3000";

// Swagger document configuration
const doc = {
  info: {
    title: "Users API",
    description: "API for managing user and contact data",
  },
  host: host,
  schemes: isProduction ? ["https"] : ["http"],
};

// Output file for Swagger JSON and the endpoints to scan
const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

// Generate Swagger file and then start the server
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./server");
});
