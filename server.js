const express = require("express");
const cors = require("cors");
const mongodb = require("./data/database");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/", require("./routes"));

mongodb.initDb((err) => {
  if (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  } else {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  }
});
