const swaggerAutogen = require("swagger-autogen")();

const isProduction = process.env.NODE_ENV === "production";

// Set host depending on environment
const host = isProduction
  ? "cse341-project1-yjhh.onrender.com"
  : "localhost:3000";

const doc = {
  info: {
    title: "Users API",
    description: "Users API",
  },
  host: host,
  schemes: isProduction ? ["https"] : ["http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./server"); 
});
