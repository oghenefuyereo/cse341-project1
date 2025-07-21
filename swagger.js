const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Contacts API",
      version: "1.0.0",
      description: "API for managing contacts",
    },
    servers: [
      {
        url: "http://localhost:3000", // Update to deployed URL when needed
      },
    ],
  },
  apis: ["./routes/*.js", "./controllers/*.js"], // paths to files with Swagger comments
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
