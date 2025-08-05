const swaggerAutogen = require("swagger-autogen")();

const host = process.env.HOST || "localhost:3000";

const doc = {
  info: {
    title: "Users API",
    description: "Users API",
  },
  host: host,
  schemes: host.includes("localhost") ? ["http"] : ["https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./server"); 
});
